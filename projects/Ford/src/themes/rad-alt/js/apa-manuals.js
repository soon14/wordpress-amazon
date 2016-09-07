/*
Author: Ruiwen Qin
Description: 1. Manuals widget on owner dashboard
			 2. Triggerring bxSlider for contents
			 3. Searching and showing up results in the widget
*/

(function($){

	var widgets = {
		
		manualsInit: function(){
			if(!$(".manuals.content-inside").size() && $("body").hasClass("apa")) {return;}

			container = $(".widgets .content-inside.manuals");
			var markup = $("#manuals-template").html();
			var bodycss = $("body").hasClass("forceshowform");
			var widgetData = '';

			//checkUserLogin is asynchronous - returns a promise
			if (bodycss == true){
			
				widgets.islogin=false;
				widgets.renderManualsForm();
			
			}else{
			
			var loggedInPromise = instance.checkUserLogin();
			loggedInPromise.success(function (data) {
				
				if (data.loggedin === "true"){
					
					var userInfo = $('#user').embeddedData();
					var url = userInfo.vin ? widgets.getManualsDetailsByVinUrl(userInfo.vin) : null;
					
                    widgets.islogin=true;

                    if (url) {

						$.ajax({
							type:"GET",
							url: url,
							dataType: "json",
							success: function(data){
								widgetData = {};
								widgetData.items = data;
								widgetData.mYear = "";
								widgetData.mModel = "";
								widgetData.mVin = userInfo.vin;
								widgetData.mName = userInfo.vehicleNickname;
								
								if(widgetData.items.length > 0){
									widgetData.showForm = false;
								}else{
									widgetData.showForm = true;
									
								}

								$.template("manualsTemplate",markup);
								$.tmpl("manualsTemplate",widgetData).appendTo(container);

								if(widgetData.showForm){
									widgets.manualSelect();
								}

								$(".loading", container).hide();
								if(!instance.isMobile()){
									instance.widgetsInit();
								}


								// bind APA specific events
								// $.publish('apa-manuals',[container,widgetData,markup]);
								widgets.slider();
								widgets.formViewSwitch(container,widgetData,markup);
								
								
							},
							error: function(XMLHttpRequest, textStatus, errorThrown){
								if(XMLHttpRequest.status == 404){
									widgets.renderManualsForm();
								}
							}
						})
					} else{
						$(".alert-text", container).css("display","block");
						if(!instance.isMobile()){
							instance.widgetsInit();
						}
						
					}
					
				} else {

					widgets.islogin=false;
					widgets.renderManualsForm();
				}			
			});
			
			}
		},
		islogin:false,

		renderManualsForm: function(){
			var markup = $("#manuals-template").html();
			var widgetData = {};
			widgetData.showForm = true;
			widgetData.login=widgets.islogin;
			var container = $(".manuals.content-inside");
           
			$.template("manualsTemplate",markup);
			$.tmpl("manualsTemplate",widgetData).appendTo(container);
			$(".loading",container).hide();
			$(".alert-text",container).remove();

			if(!instance.isMobile()){
				instance.widgetsInit();
			}
			
			
			widgets.manualSelect();

			/* hint message toggle. hint message is on apa market */
			widgets.messageToggle(container);
			

		},

		messageToggle: function(container){
			var hint = $(".findVin a",container);
			if (hint.length > 0){
				hint.click(function(e){
					e.preventDefault();
					$(this).parent().next().slideToggle(function(){
						if(!instance.isMobile()){
							instance.widgetsInit();
						}
					});

					return false;
				});

			}
			
			
		},

		slider: function(){
			/* Call sliders.js for triggering bxslider */
			/* The options are below */
		    /* elem,minSlides,maxSlides,slideWidth,slideMargin,infiniteLoop,hideControlOnEnd,adaptiveHeight,pageCounter,moveSlides,pagerType */
		    var nextText = Translator.translate("Next");
		    var prevText = Translator.translate("Prev");
		    sliders().init('.manuals', 1, 1, 0, 0, false, true, false, true, 1, "full", nextText, prevText);
		},

		formViewSwitch: function(container,widgetData){
			
		    $(container).off("click", "a.search").on("click", "a.search", function (e) {
				e.preventDefault();
				e.stopPropagation();
				container.children().not(".loading").remove();
				$(".loading", container).show();
				widgetData.showForm = true;

				widgets.renderManualsForm();
				return false;
			});
		},

		getManualsDetailsByVinUrl: function(vin){
			
			var config = instance.commonConfig();
			var url = instance.serviceLocator("pts.vin");
			
			url = url.replace('{vin}', vin).replace('{locale}', config.locale);

			if (config.locale === ''){
				url = url.substring(0,url.length - 1);
			}
			
			return url;
		},

		getManualsSelectUrl: function(){
			
			var config = instance.commonConfig();
			var url = instance.serviceLocator("pts.yearmodel");
			
			url = url.replace('{locale}', config.locale);

			if (config.locale === ''){
				url = url.substring(0,url.length - 1);
			}

			return url;
		},

		getManualsDetailsByYearUrl: function(year, model){
			
			var config = instance.commonConfig();
			var url = instance.serviceLocator("pts.yearvehicle");
			// console.log(url);
			url = url.replace('{year}', year).replace('{model}', model).replace('{locale}', config.locale);

			url = checkurl(url);

			if (config.locale === ''){
				url = url.substring(0,url.length - 1);
			}

			function checkurl(url) {
			    url = url.replace(' /', '/').replace('/ ', '/');
			    if (url.indexOf(' /') >= 0 || url.indexOf('/ ') >= 0) {
			         return checkurl(url);
			    }
			    return url;
			}

			return url;
		},

		manualSelect: function(){
			var url = widgets.getManualsSelectUrl();

			var loadingOption = '<option value="" class="loading"></option>';
			$("#modelyear").append(loadingOption);

			$.ajax({
					type:"GET",
					url: url,
					dataType: "json",
					success: function(data){
						var modelsOption = "";

						$.each(data, function(index, value){
							var model = value.model;
							modelsOption += "<option value='" + model + "'>" + model + "</option>";
						});
						$("#modelnameplate .loading").remove();
						$("#modelnameplate").append(modelsOption);

						$("#modelnameplate").on("change", function(){
							var $this = $(this),
								selectedModel = $this.val();

							if(selectedModel.length){
								
								$.each(data, function(index, value){

									if(value.model == selectedModel){
										var yearsOption = "",
											showModels = value.models;

										$.each(showModels, function(index, model){
											yearsOption += "<option value='" + model.year + "'>" + model.year + "</option>";
										});

										$("#modelyear").html(yearsOption);
									}
								});
							}else{
								$("#modelyear").html("<option value=''>Select</option>");
							}
						});

					}
				});


			

			widgets.queryForm();
		},

		queryForm: function(){
			$("div.content-inside.manuals .manuals-query").on("click", function(e){

				e.preventDefault();
				var queryYear = $("#modelyear").val(),
					queryModel = $("#modelnameplate").val(),
					queryVin = $("#manualsvin").val(),
					alertMsg = $("div.content-inside.manuals p.alert-text");

				if(queryVin.length == 17){

					$("div.content-inside.manuals span.loading").show();
					if(!instance.isMobile()){
						instance.widgetsInit();
					}
					var markup = $("#manuals-template").html();
					var url = widgets.getManualsDetailsByVinUrl(queryVin);

					$.ajax({
						type:"GET",
						url: url,
						dataType: "json",
						success: function(data){
							var widgetData = {};
							widgetData.items = data;
							widgetData.mYear = queryYear;
							widgetData.mModel = queryModel;
							widgetData.mVin = queryVin;

							$.template("manualsTemplate",markup);
							$("div.content-inside.manuals").html($.tmpl("manualsTemplate",widgetData));
							$("div.content-inside.manuals span.loading").hide();
							if(!instance.isMobile()){
								instance.widgetsInit();
							}

							// bind APA specific events
							// $.publish('apa-manuals',[container,widgetData,markup]);
							widgets.slider();
							widgets.formViewSwitch(container,widgetData,markup);
							

						},
						error: function(XMLHttpRequest, textStatus, errorThrown){
							if(XMLHttpRequest.status == 404){

								var widgetData = {};
								widgetData.items = false;
								widgetData.mYear = queryYear;
								widgetData.mModel = queryModel;
								widgetData.mVin = queryVin;

								//console.log(widgetData);
								$.template("manualsTemplate",markup);
								$("div.content-inside.manuals").html($.tmpl("manualsTemplate",widgetData));
								$("div.content-inside.manuals span.loading").hide();
								$("div.content-inside.manuals p.alert-text").show();
								if(!instance.isMobile()){
									instance.widgetsInit();
								}
								// bind APA specific events
								// $.publish('apa-manuals-switch',[container,widgetData,markup]);
								widgets.formViewSwitch(container,widgetData,markup);
							}
						}
					});
				}else if(queryModel.length){

					$("div.content-inside.manuals span.loading").show();
					if(!instance.isMobile()){
						instance.widgetsInit();
					}

					var markup = $("#manuals-template").html();
					var url = widgets.getManualsDetailsByYearUrl(queryYear, queryModel);

					var jqXHR = $.getJSON(url, function(data){

						var widgetData = {};
						widgetData.items = data;
						widgetData.mYear = queryYear;
						widgetData.mModel = queryModel;
						widgetData.mVin = queryVin;

						if(widgetData.items.length > 0){
							widgetData.showForm = false;
						}else{
							widgetData.showForm = true;
						}

						$.template("manualsTemplate",markup);
						$("div.content-inside.manuals").html($.tmpl("manualsTemplate",widgetData));
						if(!instance.isMobile()){
							instance.widgetsInit();
						}

					   // bind APA specific events
					   // $.publish('apa-manuals',[container,widgetData,markup]);
					   widgets.slider();
					   widgets.formViewSwitch(container,widgetData,markup);
						
					}).fail(function(){

						var widgetData = {};
						widgetData.items = false;
						widgetData.mYear = queryYear;
						widgetData.mModel = queryModel;
						widgetData.mVin = queryVin;

						$.template("manualsTemplate",markup);
						$("div.content-inside.manuals").html($.tmpl("manualsTemplate",widgetData));
						$("div.content-inside.manuals span.loading").hide();
						$("div.content-inside.manuals p.alert-text").show();
						if(!instance.isMobile()){
							instance.widgetsInit();
						}
						// bind APA specific events
						// $.publish('apa-manuals-switch',[container,widgetData,markup]);
						widgets.formViewSwitch(container,widgetData,markup);
							
					});
				}else{
					$("div.content-inside.manuals p.error").show();
					if(!instance.isMobile()){
						instance.widgetsInit();
					}
				}

			});
		}
	};

	$(function(){

		widgets.manualsInit();
		
		if($("form.manuals-search").size()){			
			widgets.renderManualsForm();
		}
		
	});

})(jQuery);


