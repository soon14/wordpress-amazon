/*
 * Author: Dawood Butt
 * Description: Latest Offers JS
 */

(function(window, document, $, undefined){
	/////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////
	// 							Router							   //
	/////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////
	ND.LO.Router = Backbone.Router.extend({

		routeDetails : {},
		routes: {
			//"*notFound" : 'latestOffers',
			"": "latestOffersRoute",  //http://localhost:path
			":prettyURLString/:filterType/:nameplateOrCategory": "interimRoute"
		},
		getQueryVariable: function(name) {
			name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
				results = regex.exec(location.search);
			return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));

			/*var query = window.location.search.substring(1);
			var vars = query.split("&");
			for (var i=0;i<vars.length;i++)
			{
				var pair = vars[i].split("=");
				if(pair[0] == variable)
				{
					return pair[1];
				}
			}
			return(false);*/
		},
		initialize: function() {
			/*this.cached = {
				view: undefined,
				model: undefined
			}*/
		},
		index: function(parameter) {
			/*this.cached.model = this.cached.model || new Model({
				parameter: parameter
			});*/

			//fetching is dependent on the state of the application
			 //this.cached.model.set('parameter', parameter);

			/*this.cached.view = this.cached.view || new View({
				model: this.cached.model
			});*/
			//refetch data
			//this.cached.model.fetch();
		},

		/*latestOffers: function( pathname ) {
			arTmpURL = pathname.split("/");
			var arrayLength = arTmpURL.length;
			//for (var i = 0; i < arrayLength; i++)
//			{
//				alert('('+[i+1]+'/'+arrayLength+'): '+arTmpURL[i]);
//			}
			if (arrayLength == 1)
			{
				this.regionRoute(arTmpURL[0]);
			}
			else if (arrayLength == 2)
			{
				this.interimRoute(arTmpURL[0], arTmpURL[1]);
			}
			else if (arrayLength == 3)
			{
				this.offerDetailsRoute(arTmpURL[0], arTmpURL[1], arTmpURL[2]);
			}
			else
			{
				alert('404 Page Not Found');
			}
		},*/
		interimRoute: function (prettyURLString, filterType, nameplateOrCategory) {
			if ($.trim(prettyURLString) == "!")
			{
				if ($.trim(filterType) == ND.LO.Constants.NAMEPLATE_URL_FILTER)
				{
					ND.LO.Variables.urlFilterType = ND.LO.Constants.NAMEPLATE_URL_FILTER;
					ND.LO.Variables.urlFilterValue = nameplateOrCategory;
					this.latestOffersRoute(ND.LO.Variables.urlFilterType, ND.LO.Variables.urlFilterValue);
				}
				else if ($.trim(filterType) == ND.LO.Constants.CATEGORY_URL_FILTER)
				
				{
					ND.LO.Variables.urlFilterType = ND.LO.Constants.CATEGORY_URL_FILTER;
					ND.LO.Variables.urlFilterValue = nameplateOrCategory;
					this.latestOffersRoute(ND.LO.Variables.urlFilterType, ND.LO.Variables.urlFilterValue);
				}
			}
		},
		latestOffersRoute: function (urlFilterType, urlFilterValue) {
			if ($.trim(this.getQueryVariable(ND.LO.Constants.NAMEPLATE_URL_FILTER)) != "")
			{
				ND.LO.Variables.urlFilterType = urlFilterType = ND.LO.Constants.NAMEPLATE_URL_FILTER;
				ND.LO.Variables.urlFilterValue = urlFilterValue = $.trim(this.getQueryVariable(ND.LO.Constants.NAMEPLATE_URL_FILTER));
			}
			else if ($.trim(this.getQueryVariable(ND.LO.Constants.CATEGORY_URL_FILTER)) != "")
			{
				ND.LO.Variables.urlFilterType = urlFilterType = ND.LO.Constants.CATEGORY_URL_FILTER;
				ND.LO.Variables.urlFilterValue = urlFilterValue = $.trim(this.getQueryVariable(ND.LO.Constants.CATEGORY_URL_FILTER));
			}
			ND.LO.Functions.hrefRedirect();
			////////////////////////////////////////////
			var $filtersData = $('#filters-data');
			var filtersJSON = JSON.parse($filtersData.html()).filters;
			var campaignsList  = [];
			var derivativesList = [];
			var tempCounter = 0;
			////////////////////////////////////////////
			ND.LO.HotDealsCampaigns = new ND.LO.Collections.HotDealsCampaigns();
			ND.LO.HotDealsCampaigns.fetch({ failure: function(model, response) {
								console.error("ND.LO.HotDealsCampaigns.fetch ERROR");
								console.log(response);
							  }}).done(function(){
				/////////////////////////////////////////
				ND.LO.Variables.dCFCollection = new ND.LO.Collections.DerivativeCategoryFeatures();
				ND.LO.Variables.dCFCollection.fetch({ failure: function(model, response) {
					console.error("ND.LO.Variables.dCFCollection.fetch ERROR");
					console.log(response);
				}}).done(function(){
					////////////////////////////////////////////////
					if (typeof ND.LO.HotDealsCampaigns.toJSON()[0].HotDeals !== 'undefined')
					{
						ND.LO.Offers = new ND.LO.Collections.Offers(ND.LO.HotDealsCampaigns.toJSON()[0].HotDeals);
					}
					else
					{
						ND.LO.Offers = new ND.LO.Collections.Offers();
						ND.LO.Offers.fetch({async:false});
					}
					//////////////////////////////
					if (typeof ND.LO.Variables.dCFCollection.toJSON()[0].derivatives !== 'undefined')
					{
						var cFCollection = new ND.LO.Collections.CategoryFeatures(ND.LO.Variables.dCFCollection.toJSON()[0].derivatives);
					}
					else
					{
						var cFCollection = new ND.LO.Collections.CategoryFeatures();
						cFCollection.fetch({async:false});
					}
					//////////////////////////////
					if (typeof ND.LO.Variables.dCFCollection.toJSON()[0].categories !== 'undefined')
					{
						ND.LO.Variables.catCollection = new ND.LO.Collections.Categories(ND.LO.Variables.dCFCollection.toJSON()[0].categories);
					}
					else
					{
						ND.LO.Variables.catCollection = new ND.LO.Collections.Categories();
						ND.LO.Variables.catCollection.fetch({async:false});
					}
					//////////////////////////////
					var jsonOffers = _.map(ND.LO.Offers.toJSON(), function(offer_itr) {
						return _.extend(offer_itr, {
							categoryFeatures: _.findWhere(cFCollection.toJSON(), {derivativeId: offer_itr.derivativeId})
						});// End of _.extend.
					});// End of _.map.

					///////////////////////////////////////////
					// Start of interimRoute Management.	 //
					///////////////////////////////////////////
					if (typeof urlFilterType === 'undefined' && typeof urlFilterValue === 'undefined')
					{
						ND.LO.Offers = new ND.LO.Collections.Offers(jsonOffers);
					}
					else
					{
						if (urlFilterType == ND.LO.Constants.NAMEPLATE_URL_FILTER)
						{
							// /latest-offers/<region>#!/vehicle/fiesta
							//sessionStorage.clear();
							var filteredJSONOffers = 
								_.filter(jsonOffers, function(item) {
									if ($.trim(item.nameplatename).replace(/\s/g, '-').toLowerCase() === $.trim(urlFilterValue).toLowerCase())
									
									{
										ND.LO.Variables.urlFilterID = item.nameplateId;
									}
									return $.trim(item.nameplatename).replace(/\s/g, '-').toLowerCase() === $.trim(urlFilterValue).toLowerCase();
								});
							ND.LO.Offers = new ND.LO.Collections.Offers(filteredJSONOffers);
						}
						else if (urlFilterType == ND.LO.Constants.CATEGORY_URL_FILTER)
						{
							// /latest-offers/<region>#!/vehicle-category/g
							//sessionStorage.clear();
							var filteredJSONOffers = 
								_.filter(jsonOffers, function(item) {
									if (typeof item.vehicleCategory != 'undefined')
									{
										return $.trim(item.vehicleCategory).replace(/\s/g, '-').toLowerCase() === ''+$.trim(urlFilterValue).toLowerCase()+'';
									}
									
								});
							ND.LO.Offers = new ND.LO.Collections.Offers(filteredJSONOffers);
						}
						else
						{
							ND.LO.Offers = new ND.LO.Collections.Offers(jsonOffers);
						}
					}
					///////////////////////////////////////////
					// End of interimRoute Management.	     //
					///////////////////////////////////////////

					///////////////////////////////////////////////////////////////
					///////////////////////////////////////////////////////////////
					///////////////////////////////////////////////////////////////
					var mDCollection = new ND.LO.Collections.ModelsDerivativs();
					mDCollection.fetch({ failure: function(model, response) {
						console.error("mDCollection.fetch ERROR");
						console.log(response);
					}}).done(function(){
						$(mDCollection.toJSON()).each(function(key, val) {
							var derivativeLabel = val.name;
							/*if(derivativeLabel.length > 25)
							{
								derivativeLabel = derivativeLabel.substring(0,24)+" ...";
							}*/
							
							//derivativesList.push({order:++tempCounter, label:derivativeLabel, VDMID:val.id});
							var derivativeItem={};
							derivativeItem.order=++tempCounter;
							derivativeItem.label=derivativeLabel;
							derivativeItem.VDMID=val.id;
							derivativeItem.isSelected=
								(typeof urlFilterType !== 'undefined' && typeof urlFilterValue !== 'undefined' && urlFilterType == ND.LO.Constants.NAMEPLATE_URL_FILTER)
								 ? ($.trim(derivativeLabel).replace(/\s/g, '-').toLowerCase() === $.trim(urlFilterValue).toLowerCase())
								 : false;
							derivativesList.push(derivativeItem);

						});
						////////////////////////////////////////////
						////////////////////////////////////////////
						tempCounter = 0;
						//console.log(filtersJSON);
						for (var filter in filtersJSON)
						{
							if (filtersJSON.hasOwnProperty(filter))
							{
								var filterArray = filtersJSON[filter];
					
								if (filterArray.type == ND.LO.Constants.OFFERS_FILTER_ARRAY_TYPE)
								{
									if(campaignsList.length == 0)
									{
										//////////////////////////////
										if (typeof ND.LO.HotDealsCampaigns.toJSON()[0].campaigns !== 'undefined')
										{
											var tempCnt = 0
											$(ND.LO.HotDealsCampaigns.toJSON()[0].campaigns).each(function(key, val) {
				
												if ($.trim(val) !== "")
												{
													campaignsList.push({order:++tempCnt, label:val, VDMID:val});
												}
											});													}
										else
										{
											///////////////////////////////////
											$.ajax({
												url: ND.LO.Functions.serviceLocator("offersURL"),
												contentType:"application/json; charset=UTF-8",
												dataType: "json",
												cache: true,
												success: function(data) {
													var tempCnt = 0
													if(data.campaigns)
													  {
														  $(data.campaigns).each(function(key, val) {
								
																if ($.trim(val) !== "")
																{
																	campaignsList.push({order:++tempCnt, label:val, VDMID:val});
																}
															});
													  }
												},
												error: function(e) {
												   console.log('offersURL error:'+e);
												},
												statusCode: {
												404: function() {
														console.log('offersURL 404');
													}
												},
												async: false
											})
											///////////////////////////////////
										}
									}

									//alert(ND.LO.Variables.campaignsArray);
									ND.LO.Variables.filterModelData[filter] = new ND.LO.Models.Filter({
											  tagName: 'Offers',
											  value: filterArray.value || filterArray.label,
											  order: filterArray.order,
											  label: filterArray.label,
											  type: filterArray.type,
											  maxOptions: filterArray.maxOptions,
											  Options: campaignsList
											  //Options: filterArray.Options
										}
									);
								}
								else if (filterArray.type == ND.LO.Constants.PRICE_FILTER_ARRAY_TYPE)
								{
									ND.LO.Variables.filterModelData[filter] = new ND.LO.Models.Filter({
											  tagName: filterArray.label,
											  value: filterArray.value || filterArray.label,
											  order: filterArray.order,
											  label: filterArray.label,
											  type: filterArray.type,
											  Min: filterArray.Min,
											  Max: filterArray.Max
										}
									);
								}
								else if (filterArray.type == ND.LO.Constants.MODELS_FILTER_ARRAY_TYPE)
								{
									ND.LO.Variables.filterModelData[filter] = new ND.LO.Models.Filter({
											  tagName: 'Models',
											  value: filterArray.value || filterArray.label,
											  order: filterArray.order,
											  label: filterArray.label,
											  type: filterArray.type,
											  maxOptions: filterArray.maxOptions,
											  //Options: filterArray.Options
											  Options: derivativesList
										}
									);
								}
								else
								{
									ND.LO.Variables.filterModelData[filter] = new ND.LO.Models.Filter({
											  tagName: filterArray.label,
											  value: filterArray.value || filterArray.label,
											  order: filterArray.order,
											  label: filterArray.label,
											  type: filterArray.type,
											  maxOptions: filterArray.maxOptions,
											  Options: filterArray.Options
										}
									);
					
									/*for (var fid in filterArray)
									{
										
									}*/
								}
								//alert(filter + " -> " + filtersJSON);
							}
						}
						////////////////////////////////////////////
						////////////////////////////////////////////
						//ND.LO.Offers = new ND.LO.Collections.Offers(jsonOffers).Filters();
						new ND.LO.Views.Offers({ collection: ND.LO.Offers, el: $("#offersContainer") }).render();
						////////////////////////////////////////////
						////////////////////////////////////////////
						ND.LO.Filters = new ND.LO.Collections.Filters(ND.LO.Variables.filterModelData);
						new ND.LO.Views.Filters({ collection: ND.LO.Filters, el: $("#filterContainer") }).render(); 			
						////////////////////////////////////////////
						////////////////////////////////////////////
						$('.loadmask').hide();
						if (typeof ND.LO.Variables.isOpenPostCode != 'undefined' && ND.LO.Variables.isOpenPostCode)
						{
							$('#myModal').foundation('reveal', 'open');
						}
						////////////////////////////////////////////
					});// End of mDCollection.fetch done()
				});// End of ND.LO.Variables.dCFCollection.fetch done()
			});// End of ND.LO.HotDealsCampaigns.fetch done()
		}
	});
	//////////////////////////END of Router///////////////////////////
	/////////////////////////////////////////////////////////////////

	///////////////////////////////////////////////
	//document ready function. 					//
	///////////////////////////////////////////////
	$(document).on('ready', function() {

 		var $configData = $('#rest-services');
        if ($configData.length > 0) {
            //console.log('Latest Offers config was found');
            ND.LO.Config = JSON.parse($configData.html());

            ND.shoppingPreferenceManager();

            ND.LO.Functions.loadCookie(function(){
            	var $isLanding  =$('#filters-data');
				if ($isLanding.length > 0) {
					var appRouter = new ND.LO.Router();
					Backbone.history.start();
				}
				else
				{
					ND.LO.Functions.hrefRedirect();
					ND.LO.Functions.viewOfferDetailsOffers();
				}
				ND.LO.Functions.handlePostcodeRegion();
            });			
			
        } else {
            console.log('Latest Offers config was NOT found');
        }
	});// End of document ready function.

	/*if (!window.matchMedia("only screen and (max-width: 760px)").matches && $("#player1").length > 0)
	{
		ND.LO.Functions.youtubePlayerEvents();
	}*/

})(window, document, jQuery);