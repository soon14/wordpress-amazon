/**
 * global self executing function
 * 
 * @author Sohrab Zabetian 
 */
var collections = (function(window, document, models, $, undefined) {
	/**
	 * Customize backbone collection to include select & getSelected functionality
	 */
	
	var collections = {};
	
	
	collections.PricezoneCollection = Backbone.Collection.extend({
		model: models.PriceZoneModel,
		url : Config.buildandprice.urls.pricezoneListURL,
		
		initialize: function() {
			this.bind(Events.eventList.buildandprice.view.PricezoneSelectedEvent, this.pricezoneSelected, this);
		},
		
		pricezoneSelected : function(id) {
			var model = this.selectById(id);
			Events.fireEvent(Events.eventList.buildandprice.model.PricezoneSelectedEvent.name, model);
		},
		
		comparator: function(model) {
			return model.get('name');
	    }
	});
	
	collections.DerivativeModelCollection = Backbone.Collection.extend({
		model: models.DerivativeModel,
		urlRoot : Config.buildandprice.urls.derivativeListURL,
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    }
		
	});
	
	collections.PackageModelCollection = Backbone.Collection.extend({
		model: models.PackageModel,
		urlRoot : Config.buildandprice.urls.packageListURL,
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    }
	});
	
	collections.NameplateCategoryCollection = Backbone.Collection.extend({
		model: models.NameplateCategory,
		nameplates: null
	});
	
	collections.NameplateCollection = Backbone.Collection.extend({
		model: models.Nameplate,
		urlRoot: Config.buildandprice.urls.modelListURL,
		
		initialize: function() {
			
		},
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    }
		
	});
	
	collections.PathCollection = Backbone.Collection.extend({
		model: models.PathModel
	
	});
	
	collections.FeatureCollection = Backbone.Collection.extend({
		
		model: models.FeatureModel,
		
		supportsMultiSelect : function() {
			return true;
		},
		
		initialize: function() {
			this.dir = 	null;
		},
		
		comparator: this.defaultComparator,
	    
	    defaultComparator : function(model) {
			return model.get('bpdisplayorder');
	    },
		
		priceComparator: function(model) {
			return this.dir * model.get('price');
		},
		
		nameComparator: function(modelA, modelB) {
			var result = 0;
			var nameA = modelA.get('name').toLowerCase();
			var nameB = modelB.get('name').toLowerCase();
			if (nameA > nameB) {
				result = this.dir;
			} else if (nameA < nameB) {
				result = this.dir * -1;
			}
			return result;
		},
		
		sortByPrice: function(dir) {
			//Util.log('FeatureCollection.sortyByPrice');
			this.dir = dir;
			this.comparator = this.priceComparator;
			this.sort();
			//Util.log(this.pluck('name'));
//			this.comparator = this.defaultComparator;
			this.trigger(Events.eventList.buildandprice.model.FeaturesSortCompletedEvent);
		},
		
		sortByName: function(dir) {
			//Util.log('FeatureCollection.sortyByName');
			this.dir = dir;
			this.comparator = this.nameComparator;
			this.sort();
			//Util.log(this.pluck('name'));
//			this.comparator = this.defaultComparator;
			this.trigger(Events.eventList.buildandprice.model.FeaturesSortCompletedEvent);
		}
	    
	});
	
	collections.CategoryGroupCollection = Backbone.Collection.extend({
		model : models.CategoryGroupModel,
		
		selectByOrder : function(orderVal) {
			
			_.each(this.models, function(obj) {
				obj.set('selected', obj.get('order') == orderVal);
			});
		},
		
		selectCategoryById: function(id) {
			//console.log('this.models.length ' + this.models.length);
			var category = null;
			for (var i = 0; i < this.models.length; i++) {
				var categoryGroup = this.models[i];
				//console.log('selectCategoryById looking into :' + categoryGroup.get('name') + ' with id ' + categoryGroup.id);
	    		var categories = categoryGroup.get('categories');
	    		if (categories != null && categories.length > 0) {
	    			
//	    			categories.each(function(category) {
//	    				console.log('selectCategoryById looking into category :' + category.get('name') + ' with id ' + category.id);
//	    				if (id === category.id) {
//	    					console.log('found a match');
//	    					
//	    				}
//	    			});
	    			
	    			category = categories.selectById(id);
	    			if (category != null) {
	    				break;
	    			}
	    		}
			};
			return category;
		},
		
		getSelectedFeatures : function() {
	    	var selectedFeatures = [];
	    	var i = 0;
	    	_.each(this.models, function(categoryGroup) {
	    		var categories = categoryGroup.get('categories');
	    		if (categories != null && categories.length > 0) {
		    		_.each(categories.models, function(category) {
			    		features = category.get('features');
			    		if (features != null && features.length > 0) {
			    			features = features.where({selected : true});
			    			if (features && features.length > 0) {
			    				_.each(features, function(feature) {
			    					selectedFeatures[i] = feature;
			    					i++;
			    				});
			    			}
			    		}
					});
	    		}
	    	});
	    	return selectedFeatures;
	    },
	    
	    fetchFeatures: function(ids) {
	    	var filteredFeatures = new Array();
	    	_.each(this.models, function(categoryGroup) {
	    		var categories = categoryGroup.get('categories');
	    		if (categories != null && categories.length > 0) {
		    		_.each(categories.models, function(category) {
			    		var features = category.get('features');
			    		if (features != null && features.length > 0) {
				    		_.each(features.models, function(feature) {
			    				if (_.contains(ids, feature.get('id'))) {
			    					//store the feature before it's modified to preserve its state.
			    					filteredFeatures.push(feature);
			    				}
				    		});
			    		}
		    		});
	    		}
	    	});
	    	return filteredFeatures;
	    },
	    
	    /**
	     * @param ids array of ids
	     * @param select boolean true to select, false to deselect, pass null to preserve state of feature
	     * 
	     */
	    toggleFeatures: function(ids, select, disabled) {
	    	var filteredFeatures = new Array();
	    	_.each(this.models, function(categoryGroup) {
	    		var categories = categoryGroup.get('categories');
	    		if (categories != null && categories.length > 0) {
		    		_.each(categories.models, function(category) {
			    		var features = category.get('features');
			    		if (features != null && features.length > 0) {
				    		_.each(features.models, function(feature) {
			    				if (_.contains(ids, feature.get('id'))) {
			    					//store the feature before it's modified to preserve its state.
			    					filteredFeatures.push(feature);
			    					
			    					if (select != null) {
			    						feature.set('selected', select);
			    					}
			    					var count = feature.get('dependentFeatureLockCount');
			    					//keep track of which features (such as option pack/mutual exclusive) trying to disable this feature
			    					//do not enable until disabled count gets to zero
			    					//feature.set('disabledCount', disabled === true ? count + 1 : ((count - 1) < 0 ? 0 : (count - 1)));
//		    						if (disabled === false && feature.get('disabledCount') === 0) {
//		    							feature.set({'disabled' : false});
//		    						} else if (disabled === true) {
//		    							feature.set({'disabled' : true});
//		    						}
//			    					if (!disabled) {
//			    						Util.log(feature.get('name') + ' has ' + count + ' locks. Going to ' + ((disabled ? disabled : (count !== 0)) ? ' disable ' : ' enable ') + 'feature');
//			    					}
			    					feature.set('disabled', (disabled ? disabled : (count > 0)));
		    						//Util.log((disabled === true ? 'disabling' : 'enabling') + ' feature: ' + feature.get('name') + ' disabledCount: ' + feature.get('disabledCount') + ' ->final result:' + feature.get('disabled'));
			    					
			    				}
				    		});
			    		}
					});
	    		}
	    	});
	    	return filteredFeatures;
	    },
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    },
		
		urlRoot : Config.buildandprice.urls.categoryListURL
	});
	

	collections.CategoryCollection = Backbone.Collection.extend({
		model: models.CategoryModel,

		//only used to capture omniture metrics, add silent to avoid updating the view.
		selectByOrder : function(orderVal) {
			_.each(this.models, function(obj) {
				obj.set('selected', obj.get('order') == orderVal, {silent: true});
			});
		},
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    },
	    
		urlRoot : Config.buildandprice.urls.categoryListURL
	});
	
	collections.TrimCollection = Backbone.Collection.extend({
		model: models.TrimModel,
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    }
	});
	
	collections.ColorCollection = Backbone.Collection.extend({
		model: models.ColorModel,
		
		selectTrim : function(trim) {
			selectedColors = this.where({selected : true});
			if(selectedColors && selectedColors.length > 0) {
				selectedColors[0].get('trims').select(trim);
			} 
		},
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    },
		
		urlRoot : Config.buildandprice.urls.colorTrimListURL
			
			
	});
	

	collections.FeatureGroupAttributeCollection = Backbone.Collection.extend({
		model: models.FeatureGroupAttribute
	});
	
	collections.EngineTransmissionCollection =  Backbone.Collection.extend({
		model: models.EngineTransmission,
		
		urlRoot : Config.buildandprice.urls.engineListURL
	});
	
	collections.HeaderCollection = Backbone.Collection.extend({
		model: models.HeaderModel,
		selectable: function() {
			return false;
		}
	});
	
	
	/**
	 * Manages images in image gallery
	 */
	collections.GalleryCollection = Backbone.Collection.extend({
		model: models.GalleryModel,
		
		initialize: function() {
			this.bind(Events.eventList.buildandprice.view.NextOrientationEvent, this.nextOrientation, this);
			this.bind(Events.eventList.buildandprice.view.PrevOrientationEvent, this.prevOrientation, this);
			this.zIndex = 10;
		},
		
		selectable : function() {
			return false;
		},
		
		/**
		 * Rotates Image Clockwise
		 */
		nextOrientation : function() {
			this.changeOrientation(1);
			Events.fireEvent(Events.eventList.buildandprice.model.OrientationChangedEvent.name);
		},
		
		/**
		 * Rotates Image Counter Clockwise
		 */
		prevOrientation : function() {
			this.changeOrientation(-1);
			Events.fireEvent(Events.eventList.buildandprice.model.OrientationChangedEvent.name);
		},
		
		changeOrientation: function(dir) {
			//console.log('changeOrientation: ' + dir);
			var visibleImages = this.where({visible : true});
			if (visibleImages != null && visibleImages.length > 0) {
				_.each(visibleImages, function(img) {
					var spriteLength = img.get('spriteLength'),
						slideWidth = img.get('slideWidth'),
						slideYpos = img.get('slideYpos') + (dir * slideWidth),
						slideYposAbs = Math.abs(slideYpos),
						slideNumber = img.get('slideNumber') + dir;
					if ((slideYposAbs >= spriteLength)) {
						slideYpos = 0;
					} else if (slideYpos > 0) {
						slideYpos = slideWidth - spriteLength;
					}
					
					if (slideNumber >= img.get('numImages')) {
						slideNumber = 0;
					} else if (slideNumber < 0) {
						slideNumber  = img.get('numImages') - 1;
					}
					
					
					img.set({'slideYpos' : slideYpos, 'slideNumber' : slideNumber});
				});
			}
		},
		
		/**
		 * Adds Sprite base layer to gallery. 
		 * For trims and colors only
		 */
		addBaseSprites : function(collection, prefix) {
			var self = this;
			self.addSprites(collection, prefix, 0);
			_.each(collection.models, function(model) {
				self.addSprites(model.get('trims'), 'trim_', 0);
			});
		},
		
		/**
		 * Adds Accessory layer to gallery. 
		 * For trims and colors only
		 */
		addAccessorySprites : function(collection, prefix) {
			this.addSprites(collection, prefix, 1);
		},
		
		/**
		 * General Sprite add method. To be used by collection internally.
		 */
		addSprites : function(collection, prefix, layer) {
			var self = this;
			var dummyImg = new models.GalleryModel({});
			var slideWidth = dummyImg.get('slideWidth');
			_.each(collection.models, function(model) {
				var numImage = model.get('numImages');
				var spriteUrl = model.get('spriteUrl');
				if (spriteUrl && spriteUrl != null && spriteUrl != '') {
					self.add(new models.GalleryModel({
						id : model.get('id'),
						className: prefix + '_' + model.get('id'),
						imageURL : spriteUrl,
						layer : layer,
						slideNumber: 0,
						numImages : numImage, 
						spriteLength: (slideWidth * (numImage == '' ? numImage = 1 : numImage))
					}));
				}
			});
		},
		
		toggleLayer : function(id, isEnabled) {
			var result = this.get(id); 
			if (result) {
//				Util.log('toggleLayer: ' + result.get('id') + ' isEnabled: ' + isEnabled);
				var isVisible = result.get('visible');
				//Do not bother shwoing the layer if it's already visible
				if (typeof isEnabled !== 'undefined' && (isVisible === isEnabled)) {
					return;
				}
				var layer = result.get('layer');
				
				//before doing anything with the new image, figure out the orientation of the visible images
				//so when this image is displayed, it's in the right orientation
				var slideYpos = 0;
				var visibleImgs = this.where({visible : true, layer : 0});
				if (visibleImgs && visibleImgs.length > 0) {
					//can only be one image...
					slideYpos = visibleImgs[0].get('slideYpos');
				}
				//we need to ensure that there are enough sprite images when layers are toggled.
				//for instance exterior colored sprite may have 4 images but interior image may only have 1.
				result.set('slideYpos', ((result.get('spriteLength') > Math.abs(slideYpos)) ? slideYpos : 0));
				if (layer == 1) {
					isVisible = !isVisible;
					this.zIndex += 1;
					result.set('zIndex', isVisible ? this.zIndex : 1,  {silent:true});
					result.set('visible', isVisible);
					if (this.selectable()) {
						result.set('selected', isVisible);
					}
				} else if (!isVisible) {
					var visibleImgs = this.where({visible : true, layer : 0});
					var isSelectable = this.selectable();
					if (visibleImgs) {
						_.each(visibleImgs, function(model) {
							model.set('visible', false);
							if (isSelectable) {
								result.set('selected', false);
							}
						});
					}
					result.set('visible', !isVisible);
					if (isSelectable) {
						result.set('selected', !isVisible);
					}
					var numImgs = result.get('numImages');
					if (numImgs <= 1) {
						//console.log('hideArrows');
						Events.fireEvent(Events.eventList.buildandprice.model.HideArrowsEvent);
					} else {
						//console.log('showArrows');
						Events.fireEvent(Events.eventList.buildandprice.model.ShowArrowsEvent);
					}
				}
			}
		}
		
	});
	
	collections.MobileGallery = collections.GalleryCollection.extend({
		model: models.MobileGallery,
		
				
		/**
		 * General Sprite add method. To be used by collection internally.
		 */
		addSprites : function(collection, prefix, layer) {
			//console.log('MobileGallery.addSprites');
			var self = this;
			var dummyImg = new models.MobileGallery({});
			var slideWidth = dummyImg.get('slideWidth');
			_.each(collection.models, function(model) {
				var numImage = model.get('numMidResImages');
				var spriteUrl = model.get('spriteMidResUrl');
				if (spriteUrl && spriteUrl != null && spriteUrl != '') {
					self.add(new models.MobileGallery({
						id : model.get('id'),
						className: prefix + '_' + model.get('id'),
						imageURL : spriteUrl,
						layer : layer,
						numImages : numImage, 
						spriteLength: (slideWidth * (numImage == '' ? numImage = 1 : numImage))
					}));
				}
			});
		}

	});
	
	collections.SummaryCategoryCollection = Backbone.Collection.extend({
		model: models.SummaryCategory,
		selectable : function() {
			return false;
		},
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    }
	});
	
	collections.SummaryFeatureCollection = Backbone.Collection.extend({
		model: models.SummaryFeature,
		selectable : function() {
			return false;
		}
	});
	
	collections.HotDealCollection = Backbone.Collection.extend({
		model: models.HotDeal,
		comparator: function(model) {
			return parseInt(model.get('order'));
	    },
	    urlRoot: Config.buildandprice.urls.hotdealsURL
	});
	
	
	return collections;
	
})(window, document, models, jQuery);