/**
 * @author Sohrab Zabetian
 * 
 * Omniture Analytics
 */
var CAnalytics = Backbone.Model.extend({
	
	defaults : {
		nameplates : new Array(), //must use an array instead of collection since namplates are ordered in a particular order
								 //not index based
		derivatives : new Array()
	},
	
	initialize: function() {
		Events.bind(Events.eventList.comparator.omniture.NameplateSelectedEvent,this.nameplateSelected,this);
		Events.bind(Events.eventList.comparator.omniture.DerivativeSelectedEvent,this.derivativeSelected,this);
		Events.bind(Events.eventList.comparator.router.StartOverEvent.name,this.startOver,this);
		Events.bind(Events.eventList.comparator.view.StartOverEvent,this.startOver,this);
		Events.bind(Events.eventList.comparator.omniture.ComparatorStartedEvent,this.comparatorStarted,this);
		Events.bind(Events.eventList.comparator.omniture.CompareDerivativesEvent, this.compareDerivatives, this);
		Events.bind(Events.eventList.comparator.omniture.PrintLinkClickedEvent, this.printLinkClicked, this);
	},
	
	findEntity: function(model, list) {
		var i = 0, index = -1;
		_.find(list, function(item) {
			if (item.get('id') === model.get('id')) {
				index = i;
				return true;
			} else {
				i++;
				return false;
			}
		});
		return index;
	},
	
	nameplateSelected: function(model) {
		this.entitySelected(model, this.get('nameplates'));
	},
	
	derivativeSelected: function(model) {
		this.entitySelected(model, this.get('derivatives'));
	},
	
	entitySelected: function(model, list) {
		if (!model.get('selected')) {
			var index = this.findEntity(model, list);
			if (index >=0) {
				list.splice(index, 1);
			}
		} else {
			
			if (list.length > 0 && this.findEntity(model, list) === -1) {
				list.push(model);	
			} else if (list.length === 0){
				list.push(model);	
			} 
		}
	},
	
	
	startOver: function() {
		this.set('nameplates', new Array());
		this.set('derivatives', new Array());
	},
	
	comparatorStarted: function(data) {
		this.trackOmnitureAction({action: 'ComparatorStarted'});
	},
	
	compareDerivatives: function(data) {
		this.trackOmnitureAction({action: 'CompareDerivatives'});
	},
	
	printLinkClicked: function(data) {
		this.trackOmnitureAction({action: 'PrintLinkClicked'});
	},
	
	resetOmnitureVars: function() {
		_da.tool = _da.der = _da.nameplate = _da.events = _da.region = undefined;
		_da.funnel.stepname = undefined;
	},
	
	setupOmnitureVars: function(data) {
		_da.funnel.stepname = data.stepName;
		if (true === data.dontAddNamplates) {
			return;
		}
		var nameplates = this.get('nameplates');
		if (nameplates != null && nameplates.length > 0) {
			var nameplate = nameplates[0];
				_da.nameplate = {name : nameplate.get('analyticsName') || nameplate.get('name'),
								 year :  nameplate.get('modelYear'),
								 id : nameplate.get('id'),
								 cat :  nameplate.get('analyticsCategory') || nameplate.get('category')}; 
            
            
		}  
		
		if (typeof data.der !=='undefined'){
			_da.der = data.der;
		}
		
		if (typeof data.events !== 'undefined' && data.events != null) {
			_da.events = data.events.split(',');
		}
	},
	
	trackOmnitureAction: function(data) {
		this.resetOmnitureVars();
		switch(data.action) {
			case 'ComparatorStarted':
				data.stepName = '';
				data.dontAddNamplates = true;
				this.trackOmniture(data);
				break;
			case 'CompareDerivatives': 
				data.stepName = 'summary';
				var derivative = this.get('derivatives')[0];
				data.der = { name : derivative.get('name')};
				data.events = 'event12,event43';
				this.trackOmniture(data);
				break;
			case 'PrintLinkClicked':
				var params = { type : 'o'};
				params.pname = _da.pname + ':summary';
				params.link = params.title = 'compare:summary:print';
				params.onclicks = 'print compare';
				this.setupOmnitureVars(data);
				//ND.omniture.trackLink(params);
				$.publish('/analytics/link/', params);
				break;
		}
	},
	
	trackOmniture: function(data) {
		this.setupOmnitureVars(data);
		ND.analyticsTag.trackOmnitureSinglePageApp();
	}
	
	
	
 });