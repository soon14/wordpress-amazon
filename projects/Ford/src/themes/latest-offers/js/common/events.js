/**
 * @author Dawood Butt
 * @description Events for Latest Offers
 * @project Latest Offers
 */
/////////////////////////////////////////////////

/////////////////////////////////////////////////
var ND = ND || {};
ND.LO = {};
ND.LO = {
			Models: {},
			Collections: {},
			Views: {},
			Events: {},
			Constants: {},
			Variables: {},
			Functions: {}
		};
		
ND.LO.Variables.FilteringAnswers = {
				Offer: [],
				BodyType: [],
				FuelType: [],
				Towing: [],
				Price: [10000, 70000],
				Models: []
			};
//ND.LO.Variables.globalCache = new Backbone.Cache();
ND.LO.Variables.filterVar = '';
ND.LO.Variables.filterModelData = [];
ND.LO.Variables.campaignsArray = [];
//ND.LO.Variables.catCollection = {};
ND.LO.Variables.offerDetailsOffers = [];
ND.LO.Variables.offerDetailsDealer = [];
//ND.LO.Variables.urlRegion = '';
ND.LO.Variables.loCookie = '';
ND.LO.Variables.urlFilterType = '';
ND.LO.Variables.urlFilterValue = '';
ND.LO.Variables.urlFilterID = 0;
ND.LO.Variables.formPostcode = '';
ND.LO.Variables.minRange = 10000;
ND.LO.Variables.maxRange = 70000;
ND.LO.Variables.priceSortDirection = 'ASC';

ND.LO.Events = {
	SaveInCookie : 'SaveInCookieEvent',
	LoadFromCookie : 'LoadFromCookieEvent'
};

//ND.LO.Events.vent = _.extend({}, Backbone.Events);