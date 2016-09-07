/**
 * 
 */

var Helper = {
	
	getUsageLabelFromLabel: function(usage) {
		switch(usage) {
			case 'p' :
				return 'Personal';
			case 'b':
				return 'Commercial';
		}
		return '';
	},
	
	hasPreExistingLocalStorageData : function() {
		//check localStorage for existing data.
		for (storageName in localStorageNames) {
			var storage = new LocalStorage(localStorageNames[storageName]);
			if (storage.isEmpty()) {
				return false;
			}
		}
		return true;
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
					Helper.buildDecisionPageUrl(nameplate);
					currentNameplates.add(nameplate);
				}
			});
			currentCategory.set('nameplates', currentNameplates);
			nameplateCategories.add(currentCategory);
			i++;
		});
		nameplateCategories.add(new models.NameplateCategory({name : Constants.bpt.av , order : i, nameplates : collection, selected : true}));
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
	
	initialisePriceFormatter: function(pricezone) {
		ND.PriceFormatter.initialise({
			data: pricezone.get('priceFormat'),
			formatString:  pricezone.get('currencySymbol'),
			centsSeparator: pricezone.get('monetaryDecimalSeparator'),
			thousandsSeparator: pricezone.get('groupingSeparator')
		});
	},
	
	processPricezone: function(collection) {
		var cookiePriceZoneId = Util.cookie.load(Constants.cookie.pzid);
		var defaultPricezone = collection.get(cookiePriceZoneId ? cookiePriceZoneId : this.userPref.get('priceZoneId'));
		if (!defaultPricezone) {
			defaultPricezone = collection.where({'default': 'true'});
			if (defaultPricezone && defaultPricezone.length > 0) {
				defaultPricezone = defaultPricezone[0];
			} else { 
				defaultPricezone = collection.at(0);
			}
		}
		collection.select(defaultPricezone);
		Helper.initialisePriceFormatter(defaultPricezone);
		this.storage.set(Constants.storage.pricezoneCollection, collection);
		this.updatePricezoneForUserObject(defaultPricezone);
	},
	
	postProcessDerivatives: function(drvCol) {
		showPostcode = ConfigUtil.showPostcodeSelect();
		var pricezoneId = this.getPricezoneId();
		_.each(drvCol.models, function(drv) {
			drv.set('displayPrice', showPostcode ? null : ND.PriceFormatter.format(drv.get('price')));
			drv.set('priceZoneId', pricezoneId);
		});
	},
	
	postProcessPackages: function(pkgCol) {
		var pricezoneId = this.getPricezoneId();
		_.each(pkgCol.models, function(pkg) {
			pkg.set('displayPrice', ND.PriceFormatter.format(pkg.get('price')));
			pkg.set('priceZoneId', pricezoneId);
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
	
	postProcessHotDeals: function(hotDealCol, derivativeCollection) {
		
		_.each(hotDealCol.models, function(hotdeal) {
			var derivativeId = hotdeal.get('derivativeId');
			//Util.log(derivativeId);
			if(derivativeCollection.get(derivativeId) != null) {
			//	Util.log('adding hotdeal url to ' + derivativeId);
				derivativeCollection.get(derivativeId).set('hotDealUrl', hotdeal.get('hotDealUrl'));
			};
			hotdeal.set('displayPrice', ND.PriceFormatter.format(hotdeal.get('offerprice')));
		}, this);
	},
	
	postProcessEngines: function(engineCol) {
//		Util.log('postProcessEngines');
//		Util.log(engineCol.pluck('price'));
		var minEnginePrice = _.min(engineCol.pluck('price'), function(p) {
			return parseFloat(p);
		});
//		Util.log('minEnginePrice: ' + minEnginePrice);
		_.each(engineCol.models, function(engine) {
			if (engine.get('featuretype') === Constants.values.standard) {
				engineCol.select(engine);
			}
			var priceDiff = (engine.get('price') - minEnginePrice);
			var priceDiffString = (priceDiff === 0 ? Constants.bpt.noCostOption : ND.PriceFormatter.format(priceDiff.toString()));
//			Util.log('Engine price ' + engine.get('price') + ' & price diff ' + priceDiff + ' and formatted price is ' + priceDiffString);
			engine.set('displayPrice', priceDiffString);
			engine.set('priceDiff', priceDiff);
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
	
	constructHeader: function(modelId, path) {
		
		
		
		var modelName = Helper.getNameplateName.call(this, modelId);
		var headerCollection = new collections.HeaderCollection();
		var headerStates = [  Constants.state.NO_STATE, 
       			              Constants.state.SELECT_PATH, 
    			              Constants.state.SELECT_PACKAGE, //= Constants.state.SELECT_DERIVATIVE  
    			              Constants.state.CUSTOMIZE_DERIVATIVE, 
    			              Constants.state.SUMMARY,
    			              Constants.state.NO_STATE];
		var pkgOrDrv = (path && path != null && path === Constants.path.pkg) ? Constants.header.sp : Constants.header.sm;
		var nameArray = [modelName,  Constants.header.spa,pkgOrDrv , Constants.header.sc, Constants.header.ss, Constants.header.sl];
		var stepArray = [Constants.bpt.ssm, Constants.bpt.s1, Constants.bpt.s2, Constants.bpt.s3, Constants.bpt.s4, Constants.bpt.pc];
		var enabledArray = [true, false, false, false , false, false];
		
		if (ConfigUtil.isShortPath()) {
			nameArray = [modelName, Constants.header.sp, Constants.header.sc, Constants.header.ss, Constants.header.sl];
			stepArray = [Constants.bpt.ssm, Constants.bpt.s1, Constants.bpt.s2, Constants.bpt.s3, Constants.bpt.pc];
			enabledArray = [true, false, false , false, false];
			headerStates = [  Constants.state.NO_STATE,
	    			          Constants.state.SELECT_PACKAGE, 
	    			          Constants.state.CUSTOMIZE_DERIVATIVE, 
	    			          Constants.state.SUMMARY,
	    			          Constants.state.NO_STATE];
		}
		else if(!Helper.showPathStep()){
			nameArray = [modelName,  pkgOrDrv , Constants.header.sc, Constants.header.ss, Constants.header.sl];
			stepArray = [Constants.bpt.ssm, Constants.bpt.s1, Constants.bpt.s2, Constants.bpt.s3, Constants.bpt.pc];
			enabledArray = [true, false, false , false, false];
			headerStates = [  Constants.state.NO_STATE, 
    			              Constants.state.SELECT_PACKAGE, //= Constants.state.SELECT_DERIVATIVE  
    			              Constants.state.CUSTOMIZE_DERIVATIVE, 
    			              Constants.state.SUMMARY,
    			              Constants.state.NO_STATE];
		}
		var postcode = '', usageLabel = '';
		if (ConfigUtil.showPostcodeSelect()) {
			postcode = this.userPref.get('postcode');
			usageLabel = this.userPref.get('usageLabel');
		} else if (ConfigUtil.showPricezones()) {
			var pricezones = this.storage.get(Constants.storage.pricezoneCollection);
			postcode = pricezones.getSelected().get('name');
			usageLabel = '';
		} 
		var showPricezoneSelect = Constants.postcode.non;
		if (ConfigUtil.showPostcodeSelect()) {
			showPricezoneSelect =  Constants.postcode.hd;
		} else if (ConfigUtil.showPricezones()) {
			showPricezoneSelect =  Constants.postcode.ot;
		}
		
		for (var i = 0; i < nameArray.length ; i++) {
			headerCollection.add(new models.HeaderModel({
				order: i,
				heading : nameArray[i],
				step : stepArray[i],
				state: headerStates[i],
				headerURL : Helper.constructStepUrl.call(this, {step: headerStates[i], path : path, modelId : modelId}),
				showPricezoneSelect: showPricezoneSelect,
				postcode: (i === nameArray.length - 1) ? postcode : '',
				usageLabel: (i === nameArray.length - 1) ? usageLabel : '',
				enabled : enabledArray[i]
			}));
			
		}
		return headerCollection;
		
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
	
	getNameplateName : function(modelId) {
		var collection = this.storage.get(Constants.storage.nameplateCollection);
		var selectedNameplate = collection.getSelected();
		var modelName = '';
		if (selectedNameplate && selectedNameplate != null) {
			modelName = selectedNameplate.get('name');
		} else if (modelId && modelId != null) {
			selectedNameplate = collection.selectById(modelId);
			modelName = selectedNameplate.get('name');
		} 
		return modelName;
	},
	
	getCurrentCarView : function(storage) {
		var model = storage.get(Constants.storage.derivativeDetailsModel);
		return model.get('view');
	},

	showPathStep:function(){
   		return Config.site.toLowerCase()!=="fnz";
    }
};