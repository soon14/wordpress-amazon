/*
Author: Ruiwen Qin
Description: 1. Triggerring bxSlider for contents
			 2. Searching and showing up results in the widget
*/

(function($){

	var widgets = {
		recallsInit: function(){
			
			$.subscribe('apa-recalls', (function(_,container,widgetData,markup){
				widgets.slider();
				widgets.formViewSwitch(container,widgetData,markup);
			}));

			$.subscribe('apa-recalls-render', (function(_,container,markup){
				widgets.renderRecallsForm(markup, container);
			}));
			
		},

		slider: function(){
			/* Call sliders.js for triggering bxslider */
			/* The options are below */
			/* elem,minSlides,maxSlides,slideWidth,slideMargin,infiniteLoop,hideControlOnEnd,adaptiveHeight,pageCounter,moveSlides,pagerType */
			sliders().init('.recalls',1,1,0,0,false,true,false,true,1,"full");
		},

		formViewSwitch: function(container,widgetData,markup){
			$(container).on("click", "a.search", function(e){
				e.preventDefault();
				container.children().not(".loading",".alert-text").remove();
				$(".loading", container).show();
				widgetData.showForm = true;

				widgets.renderRecallsForm(markup,container);
				return false;
			});
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
			widgets.messageToggle(container);
			

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

					return false;
				});

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

							widgets.slider();
							widgets.formViewSwitch(container,widgetData,markup);

						},
						error: function(data, status, error){
							if (error === "Not Found"){
								$(".loading", container).hide();
								$(".error", container).show();
							}
						}
					});

				}else{
					$("div.content-inside.recalls p.error").show();
					widgets.formViewSwitch(container,widgetData,markup);
					if(!instance.isMobile()){
						instance.widgetsInit();
					}
				}

			});
		}
		
	};

	$(function(){
		widgets.recallsInit();
	});

})(jQuery);


