/**
 * 
 */

var BnP = BnP || {};

/*******************************START OF DATA LOADER*********************/
BnP.AccessoriesModule = function(dataLoader, viewManager, options) {
	
	
	
	Events.eventList.buildandprice.model.FeatureSelectedEvent.handler = function(model) {
		toggleFeaturesByType(model);
			//updateFooter(Constants.state.CUSTOMIZE_DERIVATIVE);
	};
	
	Events.eventList.buildandprice.model.OrientationChangedEvent.handler = function() {
//		Events.fireEvent(Events.eventList.buildandprice.omniture.OrientationChangedEvent, {storage: dataLoader});
	};
	
	Events.eventList.buildandprice.model.handler = function() {
//			Events.fireEvent(Events.eventList.buildandprice.omniture.ViewAccessoryDetailsEvent, {storage: dataStore.storage});
	};
	
	var updateOptions = function(newOptions) {
		options = newOptions;
	};
	
	var toggleFeaturesByType = function(model) {
		//console.log('toggle feature by type');
		//call the appropriate feature method based on flags set
		if (model.get('isOptionPack')) {
			toggleOptionPackSelection(model, false);
		} else if (model.get('isMutuallyExclusive')) {
			toggleMutuallyExclusiveFeatureSelection(model, false);
		} else if (model.get('hasDependentFeatures')) {
			toggleDependentFeatureSelection(model, false);
		} else {
			toggleFeatureSelection(model);
		}
	};
	
	
	var toggleOptionPackSelection = function(model, isPartOfAnotherAccessory, isSelectedByParent) {
		var isSelected;
		if (!isPartOfAnotherAccessory) {
			isSelected = !model.get('selected');
			model.set('selected', isSelected);
			//now that prices of feature groups have been removed add price of option pack to total price.
			dataLoader.updateUserPriceFeatures(model);
			//update the gallery
//			this.updateFeatureInGallery(model, false);
		} else if (typeof isSelectedByParent !== 'undefined'){
			isSelected = isSelectedByParent; //model is already uptodate, do not modify
		}
		
		var fgAttr = model.get('featureGroupAttributes');
		if (fgAttr != null && fgAttr.length > 0) {
			var categoryGroupCollection = dataLoader.categoryGroups();
			var message = isSelected ? Constants.bpt.featurePartOfOptionPack : '';
			//pass null for select to preserve previous value of the feature.
			var selectedFeatureGroups = 
				categoryGroupCollection.toggleFeatures(fgAttr.pluck('id'), null, isSelected);
			_.each(selectedFeatureGroups, function(selectedFeatureGroup) {
				var isOptionPackDeselectedAndFeatureSelected = !isSelected && selectedFeatureGroup.get('selected');
				//Two conditions:
				//1- When option is selected, we must pass false as we DO NOT want the price of featureGroupAttributes in Option pack
				//only price of option pack is calculated.
				//2- When option is not selected, if featureGroupAttribute was previously selected, add its value back to total value
				dataLoader.updateUserPriceFeatures(selectedFeatureGroup, isOptionPackDeselectedAndFeatureSelected);
				
				//update the gallery, pass false to hide these features from the gallery
				//this.updateFeatureInGallery(selectedFeatureGroup, isSelected ? false : selectedFeatureGroup.get('selected'));
				selectedFeatureGroup.set('message', message);
				//console.log('toggleOptionPackSelection -> ' + selectedFeatureGroup.get('name') + ' message = ' + message);
				
				if (selectedFeatureGroup.get('isMutuallyExclusive')) {
					toggleMutuallyExclusiveFeatureSelection(selectedFeatureGroup,true,isSelected || selectedFeatureGroup.get('selected'));
				} else if (selectedFeatureGroup.get('hasDependentFeatures')) {
					//this feature is only have a parent when option pack is selected
					toggleDependentFeatureSelection(selectedFeatureGroup, true, isSelected || selectedFeatureGroup.get('selected'), isSelected);
				}
			}, this);
		}
		/*
		 * Option packs dependent features can ONLY be other Option packs 
		 * 
		 */
		if (model.get('hasDependentFeatures')) {
			var fgAttrIds = model.get('dependentFeaturesIds');
			if (fgAttrIds != null && fgAttrIds.length > 0) {
				//find dependent features of option pack and select them
				var categoryGroupCollection = dataLoader.categoryGroups();
				var optionPacksDependentFeatures = 
					categoryGroupCollection.fetchFeatures(fgAttrIds);
				
				var message = isSelected ? Constants.bpt.featurePartOfDependentFeature : '';
				
				_.each(optionPacksDependentFeatures, function(optionPacksDependentFeature) {
					
					if (optionPacksDependentFeature.get('isOptionPack')) {
						//this.toggleOptionPackSelection(model, true);
						//optionPacksDependentFeatureIds.push(optionPacksDependentFeature.get('id'));
						
//						if (optionPacksDependentFeatureIds.length > 0) {
							var selectedOptionPacksDependentFeatures = 
								categoryGroupCollection.toggleFeatures(new Array(optionPacksDependentFeature.get('id')), null, isSelected);
							_.each(selectedOptionPacksDependentFeatures, function(selectedOptionPacksDependentFeature) {
								
								dataLoader.updateUserPriceFeatures(optionPacksDependentFeature, isSelected);
//								//update the gallery
//								this.updateFeatureInGallery(optionPacksDependentFeature, isSelected);
								
								optionPacksDependentFeature.set('message', message);
								//console.log('toggleOptionPackSelection -> ' + optionPacksDependentFeature.get('name') + ' message = ' + message);
								
								if (!isSelected && selectedOptionPacksDependentFeature.get('selected')) {
									selectedOptionPacksDependentFeature.set('selected', false, {silent: true});
									toggleOptionPackSelection(selectedOptionPacksDependentFeature, false);
								} else {
									toggleOptionPackSelection(selectedOptionPacksDependentFeature, true, isSelected);
								}
							}, this);
//						}
						
						
					} else {
						window.alert('Unsupported publishing configuration: Dependent Features of Option pack' + 
								model.get('id') + ' Can only be other option packs, '
								+ optionPacksDependentFeature.get('id') + ' is not an option pack');
					}
				}, this);
			}
		}
	};
	/**
	 * 
	 * @param model
	 * @param isPartOfAnotherAccessory
	 * @param isParentSelectedOrWasSelected a feature might not be truly selected (selected flag has not been set to preserve previous state), but
	 *  it is selected as part of its parent. 
	 */
	var toggleDependentFeatureSelection = function(model, isPartOfAnotherAccessory, isParentSelectedOrWasSelected, isParentSelected) {
		var isSelected;
		if (!isPartOfAnotherAccessory) {
			isSelected = !model.get('selected');
			model.set('selected', isSelected);
			//now that prices of feature groups have been removed add price of option pack to total price.
			dataLoader.updateUserPriceFeatures(model, isSelected);
			//update the gallery
//			this.updateFeatureInGallery(model, isSelected);
			isParentSelected = isSelected;
		} else if (typeof isSelectedByParent !== 'undefined') {
			isSelected = isParentSelectedOrWasSelected;
		} 
		
		var fgAttrIds = model.get('dependentFeaturesIds');
		if (fgAttrIds != null && fgAttrIds.length > 0) {
			var categoryGroupCollection = dataLoader.categoryGroups();
			//according to the requirements mutual exclusive features are all mutual
			//i.e. if A is MX with B and C, B is MX with C and A, C is MX with A and B.
			//but the publisher may make a mistake.
			var selectedDependentFeatures = categoryGroupCollection.fetchFeatures(fgAttrIds);
			_.each(selectedDependentFeatures, function(selectedDependentFeature) {
				//console.log('dependentFeatureLockCount ->' + selectedDependentFeature.get('dependentFeatureLockCount'));
					selectedDependentFeature.set('dependentFeatureLockCount', 
							selectedDependentFeature.get('dependentFeatureLockCount') + (isParentSelected ? 1 : -1) );
//					Util.log('Parent Feature ' + model.get('name') +
//							' updated the lock for ' + 
//							selectedDependentFeature.get('name') + 
//							' to ' + selectedDependentFeature.get('dependentFeatureLockCount'));
				
				selectedDependentFeature.set('message', 
						(!isParentSelectedOrWasSelected && 
						selectedDependentFeature.get('dependentFeatureLockCount') === 0) ?
						'' : 
						Constants.bpt.featurePartOfDependentFeature);
				
				//console.log('toggleDependentFeatureSelection -> ' + selectedDependentFeature.get('name') + ' message = ' + selectedDependentFeature.get('message'));
			});
			
			selectedDependentFeatures = 
				categoryGroupCollection.toggleFeatures(fgAttrIds, null, isSelected);
			
			_.each(selectedDependentFeatures, function(selectedDependentFeature) {
				
				if (selectedDependentFeature.get('hasDependentFeatures')) {
					window.alert('Unsupported publishing configuration: Feature ' + 
							selectedDependentFeature.get('id') +
							' is a dependent features. Cascading dependent features are not supported.');
				}
				
				
				//Util.log(selectedDependentFeature.get('name') + ' has ' + selectedDependentFeature.get('dependentFeatureLockCount') + ' locks');
				//if parent feature is selected, add the child to the total price
				//otherwise see if it was previously selected, if so add it to the price
				dataLoader.updateUserPriceFeatures(selectedDependentFeature, isSelected || selectedDependentFeature.get('selected'));
				//if parent feature is selected, display the child
				//otherwise see if it was previously selected, if so display the child
//				this.updateFeatureInGallery(selectedDependentFeature, isSelected || selectedDependentFeature.get('selected'));
				
			}, this);
		}
	};
	
	var toggleMutuallyExclusiveFeatureSelection = function(model, isPartOfAnotherAccessory, isSelectedByParent) {
		var isSelected;
		if (!isPartOfAnotherAccessory) {
			isSelected = !model.get('selected');
			model.set('selected', isSelected);
			//now that prices of feature groups have been removed add price of option pack to total price.
			dataLoader.updateUserPriceFeatures(model,isSelected);
			//update the gallery
//			this.updateFeatureInGallery(model,isSelected);
		} else if (typeof isSelectedByParent !== 'undefined'){
			isSelected = isSelectedByParent; //model is already uptodate, do not modify
		}
		
		if (!isSelectedByParent && !isPartOfAnotherAccessory && isSelected) {
			model.set('message', '');
		}
		var fgAttr = model.get('featureGroupAttributes');
		if (fgAttr != null && fgAttr.length > 0) {
			var categoryGroupCollection = dataLoader.categoryGroups();
			//according to the requirements mutual exclusive features are all mutual
			//i.e. if A is MX with B and C, B is MX with C and A, C is MX with A and B.
			//but the publisher may make a mistake.
							
			var selectedFeatureGroups = 
				categoryGroupCollection.toggleFeatures(fgAttr.pluck('id'), null, isSelected);
			var message = isSelected ? Constants.bpt.featurePartOfMutualExclusive : '', 
				selectedFeatureGroup;
			
			
			for(var i = 0; i < selectedFeatureGroups.length; i++) {
				selectedFeatureGroup = selectedFeatureGroups[i];
				
				if (isPartOfAnotherAccessory && !isSelected && selectedFeatureGroup.get('selected')) {
					selectedFeatureGroup.set('selected', false, {silent: true});
					toggleMutuallyExclusiveFeatureSelection(selectedFeatureGroup, false);
					return;
				}
				
				
				//while we are keeping the state of the features, we should remove them from userPref storage
				//to ensure price is up to date.
				dataLoader.updateUserPriceFeatures(selectedFeatureGroup, false);
				//update the gallery, pass false to hide these features from the gallery
//				this.updateFeatureInGallery(selectedFeatureGroup, false);
				
				if (selectedFeatureGroup.get('hasDependentFeatures')) {
					window.alert('Unsupported publishing configuration: Feature ' + 
							selectedFeatureGroup.get('id') +
							' is mutually exclusive and has dependent features. This tool does not support this combination.');
				} else if (selectedFeatureGroup.get('isOptionPack')) {
					window.alert('Unsupported publishing configuration: Feature ' + 
							selectedFeatureGroup.get('id') +
							' is mutually exclusive and is an option pack. This tool does not support this combination.');
				}
				//console.log('feature ID: ' + selectedFeatureGroup.id + ' feature name ' + selectedFeatureGroup.get('name'));
				selectedFeatureGroup.set('message', message);
				
			}
			
		}
		
	};
	
	var toggleFeatureSelection = function(model) {
		model.set({'selected': !model.get('selected'), 'message' : ''});
		dataLoader.updateUserPriceFeatures(model);
//		this.updateFeatureInGallery(model);
	};
	
//	var updateFeatureInGallery = function(model, isShown) {
//		//only switch to an exterior view when on interior view and feature is selected 
//		if (dataLoader.currentGalleryView() !== Constants.view.exterior) {
//			if (model.get('spriteMidResUrl') !== '' && (typeof isShown !== 'undefined' ? isShown : true)) {
//				Events.fireEvent(Events.eventList.buildandprice.model.ToggleViewEvent.name,Constants.view.exterior);
//			} 
//		} else {
//			var gallery = dataLoader.gallery().toggleLayer(model.get('id'), isShown);
//		}
//	};
	
	
	
	var registerEvents = function() {
		
		
		Events.bind(Events.eventList.buildandprice.view.ViewAccessoryDetailsEvent, 
				Events.eventList.buildandprice.model.ViewAccessoryDetailsEvent.handler, this);
		
		
		Events.bind(Events.eventList.buildandprice.model.FeatureSelectedEvent.name,
				Events.eventList.buildandprice.model.FeatureSelectedEvent.handler, this);
		
		return publicMethods;
	};
	
	var go = function() {
		//console.log('navToAccessoryPage:' + options.step);
		Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
		dataLoader.fetch( 'Categories', 
				{modelId: options.modelId, 
				 path: options.path, 
				 derivativeId: options.derivativeId, 
				 engineId: options.engineId,
				 cleanup : cleanup,
				 callback: display});
	};
	
	var cleanup = function() {
		//console.log("accessories.js ----> dataLoader.fetch( 'Categories') clean up called");
		dataLoader.clearStorageForStep(Constants.state.CUSTOMIZE_DERIVATIVE);
	};
	
	var display = function() {		
			
			var categoryGroupCollection = dataLoader.categoryGroups(),
				category = categoryGroupCollection.selectCategoryById(options.step);
			
			if (category != null) {
				var colorCollection = dataLoader.colors(),
					selectedColor = colorCollection.getSelected();
				if (typeof selectedColor === 'undefined' || selectedColor == null) {
					selectedColor = colorCollection.at(0);
					Events.fireEvent(Events.eventList.buildandprice.model.ColorChangedEvent.name, {color: selectedColor , isSystem: true});
				}
				var gallery = dataLoader.gallery();
				if (dataLoader.currentGalleryView() !== Constants.view.exterior) {
					gallery.get('gallery').toggleLayer(selectedColor.id);
				}
				
				var headerCollection = BnP.CommonHelper.isPackagePath(options.path) ? dataLoader.packages() : dataLoader.derivatives();				
				
				var panelData = dataLoader.panel({state: Constants.state.CUSTOMIZE_DERIVATIVE, modelId: options.modelId,  path: options.path,
					 derivativeId : options.derivativeId, 
					 engineId: options.engineId, categoryId : category.id});
				
				viewManager.page()
				.accessories(category, gallery, dataLoader.hotdeal())
								.panel(panelData)
								.header(dataLoader.header({
									name: headerCollection.getSelected().get('name'),
									panel: panelData
								}))
				.go();
			} else {
				viewManager.page().error(dataLoader.error()).go();
			}

			categoryGroupCollection.selectById(category.id);
			dataLoader.storage.store(Constants.storage.categoryGrpCollection, $.extend({ derivativeId: options.derivativeId, categories: categoryGroupCollection }, categoryGroupCollection));
			Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent,
                                    { state: Constants.state.CUSTOMIZE_DERIVATIVE, path: options.path, storage: dataLoader.storage.storageModel });
			Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
		
	};
	
	var publicMethods = {
		registerEvents: registerEvents,
		updateOptions: updateOptions,
		go: go,
		storage: dataLoader.storage
	};
	
	return publicMethods;
	
};

			
			
			