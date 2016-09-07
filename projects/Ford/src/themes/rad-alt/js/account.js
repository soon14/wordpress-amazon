/*
Author: Ruiwen Qin
Description: Owners dashboard account widget. 
			 1. Rendering the jQuery template
			 2. Switching the template displaying based on user login status
*/

(function($){
	var widgets = {
			
			accountInit: function(){
				var container = $(".widgets .content-inside.account");
				var markup = $("#account-template").html();

				var loggedInPromise = instance.checkUserLogin();

				loggedInPromise.success(function (data) {
					var userInfo = $('#user').embeddedData();
					$.extend(userInfo,data);

					widgets.renderTemplate(markup,userInfo,container);	
					widgets.changeVehicle(container,userInfo);
				});

			},
			renderTemplate: function(markup,userInfo,container){
				$.template("accountTemplate",markup);
				$.tmpl("accountTemplate",userInfo).appendTo(container);
				$(".loading", container).hide();
				instance.widgetsInit();
			},
			changeVehicle: function(container,userInfo){
				$("#changevehicle",container).change(function(){
					var $this = $(this),
						targetVehicle = $this.val()
						vins = userInfo.vins,
						targetVehicleInfo = ""
						vehiclename = $(".vehiclename",container),
						vin = $(".vin",container);

					for (var i = 0; i < vins.length; i++){
						var elem = vins[i];
						for (var obj in elem){
							if (elem[obj] == targetVehicle){
								targetVehicleInfo = elem;
								break;
							}
						}
					}

					vehiclename.html(targetVehicleInfo.vehicleNickname);
					vin.html(targetVehicleInfo.vin);
					$this.closest('form').append('<input type="hidden" name="primary_vehicle_vin" value="'+targetVehicleInfo.vin+'">').submit();
					
				});
			}
	};

	

	$(function(){

		widgets.accountInit();
		
	});

})(jQuery);