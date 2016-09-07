/*
 * functionalities of dealerlocator Bing
 * author : Ray
 * dependencies: jquery, underscorejs, uniformjs, bingMapController, bingMaps
 */
(function($) {
	/**
	 * to filter dealers
	 * @param dealers, dealer object, contains all dealer information
	 */
	guxApp.dealerLocator.resultsFiltering = function(dealers,errorMsg){
		var self = this,
			errmessage = errorMsg||self.config.error_message.nearest_dealer_not_found,
			dealerName = $("input[type='text']",".name-search"),
			dealerNamePlaceholder = dealerName.attr("placeholder-value"),
			dealerNameVal = dealerName.val(),
			dealerNameplateVal = $("select",".vehicle-search").val(),
			filteredByName = [],
			filteredByNameplate = [];
		//reset placeholder value on IE
		if(dealerNamePlaceholder && dealerNamePlaceholder == dealerNameVal){
			dealerNameVal = "";
		}
		
		//filter by dealerName
		if(dealerNameVal && dealerNameVal.length > 0){
			$.each(dealers,function(){
				if (guxApp.tools.isAutoNaviMap()) {
					if(this._name.indexOf(dealerNameVal) != -1){
						filteredByName.push(this);
					}
				}
				else {
					if(this.DealerName.indexOf(dealerNameVal) != -1){
						filteredByName.push(this);
					}
				}
			});
			dealers = filteredByName;
		}
		//filter by dealerNameplate
		if(dealerNameplateVal && dealerNameplateVal.length > 0){
			$.each(dealers,function(){
				if (guxApp.tools.isAutoNaviMap()) {
					if (this.DealerNewVehicle.toString().indexOf(dealerNameplateVal) != -1) {    //this.DealerSpeciality
						filteredByNameplate.push(this);
					}
				}
				else {
					if (this.DealerRangeNew.indexOf(dealerNameplateVal) != -1) {    //this.DealerSpeciality
						filteredByNameplate.push(this);
					}
				}
			});
			dealers = filteredByNameplate;
		}
		self.processResults(dealers,errmessage);
	};
	/**
	 * to get Province and City from pre defined json on the page
	 */
	guxApp.dealerLocator.getOptData = function(){
		var self = this,
			dataConfig = $("#cityDropdownData"),
			dataArr = [],
			province = $("select[name='province']",self.searchContainer),
			city = $("select[name='city']",self.searchContainer);
		//initial disable city
		city.prop("disabled","disabled").closest(".dropdown").addClass("disabled");
		if (dataConfig.length > 0 && dataConfig.embeddedData().list && dataConfig.embeddedData().list.length) {
			dataArr = dataConfig.embeddedData().list[0].states;
		}
		//import Province data
		if (dataArr.length > 0){
			$.each(dataArr,function(key,val){
				$("<option value='"+val[1].name+"'>"+val[1].name+"</option>").appendTo(province); 
			});
		}
		//import City data
		province.on("change",function(){
			var provinceVal = $(this).val(),
				endLoop = false;
			city.val("");//select the default value
			city.uniform.update();//update select val in uniform
			$.each(dataArr,function(key,val){
				if(provinceVal==val[1].name){
					city.children("option:gt(0)").remove();
					$.each(val[1].cities,function(key,val){
						$("<option value='"+val[1].name+"'>"+val[1].name+"</option>").appendTo(city);
					});
					endLoop = true;
				}
				if(endLoop){return false;}
			});
			//enable city
			province.val() == ""?city.prop("disabled","disabled").closest(".dropdown").addClass("disabled"):city.prop("disabled",false).closest(".dropdown").removeClass("disabled");
		});
	};
	/**
	 * to get Country and State&City from pre defined json on the page
	 */
	guxApp.dealerLocator.getOptDataQL = function(){
		var self = this,
			dataConfig = $("#countryCityDropdownData"),
			dataArr = [],
			country = $("select[name='country']",self.searchContainer),
			statecity = $("select[name='statecity']",self.searchContainer);
		//initial disable statecity
		statecity.prop("disabled","disabled").closest(".dropdown").addClass("disabled");
		if (dataConfig.length > 0 && dataConfig.embeddedData().list && dataConfig.embeddedData().list.length) {
			dataArr = dataConfig.embeddedData().list[0].countries;
		}
		//import Country data
		if (dataArr.length > 0){
			$.each(dataArr,function(key,val){
				$("<option value='"+val[1].name+"'>"+val[1].name+"</option>").appendTo(country); 
			});
		}
		//import State&City data
		country.on("change",function(){
			var countryVal = $(this).val(),
				endLoop = false;
			statecity.val("");//select the default value
			statecity.uniform.update();//update select val in uniform
			$.each(dataArr,function(key,val){
				if(countryVal==val[1].name){
					statecity.children("option:gt(0)").remove();
					if(val[1].cities.length>0) {
						$.each(val[1].cities,function(key,val){
							$("<option value=city>"+val[1].name+"</option>").appendTo(statecity);
						});
					}
					else if(val[1].states.length>0){
						$.each(val[1].states,function(key,val){
							$("<option value=state>"+val[1].name+"</option>").appendTo(statecity);
						});
					
					}
					endLoop = true;
				}
				if(endLoop){return false;}
			});
			//enable statecity
			country.val() == ""?statecity.prop("disabled","disabled").closest(".dropdown").addClass("disabled"):statecity.prop("disabled",false).closest(".dropdown").removeClass("disabled");
		});
	};
	/**
	 * get vehicle offering from data returned
	 * @param dealer, dealer object contains all dealer infomation
	 */
	guxApp.dealerLocator.getVehiOffer = function(dealer){
		var self = this,
			vehicleOffer = {};
		dealer.PerOwnedVehicle = "type1,type2";// mocked data ,needs to be removed
		if (dealer.DealerRangeNew && dealer.DealerRangeNew.length > 0) {  //dealer.DealerRangeNew
			vehicleOffer.newCars = {
				"name" : self.config.newCars,
				"value": dealer.DealerRangeNew.split(',')
			}
		}
		if(dealer.PerOwnedVehicle && dealer.PerOwnedVehicle.length > 0){
			vehicleOffer.preOwnedCars = {
				"name" : self.config.preOwnedCars,
				"value" : dealer.PerOwnedVehicle.split(',')
			}
		}
		return vehicleOffer;
	};
	
	$(function(){
		var self = guxApp.dealerLocator;
		self.mapWrapper = $(".dealer-locator.alt-theme");
		if(self.mapWrapper.length == 0){return;}
		
		self = guxApp.dealerLocator;
		self.hasResults = false;
		self.mapController = guxApp.googleMapController;
		self.searchContainer = $(".dealer-unaware",self.mapWrapper);
		self.resultsContainer = $(".dealer-result-container",self.mapWrapper);
		self.errorContainer = $(".error",'.location-search',self.searchContainer);
		self.selResContainer = $(".selected",self.resultsContainer);
		self.colorLengend = $(".color-lengend",self.mapWrapper);
		if(!$('.store-locator-form').length || !$("#countryCityDropdownData").length) {
		self.getOptData();
		}
		else {
		self.getOptDataQL();
		//quicklane get country and city list
		}
		
		$(".title",self.searchContainer).on("click",function(){
			var title = $(this),
				subOpt = title.siblings(".sub-options");
			//before animation
			if(self.hasResults){
				if(subOpt.is(":visible")){
					self.resultsContainer.show();
				}else{					  
					self.resultsContainer.hide();
				}
			}
			subOpt.slideToggle(function(){
				//after animation
				if(subOpt.is(":visible")){//expand suboptions
					title.addClass("active");
				}else{					  //collapse suboptions
					title.removeClass("active");
				}
			});
		});
		//click event has been used by uniform.
		// $(".sub-options label",self.searchContainer).on("mouseup",function(e){
			// if(e.button!=2){//prevent from right click
		$(".sub-options label",self.searchContainer).on("click",function(e){
				if(e.target.tagName==="INPUT") {
				var label = $(this),
					nestedOpt = label.siblings(".nested-options");
				//before animation
				if(nestedOpt.is(":hidden")){
					label.addClass("active");
				}else{
					label.removeClass("active");
				}
				nestedOpt.slideToggle(function(){
					//after animation
					if(nestedOpt.length > 0 && nestedOpt.is(":hidden")){//collapsed
						nestedOpt.find("select,input[type='text']").val("").uniform.update();;//remove value
					}
				});
			 }
		});
		
		//submit
		$(".actions-bar .button",self.searchContainer).on("click",function(e){
			var formDataArr = $("select",".location-search").serializeArray(),
				province = $("select[name='province']",self.searchContainer),
				city = $("select[name='city']",self.searchContainer),
				keywordStr = "",
				country = $("select[name='country']",self.searchContainer),
				statecity = $("select[name='statecity']",self.searchContainer);

			self.filters = [];
			self.closeTabs();
				
			e.preventDefault();
			if(!$('.store-locator-form').length || !$("#countryCityDropdownData").length) {
				if(province.val()==""||city.val()==""){
					province.closest(".location-search").find(".error").addClass("active").find('.text').text(self.config.error_message.isMandatory);//temp move errormsg to config
				}else{
					$.each(formDataArr,function(key,val){
						if(val.value!=""){
							keywordStr = keywordStr + val.value;
						}
					});
					self.loadedDealers = [];
					if (guxApp.tools.isAutoNaviMap()) {
					// Search based on center point of province and city  (dealer properties) --Autonavi map
					self.mapController.searchDealersByLocation(keywordStr, false, {AdministrativeArea: province.val()||"", Locality: city.val()||""}, {}, function (dealers,errorMsg) {
						self.is_selectLocation = true;
						self.resultsFiltering(dealers,errorMsg);
					});
					}
					else {
					// Search based on province and city (dealer properties) --Thailand google map
					self.mapController.searchDealersByProperties({AdministrativeArea: province.val(), Locality: city.val()}, {}, function(dealers,errorMsg) {
						self.is_selectLocation = true;
						self.resultsFiltering(dealers,errorMsg);
					});
					}
				}
			}
			else {
			//quicklane get country and city
				if(country.val()==""||statecity.val()==""){
					province.closest(".location-search").find(".error").addClass("active").find('.text').text(self.config.error_message.isMandatory);//temp move errormsg to config
				}else{
					self.loadedDealers = [];
					if(statecity.val()=='city') {
						self.mapController.searchDealersByProperties({Country: country.val(), Locality: $("select[name='statecity'] option:selected").text()}, {}, function(dealers,errorMsg) {
							self.is_selectLocation = true;
							self.resultsFiltering(dealers,errorMsg);
						});
					}
					else if(statecity.val()=='state') {
						self.mapController.searchDealersByProperties({Country: country.val(), AdministrativeArea: $("select[name='statecity'] option:selected").text()}, {}, function(dealers,errorMsg) {
							self.is_selectLocation = true;
							self.resultsFiltering(dealers,errorMsg);
						});
					}
				}
			}
		});

		if (sessionStorage['search_province']) {
		    $('select[name=province]', self.searchContainer).val(sessionStorage['search_province']).blur();
		    $('select[name=province]', self.searchContainer).change();
		    $('select[name=province]', self.searchContainer).uniform.update();
		    sessionStorage.removeItem('search_province');
		}
		if (sessionStorage['search_city']) {
		    $('select[name=city]', self.searchContainer).val(sessionStorage['search_city']).blur();
		    $('select[name=city]', self.searchContainer).uniform.update();
		    sessionStorage.removeItem('search_city');
		}
		if (sessionStorage['search_vehicle']) {
		    $('select[name=vehicle]', self.searchContainer).val(sessionStorage['search_vehicle']).blur();
		    $('select[name=vehicle]', self.searchContainer).uniform.update();
		    sessionStorage.removeItem('search_vehicle');
		}
		if (sessionStorage['search_location']) {
		    $('input[name=location]', self.searchContainer).val(sessionStorage['search_location']).blur();
		    sessionStorage.removeItem('search_location');
		}
		$.urlParam = function(name){
			    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
			    if (results==null){
			       return null;
			    }
			    else{
			       return results[1] || 0;
			    }
			};
		var specialitiesID = !!$.urlParam('specialities')?decodeURI($.urlParam('specialities')):'';
		
		if(guxApp.tools.isAutoNaviMap()){
			$(".vehicle-search label",self.searchContainer).addClass("active").siblings(".nested-options").slideToggle();
			$("#vehicle-search").attr("checked","true");
			$("#uniform-vehicle-search").children("span").addClass("checked");
			$(".name-search label",self.searchContainer).addClass("active").siblings(".nested-options").slideToggle();
			$("#name-search").attr("checked","true");
			$("#uniform-name-search").children("span").addClass("checked");
				
			if(specialitiesID.length!=0){
				var label = $(".vehicle-search label",self.searchContainer),
				nestedOpt = label.siblings(".nested-options");
				// label.addClass("active");
				// $("#vehicle-search").attr("checked","true");
				// $("#uniform-vehicle-search").children("span").addClass("checked");
				// nestedOpt.slideToggle(function(){
					//after animation
					if(nestedOpt.length > 0){//collapsed
						$(".vehicle-search label").siblings(".nested-options").find("select").find("option[value='"+specialitiesID+"']").attr("selected","true").click();
					}
				// });
			}
		}	

	});
}(jQuery));		
		
