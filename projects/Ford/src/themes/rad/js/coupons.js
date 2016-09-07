/*
Author: York Zhang
Description: This is for displaying the coupons widget
*/

(function($){

	var widgets = {
		
		couponsInit: function(){
			if(!$(".coupons-widget.content").size()) {return;}

			var container = $(".coupons-widget.content");
			var markup = '<li><div><div class="content coupons-widget">'+$("#coupons-template").html()+'</div></div></li>';
			var wigtul=container.parent().parent().parent();

			//checkUserLogin is asynchronous - returns a promise
			var loggedInPromise = instance.checkUserLogin();

			loggedInPromise.success(function (data) {
				
				if (data.loggedin === "true"){

					var url = widgets.getCouponsUrl();

					$.ajax({
						type:"GET",
						url: url,
						dataType: "json",
						success: function(data){

							var widgetData = data;

							if(data.length > 0){
                                container.parent().parent("li").remove();
								$.each(widgetData,function(i){
								$.template("manualsTemplate",markup);
								wigtul.append($.tmpl("manualsTemplate",widgetData[i]));
								})
								

								if($(window).width() > 767){
									
									$.each($("img.lazy",wigtul),function(i,value){
										var $this = $(this);
										var imgUrl = $this.attr("data-hires");
										$this.attr("src",imgUrl);
									});
									
									
								}
								
							}else{
								container.parent().parent("li").remove();
							}

							instance.widgetsInit();

						},
						error: function(XMLHttpRequest, textStatus, errorThrown){

							if(XMLHttpRequest.status == 404){

								container.parent().parent("li").remove();
								instance.widgetsInit();
							}
						}
					});

				} else {

					// if user not logged in, remove widget from DOM
					$(".widget-coupons").remove();

				}

			});
			
		},

		getCouponsUrl: function(){
			var url = instance.serviceLocator("owner.campaign");
			return url;
		}

	};

	$(function(){

		widgets.couponsInit();
		
	});

})(jQuery);


