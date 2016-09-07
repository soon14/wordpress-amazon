/*
Author: York Zhang
Description: This is for displaying the recall information
*			 APA specific events handlers are in themes\rad-alt\js\apa-manuals.js
*/

(function($){

	var widgets = {
		
		manualsInit: function(){
			if(!$(".manuals.content-inside").size() || $("body").hasClass("apa")) {return;}

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

					if (url){

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
			var container = $(".widgets .content-inside.manuals");

			$.template("manualsTemplate",markup);
			$.tmpl("manualsTemplate",widgetData).appendTo($(".manuals.content-inside"));
			$(".loading", container).hide();

			if(!instance.isMobile()){
				instance.widgetsInit();
			}

			widgets.manualSelect();

			if ($(".findVin a",container).length > 0){
				widgets.messageToggle(container);
			}

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

			if (config.locale === ''){
				url = url.substring(0,url.length - 1);
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
						var yearsOption = "";

						$.each(data, function(index, value){
							var year = value.year;
							yearsOption += "<option value='" + year + "'>" + year + "</option>";
						});
						$("#modelyear .loading").remove();
						$("#modelyear").append(yearsOption);

						$("#modelyear").on("change", function(){
							var $this = $(this),
								selectedYear = $this.val();

							if(selectedYear.length){
								
								$.each(data, function(index, value){

									if(value.year == selectedYear){
										var modelsOption = "",
											showModels = value.models;

										$.each(showModels, function(index, model){
											modelsOption += "<option value='" + model.model + "'>" + model.model + "</option>";
										});

										$("#modelnameplate").html(modelsOption);
									}
								});
							}else{
								$("#modelnameplate").html("<option value=''>Select</option>");
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

						},
						error: function(XMLHttpRequest, textStatus, errorThrown){
							if(XMLHttpRequest.status == 404){

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


