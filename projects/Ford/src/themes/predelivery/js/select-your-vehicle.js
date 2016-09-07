/*
 * Author: 		Sohrab Zabetian and Brett Chaney
 * Description: Code taken from context.js in FTD2010 JS folder and stripped down for Pre-delivery. 
 *				VOI Pre-population.
 */

ND.selectVehicle = (function($) {
	
	var 
	
	voiConfig = {
			excludedModels : ''
	},
	
	privateFunctions = {
			
		restServices : {
			fetchVOIData : function(url) {
				privateFunctions.restServices.ajaxCall(url, function(jqXHR) {
					privateFunctions.populateModelDropdown(jqXHR);
				});
			},
			fetchColorData : function(url, callback) {
				
				privateFunctions.restServices.ajaxCall(url, function(jqXHR) {
					var i = 0,
						colors = [];
					
					for (i = 0; i < jqXHR.length; i++) {
						colors.push({
							name: jqXHR[i].name,
							order: jqXHR[i].order,
							code: jqXHR[i].code
						});
					}
					
					callback(colors);
					
				});
			},
			ajaxCall : function(url, successCallback) {
				$.ajax({
					url: url,
					dataType: 'json', 
					beforeSend: function(){
						$("#Ford_Make").closest(".section").append('<div class="ajax-loader"></div>');
					},
					success: function(jqXHR, textStatus, textResponse) {
						if (typeof jqXHR !== 'undefined' && jqXHR !== null) {
							successCallback(jqXHR);
						}
					}, 
					error : function(jqXHR, textStatus, textResponse) {
						$('.ajax-loader').remove();
						//console.log('Could not fetch voi rest data');
					}
				});
			}		
		},    
		
		addDropdownChangeListeners : function($modelDD, voiRestData) {
			
			var $seriesDD = $('#Ford_Model'),
				$colorDD = $('#Colour');
			if ($seriesDD.length > 0) {
				var $firstOption;
				if (privateFunctions.firstTime) {
					$firstOption = $seriesDD.html();
					privateFunctions.firstTime = false;
				}
				
				$modelDD.on('change', function() {
					var result = privateFunctions.findIdForName($modelDD.val(), null, voiRestData);
					
					if (result.m !== null) {
						privateFunctions.setModelHiddenValue(result);
						privateFunctions.populateSeriesDropdown($seriesDD, voiRestData[result.mIdx].derivatives, $firstOption);
					} else {
						privateFunctions.populateSeriesDropdown($seriesDD, [], $firstOption);
					}
				});
				
				$seriesDD.on('change', function() {
					var result = privateFunctions.findIdForName($modelDD.val(), $seriesDD.val(), voiRestData);

					if (result.d !== null) {
						privateFunctions.setDerivativeHiddenValues(result);
						PD.optionsPacks.init();
					}
					if ($colorDD.length > 0) {
						privateFunctions.populateColorDropdown($seriesDD);
					}
				});
				
				
				/*if ($colorDD.length > 0) {
					$colorDD.on('change', function() {
						privateFunctions.setColorDropDownValue($colorDD.val());
					});
				}*/
			}
		},
		
		findIdForName : function(modelName,derivativeName,voiRestData) {
			var i,j, derivative, result = { m : null, mc : null, d : null, dc : null, mIdx : -1, dIdx : -1};
	
			for (i = 0; i < voiRestData.length; i++) {
				if (modelName === voiRestData[i].name) {
					
					result.m = voiRestData[i].id;
					result.mc = voiRestData[i].modelCode;
					result.mIdx = i;
					if (derivativeName !== null) {
						for (j = 0; j < voiRestData[i].derivatives.length; j++) {
							derivative = voiRestData[i].derivatives[j];								
							if (derivativeName === derivative.name) {
								result.d = derivative.id;
								result.dc = derivative.derivativeCode;
								result.dIdx = j;
								
								break;
							}
						}
					}
					break;
				}
			}
			
			return result;
		},
		
		firstTime : true,
		
		populateModelDropdown : function(voiRestData) {
			var $dd = $('#Ford_Make');
			
			if ($dd.length > 0) {
				
				var options = [],
					excludedSerEl = $("#modelseries"),
					filterList = [],
					optionList = voiRestData.slice(0),
					i;
				//if there is excludedSeries defined, remove from option list	
				if(excludedSerEl.length>0){
					var excludeSerJson = $.parseJSON(excludedSerEl.html()),
						excludeModel = excludeSerJson.excludedModels;
					if(excludeModel&&excludeModel.length>0){
						var excludeModelArr = excludeModel.split(",");//convert excluded list from string to array
						for(var k = 0; k < voiRestData.length; k++){
							var count = 0;
							//if there is excludedSeries defined, remove from option list
							if(excludeModelArr && excludeModelArr instanceof Array && excludeModelArr.length>0){
								for(var j = 0; j < excludeModelArr.length; j++){
									if($.trim(voiRestData[k].name)==$.trim(excludeModelArr[j])){
										count++;//record as a flag if match exclude element
									}
								}
								//filter the array element, store those not in the exclude list
								if(count === 0){
									filterList.push(voiRestData[k]);
								}
							}
						}
					}
				}
				//update list if has filter element
				if(filterList.length > 0){
					optionList = filterList.slice(0);
				}
				
				for (i = 0; i < optionList.length; i++) {
					options.push('<option value="' + optionList[i].name + '">' + optionList[i].name + '</options>');
				}

				$(".ajax-loader").remove();
				
				$dd.append(options.join(''));
				if (ND.FormBuilder && ND.FormBuilder.styleSelectOptions) {
					ND.FormBuilder.styleSelectOptions($dd);
				}
				privateFunctions.addDropdownChangeListeners($dd, voiRestData);
			}
			ND.prepopulate("Ford_Make");
		},

		setModelHiddenValue : function(value) {
			var $hiddenInputModelID = $('#voi-modelid'),
				$hiddenInputModelCode = $('#voi-modelcode');

				// clear derivative hidden inputs
				$('#voi-derivatveid').val('');
				$('#voi-derivativecode').val('');

			if ($hiddenInputModelID.length > 0) {
				$hiddenInputModelID.val(value.m);
				$hiddenInputModelCode.val(value.mc);
			}
		},
		
		populateSeriesDropdown : function($dd, modelDerivatives, $firstOption) {
			
			if (typeof modelDerivatives !== 'undefined' && modelDerivatives !== null && modelDerivatives.length > 0) {
				var options = [],
				i;	
				for (i = 0; i < modelDerivatives.length; i++) {
					options.push('<option value="' + modelDerivatives[i].name + 
								 '" data-derivativeid="' + modelDerivatives[i].id + '">' + modelDerivatives[i].name + '</options>');
				}
				$dd.empty().html($firstOption).append(options.join(''));
				if (ND.FormBuilder && ND.FormBuilder.styleSelectOptions) {
					ND.FormBuilder.styleSelectOptions($dd);
				}
				ND.prepopulate("Ford_Model");
				privateFunctions.populateColorDropdown($dd);
				
			} else {
				$dd.html($firstOption);
				ND.prepopulate("Ford_Model");
				privateFunctions.populateColorDropdown($dd);
				
			}

		},
		
		setDerivativeHiddenValues : function(value) {
			var $hiddenInputID = $('#voi-derivatveid'),
				$hiddenInputCode = $('#voi-derivativecode');
			if ($hiddenInputID.length > 0) {
				$hiddenInputID.val(value.d);
				$hiddenInputCode.val(value.dc);
			}
		},
		
		colorDropdownFirstOption : null,
		
		populateColorDropdown : function($seriesDD) {
			
			var $dd = $('#Colour');
			
			if ($dd.length > 0) {
				
				if (privateFunctions.colorDropdownFirstOption === null) {
					privateFunctions.colorDropdownFirstOption = $dd.html();
				}
			
				// call ajax service
				
				var derivativeId = $seriesDD.find(':selected').data('derivativeid');
				
				if (typeof derivativeId !== 'undefined' && derivativeId !== null) {
					var colorUrl = voiConfig.colorUrl.replace('{site}', voiConfig.site)
					  .replace('{priceZone}', voiConfig.priceZone)
					  .replace('{derivative}', derivativeId);

					$dd.empty().html('<option>Please select colour</option>');
					
					privateFunctions.restServices.fetchColorData(colorUrl, function(colorData) {
						var options = [],
							i;	
						for (i = 0; i < colorData.length; i++) {
							options.push('<option value="' + colorData[i].name + '">' + colorData[i].name + '</options>');

						}
						$dd.empty().html(privateFunctions.colorDropdownFirstOption).append(options.join(''));
						if (ND.FormBuilder && ND.FormBuilder.styleSelectOptions) {
							ND.FormBuilder.styleSelectOptions($dd);
						}
						ND.prepopulate("Colour");
					});
				} else {
					$dd.empty().html(privateFunctions.colorDropdownFirstOption);
				}

			}
			
		},
		
		/*setColorDropDownValue : function(value) {
			var $hiddenInput = $('#voi-modelcolour');
			if ($hiddenInput.length > 0) {
				$hiddenInput.val(value);
			}
		},*/		
		
		/**
		 * if we have a form and config, make an ajax call and retrieve the VOI
		 * list
		 */
		init : function() {
			
			var $restConfig = $('#rest-services'),
				$commonConfig = $('#common-config'),
				$form = ('form');
			// if there is at least one form on the page and it's not the pre-populated welcome page
			if ($form.length > 0 && $('.pre-populated').length === 0) {
				if ($restConfig.length > 0) {
					$.extend(voiConfig, JSON.parse($restConfig.html()),
										JSON.parse($commonConfig.html()));
					
					if (voiConfig.formRequestType) {
						var firstChar = voiConfig.formRequestType.charAt(0);
						voiConfig.formRequestTypeUppercase = voiConfig.formRequestType;
						voiConfig.formRequestType = voiConfig.formRequestType.replace(firstChar, firstChar.toLowerCase());
					}
					
					voiConfig.voiUrl = voiConfig.voiUrl.replace('{site}', voiConfig.site).replace('{makeName}', "Ford");
					voiConfig.voiUrl += voiConfig.excludedModels;
					
					privateFunctions.restServices.fetchVOIData(voiConfig.voiUrl);
				}
			}
		}
				
	},
	
	publicFunctions = {
			
		//used to prevent smob logic from double firing 
		//once after page init and once after document ready.
		isContextInitialised : false,
		
		startUp : function() {
			
			if (!publicFunctions.isContextInitialised && $("#Ford_Make")[0]) {
				// if we have a form and config, make an ajax call and retrieve the
				// VOI list
				privateFunctions.init();
				publicFunctions.isContextInitialised = true;
			}
		}
	};
	
	/**
	 * Execute voi-prepopulation for web
	 */
	$(document).ready(publicFunctions.startUp);
	
	return publicFunctions;
	
})(jQuery);