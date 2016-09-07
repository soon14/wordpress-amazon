/**
 * 
 */
var BnP = BnP || {};
Events.eventList.buildandprice.view = {
	/**
	 * Events are grouped based on where they are fired.
	 * view events are Fired from View objects, etc
	 */
		
	ChangeVehicleEvent: 'ChangeVehicleEvent',
	PricezoneChangeRequestEvent: 'PricezoneChangeRequestEvent',
	PathSelectedEvent: 'PathSelectedEvent',
	DerivativeSelectedEvent: 'DerivativeSelectedEvent',
	PackageSelectedEvent: 'PackageSelectedEvent',
	SaveAsPDFEvent : 'SaveAsPDFEvent',
	ShareConfigEvent : 'ShareConfigEvent',
	TrimSelectedEvent: 'TrimSelectedEvent',
	ColorChangedEvent: 'ColorChangedEvent',
	ModelSelectedEvent: 'ModelSelectedEvent',
	PricezoneSelectedEvent : 'PricezoneSelectedEvent',
	ToggleViewEvent: 'ToggleViewEvent',
	RequestAQuoteEvent: 'RequestAQuoteEvent',
	PresentPaymentEvent: 'PresentPaymentEvent',
	TabChangeRequestEvent :'TabChangeRequestEvent',
	StepChangeRequestEvent: 'StepChangeRequestEvent',
	StepChangeHeaderRequestEvent: 'StepChangeHeaderRequestEvent',
	TabChangedEvent : 'TabChangedEvent',
	FeatureSelectedEvent : 'FeatureSelectedEvent',
	DerivativeSelectedEvent : 'DerivativeSelectedEvent',
	NextOrientationEvent: 'NextOrientationEvent',
	PrevOrientationEvent: 'PrevOrientationEvent',
	StartOverEvent : 'StartOverEvent',
	EngineTrasmissionSelectedEvent : 'EngineTrasmissionSelectedEvent',
	SortFeaturesByPriceEvent : 'SortFeaturesByPriceEvent',
	SortFeaturesByNameEvent : 'SortFeaturesByNameEvent',
	RegionPostcodeChangeRequestEvent: 'RegionPostcodeChangeRequestEvent',
	HotDealSelectedEvent: 'HotDealSelectedEvent',
	UpdateScrollBarEvent: 'UpdateScrollBarEvent',
	SubTabChangedEvent: 'SubTabChangedEvent',
	ViewAccessoryDetailsEvent: 'ViewAccessoryDetailsEvent',
	PanelToggleEvent: 'PanelToggleEvent',//internal view event
	PageChangedEvent: 'PagedChangedEvent', //internal view event
	PrevPageRequestedEvent: 'PrevPageRequestedEvent',
	ChangePostcodeOrPricezoneEvent: 'ChangePostcodeOrPricezoneEvent'
};

BnP.Views = (function(window,document, $, undefined){
	
	var views = {};

	views.NameplateCategoryList = Backbone.View.extend({
		tagName: 'ul',
		
		children : [],
		
//		id : 'bp-select-model-container',
//		data-role="listview" class="model-list title-only" data-theme="d" data-divider-theme="d"
		className: 'model-list title-only',
		
		render: function() {
//			var i = 0;
			var el = this.$el;
			el.attr({'data-role':'listview', 'data-theme':'d', 'data-divider-theme':'d'});
			var self = this;
			_.each(this.collection.models, function (category) {
				el.append('<li data-role="list-divider" id="nameplate-cat-' + category.get('order') + '">' + category.get('name') + '</li>');
				var models = category.get('nameplates').models;
				var j = 0;
				_.each(models, function (nameplate) {
					self.children[j] = new views.NameplateItem({model:nameplate});
					el.append(self.children[j++].render().$el);
				});
				
//				ul.append(this.categoryTemplate(category.toJSON()));
//				i++;
	        }, this);
//			el.find('.buildselect').append(ul);
//			el.find('.buildlist').append(rows);
	        return this;
		},
		
		initialize: function() {
//			this.template = _.template($('#bp-nameplate-list-template').html());
//			this.categoryTemplate = _.template($("#bp-nameplate-category-item").html());
			this.collection.bind("reset", this.render, this);
		}
		
	});
	
	
	views.NameplateItem = Backbone.View.extend({
		
		 tagName: 'li',
		 
		 events: {
			'click .bp-nameplate-list-item' : 'modelSelected'
		 },
		  
		 modelSelected : function(e) {
			e.preventDefault();
			this.model.trigger(Events.eventList.buildandprice.view.ModelSelectedEvent, this.model);
		 },
		  
		 initialize: function() {
			this.template = _.template($("#mbp-nameplate-list-item-template").html());
		 	this.model.bind('change:selected', this.toggleClass, this);
		 	this.model.bind('destroy', this.destroy, this);
		 },
		 
		 toggleClass: function() {
			 $(this.el).toggleClass('cur', this.model.get('selected'));
		 },
		 
		 render: function() {
			  var html = this.template(this.model.toJSON());
			 $(this.el).toggleClass('cur', this.model.get('selected')).html(html);
			  return this;
		 }
	});
	
	views.PathList = Backbone.View.extend({
		
		className: 'path',
		
		tagName: 'div',
		
		children: [],
		
		initialize: function() {
		},
		
		render: function() {
			var i = 0;
			var el = this.$el;
			var ul = $('<ul></ul>');
			var self = this;
			_.each(this.collection.models, function (path) {
				self.children[i] = new views.PathListItem({model:path, className:'ui-btn-icon-right'});
				ul.append(self.children[i].render().$el);
				i++;
	        }, this);
			el.append(ul);
	        return this;
		}
	});
	
	views.PathListItem = Backbone.View.extend({
		
		tagName: 'li',
		
		events: {
			'click .bp-path-item' : 'pathSelected'
		},
		
		initialize: function() {
			this.template = _.template($('#bp-path-list-item-template').html());
			this.model.bind('change:selected', this.toggleClass, this);
		},
		
		pathSelected : function(e) {
			//Util.log('pathSelected');
			this.model.trigger(Events.eventList.buildandprice.view.PathSelectedEvent, this.model);
		},
		
		toggleClass: function() {
			 $(this.el).toggleClass('cur', this.model.get('selected'));
		},
		 
		render: function() {
			  var html = this.template(this.model.toJSON());
			  $(this.el).toggleClass('cur', this.model.get('selected')).html(html);
			  return this;
		}
		
		
	
	});
	
	/**
	 * In charge of rendering list of Derivative (NOT DerivativeDetails)  
	 */
	views.DerivativeList = Backbone.View.extend({
		children : [],
		
		tagName: 'ul',
		
		className: 'model-list',
		
		render: function() {
			var i = 0;
			var el = this.$el.attr({'data-role':'listview', 'data-theme':'d'});
			var self = this;
			_.each(this.collection.models, function (vehicle) {
				self.children[i] = new views.DerivativeItem({model:vehicle});
				el.append(self.children[i].render().$el);
				i++;
	        }, this);
	        return this;
		},
		
		initialize: function() {
		}
		
	});
	
	
	
	/**
	 * In charge of rendering a single Derivative (NOT DerivativeDetails) Item
	 */
	views.DerivativeItem = Backbone.View.extend({
		 tagName: 'li',		
		  
		 className : 'bp-derivative-list-item',
		
		 events: {
			 'click .mbp-derivative-list-item' : 'derivativeSelected'
//			 'click .details-button' : 'viewHotDealOffer'
		 },
//		  
		 derivativeSelected : function(e) {
			  e.preventDefault();
			  this.model.trigger(Events.eventList.buildandprice.view.DerivativeSelectedEvent, this.model);
		 },
//		 
//		 viewHotDealOffer: function(e) {
//			 var hotDealUrl = this.model.get('hotDealUrl');
//			 if (hotDealUrl === '#' || hotDealUrl === '') {
//				 Util.log('preventHotDealUrl');
//				 e.preventDefault();
//			 }
//		 },
//		  
		 initialize: function() {
			  this.template = _.template($('#mbp-derivative-list-item-template').html());
			  this.model.bind('change:selected', this.toggleClass, this);
			  this.model.bind('destroy', this.destroy, this);
//			  Events.bind(Events.eventList.buildandprice.router.EnginesLoadedEvent, this.displayEnginesOverlay, this);
		 },
		  
		 render: function() {
			  var html = this.template(this.model.toJSON());
			  $(this.el).toggleClass('cur', this.model.get('selected'))
			  			.toggleClass('has-latest', this.model.get('hotDealUrl') !== '#').html(html);
			  return this;
		 },
		 
//		 addHotDealUrl: function() {
//			$(this.el).append(this.hotDealTemplate({hotDealUrl : this.model.get('hotDealUrl')}));
//		 }, 
		  
		 toggleClass : function() {
			 $(this.el).toggleClass('cur', this.model.get('selected') );
		 }
	});

	views.PackageList = views.DerivativeList.extend({
		
		render: function() {
			var i = 0;
			var el = this.$el.attr({'data-role':'listview', 'data-theme':'d'});
			var self = this;
			_.each(this.collection.models, function (vehicle) {
				self.children[i] = new views.PackageItem({model:vehicle});
				el.append(self.children[i].render().$el);
				i++;
	        }, this);
	        return this;
		}
		
	});
	
	views.PackageItem = views.DerivativeItem.extend({
		
		 events: {
			 'click .mbp-derivative-list-item' : 'packageSelected',
			 'click a#popup':'viewDetails'
		 },
		  
		 packageSelected : function(e) {
			  e.preventDefault();
			  this.model.trigger(Events.eventList.buildandprice.view.PackageSelectedEvent, this.model);
		 },

		 viewDetails: function(e) {			  
			  views.Helper.openOverlay(e);
		  },

		  initialize: function() {
			  this.template = _.template($('#mbp-package-list-item-template').html());
			  this.model.bind('change:selected', this.toggleClass, this);
			  this.model.bind('destroy', this.destroy, this);
		      //Events.bind(Events.eventList.buildandprice.router.EnginesLoadedEvent, this.displayEnginesOverlay, this);
		 },		  

		 toggleClass : function() {
			 $(this.el).toggleClass('cur', this.model.get('selected') );
		 },

		 render: function () {
		     var html = this.template(this.model.toJSON());
		     $(this.el).toggleClass('cur', this.model.get('selected'))
                       .toggleClass('has-latest', true).html(html);
		     return this;
		 }
		
	});

	views.EngineTransmissionList = Backbone.View.extend({
		
//		className: 'engine-list',
		
		children : [],
		
		render: function() {
			var i = 0;
			var el = this.$el;
			$enginesEl = el.html(this.template({derivativeName: this.derivativeName, 
												derivativeThumbnail: this.derivativeThumbnail})
								 ).find('#mbp-engine-list');
			var self = this;
			_.each(this.collection.models, function (engine) {
				self.children[i] = new views.EngineTransmissionItem({model:engine});
				$enginesEl.append(self.children[i].render().$el);
				i++;
	        }, this);
			
	        return this;
		},
		
		initialize: function(options) {
			this.template = _.template($("#mbp-engine-list-template").html());
			this.derivativeName = options.derivativeName;
			this.derivativeThumbnail = options.derivativeThumbnail;
		}
		
	});
	
	views.EngineTransmissionItem = Backbone.View.extend({
		  tagName : 'li',
		  
		  events: {
			'click .mbp-engine' : 'engineChanged'  
		  },

		  engineChanged : function(e) {
			  e.preventDefault();
			  this.model.trigger(Events.eventList.buildandprice.view.EngineTrasmissionSelectedEvent);
		  },
		  
		  initialize: function() {
			  this.template = _.template($("#mbp-engine-list-item-template").html());
			  this.model.bind('change:selected', this.toggleClass, this);
			  this.model.bind('destroy', this.destroy, this);
		  },
		  
		  render: function() {
			  var html = this.template(this.model.toJSON());
			  $(this.el).toggleClass('cur', this.model.get('selected')).html(html);
			  return this;
		 },
		  
		  toggleClass : function() {
			  //Util.log('Engine \'' + this.model.get('id') + '\'  is selected ? ' + this.model.get('selected'));
			  this.$el.toggleClass('cur', this.model.get('selected'));
		  }
		  
	});
	
	views.HotDeal = Backbone.View.extend({
		initialize: function() {
			 this.template = _.template($("#mbp-hotdeals-template").html());
		}
	});
	
	views.ColorList = Backbone.View.extend({
		
		className: 'color',
		
		id : 'mbp-color-name',
		
		children : [],
		
		events: {
		},
		
		render: function() {
			var i = 0;
			var el = this.$el;
//			
			el.html('<h3></h3><ul id="mbp-color-items"></ul><div class="clear"></div>');
			var $colorItems =  el.find('#mbp-color-items');
			var $colorNameDiv = el.find('h3');
			_.each(this.collection.models, function (color) {
				//console.log('color');
				this.children[i] = new views.ColorItem({
					model:color,
					colorNameDiv: $colorNameDiv,
					template : this.colorItemTemplate,
					nameTemplate : this.nameTemplate});
				$colorItems.append(this.children[i].render().$el);
				i++;
	        }, this);
			
	        return this;
		},
		
		initialize: function() {
//			this.template =  _.template($("#bp-color-list-template").html());
			this.colorItemTemplate =  _.template($("#mbp-color-list-item-template").html());
//			this.tooltipTemplate = _.template($("#bp-tooltip-template").html());
			this.nameTemplate = _.template($("#mbp-color-trim-name-template").html());
		}
		
	});

	views.ColorItem = Backbone.View.extend({
		  
		  tagName: 'li',
		
		  events: {
			  'click .color-item' : 'colorChanged'
				  
		  },
		  
		  colorChanged : function (e) {
			  e.preventDefault();
			  //console.log('ColorItemView: isSystem: false');
			  this.model.trigger(Events.eventList.buildandprice.view.ColorChangedEvent, {color: this.model, isSystem: false});
		  },

		  render: function() {
			  var el = $(this.el);
			  el.html(this.template(this.model.toJSON()));
			  this.toggleSelected();
//			  el.append(this.tooltipTemplate(json));
			  return this;
		  },
		  
		  toggleSelected: function() {
			  var selected = this.model.get('selected');
			  $(this.el).toggleClass('active', selected);
			  if (selected === true) {
				  this.$colorNameDiv.html(this.nameTemplate({selected : selected, 
				  	name: this.model.get('name'), 
				  	isColor: true,
				  	categoryTitle:Translator.translate('bpt-module-title-colors')}));
			  }	
		  },
		  
		  initialize: function(options) {
			 
			  this.model.bind('change:selected', this.toggleSelected, this);
			  this.model.bind('destroy', this.destroy, this);
			  this.$colorNameDiv = options.colorNameDiv;
			  this.template = options.template;
			  this.nameTemplate = options.nameTemplate;
//			  this.tooltipTemplate = options.tooltipTemplate;
			  //apple device specific event handling
//			  if (ND.Utils !== undefined && ND.Utils.isTouchDevice() === true) {
//				 $(this.el).on('mouseover', '.color-item' ,$.proxy(this.colorChanged, this)); 
//			  }
		  }

	});	
	
	views.TrimList = Backbone.View.extend({
		
		className: 'trim',
		
		id: 'mbp-trim-name',
		
		children : [],
				
		render: function() {
			var i = 0;
			var el = this.$el;
			el.append('<h3></h3><ul id="mbp-trim-items"></ul><div class="clear"></div>');
			var $trimName = el.find('h3');
			var $trimItems =  el.find('#mbp-trim-items');
			_.each(this.collection.models, function (trim) {
				//console.log('trim');
				this.children[i] = new views.TrimItem({model:trim,
					trimNameDiv: $trimName,
					template : this.trimItemTemplate,
//					tooltipTemplate : this.tooltipTemplate,
					nameTemplate : this.nameTemplate});
				$trimItems.append(this.children[i].render().$el);
				i++;
	        }, this);
	        return this;
		},
		
		
//		render: function() {
//			var i = 0;
//			var el = this.$el;
//			var self = this;
//			_.each(this.collection.models, function (trim) {
//				self.children[i] = new views.TrimItem({model:trim});
//				el.append(self.children[i].render().$el);
//				i++;
//	        }, this);
//	        return this;
//		},
//		
		initialize: function() {
			this.nameTemplate = _.template($("#mbp-color-trim-name-template").html());
			this.trimItemTemplate =  _.template($("#mbp-trim-list-item-template").html());
		}
	});
	

	views.TrimItem = Backbone.View.extend({
		  
		 tagName: 'li',
		
		 events: {
			 'click .trim-item' : 'trimChanged'
		 },
		  
		 render: function() {
			  var el = $(this.el);
			  el.html(this.template(this.model.toJSON()));
			  this.toggleSelected();
//			  el.append(this.tooltipTemplate(json));
			  return this;
		  },
		  
		  initialize: function(options) {
			  this.model.bind('change', this.toggleSelected, this);
			  this.model.bind('destroy', this.destroy, this);
			  //apple device specific event handling
//			  if (ND.Utils !== undefined && ND.Utils.isTouchDevice() === true) {
//				 $(this.el).on('mouseover', '.trim-item' ,$.proxy(this.trimChanged, this)); 
//			  }
			  this.$trimNameDiv = options.trimNameDiv;
			  this.template = options.template;
			  this.nameTemplate = options.nameTemplate;
		  },
		  
		  toggleSelected: function() {
			  var selected = this.model.get('selected');
			  $(this.el).toggleClass('active', selected);
			  if (selected === true) {
				  this.$trimNameDiv.html(this.nameTemplate({selected : selected, 
				  	name : this.model.get('name'),
				  	isColor: false,
				    categoryTitle:Translator.translate('bpt-module-title-trims')}));
			  }
		  },
		  
		  destroy : function() {
			  $(this.el).unbind();
		      $(this.el).remove();
		  },
		  
		  trimChanged : function(e) {
			  e.preventDefault();
//			  console.log('TrimItemView: isSystem: false');
			  this.model.trigger(Events.eventList.buildandprice.view.TrimSelectedEvent, {trim: this.model, isSystem : false});
		  }
	});
	
	views.FeatureList = Backbone.View.extend({
		
		children : [],
		
		className: 'custom',
		
//		events: {
//			'click .bp-sort-price' : 'sortByPrice',
//			'click .bp-sort-name' : 'sortByName'
//	    },
	    
//	    sortByName: function(e) {
//	    	e.preventDefault();
////	    	var sortDir = $(e.target).attr('data-sort-dir');
//	    	//Util.log('sortByName-> dir:' + sortDir);
//	    	this.model.trigger(Events.eventList.buildandprice.view.SortFeaturesByNameEvent);
//	    },
//	    
//	    sortByPrice: function(e) {
//	    	e.preventDefault();
////	    	var sortDir = $(e.target).attr('data-sort-dir');
//	    	//Util.log('sortByPrice-> dir:' + sortDir);
//	    	this.model.trigger(Events.eventList.buildandprice.view.SortFeaturesByPriceEvent);
//	    },
//		
		render: function() {
			var el = this.$el;
//			var sortDir = this.model.get('sortDir');
			//Util.log('FeatureListView.render()-> name:' + sortDir.get('name') + ' price:' + sortDir.get('price'));
//			el.append(this.template({nameSortDir: sortDir.get('name'), priceSortDir: sortDir.get('price')}));
			el.append('<h3>'+this.model.get('name')+'</h3>');
			var $featuresEl = $('<fieldset data-role="controlgroup"></fieldset>');
			this.renderFeatures($featuresEl);
			el.attr('data-role','fieldcontain').append($featuresEl);
	        return this;
		},
		
		renderFeatures : function($featuresEl) {
			var collection = this.model.get('features');
			var i = 0;
			$featuresEl.empty();
			this.reset();
			//$featuresEl.append('<h3>'+this.model.get('name')+'</h3>');
			_.each(collection.models, function (feature) {
				this.children[i] = new views.FeatureItem({model:feature});
				$featuresEl.append(this.children[i].render().$el);
				i++;
	        }, this);
			
		},
		
		initialize: function() {
			var features = this.model.get('features');
			features.bind('reset', this.reset, this);
//			features.bind(Events.eventList.buildandprice.model.FeaturesSortCompletedEvent, this.updateList, this);
		},
		
//		updateList: function () {
//			//Util.log('updateList');
//			var el = this.$el;
//			el.find('.bp-sort-options').remove();
//			var sortDir = this.model.get('sortDir');
//			el.prepend(this.template({nameSortDir: sortDir.get('name'), priceSortDir: sortDir.get('price')}));
//			var $accessoryList = el.find('ul.accessories-list');
//			this.renderFeatures($accessoryList);
//		},
		
		reset: function() {
			_.each(this.children, function(child) {
				child.destroy();
			}, this);
			this.children = [];
			
		}
		
		
	});

	views.FeatureItem = Backbone.View.extend({
			
		  className: 'feature css3-cbox',
		  
		  events: {
			  'click .selection' : 'featureSelected',
			  'click a' : 'viewFeatureDetails'
//			  'click .expand-collapse' : 'expandCollapse',
//			  'mouseenter .bp-tooltip-link' : 'tooltipHoverOn',
//			  'mouseleave .bp-tooltip-link' : 'tooltipHoverOff'
		  },
		  
		  featureSelected : function(e) {
			 //console.log('feature selected');
//			 e.preventDefault();
			 if (!this.model.get('disabled')) {
				 this.model.trigger(Events.eventList.buildandprice.view.FeatureSelectedEvent, this.model);
//				 if (this.model.get('selected')) {
//					 if (this.model.get('spriteUrl') != '') {
//						 views.Helper.displayFeatureVisualisedMessage(this.$visualiseMsg, this.$notVisualiseMsg);
//					 } else {
//						 views.Helper.displayFeatureVisualisedMessage(this.$notVisualiseMsg, this.$visualiseMsg);
//					 }
//			  	 }
			 }
		  },
		  
//		  expandCollapse: function(e) {
//			  e.preventDefault();
////			  var link = $(e.target);
////			  var ul = link.parent().siblings('ul.bp-feature-group');
////			  var hasExpandedClass = ul.hasClass('expanded');
////			  ul.toggleClass('expanded', !hasExpandedClass).toggleClass('hidden', hasExpandedClass);
////			  link.attr('class', hasExpandedClass ? 'spsplus' : 'spstoggle');
////			  Events.fireEvent(Events.eventList.buildandprice.view.UpdateScrollBarEvent);
//				  
//		  },
		  
//		  tooltipHoverOn: function() {
//			  if (!this.model.get('disabled')) {
//				  var $tooltip = $('#bp-feature-tooltip-p');
//				  $tooltip.text(this.model.get('note'));
//				  $('#bp-feature-tooltip').show();
//			  } 
//		  },
//		  
//		  tooltipHoverOff: function() {
//			  $('#bp-feature-tooltip').hide();
//		  },
		  
		  viewFeatureDetails: function(e) {
			  if (!this.model.get('disabled')) {
				  Events.fireEvent(Events.eventList.buildandprice.view.ViewAccessoryDetailsEvent);
				  views.Helper.openOverlay(e);
			  }
		  },
		  
		  initialize: function() {
			  this.template = _.template($("#mbp-feature-list-item-template").html());
			  this.messageTemplate = _.template($("#mbp-feature-message-template").html());
			  this.model.bind('change:selected change:disabled', this.toggleClass, this);
			  this.model.bind('change:message', this.updateMessage, this);
			  this.model.bind('destroy', this.destroy, this);
			  this.isOptionPack = this.model.get('isOptionPack');
//			  this.$visualiseMsg = $('#bp-visualise-msg');
//			  this.$notVisualiseMsg = $('#bp-no-visualise-msg');
		  },
		  
		  toggleClass: function() {
//			  console.log('views.FeatureItem.toggleClass');
			  var el = $(this.el);
			  el.toggleClass('active', this.model.get('selected'))
			    .toggleClass('ui-disabled', this.model.get('disabled'));
			  return el;
		  },
		  
		  updateMessage: function() {
//			  console.log('views.FeatureItem.updateMessage');
			  var el = this.$el;
			  var $elMsg = el.find('div.disabled-msg');
			  if ($elMsg.length > 0) {
				  $elMsg.remove();
			  } 
			  el.append(this.messageTemplate(this.model.toJSON()));  
			  
			  
//			  Events.fireEvent(Events.eventList.buildandprice.view.UpdateScrollBarEvent);
		  },
		  
		  render: function() {
			  var modelJson = this.model.toJSON();
			  var el = this.toggleClass().html(this.template(modelJson));
			  var collection = this.model.get('featureGroupAttributes');
			  if (this.isOptionPack && 
			      collection && collection != null && collection.length > 0) {
				 var $optionPackEl = $('<div class="detail"><ul></ul></div>');
				 var $ulEl = $optionPackEl.find('ul');
				_.each(collection.models, function(featureGroupAttribute) {
					$ulEl.append('<li>' + featureGroupAttribute.get('featureName') + '</li>');
				}, this);
				el.append($optionPackEl);
			  } else {
				  el.append(this.messageTemplate(modelJson));
			  }
			  return this;
		 }
	});
	
	views.Gallery = Backbone.View.extend({
		
		className: 'slider',
		
		children : [],
		  
		events: {
			'click #touchslider-next' : 'prev',
			'click #touchslider-prev' : 'next'
		},

		next: function(e) {
			e.preventDefault();
			//notify the model an orientation change request was requested , model updates itself and view gets updated automatically
			this.collection.trigger(Events.eventList.buildandprice.view.NextOrientationEvent);
		},

		prev: function(e) {
			e.preventDefault();
			//notify the model an orientation change request was requested , model updates itself and view gets updated automatically
			this.collection.trigger(Events.eventList.buildandprice.view.PrevOrientationEvent);
		},

		render: function() {
			$(this.el).html(this.template({showArrows: this.model.get('showArrows')}));
			this.renderChildren();
			return this;
		},

		renderChildren : function() {
			var galleryContent =  $(this.el).find('#mbp-sprites'),
				i = 0, 
				options = {next : this.next, prev : this.prev, parent: this,
				slideNavContainer  :  $(this.el).find('.slider-nav')};
			//can't use this logic...the view hasn't been rendered
//			, displayCueMsg = false;
			_.each(this.collection.models, function (img) {
//				if (i === 0) {
//					console.log('numberImages > 1 ? ' + (img.get('numImages') > 1));
//					displayCueMsg = (img.get('numImages') > 1);
//				}
							
				//console.log('renderChildren');
				options.model = img;
				this.children[i] = new views.GalleryItem(options);
				galleryContent.append(this.children[i++].render().$el);
			}, this);

			options.slideNavContainer.children().removeClass('hidden');

//			if (displayCueMsg === true) {
//				console.log('displayCueMsg');
//				views.Helper.displayGalleryCueMessage();
//			}
			return this;
		},

		initialize: function() {
			this.template = _.template($('#mbp-gallery-template').html());
			this.collection = this.model.get('gallery');
			this.collection.bind('destroy', this.destroy, this);
			Events.bind(Events.eventList.buildandprice.model.ShowArrowsEvent, this.enableNextPrevArrows, this);
			Events.bind(Events.eventList.buildandprice.model.HideArrowsEvent, this.disableNextPrevArrows, this);
			Events.bindOnce(Events.eventList.buildandprice.view.PageChangedEvent, this.displayGalleryMessage, this);
//			Events.bind(Events.eventList.buildandprice.view.PageChangedEvent, this.updateGalleryArrows, this);
		},
		
		displayGalleryMessage : function() {
			
			if (this.model.get('showArrows')) {
				views.Helper.displayGalleryCueMessage();
			}
		},

		enableNextPrevArrows: function() {
			//console.log('enableNextPrevArrows');
			$('#touchslider-prev').removeClass('hidden');
			$('#touchslider-next').removeClass('hidden');
		},

		disableNextPrevArrows: function() {
			//console.log('disableNextPrevArrows');
			$('#touchslider-prev').addClass('hidden');
			$('#touchslider-next').addClass('hidden');
		}

	});
	views.GalleryNavigateItem = Backbone.View.extend({
		className: 'touchslider-nav-item',
		
		tagName: 'span',
		
		render: function() {
//			console.log('GalleryNavigateItem.render() is visible? ' + this.model.get('slideNumber') + ' id:' + this.model.id);
//          console.log('index: ' + this.options.index + ', slideNumber: ' + this.options.slideNumber)
			$(this.el).toggleClass('touchslider-nav-item-current', this.options.index === this.options.slideNumber);
			return this;
		},

		initialize: function(options) {
			this.options = options;
			
//			this.model.bind('change:slideNumber', this.update, this);
//			this.model.bind('destroy', this.destroy, this);
		}
	});
	
	
	views.GalleryItem = Backbone.View.extend({
		className: 'touchslider-item',
		
		events : {
			'swiperight .touchslider-item' : 'prev',
			'swipeleft .touchslider-item' : 'next'
		},
		
		render: function() {
			//console.log('GalleryItem.render():' + this.model.id);
			var html = this.template(this.model.toJSON()),
				elmnt = $(this.el),
				isVisible = this.model.get('visible');
			//console.log('GalleryItem ' + this.model.id + ' is visible? ' + this.model.get('visible') );
			elmnt.toggleClass('hidden', !isVisible).html(html);
			
			var children = elmnt.children('.vehicle-sprite');
			if (this.model.get('layer') === 1) {
				children.css('opacity', 0);
				children.animate({opacity : 1}, 1200);
			} else {
				children.css('opacity', .4);
				children.animate({opacity : 1}, 800);
			}

			var numImages = this.model.get('numImages');
			
			// -- little ball under gallery --
			if (isVisible && numImages > 1) {	
				this.options.slideNavContainer.children().removeClass('hidden');
				this.options.slideNavContainer.empty();			
				for (var i = 0; i < numImages; i++) {
					this.options.slideNavContainer.append(new views.GalleryNavigateItem({index : i, slideNumber: this.model.get('slideNumber')}).render().$el);
				}
			} else {
				 this.options.slideNavContainer.children().addClass('hidden');
			}
		
			return this;
		},

		initialize: function(options) {
			this.options = options;
			this.template = _.template($('#mbp-gallery-image-item-template').html());
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.destroy, this);
			this.next = $.proxy(options.next, options.parent);
			this.prev = $.proxy(options.prev, options.parent);
		}
	});

	views.Header = Backbone.View.extend({
		
		events: {
			'click #mbp-change-postcode' : 'changePostcode',
			'click #mbp-panel-link' : 'togglePanel'
		},
		
		changePostcode: function(e) {
			e.preventDefault();
//			Util.log('FOAPostcodeHeaderView.changePostcode');
			//Events.fireEvent(Events.eventList.buildandprice.view.RegionPostcodeChangeRequestEvent, true);

			Events.fireEvent(Events.eventList.buildandprice.view.ChangePostcodeOrPricezoneEvent);
		},
		
		togglePanel: function(e) {
			e.preventDefault();
			Events.fireEvent(Events.eventList.buildandprice.view.PanelToggleEvent, 'toggle');
		},
//		
		initialize: function() {
			this.model.bind('destroy', this.destroy, this);
//			this.model.bind('change', this.render, this);
			this.template = _.template($("#mpt-header-template").html());
		}
		
	});
	
	views.NameplateHeader = Backbone.View.extend({
		
		events: {
			'click #mbp-change-postcode' : 'changePostcode',
			'click #nameplate-panel-link' : 'togglePanel'
		},

		changePostcode: function(e) {
			e.preventDefault();
//			Util.log('FOAPostcodeHeaderView.changePostcode');
			//Events.fireEvent(Events.eventList.buildandprice.view.RegionPostcodeChangeRequestEvent, true);

			Events.fireEvent(Events.eventList.buildandprice.view.ChangePostcodeOrPricezoneEvent);
		},
		
		togglePanel: function(e) {
			e.preventDefault();
			Events.fireEvent(Events.eventList.buildandprice.view.PanelToggleEvent, 'toggle');
		},
		
		initialize: function() {
			this.model.bind('destroy', this.destroy, this);
			this.template = _.template($("#mpt-nameplate-header-template").html());
		}
		
	});
	
	views.Panel = Backbone.View.extend({

		id: 'mbp-panel',
		
		events : {
			'click .mpt-panel-item' : 'panelItemClicked'
		},
		
		initialize: function() {
			//console.log('initialize panel');
			this.template = _.template($("#mpt-panel-template").html());
			this.panelItemTemplate = _.template($("#mpt-panel-item-template").html());
			Events.bind(Events.eventList.buildandprice.view.PanelToggleEvent, this.togglePanel, this);
			//Events.bind(Events.eventList.buildandprice.view.PageChangedEvent, this.initPanel, this);
		},
		
		togglePanel: function(action) {
			$('#' + this.id).panel(action);
		},
		
		panelItemClicked: function(e) {
			var $target = $(e.currentTarget);
			
			if ($target.hasClass('disabled')) {
				e.preventDefault();
				
			} else if ($target.hasClass('cur')) {
				e.preventDefault();
				this.togglePanel('close');
			}
		},
		
//		initPanel: function() {
//			console.log('views.Panel: initPanel:' + this.id);
//			//$('#' + this.id).trigger('create');
//			$('#mbp-panel').panel();
//		},
		
		render: function() {
			var el = this.$el;
			el.attr({'data-role':'panel', 'data-position':'left', 'data-display': 'push'}).html(this.template());
			var $ul = el.find('ul');
			_.each(this.collection.models, function (header) {
				$ul.append(this.panelItemTemplate(header.toJSON()));
	        }, this);
//			console.log('rendering views.Panel: ' + this.id);
			
	        return this;
		}
	});
	
	views.NameplatePanel = views.Panel.extend({

		id: 'mbp-nameplate-panel',
		
		events: {
			'click .panel-link' : 'scrollToCategory'
		},
		
		scrollToCategory: function(e) {
			e.preventDefault();
			var href= $(e.currentTarget).attr('href');

			$('html, body').animate({
			    scrollTop: Math.min($(href).offset().top,$(document).height()-$(window).height())
			}, 500, 'linear', function() {
		    	Events.fireEvent(Events.eventList.buildandprice.view.PanelToggleEvent, 'close');
		    });
		},
		
		render: function() {
			var el = this.$el;
			el.attr({'data-role':'panel', 'data-position':'left', 'data-display': 'push'}).html(this.template());
			var $ul = el.find('ul');
			_.each(this.collection.models, function (vehicle) {
				$ul.append('<li data-iconshadow="false"><a class="panel-link" href="#nameplate-cat-' + vehicle.get('order') + '">' + vehicle.get('name') + '</a></li>');
	        }, this);
	        return this;
		}
	});
	
	views.Postcode = Backbone.View.extend({
		
		className: 'popup',
		
		id: 'postcode-popup',
		
		initialize: function() {
			this.template = _.template($("#mpt-postcode-template").html());
		},
		
		render: function() {
			this.$el.attr({'data-overlay-theme': 'a'}).html(this.template());
			return this;
		}
		
	});	
	
	views.Error = Backbone.View.extend({
		
		className: 'error',
		
		events: {
			'click #bp-start-over' : 'startOver',
			'click #bp-change-region' : 'changeRegionRequested'
		},
		
		startOver: function() {
			this.model.trigger(Events.eventList.buildandprice.view.StartOverEvent);
		},
		
		changeRegionRequested: function(e) {
			//this.model.trigger(Events.eventList.buildandprice.view.PricezoneChangeRequestEvent);
			e.preventDefault();
			Events.fireEvent(Events.eventList.buildandprice.view.ChangePostcodeOrPricezoneEvent);
		},
		
		initialize: function() {
			this.template = _.template($("#mpt-error-template").html());
		}
		
	});
	
	views.Page = Backbone.View.extend({
		
		 className: 'mbp',
		 
		 events: {
			'click #postcode-popup-link' : 'showPostcodePopup',
			'click #mbp-change-postcode' : 'updatePostcode',
			'click .back-button' : 'goBack'
		 },
		 
		 goBack : function(e) {
			 //console.log('goBack');
	         e.preventDefault();
	         
	         Events.fireEvent(Events.eventList.buildandprice.view.PrevPageRequestedEvent);
		     return false;
		 },
		 
		 showPostcodePopup: function(e) {
			 e.preventDefault();
			 var postcodeView = new views.Postcode({postcode: '3000'});
			 this.$el.append(postcodeView.render().$el);
			 $('#postcode-popup').popup().popup( 'open', {'corners': 'false', 'transition': 'slidedown', 'position-to': '#mbp'});
		 },
		 
		 updatePostcode: function(e){
			 e.preventDefault();
			 Events.fireEvent(Events.eventList.buildandprice.view.RegionPostcodeChangeRequestEvent, true);
		 },
		
		 initialize: function() {
			 this.template = _.template($("#mbp-page-template").html());
		 },
		 
		 render: function() {
			var html = this.template();
			this.$el.attr('data-role', 'page').html(html);
			return this;
		 }
	});
	

	views.Summary = Backbone.View.extend({
		
		children: [],
		
		events: {
			//'click .see-included' : 'seeWhatsIncluded',
			//'click #bp-save-as-pdf' : 'saveAsPDF',
			//'click #bp-share-config' : 'shareConfig',
			'click #bp-request-quote-btn' : 'requestAQuote',
			'click #bp-payment-presenter-btn' : 'presentPayment',
			'click #share-link' : 'shareConfig',
			'click #bp-postcode-overlay-warning-close' : 'closePostcodeWarningOverlay',
			'click #view-summary-disclaimer-link' : 'toggleSummaryDisclaimer'
		},
		
		closePostcodeWarningOverlay: function() {
			$('.disclaimerpanel').addClass('hidden');
		},
		
		seeWhatsIncluded: function(e) {
			e.preventDefault();
			views.Helper.openOverlay(e);
		},
		
		saveAsPDF: function(e) {
			e.preventDefault();
			this.model.trigger(Events.eventList.buildandprice.view.SaveAsPDFEvent);
		},
		
		requestAQuote : function(e) {
			e.preventDefault();
			this.model.trigger(Events.eventList.buildandprice.view.RequestAQuoteEvent, '#bp-request-quote-form');
		},

		presentPayment : function(e) {
			e.preventDefault();
			this.model.trigger(Events.eventList.buildandprice.view.PresentPaymentEvent, '#bp-request-quote-form');
		},

		shareConfig: function(e) {
			e.preventDefault();
			this.model.trigger(Events.eventList.buildandprice.view.ShareConfigEvent);
		},
		
		initialize: function() {
			this.template = _.template($('#mbp-summary-template').html());
			this.shareTemplate = _.template($('#mbp-share-template').html());
			this.model.bind('destroy', this.destroy, this);
			this.model.bind('change', this.render, this);
			Events.bind(Events.eventList.buildandprice.router.PDFReadyEvent, this.displayPDF, this);
			Events.bind(Events.eventList.buildandprice.router.ShareReadyEvent, this.displayShareOverlay, this);
		},
		
		displayShareOverlay: function(url) {
			//console.log('displayDialog: ' + url);
			//console.log('displayDialog encodedUrl: ' + encodeURIComponent(url));
			//views.Helper.injectContentOpenDialog($(this.shareTemplate({url : url, encodedUrl : encodeURIComponent(url)})));
			var $shareContent = $(this.shareTemplate({url : url, encodedUrl : encodeURIComponent(url)}));
			this.$el.append($shareContent);
			
			views.Helper.openShareOverlay('#share-popup');
			
			//select text on click
			$('#mbp-share-url').on('click', function() {
				$(this).select();
			});
			
			$('.bp-share-via').on('click', function(e) {
				var provider = $(this).attr('data-provider');
				Events.fireEvent(Events.eventList.buildandprice.view.ShareLinkClickedEvent, provider);
			});
		},
		
		toggleSummaryDisclaimer: function(e) {
			e.preventDefault();
			var $disclaimerDiv = $('#view-summary-disclaimer');
			$disclaimerDiv.toggleClass('hidden');
			var label = $disclaimerDiv.hasClass('hidden') ? Constants.bpt.showDisclaimer : Constants.bpt.hideDisclaimer;
			$('#view-summary-disclaimer-link > span > span').text(label);
		},
		
		render: function() {
			var el = this.$el;
			el.html(this.template(this.model.toJSON()));			
			var $summaryBreakdown = el.find('#summary-breakdown');
			this.children[0] = new views.PriceCategoryBreakdownList({collection: this.collection});
			$summaryBreakdown.empty().append(this.children[0].render().$el);
	        return this;
		}
		
	});
	
	views.PriceCategoryBreakdownList = Backbone.View.extend({
		
		children : [],
		
//		events: {
//			'click .toggle' : 'toggleBreakdown'
//		},
//		
//		toggleBreakdown : function(e) {
//			$(e.currentTarget).parents('li').toggleClass('collapsed');
//		},
//		
		initialize: function() {
			this.template = _.template($('#mbp-summary-price-breakdown-list-template').html());
			this.catTemplateItem = _.template($('#mbp-summary-category-list-item-template').html());
			this.templateItem = _.template($('#mbp-summary-price-breakdown-list-item-template').html());
			this.collection.bind('reset', this.destroy, this);
		},
		
		render: function() {
			var el = this.$el;
			el.html(this.template());
			var $collapsibleSet = el.find('#mbp-collapsible-set'),
			$breakdownItemEl;
			_.each(this.collection.models, function (summary) {
				$collapsibleSet.append(this.catTemplateItem(summary.toJSON()));
				$breakdownItemEl = $collapsibleSet.find('#summary-breakdown-item-' + summary.get('order'));
				
				//TODO: remove breakdown EL from document DOM and manipulate it...then reattach.
				_.each(summary.get('features').models,function(feature) {
//					console.log('appending feature to breakdownItemEl');
					$breakdownItemEl.append(this.templateItem(feature.toJSON()));
				}, this);
				
			}, this);

	        return this;
		}
	});
	
	views.Disclaimer = Backbone.View.extend({
		initialize: function() {
			this.template = _.template($("#mpt-disclaimer-template").html());
		},
		render: function() {
			this.$el.html(this.template());
			return this;
		}
	});

	views.PricezoneHeader=Backbone.View.extend({
		initialize:function(){
			this.template=_.template($("#mbp-pricezone-template").html());
		},
		sortOptions:function(ddlSelector){
			var options=$('option',ddlSelector).toArray();
			var firstOption=(options.length && !options[0].value)?options.shift():null;
			if(options.length){
				options=options.sort(function(a,b){
					//return a.text>b.text;
					if(a.text>b.text) return 1;
					return -1;
				});
				ddlSelector.empty();
				if(firstOption){
					ddlSelector.append(firstOption);
				}
				for(var i=0;i<options.length;i++){
					ddlSelector.append(options[i]);
				}
				$('option',ddlSelector)[0].selected=true;
			}

		},
		render:function(){
			//var $pricezoneContent=$(this.template());
			var self=this;
			var isStateCitySelector=self.isStateCitySelector;
			$('body #mbp-content').append($(self.template({isStateCitySelector:!!isStateCitySelector})));
			views.Helper.openShareOverlay('#pricezone-popup');

			var form=$('.ui-popup-active form#calc-pricezone-user');
			var selector;
			
			if(isStateCitySelector){
				var stateDDL=$('#bpt-state-selector',form),
					cityDDL=selector=$('#bpt-city-selector',form),
					txtSelectCity,
					selectedStateValue,
					selectedCityValue=self.model?self.model.id:null,
					stateCityData;
				cityDDL.selectmenu('disable');
				if(stateDDL.length && cityDDL.length && $('#state-city-json').length){
					stateCityData=$('#state-city-json').embeddedData();					
					for(var state in stateCityData){
						if(state){
							var option=$('<option></option>').val(state).text(state);
							stateDDL.append(option);
							if(selectedCityValue && !selectedStateValue){
								for(var i=0;i<stateCityData[state].length;i++){
									if(stateCityData[state][i].priceZoneId==selectedCityValue){
										selectedStateValue=state;
										break;
									}
								}
							}
						}
					}
					self.sortOptions(stateDDL);
					if($('option',cityDDL).length){
						txtSelectCity=$('option',cityDDL)[0].text;
					}
					if(selectedStateValue){
						stateDDL.val(selectedStateValue);
						cityDDL.empty();
						if(txtSelectCity){
							cityDDL.append($('<option></option>').val('').text(txtSelectCity));
						}
						for(var i=0;i<stateCityData[selectedStateValue].length;i++){
							var city=stateCityData[selectedStateValue][i];
							if(city){
								var option=$('<option></option>').val(city.priceZoneId).text(city.city);
								cityDDL.append(option);
							}
						}
						self.sortOptions(cityDDL);
						cityDDL.val(selectedCityValue);
						cityDDL.selectmenu('enable');
						stateDDL.selectmenu('refresh');
						cityDDL.selectmenu('refresh');
					}					
					stateDDL.on('change',function(){
						cityDDL.empty();
						if(txtSelectCity.length){
							cityDDL.append($('<option></option>').val('').text(txtSelectCity));
						}
						if(stateDDL.val()){							
							var cities=stateCityData[stateDDL.val()];
							for(var i=0;i<cities.length;i++){
								var city=cities[i];
								if(city){
									var option=$('<option></option>').val(city.priceZoneId).text(city.city);
									cityDDL.append(option);
								}
							}
							self.sortOptions(cityDDL);
							cityDDL.selectmenu('enable');							
						}
						else{
							cityDDL.selectmenu('disable');
						}
						cityDDL.selectmenu('refresh');
					});

				}
			}
			else{
				selector=$('#bpt-pricezone-selector',form);			
			if(self.model){
				selector.val(self.model.id);
				
				$.each(selector[0].options,function(i,opt){
					if(opt.value==self.model.id){
						$('span.ui-btn-text span',form).html(opt.text);
					}
				});
			}
			}

			form.submit(function(e){
				e.preventDefault();
				if(selector.val() && selector.val().length>0){
					$('.error',form).hide();
					Events.fireEvent(Events.eventList.buildandprice.model.PricezoneSelectedEvent.name,selector.val());
					$.publish('overlay.usercancel');
				}
				else{
					$('.error',form).text($('#standard-error', form).text());
					$('.error',form).filter(':hidden').slideDown('fast');
				}
				
			});

			
		}
	});
	
	views.Helper = {
		openOverlay: function(e) {
			e.preventDefault();
			var url = e.currentTarget.href;
			//console.log('views.Helper.openOverlay: ' + url);
			$.publish('overlay.launch', {
				url: url,
				name: 'bpt-package-whats-included',
				success: function(){
					if($('.ui-popup-container.ui-popup-active').height()>$(window).height()){
						$(window).scrollTop($('.ui-popup-container.ui-popup-active').offset().top);
					}
				}
			});
			
			this.updateOverlay();

		},
		
		openShareOverlay : function(contentId) {
			$.publish('overlay.launch', {
				contentId: contentId,
				url : undefined,
				name: 'bpt-share',
				success: function(){
					if($('.ui-popup-container.ui-popup-active').height()>$(window).height()){
						$(window).scrollTop($('.ui-popup-container.ui-popup-active').offset().top);
					}
				}
			});

			this.updateOverlay();

		},

		updateOverlay:function(){
			var $container=$('.ui-popup-screen.in');
			var $popup=$('.ui-popup-container.ui-popup-active');
			$.mobile.window.on('orientationchange',function(){
				if($('.ui-popup-screen.in').length<1 || $('.ui-popup-container.ui-popup-active').length<1){
					return;
				}
				setTimeout(function(){
					$.mobile.activePage.css('height','auto');
					//$popup.css('top','0px');
					$(window).scrollTop($('.ui-popup-container.ui-popup-active').offset().top);
					if($.mobile.activePage.height() < $('.ui-popup-screen.in').height()){
						$.mobile.activePage.css('height',$('.ui-popup-screen.in').height());
					}
				},500);				
			});
			if($.mobile.activePage.height() < $container.height()){
				$.mobile.activePage.css('height',$container.height());
			}
			$container.on('click',function(e){
				e.preventDefault();
				$.mobile.window.off('orientationchange');
				$.mobile.activePage.css('height','auto');
			});
			$('.cancel',$popup).on('click',function(e){
				e.preventDefault();
				$.mobile.window.off('orientationchange');
				$.mobile.activePage.css('height','auto');
			});
		},
		
		displayGalleryCueMessage: function() {
			
			var $rotateDiv = $('#bp-rotate-msg');
			if ($rotateDiv.length > 0) {
				//console.log('displayGalleryCueMessage');
				$rotateDiv.fadeIn('fast').delay(1500).fadeOut(1000, function() {
					$rotateDiv.addClass('hidden');
				});
			}
		}
	};
	
	
	
	
	views.MasterView = function() {
		var self = this,
		view = null,
		current = null,
		next = null,
		askForPostcode = false,
		hidePrices = false,
		showPricesLater = false,
		disclaimerView;
		var init = function() {
			resetNext();
//			Events.bind(Events.eventList.buildandprice.ChangePageEvent, this.changePage, this);
			Events.bind(Events.eventList.buildandprice.router.BlockUIEvent, blockUI, self);
			Events.bind(Events.eventList.buildandprice.router.UnblockUIEvent, unblockUI, self);
			Events.bind(Events.eventList.buildandprice.router.HidePricesEvent, hideShowPrices, self);
			Events.bind(Events.eventList.buildandprice.router.AskForPostcodeEvent, setAskForPostcode, self);
			Events.bind(Events.eventList.buildandprice.router.ShowPricesLaterEvent, setShowPricesLater, self);
			disclaimerView = new views.Disclaimer({model : {}});
		};
		
		var resetNext = function() {
			next = { contents : [], header: null, panel: null, page : null};
		};
			
		var blockUI = function() {
			// Show's the jQuery Mobile loading icon
			//console.log(' $.mobile.loading( \'show\' )');
	        $.mobile.loading( 'show' );
		};
		
		var unblockUI = function() {
			//console.log(' $.mobile.loading( \'hide\' )');
			$.mobile.loading( 'hide' );
		};
		
		var error = function(model) {
			next.contents = [new views.Error({model: model})];
			return this;
		};
	
	    var nameplates = function(collection) {
			next.contents = [new views.NameplateCategoryList({collection: collection})];
			return this;
		};
		
		var derivatives = function(collection, hotDeal) {
			// console.log('derivatives');
			next.contents = [new views.DerivativeList({collection: collection})];
			if (hotDeal != null) {
				next.contents.push(new views.HotDeal({model: hotDeal}));
			}
			return this;
		};

		var packages = function(collection) {
			next.contents = [new views.PackageList({collection: collection})];
			return this;
		};		
		
		var engines = function(name, thumbnail, collection, hotDeal) {
			//console.log('engines');
			next.contents = [new views.EngineTransmissionList({collection: collection, 
															 derivativeName : name, 
															 derivativeThumbnail : thumbnail})];
			if (hotDeal != null) {
				next.contents.push(new views.HotDeal({model: hotDeal}));
			}
			return this;
		};
		
		var colors = function(colorCollection, trimCollection, galleryModel, hotDeal) {

			next.contents = 
				[ new views.Gallery({model: galleryModel}),
				  new views.ColorList({collection: colorCollection}),
				  new views.TrimList({collection: trimCollection})
				];
			if (hotDeal != null) {
				next.contents.push(new views.HotDeal({model: hotDeal}));
			}
			return this;
		};
		
		var accessories = function(categoryModel, galleryModel, hotDeal) {
			//console.log('accessories');
			next.contents = 
				[ new views.Gallery({model: galleryModel}),
				  new views.FeatureList({model: categoryModel})
				];
			if (hotDeal != null) {
				next.contents.push(new views.HotDeal({model: hotDeal}));
			}
			return this;
		};
		
		var trims = function(trimCollection) {
			//console.log('update trims');
			var child = new views.TrimList({collection: trimCollection});
			current.contents[2].$el.replaceWith(child.render().$el);
			current.contents[2] = child;
			
//			current.contents.renderChild('trims',);
			return this;
		};
		
		var setAskForPostcode = function(value) {
			askForPostcode = value;
		};
		
		var hideShowPrices = function(show) {
			//console.log('hideShowPrices: show=' + show);
			//cannot just set this class here...need to apply it on every page
			$('#mbp-content').toggleClass('bp-hide-prices', show);
			hidePrices = show;
		};
		
		var setShowPricesLater = function() {
			showPricesLater = true;
			Events.unbind(Events.eventList.buildandprice.router.ShowPricesLaterEvent,this);
		};
		
		var paths = function(collection) {
			next.contents = [new views.PathList({collection: collection})];
			return this;
		};
		
		var summary = function(summaryModel, priceBreakdownCollection, galleryModel, hotDeal) {
			next.contents = [new views.Gallery({model: galleryModel}),
			                 new views.Summary({model: summaryModel, collection: priceBreakdownCollection})
			                 ];
			if (hotDeal != null) {
				next.contents.push(new views.HotDeal({model: hotDeal}));
			}
			return this;
		};
		
		var header = function(model) {
			next.header = new views.Header({model: model});
			return this;
		};
		
		var nameplateHeader = function(model) {
			next.header = new views.NameplateHeader({model: model});
			return this;
		};
		
		var page = function() {
			next.page = new views.Page();
			return this;
		};
		
		var panel = function(collection) {
			next.panel = new views.Panel({collection: collection});
			return this;
		};
		
		var nameplatePanel = function(collection) {
			next.panel = new views.NameplatePanel({collection: collection});
			return this;
		};

		var go = function() {
			
			
			//TODO: do a view clean up
			if (current == null) {
				//TODO: do a comparison of some sort to see if header/navigation has changed
				current = next;
				resetNext();
				//console.log('current is null');
			} else {
				current.page = next.page;
				if (next.panel != null) {
					//console.log('destroying the old panel');
					if (current.panel != null) {
						current.panel.destroy();
					}
					current.panel = next.panel;
				}
				if (next.header != null) {
					//console.log('destroying the old header');
					if (current.header != null) {
						current.header.destroy();
					}
					current.header = next.header;
				}
				current.contents = next.contents || [];
				//console.log('current is not null');
			}
			current.contents.push(disclaimerView);
			changePage(current);
			

			if (askForPostcode === true) {
				//console.log('firing RegionPostcodeChangeRequestEvent');
				Events.fireEvent(Events.eventList.buildandprice.view.RegionPostcodeChangeRequestEvent, true);
				askForPostcode = false;
			} 
		};
		
		var changePage = function (pageElemens) {
			
			var pageContents = pageElemens.contents,
			header = pageElemens.header,
			panel = pageElemens.panel,
			page = pageElemens.page,
			$page = page.render().$el,
			$mbpContent = $page.find('#mbp-content').toggleClass('bp-hide-prices', hidePrices);
	        if (header != null) {
	        	 //console.log('adding header');
	        	 $mbpContent.prepend(header.render().$el);
//	        	 $('body').prepend(header.render().$el);
	        }
	        for (var i = 0; i < pageContents.length; i++) {
	        	$mbpContent.append(pageContents[i].render().$el);
	        }
	        if (panel != null) {
	        	//console.log('adding panel');
	        	panel.render().$el.insertAfter($mbpContent);
	        }
	        
	        
	        $('body').append($page);
	        
//	        $('body').append($page);
	       
//	        var transition = $.mobile.defaultPageTransition;
	        // We don't want to slide the first page
//		        if (firstPage) {
//		            transition = 'none';
//		            firstPage = false;
//		        }
	        //console.log('current is null ? ' +  (current == null));
	        
	        $.mobile.changePage($page, { changeHash: false });
	        
	        //fire an event...in case any views need to do any initialization
	        Events.fireEvent(Events.eventList.buildandprice.view.PageChangedEvent);
	    };

	    var showPricezone=function(curPricezone,isStateCitySelector){
	    	var overlay=new views.PricezoneHeader({model:curPricezone});
	    	overlay.isStateCitySelector=!!isStateCitySelector;
	    	overlay.render();
	    };

		init();
		
		return {
			header: header,
			nameplateHeader: nameplateHeader,
			panel: panel,
			nameplatePanel: nameplatePanel,
			paths: paths,
			page: page,
			error : error,
			nameplates: nameplates,
			derivatives: derivatives,
			packages: packages,
			trims:trims,
			accessories: accessories,
			engines: engines,
			colors: colors,
			summary: summary,
			go: go,
			showPricezone:showPricezone
		};
		
	};
	
	return views;
})(window, document, jQuery);