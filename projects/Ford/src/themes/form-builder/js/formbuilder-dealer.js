/* formbuilder-dealer-postcode.js */
/**
 * @author Sohrab Zabetian
 * @project formbuilder
 * @description
 * If #dealer-by-postcode-postcode exists, attach to on blur.
		The on blur handler should populate the  #dealer-by-postcode-dealer select based on the REST call (see Dealers (location)). The postcode is passed as a location param.
		The REST service result handling should be:
			Case										Displayed																Value
		No results returned 			?no dealer for postcode? message displayed (from DFYTranslation)			Empty string  to prevent submission (when field is required)
		Single dealer returned			Single option preselected displayed.
		Multiple results returned		?please select a dealer? message displayed (from DFYTranslation)		Empty string  for ?please select a dealer? to prevent submission (when field is required).
																											dealerInfo returned in the REST response for each dealer

 */
(function($){
	var widget = {
		//default translations
		translations: {
		  selectDealer: 'Please select a dealer',
		  selectCity: 'Please select a city',
		  selectState: 'Please select a state',
		  selectStateOrCity: 'Please select a city or state',
		  pleaseWait: 'Please wait for dealers to load',
		  noDealersFound: 'No dealers found'
		},

		restServices : {

		},

		$dealerSelect : null,
		$stateSelect : null,
		$citySelect : null,
        $formSalesStateSelect : null,
        $formSalesCitySelect : null,
        $formSalesDealerSelect : null,

		stateCityMap : {},

		types : {
			address : 'ad',
			city : 'ct',
			region : 'rgn',
			regionCity : 'rgnCt'
		},

		constructDealerUrl : function(type, data) {
			switch (type) {
				case widget.types.city:
					return widget.restServices['dealer.byCityUrl'].replace('{city}', encodeURIComponent(data.city));

				case widget.types.region:
					return widget.restServices['dealer.byRegionUrl'].replace('{region}', encodeURIComponent(data.region));
                    //return '../../../../latest-offers-2014-client/carve/RAD2013/rest/dealer-region.js';

				case widget.types.regionCity:
					return widget.restServices['dealer.byRegionCityUrl'].replace('{region}', encodeURIComponent(data.region)).replace('{city}', encodeURIComponent(data.city));
                    //return '../../../../latest-offers-2014-client/carve/RAD2013/rest/dealer-city.js';

				case widget.types.address:
					return widget.restServices['dealer.byAddressUrl'].replace('{location}', encodeURIComponent(data.address));
			}
			return null;
		},

		createOption: function(text, value) {
			return '<option value="' + (value || '') + '">' + text + '</option>';
		},

		populateStateDropDown : function(stateSelect, citySelect, hasFirstOption) {
			var cityStateData = $('#cityDropdownData');
			if (cityStateData.length > 0) {
				cityStateData = JSON.parse(cityStateData.html());
				var i,
					j,
					state,
					cityLength = 0,
					statesLength = 0;

				for(i = 0 ; i < cityStateData.list.length; i++){
	                states = cityStateData.list[i].states;
	                statesLength = states.length;
	                cityLength = states.length;
	                for(j=0; j < cityLength; j++){
	                    if (states[j][1] != null) {
                            widget.stateCityMap[states[j][0]] = states[j][1];
                        }
	                }
	            }

                var firstOptionMsg = hasFirstOption?widget.translations.selectState: undefined;
				widget.populateDropDown(statesLength, stateSelect, firstOptionMsg, function(options) {

					for (state in widget.stateCityMap) {
						var stateText = widget.stateCityMap[state].name,
							city = widget.stateCityMap[state].cities[0][0];
						//only "ford Korean" and state name not equal city name
						if($("body").hasClass("koreanstate")&&stateText!=city){
							stateText = stateText + " - " + city;
						}
                        var stateCode = (window.ND.FORMBUILDER && window.ND.FORMBUILDER.LOCATIONMAP[state])?window.ND.FORMBUILDER.LOCATIONMAP[state].code : undefined;
                        if(stateCode){
                            options.push(widget.createOption(stateText, stateCode));
                        }else{
                            options.push(widget.createOption(stateText, (!!widget.stateCityMap[state].code)? (widget.stateCityMap[state].code.length>0?widget.stateCityMap[state].code:widget.stateCityMap[state].name):widget.stateCityMap[state].name));
                        }
					}
				});
				//we want the city field to hint to the user that state need to be selected first.
				widget.populateDropDown(2, citySelect, firstOptionMsg);

			}
		},

		populateDropDown: function(dataLength, $select, firstOptionMsg,  dataIteratorCallback) {

			var i, options = [], isRequired = $select.is("[required]");

            var firstOptionValue = firstOptionMsg? firstOptionMsg : $select.find(':first').html();
	        options.push(widget.createOption(firstOptionValue));

			if (typeof dataIteratorCallback !== 'undefined') {
				dataIteratorCallback(options);
			}

			$select.html(options.join(''));

			if (dataLength === 1 && isRequired) {
				$select.val($select.val());
			}

			if (ND.FormBuilder && ND.FormBuilder.styleSelectOptions) {
				ND.FormBuilder.styleSelectOptions($select);
			}
		},

		handleAjaxResponse : function(jqXHR, isDropDown) {
			if (typeof jqXHR !== 'undefined'  && jqXHR != null && jqXHR.length > 0) {

				widget.clearAjaxError();

				if(isDropDown){
                    widget.populateDropDown(jqXHR.length, widget.$dealerSelect, widget.translations.selectDealer, function(options) {

                        for (i = 0; i < jqXHR.length; i++) {
                        	if($("body").hasClass("dealerNameOnly")){
								 var specialities = jqXHR[i].specialities;
								// var withService = "Service";
								// specialities = jQuery.grep(specialities, function (dealrLst) {
								// 	return dealrLst != withService;
								// });
								
								
								 // $.each(specialities, function (value) {
								 //    console.log(value);
								 //    if (specialities.indexOf("Service") !== -1) {
									//     if (value.length > 1){
									//  		options.push(widget.createOption(jqXHR[i].dealershipName, jqXHR[i].dealerInfo));	
									//  	 }
								 // 	}
								 // });
								
								 if (specialities.indexOf("Sales") !== -1) {
								 //	if (Object.keys(specialities).length > 1){ 
										options.push(widget.createOption(jqXHR[i].dealershipName, jqXHR[i].dealerInfo));	
								 //}
								 }								 
                        	}else{
                            	options.push(widget.createOption(jqXHR[i].dealershipName + '(' + jqXHR[i].addressLine1 + ')', jqXHR[i].dealerInfo));
                        	}
                        }
                    });
                }else{
                    var locationStr = '';
                    if(widget.$formSalesStateSelect.get(0).selectedIndex !== 0){
                        locationStr = widget.$formSalesStateSelect.find(':selected').text();
                    }
                    if(widget.$formSalesCitySelect.get(0).selectedIndex !== 0){
                        var cityStr = widget.$formSalesCitySelect.find(':selected').text() + ' - ';
                        locationStr = cityStr + locationStr;
                    }

                    widget.$formSalesDealerSelect.find('.dealer-container').empty();

                    for(var idx = 0; idx < jqXHR.length; idx++){
                        var html = '<div style="margin-bottom: 1em;"><input name="distrib-radio" type="radio" value="'+jqXHR[idx].dealerInfo+'">' +
                            '<div class="dealer-item">' +
                            '<p style="font-weight: bold; margin-bottom:0;">'+jqXHR[idx].dealershipName+'</p>' +
                            '<p style="margin-bottom: 0;">' +
                            '<span class="dealer-place-font">'+locationStr+'</span>' +
                            '</p>' +
                            '</div>' +
                            '</div>';
                        widget.$formSalesDealerSelect.find('.dealer-container').append(html);
                    }
                    widget.attachFormSalesDealerListener();
                }

			} else {
				widget.handleAjaxError();

			}
		},

		clearAjaxError : function() {
			widget.$dealerSelect.removeClass('user-error');

			var $errorSibling = widget.$dealerSelect.next('span.error-box');
			if ($errorSibling.length > 0) {
				$errorSibling.remove();
			}
		},

		handleAjaxError : function() {

			widget.$dealerSelect.removeClass('user-success').addClass('user-error');
			//display error message
			if (widget.$dealerSelect.next('span.error-box').length === 0) {
				$('<span class="error-box"><span>' + widget.translations.noDealersFound + '</span></span>').insertAfter(widget.$dealerSelect);
			}
			widget.populateDropDown(2, widget.$dealerSelect, widget.translations.noDealersFound);

		},

		attachPostcodeListener : function($dealerByPostcode) {
			$dealerByPostcode.on('blur', function(e) {
				var val = $dealerByPostcode.val();
				if (val != null && $.trim(val).length > 0) {
					widget.fetchData(widget.types.address,{address : $.trim(val) }, true, widget.handleAjaxResponse);
				}
			});
			//first time page loads check to see if the value has already been set or not
			//if set, load values in dealer postcode
			$dealerByPostcode.trigger('blur');
		},

		attachStateCityListeners : function(stateSelect, citySelect, isDropDown) {

			stateSelect.on('change', function(e) {
                widget.$formSalesDealerSelect.parent().css('display', 'none');
                var dealerHiddenInput = widget.$formSalesDealerSelect.next();
                dealerHiddenInput.val('');

                var stateCode = stateSelect.val(),
				state = stateSelect.find('[value="'+stateCode+'"]').text(),
					i,
					cities = widget.stateCityMap[state]?widget.stateCityMap[state].cities || []:[],
					citiesLength = cities.length;
                var firstOptionMsg = isDropDown? widget.translations.selectCity: undefined;
				widget.populateDropDown(citiesLength, citySelect,firstOptionMsg, function(options) {

					for (i = 0;  i < citiesLength; i++) {
                        var cityName = cities[i][1].name;
                        var cityCode = (window.ND.FORMBUILDER && window.ND.FORMBUILDER.LOCATIONMAP[state])?window.ND.FORMBUILDER.LOCATIONMAP[state].cities[cityName] : undefined;
                        if(cityCode){
                            options.push(widget.createOption(cities[i][1].name, cityCode));
                        }else{
                            options.push(widget.createOption(cities[i][1].name, cityName));
                        }
					}
				});
                if(stateSelect.get(0).selectedIndex === 0){
                    citySelect.html(citySelect.find(':first'));
                }

				var city = citySelect.val();
				//debugger
				widget.retrieveDealersForCityState(state, city, isDropDown);

			});

            citySelect.on('change', function(e) {
                var dealerHiddenInput = widget.$formSalesDealerSelect.next();
                dealerHiddenInput.val('');
                if(citySelect.get(0).selectedIndex !== 0){
                    widget.$formSalesDealerSelect.parent().css('display', 'block');
                }else{
                    widget.$formSalesDealerSelect.parent().css('display', 'none');
                }
                var stateCode = stateSelect.val(),
                    cityCode = citySelect.val(),
                    state = stateSelect.find('[value="'+stateCode+'"]').text(),
                    city = citySelect.find('[value="'+cityCode+'"]').text();

				widget.retrieveDealersForCityState(state, city, isDropDown);

			});

		},

		attachDealerListener : function() {
			var $dealerInfoHiddenInput = $('#dealer-by-postcode-dealerinfo');
			if ($dealerInfoHiddenInput.length > 0) {
				widget.$dealerSelect.on('change', function(e) {
					$dealerInfoHiddenInput.val(widget.$dealerSelect.val());
				});
			}
		},

        attachFormSalesDealerListener : function(){
            var $formSalesDealerHiddenInput = widget.$formSalesDealerSelect.next();
            var $formSalesRadioGrp = widget.$formSalesDealerSelect.find('.dealer-container input[type="radio"]');
            $formSalesRadioGrp.click(function(){
                $formSalesDealerHiddenInput.val($(this).val());
            });
        },
		//ie8 doesn't have a trim function, use jQuery's instead
		retrieveDealersForCityState : function(state, city, isDropDown) {
			var hasState = state != null && $.trim(state).length > 0,
				hasCity = city != null && $.trim(city).length > 0;

			if (hasState && hasCity) {
				widget.fetchData(widget.types.regionCity,{region : $.trim(state), city : $.trim(city) }, isDropDown, widget.handleAjaxResponse);
			} else if (hasState) {
				widget.fetchData(widget.types.region, {region : $.trim(state)}, isDropDown, widget.handleAjaxResponse);
			} else if (hasCity) {
				widget.fetchData(widget.types.city,{city : $.trim(city) }, isDropDown, widget.handleAjaxResponse);
			} else if(isDropDown) {
				widget.populateDropDown(2, widget.$dealerSelect, widget.translations.selectStateOrCity);
			}
		},

		fetchData : function(type, data, isDropDown, callback) {
			var url = widget.constructDealerUrl(type, data);
			if (url != null) {
				widget.addLoader();
				$.ajax({
					url: url,
					dataType: 'json',
					success: function(jqXHR, textStatus, textResponse) {
						widget.removeLoader();
						callback(jqXHR, isDropDown);
					},
					error : function(jqXHR, textStatus, textResponse) {
						widget.removeLoader();
						widget.handleAjaxError();
					}
				});
			}
		},

		addLoader: function() {
			widget.$dealerSelect.attr('readonly', true)
								.html(widget.createOption(widget.translations.pleaseWait));
		},

		removeLoader: function() {
			widget.$dealerSelect.removeAttr('readonly').empty();
		},

//        addFormSalesValidation: function(){
//            var formSalesValidationElem = $('#formsales-validation-json');
//            if(formSalesValidationElem.length > 0){
//                var formSalesValidationConf = JSON.parse(formSalesValidationElem.html());
//                for(fieldName in formSalesValidationConf){
//                    var fieldConf = formSalesValidationConf[fieldName];
//                    var regexStr = fieldConf['CustomRegex'];
//                    var msg = fieldConf['CustomMsg'];
//                    var fieldElem = $('div.group input[name="'+fieldName+'"]');
//                    fieldElem.data('pattern',regexStr);
//                    fieldElem.data('errormsg', msg);
//                    fieldElem.on('blur', function(){
//                        var fieldValue = $(this).val();
//                        var fieldPattern = $(this).data('pattern');
//                        var fieldErrorMsg = $(this).data('pattern');
//                        var patternObj = new RegExp(fieldPattern);
//                        if(!patternObj.test(fieldValue)){
//                            alert(fieldErrorMsg);
//                        }
//                    });
//                }
//            }
//        },

		init : function() {
		    var $dealerByPostcode = $('#dealer-by-postcode-postcode'),
				$dealerTranslations = $('#dealer-translations'),
				$restServicesConfig = $('#rest-services'),
				$commonConfig = $('#common-config'),
                $dealerLabel = $('#dealer-label-json'),
                dealerLabelValue = {};

				widget.$dealerSelect = $('#dealer-by-postcode-dealer');
				widget.$stateSelect = $('#dealer-by-statecity-state');
				widget.$citySelect = $('#dealer-by-statecity-city');

                widget.$formSalesStateSelect = $('#FormSales_State');
                widget.$formSalesCitySelect = $('#FormSales_City');
			    widget.$formSalesDealerSelect = $('#FormSales_Dealer');

			    if ($dealerLabel.length) {
			        dealerLabelValue = JSON.parse($dealerLabel.html());

			        widget.$formSalesDealerSelect.append('<div class="ax-paragraph"><p style="font-weight: bold;margin-left:.5em;width:auto;">' + dealerLabelValue.dealerTitle + '</p></div><div class="dealer-container"></div>');

			    }
			    else {
			        widget.$formSalesDealerSelect.append('<div class="ax-paragraph"><p style="font-weight: bold;margin-left:.5em;width:auto;">Select a distributor</p></div><div class="dealer-container"></div>');
			    }

            //widget.addFormSalesValidation()
            widget.$formSalesDealerSelect.parent().css('display', 'none');

			if ($restServicesConfig.length > 0) {
				widget.restServices = JSON.parse($restServicesConfig.html());
				var commonConfig = JSON.parse($commonConfig.html());
				for (key in widget.restServices) {
					widget.restServices[key] = widget.restServices[key].replace('{site}',commonConfig.site);
				}

				if ($dealerTranslations.length > 0) {
					$.extend(widget.translations, JSON.parse($dealerTranslations.html()));
				}
				if (widget.$dealerSelect.length > 0) {

					widget.attachDealerListener();

					if ($dealerByPostcode.length > 0) {
						widget.attachPostcodeListener($dealerByPostcode);

					}

					if (widget.$stateSelect.length > 0 && widget.$citySelect.length > 0) {
						widget.populateStateDropDown(widget.$stateSelect, widget.$citySelect, true);
						widget.attachStateCityListeners(widget.$stateSelect, widget.$citySelect, true);

						widget.$stateSelect.trigger('change');
					}
                    if (widget.$formSalesStateSelect.length > 0 && widget.$formSalesCitySelect.length > 0) {
                        widget.populateStateDropDown(widget.$formSalesStateSelect, widget.$formSalesCitySelect, false);
                        widget.attachStateCityListeners(widget.$formSalesStateSelect, widget.$formSalesCitySelect, false);
                    }
				}else{
					//add only city and state logic
					if (widget.$stateSelect.length > 0 && widget.$citySelect.length > 0) {
                        widget.populateStateDropDown(widget.$stateSelect, widget.$citySelect, true);
                        widget.attachStateCityListeners(widget.$stateSelect, widget.$citySelect, true);

						widget.$stateSelect.trigger('change');
					}
                    if (widget.$formSalesStateSelect.length > 0 && widget.$formSalesCitySelect.length > 0) {
                        widget.populateStateDropDown(widget.$formSalesStateSelect, widget.$formSalesCitySelect, false);
                        widget.attachStateCityListeners(widget.$formSalesStateSelect, widget.$formSalesCitySelect, false);

                        widget.$formSalesStateSelect.trigger('change');
                    }

				}

		   }
		}
	};


	$(document).ready(function(){
		widget.init();
	});
})(jQuery);

;
