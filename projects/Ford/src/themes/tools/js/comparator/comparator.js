/**
 * global self executing function
 */
(function(window, document, v, m, c, $, undefined){
	
	/**
	 * In charge of managing pages and loading information for each page.
	 */
	var ComparatorApp = Backbone.Router.extend({
		 
		routes: { 
		    "": "navToNameplatesPage",
		    "add/n/:nameplateId": "navToNameplatesPage"
		},
		
		navToNameplatesPage : function(nameplateId) {
		
			var self = this, 
				nameplateCollection = this.storage.get(Constants.comparatorStorage.nameplateCollection),
				nameplateContainer = self.storage.get(Constants.comparatorStorage.nameplateContainer);
				
			if (!nameplateCollection || nameplateCollection === null) {
				v.Util.blockUI();	
				
				this.fetchModel(Constants.comparatorStorage.nameplateCollection, new c.Nameplates(), function(nameplates) {
					var comparisonChart = this.storage.get(Constants.comparatorStorage.comparisonChart);
					if (comparisonChart == null) {
						comparisonChart = new m.ComparisonChart({'canAdd' : true, 'startOver' : false, 'derivatives' : null});
						this.storage.set(Constants.comparatorStorage.comparisonChart, comparisonChart);
						v.Util.showView('VehicleComparisonView', v.VehicleComparisonView, comparisonChart);
					}
					if (nameplateContainer == null) {
						nameplateContainer = new m.NameplateContainer({vehicleCount : comparisonChart.getDerivativeCount()});
						self.storage.set(Constants.comparatorStorage.nameplateContainer, nameplateContainer);
					}
					self.selectNameplate(nameplates,nameplateContainer, nameplateId);
					v.Util.unblockUI();
				}, function(model) { //url builder callback
					var nameplateUrl = Helper.buildURL(model.urlRoot);
					if (typeof this.nameplateWhitelist !== 'undefined' && this.nameplateWhitelist.length > 0) {
						nameplateUrl += '?mid=' + this.nameplateWhitelist.join(',');
					}
					return nameplateUrl;
				});
			} else {
				this.selectNameplate(nameplateCollection,nameplateContainer, nameplateId);
			}
		},
		
		selectNameplate: function(nameplates, nameplateContainer , nameplateId) {
			v.Util.showView('NameplateListView', v.NameplateListView, nameplates);
			v.Util.showView('NameplateNavigationView', v.NameplateNavigationView, nameplateContainer);
			var selectedNameplate = nameplates.getSelected();
			var clickedNameplate = nameplates.getClicked();
			if (selectedNameplate != null && selectedNameplate.length > 0) {
				this.navigateToDerivativesPage(selectedNameplate[0].get('id'));
			} else if (clickedNameplate != null) {
				this.navigateToDerivativesPage(clickedNameplate.get('id'));
			} else if (typeof nameplateId !== 'undefined') {
			
				var nameplate = nameplates.clickById(nameplateId);
				if (nameplate && nameplate != null) {
					this.navigateToDerivativesPage(nameplateId);
				} 
			}
			Events.fireEvent(Events.eventList.comparator.omniture.ComparatorStartedEvent);
		},
		
		navigateToDerivativesPage : function(nameplateId) {
			
			var nameplates = this.storage.get(Constants.comparatorStorage.nameplateCollection);
			var nameplate = nameplates.get(nameplateId);
			if (nameplate != null) {
//				console.log('loading derivatives for nameplate ' + nameplateId);
				var derivatives = nameplate.get('derivatives');
				if ((typeof derivatives === 'undefined') || derivatives == null) {
					derivatives = new c.Derivatives();
					derivatives.url = Helper.buildURL(derivatives.urlRoot, nameplateId);
					v.Util.blockUI();
					$.when(derivatives.fetch()).then(function() {
						//Util.log('set derivatives for nameplate ' + nameplateId);
						nameplate.set('derivatives', derivatives);
						v.Util.unblockUI();
						nameplate.trigger(Events.eventList.comparator.router.DerivativesChangedEvent);
					});
				} else {
					//console.log('using cached data to show derivatives for nameplate ' + nameplateId);
					nameplate.trigger(Events.eventList.comparator.router.DerivativesChangedEvent);
				}
//				Events.fireEvent(Events.eventList.comparator.router.DerivativeListUpdatedEvent);
//				Events.fireEvent(Events.eventList.comparator.omniture.FirstDerivativeSelectedEvent, {storage: this.storage});
			}
//			else {
//				console.log('Could not find a nameplate with id ' + nameplateId);
//			}
		},
		
		navToComparePage : function() {
			v.Util.blockUI();
			var comparisonChart = this.storage.get(Constants.comparatorStorage.comparisonChart);
			var ids = comparisonChart && comparisonChart != null && comparisonChart.get('derivativeIds');
			if (ids && ids != null) {
				if (ids.length > 0) {
					
					comparisonChart.url = comparisonChart.urlRoot;
					comparisonChart.url += ids.join(',');
					var self = this;
					//Cannot use fetchModel since we need to make a fresh call
					$.when(self.deferredFetchAndPersist(Constants.comparatorStorage.comparisonChart, comparisonChart))
					 .then(function() {
						 self.displayCompareChart(comparisonChart);
						 v.Util.unblockUI();
					});
					
				} else {
					//Util.log('calling start over');
					Events.fireEvent(Events.eventList.comparator.router.StartOverEvent.name);
					v.Util.unblockUI();
				}
				
			} else {
				v.Util.unblockUI();
			}
			
		},
		
		displayCompareChart: function(model) {
			////Util.log('start:' + new Date());
			var categoryNames = model.get('categories');
			var tables = model.get('tables');
			
			if (tables == null) {
				tables = new c.Tables();
				v.Util.showView('TablesView', v.TablesView, tables);
			}  else {
				tables.reset();
			}
			var derivatives = model.get('derivatives');
			var noteCounter = 0;
			var firstRowColumns = new c.Columns();
			var firstRowHeaderPopulated = false;
			var hasKeyFeature = false;
		
			var tableOrder = 0;
			_.each(categoryNames.models, function(category) {
				var catId = category.get('id');
				var features = category.get('features');
				
//				var table = tables.get(catId);
//				if (typeof table !== 'undefined') {
////						console.log('found an old table for category ' + category.get('name'));
//					rows = table.get('rows');
//					rows.reset();
//					table.set('order', tableOrder);
//				} else {
//						console.log('Creating new table for category:' + category.get('name'));
				var rows = new c.Rows();
				var table = new m.Table({title: category.get('name'), id : catId, rows : rows, order: tableOrder});
//				}
				tableOrder++;
				//add vehicle names as first row of table
				var rowCount = 0;
				_.each(features.models, function(feature) {
					var rowColumns = new c.Columns();
					var value;
					_.each(derivatives.models, function(derivative) {
						//for very first row of a category, add name of derivatives to 
						if (rowCount == 0 && !firstRowHeaderPopulated) {
							firstRowColumns.add(new m.Column({value : derivative.get('name'), derivativeId : derivative.get('derivativeId')}));
						}
						if ((hasKeyFeature === false) && derivative.get('summary') != '') {
							hasKeyFeature = true;
						}
						var drvFeatures = derivative.get('categories').get(catId).get('features');
						var drvFeature =  drvFeatures.get(feature.get('id'));
						value = drvFeature.get('value');
						var drvNoteAss = drvFeature.get('noteAssigned');
						var drvNote = drvFeature.get('note');
						var drvHasNote = (drvNote && drvNote != null);
						var drvHasNoteAss = (drvNoteAss && drvNoteAss != null);
						var concatNote = drvHasNote ? drvNote : ('' + (drvHasNoteAss ? drvNoteAss : ''));
						var hasConcatNote = drvHasNoteAss || drvHasNote;
						rowColumns.add(new m.Column({
								value : value ? value : '',
								derivativeId : derivative.get('derivativeId'),
								hasNote: hasConcatNote,
								noteCounter : hasConcatNote ? ++noteCounter : 0,
								note: hasConcatNote ? concatNote : null}));
						
					});
					
					
					
					if (rowCount == 0) {
						firstRowHeaderPopulated = true;
						rows.add(new m.Row({header: '&nbsp;', order : 0, id: 0, columns:  firstRowColumns}));
					}
					rowCount++;
					var note = feature.get('note');
					var hasNote = (note && note != null);
					rows.add(new m.Row({header: feature.get('name'),
						id : feature.get('id'), 
						order : rowCount, 
						columns: rowColumns, 
						hasNote: hasNote,
						noteCounter : hasNote ? ++noteCounter : 0,
						note: hasNote ? note : null
				   }));
					
				});
				tables.add(table);
					////Util.log('categoryName: ' + category.get('name'));
			});
			tables.trigger(Events.eventList.comparator.router.TableLoadCompletedEvent);
			
			//Util.log('displayCompareChart->groupedCategories: ' + tables.length);
			model.set({canAdd : derivatives.length < 4, 
				tables: tables, 
				hasKeyFeature : hasKeyFeature, 
				startOver : derivatives.length > 0}, { silent : true});
			model.trigger('change');
			this.storage.set(Constants.comparatorStorage.comparisonChart, model);
			Events.fireEvent(Events.eventList.comparator.omniture.CompareDerivativesEvent);
		},
		
		registerEvents : function() {
			Events.eventBus.context = this;
			Events.bind(Events.eventList.comparator.router.NameplateClickedEvent.name, 
					Events.eventList.comparator.router.NameplateClickedEvent.handler, this);
			Events.bind(Events.eventList.comparator.router.DerivativeSelectedEvent.name, 
					Events.eventList.comparator.router.DerivativeSelectedEvent.handler, this);
			Events.bind(Events.eventList.comparator.view.AddVehicleRequestEvent, 
					Events.eventList.comparator.router.AddVehicleRequestEvent.handler, this);
			Events.bind(Events.eventList.comparator.view.DerivativeSelectionCompletedEvent, 
					Events.eventList.comparator.router.DerivativeSelectionCompletedEvent.handler, this);
//			Events.bind(Events.eventList.comparator.view.DerivativeSelectionCancelledEvent, 
//					Events.eventList.comparator.router.DerivativeSelectionCancelledEvent.handler, this);
			Events.bind(Events.eventList.comparator.view.RemoveDerivativeRequestEvent,
					Events.eventList.comparator.router.DerivativeRemovalRequestedEvent.handler, this);
			Events.bind(Events.eventList.comparator.view.StartOverEvent,
					Events.eventList.comparator.router.StartOverEvent.handler, this);
			Events.bind(Events.eventList.comparator.router.StartOverEvent.name,
					Events.eventList.comparator.router.StartOverEvent.handler, this);
			
			Events.bind(Events.eventList.comparator.view.PrintLinkClickedEvent,
					Events.eventList.comparator.router.PrintLinkClickedEvent.handler, this);
		},
	
		/**
		 * Note that derivative param may be a Derivative or ComparableDerivative
		 * @param derivative
		 */
		toggleDerivativeSelection : function(derivative) {
			var nameplates = this.storage.get(Constants.comparatorStorage.nameplateCollection);
			var comparisonChart = this.storage.get(Constants.comparatorStorage.comparisonChart);
			var compareIds = comparisonChart.get('derivativeIds');
			var count = compareIds.length;
			var derivativeId = derivative.get('id') || derivative.get('derivativeId');
			var nameplateContainer = this.storage.get(Constants.comparatorStorage.nameplateContainer);
			
			_.find(nameplates.models, function(nameplate) {
				
		    	var derivatives = nameplate.get('derivatives');
		    	if (derivatives && derivatives != null) {
		    		
		    		var foundDerivative = derivatives.get(derivativeId);
					if(foundDerivative != null) {
						nameplateContainer.set('errorMessage','', {silent:true});
						//Util.log('found derivative: ' + derivativeId + ' is it selected ? ' + foundDerivative.get('selected'));
						if (foundDerivative.get('selected') === false) {
							if (count < 4) {
								compareIds.push(foundDerivative.get('id'));
								foundDerivative.set('selected', true);
								foundDerivative.set('clicked', false);
							} else {
								nameplateContainer.set('errorMessage' , Constants.ct.limitReached, {silect: true});
							}
							
						} else { //derivative is already selected
							var idx = _.indexOf(compareIds, derivativeId);
							if (idx >=0) {
								compareIds.splice(idx, 1);
								//Util.log('compare Ids ' + compareIds);
								foundDerivative.set('selected', false);
								foundDerivative.set('clicked', false);
							}
						}
						var selectedItems = derivatives.getSelected();
						var vehicleCount = compareIds.length;
						nameplateContainer.set({'vehicleCount': vehicleCount,
							enabled : (vehicleCount > 1 && vehicleCount <= 4)});
						nameplate.set({'selected': (selectedItems != null && selectedItems.length !== 0), 
									   'count' : selectedItems != null ? selectedItems.length : ''});
						Util.log('is nameplate selected?' + nameplate.get('selected'));
						Events.fireEvent(Events.eventList.comparator.omniture.NameplateSelectedEvent, nameplate);
						Events.fireEvent(Events.eventList.comparator.omniture.DerivativeSelectedEvent, foundDerivative);
						//return to stop search
						return foundDerivative;
					}
		    	}
			});
	    },
		
		/**
		 * Loads a FRESH copy of the data from the server and returns when server replies.
		 * @param modelName
		 * @param modelClass
		 * @returns none
		 */
		deferredFetchAndPersist: function(modelName, modelClass) {
			var deferred = $.Deferred();
				var self = this;
				
				$.when(modelClass.fetch())
				.done(function() {
						self.storage.set(modelName,modelClass);
						deferred.resolve();
					})
				.fail($.proxy(this.navToGenericErrorPage, self));
			return deferred.promise();
		},
		
		fetchModel: function(modelName, modelClass, successCallback, urlBuilderCallback) {
			var model = modelClass;
			var self = this;
			var cachedModel = self.storage.get(modelName);
			if (urlBuilderCallback) {
				model.url = urlBuilderCallback.call(self, model);
			} else {
				model.url = Helper.buildURL(model.urlRoot);
			}
			if (!cachedModel || (cachedModel == null) || (cachedModel.url != model.url)) {
				$.when(model.fetch())
				.done(function() {
					self.storage.set(modelName, model); 
					successCallback.call(self, model);
						
				 })
				 .fail($.proxy(this.navToGenericErrorPage, self));
			} else  {
				successCallback.call(self, cachedModel);
			}
		},
		
		initialize: function(options) {
			this.storage = new m.Storage();
			this.registerEvents();
			this.storage.set(Constants.comparatorStorage.comparableDerivativeCollection, new c.ComparableDerivatives());
			
			var $nameplateWhitelist = $('#comparator-nameplate-whitelist');
			if ($nameplateWhitelist.length) {
				var embeddedData = $nameplateWhitelist.embeddedData();
				this.nameplateWhitelist = embeddedData.whitelist;
			}
		}
		
	});
	
	var Helper = {
		buildURL : function(orig, id) {
			var url =  orig.replace(':pricezoneId', Config.priceZoneId)
			.replace(':id', id);
			return url;
		}
	};
	
	$(document).ready(function() {
		if ($('body').hasClass('bpcomparator')) {
			window.ComparatorApp = new ComparatorApp();
			//only start omniture tracking if everything is configured
			if (ND.analyticsTag.isSinglePageAppOmnitureConfigured()) {
				var comparatorAnalytics = new CAnalytics();
			}
			Backbone.history.start(); 
		} else {
			//console.log('Comparator will not start.');
		}
		
	});
	
})(window, document, Views.Comparator, ComparatorModels, ComparatorCollections, jQuery);