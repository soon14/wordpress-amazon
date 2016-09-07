/**
 * 
 */
var BnP = BnP || {};

BnP.CommonHelper = {
	
	initialisePriceFormatter: function(pricezone) {
		ND.PriceFormatter.initialise({
			data: pricezone.get('priceFormat'),
			formatString:  pricezone.get('currencySymbol'),
			centsSeparator: pricezone.get('monetaryDecimalSeparator'),
			thousandsSeparator: pricezone.get('groupingSeparator')
		});
	},
	
	buildURL : function(orig, pricezoneId,  id, path, userPref) {
		var url =  orig.replace(':pricezoneId', pricezoneId)
		.replace(':id', id)
		.replace(':path', path);
		if (ConfigUtil.showPostcodeSelect() && (userPref || false)) {
			var postcode = userPref.get('postcode');
			if (postcode !== undefined && postcode != null && postcode != '') {
				url += ('?postcode=' + postcode + '&usage=' + userPref.get('usage'));
			}
		}
		
//		console.log('orig url was ' + orig + ' and final url is ' + url);
		
		return url;
	},
	
	getUsageLabelFromLabel: function(usage) {
		switch(usage) {
			case 'p' :
				return 'Personal';
			case 'b':
				return 'Commercial';
		}
		return '';
	},
	
	buildNameplateCategoriesFromNameplates : function(collection, nameplateCategories) {
		categories = _.uniq(collection.pluck('category'));
		var i = 0;
		//need to update the urls to skip path step.
		//var isShortPath = ConfigUtil.isShortPath() && collection.at(0).get('nameplateURL').indexOf(Constants.path.pkg) < 0;
		_.each(categories, function(category) {
			var currentCategory = new models.NameplateCategory({name : category, order : i});
			var currentNameplates = new collections.NameplateCollection();
			
			_.each(collection.models, function(nameplate) {
				nameplate.set('displayPrice', ND.PriceFormatter.format(nameplate.get('price')));
				if (category == nameplate.get('category')) {
					BnP.CommonHelper.buildDecisionPageUrl(nameplate);
					currentNameplates.add(nameplate);
				}
			});
			currentCategory.set('nameplates', currentNameplates);
			nameplateCategories.add(currentCategory);
			i++;
		});
	},
	
	postProcessCategoryGroups : function(categoryGroupCollection, categorySummary, summaryFeatures, summaryCategories, userPrefFeatures) {
		var order = 2;
		
		_.each(categoryGroupCollection.models, function(categoryGroup) {		
			var categories = categoryGroup.get(Constants.attr.catgs);
			if (categories != null) {
				_.each(categories.models, function(category) {	
					categorySummary = new models.SummaryCategory({category : category.get('name')});
					summaryFeatures = new collections.SummaryFeatureCollection();
					var features = category.get(Constants.attr.feats), 
						found = false, 
						featurePrice, 
						isOptionPack,
						featureGroupAttrs,
						categoryPrice = 0;
					
					if (features != null) {
						
						_.each(features.models, function(feature) {	
							if (_.contains(userPrefFeatures,feature.get('id'))) {
								found = true;
								featurePrice = parseFloat(feature.get('price'));
								categoryPrice += featurePrice;
								isOptionPack = feature.get('isOptionPack') === true;
								summaryFeatures.add(new models.SummaryFeature({
									name : feature.get('name'), 
									nameSuffix: (isOptionPack ? Constants.priceSuffix.featureMLP : Constants.priceSuffix.featureRRP), 
									price : ND.PriceFormatter.format(featurePrice.toString()),
									pricePrefix: (isOptionPack ? Constants.bpt.mlp : ''),
									priceSuffix: (isOptionPack ? Constants.priceSuffix.featureMLP : '')
								}));
								if (isOptionPack) {
									featureGroupAttrs = feature.get('featureGroupAttributes');
									if (featureGroupAttrs != null && featureGroupAttrs.length > 0) {
										_.each(featureGroupAttrs.models, function(featureGroupAttr) {
											summaryFeatures.add(new models.SummaryFeature({
												name : featureGroupAttr.get('featureName'),
												isChild : true
											}));
										});
									}
								}
							}
						});
					}
					if (found) {
						categorySummary.set(Constants.attr.feats, summaryFeatures);
						categorySummary.set('categoryTotal', ND.PriceFormatter.format(categoryPrice.toString()));
						categorySummary.set('order', order);
						summaryCategories.add(categorySummary);
						order++;
					}
				});
			}
		});
	},
	
	constructStepUrl : function(options) {
		var result = '';
		switch(options.step) {
			case Constants.state.SELECT_PATH:
				result =  '#' + options.modelId + '/path';
				break;
			case Constants.state.SELECT_PACKAGE:
			case Constants.state.SELECT_DERIVATIVE:
				result =  '#' + options.modelId + '/' + options.path;
				break;
			case Constants.state.CUSTOMIZE_DERIVATIVE:
				result = '#' + options.modelId + '/customize/' + options.path + '/' + options.derivativeId;
				break;
			case Constants.state.SUMMARY: 
				result = '#' + options.modelId + '/summary/' + options.path + '/' + options.derivativeId;
				break;
		}
//		Util.log('constructStepUrl : ' + result);
		return result;
	},
		
	
	buildDecisionPageUrls : function(collection) {
		_.each(collection.models, function(nameplate) {
			Helper.buildDecisionPageUrl(nameplate);
			nameplate.set('displayPrice', ND.PriceFormatter.format(nameplate.get('price')));
		});
	},
	
	buildDecisionPageUrl: function(obj) {
		obj.set('nameplateURL', obj.get('id') + '/' + Constants.path.nxt);
	},
	
	postProcessVehicleOptionsCollection : function(collection, pricezoneId, id) {
		collection.add(new models.CategoryGroupModel({id : 1, name : Constants.bpt.ct, 
													  categoryGrouping : Constants.bpt.ct, 
													  order : 0,
													  analyticsName: Constants.analytics.colorTrim,
													  analyticsStep: 'a'}));
		var i = 0;
		_.each(collection.models, function(categoryGroup) {
			categoryGroup.set('derivativeId', id );
			//console.log('order is ' + categoryGroup.get('order'));
			categoryGroup.set('order', i);
			
			var categories = categoryGroup.get('categories');
			if (categories != null) {
				_.each(categories.models, function(category) {
					if (category != null) {
						var features = category.get('features');
						if(features != null) {
							_.each(features.models, function(feature) {
								feature.set('derivativeId', id);
								feature.set('displayPrice', ND.PriceFormatter.format(feature.get('price')));
								feature.set('pricezoneId', pricezoneId);
							});
						}
					}
				});
			}
			i++;
		});
	},
	
	postProcessColorTrims: function(colorCol) {
		var mlp = Constants.bpt.mlp + ' ';
		_.each(colorCol.models, function(color) {
			var colorPrice = color.get('price');
			color.set('displayPrice', colorPrice != 0 ? (mlp + ND.PriceFormatter.format(colorPrice)) : Constants.bpt.noCostOption);
//			Util.log('postProcessColorTrims.colorPrice:' + color.get('displayPrice'));
			var trims = color.get('trims');
			if (trims) {
				var trimPrice;
				_.each(trims.models, function(trim) {
					trimPrice = trim.get('price');
					trim.set('displayPrice', trimPrice != 0 ? (mlp + ND.PriceFormatter.format(trimPrice)) : Constants.bpt.noCostOption);
				});
			}
		});
	},
	isPackagePath: function (options) {
       return ConfigUtil.isShortPath() || options === Constants.path.pkg;
   },

   showPathStep:function(){
   	return Config.site.toLowerCase()==="foa";
   },

   isStateCitySelector:function(){
   		return ConfigUtil.showPricezones()?(!!Config.isStateCitySelector):false;
   }

};