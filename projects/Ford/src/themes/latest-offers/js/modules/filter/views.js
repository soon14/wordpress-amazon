/**
 * @author Dawood Butt
 * @description views for filter module
 * @project Latest Offers dawood
 */

//(function(window, document, $, undefined){$(document).on('ready', function() {
	
	//ND.LO.Views.TemplatesFilters = _.template($('#filters-area-template').html());
	//$(function () { })
	
	ND.LO.Views.Filters = Backbone.View.extend({
		//el: $("#filterContainer"),
		//template: ND.LO.Views.TemplatesFilters,
		//template: _.template($('#filters-area-template').html()),
		//collection: new ND.LO.Collections.Filters(), //Not needed
		
		events: {
			//"event css-selector" : "function"
			'click .close-update' : 'closeUpdateClickHandler'
		},
		
	
		initialize: function (options) {
			//debugger;
			//console.log("ND.LO.Views.Filters: initialize");
			//this.el = $("#filterContainer");
			this.template =  _.template($('#filters-area-template').html());
			_.bindAll(this, "render", "addOne", "addAll");
	
			//"reset" (collection, options) — when the collection's entire contents have been replaced.
			this.collection.on("reset", this.render, this);
	
			//"add" (model, collection, options) — when a model is added to a collection.
			this.collection.on("add", this.addOne, this);
			//ND.LO.Events = options.ND.LO.Events;
			this.on('render', this.afterRender, this);
		},
	
		render: function () {
			//console.log("ND.LO.Views.Filters: render");
			//console.log(this.collection.length);
			$(this.el).html(this.template());
			this.addAll();
			this.trigger('render');
		},
	
		addAll: function () {
			//console.log("ND.LO.Views.Filters: addAll");
			this.collection.each(this.addOne);
		},
	
		addOne: function (model) {
			//console.log("ND.LO.Views.Filters: addOne")
			view = new ND.LO.Views.Filter({ model: model });
			$("form", this.el).append(view.render());
			
		},
		closeUpdateClickHandler : function(event){
			//debugger;
			$(".search-filter").hide();
			$(".results-area").show();
		},
		
		///////////////////////////////////////////////
		//Function: customCheckbox. 				 //
		///////////////////////////////////////////////
		customCheckbox:  function (checkboxName) {
			var checkBox = $('input[name="'+ checkboxName +'"]');
			//  alert(checkBox);
			  $(checkBox).each(function(){
				 $(this).wrap( "<span class='custom-checkbox'></span>" );
				 if($(this).is(':checked')){
					$(this).parent().addClass("selected");
				 }
			  });
			  /*$(checkBox).click(function(){
				  $(this).parent().toggleClass("selected");
			  });*/
		},
		///////////////////////////////////////////////
		//Function: embeddFilter. 					 //
		///////////////////////////////////////////////
		embeddFilter:  function (checkboxName) {
			ND.LO.Variables.filterArray = $('#filter-array').embeddedData();
			//alert(typeof(ND.LO.Variables.filterArray) == 'undefined');return;
		
			if(JSON.stringify(ND.LO.Variables.filterArray) != "{}")
			{
				if ($("#filter-area-template").length != 0)
				{
					var filterAreaMarkup = $("#filter-area-template").html();
					$.template("filterAreaTemplate",filterAreaMarkup);
					$.tmpl("filterAreaTemplate",ND.LO.Variables.filterArray).appendTo(".filter-area");
					//ND.LO.createFilter();
				}
			}
			else
			{
				//ND.LO.injectFilter();
			}
		},
		
		///////////////////////////////////////////////
		//Function: createPriceSlider. 				 //
		///////////////////////////////////////////////
		createPriceSlider:  function (checkboxName) {
			//jQuery.parseJSON( JSON.stringify(data) )
			/*$.getJSON( "rest/filters.js", function( data ) {
			  $.each( data, function( key, val ) {
				alert('KEY:'+key+', VALUE:'+val);
			  });
			});*/
			
			/*$.getJSON("rest/filters.js", function(data) {
				ND.LO.Variables.filterArray = data;
				for (var i in ND.LO.Variables.filterArray)
				{
					if ( (ND.LO.Variables.filterArray[i]['type'] == 'range') && ( ND.LO.Variables.filterArray[i]['title'] == 'Price') )
					{
						//ND.LO.Variables.filterArray[i].id;
						slideid = "#slider" + ND.LO.Variables.filterArray[i]['id'];
						ND.LO.minRange = parseInt(ND.LO.Variables.filterArray[i]['answers'][0].value);
						ND.LO.maxRange = parseInt(ND.LO.Variables.filterArray[i]['answers'][1].value);
			debugger;
						$( slideid ).slider({
								  range: true,
								  min: ND.LO.minRange,
								  max: ND.LO.maxRange,
								  values: [ ND.LO.minRange, ND.LO.maxRange ],
								  step: 1000,
								  slide: function( event, ui ) {
									  if ((ui.values[1] - ui.values[0]) <= 4000  ) 
									  {
											return false;
									  }
			
									$( "#price" ).val( "$" + ND.LO.Functions.addCommas(ui.values[ 0 ]) + " - $" + ND.LO.Functions.addCommas(ui.values[ 1 ]) );
								  },
								  stop: function(event, ui) {
										//reset.
									  }
							});
							$( "#price" ).val( "$" + ND.LO.Functions.addCommas($(  - ).slider( "values", 0 )) +" - $" + ND.LO.Functions.addCommas($( slideid ).slider( "values", 1 ) ));
					}
				}
			});*/
		
			//debugger;
			/*_.each(col.models, function (mod) {
				// Call the renderPostView method
				mod.author.toJSON()
				alert(mod.toJSON());
			});*/
			//debugger;
			//ND.LO.Variables.minRange = parseInt(ND.LO.Functions.getPriceJSON()['Min'].replace(ND.LO.Constants.CURRENCY_SYMBOL,''));
			//ND.LO.Variables.maxRange = parseInt(ND.LO.Functions.getPriceJSON()['Max'].replace(ND.LO.Constants.CURRENCY_SYMBOL,''));
			
			ND.LO.Variables.minRange = Number(ND.LO.Functions.getPriceJSON()['Min'].replace(/[^0-9\.]+/g,""));
			ND.LO.Variables.maxRange = Number(ND.LO.Functions.getPriceJSON()['Max'].replace(/[^0-9\.]+/g,""));

			//var cur = ND.LO.Functions.getPriceJSON()['Min'].replace(ND.LO.Functions.getPriceJSON()['Min'].replace(/[^0-9\.]+/g,""),'').trim();
			var cur = $.trim( ND.LO.Functions.getPriceJSON()['Min'].replace(ND.LO.Functions.getPriceJSON()['Min'].replace(/[^0-9\.]+/g,""),'') );
			
			if ( ND.LO.Constants.CURRENCY_SYMBOL != cur && cur != "")
			{
				ND.LO.Constants.CURRENCY_SYMBOL = cur;
			}
			//var mee = this;
			//debugger;
			$( "#range-slider" ).slider({
					range:true,
					min: ND.LO.Variables.minRange,
					max: ND.LO.Variables.maxRange,
					values: [ ND.LO.Variables.minRange, ND.LO.Variables.maxRange ],
					step: 1000,
					slide: function( event, ui ) {
						if ((ui.values[1] - ui.values[0]) <= 4000  )
						  {
							return false;
						  }
						$( "#price" ).val( ND.LO.Constants.CURRENCY_SYMBOL+ "" + ND.LO.Functions.addCommas(ui.values[ 0 ]) + " - "+ND.LO.Constants.CURRENCY_SYMBOL+""+ ND.LO.Functions.addCommas(ui.values[ 1 ]) );

					},
					  stop: function(event, ui) {
						  if (ND.LO.Variables.urlFilterType != "vehicle"){
						  	$('.clear-models').trigger( "click" );
						  }
							//reset.
							ND.LO.Variables.FilteringAnswers.Price[0] = ui.values[ 0 ];
							 ND.LO.Variables.FilteringAnswers.Price[1] = ui.values[ 1 ];
							 //Backbone.trigger('checkbox-click', event);
							 ////////////////////////
							  if (window.sessionStorage)
							  {
								//var a = [];
								//a.push(JSON.parse(localStorage.getItem('session')));
								//localStorage.setItem('session', JSON.stringify(a));
								sessionStorage.setItem("price", [ui.values[ 0 ], ui.values[ 1 ]]);
							  }
							  ////////////////////////
							  //Omniture
							  var mediaName = "price";
							  var omTitle = "hot deals:latest offers:advanced search";
							  var  data ={
									'link':true,
									'type':'lnk_o',
			
									////////++c5++/////////
									//onclicks:content
									'onclicks':'filter',
									'content':mediaName, //c56,v56
									////////--c5--/////////
			
									////////++pev2++/////////
									//title:nameplate
									'title':omTitle
									//'nameplate':_da.nameplate, //c16, v16
									////////--pev2--/////////
			
									//'pname':_da.pname, //pageName, c11, v11, c19
									//'hier1':h1, //h1
									//'events':omEvents
							 };
							 ND.LO.Functions.trackLink(data);
							 ////////////////////////
							 //debugger;
							 //mee.toggleShowAllOffers();
							 //debugger;
							 ND.LO.Functions.toggleShowAllOffers();
							 Backbone.trigger('checkbox-click', event);
						  }
				});
				$( "#price" ).val( ND.LO.Constants.CURRENCY_SYMBOL+""+ ND.LO.Functions.addCommas($( "#range-slider" ).slider( "values", 0 )) + " - "+ND.LO.Constants.CURRENCY_SYMBOL+""+ ND.LO.Functions.addCommas( $( "#range-slider" ).slider( "values", 1 )));
				
				$( "#range-slider" ).draggable();
		},
		afterRender: function () {
			
			/*ND.LO.Variables.FilteringAnswers = {
				Offer: [],
				BodyType: [],
				FuelType: [],
				Towing: [],
				Price: [10000, 70000],
				Models: []
			};*/
			var filters = ND.LO.Functions.getFilterJSON();
			for (var filter in filters)
			{
				var id = filters[filter].label.split(' ').join('').split('/').join('-').split('&').join('-').toLowerCase();
				if(filters[filter].type == 'HotDeals')
				{
					this.customCheckbox("offers[]");
				}
				else if(filters[filter].type == 'price')
				{
					ND.LO.Variables.minRange = Number(filters[filter].Min.replace(/[^0-9\.]+/g,""));
					ND.LO.Variables.maxRange = Number(filters[filter].Max.replace(/[^0-9\.]+/g,""));
					ND.LO.Variables.FilteringAnswers.Price=[ND.LO.Variables.minRange,ND.LO.Variables.maxRange];//ND.LO.Variables.FilteringAnswers[id] = [ND.LO.Variables.minRange, ND.LO.Variables.maxRange]
				}
				else if(filters[filter].type == 'Models')
				{
					this.customCheckbox("models[]");
				}
				else
				{
					this.customCheckbox(""+id+"[]");
//
					//ND.LO.Variables.FilteringAnswers[id] = [];
				}
				//debugger;
				//if(filter == filters.length-1)
//				{
//					
//				}
//				else
//				{
//					
//				}
				
				//console.log('['+filters[filter].label.split(' ').join('').split('/').join('-').split('&').join('-').toLowerCase()+']');
			}
			
			//alert('re');
			//|//////////////////////////////////////////////|
			//|//////////////////////////////////////////////|
			//$('.flexslider').flexslider();
	
			//this.embeddFilter();
			this.createPriceSlider(this.collection);
			
			/*$( "#dialog" ).dialog({
				autoOpen: false,
				resizable: false
			});
	
			$( ".change-postcode" ).click(function() {
				$( "#dialog" ).dialog( "open" );
			});*/
	
			this.customCheckbox("alloffers[]");
			/*this.customCheckbox("offers[]");
			this.customCheckbox("bodytype[]");
			this.customCheckbox("fueltype[]");
			this.customCheckbox("towing[]");
			this.customCheckbox("models[]");*/
			
			//|//////////////////////////////////////////////|
			//|//////////////////////////////////////////////|
	
			$(".menu-button").on("click", function(){
				$(".menu-button").toggleClass("bg-white", "fast");
				$("#nav").toggleClass("show", "fast");
			  });
		
			$(".filter-options").on("click", function(){
				$(".search-filter").show();
				$(".results-area").hide();
			});

			$(".disclaimer").on("click", function(){
				//console.log('Landing Page - Disclaimer clicked.');
				////////////////////////
				//Omniture
				var _da = window._da || {};
				if (typeof _da.pname !== 'undefined')
				{
					var omTitle = "hot deals:latest offers:disclaimer";
					var mediaName = "disclaimer";
					var  data ={
							'link':true,
							'type':'lnk_o',

							////////++c5++/////////
							//onclicks:content
							'onclicks':'latest offers',
							'content':mediaName, //c56,v56
							////////--c5--/////////
	
							////////++pev2++/////////
							//title:nameplate
							'title':omTitle
							//'nameplate':_da.nameplate, //c16, v16
							////////--pev2--/////////
	
							//'pname':_da.pname, //pageName, c11, v11, c19
							//'hier1':h1, //h1
							//'events':omEvents
					};
					//s.eVar1
					//s.eVar11
					//s.eVar14
					//s.eVar15
					//s.eVar16
					//s.eVar54
					//debugger;
					ND.LO.Functions.trackLink(data);
				}
				////////////////////////
			});

			ND.accordionMod.init();
			$('.flexslider').flexslider();
			$(document).foundation();
			this.loadSessionStorage();
			ND.LO.Functions.trackOmniturePage();
		},
		loadSessionStorage: function () {
			if (window.sessionStorage)
			{
				if (sessionStorage.length == 0)
				{
					$("#alloffers").prop("checked", true);
					$("#alloffers").parent().addClass('selected');
					$("#alloffers").attr("disabled", true);
				}
				else
				{
					for(var i = 0; i < sessionStorage.length; i++)
					{
						var name = sessionStorage.key(i);
						var value = sessionStorage.getItem(name);
						//alert('Name:'+name+', Value:'+value);
	
						if (name == "offers")
						{
							ND.LO.Variables.FilteringAnswers.Offer = value.split(",");
							$('input[name=offers\\[\\]]').each(function() {
								var val = this.value;
								if (_.some(ND.LO.Variables.FilteringAnswers.Offer, function(a) {return a == val;}))
								{
									this.checked = true;
									$(this).parent().addClass('selected');	
								}
							});
						}
						else if (name == "bodytype")
						{
							ND.LO.Variables.FilteringAnswers.BodyType = value.split(",");
							$('input[name=bodytype\\[\\]]').each(function() {
								var val = this.value;
								if (_.some(ND.LO.Variables.FilteringAnswers.BodyType, function(a) {return a == val;}))
								{
									this.checked = true;
									$(this).parent().addClass('selected');	
								}
							});
						}
						else if (name == "fueltype")
						{
							ND.LO.Variables.FilteringAnswers.FuelType = value.split(",");
							$('input[name=fueltype\\[\\]]').each(function() {
								var val = this.value;
								if (_.some(ND.LO.Variables.FilteringAnswers.FuelType, function(a) {return a == val;}))
								{
									this.checked = true;
									$(this).parent().addClass('selected');
								}
							});
						}
						else if (name == "towing")
						{
							ND.LO.Variables.FilteringAnswers.Towing = value.split(",");
							$('input[name=towing\\[\\]]').each(function() {
								var val = this.value;
								if (_.some(ND.LO.Variables.FilteringAnswers.Towing, function(a) {return a == val;}))
								{
									this.checked = true;
									$(this).parent().addClass('selected');	
								}
							});
						}
						else if (name == "price")
						{
							ND.LO.Variables.FilteringAnswers.Price = value.split(",");
							$('#range-slider').slider("values",[ND.LO.Variables.FilteringAnswers.Price[0], ND.LO.Variables.FilteringAnswers.Price[1]]);
							$( "#price" ).val( ND.LO.Constants.CURRENCY_SYMBOL + "" + ND.LO.Functions.addCommas(ND.LO.Variables.FilteringAnswers.Price[0]) + " - "+ND.LO.Constants.CURRENCY_SYMBOL +""+ ND.LO.Functions.addCommas(ND.LO.Variables.FilteringAnswers.Price[1]) );
						}
						else if (name == "models")
						{
							//URL Filter check
							if (ND.LO.Variables.urlFilterType != "vehicle")
							{
								ND.LO.Variables.FilteringAnswers.Models = value.split(",");
								$('input[name=models\\[\\]]').each(function() {
									var val = this.value;
									if (_.some(ND.LO.Variables.FilteringAnswers.Models, function(a) {return a == val;}))
									{
										this.checked = true;
										$(this).parent().addClass('selected');	
									}
								});
							}//End of URL Filter check.
						}
					}
				}
				//////////////////////////
				//debugger;
				Backbone.trigger('checkbox-click', window.sessionStorage);
			}
			else
			{
				$("#alloffers").prop("checked", true);
				$("#alloffers").parent().addClass('selected');
				$("#alloffers").attr("disabled", true);
			}
			/////////////////////////
			if (ND.LO.Variables.urlFilterType == "vehicle")
			{
				//$('.clear-models').attr("disabled", true);
				$('input[name=models\\[\\]]').each(function() {
					//debugger;
					if (ND.LO.Variables.urlFilterID != 0 && this.value == ND.LO.Variables.urlFilterID)
					{
						this.checked = true;
						$(this).parent().addClass('selected');
						////$(this).attr("disabled", true);
					}
					else
					{
						//this.checked = false;
						//$('#'+this.id).parent().removeClass('selected');
						////$(this).attr("disabled", true);
					}
				});							
			}
			////////////////////////
		}
	});// End of View: Filters.
	
	///////////////////////////////////////////////
	//View: Filter. 						 	 //
	///////////////////////////////////////////////
	//ND.LO.Views.TemplatesFilter = _.template($('#filter-area-template').html());
	ND.LO.Views.Filter = Backbone.View.extend({
		tagName: "section",
		//template: ND.LO.Views.TemplatesFilter,
		
		events: {
			//"event css-selector" : "function"
			'click .clear-models' : 'clearModelsClickHandler',
			'click #clearAllOffers' : 'clearOffersClickHandler',
			 'click [type="checkbox"]': 'checkboxClickHandler'
		},
	
		initialize: function () {
			//console.log("ND.LO.Views.Filter: initialize");
			this.template = _.template($('#filter-area-template').html());
			_.bindAll(this, 'render');
			this.model.on('destroy', this.destroyItem, this);
			this.model.on('remove', this.removeItem, this);
			
			 // bind to API event
        	//this.on('apiEvent', this.callback);
			//dawood
			//showAllOffersClicked
			Backbone.on('clear-filters-click', this.showAllOffersClicked, this);
		},
	
		render: function () {
			/*debugger;
			console.log('>:'+this.model.toJSON());
			return;*/
			
			//var data = this.model.toJSON();
			//var allFilters = _.clone(data);
			//var allFilter = _.flatten(_.pluck(allFilters, 'filters'));
			//var allItems = _.flatten(_.pluck(allLayers, 'items'));
//debugger;
			$(this.el).append(this.template(this.model.toJSON()));
			return $(this.el);
	
			//$(this.el).html(this.template(this.model.toJSON()));
			//return this;
		},
		clearModelsClickHandler : function(event){
			if (ND.LO.Variables.urlFilterType != "vehicle")
			{
				this.clearModels(event);
			}
			else{
				ND.LO.Functions.goToLandingPage();
			}
		},
		clearModels:function(event){
			if (ND.LO.Variables.urlFilterType != "vehicle"){
				$('input[name=models\\[\\]]').each(function() { //loop through each checkbox
					this.checked = false; //deselect all checkboxes with input[name=offers[]]
					//$('#'+this.id).parent().addClass('selected');
					$(this).parent().removeClass('selected');
				});
				ND.LO.Variables.FilteringAnswers.Models = [];
				if (window.sessionStorage)
				{
					sessionStorage.removeItem("models");
				}
				//debugger;
				ND.LO.Functions.toggleShowAllOffers();
				Backbone.trigger('checkbox-click', event);
			}
		},
		showAllOffersClicked : function(){
			$("#alloffers").prop("checked", false);
			$("#alloffers").parent().removeClass('selected');
			$("#alloffers").attr("disabled", false);
			$('#alloffers').trigger( "click" );
		},
		/*clearAllOffers : function(){
			$('input[name=offers\\[\\]]').each(function() { //loop through each checkbox
				this.checked = true;  //select all checkboxes with input[name=offers[]]
				$('#'+this.id).parent().addClass('selected');
			});
			$('input[name=bodytype\\[\\]]').each(function() { //loop through each checkbox
				this.checked = true;  //select all checkboxes with input[name=offers[]]
				$('#'+this.id).parent().addClass('selected');
			});
			$('input[name=fueltype\\[\\]]').each(function() { //loop through each checkbox
				this.checked = true;  //select all checkboxes with input[name=offers[]]
				$('#'+this.id).parent().addClass('selected');
			});
			$('input[name=towing\\[\\]]').each(function() { //loop through each checkbox
				this.checked = true;  //select all checkboxes with input[name=offers[]]
				$('#'+this.id).parent().addClass('selected');
			});
			$('input[name=models\\[\\]]').each(function() { //loop through each checkbox
				this.checked = true;  //select all checkboxes with input[name=offers[]]
				$('#'+this.id).parent().addClass('selected');
			});
		},*/
		clearSessionStorage: function () {
			if (window.sessionStorage)
			{
				//sessionStorage.removeItem("price");
				//sessionStorage.removeItem("offers");
				//sessionStorage.removeItem("bodytype");
				//sessionStorage.removeItem("towing");
				//sessionStorage.removeItem("models");
				sessionStorage.clear();
			}
		},
		clearOffers : function(){
			////////////////////////
			//no model section will be filter here.
			var filters = ND.LO.Functions.getFilterJSON();
			for (var filter in filters)
			{
				var id = filters[filter].label.split(' ').join('').split('/').join('-').split('&').join('-').toLowerCase();
				if(filters[filter].type == 'HotDeals')
				{
					$('input[name=offers\\[\\]]').each(function() { //loop through each checkbox
						this.checked = false; //deselect all checkboxes with input[name=offers[]]
						$(this).parent().removeClass('selected');
					});
				}
				else if(filters[filter].type == 'price')
				{
					//ND.LO.Variables.FilteringAnswers[id] = [ND.LO.Variables.minRange, ND.LO.Variables.maxRange];
				}
				else if(filters[filter].type == 'Models')
				{}
				else
				{
					$('input[name='+id+'\\[\\]]').each(function() { //loop through each checkbox
						this.checked = false; //deselect all checkboxes with input[name=offers[]]
						$(this).parent().removeClass('selected');
					});
					//ND.LO.Variables.FilteringAnswers[id] = [];
				}
			}
			
			/*$('input[name=offers\\[\\]]').each(function() { //loop through each checkbox
				this.checked = false; //deselect all checkboxes with input[name=offers[]]
				$('#'+this.id).parent().removeClass('selected');
			});
			$('input[name=bodytype\\[\\]]').each(function() { //loop through each checkbox
				this.checked = false; //deselect all checkboxes with input[name=offers[]]
				$('#'+this.id).parent().removeClass('selected');
			});
			$('input[name=fueltype\\[\\]]').each(function() { //loop through each checkbox
				this.checked = false; //deselect all checkboxes with input[name=offers[]]
				$('#'+this.id).parent().removeClass('selected');
			});
			$('input[name=towing\\[\\]]').each(function() { //loop through each checkbox
				this.checked = false; //deselect all checkboxes with input[name=offers[]]
				$('#'+this.id).parent().removeClass('selected');
			});*/

			$('#range-slider').slider("values",[ND.LO.Variables.minRange, ND.LO.Variables.maxRange]);
			$( "#price" ).val( ND.LO.Constants.CURRENCY_SYMBOL+"" + ND.LO.Functions.addCommas(ND.LO.Variables.minRange) + " - "+ ND.LO.Constants.CURRENCY_SYMBOL+""+ ND.LO.Functions.addCommas(ND.LO.Variables.maxRange) );
			ND.LO.Variables.FilteringAnswers.Offer = [];
			ND.LO.Variables.FilteringAnswers.BodyType = [];
			ND.LO.Variables.FilteringAnswers.FuelType = [];
			ND.LO.Variables.FilteringAnswers.Towing = [];
			ND.LO.Variables.FilteringAnswers.Price = [ND.LO.Variables.minRange, ND.LO.Variables.maxRange];
			sessionStorage.removeItem("offers");
			sessionStorage.removeItem("bodytype");
			sessionStorage.removeItem("fueltype");
			sessionStorage.removeItem("towing");
			sessionStorage.removeItem("price");
			////////////////////////////////////////////
			////////////////////////////////////////////
		},
		setAllOffers : function(){
			
			var filters = ND.LO.Functions.getFilterJSON();
			for (var filter in filters)
			{
				var id = filters[filter].label.split(' ').join('').split('/').join('-').split('&').join('-').toLowerCase();
				if(filters[filter].type == 'HotDeals')
				{
					$('input[name=offers\\[\\]]').each(function() { //loop through each checkbox
						this.checked = false; //deselect all checkboxes with input[name=offers[]]
						$(this).parent().removeClass('selected');
					});
				}
				else if(filters[filter].type == 'price')
				{
					//ND.LO.Variables.FilteringAnswers[id] = [ND.LO.Variables.minRange, ND.LO.Variables.maxRange];
				}
				else if(filters[filter].type == 'Models')
				{
					/*$('input[name=models\\[\\]]').each(function() { //loop through each checkbox
						this.checked = false; //deselect all checkboxes with input[name=offers[]]
						$('#'+this.id).parent().removeClass('selected');
					});*/
				}
				else
				{
					$('input[name='+id+'\\[\\]]').each(function() { //loop through each checkbox
						this.checked = false; //deselect all checkboxes with input[name=offers[]]
						$(this).parent().removeClass('selected');
					});
					//ND.LO.Variables.FilteringAnswers[id] = [];
				}
			}
			
			/*$('input[name=offers\\[\\]]').each(function() { //loop through each checkbox
				this.checked = false; //deselect all checkboxes with input[name=offers[]]
				$('#'+this.id).parent().removeClass('selected');
			});
			$('input[name=bodytype\\[\\]]').each(function() { //loop through each checkbox
				this.checked = false; //deselect all checkboxes with input[name=offers[]]
				$('#'+this.id).parent().removeClass('selected');
			});
			$('input[name=fueltype\\[\\]]').each(function() { //loop through each checkbox
				this.checked = false; //deselect all checkboxes with input[name=offers[]]
				$('#'+this.id).parent().removeClass('selected');
			});
			$('input[name=towing\\[\\]]').each(function() { //loop through each checkbox
				this.checked = false; //deselect all checkboxes with input[name=offers[]]
				$('#'+this.id).parent().removeClass('selected');
			});*/

			$('#range-slider').slider("values",[ND.LO.Variables.minRange, ND.LO.Variables.maxRange]);
			$( "#price" ).val( ND.LO.Constants.CURRENCY_SYMBOL+"" + ND.LO.Functions.addCommas(ND.LO.Variables.minRange) + " - "+ ND.LO.Constants.CURRENCY_SYMBOL+""+ ND.LO.Functions.addCommas(ND.LO.Variables.maxRange) );
			if (ND.LO.Variables.urlFilterType != "vehicle")
			{
				$('input[name=models\\[\\]]').each(function() { //loop through each checkbox
					this.checked = false; //deselect all checkboxes with input[name=offers[]]
					$(this).parent().removeClass('selected');
				});
				ND.LO.Variables.FilteringAnswers.BodyType = [];
			}
			ND.LO.Variables.FilteringAnswers.Offer = [];
			ND.LO.Variables.FilteringAnswers.BodyType = [];
			ND.LO.Variables.FilteringAnswers.FuelType = [];
			ND.LO.Variables.FilteringAnswers.Towing = [];
			ND.LO.Variables.FilteringAnswers.Price = [ND.LO.Variables.minRange, ND.LO.Variables.maxRange];
			ND.LO.Variables.FilteringAnswers.Models = [];
			this.clearSessionStorage();
		},

		clearOffersClickHandler : function(event){
			
			/*var isShowAll = true;
			$('input[name=models\\[\\]]').each(function() { //loop through each checkbox
			//debugger;
				if ($('#'+this.id).parent().hasClass("selected"))
				{
					isShowAll = false;
					return false;
				}
			});

			if (isShowAll)
			{
				$("#alloffers").prop("checked", true);
				$("#alloffers").parent().addClass('selected');
				$("#alloffers").attr("disabled", true);
			}*/

			//this.clearAllOffers();
			this.clearOffers();
			ND.LO.Functions.toggleShowAllOffers();
			Backbone.trigger('checkbox-click', event);
		},

		checkboxClickHandler : function(event){

			if(ND.LO.Variables.urlFilterType === "vehicle" && event.currentTarget.name === ND.LO.Constants.MODELS_FILTER_CHECKBOX_NAME+"[]"){
				ND.LO.Functions.goToLandingPage();
				return;
			}

			//debugger;
			//console.log("events handler for " + this.el.outerHTML);
        	//this.trigger('apiEvent', event.type); 
			var $checkbox = $(event.currentTarget);

			if ( !(event.currentTarget.name == "alloffers[]" && $checkbox.parent().hasClass("selected")) ){
				$checkbox.parent().toggleClass("selected");
			}

			var isChecked = $checkbox.parent().hasClass("selected");
			
			//var checkboxID = event.currentTarget.id;
			var checkboxName = event.currentTarget.name;
			
			//event.currentTarget.id="alloffers"
			//event.currentTarget.name="alloffers[]"
			
			//input[name="'+ checkboxName +'"]
			/*	
			*/

			var mediaName = "";

			if ( event.currentTarget.name != "alloffers[]" && isChecked ){
				$("#alloffers").prop("checked", false);
				$("#alloffers").parent().removeClass('selected');
				$("#alloffers").attr("disabled", false);
			}else{
				var flag = 0;
				/*var arrCheckbox = document.getElementsByName(checkboxName);
			   for (var i = 0; i < arrCheckbox.length; i++) {
				   if ( arrCheckbox[i].checked == true)
				   {flag=1;}
			   }*/
				/*$('input[name=offers\\[\\]]').each(function(){
					if(!this.checked)
					flag=1;
				});
				if(flag == 0)
				{ 
					$("#alloffers").prop("checked", true);
					$("#alloffers").parent().addClass("selected");
				}*/
				// Willl implement later.
			}

			//event.currentTarget.id=="alloffers" ||
			//alert(event.currentTarget.name);
			if (event.currentTarget.name == "alloffers[]")
			  {
				  //debugger;
				  this.setAllOffers();
				  //alert('show All Offers.');
				  if(!isChecked) { // check select status
					
					}else{
						//this.clearAllOffers();
					}
			  }
	
			  //event.currentTarget.id="alloffers"
			  //event.currentTarget.name="offers[]"
			  
			  else if (event.currentTarget.name == ""+ND.LO.Constants.OFFERS_FILTER_CHECKBOX_NAME+"[]")
			  {	
			  	  //$('.clear-models').trigger( "click" );
			  	  this.clearModels(event);
				  ND.LO.Variables.FilteringAnswers.Offer = [];
				  $('input[name='+event.currentTarget.name.split('[').join('\\[').split(']').join('\\]')+']').each(function() { 
						if ( this.checked || $(this).parent().hasClass("selected"))
						{
							ND.LO.Variables.FilteringAnswers.Offer.push($(this).val());
							////////////////////////
							  if (window.sessionStorage)
							  {
							  	//var a = [];
								//a.push(JSON.parse(localStorage.getItem('session')));
								//localStorage.setItem('session', JSON.stringify(a));
								sessionStorage.setItem("offers", ND.LO.Variables.FilteringAnswers.Offer);
							  }
							  ////////////////////////
							  mediaName = "offer";
						}
					});
			  }
			  else if (event.currentTarget.name == ""+ND.LO.Constants.BODY_FILTER_CHECKBOX_NAME+"[]")
			  {
				  //$('.clear-models').trigger( "click" );
				  this.clearModels(event);
				  ND.LO.Variables.FilteringAnswers.BodyType = [];
				  $('input[name='+event.currentTarget.name.split('[').join('\\[').split(']').join('\\]')+']').each(function() { 
						if ( this.checked || $(this).parent().hasClass("selected"))
						{
							ND.LO.Variables.FilteringAnswers.BodyType.push($(this).val());
							////////////////////////
							  if (window.sessionStorage)
							  {
							  	//var a = [];
								//a.push(JSON.parse(localStorage.getItem('session')));
								//localStorage.setItem('session', JSON.stringify(a));
								sessionStorage.setItem("bodytype", ND.LO.Variables.FilteringAnswers.BodyType);
							  }
							  ////////////////////////
							  mediaName = "body";
						}
					});

			  }
			  else if (event.currentTarget.name == ""+ND.LO.Constants.FUEL_FILTER_CHECKBOX_NAME+"[]")
			  {
				  //$('.clear-models').trigger( "click" );
				  this.clearModels(event);
				  ND.LO.Variables.FilteringAnswers.FuelType = [];
				  $('input[name='+event.currentTarget.name.split('[').join('\\[').split(']').join('\\]')+']').each(function() { 
						if ( this.checked || $(this).parent().hasClass("selected"))
						{
							ND.LO.Variables.FilteringAnswers.FuelType.push($(this).val());
							////////////////////////
							  if (window.sessionStorage)
							  {
							  	//var a = [];
								//a.push(JSON.parse(localStorage.getItem('session')));
								//localStorage.setItem('session', JSON.stringify(a));
								sessionStorage.setItem("fueltype", ND.LO.Variables.FilteringAnswers.FuelType);
							  }
							  ////////////////////////
							  mediaName = "fuel";
						}
					});
				
			  }
			  else if (event.currentTarget.name == ""+ND.LO.Constants.TOWING_FILTER_CHECKBOX_NAME+"[]")
			  {
				  //$('.clear-models').trigger( "click" );
				  this.clearModels(event);
				  ND.LO.Variables.FilteringAnswers.Towing = [];
				  $('input[name='+event.currentTarget.name.split('[').join('\\[').split(']').join('\\]')+']').each(function() { 
						if ( this.checked || $(this).parent().hasClass("selected"))
						{
							ND.LO.Variables.FilteringAnswers.Towing.push($(this).val());
							////////////////////////
							  if (window.sessionStorage)
							  {
							  	//var a = [];
								//a.push(JSON.parse(localStorage.getItem('session')));
								//localStorage.setItem('session', JSON.stringify(a));
								sessionStorage.setItem("towing", ND.LO.Variables.FilteringAnswers.Towing);
							  }
							  ////////////////////////
							   mediaName = "towing";
						}
					});
			  }
			  else if (event.currentTarget.name == ""+ND.LO.Constants.MODELS_FILTER_CHECKBOX_NAME+"[]")
			  {
				//URL Filter check
				$('#clearAllOffers').trigger( "click" );
				if (ND.LO.Variables.urlFilterType != "vehicle")
				{
					ND.LO.Variables.FilteringAnswers.Models = [];
				  	$('input[name='+event.currentTarget.name.split('[').join('\\[').split(']').join('\\]')+']').each(function() {
						if ( this.checked || $(this).parent().hasClass("selected"))
						{
							ND.LO.Variables.FilteringAnswers.Models.push($(this).val());
							////////////////////////
							  if (window.sessionStorage)
							  {
							  	//var a = [];
								//a.push(JSON.parse(localStorage.getItem('session')));
								//localStorage.setItem('session', JSON.stringify(a));
								sessionStorage.setItem("models", ND.LO.Variables.FilteringAnswers.Models);
							  }
							  ////////////////////////
							  mediaName = "model";
						}
					});
				}// End of //URL Filter check.
			  }
			   ////////////////////////
			  //Omniture
			  //debugger;
			  if (typeof mediaName !== 'undefined' && $.trim(mediaName) !== "")
			  {
				  var omTitle = "hot deals:latest offers:advanced search";
				  var  data ={
						'link':true,
						'type':'lnk_o',

						////////++c5++/////////
						//onclicks:content
        			  	'onclicks':'filter',
						'content':mediaName, //c56,v56
						////////--c5--/////////

						////////++pev2++/////////
						//title:nameplate
        			  	'title':omTitle
        			  	//'nameplate':_da.nameplate, //c16, v16
						////////--pev2--/////////

        			  	//'pname':_da.pname, //pageName, c11, v11, c19
        			  	//'hier1':h1, //h1
						//'events':omEvents
				 };
				 //s.pev2 = _da.pname+':advanced search';
				 ND.LO.Functions.trackLink(data);
				 ND.LO.Variables.isFirst = true;
				 ////////////////////////
			  }
			  ND.LO.Functions.toggleShowAllOffers();
			 Backbone.trigger('checkbox-click', event);
			return;
			//var newName = prompt("Please enter the new name", this.model.get('name'));
			//if (!newName)return; 
			//this.model.set('name', newName);
			//console.log("events handler for " + this.el.outerHTML);
			///////////////////////////////////////
			//event.preventDefault();  // preventing default submission..
			//
			///////////////////////////////////////
			//event.preventDefault();  // preventing default submission..
			//event.currentTarget.id
			//event.currentTarget.name
			//event.currentTarget.value

			//var price = event.currentTarget.value;
			//var price = event.currentTarget.value;
			//this.render(ND.LO.Offers.sortOffer(price));
	
			// updated one.
			//this.collection = players.sortPosition(position);
			//this.render();
	
			//ND.LO.Offers.fetch({ data: $.param({ page: 1}) });
			/*ND.LO.Offers = new ND.LO.Collections.Offers();
			new ND.LO.Views.Offers({ collection: ND.LO.Offers }); //Add this line
			ND.LO.Offers.fetch();
			console.log(ND.LO.Offers.length);*/
			
			///////////////////////////////////////
			//alert( $(event.currentTarget).text() );
			//return false;
		}/*,
	
		removeItem: function (model) {
			console.log("Remove - " + model.get("Name"))
			this.remove();
		}*/
	});
//});})(window, document, jQuery);