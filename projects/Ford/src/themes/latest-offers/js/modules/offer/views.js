/**
 * @author Dawood Butt
 * @description views for offer module
 * @project Latest Offers
 */


//(function(window, document, $, undefined){$(document).on('ready', function() {
//$(function() {

//ND.LO.Views.TemplatesOffers = _.template($('#offers-area-template').html());

	ND.LO.Views.Offers = Backbone.View.extend({
		//el: $("#offersContainer"),
		//template: ND.LO.Views.TemplatesOffers,
		//className: "single-result",
		//collection: new ND.LO.Collections.Filters(), //Not needed
		events: {
			//"event css-selector" : "function"
			"click .price-filter" : "priceFilter",
			"click .default-filter" : "defaultFilter",
			"click .clear-filters" : "clearFilters"
		},
	
		initialize: function () {
			//this.template = _.template($('#offers-area-template').html());
			_.bindAll(this, "render", "addOne", "addAll");

			//"reset" (collection, options) — when the collection's entire contents have been replaced.
			this.collection.on("reset", this.render, this);

			//"add" (model, collection, options) — when a model is added to a collection.
			this.collection.on("add", this.addOne, this);
	
			Backbone.on('checkbox-click', this.filterOffer, this);
			
		},

		render: function () {
			//console.log("ND.LO.Views.Offers: render");
			//console.log(this.collection.length);
			
			if(this.collection.length > 0)
			{
				this.template = _.template($('#offers-area-template').html());
				$(this.el).html(this.template());	
				this.addAll();
				$(".default-filter").addClass("active");
			}
			else
			{
				this.template = _.template($('#error-area-template').html());
				$(this.el).html(this.template({errorMessage: ND.LO.Functions.getErrorMessages()['notFoundMessage']}));
				//$(".holder").html("Error Message will go here.");
			}
			
		},

		addAll: function () {
			//console.log("ND.LO.Views.Offers: addAll")
			this.collection.each(this.addOne);
		},

		addOne: function (model) {
			//console.log("ND.LO.Views.Offers: addOne")
			view = new ND.LO.Views.Offer({ model: model });
			$("ul.holder", this.el).append( view.render() );
			////////////////////////////////////////////
			//this.$("#offersContainer").append(view.render().el);
			////////////////////////////////////////////
		},

		reRender: function(offers) {
			//debugger;
			if(offers.length > 0)
			{
				this.template = _.template($('#offers-area-template').html());
				$(this.el).html(this.template());
				//debugger;
				$(".holder").html("");
				//$(this.el).empty();
				offers.each(function(offer){
					var view = new ND.LO.Views.Offer({
						model: offer,
						collection: this.collection
					});
					//$("ul.holder", this.el).append( view.render() );
					//$(".holder").append(view.render().el);
					$(".holder").append(view.render());
					$(".default-filter").addClass("active");
				});
			}
			else
			{
				this.template = _.template($('#error-area-template').html());
				$(this.el).html(this.template({errorMessage: ND.LO.Functions.getErrorMessages()['notFoundMessage']}));
				//$(".holder").html("Error Message will go here.");
			}
			return this;
			/*this.template = _.template($('#offers-area-template').html());
			//debugger;
			$(".holder").html("");
			//$(this.el).empty();
			offers.each(function(offer){
				var view = new ND.LO.Views.Offer({
					model: offer,
					collection: this.collection
				});
				//$("ul.holder", this.el).append( view.render() );
				//$(".holder").append(view.render().el);
				$(".holder").append(view.render());
			});
			return this;*/
		},
		filterOffer : function(event){
			//debugger;
			//console.log('filterOffer');
			this.reRender(this.collection.filter());
		},
		
//http://stackoverflow.com/questions/11106478/how-to-design-a-rest-search-with-backbone
		priceFilter : function(event){
			//http://stackoverflow.com/questions/11801660/sorting-backbone-collections
//https://developer.appcelerator.com/question/156009/how-to-sort-a-collection-particularly-descending
			//console.log('price-filter');
			this.reRender(this.collection.byPrice());
			////////////////////////
			$(".default-filter").removeClass('active');
			$(".price-filter").addClass("active");
			////////////////////////
		},
		defaultFilter : function(event){
			//console.log('default-filter');
			this.reRender(this.collection.byDefault());
			////////////////////////
			$(".price-filter").removeClass('active');
			$(".default-filter").addClass("active");
			////////////////////////
		},
		clearFilters : function(event){
			//console.log('clear-filters');
			Backbone.trigger('clear-filters-click', event);
		}
	});// End of View: Offers.

	///////////////////////////////////////////////
	//View: Offer. 						 	 	 //
	///////////////////////////////////////////////
	//ND.LO.Views.TemplatesOffer = _.template($('#offer-area-template').html());

	/////////////////////////////
	/*ND.LO.Views.testView = Backbone.View.extend({
	  template: ND.LO.Views.TemplatesOffer,
	  el: $("#offersContainer"),
	  render: function() {
		var dict = this.model.toJSON();
		var html = this.template(dict);
		$(this.el).append(html);
	  }
	});*/
	///////////////////////////////

	ND.LO.Views.Offer = Backbone.View.extend({
		tagName: "li",
		className: "single-result",
		//template: ND.LO.Views.TemplatesOffer,
		//events: { "click .delete": "test" },
	
		initialize: function () {
			this.template = _.template($('#offer-area-template').html());
			_.bindAll(this, 'render');
			this.model.on('destroy', this.destroyItem, this);
			this.model.on('remove', this.removeItem, this);
			//Backbone.trigger('checkbox-click', event);
		},

		render: function () {
			/*debugger;
			console.log('>:'+this.model.toJSON());
			return;*/
//debugger;
//debugger;
			return $(this.el).append(this.template(this.model.toJSON())) ;
			
			//this.$el.html(this.template(this.model.toJSON()));
			//this.$el.toggleClass('done', this.model.get('done'));
			//this.input = this.$('.edit');
			//return this;

			//$(this.el).html(this.template(this.model.toJSON()));
			//return this;
		}/*,

		removeItem: function (model) {
			console.log("Remove - " + model.get("Name"))
			this.remove();
		}*/
	});

//});})(window, document, jQuery);
//});