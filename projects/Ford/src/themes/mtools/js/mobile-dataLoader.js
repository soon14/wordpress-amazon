/*
 * 
 */
var BnP = BnP || {};

/*******************************START OF DATA LOADER*********************/
BnP.DataLoader = function() {
	var _storage = BnP.Storage(),
//	_userPref = new models.UserPref();
	_userPref = new models.UserPref({'featuresObject': new collections.FeatureCollection()});

	var privateMethods = {};

	
	var restoreAll = function(uuid,callback) {
		_userPref.url = _userPref.urlRoot + uuid;
		var askForPostcodeLater = false;
		var showPricesLater = false;
		$.when(_userPref.fetch()).done(function() {
			
			//first load pricezones
			fetch('Pricezone', {restoringConfig : true, callback : function(collection) {
					//load the saved pricezone from server.
					var defaultPricezone = collection.get(_userPref.get('priceZoneId'));
					if (typeof defaultPricezone === 'undefined' || defaultPricezone == null) {
						defaultPricezone = collection.where({'default': 'true'});
						if (defaultPricezone  && defaultPricezone.length > 0) {
							defaultPricezone = defaultPricezone[0];
						} else {
							defaultPricezone = collection.at(0);
						}
					}
					collection.select(defaultPricezone);
					//initialise price formatter
					BnP.CommonHelper.initialisePriceFormatter(defaultPricezone);
				
					_storage.store(Constants.storage.pricezoneCollection, collection);
					
					updatePricezoneForUserObject(defaultPricezone);
//					var pricezoneId = defaultPricezone.id;
					//no name
					Events.fireEvent(Events.eventList.buildandprice.router.UpdatePricezoneEvent, defaultPricezone.get('name'));
					
					//first check region if we are in FOA
					var derivativeId = _userPref.get('derivativeId');

					//if we have postcodes (usually FOA)
					if (ConfigUtil.showPostcodeSelect() && typeof derivativeId !== 'undefined' && derivativeId != null) {
						//read the cookie and see if we have stored the postcode before
						ND.API.requestCookieValuesBuildAndPrice({complete: 
							function(result) {
								//our saved postcode from loaded config
								var postcode = _userPref.get('postcode');
								var usage = _userPref.get('usage');
								
								//postcode from cookie
								if (typeof result !== 'undefined' && result != null && result.postcode) {
									_userPref.set({ //we need to keep both, crazy logic to start to shape up :P
										'tempPostcode': postcode,
										'tempUsage': usage,
										'postcode': result.postcode,
										'usage': result.usage,
										'usageLabel': result.usageLabel
									});
									showPricesLater = true;
									//let omniture know which region is selected.
								} else {
									_userPref.set({
										'tempPostcode': postcode,
										'tempUsage': usage,
										'postcode': '',
										'usage': ''
									});
									askForPostcodeLater = true;
								}
									
								if (typeof postcode === 'undefined' || postcode == null || postcode === '') {
									Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, true);
								} else {
									//no name in Event
									Events.fireEvent(Events.eventList.buildandprice.model.RegionPostcodeLoadedFromConfigEvent, {postcode: postcode});
								}
							}
						});
					}
					
					//first load nameplates
					var modelId = _userPref.get('modelId');
					//[SOHRAB] path is a parameter, so  you should know if path is pkg at this point, no need for this check here.
					if (ConfigUtil.isShortPath() || typeof _userPref.get('packageId')!=='undefined'){
	                      var path = Constants.path.pkg;
	                      fetch('Package', {
							restoringConfig : true,
							modelId: modelId, 
							path: path, 
							derivativeId: _userPref.get('packageId'),
							engineId: 0,
							callback : function(engines) {
							    Events.fireEvent(Events.eventList.buildandprice.model.StartAllModulesEvent.name, 
						    	{
							    	 modelId: modelId, 
									 path: path, 
									 derivativeId: _userPref.get('packageId'),
									 engineId: 0,
						    		 askForPostcodeLater: askForPostcodeLater, 
						    		 showPricesLater: showPricesLater,
						    		 callback : privateMethods.loadDerivativeDetails
						    	});
							}
						});
	                    var completeURL=BnP.MobileHelper.constructStepUrl({
	                    	step:Constants.state.SUMMARY,
	                    	path:path,
	                    	derivativeId:_userPref.get('packageId'),
	                    	engineId:0,
	                    	modelId:modelId
	                    });
	                } 
	                else{
	                	var path = Constants.path.drv;
	                	fetch('Engine', {
							restoringConfig : true,
							modelId: modelId, 
							path: path, 
							derivativeId: _userPref.get('derivativeId'),
							engineId: _userPref.get('engineId'),
							callback : function(engines) {
							    Events.fireEvent(Events.eventList.buildandprice.model.StartAllModulesEvent.name, 
						    	{
							    	 modelId: modelId, 
									 path: path, 
									 derivativeId: _userPref.get('derivativeId'),
									 engineId: _userPref.get('engineId'),
						    		 askForPostcodeLater: askForPostcodeLater, 
						    		 showPricesLater: showPricesLater,
						    		 callback : privateMethods.loadDerivativeDetails
						    	});
							}
						});
						var completeURL=BnP.MobileHelper.constructStepUrl({
	                    	step:Constants.state.SUMMARY,
	                    	path:path,
	                    	derivativeId:_userPref.get('derivativeId'),
	                    	engineId:_userPref.get('engineId'),
	                    	modelId:modelId
	                    });
	                }
					if (callback && completeURL) {
					    callback(completeURL);
					}
				}
			});
		 }).fail(privateMethods.callFailed);
		
		
	};
	
	privateMethods.callFailed = function() {
		 Events.fireEvent(Events.eventList.buildandprice.model.ErrorOccuredEvent.name);
	};
	
	privateMethods.loadDerivativeDetails = function(data) {
//		var pricezoneId = _userPref.get('pricezoneId'), 
		askForPostcodeLater = data.askForPostcodeLater, 
		showPricesLater = data.showPricesLater, 
		modelId = _userPref.get('modelId'), 
		path = data.path, 
		derivativeId = data.derivativeId,
        engineId = data.engineId;


	
//		var self = this;
		privateMethods.postProcessDerivativeDetails(modelId, path, derivativeId,engineId,undefined, function() {
			//Util.log('postProcessDerivativeDetails.callback = privateMethods.loadDerivativeDetails');
			
			var colorId = _userPref.get('colourId'),
				colorCollection = colors(),
				colorToBeSelected = colorCollection.selectById(colorId);
			if (typeof colorToBeSelected !== 'undefined' && colorToBeSelected != null) {
				updateUserPrice('colour', colorToBeSelected);
				_storage.store(Constants.storage.colorCollection, colorCollection);
				//Util.log('selectedColor');
				//select trims
				var trimId = _userPref.get('trimId'),
					trims = colorToBeSelected.get('trims');
				if (trims && trims.length > 0) {
					var trimToBeSelected = trims.get(trimId);
					if (trimToBeSelected && trimToBeSelected != null) {
						trims.select(trimToBeSelected);
						updateUserPrice('trim', trimToBeSelected);
						//Util.log('selectedTrim');
						var savedFeatureIds = _userPref.get(Constants.attr.feats);
						//console.dir(savedFeatureIds);
						if (typeof savedFeatureIds !== 'undefined' && savedFeatureIds != null && savedFeatureIds.length > 0) {
							//Util.log('hasFeatures');
							var categoryGrpCollection = categoryGroups();
						
							var featuresToBeSelected = categoryGrpCollection.fetchFeatures(savedFeatureIds);
							
							//After introducing Mutual exclusive features, we save more features than we need
							//therefore this equality no longer holds. Just try to find as many
							//features as you can and hope for the best. aughhhhhh!!!
//							if (featuresToBeSelected.length !== savedFeatureIds.length) {
//								privateMethods.callFailed();
//								return;
//							}
							_.each(featuresToBeSelected, function(featureToBeSelected) {
								Events.fireEvent(Events.eventList.buildandprice.model.FeatureSelectedEvent.name, featureToBeSelected);
							});
							
						}
						
						Events.fireEvent(Events.eventList.buildandprice.model.RestoreCompleteEvent.name, {
							modelId: modelId, path: path, derivativeId: derivativeId, engineId: engineId, 
							isLoadingConfig : true, showPricesLater : showPricesLater, askForPostcodeLater: askForPostcodeLater
						});
					}
				} else {
					//NO TRIM, 
					privateMethods.callFailed();
				}
			} else {
				//NO COLOUR, 
				privateMethods.callFailed();
			}
		});

	};
	
	
	var pricezones = function() {
		return _storage.load(Constants.storage.pricezoneCollection);
	};
	
	var derivativeDetails = function() {
		return _storage.load(Constants.storage.derivativeDetailsModel);
	};
	
	var footer = function(options) {
		var model = _storage.load(Constants.storage.footerModel);
		if (typeof model === 'undefined') {
			model = createFooter(options);
			_storage.store(Constants.storage.footerModel, model);
		} 
		
		return model;
	};
	
	var categoryGroups = function() {
		var storedData =  _storage.load(Constants.storage.categoryGrpCollection);
		
		if (storedData != null) {
			if (ConfigUtil.isShortPath() || typeof _userPref.get('packageId') !== 'undefined') {
              var derivatives = _storage.load(Constants.storage.packageCollection);
            }
            else {
              var derivatives = _storage.load(Constants.storage.derivativeCollection);
            }

			if (derivatives != null) {
				var derivative = derivatives.getSelected();
				if (derivative != null && storedData.derivativeId === derivative.id) {
					return storedData.categories;
				}
			}
		}
		return null;
	};
	
	var nameplates = function() {
		
//		if (typeof successFunction === 'undefined') {
		return _storage.load(Constants.storage.nameplateCollection);
//		} else {
//			var nc = new collections.NameplateCollection();
//			nc.url = buildURL(nc.urlRoot, _pricezoneId(), null, null);
//			_storage.fetchNStore(Constants.storage.nameplateCollection, nc, successFunction);
//		}
	};
	
	var storedPanel = function() {
		return _storage.load(Constants.storage.panelCollection);
	};
	
//	privateMethods.panelOptions = {};
	var panel = function(options) {
		
//		var options = $.extend(privateMethods.panelOptions, settings),
		//we have to make sure we are still on the same vehicle as we go back and forth
		var pkgOrDrv = (options.path && options.path != null && options.path === Constants.path.pkg) ? Constants.header.sp : Constants.header.sm;
		
	    var states = [];

	    states.push({ state: Constants.state.SELECT_NAMEPLATE, name: Constants.bpt.ssm });
	    if(!ConfigUtil.isShortPath() && BnP.CommonHelper.showPathStep()) {
	    	states.push({ state: Constants.state.SELECT_PATH, name: Constants.bpt.chp });
	    }
	    if (BnP.CommonHelper.isPackagePath(options.path)) {
		    states.push({ state: Constants.state.SELECT_PACKAGE, name: pkgOrDrv });
	    } else {
	        states.push({ state: Constants.state.SELECT_DERIVATIVE, name: pkgOrDrv },
		              	{ state: Constants.state.SELECT_ENGINE, name: Constants.header.selectEngine });
	    }
		var panelCollection = new collections.HeaderCollection(),
		headerUrl = null, index = 1;
		
		//console.dir(options);
		
		for (var i = 0; i < states.length; i++) {
			headerEnabled = true;
			headerUrl = BnP.MobileHelper.constructStepUrl({
				step: states[i].state, 
				path : options.path, 
				modelId : options.modelId,
				derivativeId: options.derivativeId,
				engineId : options.engineId
			});
			
			
			panelCollection.add(new models.HeaderModel({
				order: i,
				step: index++, 
				state: states[i].state,
				heading : states[i].name,
				headerURL : headerUrl,
				enabled: (headerUrl !== ''),
				isCurrent : (states[i].state === options.state)
			}));
		}

		var state = Constants.state.CUSTOMIZE_DERIVATIVE;
		 //customize_derivative state....let's deal with the mess here
		headerUrl = BnP.MobileHelper.constructStepUrl({
			step: state,
			path : options.path,
			derivativeId: options.derivativeId,
			engineId : options.engineId,
			modelId : options.modelId
		});
		
		//console.log('headerUrl for state ' + state + ' is ' + headerUrl);
			panelCollection.add(new models.HeaderModel({
				order: index,
				step: index,
				state: state,
				heading : Constants.header.selectColor,
				headerURL: headerUrl,
				enabled: (headerUrl !== ''),
				isCurrent : (state === options.state && (typeof options.categoryId === 'undefined'))
			}));
			index++;
			var catGroups = categoryGroups();
			if (catGroups != null) {
				//console.log('categoryGroups are not null');
				_.each(catGroups.models, function(categoryGroup) {
		    		var categories = categoryGroup.get('categories');
//		    		console.log('constructing panel for categoryGroup: ' + categoryGroup.get('name') + ' and index ' + index);
		    		if (categories != null && categories.length > 0) {
			    		_.each(categories.models, function(category) {
//			    			console.log('constructing panel for category: ' + category.get('name') + ' and index ' + index);
			    			
			    			headerUrl = BnP.MobileHelper.constructStepUrl({
								step: state, 
								path : options.path,
								derivativeId: options.derivativeId,
								engineId : options.engineId,
								categoryId: category.id,
								modelId : options.modelId});
			    			//console.log('headerUrl for state ' + state + ' is ' + headerUrl);
			    			panelCollection.add(new models.HeaderModel({
								order:index,
								step: index,
								state: state,
								heading : category.get('name'),
								enabled: (headerUrl !== ''),
								isCurrent : (state === options.state && category.id === options.categoryId),
								headerURL : headerUrl
							}));
			    			index++;
			    		}, this);
		    		}
				}, this);
			}
		
			state = Constants.state.SUMMARY;
			headerUrl = BnP.MobileHelper.constructStepUrl({
				step: state, 
				path : options.path, 
				derivativeId: options.derivativeId,
				engineId : options.engineId,
				modelId : options.modelId});
			
			panelCollection.add(new models.HeaderModel({
				order: index,
				step: index,
				state: state,
				heading : Constants.header.ss,
				enabled: (headerUrl !== ''),
				isCurrent : (state === options.state),
				headerURL : headerUrl
			}));

		_storage.store(Constants.storage.panelCollection, panelCollection);	
		return panelCollection;
		
	};
	
	var paths = function() {
		return _storage.load(Constants.storage.pathCollection);
	};
	
	var colors = function() {
		return _storage.load(Constants.storage.colorCollection);
	};
	
	var trims = function() {
		return _storage.load(Constants.storage.colorCollection).getSelected().get('trims');
	};
	
	var gallery = function() {
		var galleryCollection = _storage.load(Constants.storage.galleryCollection),
			visibleImage = galleryCollection.where({visible : true}),
			showArrows = false;

		if (visibleImage.length > 0) {
			showArrows = visibleImage[0].get('numImages') > 1;
		}
		return new models.GalleryWrapper({gallery : galleryCollection, showArrows : showArrows});
	};
	
	var derivatives = function() {
		return _storage.load(Constants.storage.derivativeCollection);
	};
	
	var packages = function() {
		return _storage.load(Constants.storage.packageCollection);
	};
	
	privateMethods.nameplateHotDeal = function() {
		var nameplateCollections = nameplates(), nameplate = null;
		if (nameplateCollections != null) {
			nameplate = nameplateCollections.getSelected();
			if (nameplate != null) {
				return new models.HotDeal({hotDealUrl:nameplate.get('hotDealSmobUrl')});
			}
		}
		
		return null;
		
	};
	
	var hotdeal = function() {
		if (ConfigUtil.showPostcodeSelect()) {
			var drvCollection = derivatives();
			if (drvCollection != null) {
				var derivative = drvCollection.getSelected();
				if (derivative != null) {
					var hotDealUrl = derivative.get('hotDealUrl');
					if (hotDealUrl !== '#') {
						return new models.HotDeal({hotDealUrl:hotDealUrl});
					} else {
						return privateMethods.nameplateHotDeal();
					}
				} else {
					return privateMethods.nameplateHotDeal();
				}
			}
		}
		return null;
	};
	
	
	/**
	 * Relies on panel data which is passed in as a parameter
	 */
	var header = function(options) {

		var headerData = _storage.load(Constants.storage.headerModel);
		
		
		var panelCollection = options.panel, 
			currentPanelItems = panelCollection.where({isCurrent: true}),
			currentPanelItem = null;
		if (currentPanelItems != null && currentPanelItems.length > 0) {
			currentPanelItem = currentPanelItems[0];
		}
		
		var postcode = '', usageLabel = '';
		if (ConfigUtil.showPostcodeSelect()) {
			postcode = _userPref.get('postcode');
			usageLabel = _userPref.get('usageLabel');
		} else if (ConfigUtil.showPricezones()) {
			var pricezoneCollection = pricezones();
			postcode = pricezoneCollection.getSelected().get('name');
			usageLabel = '';
		} 
		// var showPricezoneSelect = Constants.postcode.non;
		// if (ConfigUtil.showPostcodeSelect()) {
		// 	showPricezoneSelect =  Constants.postcode.hd;
		// } else if (ConfigUtil.showPricezones()) {
		// 	showPricezoneSelect =  Constants.postcode.ot;
		// }
		var showPricezoneSelect = false;
		if (ConfigUtil.showPostcodeSelect() || ConfigUtil.showPricezones()) {
			showPricezoneSelect =  true;
		}
		
		if (headerData == null) {
			headerData = new models.HeaderModel();
		}
		
		
		if (currentPanelItem == null) {
			headerData.set({
				postcode: postcode,
				usageLabel: usageLabel,
				showPricezoneSelect: showPricezoneSelect
			});
			return headerData;
		} else {
			
			var nextPageUrl = null;
			//only show headingURL for customize step
			if (Constants.state.CUSTOMIZE_DERIVATIVE === currentPanelItem.get('state')) {
				//steps start at 1 so currentPanelItem's step is the index of the next item
				//in panelCollection
				nextPageUrl = panelCollection.at(currentPanelItem.get('step')).get('headerURL');
			}
			
			headerData.set({
				postcode: postcode,
				usageLabel: usageLabel,
				showPricezoneSelect: showPricezoneSelect,
				derivativeName: options.name,
				step : currentPanelItem.get('step'),
				totalSteps: panelCollection.length,
				heading: currentPanelItem.get('heading'),
				headerURL: nextPageUrl
			});
			
			_storage.store(Constants.storage.headerModel,headerData);
		}
		return headerData;
	};
	
	privateMethods.postProcessDerivativeDetails = function(modelId, path, derivativeId, engineId, cleanupCallback, onCompleteCallback) {
		//Util.log('postProcessDerivativeDetails');
//		var self = this;
		var derivativeDetailModel = _storage.load(Constants.storage.derivativeDetailsModel);
		var galleryCollection = _storage.load(Constants.storage.galleryCollection);
		var categoryGroupCollection = _storage.load(Constants.storage.categoryGrpCollection);
		var colorCollection = _storage.load(Constants.storage.colorCollection);

//		if (typeof _storage.load(Constants.storage.footerModel) === 'undefined') {
//			this.createFooter({path: path, derivativeId : derivativeId, step: Constants.state.CUSTOMIZE_DERIVATIVE});
//		}
		
		//decide whether to use cached data or pull everything from the server.
		if (derivativeDetailModel != null && galleryCollection  != null && 
			categoryGroupCollection != null && 
			colorCollection != null && (derivativeId === derivativeDetailModel.id)) {
			//console.log('loading from memory for derivative ' + derivativeId);
			if (typeof onCompleteCallback !== 'undefined') {
				onCompleteCallback();
			}
		} else {
			//console.log('loading from server for derivative ' + derivativeId);
			var pricezoneId = _pricezoneId();
			derivativeDetailModel = new models.DerivativeDetailModel({id : derivativeId});
			derivativeDetailModel.url = BnP.CommonHelper.buildURL(derivativeDetailModel.urlRoot, pricezoneId,derivativeId, path); 
			colorCollection = new collections.ColorCollection();
			colorCollection.url = BnP.CommonHelper.buildURL(colorCollection.urlRoot, pricezoneId, derivativeId, path); 
			categoryGroupCollection = new collections.CategoryGroupCollection();
			categoryGroupCollection.url = BnP.CommonHelper.buildURL(categoryGroupCollection.urlRoot, pricezoneId, derivativeId, path);
			galleryCollection = new collections.MobileGallery();
			if (typeof cleanupCallback !== 'undefined') {
				cleanupCallback();
			}
			
			$.when(categoryGroupCollection.fetch(),
				_storage.fetchFreshNStore(Constants.storage.derivativeDetailsModel, derivativeDetailModel),
				_storage.fetchFreshNStore(Constants.storage.colorCollection, colorCollection))
			.then(function() {

				BnP.CommonHelper.postProcessColorTrims(colorCollection);
				galleryCollection.addBaseSprites(colorCollection, 'color');

				_.each(categoryGroupCollection.models, function(categoryGroup) {
					var categories = categoryGroup.get(Constants.attr.catgs);
					var containsFeatureGroup = false;
					if (categories != null) {
						_.each(categories.models, function(category) {
							//console.log('***setting nextPageURL for category : ' + category.get('name'));
							var features = category.get(Constants.attr.feats);
							if (features && features != null) {
								category.set('pageURL', BnP.MobileHelper.constructStepUrl({
									modelId : modelId, 
									path: Constants.path.drv, 
									derivativeId : derivativeId, 
									engineId: engineId, 
									categoryId: category.id,
									step: Constants.state.CUSTOMIZE_DERIVATIVE})); 
								//console.log('category : ' + category.get('name') + ' has nextPageURL: ' + category.get('pageURL'));
//								console.log('registering url ' + ":modelId/" + Constants.path.drv + '/:derivativeId/engines/:engineId);
								var mutuallyExclusiveFeatures = features.where({groupType : Constants.values.mutuallyExclusiveOptions});
								//we need to remove mutually exclusive features from list of features before continuing.
								//they are symbolic features that maintain relationship between real features.
								if (mutuallyExclusiveFeatures && mutuallyExclusiveFeatures != null) {
									//remove mx features
									features.remove(mutuallyExclusiveFeatures);
									_.each(mutuallyExclusiveFeatures, function(mutuallyExclusiveFeature) {
										//extract mx features relational data
										var featureGroupAttributes = mutuallyExclusiveFeature.get('featureGroupAttributes');
										if (featureGroupAttributes != null && featureGroupAttributes.length > 0) {
											//search for ids in real feature list
											var fgaIdList = featureGroupAttributes.pluck('id');
											_.each(fgaIdList, function(id) {
												var feature = features.get(id);
												if (feature != null) {
													//add the relation to each real feature.
													var fgaCollection = new collections.FeatureGroupAttributeCollection();
													var newFgaList = _.without(fgaIdList, id);
													_.each(newFgaList, function(filteredId) {
														fgaCollection.add(new models.FeatureGroupAttribute({id: filteredId}));
													});
													feature.set({'featureGroupAttributes': fgaCollection, 'isMutuallyExclusive': true});
												} else {
													//console.log('WARN: could not find MX feature with id: ' + id);
												}
											});
										}
									});
								}
								galleryCollection.addAccessorySprites(features, 'feature');
								var optionPackFeatures = features.where({groupType : Constants.values.optionPack});
								if (optionPackFeatures && optionPackFeatures != null) {
									_.each(optionPackFeatures, function(optionPackFeature) {
										optionPackFeature.set({'featureDetailUrl': '#', 'isOptionPack': true});
										var featureGroupAttributes = optionPackFeature.get('featureGroupAttributes');
										if (featureGroupAttributes != null && featureGroupAttributes.length > 0) {
								            //we do not have a feature details for feature groups
											containsFeatureGroup = true;
										}
									});
								}
								
								var dependentFeatures = features.reject(function(feature) {
									return feature.get('dependentFeaturesIds') == null;
								});
								
								if (dependentFeatures && dependentFeatures != null) {
									_.each(dependentFeatures, function(dependentFeature) {
										if (dependentFeature.get('isMutuallyExclusive')) {
											alert('Unsupported publishing setup!! A mutually exclusive feature cannot have dependent features');
										}
										dependentFeature.set('hasDependentFeatures', true);
										
										//convert dependentFeaturesIds from "1,2,3,4,5,6" to an array
										dependentFeature.set('dependentFeaturesIds',
												dependentFeature.get('dependentFeaturesIds').split(','));
									});
								}
							}
						 });
					}
					if (containsFeatureGroup) {
						categoryGroup.set('containsFeatureGroup', containsFeatureGroup);
					}
				});

				selectedPackageDerivative({pkgCallback: function(pkg) {
					//Need to pass in a dummy engine because we don't have one.
					//[SOHRAB] why was this line removed?
					updateUserPrice('engine', new models.EngineTransmission({id : derivativeDetailModel.get('engineId')}));
					                                      
                    pkg.set('engineId', derivativeDetailModel.get('engineId'), {silent:true});

					
				}});
				BnP.CommonHelper.postProcessVehicleOptionsCollection(categoryGroupCollection, pricezoneId, derivativeId);
				//_storage.store(Constants.storage.categoryGrpCollection, { derivativeId: derivativeId, categories: categoryGroupCollection });
				_storage.store(Constants.storage.categoryGrpCollection, $.extend({ derivativeId: derivativeId, categories: categoryGroupCollection }, categoryGroupCollection));
				_storage.store(Constants.storage.galleryCollection, galleryCollection);
				
				derivativeDetailModel.set('showVehicleDisclaimer', (ConfigUtil.showPostcodeSelect() && (path !== Constants.path.pkg)));
				categoryGroupCollection.select(categoryGroupCollection.at(0));
				
				if (typeof onCompleteCallback !== 'undefined') {
					onCompleteCallback();
				}
			});
		}
	};
	

//	var categoriesCount = function() {
//		var catGroups = categoryGroups();
//		var numOfCategories = 0;
//		if (typeof catGroups !== 'undefined' && catGroups != null) {
//			numOfCategories = catGroups.categoriesCount();	
//		}
//		return numOfCategories;
//	};
	
	//TODO: make this private
	var fetch =  function(level, options) {
		var restoringConfig =  options.restoringConfig || false;
		
		if (ConfigUtil.showPostcodeSelect() && !restoringConfig) {
			
			ND.API.requestCookieValuesBuildAndPrice({complete: 
				function(result) {
					//if NO cookie exists
					if (typeof result === 'undefined' || result == null || result.postcode == null || result.postcode === '') {
						//open the overlay and ask the user to enter a postcode
						//console.log('calling ND.API.requestChangePriceBuildAndPrice');
						//temporary disable the loader sign so that the loader doesn't show up
						Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
						ND.API.requestChangePriceBuildAndPrice({complete: function(result) {
							//pass false for fromExistingCookie param to trigger set of events
							Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
							privateMethods.processRegionPostcode(result, false);
							privateMethods.fetchWithPostcode(level, options);
						}}, false);
					} else {//if a cookie already exists
						//pass true for fromExistingCookie param to trigger set of events
						privateMethods.processRegionPostcode(result, true);
						privateMethods.fetchWithPostcode(level, options);
					}
				}
			});
		} else {
			privateMethods.fetchWithPostcode(level, options);
		}
	};
	
	privateMethods.fetchWithPostcode = function(level, options) {
		var currentLevel = 'Pricezone';
		var self = this;
		//console.log('currentLevel ' + currentLevel);
		_storage.fetchNStore(Constants.storage.pricezoneCollection,new collections.PricezoneCollection(),function(collection) {
			$.proxy(BnP.MobileHelper.processPricezone, self)(collection, _userPref
					.get('priceZoneId'));
			_storage.store(Constants.storage.pricezoneCollection, collection);
			var defaultPricezone = collection.getSelected();
			updatePricezoneForUserObject(defaultPricezone);
			if (ConfigUtil.showPricezones()) {
				Events.fireEvent(Events.eventList.buildandprice.router.UpdatePricezoneEvent, defaultPricezone.get('name'));
			}
			
			if(!ConfigUtil.showPostcodeSelect()){
				if (defaultPricezone.get('pricesDisabled') == "true") {
					Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, true);
				}
				else{
					Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, false);
				}
			}

			
			if (currentLevel === level) {
				options.callback(collection);
			} else {
				currentLevel = 'Nameplate';
				//console.log('currentLevel ' + currentLevel);
				var npCol = new collections.NameplateCollection();
				npCol.url = BnP.CommonHelper.buildURL(npCol.urlRoot, _pricezoneId(), null, null, _userPref);
				_storage.fetchNStore(Constants.storage.nameplateCollection, npCol, function(nameplateCollection) {
					if (typeof options.modelId !== 'undefined' && options.modelId != null) {
						//console.log('select nameplate ' + options.modelId);
						var toSelect = nameplateCollection.selectById(options.modelId);
						updateUserPrice('model', toSelect);
					}
					var nameplateCategories = new collections.NameplateCategoryCollection();
					BnP.CommonHelper.buildNameplateCategoriesFromNameplates(nameplateCollection, nameplateCategories);
					if (currentLevel === level) {
						options.callback(nameplateCategories);
					} else {
						
						currentLevel = 'Path';
						//console.log('currentLevel ' + currentLevel);
						options.nameplate = nameplateCollection.getSelected();
						
						var nameplate = nameplateCollection.getSelected();
						var paths = createPaths(options.path, nameplate, options.modelId);
						
						if (currentLevel === level) {
							options.callback(paths);
						} else {
							//check if short path
							privateMethods.fetchWithPath(level, options);
						}
					}
				});
			}
		});
	};
	
	privateMethods.fetchWithPath=function(level, options){
		//[SOHRAB] isn't it enough to check 
          if (BnP.CommonHelper.isPackagePath(options.path)) {
             var currentLevel = 'Package';
             //console.log('currentLevel ' + currentLevel);
             var model = new collections.PackageModelCollection();
             var pricezoneId = _pricezoneId();
             model.url = BnP.CommonHelper.buildURL(model.urlRoot, pricezoneId, options.modelId, Constants.path.pkg, _userPref);
             _storage.fetchNStore(Constants.storage.packageCollection, model, function (packages) {
                 if (typeof options.derivativeId !== 'undefined' && options.derivativeId != null) {
                     updateUserPrice('package', packages.selectById(options.derivativeId));
                 }
                 BnP.MobileHelper.postProcessPackages(options.modelId, pricezoneId, packages);
                 //privateMethods.fetchEngineAndBeyond(currentLevel, level, packages, options);
                 if (currentLevel === level) {
					options.callback(packages);
				 }
				 else{
				 	currentLevel = 'Engine';
                 	privateMethods.loadCategories(currentLevel, level, packages.getSelected(), new collections.EngineTransmissionCollection(), options);
				 }
             });
         }
         else {
             var currentLevel = 'Derivative';
             //console.log('currentLevel ' + currentLevel);
             var model = new collections.DerivativeModelCollection();
             var pricezoneId = _pricezoneId();
             model.url = BnP.CommonHelper.buildURL(model.urlRoot, pricezoneId, options.modelId, Constants.path.drv, _userPref);
             _storage.fetchNStore(Constants.storage.derivativeCollection, model, function (derivatives) {
                 //console.log('fetching derivatives');
                 if (typeof options.derivativeId !== 'undefined' && options.derivativeId != null) {
                     updateUserPrice('derivative', derivatives.selectById(options.derivativeId));
                 }
                 if (ConfigUtil.showPostcodeSelect()) {

                     hotdealCollection = new collections.HotDealCollection();
                     //                                        
                     hotdealCollection.url = hotdealCollection.urlRoot + '/' + Config.site + '/' + options.modelId;
                     var postcode = _userPref.get('postcode');
                     if (postcode != null && postcode != '') {
                         hotdealCollection.url += '/' + postcode;
                     }
                     //console.log('fetch n persist hotdeals');
                     _storage.fetchNStore(Constants.storage.hotdealCollection, hotdealCollection, function (hotDealResults) {
                         BnP.MobileHelper.postProcessDerivatives(options.modelId, pricezoneId, derivatives, hotDealResults);
                         privateMethods.fetchEngineAndBeyond(currentLevel, level, derivatives, options);
                     });
                 } else {
                     BnP.MobileHelper.postProcessDerivatives(options.modelId, pricezoneId, derivatives, null);
                     privateMethods.fetchEngineAndBeyond(currentLevel, level, derivatives, options);
                 }
             });
         }
     }

	
	privateMethods.fetchEngineAndBeyond = function(currentLevel, level, derivatives, options) {

		if (currentLevel === level) {
			options.callback(derivatives);
		} else {
			currentLevel = 'Engine';
			var selectedDerivative = derivatives.getSelected();
			var engines = selectedDerivative.get('engines');

			if (engines === null) {
				//console.log('engine');
				var collection = new collections.EngineTransmissionCollection();
				collection.url = BnP.CommonHelper.buildURL(collection.urlRoot,_pricezoneId(), selectedDerivative.id, '', _userPref);
				$.when(collection.fetch()).then(function() {
					BnP.MobileHelper.postProcessEngines(options.modelId, selectedDerivative.id, collection);
					if (typeof options.engineId !== 'undefined' && options.engineId != null) {
						collection.selectById(options.engineId);
						updateUserPrice('engine', collection.getSelected());
					}
					selectedDerivative.set('engines', collection);
					privateMethods.loadCategories(currentLevel, level, selectedDerivative, collection, options);
					
				}).fail(privateMethods.callFailed);
			} else {
				privateMethods.loadCategories(currentLevel, level,selectedDerivative, engines, options);
			}
			
			
		}
	};
	
	privateMethods.processRegionPostcode = function(result, fromExistingCookie) {
		//console.log('processRegionPostcode');
		if (fromExistingCookie) {//do not trigger omniture region changed event
			Events.fireEvent(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent, result);
			Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, !ConfigUtil.showPrices());
		} else {
			//TODO: why isn't this getting called when user cancels out of region overlay
			if (result && result.postcode) { //fire omniture region changed event
				if (((_userPref.get('postcode') !== result.postcode) || (_userPref.get('usage') !== result.usage))) {
					Events.fireEvent(Events.eventList.buildandprice.omniture.RegionPostcodeChangedEvent, result);
					Events.fireEvent(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent, result);
					Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, !ConfigUtil.showPrices());
				} 
			} else {
//				Events.fireEvent(Events.eventList.buildandprice.omniture.RegionPostcodeChangedEvent, {postcode: null});
				//TODO: why fire this event...web version doesn't...to find out later.
				Events.fireEvent(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent, {postcode: ''});
				Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, true);
			}
		}
		
	};
	
	privateMethods.loadCategories = function(currentLevel, level, selectedDerivative, engines, options) {
		if (currentLevel === level) {
			if (typeof options.engineId !== 'undefined' && options.engineId != null) {
				engines.selectById(options.engineId);
			}
			options.callback(engines);
		} else {
			currentLevel = 'Categories';
//			modelId, path, derivativeId, cleanupCallback, onCompleteCallback
			privateMethods.postProcessDerivativeDetails(options.modelId, options.path,options.derivativeId, options.engineId,
					options.cleanup,options.callback);
		}
	};
	
	
	var createPaths  = function(path, nameplate, modelId) {
		var prevPaths = _storage.load(Constants.storage.pathCollection);
		
		var paths = new collections.PathCollection();
		
		var nameplateName = nameplate.get('name');
		var hotDealUrl = nameplate.get('hotDealSmobUrl');
		var pkg = new models.PathModel({key: Constants.path.pkg, 
			imageURL : nameplate.get('pkgMidResURL'), 
			pathURL : (hotDealUrl != null) ? hotDealUrl : 
					  (BnP.MobileHelper.constructStepUrl.call(this, {step: Constants.state.SELECT_PACKAGE, path: Constants.path.pkg, modelId : modelId})), 
			name : Constants.bpt.czp,
			title : Constants.bpt.sczp, 
			instruction: Constants.bpt.ppi.replace('%1', nameplateName)
		});
		
		var drv = new models.PathModel({key: Constants.path.drv, 
			imageURL : nameplate.get('byoMidResURL'),
			pathURL : (BnP.MobileHelper.constructStepUrl.call(this, {step: Constants.state.SELECT_DERIVATIVE, path: Constants.path.drv, modelId :modelId})), 
			name : Constants.bpt.byon, 
			title : Constants.bpt.byot, 
			instruction: Constants.bpt.pbyoi.replace('%1', nameplateName)
		});
		paths.add(pkg);
		paths.add(drv);
		
		if (typeof path === 'undefined' && prevPaths != null) {
			path = prevPaths.getSelected();
			if (path != null) {
				if (path.get('key') === pkg.get('key')) {
					path = pkg;
				} else if (path.get('key') === drv.get('key')) {
					path = drv;
				}
				paths.select(path);
			}
		} else if ((typeof path !== 'undefined') && path != null) {
			if (path === pkg.get('key')) {
				path = pkg;
			} else if (path === drv.get('key')) {
				path = drv;
			}
			paths.select(path);
		} 
		_storage.store(Constants.storage.pathCollection, paths);
		
		return paths;
	};
	
	
	
	
	var clearStorageForStep = function(step) {
		//Util.log('clearStorageForStep: ' + step);
		switch(step) {
		
			case Constants.state.SELECT_NAMEPLATE:
			case Constants.state.SELECT_PATH:
				_storage.removeAll([Constants.storage.derivativeDetailsModel,
				                 Constants.storage.categoryGrpCollection,
				                 Constants.storage.headerCollection,
				                 Constants.storage.derivativeCollection,
				                 Constants.storage.packageCollection,
				                 Constants.storage.colorCollection,
				                 Constants.storage.footerModel,
				                 Constants.storage.galleryCollection
				                 ]);
				privateMethods.panelOptions = {};
				_userPref.purge();
				break;
			case Constants.state.SELECT_DERIVATIVE:
			case Constants.state.SELECT_PACKAGE:
				privateMethods.panelOptions = {};
				break;
			case Constants.state.CUSTOMIZE_DERIVATIVE:
				_userPref.set({
					featuresObject: new collections.FeatureCollection(),
					features: new Array()
				});
				privateMethods.panelOptions = {};
				break;
		}
	};

	var selectedPackageDerivative = function(callbacks) {
		var pkgPath = drvPath = false, selectedPackage,selectedDerivative;
		var packageCollection = packages();
		if (ConfigUtil.isShortPath()) {
			selectedPackage = packageCollection.getSelected();
			pkgPath = (selectedPackage != null);
		} else {
			var pathCollection = paths();
			var selectedPath = pathCollection.getSelected();
			if (typeof selectedPath !== 'undefined' && selectedPath != null) {
				if (selectedPath.get('key') === Constants.path.pkg) {
					selectedPackage = packageCollection ? packageCollection.getSelected() : null;
					pkgPath = (selectedPackage != null);
				} else {//derivative
					var derivativeCollection = derivatives();
					selectedDerivative = derivativeCollection ? derivativeCollection.getSelected() : null;
					drvPath = (selectedDerivative != null);
				}
			}
		}
		if (typeof callbacks !== 'undefined') {
			if (pkgPath && typeof callbacks.pkgCallback !== 'undefined') {
				callbacks.pkgCallback.call(null,selectedPackage);
			} else if (drvPath && typeof callbacks.drvCallback !== 'undefined') {
				callbacks.drvCallback.call(null,selectedDerivative);
			}
		}
	};
	
	var updateUserPrice = function(property, object) {
		if (property != 'features') {
			if(object){
				_userPref.set( property + 'Object', object);
				_userPref.set( property + 'Id' , object.get('id'));
			}
		} else {
			updateUserPriceFeatures(object);
		}
	};
	
	var updateUserPriceFeatures = function(object, isSelected) {
		isSelected = (typeof isSelected !== 'undefined') ? isSelected : object.get('selected');
		var features = _userPref.get(Constants.attr.feats + 'Object');
//		console.log('updateUserPriceFeatures(isSelected:' + isSelected + ')');
		if (isSelected) {
			//make sure we r not doule adding features
			var existingFeature = features.get(object.get('id'));
			if (existingFeature == null) {
				features.add(object);
//				Util.log('adding feature ' + object.get('name'));
				_userPref.get(Constants.attr.feats).push(object.get('id'));
			}
		} else {
			var featureIds = _userPref.get(Constants.attr.feats);
//			Util.log('removing feature ' + object.get('name'));
			//+
//					' featureIds: ' + featureIds +
//					', id of feature to remove ' + object.get('id'));
			features.remove(object);
			
			var i = _.indexOf(featureIds, object.get('id'));
			if (i >= 0) {
//				var slicedFeatures =
				featureIds.splice(i, 1);
//				console.log('removing from featureIds ' + slicedFeatures);
				_userPref.set(Constants.attr.feats,featureIds);
			}
		}
		_userPref.set(Constants.attr.feats + 'Object', features);
	};
	
	var updatePricezoneForUserObject = function(pricezone) {
		_userPref.set('priceZoneId', pricezone.get('id'));
		_userPref.set('site', Config.site);
	};
	
	var createFooter = function(options) {
		model = new models.FooterModel();
		options.step = options.step + 1;
		model.setNextButton(BnP.MobileHelper.constructStepUrl.call(this, options), Constants.header.c);
		options.step = options.step - 2; 
		model.setPrevButton(BnP.MobileHelper.constructStepUrl.call(this, options), Constants.header.p);
		return model;
	};
	
	var _pricezoneId = function() {
		var pricezoneId = _userPref.get('priceZoneId');
		if (typeof pricezoneId === 'undefined' || pricezoneId == null) {
			pricezoneId = Config.priceZoneId;
		}
		return pricezoneId;
	};
	
	var nameplateName = function(modelId) {
		var selectedNameplate = nameplates().getSelected();
		var modelName = '';
		if (selectedNameplate && selectedNameplate != null) {
			modelName = selectedNameplate.get('name');
		} else if (modelId && modelId != null) {
			selectedNameplate = collection.selectById(modelId);
			modelName = selectedNameplate.get('name');
		}
		return modelName;
	};
	
	var error = function(options) {
		options = options || { message : null, title : Constants.bpt.errorProcessingData, showPricezone : false};
		return new models.ErrorModel(options);
	};
	
	var currentGalleryView = function() {
		derivativeDetails().get('view');
	};
	
	var reset = function(pcz) {
		_storage.reset();
		_storage.store(Constants.storage.pricezoneCollection, pcz);
		_userPref.purge();
	};
	
	var publicMethods = {
		fetch: fetch,
		header: header,
		restoreAll: restoreAll,
		pricezones : pricezones,
		pricezoneId: _pricezoneId,
		derivativeDetails: derivativeDetails,
		getSelectedPackageDerivative: selectedPackageDerivative,
		updatePricezoneForUserObject: updatePricezoneForUserObject,
		updateUserPriceFeatures: updateUserPriceFeatures,
		updateUserPrice: updateUserPrice,
		nameplates: nameplates,
		derivatives: derivatives,
		packages: packages,
		footer: footer,
		categoryGroups: categoryGroups,
		currentGalleryView: currentGalleryView,
//		categoriesCount: categoriesCount,
		colors: colors,
		trims: trims,
		gallery: gallery,
		paths: paths,
		hotdeal:  hotdeal,
		userPref: _userPref,
		reset: reset,
		error: error,
		clearStorageForStep: clearStorageForStep,
		panel: panel,
		panelData: storedPanel,
		storage: _storage,
		isFirstLoad:true
	};
	
	return publicMethods;
};

/*******************************END OF DATA LOADER*****************/