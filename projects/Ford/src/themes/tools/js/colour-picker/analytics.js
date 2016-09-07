/**
 * @author Sohrab Zabetian
 *
 * Omniture Analytics
 */
ND.CP.Analytics = Backbone.Model.extend({

	initialize: function() {
		Backbone.on(ND.CP.Events.ChangeSelectedColour, this.colourChanged, this);
		Backbone.on(ND.CP.Events.ChangeSelectedTrim, this.trimChanged, this);
	},

	setupParams: function(data, type) {
		var params = { type: type};
		this.resetOmnitureVars();
		return params;
	},

	colourChanged: function(data) {
		var params = this.setupParams(data, 'o');
		params.pname = _da.pname;
		params.link = params.title = _da.pname + ':change color';
		params.onclicks = 'exterior:colorizer';
		//ND.omniture.trackLink(params);
		$.publish('/analytics/link',params)
	},

	trimChanged: function(data) {
		var params = this.setupParams(data, 'o');
		_da.region = undefined;
		params.pname = _da.pname;
		params.link = params.title = _da.pname + ':change trims';
		params.onclicks = 'exterior:trims';
		//ND.omniture.trackLink(params);
		$.publish('/analytics/link',params);
	},

	resetOmnitureVars: function() {
		_da.tool = _da.der = _da.events = _da.region = undefined;
		_da.funnel.stepname = undefined;
	}

});