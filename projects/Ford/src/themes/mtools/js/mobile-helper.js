var BnP = BnP || {};
BnP.MobileHelper = {
	processPricezone : function(collection, pricezoneId) {
		var defaultPricezone=collection.get(pricezoneId);
		
		if(!defaultPricezone){
			var cookiePriceZoneId = Util.cookie.load(Constants.cookie.pzid);
			defaultPricezone = collection
		 		.get(cookiePriceZoneId ? cookiePriceZoneId : pricezoneId);
		}
		if (!defaultPricezone) {
			defaultPricezone = collection.where({
				'default' : 'true'
			});
			if (defaultPricezone && defaultPricezone.length > 0) {
				defaultPricezone = defaultPricezone[0];
			} else {
				defaultPricezone = collection.at(0);
			}
		}
		collection.select(defaultPricezone);
		BnP.CommonHelper.initialisePriceFormatter(defaultPricezone);
	}, 
	postProcessDerivatives: function(modelId, pricezoneId, drvCol, hotDealCol) {
		var showPostcode = ConfigUtil.showPostcodeSelect();
		_.each(drvCol.models, function(drv) {
			//only show derivative prices when postcode is enabled
			drv.set('displayPrice', showPostcode ? null : ND.PriceFormatter.format(drv.get('price')));
			drv.set('priceZoneId', pricezoneId);
			drv.set('derivativeURL',  
					BnP.MobileHelper.constructStepUrl({step:  Constants.state.SELECT_ENGINE, 
						modelId: modelId, path : Constants.path.drv, derivativeId :  drv.id}));
		});
		if (hotDealCol != null) {
			_.each(hotDealCol.models, function(hotdeal) {
				var derivativeId = hotdeal.get('derivativeId');
				//Util.log(derivativeId);
				if(drvCol.get(derivativeId) != null) {
				//	Util.log('adding hotdeal url to ' + derivativeId);
					var hotdealUrl = hotdeal.get('hotDealSmobUrl');
					if (typeof hotdealUrl !== 'undefined' && hotdealUrl != null && hotdealUrl !== '') {
						drvCol.get(derivativeId).set('hotDealUrl', hotdealUrl);
					}
				};
				hotdeal.set('displayPrice', ND.PriceFormatter.format(hotdeal.get('offerprice')));
			}, this);
		}
	},
	postProcessPackages: function(modelId, pricezoneId, pkgCol) {
		var showPostcode = ConfigUtil.showPostcodeSelect();
		_.each(pkgCol.models, function(pkg) {
			//only show derivative prices when postcode is enabled
			pkg.set('displayPrice', showPostcode ? null : ND.PriceFormatter.format(pkg.get('price')));
			pkg.set('priceZoneId', pricezoneId);
			pkg.set('derivativeURL',  
					BnP.MobileHelper.constructStepUrl({
						step: Constants.state.CUSTOMIZE_DERIVATIVE, 
						modelId: modelId, 
						path: Constants.path.pkg, 
						derivativeId: pkg.id,
						engineId:0
					}));
		});

	},
	postProcessEngines: function(modelId, drvId, engineCol) {
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
			engine.set('engineURL', BnP.MobileHelper.constructStepUrl({step:  Constants.state.CUSTOMIZE_DERIVATIVE, modelId: modelId, path : Constants.path.drv, derivativeId :  drvId, engineId:  engine.id}));
		});
		engineCol.models.sort(function(a,b){return (a.get('priceDiff')-b.get('priceDiff'));});
	},
	
	constructStepUrl : function(options) {
		var result = '';

		if (options.step === Constants.state.SELECT_NAMEPLATE) {
			result = '#';
		} else if (typeof options.modelId !== 'undefined' && options.modelId != null) {
			if (options.step === Constants.state.SELECT_PATH) {
				result =  '#' + options.modelId + '/path';
			} else if (typeof options.path !== 'undefined' && options.path != null) {
					
				if (options.step === Constants.state.SELECT_PACKAGE || 
					options.step === Constants.state.SELECT_DERIVATIVE) {
					result =  '#' + options.modelId + '/path/' + options.path;
				} else if (typeof options.derivativeId !== 'undefined' && options.derivativeId != null) {
					
					if (options.step === Constants.state.SELECT_ENGINE) {
						result =  '#' + options.modelId + '/path/' + options.path + '/' + options.derivativeId + '/engine';
					} else if (typeof options.engineId !== 'undefined' && options.engineId != null) {
						
						if (options.step === Constants.state.CUSTOMIZE_DERIVATIVE) {
							if (typeof options.engineId === 'undefined' || options.categoryId == null) {
								result =  '#' + options.modelId + '/path/' + options.path + '/' + options.derivativeId + '/engine/' + options.engineId + '/customize/colors';
							} else {
								result =  '#' +	options.modelId + '/path/' + options.path + '/' + options.derivativeId + '/engine/' + options.engineId + '/customize/accessories/' + options.categoryId;
							}
						} else if (options.step === Constants.state.SUMMARY) {
							result =  '#' + options.modelId + '/path/' + options.path + '/' + options.derivativeId + '/engine/' + options.engineId + '/summary';
						}
					} 
				}
			}
		}
//		Util.log('constructStepUrl : ' + result);
		return result;
	}
};