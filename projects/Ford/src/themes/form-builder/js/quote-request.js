/*
Author: Ruiwen Qin
File name: quote-request.js
Description: 1. 
			 2. 
*/

(function($){
	var quote = {
		
		init: function(){
			if (!$("body.quote-request").size()) {return;}

			var container = $(".quote-request .content-banner .content-wrap");

			var data = quote.getData();

			if (data){
				quote.renderContent(container,data);
			}
			else {
				quote.error(container);
			}

			//mobile/tablet/desktop view switch
			var timer;
			if (!$("html").hasClass("lt-ie9")){
				$(window).bind('resize',function(){
					timer && clearTimeout(timer);
					timer = setTimeout((function(){
						if ($(window).width() < 768){
							data = quote.getData();
							quote.renderContent(container,data);
						}

						if ($(window).width() >= 768){
							data = quote.getData();
							quote.renderContent(container,data);
						}
					}),100);
				});
			}

			
		},
		clearContent: function(container){

			$(".loading",container).show();
			$(".vehicle",container).remove();
			$(".specs",container).remove();
			$(".spec-list",container).remove();

		},
		getData: function(){
			var data = $("#bnp-vehicle-config").embeddedData();
			if($.isEmptyObject(data)){
				return false;
			}
			else{
				data.isMobile = instance.isMobile();
				return data;
			}
		},
		error: function(container){
			$(".loading",container).hide();
			$(".alert-text",container).show();
		},
		renderContent: function(container,data){
			quote.clearContent(container);
			var markup = $("#model-specs").html();
			$.template("modelTemplate",markup);
			$.tmpl("modelTemplate",data).appendTo(container);

			$(".loading",container).hide();

			/* Add hidden field in form for padding data*/
			var vehicleInfo = $("<input/>",{
                id: "vehicleInfo",
                name: "vehicleInfo",
                type: "hidden",
                value:JSON.stringify(data)
            });

			if ($("#dragonflyform #vehicleInfo").length > 0){
				$("#dragonflyform #vehicleInfo").remove();
			}

            // vehicleInfo.prependTo("#dragonflyform");

			// $("#vehicleInfo").val(JSON.stringify(data));

			if (!data.isMobile){
				$(".specs .detail",container).jScrollPane();
			}
			else {
				var dropdown = $(".dropdown",container),
					select = $(".select",container);
					
				dropdown.jScrollPane({
					autoReinitialise:true
				});

				select.click(function(){
					dropdown.toggleClass("dropdownOn");
				});
			}

		}
	};

	$(function(){
		quote.init();
	});

})(jQuery);