
/*
 * Author: Ruiwen Qin
 * Description: Triggering bxslider
 * Usage: 1. Options: pageCounter - whether showing the numbers of current/total slider
 *		  2. getPagerSize() and pagerShift() are used to customize the pagination. 
 */

(function($) {
	var pagerContainer,
		pagerContainerWidth,
		pagerContainerOffset,
		firstPager,
		firstPagerOffset,
		difference,
		prevPosition,
		pagers,
		pagersWrap;

	//The create function creates the module object; It does no initialise the object
	sliders = function () {
		
		return {

			init: function( elem,minSlides,maxSlides,slideWidth,slideMargin,infiniteLoop,hideControlOnEnd,adaptiveHeight,pageCounter,moveSlides,pagerType,nextText,prevText ) {
				element = $(elem || "");
					
				/* Check this module needs to be initalised for this page */
				if( !element || !element.size() ) { return this; }
			
				var options = {
					module: elem,
					minSlides: minSlides,
					maxSlides: maxSlides,
					slideWidth: slideWidth,
					slideMargin: slideMargin,
					infiniteLoop: infiniteLoop,
					hideControlOnEnd: hideControlOnEnd,
					adaptiveHeight: adaptiveHeight,
					pageCounter: pageCounter,
					moveSlides: moveSlides,
					pagerType: pagerType,
					nextText: nextText ? nextText: "Next",
					prevText: prevText ? prevText: "Prev"
				}

				sliders().slides(options);
				
				return this;
			
			},

			slides: function(options){
				slider = $(options.module + " .bxslider").bxSlider({
					minSlides: options.minSlides,
					maxSlides: options.maxSlides,
					slideWidth: options.slideWidth,
					slideMargin: options.slideMargin,
					infiniteLoop: options.infiniteLoop,
					hideControlOnEnd: options.hideControlOnEnd,
					moveSlides: options.moveSlides,
					pagerType: options.pagerType,
					pager:  ($(options.module + " .bxslider").children().length > options.minSlides) ? true: false,
					controls: ($(options.module + " .bxslider").children().length > options.minSlides) ? true: false,
					nextText: options.nextText,
					prevText: options.prevText,
					onSliderLoad: function(currentIndex){
						if (options.pageCounter){ 
							var slideCount = ($(options.module + " .bxslider > li").length),
								slideCurrent = currentIndex;
							sliders().insertCount(options.module,slideCurrent,slideCount);
							sliders().pagerEvents(options.module);
							if($(window).width() >= 768){
								instance.widgetsInit(); // refresh the layout for wookmark
							}
							// if (options.pagerType === "full"){
							// 	sliders().getPagerSize(options.module);
							// }
							
						}
						$.publish("sliderLoaded");
					},
					onSlideNext: function(e){
						if (options.pageCounter){
							var slideCount = slider.getSlideCount();
							var slideCurrent = slider.getCurrentSlide();
							sliders().insertCount(options.module,slideCurrent,slideCount);
							sliders().trackEvent(slideCurrent,slideCount);
							// if (options.pagerType === "full"){
							// 	sliders().pagerShift("next");
							// }
						}
						$.publish("slideNext",[slideCurrent]);
						
					},
					onSlidePrev: function(){
						if (options.pageCounter){
							var slideCount = slider.getSlideCount();
							var slideCurrent = slider.getCurrentSlide();
							sliders().insertCount(options.module,slideCurrent,slideCount);
							sliders().trackEvent(slideCurrent,slideCount);
							// if (options.pagerType === "full"){
							// 	sliders().pagerShift("prev");
							// }
						}
						$.publish("slidePrev",[slideCurrent]);
					}
				});	


			},

			// Update the number of current/total slider
			insertCount: function(module,slideCurrent,slideCount){
				var module = $(module),
					current = $(".currentPage",module),
					total = $(".totalPage",module);

				current.html(slideCurrent+1);
				total.html(slideCount);

			},
			trackEvent:function(slideCurrent,slideCount) {
	            if (window._da && window._da.om && ND && ND.omniture) {
	            	ND.analyticsTag.trackOmniturePage({	            		
	            		tool:"event:find dealer",	
	            		tooldesc:"find dealer:" +(slideCurrent+1) +" of "+slideCount
	            	});
	            }				
	        },
			// Update the number of current/total slider when click the pagers
			pagerEvents: function(module){
				$(module).on("click", ".bx-pager a", function(){
					var currentIndex = $(this).data("slide-index");
					sliders().insertCount(module,currentIndex);
					$.publish("pagerClick",[currentIndex]);
				});
			}

			// getPagerSize: function(module){
			// 	pagerContainer = $(".bx-pager",module);
			// 	pagerContainerWidth = pagerContainer.width();
			// 	pagerContainerOffset = pagerContainer.offset();

			// 	pagers = $(".bx-pager-item",pagerContainer);
			// 	pagers.wrapAll("<div class='bx-pager-items'></div>");

			// 	pagersWrap = $(".bx-pager-items",module);

			// 	firstPager = $(".bx-pager .bx-pager-item:first-child");
			// 	firstPagerWidth = firstPager.width();
			// 	firstPagerOffset = firstPager.offset();

			// 	difference = firstPager.next(".bx-pager-item").offset().left - firstPagerOffset.left;

			// },

			// pagerShift: function(direction){
			// 	var activePager = $(".bx-pager .bx-pager-item .active");
			// 	var activePagerWidth = activePager.width();
			// 	var activePagerOffset = activePager.offset();


			// 	if (direction === "next"){
			// 		if (Math.round(activePagerOffset.left + difference) >= (pagerContainerOffset.left + pagerContainerWidth)){
			// 			pagersWrap.animate({
			// 				marginLeft: parseInt(pagersWrap.css("margin-left")) - difference +"px"
			// 			});
			// 		}
			// 	}

			// 	if (direction === "prev"){
			// 		if (Math.round(activePagerOffset.left - pagerContainerOffset.left) < difference){
			// 			pagersWrap.animate({
			// 				marginLeft: parseInt(pagersWrap.css("margin-left")) + difference +"px"
			// 			});
					
			// 		}
			// 	}
				
			// }
		};	
	};
	
	

}(jQuery));



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




/*
Author: Ruiwen Qin
Description: 1. Triggerring bxSlider for contents
			 2. Searching and showing up results in the widget
*/

(function($){

	var widgets = {
		dealerInit: function(){

			$.subscribe('apa-dealer', (function(_,container,widgetData,markup){
				widgets.formViewSwitch(container,widgetData,markup);
			}));

			$.subscribe('apa-dealer-notLoggedIn', (function(_,container){
				formValidationInstance.elements();
				widgets.queryForm(container);
				dealer.fetchSelectOptions();
			}));
			
		},

		formViewSwitch: function(container,data,markup){
			$(container).on("click", "a.search", function(e){
				e.preventDefault();
				container.children().not(".loading",".alert-text").remove();
				$(".loading", container).show();

				widgets.notLoggedInTemp();

				dealer.fetchSelectOptions();

				return false;
			});
		},

		notLoggedInTemp: function(){
			var container = $(".widgets .dealer");
			var markup = $("#dealer-template-not-loggedin").html();
			$(markup).appendTo(container);
			$(".loading", container).hide();
			formValidationInstance.elements();
			if(!instance.isMobile()){
				instance.widgetsInit();
			}

			widgets.queryForm(container);
		},

		queryForm: function(container){
			var form = $("form", container);
			
			form.submit(function(){
				var location = $("#dealerlocation").val(),
					name = $("#dealername").val();
				if (location === "" && name === "") {
				    $("p.error", container).show();
				    return false;
				}
			});

			$(".btn.dealers-query").click(function (e) {
			    e.preventDefault();
			    if ($("#dealerlocation").val() || $("#dealername").val() || $("#dl_state").val()) {
			        form.submit();
			    }
			    else {
			        $(".widget-dealer form .onerow select,.widget-dealer form .onerow input").removeClass("user-success").addClass("user-error");
			        $(".widget-dealer form .onerow select,.widget-dealer form .onerow input").parent().removeClass("ws-success").addClass("ws-invalid");
			        $(".widget-dealer form .onerow select,.widget-dealer form .onerow input").attr("aria-invalid", "true");
			        return false;
			    }
			});
			
		}
		
		
	};

	var dealer = {
	    fetchSelectOptions: function () {

	        var ddlState = $('#dl_state');
	        var ddlCity = $('#dl_city');
	        var cityData = $("#cityDropdownData");

	        if (ddlState.length == 0 || cityData.length == 0) return;

	        //console.log(cityData.embeddedData());

	        var states = cityData.embeddedData().list[0].states,
                optionObj = {},
                defaultStateOpt = ddlState.find('option').first(),
                defaultCityOpt = ddlCity.find('option').first();

	        //create states option list
	        ddlState.empty();
	        ddlState.append(defaultStateOpt);
	        for (var i = 0; i < states.length; i++) {
	            var val = states[i][0];
	            var txt = val;
	            optionObj[val] = states[i][1].cities;
	            ddlState.append("<option value='" + val + "'>" + txt + "</option>");
	        }

	        //create cities option
	        ddlState.bind('change', function () {
	            ddlCity.empty();
	            ddlCity.append(defaultCityOpt);
	            //ddlCity.val('');
	            //ddlCity.change();
	            var city = optionObj[ddlState.val()];
	            if (!city) { return; }
	            for (var i = 0; i < city.length; i++) {
	                var val = city[i][0];
	                var txt = val;
	                ddlCity.append("<option value='" + val + "'>" + txt + "</option>");
	            }
	        });

            //preselect
	        if (ddlState.attr('data') && ddlState.attr('data').length > 0) {
	            ddlState.val(ddlState.attr('data'));
	            var city = optionObj[ddlState.attr('data')];
	            if (city) {
	                ddlCity.empty();
	                ddlCity.append(defaultCityOpt);
	                for (var i = 0; i < city.length; i++) {
	                    var val = city[i][0];
	                    var txt = val;
	                    ddlCity.append("<option value='" + val + "'>" + txt + "</option>");
	                }
	                if (ddlCity.attr('data') && ddlCity.attr('data').length > 0) {
	                    ddlCity.val(ddlCity.attr('data'));
	                }
	            }
	        }

	        //validate
	        dealer.checkValidate(true);

	        //event
	        ddlCity.on('blur', function () {
	            if (!ddlState.val() && !$('input#dealername').val() && !ddlCity.val()) {
	                $(this).removeClass("user-success").addClass("user-error");
	                $(this).parent().removeClass("ws-success").addClass("ws-invalid");
	                $(this).attr("aria-invalid", "true");
	            }
	        });
	        ddlState.on('blur', function () {
	            if (!ddlState.val() && !$('input#dealername').val() && !ddlCity.val()) {
	                $(this).removeClass("user-success").addClass("user-error");
	                $(this).parent().removeClass("ws-success").addClass("ws-invalid");
	                $(this).attr("aria-invalid", "true");
	            }
	        });
	        $('form.dealer-form-siderbar input#dealer-search-button').on('click', function (e) {
	            if (!$("#dl_state").val() && !$("#dl_city").val() && !$("#dl_name").val() && !$('#dl_location').val()) {
	                $('form.dealer-form-siderbar .onerow select,form.dealer-form-siderbar .onerow input').removeClass("user-success").addClass("user-error");
	                $('form.dealer-form-siderbar .onerow select,form.dealer-form-siderbar .onerow input').parent().removeClass("ws-success").addClass("ws-invalid");
	                $('form.dealer-form-siderbar .onerow select,form.dealer-form-siderbar .onerow input').attr("aria-invalid", "true");
	                return false;
	            }
	        });

	    },

	    checkValidate: function (init, actionELE) {
	        var groupEls = $(".widget-dealer #dragonflyform .onerow input.altOpt,.widget-dealer #dragonflyform fieldset select.altOpt");
	        if (groupEls.length) {
	            var count = 0;
	            var wrapperObj = $(".widget-dealer #dragonflyform fieldset");
	            if (init) {
	                $(".widget-dealer #dragonflyform").find("INPUT[type=submit]").on("click", function () {
	                    if (!wrapperObj.hasClass("showErr") && wrapperObj.find(".altOpt").prop("required")) {
	                        wrapperObj.addClass("showErr");
	                    }
	                });
	            }
	            groupEls.each(function () {
	                var curEl = $(this),
                        e = "change";
	                if (curEl.val() != "") {
	                    count++;
	                }
	                if (init && !curEl.hasClass("eventBinded")) {
	                    curEl.on(e, function () {
	                        dealer.checkValidate(false, curEl);
	                    });
	                    curEl.addClass("eventBinded");
	                }
	            });
	            if (count > 0) {
	                groupEls.prop("required", false);
	                groupEls.removeClass("user-error").addClass("user-success");
	                groupEls.parent().removeClass("ws-invalid").addClass("ws-success");
	                groupEls.attr("aria-invalid", "false");
	                if (!init) {
	                    wrapperObj.removeClass("showErr").removeClass("ws-invalid");
	                    wrapperObj.find(".ws-invalid").removeClass("ws-invalid");
	                }
	            }
	            else {
	                groupEls.prop("required", true);
	                if (!init) {
	                    wrapperObj.addClass("showErr");
	                    if (actionELE && actionELE.length > 0 && actionELE.is('select')) {
	                        actionELE.removeClass("user-success").addClass("user-error");
	                        actionELE.parent().removeClass("ws-success").addClass("ws-invalid");
	                        actionELE.attr("aria-invalid", "true");
	                    }
	                }
	            }
	        }
	    }
	};

	$(function(){
	    widgets.dealerInit();
	    dealer.fetchSelectOptions();
	});

})(jQuery);




/*
*Author: Ruiwen Qin
*Description: 1. Drop pins on the dealer locator map
*					- Cookie does not exist: preferred dealer data is not available, other dealer info pins are dropped on the map
*					- Cookie exists: drop preferred dealer pin and other dealer info pins
*			  2. Pagination clicking events
*					- when pagination is clicked, pins data are retrieved and reload the map
*/

(function($){

	var dealerMap = {
		count: 0,
		step: 0,
		currentPage: 1,
		
		mapInit: function(){

			var filteredData = [];
			var mapData = $("#map-data").size() ? $("#map-data").embeddedData() : {};
			var pinsData = $("#pins-data").size() ? $("#pins-data").embeddedData() : {};
			var directionsData = $("#directions-data").size() ? $("#directions-data").embeddedData() : {};
			preferredDealer = {};

			dealerMap.step = $("#dealer-results-perpage").size() ? $("#dealer-results-perpage").embeddedData() : 1;
			dealerMap.step = parseInt(dealerMap.step.perpage);
			
			dealerMap.loadMap(mapData);
			

			// coming from dealer.js when cookie is found or when user is logged in
			$.subscribe("apa-preferred-dealer-mapPin", (function(_,data){
				preferredDealer = dealerMap.preferredDealerData(data,preferredDealer);
				filteredData = dealerMap.filterData(pinsData,filteredData,true);
				
				dealerMap.dropPins(filteredData,preferredDealer);
				dealerMap.loadMap(mapData);
				$(".dealer-results .preferred-dealer").addClass("unhide");
			}));

			// coming from dealer.js when cookie is NOT found AND when user is NOT logged in
			$.subscribe("apa-preferred-dealer-mapPin-notLoggedIn", (function(){
				filteredData = dealerMap.filterData(pinsData,filteredData,true);
				dealerMap.dropPins(filteredData,preferredDealer);
				dealerMap.loadMap(mapData);
				// $(".dealer-results .preferred-dealer").addClass("hide");
			}));

			// coming from slider.js when slider is loaded
			$.subscribe("sliderLoaded", (function(){
				dealerMap.currentPage = 1;
				dealerMap.count = 1;
			}));			

			// coming from slider.js when next button is clicked
			$.subscribe("slideNext", (function(_,slideCurrent){
				dealerMap.reloadMap(slideCurrent,filteredData,pinsData,preferredDealer,mapData);
			}));

			// coming from slider.js when prev button is clicked
			$.subscribe("slidePrev", (function(_,slideCurrent){
				dealerMap.reloadMap(slideCurrent,filteredData,pinsData,preferredDealer,mapData);
			}));

			// coming from slider.js when full pagination numbers are clicked
			$.subscribe("pagerClick", (function(_,currentIndex){
				dealerMap.reloadMap(currentIndex,filteredData,pinsData,preferredDealer,mapData);
			}));

			// $.subscribe("apa-set-preferred-dealer", (function(_,dealerCode){

			// }));

		},

		preferredDealerData: function(data,preferredDealer){
			preferredDealer.pinid = "preferred";
			preferredDealer.id = data.dealerCode;
			preferredDealer.dealerinfo = "dealer_" + data.localDealerCode;
			preferredDealer.lat = data.latitudeLongitude.latitude;
			preferredDealer.lng = data.latitudeLongitude.longitude;

			return preferredDealer;
		},

		reloadMap: function(slideCurrent,filteredData,pinsData,preferredDealer,mapData){
			if (instance.isMobile()){
				dealerMap.count = slideCurrent;
			}
			else{
				dealerMap.count = slideCurrent * dealerMap.step;
			}
			
			filteredData = dealerMap.filterData(pinsData,filteredData,false);

			dealerMap.dropPins(filteredData,preferredDealer);
			dealerMap.loadMap(mapData);
		},

		filterData: function(pinsData,filteredData,dataInit){
			
			filteredData = [];
			if (dataInit){
				dealerMap.count = 0;
			}

			if (instance.isMobile()){
				if (pinsData[dealerMap.count] !== undefined || preferredDealer.id !== pinsData[dealerMap.count].id){
					filteredData.push(pinsData[dealerMap.count]);
				}	
			}
			else {

				for (var i = dealerMap.count; i < dealerMap.count + dealerMap.step; i++){
					if (pinsData[i] !== undefined){
						if (preferredDealer.id !== pinsData[i].id){
							filteredData.push(pinsData[i]);
						}
						
					}
					
				}
			}

			return filteredData;
		},

		dropPins: function(filteredData,preferredDealer){
			
			ND.dealerLocator.data = [];
			if(filteredData.length > 0 && !dealerMap.isEmptyObject(filteredData) ){
				$.each(filteredData, function(i,pin){
					ND.dealerLocator.add(pin);
				});



			}

			if(!dealerMap.isEmptyObject(preferredDealer) ){
				ND.dealerLocator.add(preferredDealer);
			}
			

		},

		loadMap: function(mapData){
			dealerMap.resizeMap(mapData);
			//in IE8 window resize will not only triggered by resize window.
			//the following code is to prevent resize event triggered not by window resize under ie8
			var windowWidth = $(window).width();
				windowHeight = $(window).height();
			
			$(window).on('resize', function() {
				if($(window).width()!=windowWidth || $(window).height()!=windowHeight){
					dealerMap.resizeMap(mapData);
				}
			});
		},

		resizeMap: function(data){
			if ($(window).width() < 960) {
				
				var mapContainerWidth = $(".dealer-map").width(),
					newHeight = mapContainerWidth * 0.609;
				$('#dealer-map').css({
					'width'		: mapContainerWidth,
					'height'	: newHeight
				});
			}

	  		if(dealerMap.isEmptyObject(data)){
	  			//bing map version7 has an issue - "Can't move focus to the control because it is invisible, not enabled, or of a type that does not accept the focus"
	  			//occured only if version7 and ie8
	  			//this possible becasue bing map version7 has something load slower than $(document).ready
	  			if($("body").hasClass("ie8")&& typeof(Microsoft) != "undefined" && typeof(Microsoft.Maps) != "undefined"){
	  				setTimeout("ND.dealerLocator.init()",2000);
	  			}else{
	  				ND.dealerLocator.init();
	  			}
	  		}else{
	  			//bing map version7 has an issue - "Can't move focus to the control because it is invisible, not enabled, or of a type that does not accept the focus"
	  			//occured only if version7 and ie8
	  			//this possible becasue bing map version7 has something load slower than $(document).ready
	  			if($("body").hasClass("ie8") && typeof(Microsoft) != "undefined" && typeof(Microsoft.Maps) != "undefined"){
	  				setTimeout("ND.dealerLocator.init('"+data.zoomLevel+"','"+data.lng+"','"+data.lat+"','"+data.key+"','"+data.country+"')",2000);
	  			}else{
	  				ND.dealerLocator.init(data.zoomLevel, data.lng, data.lat, data.key, data.country);
	  			}
	  		}
			

		},

		isEmptyObject: function(obj){
			for(var name in obj){
				return false;
			}
			return true;
		}

	};

	$(function(){
		if(!$(".dealer-map").size()) {return;}

		dealerMap.mapInit();

		

	});

})(jQuery);




/*
Author: Ruiwen Qin
Description: User login/logout panel in header 
			 1. Rendering the jQuery template based on user login status
			 2. Toggle the panel by clicking the avatar icon
*/

(function($){
	var widgets = {
			
			avatarInit: function(){
				var container = $("#toolbar-dropdown");
				var markup = $("#toolbar-mobile-template").html();

				var loggedInPromise = instance.checkUserLogin();

				loggedInPromise.success(function (data) {
					var userInfo = $('#user').embeddedData();
					$.extend(userInfo,data);
					widgets.renderTemplate(markup,userInfo,container);
					widgets.togglePanel(container);
				});
				widgets.element();
			},
			renderTemplate: function(markup,userInfo,container){
				$.template("avatarTemplate",markup);
				$.tmpl("avatarTemplate",userInfo).appendTo(container);
			},
			togglePanel: function(container){
				$("#toolbar-mobile a").click(function(){
					var displayEl = "",
						curEl = $(this),
						curElContainer = curEl.parent(".item-wrap"),
						curElList = curEl.closest("li"),
						elListArray = curEl.closest("#toolbar-mobile").children("li");
					
					//more than 1 item exist, eg. if language bar been added
					if(elListArray.length>1){
						//to control which dropdown list should be show
						if(curElContainer.hasClass("sign-up")){
							displayEl = ".btngroup";
						}else if(curElContainer.hasClass("language-bar")){
							displayEl = ".lang-group";
						}else{
							container.children("div").show();
						}
						var displayObj = container.children(displayEl);
						if(displayObj.length > 0){displayObj.show();}
						//if specified dropdown field already displayed
						if(displayObj.hasClass("active")){
							container.slideUp(function(){
								displayObj.removeClass("active");
								curElList.removeClass("active");
							});
						}else{
							container.hide();
							//hide all other dropdown fields and show specified dropdown field
							container.children("div").removeClass("active").hide();
							displayObj.addClass("active").show();
							//remove "active" status for all other elements and add to current one
							elListArray.removeClass("active");
							curElList.addClass("active");
							container.slideDown();
						}
					}else{
						//keep previous logic to avoid risks on existing site
						container.slideToggle();
						curEl.toggleClass("active");
					}
				});
			},
			element: function(){
				//bind event on hidden field. this fixed redirect will not trigger while click on nested radio button under "a" tag
				$("#header").on("click","#toolbar-dropdown .lang-group .lang-list",function(){
					var url = $(this).attr("href");

					$(this).find("input").attr("checked", "checked");
					if(url){window.location.href = url;}
				});

			}
	};

	

	$(function(){

		widgets.avatarInit();
		
	});

})(jQuery);


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


/*
 * Author: Ruiwen Qin
 * Description: 
 */

(function($){
	
	$(document).ready(function(){

		var isMobile = instance.isMobile(),
		 	isDesktop = instance.isDesktop(),
		 	isTablet = instance.isTablet(),
		 	dealerResults;

		/* If data-background is specified, get the image path and set this published background.
		*  Add active state when click the widgets
		*/
		if ($(".widgets").length > 0){
			var widgets = $(".widgets");
			var widgetsItem = $(".widgets > ul > li");
			

			widgetsItem.each(function(){
				var that = $(this);
				var backgroundImage = that.data('background');
				if (backgroundImage){
					that.addClass("customized");

					if (isDesktop){
						that.css({
							"background-image":'url(' + backgroundImage + ')'
						});
						that.children("div").css({
							"background-image":'url(' + backgroundImage + ')'
						});

						that.click(function(){
							$(this).addClass("active").siblings().removeClass("active");
						});
					}

					if (isTablet){
						that.css({
							"background-image":'url(' + backgroundImage + ')'
						});
						that.children("div").css({
							"background-image":'url(' + backgroundImage + ')'
						});

						that.click(function(){
							$(this).addClass("active").siblings().removeClass("active");
						});
					}

					if (isMobile){
						$("h2", that).css({
							"background-image":'url(' + backgroundImage + ')'
						});
						$("h2", that).click(function(e){						
							$(this).parents("li").toggleClass("active");
						});
					}
				}
				else {
					if (isMobile){
						$("h2", that).click(function(e){						
							$(this).parents("li").toggleClass("active");
						});
					}
					else {
						that.click(function(){
							$(this).addClass("active").siblings().removeClass("active");
						});
					}
					
				}
			});

			
		}


		/* Call sliders.js for triggering bxslider */
		/* The options are below */
		/* elem,minSlides,maxSlides,slideWidth,slideMargin,infiniteLoop,hideControlOnEnd,adaptiveHeight,pageCounter,moveSlides,pagerType */
		var nextText = Translator.translate("Next");
		var prevText = Translator.translate("Prev");
		if (isMobile){
			// video carousel on dashboard
			var videoCarousel = sliders().init(".video-carousel",1,3,212,26,true,true,false,false,1,"short",nextText,prevText);
			// dealer locator search results
			sliders().init('.dealer-outer-wrap .locator .dealer-results .mobile-view',1,1,0,0,false,true,true,true,1,"short",nextText,prevText);
		}
		else {
			// video carousel on dashboard
			var videoCarousel = sliders().init(".video-carousel",3,3,286,26,false,true,false,false,3,"full",nextText,prevText);
			// dealer locator search results
			sliders().init('.dealer-outer-wrap .locator .dealer-results .tablet-view',1,1,0,0,false,true,true,true,1,"short",nextText,prevText);
		}

		/* Preferred dealer module toggle on dealer locator page */
		// if (!isDesktop){
			if ($(".dealer-results .preferred-dealer").length > 0){
				var container = $(".dealer-results .preferred-dealer"),
					heading = $(".heading", container),
					content = $(".dealer", container);
				heading.click(function(){
					content.slideToggle();
					$(this).toggleClass('active');
				});
			}
		// }
		
		

	});
		

}(jQuery));


/***************************************
add the redirection disable flag to all the urls under the page
****************************************/
$( document ).ready(function(){
	var current = window.location.href;
	var str = "uar=false"
	
	if(current.indexOf("?" + str) > 0 || current.indexOf("&" + str) > 0){
		$("a").each(function (){
			if($( this ).hasClass('external-disclaimer') == false){
				var url = $( this ).attr("href")
				if(url.indexOf("http") == 0){
					if(url.indexOf("?") > 0){
						url += "&" + str;
					}else{
						url += "?" + str;
					}
					$(this).attr("href",url);
				}
			}
		});
	}
});



Date.CultureInfo={name:"en-US",englishName:"English (United States)",nativeName:"English (United States)",dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],abbreviatedDayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],shortestDayNames:["Su","Mo","Tu","We","Th","Fr","Sa"],firstLetterDayNames:["S","M","T","W","T","F","S"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],abbreviatedMonthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],amDesignator:"AM",pmDesignator:"PM",firstDayOfWeek:0,twoDigitYearMax:2029,dateElementOrder:"mdy",formatPatterns:{shortDate:"M/d/yyyy",longDate:"dddd, MMMM dd, yyyy",shortTime:"h:mm tt",longTime:"h:mm:ss tt",fullDateTime:"dddd, MMMM dd, yyyy h:mm:ss tt",sortableDateTime:"yyyy-MM-ddTHH:mm:ss",universalSortableDateTime:"yyyy-MM-dd HH:mm:ssZ",rfc1123:"ddd, dd MMM yyyy HH:mm:ss GMT",monthDay:"MMMM dd",yearMonth:"MMMM, yyyy"},regexPatterns:{jan:/^jan(uary)?/i,feb:/^feb(ruary)?/i,mar:/^mar(ch)?/i,apr:/^apr(il)?/i,may:/^may/i,jun:/^jun(e)?/i,jul:/^jul(y)?/i,aug:/^aug(ust)?/i,sep:/^sep(t(ember)?)?/i,oct:/^oct(ober)?/i,nov:/^nov(ember)?/i,dec:/^dec(ember)?/i,sun:/^su(n(day)?)?/i,mon:/^mo(n(day)?)?/i,tue:/^tu(e(s(day)?)?)?/i,wed:/^we(d(nesday)?)?/i,thu:/^th(u(r(s(day)?)?)?)?/i,fri:/^fr(i(day)?)?/i,sat:/^sa(t(urday)?)?/i,future:/^next/i,past:/^last|past|prev(ious)?/i,add:/^(\+|aft(er)?|from|hence)/i,subtract:/^(\-|bef(ore)?|ago)/i,yesterday:/^yes(terday)?/i,today:/^t(od(ay)?)?/i,tomorrow:/^tom(orrow)?/i,now:/^n(ow)?/i,millisecond:/^ms|milli(second)?s?/i,second:/^sec(ond)?s?/i,minute:/^mn|min(ute)?s?/i,hour:/^h(our)?s?/i,week:/^w(eek)?s?/i,month:/^m(onth)?s?/i,day:/^d(ay)?s?/i,year:/^y(ear)?s?/i,shortMeridian:/^(a|p)/i,longMeridian:/^(a\.?m?\.?|p\.?m?\.?)/i,timezone:/^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt|utc)/i,ordinalSuffix:/^\s*(st|nd|rd|th)/i,timeContext:/^\s*(\:|a(?!u|p)|p)/i},timezones:[{name:"UTC",offset:"-000"},{name:"GMT",offset:"-000"},{name:"EST",offset:"-0500"},{name:"EDT",offset:"-0400"},{name:"CST",offset:"-0600"},{name:"CDT",offset:"-0500"},{name:"MST",offset:"-0700"},{name:"MDT",offset:"-0600"},{name:"PST",offset:"-0800"},{name:"PDT",offset:"-0700"}]};
(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo,p=function(s,l){if(!l){l=2;}
return("000"+s).slice(l*-1);};$P.clearTime=function(){this.setHours(0);this.setMinutes(0);this.setSeconds(0);this.setMilliseconds(0);return this;};$P.setTimeToNow=function(){var n=new Date();this.setHours(n.getHours());this.setMinutes(n.getMinutes());this.setSeconds(n.getSeconds());this.setMilliseconds(n.getMilliseconds());return this;};$D.today=function(){return new Date().clearTime();};$D.compare=function(date1,date2){if(isNaN(date1)||isNaN(date2)){throw new Error(date1+" - "+date2);}else if(date1 instanceof Date&&date2 instanceof Date){return(date1<date2)?-1:(date1>date2)?1:0;}else{throw new TypeError(date1+" - "+date2);}};$D.equals=function(date1,date2){return(date1.compareTo(date2)===0);};$D.getDayNumberFromName=function(name){var n=$C.dayNames,m=$C.abbreviatedDayNames,o=$C.shortestDayNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s||o[i].toLowerCase()==s){return i;}}
return-1;};$D.getMonthNumberFromName=function(name){var n=$C.monthNames,m=$C.abbreviatedMonthNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s){return i;}}
return-1;};$D.isLeapYear=function(year){return((year%4===0&&year%100!==0)||year%400===0);};$D.getDaysInMonth=function(year,month){return[31,($D.isLeapYear(year)?29:28),31,30,31,30,31,31,30,31,30,31][month];};$D.getTimezoneAbbreviation=function(offset){var z=$C.timezones,p;for(var i=0;i<z.length;i++){if(z[i].offset===offset){return z[i].name;}}
return null;};$D.getTimezoneOffset=function(name){var z=$C.timezones,p;for(var i=0;i<z.length;i++){if(z[i].name===name.toUpperCase()){return z[i].offset;}}
return null;};$P.clone=function(){return new Date(this.getTime());};$P.compareTo=function(date){return Date.compare(this,date);};$P.equals=function(date){return Date.equals(this,date||new Date());};$P.between=function(start,end){return this.getTime()>=start.getTime()&&this.getTime()<=end.getTime();};$P.isAfter=function(date){return this.compareTo(date||new Date())===1;};$P.isBefore=function(date){return(this.compareTo(date||new Date())===-1);};$P.isToday=function(){return this.isSameDay(new Date());};$P.isSameDay=function(date){return this.clone().clearTime().equals(date.clone().clearTime());};$P.addMilliseconds=function(value){this.setMilliseconds(this.getMilliseconds()+value);return this;};$P.addSeconds=function(value){return this.addMilliseconds(value*1000);};$P.addMinutes=function(value){return this.addMilliseconds(value*60000);};$P.addHours=function(value){return this.addMilliseconds(value*3600000);};$P.addDays=function(value){this.setDate(this.getDate()+value);return this;};$P.addWeeks=function(value){return this.addDays(value*7);};$P.addMonths=function(value){var n=this.getDate();this.setDate(1);this.setMonth(this.getMonth()+value);this.setDate(Math.min(n,$D.getDaysInMonth(this.getFullYear(),this.getMonth())));return this;};$P.addYears=function(value){return this.addMonths(value*12);};$P.add=function(config){if(typeof config=="number"){this._orient=config;return this;}
var x=config;if(x.milliseconds){this.addMilliseconds(x.milliseconds);}
if(x.seconds){this.addSeconds(x.seconds);}
if(x.minutes){this.addMinutes(x.minutes);}
if(x.hours){this.addHours(x.hours);}
if(x.weeks){this.addWeeks(x.weeks);}
if(x.months){this.addMonths(x.months);}
if(x.years){this.addYears(x.years);}
if(x.days){this.addDays(x.days);}
return this;};var $y,$m,$d;$P.getWeek=function(){var a,b,c,d,e,f,g,n,s,w;$y=(!$y)?this.getFullYear():$y;$m=(!$m)?this.getMonth()+1:$m;$d=(!$d)?this.getDate():$d;if($m<=2){a=$y-1;b=(a/4|0)-(a/100|0)+(a/400|0);c=((a-1)/4|0)-((a-1)/100|0)+((a-1)/400|0);s=b-c;e=0;f=$d-1+(31*($m-1));}else{a=$y;b=(a/4|0)-(a/100|0)+(a/400|0);c=((a-1)/4|0)-((a-1)/100|0)+((a-1)/400|0);s=b-c;e=s+1;f=$d+((153*($m-3)+2)/5)+58+s;}
g=(a+b)%7;d=(f+g-e)%7;n=(f+3-d)|0;if(n<0){w=53-((g-s)/5|0);}else if(n>364+s){w=1;}else{w=(n/7|0)+1;}
$y=$m=$d=null;return w;};$P.getISOWeek=function(){$y=this.getUTCFullYear();$m=this.getUTCMonth()+1;$d=this.getUTCDate();return p(this.getWeek());};$P.setWeek=function(n){return this.moveToDayOfWeek(1).addWeeks(n-this.getWeek());};$D._validate=function(n,min,max,name){if(typeof n=="undefined"){return false;}else if(typeof n!="number"){throw new TypeError(n+" is not a Number.");}else if(n<min||n>max){throw new RangeError(n+" is not a valid value for "+name+".");}
return true;};$D.validateMillisecond=function(value){return $D._validate(value,0,999,"millisecond");};$D.validateSecond=function(value){return $D._validate(value,0,59,"second");};$D.validateMinute=function(value){return $D._validate(value,0,59,"minute");};$D.validateHour=function(value){return $D._validate(value,0,23,"hour");};$D.validateDay=function(value,year,month){return $D._validate(value,1,$D.getDaysInMonth(year,month),"day");};$D.validateMonth=function(value){return $D._validate(value,0,11,"month");};$D.validateYear=function(value){return $D._validate(value,0,9999,"year");};$P.set=function(config){if($D.validateMillisecond(config.millisecond)){this.addMilliseconds(config.millisecond-this.getMilliseconds());}
if($D.validateSecond(config.second)){this.addSeconds(config.second-this.getSeconds());}
if($D.validateMinute(config.minute)){this.addMinutes(config.minute-this.getMinutes());}
if($D.validateHour(config.hour)){this.addHours(config.hour-this.getHours());}
if($D.validateMonth(config.month)){this.addMonths(config.month-this.getMonth());}
if($D.validateYear(config.year)){this.addYears(config.year-this.getFullYear());}
if($D.validateDay(config.day,this.getFullYear(),this.getMonth())){this.addDays(config.day-this.getDate());}
if(config.timezone){this.setTimezone(config.timezone);}
if(config.timezoneOffset){this.setTimezoneOffset(config.timezoneOffset);}
if(config.week&&$D._validate(config.week,0,53,"week")){this.setWeek(config.week);}
return this;};$P.moveToFirstDayOfMonth=function(){return this.set({day:1});};$P.moveToLastDayOfMonth=function(){return this.set({day:$D.getDaysInMonth(this.getFullYear(),this.getMonth())});};$P.moveToNthOccurrence=function(dayOfWeek,occurrence){var shift=0;if(occurrence>0){shift=occurrence-1;}
else if(occurrence===-1){this.moveToLastDayOfMonth();if(this.getDay()!==dayOfWeek){this.moveToDayOfWeek(dayOfWeek,-1);}
return this;}
return this.moveToFirstDayOfMonth().addDays(-1).moveToDayOfWeek(dayOfWeek,+1).addWeeks(shift);};$P.moveToDayOfWeek=function(dayOfWeek,orient){var diff=(dayOfWeek-this.getDay()+7*(orient||+1))%7;return this.addDays((diff===0)?diff+=7*(orient||+1):diff);};$P.moveToMonth=function(month,orient){var diff=(month-this.getMonth()+12*(orient||+1))%12;return this.addMonths((diff===0)?diff+=12*(orient||+1):diff);};$P.getOrdinalNumber=function(){return Math.ceil((this.clone().clearTime()-new Date(this.getFullYear(),0,1))/86400000)+1;};$P.getTimezone=function(){return $D.getTimezoneAbbreviation(this.getUTCOffset());};$P.setTimezoneOffset=function(offset){var here=this.getTimezoneOffset(),there=Number(offset)*-6/10;return this.addMinutes(there-here);};$P.setTimezone=function(offset){return this.setTimezoneOffset($D.getTimezoneOffset(offset));};$P.hasDaylightSavingTime=function(){return(Date.today().set({month:0,day:1}).getTimezoneOffset()!==Date.today().set({month:6,day:1}).getTimezoneOffset());};$P.isDaylightSavingTime=function(){return(this.hasDaylightSavingTime()&&new Date().getTimezoneOffset()===Date.today().set({month:6,day:1}).getTimezoneOffset());};$P.getUTCOffset=function(){var n=this.getTimezoneOffset()*-10/6,r;if(n<0){r=(n-10000).toString();return r.charAt(0)+r.substr(2);}else{r=(n+10000).toString();return"+"+r.substr(1);}};$P.getElapsed=function(date){return(date||new Date())-this;};if(!$P.toISOString){$P.toISOString=function(){function f(n){return n<10?'0'+n:n;}
return'"'+this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z"';};}
$P._toString=$P.toString;$P.toString=function(format){var x=this;if(format&&format.length==1){var c=$C.formatPatterns;x.t=x.toString;switch(format){case"d":return x.t(c.shortDate);case"D":return x.t(c.longDate);case"F":return x.t(c.fullDateTime);case"m":return x.t(c.monthDay);case"r":return x.t(c.rfc1123);case"s":return x.t(c.sortableDateTime);case"t":return x.t(c.shortTime);case"T":return x.t(c.longTime);case"u":return x.t(c.universalSortableDateTime);case"y":return x.t(c.yearMonth);}}
var ord=function(n){switch(n*1){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th";}};return format?format.replace(/(\\)?(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|S)/g,function(m){if(m.charAt(0)==="\\"){return m.replace("\\","");}
x.h=x.getHours;switch(m){case"hh":return p(x.h()<13?(x.h()===0?12:x.h()):(x.h()-12));case"h":return x.h()<13?(x.h()===0?12:x.h()):(x.h()-12);case"HH":return p(x.h());case"H":return x.h();case"mm":return p(x.getMinutes());case"m":return x.getMinutes();case"ss":return p(x.getSeconds());case"s":return x.getSeconds();case"yyyy":return p(x.getFullYear(),4);case"yy":return p(x.getFullYear());case"dddd":return $C.dayNames[x.getDay()];case"ddd":return $C.abbreviatedDayNames[x.getDay()];case"dd":return p(x.getDate());case"d":return x.getDate();case"MMMM":return $C.monthNames[x.getMonth()];case"MMM":return $C.abbreviatedMonthNames[x.getMonth()];case"MM":return p((x.getMonth()+1));case"M":return x.getMonth()+1;case"t":return x.h()<12?$C.amDesignator.substring(0,1):$C.pmDesignator.substring(0,1);case"tt":return x.h()<12?$C.amDesignator:$C.pmDesignator;case"S":return ord(x.getDate());default:return m;}}):this._toString();};}());
(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo,$N=Number.prototype;$P._orient=+1;$P._nth=null;$P._is=false;$P._same=false;$P._isSecond=false;$N._dateElement="day";$P.next=function(){this._orient=+1;return this;};$D.next=function(){return $D.today().next();};$P.last=$P.prev=$P.previous=function(){this._orient=-1;return this;};$D.last=$D.prev=$D.previous=function(){return $D.today().last();};$P.is=function(){this._is=true;return this;};$P.same=function(){this._same=true;this._isSecond=false;return this;};$P.today=function(){return this.same().day();};$P.weekday=function(){if(this._is){this._is=false;return(!this.is().sat()&&!this.is().sun());}
return false;};$P.at=function(time){return(typeof time==="string")?$D.parse(this.toString("d")+" "+time):this.set(time);};$N.fromNow=$N.after=function(date){var c={};c[this._dateElement]=this;return((!date)?new Date():date.clone()).add(c);};$N.ago=$N.before=function(date){var c={};c[this._dateElement]=this*-1;return((!date)?new Date():date.clone()).add(c);};var dx=("sunday monday tuesday wednesday thursday friday saturday").split(/\s/),mx=("january february march april may june july august september october november december").split(/\s/),px=("Millisecond Second Minute Hour Day Week Month Year").split(/\s/),pxf=("Milliseconds Seconds Minutes Hours Date Week Month FullYear").split(/\s/),nth=("final first second third fourth fifth").split(/\s/),de;$P.toObject=function(){var o={};for(var i=0;i<px.length;i++){o[px[i].toLowerCase()]=this["get"+pxf[i]]();}
return o;};$D.fromObject=function(config){config.week=null;return Date.today().set(config);};var df=function(n){return function(){if(this._is){this._is=false;return this.getDay()==n;}
if(this._nth!==null){if(this._isSecond){this.addSeconds(this._orient*-1);}
this._isSecond=false;var ntemp=this._nth;this._nth=null;var temp=this.clone().moveToLastDayOfMonth();this.moveToNthOccurrence(n,ntemp);if(this>temp){throw new RangeError($D.getDayName(n)+" does not occur "+ntemp+" times in the month of "+$D.getMonthName(temp.getMonth())+" "+temp.getFullYear()+".");}
return this;}
return this.moveToDayOfWeek(n,this._orient);};};var sdf=function(n){return function(){var t=$D.today(),shift=n-t.getDay();if(n===0&&$C.firstDayOfWeek===1&&t.getDay()!==0){shift=shift+7;}
return t.addDays(shift);};};for(var i=0;i<dx.length;i++){$D[dx[i].toUpperCase()]=$D[dx[i].toUpperCase().substring(0,3)]=i;$D[dx[i]]=$D[dx[i].substring(0,3)]=sdf(i);$P[dx[i]]=$P[dx[i].substring(0,3)]=df(i);}
var mf=function(n){return function(){if(this._is){this._is=false;return this.getMonth()===n;}
return this.moveToMonth(n,this._orient);};};var smf=function(n){return function(){return $D.today().set({month:n,day:1});};};for(var j=0;j<mx.length;j++){$D[mx[j].toUpperCase()]=$D[mx[j].toUpperCase().substring(0,3)]=j;$D[mx[j]]=$D[mx[j].substring(0,3)]=smf(j);$P[mx[j]]=$P[mx[j].substring(0,3)]=mf(j);}
var ef=function(j){return function(){if(this._isSecond){this._isSecond=false;return this;}
if(this._same){this._same=this._is=false;var o1=this.toObject(),o2=(arguments[0]||new Date()).toObject(),v="",k=j.toLowerCase();for(var m=(px.length-1);m>-1;m--){v=px[m].toLowerCase();if(o1[v]!=o2[v]){return false;}
if(k==v){break;}}
return true;}
if(j.substring(j.length-1)!="s"){j+="s";}
return this["add"+j](this._orient);};};var nf=function(n){return function(){this._dateElement=n;return this;};};for(var k=0;k<px.length;k++){de=px[k].toLowerCase();$P[de]=$P[de+"s"]=ef(px[k]);$N[de]=$N[de+"s"]=nf(de);}
$P._ss=ef("Second");var nthfn=function(n){return function(dayOfWeek){if(this._same){return this._ss(arguments[0]);}
if(dayOfWeek||dayOfWeek===0){return this.moveToNthOccurrence(dayOfWeek,n);}
this._nth=n;if(n===2&&(dayOfWeek===undefined||dayOfWeek===null)){this._isSecond=true;return this.addSeconds(this._orient);}
return this;};};for(var l=0;l<nth.length;l++){$P[nth[l]]=(l===0)?nthfn(-1):nthfn(l);}}());
(function(){Date.Parsing={Exception:function(s){this.message="Parse error at '"+s.substring(0,10)+" ...'";}};var $P=Date.Parsing;var _=$P.Operators={rtoken:function(r){return function(s){var mx=s.match(r);if(mx){return([mx[0],s.substring(mx[0].length)]);}else{throw new $P.Exception(s);}};},token:function(s){return function(s){return _.rtoken(new RegExp("^\s*"+s+"\s*"))(s);};},stoken:function(s){return _.rtoken(new RegExp("^"+s));},until:function(p){return function(s){var qx=[],rx=null;while(s.length){try{rx=p.call(this,s);}catch(e){qx.push(rx[0]);s=rx[1];continue;}
break;}
return[qx,s];};},many:function(p){return function(s){var rx=[],r=null;while(s.length){try{r=p.call(this,s);}catch(e){return[rx,s];}
rx.push(r[0]);s=r[1];}
return[rx,s];};},optional:function(p){return function(s){var r=null;try{r=p.call(this,s);}catch(e){return[null,s];}
return[r[0],r[1]];};},not:function(p){return function(s){try{p.call(this,s);}catch(e){return[null,s];}
throw new $P.Exception(s);};},ignore:function(p){return p?function(s){var r=null;r=p.call(this,s);return[null,r[1]];}:null;},product:function(){var px=arguments[0],qx=Array.prototype.slice.call(arguments,1),rx=[];for(var i=0;i<px.length;i++){rx.push(_.each(px[i],qx));}
return rx;},cache:function(rule){var cache={},r=null;return function(s){try{r=cache[s]=(cache[s]||rule.call(this,s));}catch(e){r=cache[s]=e;}
if(r instanceof $P.Exception){throw r;}else{return r;}};},any:function(){var px=arguments;return function(s){var r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){r=null;}
if(r){return r;}}
throw new $P.Exception(s);};},each:function(){var px=arguments;return function(s){var rx=[],r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){throw new $P.Exception(s);}
rx.push(r[0]);s=r[1];}
return[rx,s];};},all:function(){var px=arguments,_=_;return _.each(_.optional(px));},sequence:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;if(px.length==1){return px[0];}
return function(s){var r=null,q=null;var rx=[];for(var i=0;i<px.length;i++){try{r=px[i].call(this,s);}catch(e){break;}
rx.push(r[0]);try{q=d.call(this,r[1]);}catch(ex){q=null;break;}
s=q[1];}
if(!r){throw new $P.Exception(s);}
if(q){throw new $P.Exception(q[1]);}
if(c){try{r=c.call(this,r[1]);}catch(ey){throw new $P.Exception(r[1]);}}
return[rx,(r?r[1]:s)];};},between:function(d1,p,d2){d2=d2||d1;var _fn=_.each(_.ignore(d1),p,_.ignore(d2));return function(s){var rx=_fn.call(this,s);return[[rx[0][0],r[0][2]],rx[1]];};},list:function(p,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return(p instanceof Array?_.each(_.product(p.slice(0,-1),_.ignore(d)),p.slice(-1),_.ignore(c)):_.each(_.many(_.each(p,_.ignore(d))),px,_.ignore(c)));},set:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return function(s){var r=null,p=null,q=null,rx=null,best=[[],s],last=false;for(var i=0;i<px.length;i++){q=null;p=null;r=null;last=(px.length==1);try{r=px[i].call(this,s);}catch(e){continue;}
rx=[[r[0]],r[1]];if(r[1].length>0&&!last){try{q=d.call(this,r[1]);}catch(ex){last=true;}}else{last=true;}
if(!last&&q[1].length===0){last=true;}
if(!last){var qx=[];for(var j=0;j<px.length;j++){if(i!=j){qx.push(px[j]);}}
p=_.set(qx,d).call(this,q[1]);if(p[0].length>0){rx[0]=rx[0].concat(p[0]);rx[1]=p[1];}}
if(rx[1].length<best[1].length){best=rx;}
if(best[1].length===0){break;}}
if(best[0].length===0){return best;}
if(c){try{q=c.call(this,best[1]);}catch(ey){throw new $P.Exception(best[1]);}
best[1]=q[1];}
return best;};},forward:function(gr,fname){return function(s){return gr[fname].call(this,s);};},replace:function(rule,repl){return function(s){var r=rule.call(this,s);return[repl,r[1]];};},process:function(rule,fn){return function(s){var r=rule.call(this,s);return[fn.call(this,r[0]),r[1]];};},min:function(min,rule){return function(s){var rx=rule.call(this,s);if(rx[0].length<min){throw new $P.Exception(s);}
return rx;};}};var _generator=function(op){return function(){var args=null,rx=[];if(arguments.length>1){args=Array.prototype.slice.call(arguments);}else if(arguments[0]instanceof Array){args=arguments[0];}
if(args){for(var i=0,px=args.shift();i<px.length;i++){args.unshift(px[i]);rx.push(op.apply(null,args));args.shift();return rx;}}else{return op.apply(null,arguments);}};};var gx="optional not ignore cache".split(/\s/);for(var i=0;i<gx.length;i++){_[gx[i]]=_generator(_[gx[i]]);}
var _vector=function(op){return function(){if(arguments[0]instanceof Array){return op.apply(null,arguments[0]);}else{return op.apply(null,arguments);}};};var vx="each any all".split(/\s/);for(var j=0;j<vx.length;j++){_[vx[j]]=_vector(_[vx[j]]);}}());(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo;var flattenAndCompact=function(ax){var rx=[];for(var i=0;i<ax.length;i++){if(ax[i]instanceof Array){rx=rx.concat(flattenAndCompact(ax[i]));}else{if(ax[i]){rx.push(ax[i]);}}}
return rx;};$D.Grammar={};$D.Translator={hour:function(s){return function(){this.hour=Number(s);};},minute:function(s){return function(){this.minute=Number(s);};},second:function(s){return function(){this.second=Number(s);};},meridian:function(s){return function(){this.meridian=s.slice(0,1).toLowerCase();};},timezone:function(s){return function(){var n=s.replace(/[^\d\+\-]/g,"");if(n.length){this.timezoneOffset=Number(n);}else{this.timezone=s.toLowerCase();}};},day:function(x){var s=x[0];return function(){this.day=Number(s.match(/\d+/)[0]);};},month:function(s){return function(){this.month=(s.length==3)?"jan feb mar apr may jun jul aug sep oct nov dec".indexOf(s)/4:Number(s)-1;};},year:function(s){return function(){var n=Number(s);this.year=((s.length>2)?n:(n+(((n+2000)<$C.twoDigitYearMax)?2000:1900)));};},rday:function(s){return function(){switch(s){case"yesterday":this.days=-1;break;case"tomorrow":this.days=1;break;case"today":this.days=0;break;case"now":this.days=0;this.now=true;break;}};},finishExact:function(x){x=(x instanceof Array)?x:[x];for(var i=0;i<x.length;i++){if(x[i]){x[i].call(this);}}
var now=new Date();if((this.hour||this.minute)&&(!this.month&&!this.year&&!this.day)){this.day=now.getDate();}
if(!this.year){this.year=now.getFullYear();}
if(!this.month&&this.month!==0){this.month=now.getMonth();}
if(!this.day){this.day=1;}
if(!this.hour){this.hour=0;}
if(!this.minute){this.minute=0;}
if(!this.second){this.second=0;}
if(this.meridian&&this.hour){if(this.meridian=="p"&&this.hour<12){this.hour=this.hour+12;}else if(this.meridian=="a"&&this.hour==12){this.hour=0;}}
if(this.day>$D.getDaysInMonth(this.year,this.month)){throw new RangeError(this.day+" is not a valid value for days.");}
var r=new Date(this.year,this.month,this.day,this.hour,this.minute,this.second);if(this.timezone){r.set({timezone:this.timezone});}else if(this.timezoneOffset){r.set({timezoneOffset:this.timezoneOffset});}
return r;},finish:function(x){x=(x instanceof Array)?flattenAndCompact(x):[x];if(x.length===0){return null;}
for(var i=0;i<x.length;i++){if(typeof x[i]=="function"){x[i].call(this);}}
var today=$D.today();if(this.now&&!this.unit&&!this.operator){return new Date();}else if(this.now){today=new Date();}
var expression=!!(this.days&&this.days!==null||this.orient||this.operator);var gap,mod,orient;orient=((this.orient=="past"||this.operator=="subtract")?-1:1);if(!this.now&&"hour minute second".indexOf(this.unit)!=-1){today.setTimeToNow();}
if(this.month||this.month===0){if("year day hour minute second".indexOf(this.unit)!=-1){this.value=this.month+1;this.month=null;expression=true;}}
if(!expression&&this.weekday&&!this.day&&!this.days){var temp=Date[this.weekday]();this.day=temp.getDate();if(!this.month){this.month=temp.getMonth();}
this.year=temp.getFullYear();}
if(expression&&this.weekday&&this.unit!="month"){this.unit="day";gap=($D.getDayNumberFromName(this.weekday)-today.getDay());mod=7;this.days=gap?((gap+(orient*mod))%mod):(orient*mod);}
if(this.month&&this.unit=="day"&&this.operator){this.value=(this.month+1);this.month=null;}
if(this.value!=null&&this.month!=null&&this.year!=null){this.day=this.value*1;}
if(this.month&&!this.day&&this.value){today.set({day:this.value*1});if(!expression){this.day=this.value*1;}}
if(!this.month&&this.value&&this.unit=="month"&&!this.now){this.month=this.value;expression=true;}
if(expression&&(this.month||this.month===0)&&this.unit!="year"){this.unit="month";gap=(this.month-today.getMonth());mod=12;this.months=gap?((gap+(orient*mod))%mod):(orient*mod);this.month=null;}
if(!this.unit){this.unit="day";}
if(!this.value&&this.operator&&this.operator!==null&&this[this.unit+"s"]&&this[this.unit+"s"]!==null){this[this.unit+"s"]=this[this.unit+"s"]+((this.operator=="add")?1:-1)+(this.value||0)*orient;}else if(this[this.unit+"s"]==null||this.operator!=null){if(!this.value){this.value=1;}
this[this.unit+"s"]=this.value*orient;}
if(this.meridian&&this.hour){if(this.meridian=="p"&&this.hour<12){this.hour=this.hour+12;}else if(this.meridian=="a"&&this.hour==12){this.hour=0;}}
if(this.weekday&&!this.day&&!this.days){var temp=Date[this.weekday]();this.day=temp.getDate();if(temp.getMonth()!==today.getMonth()){this.month=temp.getMonth();}}
if((this.month||this.month===0)&&!this.day){this.day=1;}
if(!this.orient&&!this.operator&&this.unit=="week"&&this.value&&!this.day&&!this.month){return Date.today().setWeek(this.value);}
if(expression&&this.timezone&&this.day&&this.days){this.day=this.days;}
return(expression)?today.add(this):today.set(this);}};var _=$D.Parsing.Operators,g=$D.Grammar,t=$D.Translator,_fn;g.datePartDelimiter=_.rtoken(/^([\s\-\.\,\/\x27]+)/);g.timePartDelimiter=_.stoken(":");g.whiteSpace=_.rtoken(/^\s*/);g.generalDelimiter=_.rtoken(/^(([\s\,]|at|@|on)+)/);var _C={};g.ctoken=function(keys){var fn=_C[keys];if(!fn){var c=$C.regexPatterns;var kx=keys.split(/\s+/),px=[];for(var i=0;i<kx.length;i++){px.push(_.replace(_.rtoken(c[kx[i]]),kx[i]));}
fn=_C[keys]=_.any.apply(null,px);}
return fn;};g.ctoken2=function(key){return _.rtoken($C.regexPatterns[key]);};g.h=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2]|[1-9])/),t.hour));g.hh=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2])/),t.hour));g.H=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/),t.hour));g.HH=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3])/),t.hour));g.m=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.minute));g.mm=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.minute));g.s=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.second));g.ss=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.second));g.hms=_.cache(_.sequence([g.H,g.m,g.s],g.timePartDelimiter));g.t=_.cache(_.process(g.ctoken2("shortMeridian"),t.meridian));g.tt=_.cache(_.process(g.ctoken2("longMeridian"),t.meridian));g.z=_.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/),t.timezone));g.zz=_.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/),t.timezone));g.zzz=_.cache(_.process(g.ctoken2("timezone"),t.timezone));g.timeSuffix=_.each(_.ignore(g.whiteSpace),_.set([g.tt,g.zzz]));g.time=_.each(_.optional(_.ignore(_.stoken("T"))),g.hms,g.timeSuffix);g.d=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1]|\d)/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.dd=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1])/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.ddd=g.dddd=_.cache(_.process(g.ctoken("sun mon tue wed thu fri sat"),function(s){return function(){this.weekday=s;};}));g.M=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d|\d)/),t.month));g.MM=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d)/),t.month));g.MMM=g.MMMM=_.cache(_.process(g.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"),t.month));g.y=_.cache(_.process(_.rtoken(/^(\d\d?)/),t.year));g.yy=_.cache(_.process(_.rtoken(/^(\d\d)/),t.year));g.yyy=_.cache(_.process(_.rtoken(/^(\d\d?\d?\d?)/),t.year));g.yyyy=_.cache(_.process(_.rtoken(/^(\d\d\d\d)/),t.year));_fn=function(){return _.each(_.any.apply(null,arguments),_.not(g.ctoken2("timeContext")));};g.day=_fn(g.d,g.dd);g.month=_fn(g.M,g.MMM);g.year=_fn(g.yyyy,g.yy);g.orientation=_.process(g.ctoken("past future"),function(s){return function(){this.orient=s;};});g.operator=_.process(g.ctoken("add subtract"),function(s){return function(){this.operator=s;};});g.rday=_.process(g.ctoken("yesterday tomorrow today now"),t.rday);g.unit=_.process(g.ctoken("second minute hour day week month year"),function(s){return function(){this.unit=s;};});g.value=_.process(_.rtoken(/^\d\d?(st|nd|rd|th)?/),function(s){return function(){this.value=s.replace(/\D/g,"");};});g.expression=_.set([g.rday,g.operator,g.value,g.unit,g.orientation,g.ddd,g.MMM]);_fn=function(){return _.set(arguments,g.datePartDelimiter);};g.mdy=_fn(g.ddd,g.month,g.day,g.year);g.ymd=_fn(g.ddd,g.year,g.month,g.day);g.dmy=_fn(g.ddd,g.day,g.month,g.year);g.date=function(s){return((g[$C.dateElementOrder]||g.mdy).call(this,s));};g.format=_.process(_.many(_.any(_.process(_.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/),function(fmt){if(g[fmt]){return g[fmt];}else{throw $D.Parsing.Exception(fmt);}}),_.process(_.rtoken(/^[^dMyhHmstz]+/),function(s){return _.ignore(_.stoken(s));}))),function(rules){return _.process(_.each.apply(null,rules),t.finishExact);});var _F={};var _get=function(f){return _F[f]=(_F[f]||g.format(f)[0]);};g.formats=function(fx){if(fx instanceof Array){var rx=[];for(var i=0;i<fx.length;i++){rx.push(_get(fx[i]));}
return _.any.apply(null,rx);}else{return _get(fx);}};g._formats=g.formats(["\"yyyy-MM-ddTHH:mm:ssZ\"","yyyy-MM-ddTHH:mm:ssZ","yyyy-MM-ddTHH:mm:ssz","yyyy-MM-ddTHH:mm:ss","yyyy-MM-ddTHH:mmZ","yyyy-MM-ddTHH:mmz","yyyy-MM-ddTHH:mm","ddd, MMM dd, yyyy H:mm:ss tt","ddd MMM d yyyy HH:mm:ss zzz","MMddyyyy","ddMMyyyy","Mddyyyy","ddMyyyy","Mdyyyy","dMyyyy","yyyy","Mdyy","dMyy","d"]);g._start=_.process(_.set([g.date,g.time,g.expression],g.generalDelimiter,g.whiteSpace),t.finish);g.start=function(s){try{var r=g._formats.call({},s);if(r[1].length===0){return r;}}catch(e){}
return g._start.call({},s);};$D._parse=$D.parse;$D.parse=function(s){var r=null;if(!s){return null;}
if(s instanceof Date){return s;}
try{r=$D.Grammar.start.call({},s.replace(/^\s*(\S*(\s+\S+)*)\s*$/,"$1"));}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};$D.getParseFunction=function(fx){var fn=$D.Grammar.formats(fx);return function(s){var r=null;try{r=fn.call({},s);}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};};$D.parseExact=function(s,fx){return $D.getParseFunction(fx)(s);};}());


/*
 * Author: Ruiwen Qin
 * This is fullscreen overlay plugin. By triggering this plugin, simply add 'fullscreen-overlay' class onto the element.
 *
 *Instructions:
 *1. load overlay through url
 *<a href='overlay.html' class='fullscreen-overlay'/>
 *$('.fullscreen-overlay').fullScreenOverlay({... });
 *
 *2. load overlay use customize content
 *<a href='#' class='fullscreen-overlay'/>
 *$('.fullscreen-overlay').fullScreenOverlay({
 *   useCustomizeContent: true,
 *   customizedContent: "<span class='loading'></span>"
 *});
 *
 *
 */

(function($) {
	
	$.fn.fullScreenOverlay = function(options){
		var defaults = {
			overlayId: "fullscreen-overlay",
			openOverlay: false,
			close: 'CLOSE',
			backtotop: 'BACK TO TOP',
			complete: null, //callback function
			useCustomizeContent: false,   // if set as true, will load the customized content
			customizedContent: null     //customizedContent will be loaded to contentbody when useCustomizeContent=true
		};
		
		var options = $.extend(defaults, options);
		
		var fullOverlay = function(element){
			var fulloverlay = this,
				url,
				cid,
				overlayContainer,
				overlayContent,
				currentPosition,
				state = {},
				scrolltop;

			// retrieve the texts for controls
			if ($("#overlay-controls").length > 0){
				var controlTexts = $("#overlay-controls").embeddedData();
				if (!$.isEmptyObject(controlTexts)){
					options.close = controlTexts.close;
					options.backtotop = controlTexts.backtotop;
				}
			}
			
			fulloverlay.init = function () {
				url = element.attr("href");
				cid = url.match(/cid=\d+/);
				
				if (Modernizr.history){
					var index = window.location.toString().indexOf(options.overlayId);
					if (index < 0){
						history.pushState(null,options.overlayId,location+"#"+options.overlayId+"="+cid);
					}
					
				}
				else {
					if (cid){
						state[options.overlayId] = cid.toString();
						$.bbq.pushState(state);
					}
					
				}
				
				fulloverlay.injectContainer();
				fulloverlay.injectControls();
				fulloverlay.loadContent();
				
			};
			
			fulloverlay.injectContainer = function(){
				var markup = '<div class="overlay-wrap"><span class="loader"></span></div>';
				$("body").addClass("noscroll");
				$("body").append(markup); 
				overlayContainer = $(".overlay-wrap");

				/* For fixing scroll issue on mobile - ios */
				/* Disable body scroll */
				$("body").on('touchmove',function(e){
					if($(this).hasClass("noscroll")){
						e.preventDefault();
					}
				});
				/* Allow overlay scroll */
				overlayContainer.on('touchmove', function(e){
					e.stopPropagation();
				});
				/** **/
				
			};
			
			fulloverlay.injectControls = function(){
				var markup = {
					topCloseBtn: function () {
						return '<div class="top-close"><a class="close" href="#"><span>' + options.close + '</span></a></div>';
					},
					bottomControls: function () {
						return '<div class="controls"><a href="#" class="backToTop">' + options.backtotop + '</a><a href="#" class="close">' + options.close + '</a></div>';
					}
				};
				
				overlayContent = $('<div class="overlay-content"></div>').hide();
				overlayContent.prepend($(markup.topCloseBtn()));
				$(".top-close", overlayContent).after($('<div class="content"></div>'));
				overlayContent.append(markup.bottomControls());

				overlayContentBody = $(".content", overlayContent);
				
			};
			
			fulloverlay.loadContent = function () {

                //load customized content
			    if (options.useCustomizeContent) {
			        fulloverlay.injectContent(options.customizedContent);
			    }
                //load content from url
			    else {
			        $.ajax({
			            url: url,
			            success: function (data) {
			                fulloverlay.injectContent(data);
			            },
			            error: function () {
			                fulloverlay.loadError();
			            }
			        });
			    }
			};
			
			fulloverlay.injectContent = function(data){
			
				overlayContainer.imagesLoaded(function(){
					overlayContentBody.html(data);
				});
				
				overlayContainer.html(overlayContent);
				overlayContent.show();
				
				fulloverlay.eventsRegister();

				if (Modernizr.touch) {
				    var topControlHeight = $(".top-close", overlayContent).outerHeight();
				    var bodyHeight = $(".content", overlayContent).outerHeight();
				    var bottomControlHeight = $(".controls", overlayContent).outerHeight();
				    overlayContent.css("height", topControlHeight + bodyHeight + bottomControlHeight + 80 + 'px');
				}
				
			};
			
			fulloverlay.eventsRegister = function(){

				overlayContainer.on("click", function(){
					fulloverlay.unloadOverlay();
				}).children().on("click", function(e){
					e.stopPropagation();
					// e.preventDefault();
					// return false;
				});



				$(".close",overlayContainer).on("click", function(e){
					fulloverlay.unloadOverlay();
					e.preventDefault();
					return false;
				});

				$(".backToTop",overlayContainer).on("click", function(e){
					overlayContainer.animate({
						scrollTop: 0
					});
					e.preventDefault();
					return false;
				});

				// callback 
				if ($.isFunction(options.complete)){
					options.complete.call(this);
				}

				/* Overlay banner - hotspots/video/slider */
				if ($(".banner", overlayContainer).length > 0){
					var id = $(".banner", overlayContainer).attr("id");
					
					switch (id){
						case "hotspots":
							fulloverlay.hotspots()
							break;
						case "video":
							fulloverlay.video()
							break;
						case "slider":
							fulloverlay.slider()
							break;
					}

				}
				
			};
			
			fulloverlay.unloadOverlay = function(){
			    if (typeof jwplayer != "undefined" && $(".banner", overlayContainer).attr("id") === "video") {
					jwplayer().stop(); 
				}

				

				$("body").removeClass("noscroll");
				overlayContainer.fadeOut('800');
				overlayContainer.remove();

				if (Modernizr.history){

					history.replaceState(null,options.overlayId,"");
					history.back();
				}
				else {
					window.location.hash = 'nooverlay';
					$.bbq.removeState(options.overlayId);
				}

			};

			fulloverlay.removeOverlay = function(){
				overlayContainer.remove();
				$("body").removeClass("noscroll");
				$.bbq.removeState(options.overlayId);
			};
			
			fulloverlay.loadError = function(){
				
				overlayContainer = $(".overlay-wrap");
				overlayContainer.html(markup.clone());
				$("body").addClass("noscroll");
				fulloverlay.eventsRegister();
			};

			/* Bind banner contents events */
			fulloverlay.hotspots = function(){
				var spots = $(".hotspots", overlayContainer),
					data = $("#hotspots-data").embeddedData();

					$("#hotspots-template").tmpl(data).appendTo(spots);
					var spot = $(".spot .outer",spots);
					
					spot.hover(function(){
						var that = $(this),
							container = that.parent(),
							detail = that.next(".detail");
						container.siblings().removeClass("active");
						container.toggleClass("active");
						
					});

				
			};

			/* Banner video */
			fulloverlay.video = function(){
				var videoConfig = $(".banner .video-config",overlayContainer).embeddedData();
				ND.video.init(videoConfig);
			};

			/* Banner slider */
			fulloverlay.slider = function(){
				
				var slider = $(".banner-slider",overlayContainer);
				slider.bxSlider({
					mode: 'fade'
				});
				
				/* bind image carousal to careers overlay*/
				if($("body").hasClass("careers")){
					ND.rotatingBanner(".careers .overlay-wrap .bxslider",{
						controls: false,
						auto: true,
						pause : 6000,
						autoHover : true
					});
				}
			};

			
		};

		
		
		var appendOverlay = function(element){
		    var overlay = new fullOverlay(element);		    
		    overlay.init();
		};
		
		this.click(function(e){
			if (e.which == 1 || e.which == 0){
				appendOverlay($(this));
				e.preventDefault();
			}
			
			return false;
		});

		

	};
	

}(jQuery));


/*
Doris
*/

(function ($) {
    var widgets = {

        values:{brakefluid:null,collant:null,isComplete:false},

        cappedPriceInit: function () {            

            var urlAllVehicles = instance.serviceLocator('capped.pricevehicles'),
                urlModel = instance.serviceLocator('capped.pricemodel'),
                urlPDF = instance.serviceLocator('capped.pricepdf');

            if (!urlAllVehicles || !urlModel) { return; }

            var markup = $("#cappedprice-template").html();
            $.template("cappedpriceTemplate", markup);
            $.tmpl("cappedpriceTemplate").appendTo($(".widget-cappedPrice .content-inside"));

            $('.widget-cappedPrice .completed').hide();
            $('.widget-cappedPrice .selection').show();
            
            //disable select boxes
            $('.widget-cappedPrice select:not(select:first)').attr('disabled', 'disabled').css('opacity', '.3');

            //get all vehicles
            $('select#yourModel').append("<option class='loading'></option>");
            $.ajax({
                type:"GET",
                url: urlAllVehicles,
                dataType:"json",
                success: function (data) {
                    $('select#yourModel').find('option.loading').remove();
                    $.each(data.vehicles, function (i, item) {
                        var model = item.name;
                        $('select#yourModel').append($('<option></option>').val(model).text(model));
                    });
                }
            });

            //select change event
            $('select#yourModel').bind('change', function () {
                widgets.disableSelects($(this));

                var model = $(this).val(),
                    modelUrl = urlModel.replace('{model}', model);

                //reset 'Style'
                $('select#yourStyle').attr('disabled', false).css('opacity', '1');
                $('select#yourStyle option:not(option:first)').remove();
                $('select#yourStyle').append("<option class='loading'></option>");
                if (model != '') {
                    $.ajax({
                        type: "GET",
                        url: modelUrl,
                        dataType: "json",
                        success: function (data) {
                            $('select#yourStyle').find('option.loading').remove();
                            $.each(data.data.vehicle.style, function (i, item) {
                                var style = item['@id'];
                                $('select#yourStyle').append($('<option></option>').val(i).text(style).attr('id', style));
                            });
                        }
                    });
                }
                else {
                    $('select#yourEngine option:not(option:first)').remove();
                    $('select#yourInterval option:not(option:first)').remove();
                    widgets.disableSelects($(this));
                }
            });

            $('select#yourStyle').bind('change', function () {
                widgets.disableSelects($(this));

                var model = $('select#yourModel option:selected').val(),
                    modelUrl = urlModel.replace('{model}', model),
                    style = $(this).val();

                //reset engine
                $('select#yourEngine').attr('disabled', false).css('opacity', '1');
                $('select#yourEngine option:not(option:first)').remove();
                $('select#yourEngine').append("<option class='loading'></option>");
                if (style != '') {
                    $.ajax({
                        type: "GET",
                        url: modelUrl,
                        dataType: "json",
                        success: function (data) {
                            $('select#yourEngine').find('option.loading').remove();
                            var engines = data.data.vehicle.style[style].engine;
                            $.each(engines, function (i, item) {
                                var en = item['@id'];
                                $('select#yourEngine').append($('<option></option>').val(i).text(en).attr('id', en));
                            });
                        }
                    });
                }
                else {
                    $('select#yourInterval option:not(option:first)').remove();
                    widgets.disableSelects($(this));
                }
            });

            $('select#yourEngine').bind('change', function () {
                widgets.disableSelects($(this));

                var model = $('select#yourModel option:selected').val(),
                    modelUrl = urlModel.replace('{model}', model),
                    style = $('select#yourStyle option:selected').val(),
                    engine = $(this).val();

                //reset interval
                $('select#yourInterval').attr('disabled', false).css('opacity', '1');
                $('select#yourInterval option:not(option:first)').remove();
                $('select#yourInterval').append("<option class='loading'></option>");
                if (engine != '') {
                    $.ajax({
                        type: "GET",
                        url: modelUrl,
                        dataType: "json",
                        success: function (data) {
                            $('select#yourInterval').find('option.loading').remove();
                            var engineObj = data.data.vehicle.style[style].engine[engine],
                                curInterval = engineObj.summary_descriptions,
                                curSummary = engineObj.summary,
                                curBrake = engineObj.summary.brakefluid,
                                curCoolant = engineObj.summary.coolant,
                                curService = engineObj['@service_type'];
                            var options = [];

                            (curService === 'a') ? $('span.service-length').html('12') : $('span.service-length').html('6');

                            $.each(curInterval, function (i, item) {
                                if (item != '') {
                                    options.push({
                                        val: item,
                                        parseVal: parseInt(item, 10),
                                        id: i,
                                        rel: curSummary[i],
                                        text: item
                                    });
                                }
                            });
                            options.sort(function (a, b) {
                                return a.parseVal - b.parseVal;
                            });
                            $.each(options, function (k, opt) {
                                $('select#yourInterval').append($('<option></option>').val(opt.val).text(opt.text).attr({'rel':opt.rel,'id':opt.id}));
                            });

                            //$.each(curInterval, function (i, item) {
                            //    var interval = item;
                            //    if (interval != '') {
                            //        $('select#yourInterval').append($('<option></option>').val(interval).text(interval).attr({ 'rel': curSummary[i], 'id': i }));
                            //    }
                            //});

                            widgets.values.brakefluid = curBrake;
                            widgets.values.collant = curCoolant;

                        }
                    });
                }
                else {
                    widgets.disableSelects($(this));
                }
            });

            $('select#yourInterval').bind('change', function () {
                var model = $('select#yourModel option:selected').val(),
                    encodedModel = encodeURIComponent(model),
                    style = $('select#yourStyle option:selected').attr('id'),
                    encodedStyle = encodeURIComponent(style),
                    engine = $('select#yourEngine option:selected').attr('id'),
                    encodedEngine = encodeURIComponent(engine),
                    interval = $(this).val(),
                    months = $('select#yourInterval option:selected').attr('id'),
                    pdfurl = urlPDF.replace('{model}', encodedModel).replace('{style}', encodedStyle).replace('{engine}', encodedEngine).replace('{months}', months).replace(/\s/g, "%20");

                if (months != '') {
                    $('span.valid-date').html(Date.today().addDays(30).toString('dd-MM-yyyy'));
                    $('span.capped-price span').html($('select#yourInterval option:selected').attr('rel'));
                    $('a.print-pdf-btn').attr('href', pdfurl);
                    var intervalNoSpace = interval.replace(/\s/g, "");
                    $('span.interval').html(intervalNoSpace);
                    //$('.widget-cappedPrice .completed').fadeIn(300);
                    //$('.widget-cappedPrice .selection').fadeOut(300);
                    $('.widget-cappedPrice .completed').show();
                    $('.widget-cappedPrice .selection').hide();
                    widgets.values.isComplete = true;
                    if (!instance.isMobile()) {
                        instance.widgetsInit();
                    }
                }
                else {
                    //$('.widget-cappedPrice .completed').fadeOut(300);
                    $('.widget-cappedPrice .completed').hide();
                }
            });

            $('.btn.start-over-btn').bind('click', function (e) {
                e.preventDefault();
                widgets.disableSelects($('select#yourModel'));
                $('select#yourModel').val('');
                $('select#yourStyle').val('');
                $('select#yourEngine').val('');
                $('select#yourInterval').val('');
            });

            //$('.btn.open-popup').bind('click', function (e) {
            //    e.preventDefault();
            //    $("#terms-conditions-content").foundation('reveal', 'open', {
            //        animationSpeed: 110
            //    });
            //});

            //$("#terms-conditions-content .close-reveal-modal, .reveal-modal-bg").live("click", function (e) {
            //    e.preventDefault();
            //    $('#terms-conditions-content').foundation('reveal', 'close');
            //});
            
        },

        disableSelects: function (div) {
            //disable remaining selects
            $(div).parent().parent().nextAll().find('select').attr('disabled', 'disabled').css('opacity', '.3');
            if ($('.widget-cappedPrice .selection').is(':hidden')) {
                //$('.widget-cappedPrice .selection').fadeIn(300);
                $('.widget-cappedPrice .selection').show();
            }
            if ($('.widget-cappedPrice .completed').is(':visible')) {
                //$('.widget-cappedPrice .completed').fadeOut(300, function () {
                //    if (!instance.isMobile()) {
                //        instance.widgetsInit();
                //    }
                //});
                $('.widget-cappedPrice .completed').hide();
                if (!instance.isMobile()) {
                    instance.widgetsInit();
                }
            }
            widgets.values.isComplete = false;
        },

        updateDealerOverlay: function () {
            $('.cappedPrice-overlay #extra-costs').hide();
            if (widgets.values.isComplete) {
                $('.cappedPrice-overlay span.brakefluid').html(widgets.values.brakefluid);
                $('.cappedPrice-overlay span.coolant').html(widgets.values.collant);
                $('.cappedPrice-overlay #extra-costs').show();
            }
        }

    };

    $(function () {

        if (!$(".cappedPrice.content-inside").size()) { return; }
        
        widgets.cappedPriceInit();

        $(".widget-cappedPrice .fullscreen-overlay").fullScreenOverlay({
            complete: function () {
                widgets.updateDealerOverlay();                
            }
        });
       
    });
})(jQuery);



/**
 * initiate overlays here for owners
 */

(function($) {

	$(function(){
		$(".general-content .fullscreen-overlay").fullScreenOverlay();
	})

}(jQuery));


/*
 * Author: Doris
 * Description: for phone compatibility table
 * 
 */

(function($) {

    var SYNCSupport = {
        init: function () {
            SYNCSupport.adjustLayout();
            SYNCSupport.tipPopup();
            SYNCSupport.headerFloat();
            SYNCSupport.dropdownRedirect();
        },

        adjustLayout: function () {
            $('.features-grid .table .thead .tr .th:first-child, .features-grid .table .tbody .tr .th').css('height', 'auto');
            $('.features-grid .table').each(function () {
                var maxHeight = 0;
                $('.tbody .tr .th', $(this)).each(function () {
                    if ($(this).outerHeight() > maxHeight) {
                        maxHeight = $(this).outerHeight();
                    }
                });
                $('.thead .tr .th:first-child, .tbody .tr .th', $(this)).css('height', maxHeight);
            });
        },

        dropdownRedirect: function () {
            if (!$('form#compatibility select').length) { return; }

            $('form#compatibility select').change(function (e) {
                var value = this.value;
                var href = '';
                if (value.length > 0) {
                    $('option', this).each(function () {
                        if (value === this.value) {
                            href = $(this).attr('href');
                        }
                    });
                }
                if (href.length > 0) {
                    location.href = href;
                }
            });
        },

        headerFloat: function () {

            if (!$('.package-info').length && !$('.package-titles').length) { return; }

            var headerInfo = $('.package-info');
            var headerTitle = $('.package-titles');
            var headerTop = $('.package-info').offset().top;
            var phoneContent = $('.phone-content');
            $(window).scroll(function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > headerTop) {
                    headerInfo.addClass('fixed');
                    headerTitle.addClass('fixed');
                    headerTitle.css('top', headerInfo.outerHeight());
                    var topMargin = headerInfo.outerHeight();
                    if (headerTitle.is(':visible')) {
                        topMargin += headerTitle.outerHeight();
                    }
                    $('.features-grid').parent().css('margin-top', topMargin);
                    headerInfo.css('visibility', 'visible');
                    headerTitle.css('visibility', 'visible');
                    if (scrollTop > (phoneContent.offset().top + phoneContent.outerHeight())) {
                        headerInfo.css('visibility', 'hidden');
                        headerTitle.css('visibility', 'hidden');
                    }
                }
                else {
                    headerInfo.removeClass('fixed');
                    headerTitle.removeClass('fixed');
                    headerTitle.css('top', 'auto');
                    $('.features-grid').parent().css('margin-top', 'auto');
                    headerInfo.css('visibility', 'visible');
                    headerTitle.css('visibility', 'visible');
                }
            });

        },

        tipPopup: function () {

            if (!$('.features-grid .has-tip').length) { return; }

            var popupHTML = "<div style='display:none;' class ='optional-popup'><div class='top'></div><div class='middle'></div><div class='bottom'></div></div>"
            var popupHTMLMirror = "<div style='display:none;' class ='optional-popup-adjust'><div class='top'></div><div class='middle'></div><div class='bottom'></div></div>"
            $('body').append(popupHTML + popupHTMLMirror);

            
            if (Modernizr.touch) {
                $('body').on('touchstart swipe', function () {
                    if ($('div.optional-popup, div.optional-popup-adjust').is(':visible')) {
                        $('div.optional-popup, div.optional-popup-adjust').hide();
                        $('div.optional-popup div.middle, div.optional-popup-adjust div.middle').html('');
                    }
                });
                $('.features-grid .has-tip span').on('click', function (e) {
                    e.stopPropagation(); e.preventDefault();
                    openTip($(this));
                    return false;
                });
            }
            else {
                $('.features-grid .has-tip span').on('mouseover', function (e) {
                    e.stopPropagation(); e.preventDefault();
                    openTip($(this));
                    return false;
                });
                $('.features-grid .has-tip span').on('mouseleave', function () {
                    if ($(this).parent().find('div.tips').length < 1) { return; }
                    $('div.optional-popup, div.optional-popup-adjust').hide();
                    $('div.optional-popup div.middle, div.optional-popup-adjust div.middle').html('');
                });
            }
            
            function openTip($ele) {
                if ($ele.parent().find('div.tips').length < 1) { return; }

                var thisIcon = $ele.parent().find('span')[0];
                var leftPosition = getElementLeft(thisIcon);
                var topPosition = getElementTop(thisIcon);
                var browserWidth = $(window).width();
                var rightPosition = browserWidth - leftPosition;
                var popContent = $ele.parent().find('div.tips').html();
                var dValue = 32;

                if (rightPosition < 220 && $("body").hasClass("ltr")) {
                    dValue = 205;
                    $("div.optional-popup-adjust div.middle").html(popContent);
                    var popHeight = $("div.optional-popup-adjust").height();
                    var newTopPosition = topPosition - popHeight;
                    var newLeftPosition = leftPosition - dValue;
                    var popHeight = $("div.optional-popup-adjust").css({ 'left': newLeftPosition + 'px', 'top': newTopPosition + 'px' }).show();
                }
                else {
                    $("div.optional-popup div.middle").html(popContent);
                    var popHeight = $("div.optional-popup").height();
                    var newTopPosition = topPosition - popHeight;
                    var newLeftPosition = leftPosition - dValue;
                    var popHeight = $("div.optional-popup").css({ 'left': newLeftPosition + 'px', 'top': newTopPosition + 'px' }).show();
                }
            }

            function getElementLeft(element) {
                var actualLeft = element.offsetLeft;
                if ($('body').is('.smobile')) {
                    actualLeft = $(element).offset().left;
                }
                var current = element.offsetParent;
                while (current !== null) {
                    actualLeft += current.offsetLeft;
                    current = current.offsetParent;
                }
                return actualLeft;
            }

            function getElementTop(element) {
                var actualTop = element.offsetTop;
                var current = element.offsetParent;
                while (current !== null) {
                    actualTop += current.offsetTop;
                    current = current.offsetParent;
                }
                return actualTop;
            }

        }
    };

	$(function(){
	    SYNCSupport.init();
	})

}(jQuery));


/*
 * Author: Doris
 */

(function($) {

    var Video = {

        init: function () {

            if (!$('.video-carousel a').length || !$('.video-overlay').length) { return; }
            
            Video.preOpenOverlay();

            $('.video-carousel, .video-carousel ul.bxslider, .video-carousel ul.bxslider li').click(function (e) {
                e.preventDefault();
            });

            $('.video-carousel ul.bxslider li a').click(function (e) {
                e.preventDefault();
                Video.openOverlay($(this).attr('href'));
                return false;
            });

            if ($('body').is('.ie8')) {
                $('body').live('click', function (e) {
                    if ($('.video-overlay').is(':visible') && !$(e.target).parents().is($(".video-overlay"))) {
                        Video.unloadOverlay();
                    }
                });
                $(".video-overlay .close-reveal-modal").live("click", function (e) {
                    e.preventDefault();
                    Video.unloadOverlay();
                    return false;
                });
            }
            else if (Modernizr.touch) {
                $('body').on("touchstart", function (e) {                    
                    if ($('.video-overlay').is(':visible') && !$(e.target).parents().is($(".video-overlay"))) {
                        e.preventDefault();
                        Video.unloadOverlay();
                        return false;
                    }
                });
                $(".video-overlay .close-reveal-modal").live("click", function (e) {
                    e.preventDefault();
                    Video.unloadOverlay();
                    return false;
                });
            }
            else {
                $(".video-overlay .close-reveal-modal, .reveal-modal-bg").live("click", function (e) {
                    e.preventDefault();
                    Video.unloadOverlay();
                    return false;
                });
            }

        },

        preOpenOverlay: function () {
            if (window.location.toString().indexOf('overlay') > -1) {
                var location = window.location.toString();
                var videoId = location.substring(location.indexOf('overlay') + 'overlay'.length + 1);
                //console.log(videoId);
                Video.openOverlay(videoId);
            }
        },

        openOverlay: function (videoId) {
            if (videoId.length == 0) { return; }

            var videoOverlayTemplate = $('#video-overlay-content-template').html();
            $.template('video-overlay-content-template', videoOverlayTemplate);
            $('.video-overlay .content').html($.tmpl('video-overlay-content-template', { id: videoId }));

            if ($('body').is('.smobile')) {
                if ($(window).innerWidth() > $(window).innerHeight()) {
                    $('.video-overlay.reveal-modal').css('height', $(window).innerHeight() - $('.video-overlay.reveal-modal .close-reveal-modal').height() - 5);
                }
                else {
                    $('.video-overlay.reveal-modal').css('height', $(window).innerHeight() * 0.6);
                }
            }

            $(".video-overlay").foundation('reveal', 'open', {
                animationSpeed: 110
            });

            var location = window.location.toString().substring(0, window.location.toString().indexOf('#'));
            if (Modernizr.history) {
                history.pushState(null, "overlay", location);
                history.pushState(null, "overlay", location + "#overlay=" + videoId);
            }
            else {
                var state = {};
                state["overlay"] = videoId;
                $.bbq.pushState(state);
            }
            
        },

        unloadOverlay: function () {
            $('.video-overlay .content').empty();            
            if ($('body').is('.ie8')) {
                $('.video-overlay.reveal-modal').removeClass('open').hide();
                $('.reveal-modal-bg').hide();
            }
            else {
                $('.video-overlay').foundation('reveal', 'close');
            }
            $('.video-overlay.reveal-modal').css('height', '');

            var location = window.location.toString().substring(0, window.location.toString().indexOf('#'));
            if (Modernizr.history) {
                //history.replaceState(null, "overlay", "");
                //history.back();
                history.pushState(null, "overlay", location);
            }
            else {
                //window.location.hash = '';
                //$.bbq.removeState("overlay");
                var state = {};
                state["overlay"] = null;
                $.bbq.pushState(state);
            }

        }

    };

	$(function(){
	    Video.init();
	})

}(jQuery));

