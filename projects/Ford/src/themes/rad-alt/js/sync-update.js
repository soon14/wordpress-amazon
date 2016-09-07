/*
Author: Jennie Ji
Description: Owners dashboard SYNC widget. 
			 1. Rendering the jQuery template
			 2. Switching the template displaying based on user login status, SYNC update avaiable status
*/

(function($){
	var widgets = {
			
			updateInit: function(){
				
				if (!$(".widgets .content-inside.update").size()) {return;}

				var container = $(".widgets .content-inside.update");
				var markup = $("#update-template").html();
				var widgetData = {};

				var loggedInPromise = instance.checkUserLogin();

				loggedInPromise.success(function (data) {

					widgetData.loggedin = data.loggedin;
					widgetData.isMobile = ND.detectMobile.init();

					if (data.loggedin === "true"){
						var userInfo = $('#user').embeddedData();
						var url = userInfo.vin ? widgets.getRecallsUrl(userInfo.vin) : null;
						
						if (url){
							$.ajax({
								type:"GET",
								url: url,
								dataType: "json",
								cache: false, // for fixing IE cache issue
								success: function(data){
									widgetData.items = data;
									widgets.renderTemplate(markup,widgetData,container);
								},
								error: function(data, status, error){
									if (error === "Not Found"){
										$(".loading", container).hide();
										$(".alert-text", container).show();
									}
								}
							});
						}

					}
					else{
						widgets.renderTemplate(markup,widgetData,container);
					}

				});
			},
			renderTemplate: function(markup,widgetData,container){
				$.template("updateTemplate",markup);
				$.tmpl("updateTemplate",widgetData).appendTo(container);
				$(".loading", container).hide();
				instance.widgetsInit();
			},
			getRecallsUrl:function(vin){
				var config = instance.commonConfig();
				var url = instance.serviceLocator("sync.update");
			
				url = url.replace('{vin}', vin).replace('{site}', config.site);
				return url;
			}
	};

	

	$(function(){

		widgets.updateInit();
		
	});

})(jQuery);