/*
Author: Ruiwen Qin
File name: brochure-request.js
Description: 1. Retrieve the models information and render the models selection carousel by using bxslider
			 2. digital download and mail form switch
*/

(function($){
	var brochures = {
		
		activeVehicle:0,

		modelData:{},

		filteredData:{},

		currentPage:0,

		formTypeStore:Object.create(ND.cacheStore),

		init: function(){
			if (!$("body.brochure-request").size()) {return;}
// window.history.pushState(null,"test","?ctx=m:1212121193819");
			var dataUrl = '',
				container = $(".brochure-request .models"),
				formType = 'digital';

			var formSwitchBtn = $(".brochure-request .delivery");

			// form.type cookie for saving the form selection type
			brochures.formTypeStore.key = "form.type";
			brochures.formTypeStore.expires = 365;
			brochures.formTypeStore.domin = instance.commonConfig().cookieDomain;

			//retrieve the rest call url
			dataUrl = brochures.getDataUrl();

			if (dataUrl){
				$.ajax({
					type: "GET",
					url: dataUrl,
					dataType: "json",
					success: function(data){
						brochures.modelData.items = data;
						brochures.modelData.isMobile = instance.isMobile();

						//retrieving the form type selection
						if (brochures.formTypeStore.is()){
							formType = $.trim($.cookie(brochures.formTypeStore.key));
						}

						brochures.renderContent(container,formType);

					},
					error: function(XMLHttpRequest, textStatus, errorThrown){
						$(".loading",container).hide();
						$(".alert-text",container).show();
					}
				});
			}
			
			//switch forms and carousel by clicking the delivery buttons
			$(".select-icon",formSwitchBtn).click(function(){
				var btn = $(this);
					// digitalForm = formSwitch.first(),
					// mailForm = formSwitch.last();

				if (btn.hasClass("active")){
					return;
				}
				else{
					btn.parent().siblings().children(".select-icon").removeClass("active");
					btn.addClass("active");

					if(btn.hasClass("digital")){
						brochures.renderContent(container,"digital");
						
					}

					if (btn.hasClass("mail")){
						brochures.renderContent(container,"mail");
						
					}
				}
			});

			//mobile/tablet/desktop view switch when resizing window
			var timer;
			if (!$("html").hasClass("lt-ie9")){
				$(window).bind('resize',function(){
					timer && clearTimeout(timer);
					timer = setTimeout((function(){
						if ($(window).width() < 768){
							var type = $(".active",formSwitchBtn).data("type");
							brochures.modelData.isMobile = true;
							brochures.renderContent(container,type);
							
						}

						if ($(window).width() >= 768){
							var type = $(".active",formSwitchBtn).data("type");
							brochures.modelData.isMobile = false;
							brochures.renderContent(container,type);
							
						}
					}),100);
				});
			}

			

		},
		formSwitch: function(type){
			var formSwitchBtn = $(".brochure-request .delivery"), 
				forms = $(".brochure-request .form-switch .section"),
				digitalForm = forms.first(),
				mailForm = forms.last();
			
			$(".select-icon",formSwitchBtn).removeClass("active");
			$("."+type,formSwitchBtn).addClass("active");

			brochures.formTypeStore.set(type);

			if (type === "digital"){
				digitalForm.show();
				mailForm.hide();
			}
			else {
				mailForm.show();
				digitalForm.hide();
			}


		},
		getVehicleInfo: function(){
			//retrieve model/derivative id from url parameters
			var paramIndex = location.href.search("ctx=");
			
			if (paramIndex == -1){
				return false;
			}
			else {
				var params = location.href.substring(paramIndex);
				var index = params.indexOf("&");
				if (index == -1){
					//ctx parameter is the last parameter in url
					return params.substring(4);
				}
				else {
					return params.substring(4,index);
				}
			}
			
			
		},
		getDataUrl: function(){
			//retrieve the url set in common config 
			var config = instance.commonConfig();
			var url = instance.serviceLocator("brochure.request");
			if (url){
				url = url.replace('{tooltype}',config.tooltype).replace('{site}',config.site).replace('{priceZone}',config.priceZone);
			}
			
			return url;
		},
		clearSelection: function(container){
			$(".loading",container).show();
			$(".wrapper",container).remove();
			$(".vehicle",container).remove();
			$(".model-list",container).remove();
			
		},
		renderContent: function(container,type){
			//render the template with the data returned and trigger the bxslider
			var markup = $("#model-select").html(),
			    options = {};

			brochures.clearSelection(container);
			

			brochures.filteredData.items = [];
			brochures.filteredData.isMobile = brochures.modelData.isMobile;

			if (type === "mail"){
				if (brochures.modelData.items){
					for (var i = 0; i < brochures.modelData.items.length; i++){
						if (brochures.modelData.items[i].hasPaperBrochure){
							brochures.filteredData.items.push(brochures.modelData.items[i]);
						}
					}
				}

			}
			else{
				
				if (brochures.modelData.items){
					for (var i = 0; i < brochures.modelData.items.length; i++){
						
						if (typeof brochures.modelData.items[i].brochureUrl !== 'undefined'){
							brochures.filteredData.items.push(brochures.modelData.items[i]);
						}
					}
				}
			}

			$(".loading",container).show();


			//render jQuery template
			if (brochures.filteredData.items.length > 0){
				$.template("modelsTemplate",markup);
				$.tmpl("modelsTemplate",brochures.filteredData).appendTo(container);
			}
			
			brochures.formSwitch(type);

			if (!brochures.filteredData.isMobile){
				var vehicleItems = $("li",container);
				
				if ($(window).width() <= 1024){
					options.minSlides = 4;
					options.maxSlides = 4;
					options.moveSlides = 4;
				}
				else {
					options.minSlides = 5;
					options.maxSlides = 5;
					options.moveSlides = 5;
				}

				brochures.initialSlider(options,container);

				// handler of vehicle item clicking
				vehicleItems.click(function(){
					var item = $(this);
					brochures.activeVehicle = item.index();

					item.siblings().removeClass("active");
					item.addClass("active");

					//update the values of hidden fields
					brochures.updateFormFields();

					return false;
				});

			}

			if (brochures.filteredData.isMobile){
				
				// $(".loading",container).hide();

				var changeVehicle = $(".model-list .select",container),
				    dropdown = $(".dropdown",container),
				    vehicle = $(".vehicle",container),
				    image = $("img",vehicle),
				    title = $("h3 span",vehicle),
				    vehicleItems = $("li",dropdown);

				dropdown.jScrollPane({
					autoReinitialise:true
				});

				brochures.preSelectVehicle(container);

				//toggle dropdown
				changeVehicle.click(function(){
					dropdown.toggleClass("dropdownOn");
				});

				//update hidden fields values in form
				vehicleItems.click(function(){
					var item = $(this),
						imgUrl = $("img",item).attr("src"),
						itemTitle = $("span",item).text();

					brochures.activeVehicle = item.index();
					
					image.attr("src","");
					$(".loading",container).show();

					image.attr("src",imgUrl);
					title.text(itemTitle);
					dropdown.toggleClass("dropdownOn");

					$(".loading",container).hide();

					brochures.updateFormFields();
				});
				
			}
			
		},
		updateFormFields: function(){
			var brochureDid = $("form .Brochure_dId"),
				brochureDyear = $("form .Brochure_dYear"),
				brochureDckscode = $("form .Brochure_dCksCode"),
				brochureDbrochurecode = $("form .Brochure_dBrochureCode"),
				brochureDtestdrivecode = $("form .Brochure_dTestDriveCode"),
				brochureDquotecode = $("form .Brochure_dQuoteCode"),
				brochureDname = $("form .Brochure_dName"),
				brochureMid = $("form .Brochure_mId"),
				brochureMname = $("form .Brochure_mName"),
				brochureMckscode = $("form .Brochure_mCksCode"),
				brochureUrl = $("form .Brochure_brochureUrl"),
				brochureMakeName = $("form .Brochure_makeName"),
				brochureMakeckscode = $("form .Brochure_makeName");

			var activeVehicleData = brochures.filteredData.items[brochures.activeVehicle];

			brochureDid.val(activeVehicleData.dId);
			brochureDyear.val(activeVehicleData.dYear);
			brochureDckscode.val(activeVehicleData.dCksCode);
			brochureDbrochurecode.val();
			brochureDtestdrivecode.val();
			brochureDquotecode.val();
			brochureDname.val(activeVehicleData.dName);
			brochureMname.val(activeVehicleData.mName);
			brochureMid.val(activeVehicleData.mId);
			brochureMckscode.val(activeVehicleData.mCksCode);
			brochureUrl.val(activeVehicleData.brochureUrl);
			brochureMakeName.val();
			brochureMakeckscode.val();

		},
		initialSlider: function(options,container){
			brochureSlider = $(".bxslider",container).bxSlider({
				minSlides: options.minSlides,
				maxSlides: options.maxSlides,
				moveSlides: options.moveSlides,
				slideWidth: 155,
				hideControlOnEnd: false,
				infiniteLoop: false,
				slideMargin:4,
				useCSS:false,
				pager: ($(".bxslider",container).children().length > options.minSlides) ? true : false,
				controls: ($(".bxslider",container).children().length > options.minSlides) ? true : false,
				onSliderLoad: function(currentIndex){
					brochures.preSelectVehicle(options,container);
				}
			});
			
		},
		reTriggerSlider: function(options,container,found){
			brochureSlider.reloadSlider({
				minSlides: options.minSlides,
				maxSlides: options.maxSlides,
				moveSlides: options.moveSlides,
				slideWidth: 155,
				hideControlOnEnd: false,
				infiniteLoop: false,
				slideMargin:4,
				useCSS:false,
				startSlide:brochures.currentPage,
				pager: ($(".bxslider",container).children().length > options.minSlides) ? true : false,
				controls: ($(".bxslider",container).children().length > options.minSlides) ? true : false,
				onSliderLoad: function(currentIndex){
					$(".wrapper",container).animate({
						"opacity":1,
						"filter":"alpha(opacity=100)"
					},500);
					$(".loading",container).hide();
				}
			});


		},
		preSelectVehicle: function(options,container){
			var vehicleId = brochures.getVehicleInfo();

			//pre-select vehicle item
			if (vehicleId){
				var splitIndex = vehicleId.search(";");
				var mid = '';
				var did = '';
				var found = false;
				var sliderWidth = $(".bx-viewport",container).width();

				if (splitIndex == -1){
					mid = vehicleId.substring(2);
				}
				else{
					did = vehicleId.substring(vehicleId.search("d")+2);
				}


				$(".model-items li",container).each(function(index,elem){
					var _this = $(this);

					if (did !== ''){
						if (_this.data("did") == did){
							_this.addClass("active");
							found = true;
							brochures.activeVehicle = index;
							
							if (!brochures.modelData.isMobile){
								//scroll to the selected vehicle page
								$(".bxslider").animate({
									left:-_this.position().left + sliderWidth - _this.width() +"px"
								},function(){
									brochures.currentPage = Math.floor(_this.position().left / sliderWidth);
									brochures.reTriggerSlider(options,container,found);
								});
								
							}
							else{
								var primaryImg = $(".vehicle img",container),
									primaryTitle = $(".vehicle h3 span",container);

								primaryImg.attr("src",$("img",_this).attr("src"));
								primaryTitle.text($("span",_this).text());

								$(".loading",container).hide();
							}
							

							brochures.updateFormFields();
							
						}
					}
					else{

						if (_this.data("mid") == mid && _this.data("did") == ''){
							_this.addClass("active");
							found = true;
							brochures.activeVehicle = index;
							
							
							if (!brochures.modelData.isMobile){
								//scroll to the selected vehicle page
									$(".bxslider").animate({
										left:-_this.position().left + sliderWidth - _this.width() +"px"
									},function(){
										brochures.currentPage = Math.floor(_this.position().left / sliderWidth);
										brochures.reTriggerSlider(options,container,found);
									});

							}
							else{
								var primaryImg = $(".vehicle img",container),
									primaryTitle = $(".vehicle h3 span",container);

								primaryImg.attr("src",$("img",_this).attr("src"));
								primaryTitle.text($("span",_this).text());

								$(".loading",container).hide();
							}

							brochures.updateFormFields();
						}
					}
					
				});

				if (!found){
					if (!brochures.modelData.isMobile){
						var _this = $(".bxslider li:first",container);
						_this.addClass("active");

						$(".bxslider").animate({
							// left:-_this.position().left + sliderWidth - _this.width() +"px"
						},function(){
							brochures.currentPage = 0;
							brochures.reTriggerSlider(options,container,found);
						});
					}
					else{
						var primaryImg = $(".vehicle img",container),
							primaryTitle = $(".vehicle h3 span",container);

						primaryImg.attr("src",$(".model-items li:first img").attr("src"));
						primaryTitle.text($(".model-items li:first span").text());

						$(".loading",container).hide();
					}

					brochures.updateFormFields();
				}
			}
			else{
				if (!brochures.modelData.isMobile){
						var _this = $(".bxslider li:first",container);
						_this.addClass("active");

						$(".bxslider").animate({
							left:-_this.position().left + sliderWidth - _this.width() +"px"
						},function(){
							brochures.currentPage = 0;
							brochures.reTriggerSlider(options,container,found);
						});
					}
					else{
						var primaryImg = $(".vehicle img",container),
							primaryTitle = $(".vehicle h3 span",container);

						primaryImg.attr("src",$(".model-items li:first img").attr("src"));
						primaryTitle.text($(".model-items li:first span").text());

						$(".loading",container).hide();
					}

					brochures.updateFormFields();
			}
		}
	};

	$(function(){
		brochures.init();
	});

})(jQuery);