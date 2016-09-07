/*
Author: York Zhang
Description: This is for displaying the recall information
			 APA specific events handlers are in themes\rad-alt\js\apa-recalls.js
*/

(function($){

	var widgets = {
		recallsInit: function(){
			if(!$(".recalls.content-inside").size()) {return;}


			var container = $(".widgets .content-inside.recalls");
			var markup = $("#recalls-template").html();
			var widgetData = '';

			//checkUserLogin is asynchronous - returns a promise
			var loggedInPromise = instance.checkUserLogin();
			loggedInPromise.success(function (data) {

				if (data.loggedin === "true"){
					var userInfo = $('#user').embeddedData();
					var url = userInfo.vin ? widgets.getRecallsUrl(userInfo.vin) : null;

					if (url) {
						$.ajax({
							type:"GET",
							url: url,
							dataType: "json",
							success: function(data){
								widgetData = data;
								widgetData.rVin = userInfo.vin;
								widgetData.showForm = false;
								$.template("userTemplate",markup);
								$(".widgets .content-inside.recalls").html($.tmpl("userTemplate",widgetData));
								$(".loading", container).hide();
								if(!instance.isMobile()){
									setTimeout("instance.widgetsInit()",4000);
								}
								
								if ($("#recallsvin").length != 0){
									widgets.queryForm();
								}

								// bind APA specific events
								$.publish('apa-recalls',[container,widgetData,markup]);

							}
						});
					}else{
						$(".alert-text", container).css("display","block");
						if(!instance.isMobile()){
							instance.widgetsInit();
						}
					}

				}else{
					//  bind APA specific events
					$.publish('apa-recalls-render', [container, markup]);
					widgets.renderRecallsForm(markup,container);

				}
			});

			// widgets.queryForm();
		},

		
		renderRecallsForm: function(markup,container){
			var widgetData = {};
					
			widgetData.showForm = true;
			widgetData.items = false;
			
			$.template("userTemplate",markup);
			$(".widgets .content-inside.recalls").html($.tmpl("userTemplate",widgetData));
			$(".loading", container).hide();
			if(!instance.isMobile()){
				instance.widgetsInit();
			}

			widgets.queryForm();

			if ($(".findVin a",container).length > 0){
				widgets.messageToggle(container);
			}

		},

		messageToggle: function(container){
			/* hint message toggle. hint message is on apa market */
			var hint = $(".findVin a",container);
			if (hint.length > 0){
				hint.click(function(e){
					e.preventDefault();
					$(this).parent().next().slideToggle(function(){
						if(!instance.isMobile()){
							instance.widgetsInit();
						}
					});
				});
				return false;
			}
		},

		getRecallsUrl:function(vin){
			var config = instance.commonConfig();
			var url = instance.serviceLocator("recalls.vin");
		
			url = url.replace('{vin}', vin).replace('{site}', config.site);
			return url;
		},

		queryForm: function(){
			$("div.content-inside.recalls .recalls-query").on("click", function(e){
				e.preventDefault();

				var container = $(".widgets .content-inside.recalls");
				var queryVin = $("#recallsvin").val();

				if(queryVin.length == 17){

					$(".loading",container).show();
					var markup = $("#recalls-template").html();
					var url = widgets.getRecallsUrl(queryVin);

					$.ajax({
						type:"GET",
						url: url,
						dataType: "json",
						success: function(data){
							var widgetData = data;
							widgetData.rVin = queryVin;
							widgetData.showForm = false;
							$.template("userTemplate",markup);
							$(".widgets .content-inside.recalls").html($.tmpl("userTemplate",widgetData));
							$(".loading", container).hide();
							if(!instance.isMobile()){
								instance.widgetsInit();
							}

							if ($("#recallsvin").length != 0){
								widgets.queryForm();
							}

							// bind APA specific events
							$.publish('apa-recalls',[container,widgetData,markup]);

						},
						error: function(data, status, error){
							if (error === "Not Found"){
								$(".loading", container).hide();
								$(".alert-text", container).show();
							}
						}
					});

				}else{
					$("div.content-inside.recalls p.error").show();
					if(!instance.isMobile()){
						instance.widgetsInit();
					}
					
					return false;
				}

			});
		}
	};

	$(function(){
		widgets.recallsInit();
	});

})(jQuery);


