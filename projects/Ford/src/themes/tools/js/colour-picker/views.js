/**
 * global self executing function
 * 
 * @author Sohrab Zabetian 
 */

ND.CP.Views = (function(window,document, $, Backbone){
	
	var views = {};

	views.CPDerivativeSelector = Backbone.View.extend({

		events : {
			'change select' : "onChange"
		},

		initialize : function() {
			this.$el = $('#cp-derivative-selector');
			this.template =  _.template($("#cp-derivative-selector-template").html());
			this.collection.bind('change:selected', this.render, this);
		},

		render:function(){
			this.$el.html(this.template({collection: this.collection.models}));
			return this;
		},

		updateSelected: function(){
			this.$el.html();
		},

		onCollectionReset:function(){
			this.render();
		},

		onChange:function(e){
			var selectedId = $(e.currentTarget).val();
			var selectedModel = this.collection.get(selectedId);
			Backbone.trigger(ND.CP.Events.ChangeSelectedDerivative, selectedModel);
		}

	});

	views.CPCar = Backbone.View.extend({
		initialize : function() {
			this.template =  _.template($("#cp-car-template").html());
			this.$el = $('#cp-car');
		},

		render: function() {
			this.$el.hide();
			this.$el.html(this.template({model: this.model}));
			this.$el.fadeIn();
			return this;
		}
	});

	views.CPColourSelector = Backbone.View.extend({

		initialize : function() {
			this.$el = $('#cp-colour-selector');
			this.template =  _.template($("#cp-colour-selector-template").html());
			this.colourItemTemplate = _.template($("#cp-colour-selector-item-template").html());
			this.collection.bind('reset', this.renderColours, this);
			this.collection.bind('change:selected', this.renderModel, this);
		},

		renderColours:function(){
			this.$el.html(this.template());
			var colorEl = this.$el.find('#cp-colour-list');

			this.collection.each(function(model){
				var itemView = new ND.CP.Views.CPColourSelectorItem(
					{
						model: model,
						template : this.colourItemTemplate
					}
				);
				colorEl.append(itemView.render().$el);
			}, this);

			return this;
		},

		renderModel:function(model) {
			if (!model.selected) {
				var colourName = this.$el.find('.cp-sub-title');
				// &#x200F; is to make RTL works with a span inside a heading (H3)
				colourName.html('&#x200F;'+model.get('name'));
			}
		}
	});

	views.CPColourSelectorItem = Backbone.View.extend({

		tagName: 'li',

		events : {
			'click .cp-color-item' : "onClick"
		},

		initialize : function(options) {
			this.template = options.template;
			this.model.bind('change:selected', this.toggleSelected, this);
		},

		toggleSelected: function(e) {
			var selected = this.model.get('selected');
			$(this.el).toggleClass('cp-active', selected);
		},

		render: function() {
			this.$el.html(this.template({model: this.model}));
			return this;
		},

		onClick:function(e){
			e.preventDefault();
			if (!this.model.get('selected')) Backbone.trigger(ND.CP.Events.ChangeSelectedColour, this.model);
		}

	});

	views.CPTrim = Backbone.View.extend({

		initialize : function() {
			this.template =  _.template($("#cp-trim-template").html());
			this.$el = $('#cp-trim');
		},

		render: function () {
		    this.$el.hide();
		    if (this.model) {
		        this.$el.html(this.template({ model: this.model }));
		        this.$el.show();
		    }

		    return this;
		}
	});

	views.CPTrimSelector = Backbone.View.extend({
		initialize : function() {
			this.$el = $('#cp-trim-selector');
			this.template =  _.template($("#cp-trim-selector-template").html());
			this.trimItemTemplate = _.template($("#cp-trim-selector-item-template").html());
			this.collection.bind('reset', this.onCollectionReset, this);
		},

		render:function(){
			this.$el.html(this.template());
			var trimEl = this.$el.find('#cp-trim-list');

			this.collection.each(function(model){
				var item = new ND.CP.Views.CPTrimSelectorItem(
					{
						model: model,
						template : this.trimItemTemplate
					}
				);
				trimEl.append(item.render().$el);
			}, this);

			return this;
		},

		onCollectionReset : function() {
			this.render();
		}
	});

	views.CPTrimSelectorItem = Backbone.View.extend({

		tagName: 'li',

		events : {
			'click .cp-trim-item' : "onClick"
		},

		initialize : function(options) {
			this.template = options.template;
			this.model.bind('change:selected', this.toggleSelected, this);
		},

		toggleSelected: function(e) {
			var selected = this.model.get('selected');
			$(this.el).toggleClass('cp-active', selected);
		},

		render: function() {
			this.$el.html(this.template({model: this.model}));
			return this;
		},

		onClick:function(e){
			e.preventDefault();
			if (!this.model.get('selected')) Backbone.trigger(ND.CP.Events.ChangeSelectedTrim, this.model);
		}
	});

	views.ViewManager = function() {

		var loader = null;

		var blockUI = function() {
			if (loader === null) {
				loader = ND.loadmask();
				loader.show();
			}
		};

		var unblockUI = function() {
			if (loader !== null) {
				loader.hide();
				loader = null;
			}
		};

		return {
			initialise: function () {
				Backbone.on(ND.CP.Events.BlockUI, blockUI, this);
				Backbone.on(ND.CP.Events.UnblockUI, unblockUI, this);
			}
		};

	};

	return views;

	/*****************************END OF VIEWS*****************************/
	
})(window, document, jQuery, Backbone);
