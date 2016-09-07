/**
 * global self executing function
 * 
 * @author Sohrab Zabetian 
 */
Views.Buildandprice = (function(window,document, $, undefined){
	
	var views = {};

	

	/******************************VIEWS**********************************/
	views.PricezoneOverlayView = Backbone.View.extend({
		
		initialize: function(options) {
			this.template = _.template($('#bp-pricezone-template').html());
			this.optionsTemplate = _.template($('#bp-pricezone-item-template').html());
			this.$el = $('#bp-dialog');
		},
		
		events: {
			'click .ok' : 'pricezoneSelected',
			'click .cancel' : 'closeOverlay'
		},
		
		pricezoneSelected: function(e) {
			e.preventDefault();
			var id = $('#bpt-region-selector').val();
			this.collection.trigger(Events.eventList.buildandprice.view.PricezoneSelectedEvent, id);
			this.closeOverlay();
		},
		
		closeOverlay: function() {
			this.$el.dialog( "close" );
		},
		
		render: function() {
			var el = this.$el;
			var self = this;
			var html = this.template();
			el.html(html);
			var selector = el.find('#bpt-region-selector');
			_.each(this.collection.models, function (pricezone) {
				selector.append(self.optionsTemplate(pricezone.toJSON()));
	        }, this);
			
	        return this;
		},
		
		display: function() {
			this.render();
			views.Helper.openDialog(this.$el);
		}
	});
	
	
	views.PageTitleView = Backbone.View.extend({
		
		events: {
			'click #bp-scroll-view-hotdeals' : 'scrollToLatestOffers'
		},
		
		scrollToLatestOffers : function(e) {
			e.preventDefault();
			$(window).scrollTop($('#bp-hotdeals').offset().top);
		},
		
		initialize : function() {
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.destroy, this);
		},
		
		display : function() {
			this.template = _.template($('#bp-instructions-template').html());
			$('#bp-title').html(this.render().$el);
		}
	});
	
	
	views.ChangeVehicleHeaderView = Backbone.View.extend({
		tagName: 'li',
		
		className: 'first',
		
		initialize: function() {
			this.template = _.template($("#bp-change-vehicle-header-item-template").html());
			this.model.bind('change', this.render, this);
		},
		
		events: {
			'click #change-vehicle' : 'changeVehicle'
		},
		
		changeVehicle : function() {
			this.model.trigger(Events.eventList.buildandprice.view.ChangeVehicleEvent);
		}
	});
	
	
	
	views.PricezoneHeaderView = Backbone.View.extend({
		
		tagName: 'li',
		
		className: 'last',
		
		initialize: function() {
			this.template = _.template($("#bp-postcode-header-item-template").html());
			this.model.bind('change:postcode change:usageLabel change:priceZoneId', this.render, this);
		},
		
		render : function() {
			//console.log('PricezoneHeaderView.render');
			 var html = $(this.template(this.model.toJSON()));
			//TODO: change this to minimize reflow
			 this.translate(html);
			 $(this.el).html(html);
			 return this;
		},
		
		events: {
			'click #change-postcode' : 'changePostcode'
		},
		
		changePostcode : function(e) {
			e.preventDefault();
			this.model.trigger(Events.eventList.buildandprice.view.PricezoneChangeRequestEvent);
		}
		
	});
	
	views.PostcodeHeaderView = views.PricezoneHeaderView.extend({
		changePostcode: function(e) {
			e.preventDefault();
//			Util.log('FOAPostcodeHeaderView.changePostcode');
			Events.fireEvent(Events.eventList.buildandprice.view.RegionPostcodeChangeRequestEvent, true);
		}
	});
	
	views.HeaderListView = Backbone.View.extend({
		
		children : [],
		
		className: 'buildmenu',
		
		render: function() {
			var i = 0;
			var el = this.$el;
			var self = this;
			var ul = $('<ul></ul>');
			var length = this.collection.length -1;
			var showPricezone = this.collection.at(0).get('showPricezoneSelect');
			_.each(this.collection.models, function (header) {
				var renderChild = false;
				if (i == 0) {
					renderChild = true;
					self.children[i] = new views.ChangeVehicleHeaderView({model:header});
				} else if (i < length) {
					renderChild = true;
					self.children[i] = new views.HeaderItemView({model:header});
//					ul.append( $(this.template(header.toJSON())));
//					i++;
				} else if (showPricezone === Constants.postcode.ot){ //general region selector(ex: india)
//					Util.log(Constants.postcode.ot);
					renderChild = true;
					self.children[i] = new views.PricezoneHeaderView({model:header});
					
				} else if (showPricezone === Constants.postcode.hd){ //FOA hotdeals
//					Util.log('header : ' + Constants.postcode.hd);
					renderChild = true;
//					Util.log(header.get('usageLabel'));
					self.children[i] = new views.PostcodeHeaderView({model:header});
				}
				if (renderChild) {
					ul.append(self.children[i].render().$el);
					i++;
				}
			}, this);
			el.html(ul);
	        return this;
		},
		
		initialize: function() {
			this.collection.bind('destroy', this.destroy, this);
			this.template = _.template($("#bp-header-list-item-template").html());
		},
		
		display : function() {
			$('#content').prepend(this.render().$el);
		}
		
	});
	
	views.ShortPathHeaderListView = views.HeaderListView.extend({
		className: 'buildmenu shortpath'
	});
	
	
	views.HeaderItemView = Backbone.View.extend({
		
		tagName: 'li',
		
		className: 'num',
		
		initialize: function() {
			this.template = _.template($("#bp-header-list-item-template").html());
			this.model.bind('change', this.render, this);
		},
		
		events: {
			'click' : 'stepClicked'
		},
		
		stepClicked : function(e) {
			e.preventDefault();
			var trgt = $(e.currentTarget);
			if (trgt.hasClass('disabled')) {
				return false;
			} else if (trgt.hasClass('cur')) { //we are already on this step. nothing to do
				return false;
			} else { //user wants to change steps.
//				Util.log('StepChangeHeaderRequestEvent: ' + trgt.data('href'));
				this.model.trigger(Events.eventList.buildandprice.view.StepChangeHeaderRequestEvent, this.model);
			}
		},
		
		updateData : function() {
			var model = this.model;
			var isEnabled = model.get('enabled');
			var isCurrent = model.get('isCurrent');
			var className = isEnabled ?  'num enabled' :  'num disabled';
			className += isCurrent ? ' cur' : '';
			$(this.el).attr('class', className)
			  .attr('data-href', model.get('headerURL'));
		}, 
		
		render : function() {
			var html = $(this.template(this.model.toJSON()));
			$(this.el).html(html);
			this.updateData();
			return this;
		}
		
	});

	views.FooterView = Backbone.View.extend({

		className: 'buildbar',
		 
		initialize : function() {
			this.template = _.template($("#bp-footer-template").html());
			this.disclaimerTemplate = _.template($("#bp-disclaimer-template").html());
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.destroy, this);
		},

		events : {
			'click #bp-next-nav' : 'buttonClicked',
			'click #bp-see-disclaimer' : 'seeDisclaimer'
		},
		
		buttonClicked : function(e) {
//			Util.log('buttonClicked');
			e.preventDefault();
			var trgt = $(e.currentTarget);
			if (trgt.hasClass('disabled')) {
			} else {
				var href = trgt.attr('href');
				if (href.indexOf('cat-group-') >= 0) {
					var order = href.substring(href.indexOf('cat-group-') + 'cat-group-'.length, href.length);
//					Util.log('Events.eventList.buildandprice.view.TabChangeRequestEvent: ' +  order);
					this.model.trigger(Events.eventList.buildandprice.view.TabChangeRequestEvent,  order);
				} else {
//					views.Helper.closeEngineDialog();
					this.model.trigger(Events.eventList.buildandprice.view.StepChangeRequestEvent,  href);
				}
				
			}
		},
		
		seeDisclaimer: function(e) {
			e.preventDefault();
			views.Helper.injectContentOpenDialog(this.disclaimerTemplate());
		},
		
		display : function() {
			$('#content').find('#select-nameplate').append(this.render().$el);
		}
	});
	 
	views.BackButtonView = Backbone.View.extend({
		events : {
			'click #bp-back-nav' : 'buttonClicked'
		},
		
		initialize : function() {
			this.template = _.template($("#bp-backbutton-template").html());
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.destroy, this);
		},
		
		buttonClicked : function(e) {
			var trgt = $(e.currentTarget);
//			if (trgt.hasClass('disabled')) {
//				e.preventDefault();
//			} else {
				var href = trgt.attr('href');
				if (href.indexOf('cat-group-') >= 0) {
					e.preventDefault();
					var order = href.substring(href.indexOf('cat-group-') + 'cat-group-'.length, href.length);
					this.model.trigger(Events.eventList.buildandprice.view.TabChangeRequestEvent, order);
				}
//			}
		},
		
		display : function() {
			$('#bp-back-button').html(this.render().$el);
		}
	});
	
	views.NameplateHeaderListView = Backbone.View.extend({
		
		className: 'location',
		
		initialize: function() {
			this.template = _.template($('#bp-nameplate-header-template').html());
			this.model.bind('change', this.render, this);
		},
		
		events: {
			'click #change-postcode' : 'changePostcode'
		},
		
		changePostcode : function(e) {
			e.preventDefault();
			this.model.trigger(Events.eventList.buildandprice.view.PricezoneChangeRequestEvent);
		},
		
		display: function() {
			$('.heading-bar').append(this.render().$el);
		}
		
	});
	
	
	views.FOANameplateHeaderListView = views.NameplateHeaderListView.extend({
		
		changePostcode : function(e) {
			e.preventDefault();
			Events.fireEvent(Events.eventList.buildandprice.view.RegionPostcodeChangeRequestEvent, true);
		}
		
	});
	
	views.NameplateCagetoryListView = Backbone.View.extend({
		children : [],
		
		id : 'bp-select-model-container',
		
		render: function() {
//			var i = 0;
			var el = this.$el;
			var self = this;
			el.html(this.template());
			var ul = $('<ul></ul>');
			var rows = $('<div class="derivatives buildview"></div>');
			_.each(this.collection.models, function (category) {
				var row = $('<div class="row"></div>');
				var models = category.get('nameplates').models;
				var j = 0;
				_.each(models, function (nameplate) {
					self.children[j] = new views.NameplateItemView({model:nameplate});
					row.append(self.children[j++].render().$el);
				});
				
				ul.append(this.categoryTemplate(category.toJSON()));
				rows.append(row);
//				i++;
	        }, this);
			el.find('.buildselect').append(ul);
			el.find('.buildlist').append(rows);
	        return this;
		},
		
		initialize: function() {
			this.template = _.template($('#bp-nameplate-list-template').html());
			this.categoryTemplate = _.template($("#bp-nameplate-category-item").html());
			this.collection.bind("reset", this.render, this);
		},
		
		display: function() {
			$('#select-nameplate').html(this.render().$el);
			this.lazyload();
			ND.BuildList.create();
			
		}
	});
		

	views.NameplateListView = Backbone.View.extend({
		
		children : [],
		
		id : 'bp-select-model-container',
		
		className: 'derivatives buildview',
		
		render: function() {
			var i = 0;
			var el = this.$el;
			var self = this;
			var html = this.template();
			el.html(html);
			var div = el.find('.buildlist');
			_.each(this.collection.models, function (nameplate) {
				self.children[i] = new views.NameplateItemView({model:nameplate});
				div.append(self.children[i].render().$el);
				i++;
	        }, this);
			
	        return this;
		},
		
		initialize: function() {
			this.template = _.template($('#bp-nameplate-list-template').html());
			this.collection.bind("reset", this.render, this);
		},
		
		display: function() {
			$('#select-nameplate').html(this.render().$el);
			this.lazyload();
		}
	});
	
	views.NameplateItemView = Backbone.View.extend({
		
		 tagName: 'div',
		 
		 events: {
			'click .bp-nameplate-list-item' : 'modelSelected'
		 },
		  
		 modelSelected : function(e) {
			e.preventDefault();
			this.model.trigger(Events.eventList.buildandprice.view.ModelSelectedEvent, this.model);
		 },
		  
		 initialize: function() {
			this.template = _.template($("#bp-nameplate-list-item-template").html());
		 	this.model.bind('change', this.toggleClass, this);
		 	this.model.bind('destroy', this.destroy, this);
		 },
		 
		 toggleClass: function() {
			 $(this.el).toggleClass('cur', this.model.get('selected'));
		 }

	});
	
	views.SelectPathListView = Backbone.View.extend({
		
		tagName: 'ul',
		
		children : [],
		
		className: 'switch',
		
		render: function() {
			var i = 0;
			var el = this.$el;
			var self = this;
			_.each(this.collection.models, function (path) {
				self.children[i] = new views.SelectPathItemView({model:path, className : ((i == 0 ? 'first' : 'last'))});
				el.append(self.children[i].render().$el);
				i++;
	        }, this);
	        return this;
		},
		
		initialize: function() {
		},
		
		display: function() {
			$('#select-nameplate').html(this.render().$el);
		}
	});
	
	
	views.SelectPathItemView = Backbone.View.extend({

		tagName: 'li',
		
		initialize: function(options) {
			this.template = _.template($('#bp-path-list-item-template').html());
		},	
		
		events: {
			'click .bp-path-item' : 'pathSelected'
		},	
		
		pathSelected : function(e) {
			//Util.log('pathSelected');
			this.model.trigger(Events.eventList.buildandprice.view.PathSelectedEvent, this.model);
		}
	});
	
	views.NoVehiclesView = Backbone.View.extend({
		
		className: 'customize fixed-height-hack',
		
		initialize: function(options) {
			this.template = _.template($('#bp-no-vehicles-template').html());
		},	
		
		events: {
			'click #bp-start-over' : 'startOver',
			'click #bp-change-region' : 'changeRegionRequested'
		},	
		
		startOver : function() {
			this.model.trigger(Events.eventList.buildandprice.view.StartOverEvent);
		},
		
		changeRegionRequested: function() {
			this.model.trigger(Events.eventList.buildandprice.view.PricezoneChangeRequestEvent);
		},
		
		display: function() {
			$('#select-nameplate').html(this.render().$el);
		}
	});
	

	/**
	 * In charge of rendering list of Derivative (NOT DerivativeDetails) 
	 */
	views.SelectDerivativeListView = Backbone.View.extend({
		children : [],
		
		id: 'bp-select-derivative-container',
		
		className: 'featurecarousel-wrapper buildmodel',
		
		render: function() {
			var i = 0;
			var el = this.$el;
			el.html(this.template());
			var derivativeListEl = el.find('#bp-featurecarousel-ul');
			var self = this;
			_.each(this.collection.models, function (vehicle) {
				self.children[i] = new views.SelectDerivativeItemView({model:vehicle});
				derivativeListEl.append(self.children[i].render().$el);
				i++;
	        }, this);
	        return this;
		},
		
		initialize: function() {
			this.template = _.template($('#bp-derivative-list-template').html());
			
		},
		
		display: function() {
			$('#select-nameplate').html(this.render().$el);
			$.fn.buildComparatorCarousel('#bp-select-derivative-container');
			this.lazyload();
		}
	});
	
	/**
	 * In charge of rendering a single Derivative (NOT DerivativeDetails) Item
	 */
	views.SelectDerivativeItemView = Backbone.View.extend({
		 tagName: 'li',		
		  
		 className : 'bp-derivative-list-item',
		
		 events: {
			 'click .bp-derivative-list-item' : 'derivativeSelected',
			 'click .details-button' : 'viewHotDealOffer'
		 },
		  
		 derivativeSelected : function(e) {
			  e.preventDefault();
			  views.Helper.closeEngineDialog(e, true);
			  this.model.trigger(Events.eventList.buildandprice.view.DerivativeSelectedEvent, this.model);
		 },
		 
		 viewHotDealOffer: function(e) {
			 var hotDealUrl = this.model.get('hotDealUrl');
			 if (hotDealUrl === '#' || hotDealUrl === '') {
				 //Util.log('preventHotDealUrl');
				 e.preventDefault();
			 }
		 },
		  
		 initialize: function() {
			  this.template = _.template($('#bp-derivative-list-item-template').html());
			  this.hotDealTemplate = _.template($('#bp-derivative-list-item-hotdeal-template').html());
			  this.model.bind('change:selected', this.toggleClass, this);
			  this.model.bind('change:hotDealUrl', this.addHotDealUrl, this);
			  this.model.bind('destroy', this.destroy, this);
//			  Events.bind(Events.eventList.buildandprice.router.EnginesLoadedEvent, this.displayEnginesOverlay, this);
		 },
		  
		 render: function() {
			  var html = this.template(this.model.toJSON());
			  var el = $(this.el);
			  el.toggleClass('cur', this.model.get('selected')).html(html);
			  this.addHotDealUrl();
			  return this;
		 },
		 
		 addHotDealUrl: function() {
			$(this.el).append(this.hotDealTemplate({hotDealUrl : this.model.get('hotDealUrl')}));
		 }, 
		  
		 toggleClass : function() {
		  $(this.el).toggleClass('cur', this.model.get('selected') );
		 }
		 
		 
	});
	
	/**
	 * In charge of rendering list of Derivative (NOT DerivativeDetails) 
	 */
	views.SelectPackageListView = views.SelectDerivativeListView.extend({
		render: function() {
			var i = 0;
			var el = this.$el;
			var html = this.template();
			el.html(html);
			var derivativeListEl = el.find('#bp-featurecarousel-ul');
			var self = this;
			_.each(this.collection.models, function (vehicle) {
				self.children[i] = new views.SelectPackageItemView({model:vehicle});
				derivativeListEl.append(self.children[i].render().$el);
				i++;
	        }, this);
	        return this;
		}
		
	});
	
	/**
	 * In charge of rendering a single Derivative (NOT DerivativeDetails) Item
	 */
	views.SelectPackageItemView = Backbone.View.extend({
		  tagName: 'li',		
		
		  className : 'bp-package-list-item',
	      
		  events: {
			 'click .bp-package-list-item' : 'packageSelected',
			 'click .details-button' : 'viewPackageDetailsSelected'
		  },
		  
		  packageSelected : function(e) {
			  e.preventDefault();
			  this.model.trigger(Events.eventList.buildandprice.view.PackageSelectedEvent, this.model);
		  },
		  
		  viewPackageDetailsSelected : function(e) {
			  views.Helper.openOverlay(e);
		  },
		  
		  initialize: function() {
			  this.template = _.template($('#bp-package-list-item-template').html());
			  this.model.bind('change', function() {
				  this.toggleClass();
				  this.translate();
			  }, this);
			  this.model.bind('destroy', this.destroy, this);
		  },
		  
		  render: function() {
			  var html = this.template(this.model.toJSON());
			  var el = $(this.el);
			  el.toggleClass('cur', this.model.get('selected')).html(html);
			  return this;
		  },
		  
		  toggleClass : function() {
			  $(this.el).toggleClass('cur', this.model.get('selected') );
		  }
	});
	
	views.SummaryView = Backbone.View.extend({
		events: {
			'click .see-included' : 'seeWhatsIncluded',
			'click #bp-save-as-pdf' : 'saveAsPDF',
			'click #bp-share-config' : 'shareConfig',
			'click #bp-request-quote-btn' : 'requestAQuote',
			'click #bp-payment-presenter-btn' : 'presentPayment',
			'click #bp-postcode-overlay-warning-close': 'closePostcodeWarningOverlay',
			'click .loan-calculator-overlay': 'openLoanCalculatorOverlay'
		},

		openLoanCalculatorOverlay: function (e) {
		    e.preventDefault();
		    $(e.target).loanCalculatorOverlay({
		        price: this.model.get('unformattedPolkPrice'),
		        url: $(e.target).attr('data-url'),
		        location: this.model.get('locationValue'),
		        priceformatter: ND.PriceFormatter
		    });
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
			
			this.model.trigger(Events.eventList.buildandprice.view.PresentPaymentEvent, '#bp-payment-presenter-form');
		},

		shareConfig: function(e) {
			e.preventDefault();
			this.model.trigger(Events.eventList.buildandprice.view.ShareConfigEvent);
		},
		
		initialize: function() {
			this.template = _.template($('#bp-summary-template').html());
			this.dialogTemplate = _.template($('#bp-share-dialog-template').html());
			this.model.bind('destroy', this.destroy, this);
			this.model.bind('change', this.render, this);
			Events.bind(Events.eventList.buildandprice.router.PDFReadyEvent, this.displayPDF, this);
			Events.bind(Events.eventList.buildandprice.router.ShareReadyEvent, this.displayDialog, this);
		},
		
		display : function() {
			$('#select-nameplate').html(this.render().$el);
		},
		
		displayDialog: function(url) {
			//console.log('displayDialog: ' + url);
			//console.log('displayDialog encodedUrl: ' + encodeURIComponent(url));
			views.Helper.injectContentOpenDialog($(this.dialogTemplate({url : url, encodedUrl : encodeURIComponent(url)})));
			//select text on click
			$('#bpt-share-url').on('click', function() {
				$(this).select();
			});
			
			$('.bp-share-via').on('click', function(e) {
				var provider = $(this).attr('data-provider');
				Events.fireEvent(Events.eventList.buildandprice.view.ShareLinkClickedEvent, provider);
			});
		}
		
	});
	
	views.PriceCategoryBreakdownListView = Backbone.View.extend({
		tagName: 'ul',
		
		children : [],
		
		events: {
			'click .toggle' : 'toggleBreakdown'
		},
		
		toggleBreakdown : function(e) {
			$(e.currentTarget).parents('li').toggleClass('collapsed');
		},
		
		initialize: function() {
			this.template = _.template($('#bp-summary-price-breakdown-list-template').html());
			this.model.bind('destroy', this.destroy, this);
		},
		
		render: function() {
			var i = 0;
			var el = this.$el;
			var self = this;
			_.each(this.collection.models, function (summary) {
				var html = this.template(summary.toJSON());
				el.append(html);
				var breakdownItemEl = el.find('#summary-breakdown-item-' + summary.get('order'));
				//TODO: remove breakdown EL from document DOM and manipulate it...then reattach.
				_.each(summary.get('features').models, function(feature) {
					self.children[i] = new views.PriceFeatureBreakdownListItemView({model:feature});
					breakdownItemEl.append(self.children[i].render().$el);
					i++;
				});
	        }, this);
	        return this;
		},
		
		display : function() {
			
			$('#bp-summary-price-breakdown').html(this.render().$el);
			$('.accordion').each(function() {
				views.Helper.createScrollPane($(this));
			});
		}
	});
	
	views.PriceFeatureBreakdownListItemView = Backbone.View.extend({
		
		tagName : 'li',
		
		initialize: function() {
			this.template = _.template($('#bp-summary-price-breakdown-list-item-template').html());
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.destroy, this);
		},
		
		render : function() {
			 var html = $(this.template(this.model.toJSON()));
			 $(this.el).toggleClass('child-node', this.model.get('isChild')).html(html);
			 return this;
		}
		
		
	});

	views.TrimListView = Backbone.View.extend({
		
		tagName: 'ul',

		id: 'trim-list',
		
		className: 'choice',
		
		children : [],
		
		render: function() {
			var i = 0;
			var el = this.$el;
			var self = this;
			_.each(this.collection.models, function (trim) {
				self.children[i] = new views.TrimItemView({model:trim});
				el.append(self.children[i].render().$el);
				i++;
	        }, this);
	        return this;
		},
		
		display : function() {
			$('#trim-items').html(this.render().$el);
			$.fn.tooltip(function(tooltip) {
				if (tooltip.itemheight > 100) {
					alert('hiu');
				}
			});
		}
	});
	

	views.TrimItemView = Backbone.View.extend({
		  
		 tagName: 'li',
		
		 events: {
			 'click .trim-item' : 'trimChanged'
		 },
		  
		 render: function() {
			  var json = this.model.toJSON();
			  var html = this.template(json);
			  var el = this.$el;
			  el.html(html);
			  this.toggleSelected();
			  el.append(this.tooltipTemplate(json));
			  return this;
		  },
		  
		  initialize: function() {
			  this.nameTemplate = _.template($("#bp-trim-list-template").html());
			  this.template = _.template($("#bp-trim-list-item-template").html());
			  this.tooltipTemplate = _.template($("#bp-tooltip-template").html());
			  this.model.bind('change', this.toggleSelected, this);
			  this.model.bind('destroy', this.destroy, this);
			  //apple device specific event handling
			  if (ND.Utils !== undefined && ND.Utils.isTouchDevice() === true) {
				 $(this.el).on('mouseover', '.trim-item' ,$.proxy(this.trimChanged, this)); 
			  }
		  },
		  
		  toggleSelected: function() {
			  var selected = this.model.get('selected');
			  $(this.el).toggleClass('cur', selected);
			  if (selected === true) {
				  $('#trim-name').html(this.nameTemplate({selected : selected, name : this.model.get('name')}));
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

	views.ColorListView = Backbone.View.extend({
		
		className: 'tab-colours',
		
		children : [],
		
		events: {
		},
		
		render: function() {
			//Util.log('views.ColorListView.render()');
			var i = 0;
			var el = this.$el;
			el.html(this.template());
			var colorEl = el.find('#color-list');
			var $colorNameEl = el.find('#color-name');
			_.each(this.collection.models, function (color) {
				this.children[i] = new views.ColorItemView({model:color,
					colorNameDiv: $colorNameEl,
					template : this.colorItemTemplate,
					tooltipTemplate : this.tooltipTemplate,
					nameTemplate : this.nameTemplate});
				colorEl.append(this.children[i].render().$el);
				i++;
	        }, this);
	        return this;
		},
		
		initialize: function(attributes) {
			this.template =  _.template($("#bp-color-list-template").html());
			this.colorItemTemplate =  _.template($("#bp-color-list-item-template").html());
			this.tooltipTemplate = _.template($("#bp-tooltip-template").html());
			this.nameTemplate = _.template($("#bp-color-name-template").html());
			this.parent = attributes.parent;
		},
		
		display : function() {
			$(this.parent).html(this.render().$el);
			$.fn.tooltip();
		}
		
	});

	views.ColorItemView = Backbone.View.extend({
		  
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
			  var json = this.model.toJSON();
			  var html = this.template(json);
			  var el = $(this.el);
			  el.html(html);
			  this.toggleSelected();
			  el.append(this.tooltipTemplate(json));
			  return this;
		  },
		  
		  toggleSelected: function() {
			  var selected = this.model.get('selected');
			  $(this.el).toggleClass('cur', selected);
			  if (selected === true) {
				  this.$colorNameDiv.html(this.nameTemplate({selected : selected, name: this.model.get('name')}));
			  }	
		  },
		  
		  initialize: function(options) {
			 
			  this.model.bind('change:selected', this.toggleSelected, this);
			  this.model.bind('destroy', this.destroy, this);
			  this.$colorNameDiv = options.colorNameDiv;
			  this.template = options.template;
			  this.nameTemplate = options.nameTemplate;
			  this.tooltipTemplate = options.tooltipTemplate;
			  //apple device specific event handling
			  if (ND.Utils !== undefined && ND.Utils.isTouchDevice() === true) {
				 $(this.el).on('mouseover', '.color-item' ,$.proxy(this.colorChanged, this)); 
			  }
		  }

	});
	
	views.GalleryImageView = Backbone.View.extend({
		
		render: function() {
			  var html = this.template(this.model.toJSON());
			  var elmnt = $(this.el);
			  elmnt.html(html);
			 
			  var children = elmnt.children('.vehicle-sprite');
			  if (this.model.get('layer') == 1) {
				  children.css('opacity', 0);
				  children.animate({opacity : 1}, 1200);
			  } else {
				  children.css('opacity', .4);
				  children.animate({opacity : 1}, 800);
			  }
			  return this;
		 },
		 
		 initialize: function() {
			  this.template = _.template($('#bp-gallery-image-item-template').html());
			  this.model.bind('change', this.render, this);
			  this.model.bind('destroy', this.destroy, this);
		 }
	});

	views.GalleryView = Backbone.View.extend({
		  children : [],
		  
		  events: {
			  'click #gallery-next' : 'next',
			  'click #gallery-prev' : 'prev'
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
			  $(this.el).html(this.template());
		       return this;
		  },
		  
		  renderChildren : function() {
			  var galleryContent =  $(this.el).find('#gallery-content');
			  var i = 0;
			  var displayCueMsg = false;
			  _.each(this.collection.models, function (img) {
				  if (i === 0) {
					  //Util.log('numberImages > 1 ? ' + (img.get('numImages') > 1));
					  displayCueMsg = (img.get('numImages') > 1);
				  }
				  this.children[i] = new views.GalleryImageView({model:img});
				  galleryContent.append(this.children[i].render().$el);
				  i++;
	          }, this);
			  
			  if (displayCueMsg === true) {
				  views.Helper.displayGalleryCueMessage();
			  }
			  return this;
		  },
		 
		  initialize: function() {
			  this.template = _.template($('#bp-gallery-template').html());
			  this.collection.bind('destroy', this.destroy, this);
			  Events.bind(Events.eventList.buildandprice.model.ShowArrowsEvent, this.enableNextPrevArrows, this);
			  Events.bind(Events.eventList.buildandprice.model.HideArrowsEvent, this.disableNextPrevArrows, this);
		  },
		  
		  enableNextPrevArrows: function() {
			  //console.log('enableNextPrevArrows');
			  $('#gallery-next').removeClass('hidden');
			  $('#gallery-prev').removeClass('hidden');
		  },
		  
		  disableNextPrevArrows: function() {
			  //console.log('disableNextPrevArrows');
			  $('#gallery-next').addClass('hidden');
			  $('#gallery-prev').addClass('hidden');
		  },
		  
		  display : function() {
			  $('#gallery').prepend(this.render().$el).append(this.renderChildren().$el);
		  }
	});
	
	views.CategoryGroupHeaderListView = Backbone.View.extend({
		
		children : [],
		
		tagName: 'ul',
		
		render: function() {
			var i = 0;
			var el = this.$el;
			var self = this;

			_.each(this.collection.models, function (categoryGroup) {
				if(typeof categoryGroup.get("hideInBuildPrice") === "undefined"){	
					self.children[i] = new views.CategoryGroupHeaderItemView({model:categoryGroup});
					el.append(self.children[i].render().$el);
				}
				i++;
	        }, this);
	        return this;
		},
		
		initialize: function() {
		},
		
		display : function() {
			//console.log('CategoryGroupListView.display');
			$('#tab-groups').prepend(this.render().$el);
		}
		
	});
	
	views.CategoryGroupHeaderItemView = Backbone.View.extend({
		
		  tagName: 'li',
		  
		  initialize: function() {
			  this.template = _.template($('#bp-cat-group-header-item-template').html());
//			  this.model.bind('change', this.render, this);
			  this.model.bind('destroy', this.destroy, this);
		  }
		  
	});

	
	views.CategoryGroupBodyListView = Backbone.View.extend({
		
		children : [],
		
		scrollbars: [],
		
		render: function() {
			var i = 0;
			var el = this.$el;
			var self = this;

			//if(typeof this.model.get('hideInBuildPrice') === "undefined"){
				_.each(this.collection.models, function (categoryGroup) {
					//console.log((self.idPrefix +  categoryGroup.get('order')));
					self.children[i] = new views.CategoryGroupBodyItemView({id : (self.idPrefix +  categoryGroup.get('order')), model:categoryGroup});
					el.append(self.children[i].render().$el);
					i++;
		        }, this);
			//}
	        return this;
		},
		
		initialize: function() {
			this.idPrefix = 'cat-group-';
			this.$el =  $('#tab-groups');
			Events.bind(Events.eventList.buildandprice.view.UpdateScrollBarEvent, this.updateScrollbar, this);
		},
		
		updateScrollbar: function() {
			_.each(this.scrollbars, function(scrollbar) {
				if (scrollbar.is(':visible')) {
					views.Helper.updateScrollPane(scrollbar);	
				};
				
			});
				
		},
		
		display : function() {
			//console.log('CategoryGroupListView.display');
			this.render();
			var self = this;
			$('div.scrollbar-wrapper').each(function() {
				self.scrollbars.push(views.Helper.createScrollPane($(this)));	
			});
			_.each(this.collection.models, function (categoryGroup) {
				var categories = categoryGroup.get('categories');
				if (categories != null && categories.length > 1) {
					$('#tabs-accessories').tabs({
							select : self.tabChanged
					});
				} 
			});
		},
		
		tabChanged: function(event, ui) {
			//Util.log('views.CategoryGroupBodyListView: tabChanged');
			Events.fireEvent(Events.eventList.buildandprice.view.SubTabChangedEvent, ui.panel.id);
		},
		
		destroy: function() {
			this.scrollbars = [];
			Backbone.View.prototype.destroy.call(this);
		}
	});
	
	views.CategoryGroupBodyItemView = Backbone.View.extend({
		
		children : [],
		
		render: function() {
			var i = 0;
			var el = this.$el;
			var categories = this.model.get('categories');
			if(typeof this.model.get('hideInBuildPrice') === "undefined"){
				if (categories != null) {
					var classNames = this.model.get('containsFeatureGroup') ? 'factorypanel' : '';
					var tabEl = $('<div id="tabs-accessories" class="' + classNames + '"></div>');
					var order = this.model.get('order');
					this.children[i] = new views.CategoryListView({parent : this.parentPrefix + order, collection : categories});
					tabEl.append(this.children[i].render().$el);
					i++;
					var tabContentEl = $('<div class="accessory-tab-content"></div>');
					_.each(categories.models, function(category) {
						this.children[i] = new views.FeatureListView({id: this.idPrefix + category.get('order'), model : category});
						tabContentEl.append(this.children[i].render().$el);
						i++;
					}, this);
					tabEl.append(tabContentEl);
					el.html(tabEl);
				}
			}
			return this;
		},
		  
		initialize: function() {
			this.model.bind('destroy', this.destroy, this);
			this.parentPrefix = '#cat-group-' ;
			this.idPrefix = 'cat-';
		}
	});
	
	views.CategoryListView = Backbone.View.extend({
		
		tagName: 'ul',
		
		children : [],
		
		categoryCount : 0,

		render: function() {
			this.categoryCount = this.collection.length;
			if (this.categoryCount > 1) {
				var i = 0;
				var el = this.$el;
				var self = this;
				_.each(this.collection.models, function (category) {
						self.children[i] = new views.CategoryHeaderItemView({className: (i == 0 ? 'first' : ((i == self.categoryCount - 1))? 'last' : ''), model:category});
						el.append(self.children[i].render().$el);
						i++;
		        }, this);
			}
	        return this;
		},
		
		initialize: function(attributes) {
			this.parent = attributes.parent;
		}
		
	});

	views.CategoryHeaderItemView = Backbone.View.extend({
		
		 tagName: 'li',
		  
		 initialize: function() {
			 this.template = _.template($("#bp-category-list-item-template").html());
			 this.model.bind('change', this.render, this);
			 this.model.bind('destroy', this.destroy, this);
		 }
	});

	views.FeatureListView = Backbone.View.extend({
		
		children : [],
		
		className: 'bp-feature-list',
		
		events: {
			'click .bp-sort-price' : 'sortByPrice',
			'click .bp-sort-name' : 'sortByName'
	    },
	    
	    sortByName: function(e) {
	    	e.preventDefault();
//	    	var sortDir = $(e.target).attr('data-sort-dir');
	    	//Util.log('sortByName-> dir:' + sortDir);
	    	this.model.trigger(Events.eventList.buildandprice.view.SortFeaturesByNameEvent);
	    },
	    
	    sortByPrice: function(e) {
	    	e.preventDefault();
//	    	var sortDir = $(e.target).attr('data-sort-dir');
	    	//Util.log('sortByPrice-> dir:' + sortDir);
	    	this.model.trigger(Events.eventList.buildandprice.view.SortFeaturesByPriceEvent);
	    },
		
		render: function() {
			var el = this.$el;
			var sortDir = this.model.get('sortDir');
			//Util.log('FeatureListView.render()-> name:' + sortDir.get('name') + ' price:' + sortDir.get('price'));
			el.append(this.template({nameSortDir: sortDir.get('name'), priceSortDir: sortDir.get('price')}));
			var $wrapper = $('<div class="scrollbar-wrapper"></div>');
			var $featuresEl = $('<ul class="accessories-list"></ul>');
			this.renderFeatures($featuresEl);
			$wrapper.html($featuresEl);
			el.append($wrapper);
	        return this;
		},
		
		renderFeatures : function($featuresEl) {
			var collection = this.model.get('features');
			var i = 0;
			$featuresEl.empty();
			this.reset();
			_.each(collection.models, function (feature) {
				this.children[i] = new views.FeatureItemView({model:feature});
				$featuresEl.append(this.children[i].render().$el);
				i++;
	        }, this);
			
		},
		
		initialize: function() {
			this.template = _.template($('#bp-feature-list-template').html());
			var features = this.model.get('features');
//			features.bind('reset', this.reset, this);
			features.bind(Events.eventList.buildandprice.model.FeaturesSortCompletedEvent, this.updateList, this);
		},
		
		updateList: function () {
			//Util.log('updateList');
			var el = this.$el;
			el.find('.bp-sort-options').remove();
			var sortDir = this.model.get('sortDir');
			el.prepend(this.template({nameSortDir: sortDir.get('name'), priceSortDir: sortDir.get('price')}));
			var $accessoryList = el.find('ul.accessories-list');
			this.renderFeatures($accessoryList);
		},
		
		reset: function() {
			_.each(this.children, function(child) {
				child.destroy();
			}, this);
			this.children = [];
			
		}
		
		
	});

	views.FeatureItemView = Backbone.View.extend({
			
		  className: 'feature',
		  
		  tagName: 'li',
		
		  events: {
			  'click .selection' : 'featureSelected',
			  'click .message > a' : 'viewFeatureDetails',
			  'click .expand-collapse' : 'expandCollapse',
			  'mouseenter .bp-tooltip-link' : 'tooltipHoverOn',
			  'mouseleave .bp-tooltip-link' : 'tooltipHoverOff'
		  },
		  
		  featureSelected : function(e) {
			 //console.log('feature selected');
			 e.preventDefault();
			 if (!this.model.get('disabled')) {
				 this.model.trigger(Events.eventList.buildandprice.view.FeatureSelectedEvent, this.model);
				 if (this.model.get('selected')) {
					 if (this.model.get('spriteUrl') != '') {
						 views.Helper.displayFeatureVisualisedMessage(this.$visualiseMsg, this.$notVisualiseMsg);
					 } else {
						 views.Helper.displayFeatureVisualisedMessage(this.$notVisualiseMsg, this.$visualiseMsg);
					 }
			  	 }
			 }
		  },
		  
		  expandCollapse: function(e) {
			  e.preventDefault();
			  var link = $(e.target);
			  var ul = link.parent().siblings('ul.bp-feature-group');
			  var hasExpandedClass = ul.hasClass('expanded');
			  ul.toggleClass('expanded', !hasExpandedClass).toggleClass('hidden', hasExpandedClass);
			  link.attr('class', hasExpandedClass ? 'spsplus' : 'spstoggle');
			  Events.fireEvent(Events.eventList.buildandprice.view.UpdateScrollBarEvent);
				  
		  },
		  
		  tooltipHoverOn: function() {
			  if (!this.model.get('disabled')) {
				  var $tooltip = $('#bp-feature-tooltip-p');
				  $tooltip.text(this.model.get('note'));
				  $('#bp-feature-tooltip').show();
			  } 
		  },
		  
		  tooltipHoverOff: function() {
			  $('#bp-feature-tooltip').hide();
		  },
		  
		  viewFeatureDetails: function(e) {
			  if (!this.model.get('disabled')) {
				  Events.fireEvent(Events.eventList.buildandprice.view.ViewAccessoryDetailsEvent);
				  views.Helper.openOverlay(e);
			  }
		  },
		  
		  initialize: function() {
			  this.template = _.template($("#bp-feature-list-item-template").html());
			  this.messageTemplate = _.template($("#bp-feature-message-template").html());
			  this.model.bind('change:selected change:disabled', this.toggleClass, this);
			  this.model.bind('change:message', this.updateMessage, this);
			  this.model.bind('destroy', this.destroy, this);
			  //this.isOptionPack = this.model.get('isOptionPack');
			  this.$visualiseMsg = $('#bp-visualise-msg');
			  this.$notVisualiseMsg = $('#bp-no-visualise-msg');
		  },
		  
		  toggleClass: function() {
			  var el = $(this.el);
			  el.toggleClass('active', this.model.get('selected'))
			    .toggleClass('disabled', this.model.get('disabled'));
			  return el;
		  },
		  
		  updateMessage: function() {
			  var el = $(this.el);
			  el.find('div.message').remove();
			  el.append(this.messageTemplate(this.model.toJSON()));
			  Events.fireEvent(Events.eventList.buildandprice.view.UpdateScrollBarEvent);
		  },
		  
		  render: function() {
			  var modelJson = this.model.toJSON();
			  //console.log(this.model.get('name') + ' isOptionPack ' + this.model.get('isOptionPack'));
			  var el = this.toggleClass().html(this.template(modelJson));
			  var collection = this.model.get('featureGroupAttributes');
			  if (this.model.get('isOptionPack') && 
			      collection && collection != null && collection.length > 0) {
				 var ulEl = $('<ul class="bp-feature-group hidden"></ul>');
				_.each(collection.models, function(featureGroupAttribute) {
					ulEl.append('<li>' + featureGroupAttribute.get('featureName') + '</li>');
				}, this);
				el.find('div.info').append(ulEl);
			  } else {
				  el.append(this.messageTemplate(modelJson));
			  }
			  return this;
		 }
	});


	views.EngineTransmissionListView = Backbone.View.extend({
		
//		className: 'engine-list',
		
		children : [],
		
		render: function() {
			var i = 0;
			var el = this.$el;
			el.html(this.template());
			var enginesEl = el.find('.derivative-list');
			var self = this;
			_.each(this.collection.models, function (engine) {
				self.children[i] = new views.EngineTransmissionItemView({model:engine});
				enginesEl.append(self.children[i].render().$el);
				i++;
	        }, this);
	        return this;
		},
		
		initialize: function() {
			this.template = _.template($("#bp-engine-list-template").html());
		},
		
		display : function() {
			$('#bp-engine-overlay').html(this.render().$el);
			views.Helper.openEngineDialog(this.collection.size());
		}
		
	});
	
	views.EngineTransmissionItemView = Backbone.View.extend({
		  tagName : 'li',
		  
		  events: {
			'click .selection, .info' : 'engineChanged'  
		  },

		  engineChanged : function() {
			  this.model.trigger(Events.eventList.buildandprice.view.EngineTrasmissionSelectedEvent);
		  },
		  
		  initialize: function() {
			  this.template = _.template($("#bp-engine-list-item-template").html());
			  this.model.bind('change:selected', this.toggleClass, this);
			  this.model.bind('destroy', this.destroy, this);
		  },
		  
		  render : function() {
			 var html = $(this.template(this.model.toJSON()));
			 this.$el.toggleClass('active', this.model.get('selected'));
			 this.$el.html(html);
			 return this;  
		  },
		  
		  toggleClass : function() {
			  //Util.log('Engine \'' + this.model.get('id') + '\'  is selected ? ' + this.model.get('selected'));
			  this.$el.toggleClass('active', this.model.get('selected'));
		  }
		  
	});

	views.DerivativeDetailView = Backbone.View.extend({
		
		children : [],
		
		numTabs: 0,
		
		$tabs: null,
		
		tabAnimator: null,
		
		initialize: function() {
			this.template = _.template($("#bp-derivative-detail-template").html());
			this.carViewTemplate = _.template($("#bp-interior-exterior-switch-template").html());
			this.model.bind('change', this.renderCarView, this);
			this.model.bind(Events.eventList.buildandprice.router.LoadCompleteEvent, this.initTabs, this);
			Events.bind(Events.eventList.buildandprice.router.NextTabEvent, this.nextTab, this);
			Events.bind(Events.eventList.buildandprice.router.PrevTabEvent, this.prevTab, this);
			this.$tabs = null;
			this.tabAnimator = null;
		},
		
		events: {
			'click #interior-exterior' : 'toggleInteriorExteriorView',
			'click #bp-overlay-close' : 'closeVehicleOverlay',
			'click #bp-overlay-disclaimer' :'showVehicleDisclaimerOverlay'
		},
		
		closeVehicleOverlay: function() {
			$('.disclaimerpanel').addClass('hidden');
		},
		
		showVehicleDisclaimerOverlay: function(e) {
			e.preventDefault();
			if (this.model.get('showVehicleDisclaimer')) {
				$('.disclaimerpanel').removeClass('hidden');
			}
		},
		
		toggleInteriorExteriorView : function(e) {
			e.preventDefault();
			//console.log('currentView = ' + $(e.currentTarget).attr('data-view'));
		    this.model.trigger(Events.eventList.buildandprice.view.ToggleViewEvent, $(e.currentTarget).attr('data-view'));
		},
		
		nextTab : function() {
			this.selectTab(+1);
		},
		
		prevTab : function() {
			this.selectTab(-1);
		},
		
		selectTab: function(dir) {
			
			var selectedTabIdx = this.$tabs.tabs( "option", "selected");
			if ((selectedTabIdx + dir >= 0) && (selectedTabIdx + dir < this.numTabs)) {
//				Util.log('next/prev tab: ' + selectedTabIdx + dir)
				this.$tabs.tabs( "option", "selected", selectedTabIdx + dir);
			} 
		},
		
		renderCarView : function() {
			 var html = this.carViewTemplate(this.model.toJSON());
			 var switchView = $('#switch-car-view');
			 switchView.html(html);
			 this.translate(switchView);
			 return this;
		},
		
		render: function() {
			 var html = this.template(this.model.toJSON());
			 $(this.el).html(html);
			 return this.renderCarView();
		},
		
		display : function() {
			$('#select-nameplate').html(this.render().$el);
			//initialise tooltip for all accessories
			$.fn.tooltip();
		},
		
		displayChildView : function(view) {
			this.children[this.children.length] = view;
			view.display();
		},
		
		initTabs : function() {
			var self = this;
			this.$tabs = $('#tab-groups');
			
			this.$tabs.tabs({
				select : $.proxy(self.tabChanged, self)
			});
			this.tabAnimator = new views.TabAnimator(this.$tabs);
			this.numTabs = this.$tabs.tabs('length');
			this.renderCarView();
		},
		
		tabChanged: function(event, ui) {
			this.model.trigger(Events.eventList.buildandprice.view.TabChangedEvent, ui.panel.id);
			this.tabAnimator.moveIndicator(ui.index);
		}
	});
	
	views.ErrorView	= Backbone.View.extend({
		
		className: 'customize fixed-height-hack',
		
		initialize: function() {
			this.template = _.template($("#bp-error-template").html());
		},
		
		events: {
			'click #bp-start-over' : 'startOver'
		},
		
		startOver: function() {
			this.model.trigger(Events.eventList.buildandprice.view.StartOverEvent);
		},
		
		display : function() {
			$('#select-nameplate').html(this.render().$el);
		}
	});
	
	views.HotDealsView = Backbone.View.extend({
		
		className: 'latestoffer',
		
		children : [],
		
		initialize: function() {
			this.template = _.template($("#bp-hotdeal-list-template").html());
		},
		
		render: function() {
			var i = 0;
			var el = this.$el;
			el.html(this.template({title: this.model.get('latestOffersInstructions')}));
			var hotdealListEl = el.find('#bp-hotdeal-featurecarousel-ul');
			var self = this;
			var collection = this.model.get('hotdeals');
			_.each(collection.models, function (hotdeal) {
				self.children[i] = new views.HotDealItemView({model:hotdeal});
				hotdealListEl.append(self.children[i].render().$el);
				i++;
	        }, this);
	        return this;
		},
		
		display : function() {
			$('#bp-hotdeals').html(this.render().$el);
			$.fn.buildComparatorCarousel('#bp-hotdeal-featurecarousel');
			this.lazyload();
		}
	});
	
	views.HotDealItemView = Backbone.View.extend({
		 tagName: 'li',		
		  
		 className : 'bp-hotdeal-list-item',
		
//		 events: {
//			 'click .details-button' : 'hotdealSelected'
//		 },
//		  
//		 hotdealSelected : function(e) {
//			  e.preventDefault();
//			  this.model.trigger(Events.eventList.buildandprice.view.HotDealSelectedEvent, this.model);
//			  return false;
//		 },
		 
		initialize: function() {
			this.template = _.template($("#bp-hotdeal-list-item-template").html());
		}
	});


	views.ViewManager = function() {
		var titleView = null,
		currentView = null,
		auxViews = new Array(),
		askForPostcode = false;
		showPricesLater = false;
		independantViews = new Array(),
		loader = null;
		
		blockUI = function() {
			if (loader == null) {
				loader = ND.loadmask();
				loader.show();
				//console.log('loader.show()');
			}
		};
		
		unblockUI = function() {
			if (loader != null) {
				//console.log('loader.hide()');
				loader.hide();
				loader = null;
			}
		};
		
		setAskForPostcode = function(value) {
			askForPostcode = value;
		};
		
		hideShowPrices = function(show) {
			$('#content').toggleClass('bp-hide-prices', show);
		};
		/**
		 * prices for hotdeals do not follow the same rules as other prices.
		 * Hot deal prices will still be shown if no postcode is entered.
		 */
		hideShowHotDealPrices = function() {
			$('#bp-hotdeals').addClass('bp-hide-hotdeal-prices');
		};
		
		setShowPricesLater = function() {
			showPricesLater = true;
			Events.unbind(Events.eventList.buildandprice.router.ShowPricesLaterEvent,this);
		};
		
		return {
			
			initialise: function () {
				Events.bind(Events.eventList.buildandprice.router.BlockUIEvent, blockUI, this);
				Events.bind(Events.eventList.buildandprice.router.UnblockUIEvent, unblockUI, this);
				Events.bind(Events.eventList.buildandprice.router.HidePricesEvent, hideShowPrices, this);
				Events.bind(Events.eventList.buildandprice.router.HideHotDealPricesEvent, hideShowHotDealPrices, this);
				Events.bind(Events.eventList.buildandprice.router.AskForPostcodeEvent, setAskForPostcode, this);
				Events.bind(Events.eventList.buildandprice.router.ShowPricesLaterEvent, setShowPricesLater, this);
			},
		
			displayTitleView : function(model) {
				titleView = new views.PageTitleView({model : model});
				titleView.display();
				Views.Helper.translateTextOnView();
			},
			
			displayParentView : function(viewClass, model, parent) {
				this.destroy();
				currentView = new viewClass({model : model, collection : model, parent : parent});
				currentView.display();
				Views.Helper.translateTextOnView();
				if (askForPostcode === true) {
					//Util.log('firing RegionPostcodeChangeRequestEvent');
					Events.fireEvent(Events.eventList.buildandprice.view.RegionPostcodeChangeRequestEvent, true);
					askForPostcode = false;
				} else if (showPricesLater === true) {
					hideShowPrices(false);
				}
				return currentView;
			},
			
			displayChildView : function(viewClass, model, parent) {
				var view = new viewClass({model : model, collection : model, parent : parent});
				auxViews.push(view);
				view .display();
				Views.Helper.translateTextOnView();
				return view;
			},
			
			displayIndependantView: function(name, viewClass, model) {
				var view;
				if (independantViews[name] === undefined) {
					view = new viewClass({model : model, collection : model});
					view.display();
					Views.Helper.translateTextOnView();
					independantViews[name] = view;
					//console.log('new view added');
				} else {
					view = independantViews[name];
					view.display();
				}
				return view;
			},
			
			removeIndependantView: function(name) {
				if (independantViews[name] !== undefined) {
					independantViews[name].destroy();
					delete independantViews[name];
					//console.log('view removed');
				}
			},

			destroy: function() {
				if (currentView) {
					currentView.destroy();
					for (var i = 0 ; auxViews.length; i++) {
						//console.log('destroying aux view ' + i);
						auxViews.shift().destroy();
					}
					if (titleView != null) {
						titleView.destroy();
					}
					auxViews = new Array();
				}
			}
			
			
		};
		
		
	};
	
	views.Helper = {
		engineDialogStack : [],	
			
		openOverlay : function(e) {
			e.preventDefault();
			 var url = e.currentTarget.href;
			 $.publish('overlay.launch', {
					url: url,
					positionType: 'window',
					name: "bpt-package-whats-included"
			 });
		},
		
		createScrollPane : function($selector) {
			//console.log('applying scroller to ' + selector);
			return $selector.jScrollPane({
				showArrows: true,
				verticalTrackHeight: 100,
		        verticalGutter: 5
			}).css('padding-bottom', '10px');
		},
		
		updateScrollPane : function($pane) {
			var api = $pane.data('jsp');
			if (api) {
				api.reinitialise();
			}
		},
		
		injectContentOpenDialog: function(html) {
			var dialog = $('#bp-dialog');
			dialog.html(html);
			Views.Helper.translateTextOnView(dialog);
			this.openDialog('#bp-dialog');	
		},
		
		openDialog: function(selector) {
			$(selector).dialog({
				modal: true,
				width: 600,
                closeText : Constants.bpt.close,
				dialogClass: 'bp-dialog-container', 
				closeOnEscape: false,
				resizable: false
			});
			$(".ui-widget-overlay").css({"position": "fixed", "top": 0});
		},
		
		openEngineDialog : function(size) {
			$selector = $('.derivative-overlay');
			if ($selector.length > 0) {
				$selector.dialog({
					 position: { 
					    my: 'left top',
					    at: 'right top',
					    of:  $('.items .cur'),
					    offset:'5 -12',
					    collision : 'flip'
					  },
					  dialogClass: 'no-close',
					  closeText :'',
					  width : 355,
					  draggable : false,
					  closeOnEscape: true,
					  modal: false,
					  resizable: false, 
					  open : function() {
						  $selector.toggleClass('bp-hide-prices',$('#content').hasClass('bp-hide-prices'));
						  if (size > 3) {
							  $selector.find('.derivative-list').css('height' , '260px');
							  views.Helper.createScrollPane($selector.find('.derivative-list'));
						  }
						
						$('body').bind('click', views.Helper.closeEngineDialog);
					  }
				});
			}
		},
		
		closeEngineDialog : function(e,force) {
			var $selector = $('.derivative-overlay');
			if ($selector.length > 0) {
				if (force === true) { //if force flag is set
					views.Helper.destroyEngineDialog($selector);
				} else { //check whether the click event is outside of dialog 
						 //but not the derivative itself. If so close the dialog 
					var $target = $(e.target);
//					Util.log('$selector.dialog(\'isOpen\'): ' + $selector.dialog('isOpen'));
//					Util.log('!$target.is(\'.ui-dialog, a\'): ' + !$target.is('.ui-dialog, a'));
//					Util.log('!$target.closest(\'.ui-dialog\').length: ' + (!$target.closest('.ui-dialog').length));
//					Util.log('$target.parents(\'.bp-derivative-list-item\').length == 0: ' + ($target.parents('.bp-derivative-list-item').length == 0));
					
					if ($selector.dialog('isOpen') &&
						//!$target.is('.ui-dialog, a') &&
						!$target.closest('.ui-dialog').length &&
						$target.parents('.bp-derivative-list-item').length == 0) {
						views.Helper.destroyEngineDialog($selector);
					}
				}
			}
		},
		
		destroyEngineDialog : function($selector) {
			$('body').unbind('click', views.Helper.closeEngineDialog);
			$selector.dialog('destroy').remove();
		},
		
		displayGalleryCueMessage: function() {
			//Util.log('displayGalleryCueMessage');
			var $rotateDiv = $('#bp-rotate-msg');
			if ($rotateDiv.length > 0) {
				$rotateDiv.fadeIn('fast').delay(1500).fadeOut(1000, function() {
					$rotateDiv.addClass('hidden');
				});
			}
		},
		
		displayFeatureVisualisedMessage: function($selector, $otherSelector) {
			$otherSelector.stop(true, true).hide();
			$selector.stop(true,true).fadeIn('fast').delay(800).fadeOut('slow');
		}
	};
	
	views.TabAnimator = function($selector) {
		var navList = $selector.find("ul.ui-tabs-nav").first();
		navListChildren = navList.children();
		
		var moveIndicator = function(tabIdx, offset){
			
			var $current = navListChildren.eq(tabIdx);
			var left = $current.offset().left - $selector.offset().left,
				width = $current.width(),
				pos = ((left + width / 2) >> 0) - 152 + (offset ? offset : 0),
				stypos = pos + "px 34px";
			navList.animate({"background-position" : stypos}, "fast");
		};
		//hack...not sure why the initial moveIndicator call doesn't calculate currectly
		moveIndicator(0, 95);
		
		return {
			"moveIndicator": moveIndicator
		};
	};
	
	return views;

	/*****************************END OF VIEWS*****************************/
	
})(window, document, jQuery);
