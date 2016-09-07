/*
Author: 		Roy Anonuevo
File name: 		storeLocator.js
Description: 	store-locator functionalities
Dependencies: 	jQuery, jquery.cookie.js, uniformjs
*/
var _da = _da || {};

(function($){
	var storelocator = {

		init: function(){			
			if(!$('.store-locator-form').length || !$("#countryCityDropdownData").length){return;}

			var self = this;

			// cache dom			
			self.$form = $('.store-locator-form');
			self.$country =  self.$form.find("select[name='country']");
			self.$city = self.$form.find("select[name='city']");
			self.$dataConfig = $("#countryCityDropdownData");
			self.dataArr = [];

			// get data and append to the dropdown list
			self.getData();

			self.$form.each(function(i, e){
				var $form = $(e),
					$country = $form.find("select[name='country']");

				// bind listener
				$form.on('submit', self.processForm);				
				$country.on("change", self.populateCity.bind(e));
			});			

			// check if country and city exists
			self.checkCookies();
		},

		getData: function(){
			//initial disable city
			var self = this;

			self.$city.prop("disabled", "disabled").closest(".dropdown").addClass("disabled");

			if (self.$dataConfig.length > 0 && self.$dataConfig.embeddedData().list && self.$dataConfig.embeddedData().list.length) {
				self.dataArr = self.$dataConfig.embeddedData().list[0].countries;
			}

			//import Province data
			if(self.dataArr.length > 0){
				$.each(self.dataArr, function(key,val){
					$("<option value='"+val[1].name+"'>"+val[1].name+"</option>").appendTo(self.$country); 
				});
			}
		},

		processForm: function(e){
			//e.preventDefault();
			var country = $(this).find("select[name='country']").val();
			var	city = $(this).find("select[name='city'] option:selected").text();

			$.cookie('locator-country', country);
			$.cookie('locator-city', city);


		},

		populateCity: function(){
			var self = storelocator,
				$form = $(this),
				$country = $form.find("select[name='country']"),
				$city = $form.find("select[name='city']")
				countryVal = $country.val(),
				endLoop = false;
			
			// select the default value
			$city.val(""); 

			// update select val in uniform
			$city.uniform.update(); 

			$.each(self.dataArr, function(key, val){
				if(countryVal == val[1].name){
					$city.children("option:gt(0)").remove();
					
					if(val[1].cities.length>0) {
						$.each(val[1].cities,function(key,val){
							$("<option value=city>"+val[1].name+"</option>").appendTo($city);
						});
					}
					else if(val[1].states.length>0){
						$.each(val[1].states,function(key,val){
							$("<option value=state>"+val[1].name+"</option>").appendTo($city);
						});
					
					}

					endLoop = true;
				}
				if(endLoop){return false;}
			});

			//enable city
			$country.val() == ""? $city.prop("disabled","disabled").closest(".dropdown").addClass("disabled") : $city.prop("disabled",false).closest(".dropdown").removeClass("disabled");
		},

		checkCookies: function(){
			var self = this;

			if($.cookie('locator-country') && $.cookie('locator-city')){
				var country = $.cookie('locator-country'),
					city = $.cookie('locator-city');

				self.processLocator(country, city);
				
				// remove cookies	
				$.removeCookie('locator-country');
				$.removeCookie('locator-city');
			}
		},

		processLocator: function(country, city){
			if(!$('.dealer-locator').length){return;}

			var $dealerLocator = $('.dealer-locator'),
				$country =  $dealerLocator.find("select[name='country']");
				$city = $dealerLocator.find("select[name='statecity']");

			$country.find("option[value='"+country+"']").attr("selected", "selected");
			$country.trigger("change");
			$country.uniform.update();


			$city.find("option[value='"+city+"']").attr("selected", "selected");
			$city.trigger("change");
			$city.uniform.update();			

			// $dealerLocator.find('.actions-bar .button').trigger("click");

			setTimeout(function(){ $dealerLocator.find('.actions-bar .button').trigger("click"); }, 100);
		}
	}

	$(function(){
		storelocator.init();
	});

})(jQuery);
