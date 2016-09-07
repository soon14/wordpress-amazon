/**
 * Sohrab Zabetian
 *
 * Requires backbone/underscore/jquery
 */
Views.Comparator = (function(window,document, $, undefined){

	var views = {};

	views.NameplateNavigationView = Backbone.View.extend({

		className: 'comparatortips',

		initialize: function() {
			this.template = _.template($('#c-nameplate-nav-template').html());
			this.model.bind('change', this.render, this);
			Events.bind(Events.eventList.comparator.view.DerivativeSelectionCompletedEvent, this.hide, this);
			Events.bind(Events.eventList.comparator.view.DerivativeSelectionCancelledEvent, this.hide, this);
		},

		events: {
			'click #c-compare-close' : 'close',
			'click #c-compare' : 'compareClicked'
		},

		compareClicked : function(e) {
			e.preventDefault();
			var $target = $(e.target);
			if ($target.hasClass('enabled')) {
				Events.fireEvent(Events.eventList.comparator.view.DerivativeSelectionCompletedEvent);
			} else {
				return false;
			}
		},

		close : function(e) {
			e.preventDefault();
			Events.fireEvent(Events.eventList.comparator.view.DerivativeSelectionCancelledEvent);
		},

		show: function() {
			var el = this.$el;
			if (el.hasClass('hidden')) {
				el.removeClass('hidden');
			}
		},

		hide: function() {
			var el = this.$el;
			if (!el.hasClass('hidden')) {
				el.addClass('hidden');
			}
		},

		display: function() {
			if ($('#c-select-nameplate-container').hasClass('c-empty')) {
				$('#c-select-nameplate-container').removeClass('c-empty').prepend(this.render().$el);
			} else {
				this.show();
			}
		}

	});

	/**
	 * In charge of rendering list of Derivative (NOT DerivativeDetails)
	 */
	views.NameplateListView = Backbone.View.extend({
		children : [],

		id: 'c-select-nameplate-container',

		className: 'bpc_model_select c-empty',

		render: function() {
			var i = 0;
			var el = this.$el;
			el.html(this.template());

			var derivativeListEl = el.find('#c-featurecarousel-ul');

			var self = this;
			_.each(this.collection.models, function (vehicle) {
				self.children[i] = new views.NameplateItemView({model:vehicle});
				derivativeListEl.append(self.children[i].render().$el);
				i++;
	        }, this);

	        if (this.children.length === 3) {
				derivativeListEl.addClass('bpc_3_models');
			} else if (this.children.length === 4) {
				derivativeListEl.addClass('bpc_4_models');
			}

	        return this;
		},

		initialize: function() {
			this.template = _.template($('#c-nameplate-list-template').html());
			Events.bind(Events.eventList.comparator.view.DerivativeSelectionCompletedEvent, this.hide, this);
			Events.bind(Events.eventList.comparator.view.DerivativeSelectionCancelledEvent, this.hide, this);
		},

		show: function() {
			var el = this.$el;
			if (el.hasClass('hidden')) {
				el.removeClass('hidden');
			}

		},

		hide: function() {
			var el = this.$el;
			if (!el.hasClass('hidden')) {
				el.addClass('hidden');
			}
			if ($('#tables .expandactols').size()) {
				$('.print_icon').show();
			}
			if(el.hasClass('bpc_model_select')&&$('.overlay-wrap').length>0){//remove mask if exist
				$('.overlay-wrap').remove();
			}
		},

		create: function() {
			//Util.log('views.NameplateListView.display(): replacing content');
			if (this.children && this.children.length > 0) {
				_.each(this.children, function(child) {
					child.destroy();
				});
				this.children = [];
				this.$el.empty();
			}

			$('#comparator-select-nameplate').html(this.render().$el).removeClass('c-empty');

			// $.fn.buildCarousel();

			var site = $('#common-config').embeddedData().site;

			if (!!site && site.indexOf('LCN') === -1) {
				$.fn.buildComparatorCarousel('#c-nameplate-carousel');
			}

			this.lazyload();
		},

		display: function() {
			if ($('#comparator-select-nameplate').hasClass('c-empty')) {
				this.create();
			} else {
				this.show();
			}

			//add mask on lincoln site
			var _body = $("body");
			if(_body.hasClass("lincoln_comparator")){//distinguish with other pages
				this.loadOverlayMask();
			}

			$('.print_icon').hide();
		},

		loadOverlayMask : function(){// add mask
			$("body").append('<div class="overlay-wrap"></div>');
			var mask = $(".overlay-wrap");
			mask.on("click",function(){//trigger when click on mask
				mask.remove();
				$(".bpc_model_select").addClass("hidden");
			})
		}
	});

	/**
	 * In charge of rendering a single Derivative (NOT DerivativeDetails) Item
	 */
	views.NameplateItemView = Backbone.View.extend({
		 tagName: 'li',

		 className : 'c-nameplate-list-item',

		 events: {
			 'click .c-nameplate-list-item' : 'nameplateSelected'
		 },

		 nameplateSelected : function(e) {
			 e.preventDefault();
			// Util.log('nameplateSelected');
			 this.model.trigger(Events.eventList.comparator.view.NameplateClickedEvent, this.model);
		 },

		 initialize: function() {
			  this.template = _.template($('#c-nameplate-list-item-template').html());
			  this.model.bind('change:selected change:clicked', this.toggleClass, this);
			  this.model.bind('change:count', this.updateCount, this);
			  this.model.bind(Events.eventList.comparator.router.DerivativesChangedEvent, this.renderDerivatives, this);
			  this.model.bind('destroy', this.destroy, this);
		 },

		 render: function() {
			  var html = this.template(this.model.toJSON());
			  this.toggleClass().html(html);
			  return this;
		 },

		 toggleClass : function() {
			 var el =  $(this.el);
			 el.toggleClass('click', this.model.get('clicked') && !this.model.get('selected'))
			  			.toggleClass('cur', this.model.get('selected'));
			 return el;
		 },

		 updateCount : function() {
			 $(this.el).find('.count').text(this.model.get('count'));
		 },

		 renderDerivatives : function() {
			var collection = this.model.get('derivatives');
			if (collection != null) {
				var view = new views.DerivativeListView({collection: collection});
				view.create();
			}
		 }
	});


	/**
	 * In charge of rendering list of Derivative (NOT DerivativeDetails)
	 */
	views.DerivativeListView = Backbone.View.extend({
		children : [],

		id: 'c-select-derivative-container',

		render: function() {
			var i = 0;
			var el = this.$el;
			el.html(this.template());
			var derivativeListEl = el.find('#c-drv-featurecarousel-ul');
			var self = this;

			_.each(this.collection.models, function (vehicle) {
				self.children[i] = new views.DerivativeItemView({model:vehicle});
				derivativeListEl.append(self.children[i].render().$el);
				i++;
	        }, this);

	        if (this.children.length === 4) {
				derivativeListEl.addClass('bpc_4_derivatives');
			}
			else if(this.children.length === 5) {
				derivativeListEl.addClass('bpc_5_derivatives');
			}

	        return this;
		},

		initialize: function() {
			this.template = _.template($('#c-derivative-list-template').html());
			Events.bind(Events.eventList.comparator.view.DerivativeSelectionCompletedEvent, this.hide, this);
			Events.bind(Events.eventList.comparator.view.DerivativeSelectionCancelledEvent, this.hide, this);
//			Events.bind(Events.eventList.comparator.router.DerivativeListUpdatedEvent, this.show, this);
		},

		show: function() {
			var el = this.$el;
			if (el.hasClass('hidden')) {
				el.removeClass('hidden');
			}
		},

		hide: function() {
			var el = this.$el;
			if (!el.hasClass('hidden')) {
				el.addClass('hidden');
			}
		},

		create: function() {
			//Util.log('views.DerivativeListView.display(): replacing content');
			if (this.children && this.children.length > 0) {
				_.each(this.children, function(child) {
					child.destroy();
				});
				this.children = [];
				this.$el.empty();
			}
			$('#c-nameplate-derivatives').html(this.render().$el);

			// $.fn.buildComparatorCarousel('#c-derivative-carousel');

			this.lazyload();
		}

	});

	/**
	 * In charge of rendering a single Derivative (NOT DerivativeDetails) Item
	 */
	views.DerivativeItemView = Backbone.View.extend({
		 tagName: 'li',

		 events: {
			 'click .c-derivative-list-item' : 'derivativeSelected'
		 },

		 derivativeSelected : function(e) {
			 //Util.log('derivativeSelected');
			 e.preventDefault();
			 this.model.trigger(Events.eventList.comparator.view.DerivativeSelectedEvent, this.model);
		 },

		 initialize: function() {
			 this.template = _.template($('#c-derivative-list-item-template').html());
			 this.model.bind('change:selected', this.toggleClass, this);
			 this.model.bind('destroy', this.destroy, this);
		 },

		 render: function() {
			 var html = this.template(this.model.toJSON());
			 this.toggleClass().html(html);
			 return this;
		 },

		 toggleClass : function() {
			var el = $(this.el);
			el.toggleClass('cur', this.model.get('selected') );
		    return el;
		 }
	});

	views.AddDerivativeView = Backbone.View.extend({

		className: 'derivative add',

		events: {
			'click' : 'addVehicleClicked'
		},

		addVehicleClicked : function(e) {
			e.preventDefault();
			Events.fireEvent(Events.eventList.comparator.view.AddVehicleRequestEvent);
		},

		initialize: function() {
		  this.template = _.template($('#c-add-to-compare-template').html());
	    },

	    render: function() {
			 $(this.el).html(this.template());
			 return this;
		}

	});

	views.VehicleComparisonView = Backbone.View.extend({
		children : [],

		el : '#c-comparison-chart',

		events: {
			'click #c-start-over' : 'startOver'
		},

		startOver: function(e) {
			e.preventDefault();
			//Util.log('startOverClicked');
			Events.fireEvent(Events.eventList.comparator.view.StartOverEvent);
		},

		render: function() {
			//Util.log('VehicleComparisonView.render');

			var el = this.$el;
			var rowEl = el.find('#c-first-row');
			if (rowEl.length <= 0) {
				el.html(this.template());
				rowEl = el.find('#c-first-row');
			} else {
				rowEl.empty();
			}
			rowEl.append(this.keyFeaturesTemplate({hasKeyFeature : this.model.get('hasKeyFeature'),
				startOver: this.model.get('startOver') }));
			var collection = this.model.get('derivatives');
			if (collection != null && collection.length > 0) {
				this.children[0] = new views.VehiclesView({collection : collection});
				rowEl.append(this.children[0].render().$el);
				this.lazyload();
			}
			if (this.model.get('canAdd')) {
				var addDerivative = new views.AddDerivativeView({model : {}});
				rowEl.append(addDerivative.render().$el);
				this.children[1] = addDerivative;
				el.prepend(rowEl);
			}
	        return this;
		},

		initialize: function() {
			this.template = _.template($('#c-first-row-template').html());
			this.keyFeaturesTemplate = _.template($('#c-key-features-template').html());
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.destroy, this);
	    },

		display: function() {
			this.render();
		}
	});

	views.VehiclesView = Backbone.View.extend({
		children : [],

		initialize: function() {
			this.collection.bind('reset', this.reset, this);
		},

		render: function() {
			if (this.collection != null && this.collection.length > 0) {
				var el = this.$el;
				var i = 0;
				////Util.log('collection.length : ' + this.collection.length);
				_.each(this.collection.models, function (vehicle) {
					//add vehicle overview
					//alert(JSON.stringify(vehicle));
					this.children[i] = new views.VehicleView({model:vehicle});
					el.append(this.children[i].render().$el);
					i++;
		        }, this);
			}
			return this;
		},

		reset : function() {
			if (this.children != null && this.children.length > 0) {
				_.each(this.children, function (child) {
					child.destroy();
				});
			}
			this.children= [];
			this.$el.empty();
		}
	});

	views.VehicleView = Backbone.View.extend({
		className: 'derivative',

		events: {
			'click .remove' : 'removeVehicleClicked'
		},

		removeVehicleClicked : function(e) {
			e.preventDefault();
			Events.fireEvent(Events.eventList.comparator.view.RemoveDerivativeRequestEvent, this.model);
		},

		initialize: function() {
			this.template = _.template($('#c-vehicle-template').html());
			this.model.bind('destroy', this.destroy, this);
		}
	});

	views.TablesView = Backbone.View.extend({

		children : [],

		initialize: function() {
			this.template = _.template($('#c-tables-template').html());
			this.collection.bind('destroy', this.destroy, this);
			this.collection.bind('reset', this.reset, this);
			this.collection.on('add', this.add, this);
			this.collection.on('remove', this.remove, this);
			this.collection.bind(Events.eventList.comparator.router.TableLoadCompletedEvent, this.initTooltip, this);
			this.expandCollapseButtonsAdded = false;
			$('#print-comparator-data').on('click' , function() {
				Events.fireEvent(Events.eventList.comparator.view.PrintLinkClickedEvent);
				window.print();
			});
		},

		events: {
			'click .c-expand-collapse-all' : 'toggleExpandCollapse'
		},

		initTooltip: function() {
			if (this.children.length > 0) {
				if (this.expandCollapseButtonsAdded === false) {
					this.$el.prepend(this.template());
					this.expandCollapseButtonsAdded = true;
				}
				$.fn.tooltip();
				this.children[0].expand();
			}
			//Util.log('initTooltip');
			$('.print_icon').show();
		},

		toggleExpandCollapse : function(e) {
			e.preventDefault();
			var $target = $(e.target);
			if ($target.attr('id') === 'c-expand-all' ||
				$target.parent().attr('id') === 'c-expand-all') {
				Events.fireEvent(Events.eventList.comparator.view.ExpandTableEvent);
			} else if ($target.attr('id') === 'c-collapse-all' ||
					   $target.parent().attr('id') === 'c-collapse-all') {
				Events.fireEvent(Events.eventList.comparator.view.CollapseTableEvent);
			}

		},

		reset: function() {
			_.each(this.children, function(child) {
				child.destroy();
			});
			this.children= [];
			this.$el.empty();
			this.expandCollapseButtonsAdded = false;
		},

		add: function(table) {
			//Util.log('adding table');
			var newTable = this.children[this.children.length] = new views.TableView({model:table});
			this.$el.append(newTable.render().$el);
		},

		remove: function(table) {
			//Util.log('removing table');
			var tableId = table.get('id');
			var i = 0;
			var childToDelete = _.find(this.children, function(child) {
				if (tableId === child.model.get('id')) {
					return child;
				}
				i++;
			});

			if (childToDelete && childToDelete != null) {
				this.children.splice(i, 1);
				childToDelete.destroy();
			}
		},

		render: function() {
	        return this;
		},

		display: function() {
			$('#tables').append(this.$el);
		}

	});

	views.TableView = Backbone.View.extend({
		children : [],

		className: 'row expanddiv',

		events : {
			'click .c-table-title' : 'collapseExpand'
		},

		collapseExpand: function(e) {
			//Util.log('collapseExpand:' + this.$body == null);
			e.preventDefault();
			var isCollapsed = this.$body.hasClass('hidden');
			if (isCollapsed) {
				this.expand();
			} else {
				this.collapse();
			}
		},

		expand: function() {
			this.$body.removeClass('hidden');
			this.$head.addClass('comparator_icon_down');
			this.$head.removeClass('comparator_icon_right');
			if (this.rowExpansionApplied === false) {
				this.$body.each(function() {
				    $(this).find('.row').each(function() {

				        var maxHeight = $(this).outerHeight();
				        $(this).find('.column').each(function() {
				            $(this).css('height', maxHeight);
				        });
				        $(this).find('.column-header').each(function() {
				            $(this).css('height', maxHeight);
				        });
				    });
				});
				this.rowExpansionApplied = true;
			}
		},

		collapse: function() {
			this.$body.addClass('hidden');
			this.$head.removeClass('comparator_icon_down');
			this.$head.addClass('comparator_icon_right');
		},

		initialize: function() {
			this.template = _.template($('#c-table-template').html());
			this.model.bind('destroy', this.destroy, this);
			Events.bind(Events.eventList.comparator.view.CollapseTableEvent, this.collapse, this);
			Events.bind(Events.eventList.comparator.view.ExpandTableEvent, this.expand, this);
			this.rowExpansionApplied = false;
		},

		render: function() {
			var el = this.$el;

			if($('body').hasClass('lincoln_comparator')){// for lincoln only
				this.model.attributes.title = '<h3 class="title">'+this.model.attributes.title+'</h3>';
			}

			el.html(this.template(this.model.toJSON()));
			var rows = this.model.get('rows');
			if (rows && rows != null && rows.length > 0) {
				this.children[0] = new views.RowsView({collection : rows});
				el.append(this.children[0].render().$el);
			}
			if (typeof this.$tbody === 'undefined') {
				this.$body = el.find('.c-header');
				this.$head = el.find('.c-table-title');
			}
	        return this;
		}
	});

	views.RowsView = Backbone.View.extend({

		className: 'comparator_content c-header hidden',

		initialize: function() {
			this.template = _.template($('#c-row-template').html());
			this.tooltipTemplate = _.template($('#c-tooltip-template').html());
			this.collection.bind('reset', this.reset, this);
			this.collection.bind('add', this.addRow, this);
		},

		reset: function() {
			this.$el.empty();
		},

		addRow: function(row, rows, options) {
			var length = this.collection.length - 1;
			this.$el.append(this.renderRow(row, this.classForRow(options.index, length)));

		},

		render: function() {
			var i = 0;
			var el = this.$el;
			var length = this.collection.length - 1;
			_.each(this.collection.models, function(row) {
				el.append(this.renderRow(row, this.classForRow(i, length)));
				i++;
			}, this);
	        return this;
		},


		renderRow: function(row, className) {
			var dom = $(this.template({header : row.get('header'), className: className}));
			var columns = row.get('columns');
			if (columns != null && columns.length > 0) {
				_.each(columns.models, function(column) {
					dom.append(this.renderColumn(column));
				}, this);
			}
			var chEl = dom.find('.column-header > .c-table-cell');
			var hasNote = row.get('hasNote');
			if (hasNote) {
				chEl.append(this.tooltipTemplate({
					hasNote: hasNote,
					note: row.get('note'),
					noteCounter: row.get('noteCounter')}));
			}
			//Util.log('renderRow: ' + dom.html());
			//Util.log('renderRow: ' + dom.height());
	        return dom;
		},

		renderColumn: function(model) {
			var hasNote = model.get('hasNote');
			var dom = $('<div class="column"><div class="c-table-cell"><span class="p">' +  model.get('value') + '</span></div></div>');
			if (hasNote) {
				dom.find('.c-table-cell').append(this.tooltipTemplate({
					hasNote: hasNote,
					note: model.get('note'),
					noteCounter: model.get('noteCounter')}));
			}
			return dom;
		},

		classForRow: function(i, length) {
			var className = '';
			if (i === 0) {
				className = 'first ';
			}
			className += (i % 2 == 0 ? 'tooltip-row row even' : 'tooltip-row row odd');
			return className;
		}

	});

	views.Util = {
		loader: null,
		stack: [],
		showView : function(name, viewClass, model) {
			if (views.Util.stack[name] === undefined) {
				views.Util.stack[name] = new viewClass({model : model, collection : model});
			}
			views.Util.stack[name].display();
		},
		blockUI : function() {
			if (views.Util.loader == null) {
				views.Util.loader = ND.loadmask();
			}
			views.Util.loader.show();
		},
		unblockUI : function() {
			if (views.Util.loader != null) {
				views.Util.loader.hideSlowly();
			}

		}
	};

	return views;

	/*****************************END OF VIEWS*****************************/

})(window, document, jQuery);