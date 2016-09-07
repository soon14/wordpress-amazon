/**
 * @author Dawood Butt
 * @description models for filter module
 * @project Latest Offers
 */
//(function(window, document, $, undefined){$(document).on('ready', function() {
		ND.LO.Models.Filter = Backbone.Model.extend({
			defaults: {
						  tagName: "",
						  order: "-1",
						  label: "",
						  type: "",
						  maxOptions: "-1",
						  Min: "$5000",
						  Max: "$50000",
						  Options: [
								{
									  order: "-1",
									  label: "",
									  VDMID: ""
								}
						  ]
			}
			/*parse: function(response) {
				delete response.VDMCategoryID;
				return response;
				
				//var filtersJSON = response.filters;
				//var filtersCollection = ND.LO.Collections.Filters(filtersJSON);
				//response.filters = filtersCollection;
				//return response;
			}*/
		});
		/*ND.LO.Models.Campaign = Backbone.Model.extend({
			defaults: {
				//campaigns: []
			}
		});*/
		ND.LO.Models.ModelsDerivative = Backbone.Model.extend({
			defaults: {
					derivatives: [],
					analyticsCategory: "",
					analyticsName: "",
					brochureUrl: "",
					byoImageURL: "",
					byoMidResURL: "",
					byoThumbnailURL: "",
					category: "",
					hasPaperBrochure: "",
					hotDealSmobUrl: "",
					hotDealUrl: "",
					id: "",
					imageMidResURL: "",
					imageURL: "",
					makeCode: "",
					makeId: "",
					makeName: "",
					modelCode: "",
					modelYear: "",
					name: "",
					order: "",
					pkgImageURL: "",
					pkgMidResURL: "",
					pkgThumbnailURL: "",
					price: "",
					segment: "",
					thumbnailURL: ""
			}
		});
		
//});})(window, document, jQuery);