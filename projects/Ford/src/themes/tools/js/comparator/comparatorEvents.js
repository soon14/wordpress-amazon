/**
 * 
 * @author Sohrab Zabetian 
 */
Events.eventList.comparator = {
	
	
		/**
		 * Events are grouped based on where they are fired.
		 * view events are Fired from View objects, etc
		 */
		view: {
		
			NameplateClickedEvent: 'NameplateSelectedEvent',
			DerivativeSelectedEvent: 'DerivativeSelectedEvent',
			AddVehicleRequestEvent : 'AddVehicleRequestEvent',
			DerivativeSelectionCancelledEvent : 'DerivativeSelectionCancelledEvent',
			DerivativeSelectionCompletedEvent : 'DerivativeSelectionCompletedEvent',
			RemoveDerivativeRequestEvent: 'RemoveDerivativeRequestEvent',
			ExpandTableEvent: 'ExpandTableEvent',
			CollapseTableEvent: 'CollapseTableEvent',
			StartOverEvent : 'StartOverEvent',
			PrintLinkClickedEvent: 'PrintLinkClickedEvent'
		}, 
		
		omniture: {
			PrintLinkClickedEvent: 'Omniture:PrintLinkClickedEvent',
			ComparatorStartedEvent: 'Omniture:ComparatorStartedEvent',
			CompareDerivativesEvent: 'Omniture:CompareDerivativesEvent',
			NameplateSelectedEvent : 'Omniture:NameplateSelectedEvent',
			DerivativeSelectedEvent: 'Omniture:DerivativeSelectedEvent'
		},
		
		router : {
			
			PrintLinkClickedEvent : {
				name : 'PrintLinkClickedModelEvent',
				handler : function() {
					Events.fireEvent(Events.eventList.comparator.omniture.PrintLinkClickedEvent);
				}
			},
			
			
			NameplateClickedEvent: {
				name : 'NameplateClickedModelEvent',
				handler : function(model) {
					var collection = this.storage.get(Constants.comparatorStorage.nameplateCollection);
					collection.click(model);
					//console.log('nameplate ' + model.get('name') + ' was clicked');
					this.navigateToDerivativesPage(model.get('id'));
					
				}
			},
			
			DerivativeSelectedEvent: {
				name : 'DerivativeSelectedModelEvent',
				handler : function(derivative) {
					//look through nameplates for selected derivative
					this.toggleDerivativeSelection(derivative);
				}
			},
			
			DerivativeSelectionCompletedEvent: {
				name: 'DerivativeSelectionCompletedModelEvent',
				handler : function() {
					this.navToComparePage();
				}
			},
			
			DerivativeRemovalRequestedEvent: {
				name: 'DerivativeRemovalRequestedModelEvent',
				handler : function(derivative) {
					//Util.log('DeriativeId: ' + derivative.get('derivativeId'));
					this.toggleDerivativeSelection(derivative);
					this.navToComparePage();
				}
			},
			
			AddVehicleRequestEvent : {
				name: 'AddVehicleRequestModelEvent',
				handler : function() {
					var model = this.storage.get(Constants.comparatorStorage.comparisonChart);
					var derivatives = model.get('derivatives');
					if (derivatives == null || derivatives.length < 4) {
						this.navToNameplatesPage();
					} 
				}
			},
			
			StartOverEvent: {
				name: 'StartOverModelEvent',
				handler: function() {
					//Util.log('starting over');
					var comparisonChart = this.storage.get(Constants.comparatorStorage.comparisonChart);
					if (comparisonChart != null && comparisonChart.get('derivatives') != null) {
						comparisonChart.get('derivatives').reset();
						comparisonChart.get('categories').reset();
						comparisonChart.get('tables').reset();
						comparisonChart.set({
							startOver: false,
							canAdd : true, 
							hasKeyFeature : false,
							derivativeIds : []});
					}
					var nameplateContainer = this.storage.get(Constants.comparatorStorage.nameplateContainer);
					nameplateContainer.set({vehicleCount : 0, errorMessage: '', enabled: false});
					var nameplates = this.storage.get(Constants.comparatorStorage.nameplateCollection);
					
					_.each(nameplates.models, function(nameplate) {
						var derivatives = nameplate.get('derivatives');
				    	if (derivatives && derivatives != null) {
				    		derivatives.deselectAll();
				    		nameplate.set('selected', false);
				    		nameplate.set('clicked', false);
				    	}
					});
					Events.fireEvent(Events.eventList.comparator.view.DerivativeSelectionCancelledEvent);
					this.navToNameplatesPage();
					
				}
			},
			
			BlockUIEvent: 'BlockUIEvent',
			UnblockUIEvent: 'UnblockUIEvent',
			TableLoadCompletedEvent: 'TableLoadCompletedEvent',
			DerivativeListUpdatedEvent: 'DerivativeListUpdatedEvent',
			DerivativesChangedEvent: 'DerivativesChangedEvent'
		}
	};
		
