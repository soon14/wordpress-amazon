/*
 * Author: Dawood Butt
 * Description: Need Assessment webappfilter JS
 */

//////////////////////////////////////////////////////////////////////////////////////////
//window.addEventListener:load.															//
//////////////////////////////////////////////////////////////////////////////////////////
window.addEventListener('load', function(e) {
		var cache = window.applicationCache;
		//////////////////////////////////////////////////////////////////////////////////////////
		//cache.addEventListener:updateready.													//
		//////////////////////////////////////////////////////////////////////////////////////////
		cache.addEventListener('updateready', function(e) {
				if (window.applicationCache.status == window.applicationCache.UPDATEREADY)
				{
				  window.applicationCache.swapCache();
				  if (confirm('A new version of this site is available. Load it?'))
				  {
						fordWebappfilter.addInstallationMessage("cache updated.");
						window.location.reload();
				  }
				} 
				else
				{
					//do nothing
				}
		}, false); // End of cache.addEventListener:updateready.
		
		//////////////////////////////////////////////////////////////////////////////////////////
		//cache.addEventListener:cached.														//
		//////////////////////////////////////////////////////////////////////////////////////////
		cache.addEventListener("cached", function () {
			fordWebappfilter.addInstallationMessage("Please click on reload to continue the offline version download.",2);
			sendDownLoadMsg = false;
		}, false);// End of cache.addEventListener:cached
		 
		//////////////////////////////////////////////////////////////////////////////////////////
		//cache.addEventListener:checking.														//
		//////////////////////////////////////////////////////////////////////////////////////////
		cache.addEventListener("checking", function () {
			 fordWebappfilter.addInstallationMessage("All Files checked.");
			 sendDownLoadMsg = false;
		}, false);// cache.addEventListener:checking
		 
		//////////////////////////////////////////////////////////////////////////////////////////
		//cache.addEventListener:downloading.													//
		//////////////////////////////////////////////////////////////////////////////////////////
		cache.addEventListener("downloading", function () {
			fordWebappfilter.addInstallationMessage("Files are downloading.");
			sendDownLoadMsg = false;
		}, false);// End of cache.addEventListener:downloading
		
		//////////////////////////////////////////////////////////////////////////////////////////
		//cache.addEventListener:error.															//
		//////////////////////////////////////////////////////////////////////////////////////////
		cache.addEventListener("error", function (e) {
			//fordWebappfilter.addInstallationMessage("The download failed for some reason. Script is attempting to download again.",2);
			cache.update();
		}, false);// End of cache.addEventListener:error
		
		//////////////////////////////////////////////////////////////////////////////////////////
		//cache.addEventListener:noupdate.														//
		//////////////////////////////////////////////////////////////////////////////////////////
		/*
		cache.addEventListener("noupdate", function () {
			fordWebappfilter.addInstallationMessage("Installation complete",1);
			location.href="webappfilter.html";
		}, false);
		*/
		
		//////////////////////////////////////////////////////////////////////////////////////////
		//cache.addEventListener:progress.														//
		//////////////////////////////////////////////////////////////////////////////////////////
		cache.addEventListener("progress", function (e) {
			//var str = "progressing... " ;			
			var str = "";
			if(e.lengthComputable)
			{
				//alert(e.loaded);
				$('.loading').show();
				str = "progressing... " + e.loaded + "/" + e.total + " downloaded."
				if (e.loaded == e.total)
				{
					$('.loading').hide();
				}
			}
			//if(!sendDownLoadMsg){
				fordWebappfilter.addInstallationMessage(str);
				sendDownLoadMsg = true;
		   // }
		}, false); // End of cache.addEventListener:progress
}, false); // End of window.addEventListener:load

//////////////////////////////////////////////////////////////////////////////////////////
//function: replaceByValue.																//
//////////////////////////////////////////////////////////////////////////////////////////
fordWebappfilter.replaceByValue = function(field, oldvalue, newvalue) {
    for( var k = 0; k < fordWebappfilter.filterCar.length; ++k )
	{
    	if( oldvalue == fordWebappfilter.filterCar[k][field] )
		{
        	fordWebappfilter.filterCar[k][field] = newvalue;
        }
    }
    return fordWebappfilter.filterCar;
}; // End of replaceByValue function.

//////////////////////////////////////////////////////////////////////////////////////////
//function: merge_options.																//
//////////////////////////////////////////////////////////////////////////////////////////
fordWebappfilter.merge_options = function(obj1,obj2) {
	return $.extend(true,obj1, obj2);
}; // End of merge_options.

//////////////////////////////////////////////////////////////////////////////////////////
//function: addCommas.																	//
//////////////////////////////////////////////////////////////////////////////////////////
fordWebappfilter.addCommas = function(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1))
	{
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
};//${$item.addCommas(price)}*${addCommas(price)}


//////////////////////////////////////////////////////////////////////////////////////////
//function: addInstallationMessage.														//
//////////////////////////////////////////////////////////////////////////////////////////
fordWebappfilter.addInstallationMessage = function(msg) {
	console.log(msg);
};


//////////////////////////////////////////////////////////////////////////////////////////
//Function: View1: Display of Name Plates. 												//
//////////////////////////////////////////////////////////////////////////////////////////
fordWebappfilter.viewNamePlates = function() {
	$('#arrow-up-car').hide()
	$('#arrow-down-car').hide();
	$.ajax({
		url: fordWebappfilter.urlNamePlates,
		crossDomain: true,
		contentType:"application/json; charset=UTF-8",
		dataType: "json",
		success: function(data) {
			//var retJSONArray = jQuery.parseJSON( JSON.stringify(data) );
			fordWebappfilter.namePlates = data;
			$('.car-filter-area').fadeOut("fast", function() {
				if ($("#view-one-template").length != 0)
				{
					$('.car-filter-area').children().remove().end();
					var viewOneMarkup = $("#view-one-template").html();
					$.template("viewOneTemplate",viewOneMarkup);
					$.tmpl("viewOneTemplate",data).appendTo( ".car-filter-area");
					$('.loading').hide();

					var orientation = Math.abs(window.orientation) == 90 ? 'landscape' : 'portrait';
					if (orientation == 'portrait')
					{
						if(fordWebappfilter.namePlates.length >= 9)
						{
							$('#arrow-down-car').show();
						}
					}
					else if (orientation == 'landscape')
					{
						if(fordWebappfilter.namePlates.length >= 10)
						{
							$('#arrow-down-car').show();
						}
					}
					else
					{
						if(fordWebappfilter.namePlates.length >= 10)
						{
							$('#arrow-down-car').show();
						}
					}
				}
			}).fadeIn("fast");
		},
		error: function(e) {
		   	$('.car-filter-area').children().remove().end();
			var notFoundMarkup = $("#not-found-template").html();
			$.template("notFoundTemplate",notFoundMarkup);
			$.tmpl("notFoundTemplate",{ message: e.message }).appendTo( ".car-filter-area");
			var header_height = $('#header').height(),
				remaining_height = parseInt($(window).height() - header_height);
			$('.not-found').height(remaining_height);
			$('.loading').hide();
		},
		statusCode: {
		404: function() {
				$('.car-filter-area').children().remove().end();
				var notFoundMarkup = $("#not-found-template").html();
				$.template("notFoundTemplate",notFoundMarkup);
				$.tmpl("notFoundTemplate",{ message: '404 - Model Derivatives URL - Not Found.' }).appendTo( ".car-filter-area");
				var header_height = $('#header').height(),
					remaining_height = parseInt($(window).height() - header_height);
				$('.not-found').height(remaining_height);
				$('.loading').hide();
			}
		}
	})// End of AJAX call.
};// End of View1: Display of Name Plate.

//////////////////////////////////////////////////////////////////////////////////////////
//Function: View2/3: Display Algo.		 												//
//////////////////////////////////////////////////////////////////////////////////////////
fordWebappfilter.viewTwoOrThree = function() {
	//$('.loading').css("margin-top", $('.results-area')[0].scrollHeight - $('.results-area').height()+"px");
	$('.results-area').animate({ "scrollTop": "0px" }, "fast");
	$('#arrow-up-car').hide()
	$('#arrow-down-car').hide();
	$('.loading').show();
	var retJSONArray;
	//var json;
	$.ajax({
		url: fordWebappfilter.urlDerivativeCategory,
		crossDomain: true,
		contentType:"application/json; charset=UTF-8",
		dataType: "json",
		success: function(data) {
			//json = JSON.stringify(data);
			retJSONArray = jQuery.parseJSON( JSON.stringify(data) );

			var resQuestionsArr = [];
			//var derivativeIDs = [];
			//var tempDerivativeIDsCounter = 0;
			var filtersCategoryID;

			// To get the: resQuestionsArr.
			for (var i in fordWebappfilter.questionsArray)
			{
				if (fordWebappfilter.questionsArray[i]['type'] == 'equal')
				{
					//dawood yes yes yes
					resQuestionsArr.push({id:fordWebappfilter.questionsArray[i]['title'].toLowerCase().trim(), questionAnswer:fordWebappfilter.questionsArray[i]['answers'][fordWebappfilter.answers[fordWebappfilter.questionsArray[i]['id']]].value.toLowerCase().trim()});
				}
				else if (fordWebappfilter.questionsArray[i]['type'] == 'range')
				{
					resQuestionsArr.push({id:fordWebappfilter.questionsArray[i]['title'].toLowerCase().trim(), questionAnswer:fordWebappfilter.answers[fordWebappfilter.questionsArray[i]['id']].toLowerCase().trim()});

				}
			}
			//alert(JSON.stringify(resQuestionsArr));return;
			//alert(resQuestionsArr.join("|"));
			
			// To get the: filtersCategoryID
			for (var categoryID in retJSONArray.categories)
			{
				if (retJSONArray.categories[categoryID].name == 'Filters')
				{
					filtersCategoryID = categoryID;
					break;
				}
			}
			//alert(filtersCategoryID);return;

			// Looping over Derivatives.
			for (var derivativeID in retJSONArray.derivatives)
			{
				var resFiltersFeatureArr = new Array();
				// To get the: resFiltersFeatureArr
				for (var filtersFeatureID in retJSONArray.derivatives[derivativeID].categories[filtersCategoryID].features)
				{
					if ((typeof(retJSONArray.categories[filtersCategoryID].features[filtersFeatureID].name) != "undefined") && (typeof(retJSONArray.derivatives[derivativeID].categories[filtersCategoryID].features[filtersFeatureID].value) != "undefined"))
					{
						resFiltersFeatureArr.push({id:retJSONArray.categories[filtersCategoryID].features[filtersFeatureID].name.toLowerCase().trim(), featureAnswer:retJSONArray.derivatives[derivativeID].categories[filtersCategoryID].features[filtersFeatureID].value.toLowerCase().trim()});
						//alert('derivativeID:'+derivativeID+',\nfiltersFeatureID:'+filtersFeatureID+'\nid:'+retJSONArray.categories[filtersCategoryID].features[filtersFeatureID].name.toLowerCase().trim()+',\nfeatureAnswer:'+retJSONArray.derivatives[derivativeID].categories[filtersCategoryID].features[filtersFeatureID].value.toLowerCase().trim());
					}
					else
					{
						resFiltersFeatureArr.push({id:retJSONArray.categories[filtersCategoryID].features[filtersFeatureID].name.toLowerCase().trim(), featureAnswer:"-1"});	//alert('derivativeID:'+derivativeID+',\nfiltersFeatureID:'+filtersFeatureID+'\nid:'+retJSONArray.categories[filtersCategoryID].features[filtersFeatureID].name.toLowerCase().trim());
					}
				}
				//alert(JSON.stringify(resFiltersFeatureArr));return;

				//var resQuestionString = resQuestionsArr.join("|");
				//var resFiltersFeatureString = resFiltersFeatureArr.join("|");

				//var joined_objects_array = fordWebappfilter.merge_options(resFiltersFeatureArr,resQuestionsArr);

				//[{"id":"body style","featureAnswer":"sedan","questionAnswer":"hatch"},
				//{"id":"performance","featureAnswer":"fuel guage","questionAnswer":"skip"},
				//{"id":"tech features","featureAnswer":"user friendly","questionAnswer":"skip"},
				//{"id":"storage","featureAnswer":"shopping,surfboards","questionAnswer":"skip"},
				//{"id":"seats","featureAnswer":"just me,2-4","questionAnswer":"skip"},
				//{"id":"towing","featureAnswer":"bike rack","questionAnswer":"skip"},
				//{"id":"driving terrain","featureAnswer":"around town","questionAnswer":"skip"},
				//{"id":"budget","featureAnswer":"23000","questionAnswer":"10000,50000"}]
				var joined_objects_array = [];
				//alert(JSON.stringify(resQuestionsArr));return;
				for (var idQuestion in resQuestionsArr)
				{
					for (var idFiltersFeature in resFiltersFeatureArr)
					{
						if (resQuestionsArr[idQuestion]['id'] == resFiltersFeatureArr[idFiltersFeature]['id'])
						{
							joined_objects_array.push({id: resQuestionsArr[idQuestion]['id'], featureAnswer:resFiltersFeatureArr[idFiltersFeature]['featureAnswer'] ,questionAnswer:resQuestionsArr[idQuestion]['questionAnswer']});
						}
					}
				}

				//alert(JSON.stringify(joined_objects_array));return;

				var flagJoined = false;
				for (var id in joined_objects_array)
				{
					if (joined_objects_array[id].featureAnswer != '-1')
					{
						if (joined_objects_array[id].questionAnswer != '-1')
						{
							if (joined_objects_array[id].id == 'budget')
							{
								var priceRanges  = joined_objects_array[id].questionAnswer.split(",");
								var startPrice = parseInt(priceRanges[0]);
								var endPrice = parseInt(priceRanges[1]);
								var featurePrice = parseInt(joined_objects_array[id].featureAnswer);
								//alert(startPrice+','+endPrice);
	
								if (startPrice != fordWebappfilter.minRange || endPrice!= fordWebappfilter.maxRange)
								{
									//alert('yes');
									if (featurePrice >= startPrice && featurePrice <= endPrice)
									{
										flagJoined = true;
									}
									else
									{
										flagJoined = false;
										break;
									}
								}
	
								//alert('yes:'+flagJoined);
							}
							else
							{
								//var fAnswer = 'fuel guage',
								//qAnswer = 'fuel gauge';
								//alert(fAnswer.indexOf(qAnswer) != -1);return;
	
								//alert('Bool:'+(joined_objects_array[id].featureAnswer.indexOf(joined_objects_array[id].questionAnswer) != -1)+' featureAnswer:'+joined_objects_array[id].featureAnswer+', questionAnswer:'+joined_objects_array[id].questionAnswer);

								if (joined_objects_array[id].featureAnswer.indexOf(joined_objects_array[id].questionAnswer) != -1)
								{
									flagJoined = true;
								}
								else
								{
									flagJoined = false;
									break
								}
							}// End of else budget.
						}
						else
						{
							flagJoined = true;
						} // End of questionAnswer else tag.
					}
					else
					{
						flagJoined = false;
					} // End of featureAnswer else tag.
				}// End of joined_objects_array loop.
				///////////////////////////////////////////////////////////////////////////////////////////////
				if (flagJoined)
				{
					
					////////////////////////////////////////////////////////////////////////////
					//var obj = JSON.parse(retJSONArray.derivatives[derivativeID]['categories'][1]['features']['0']);
					var specfeatures = $('#category-specfeatures').embeddedData();
					var joined_specfeatures_array = [];
					for (var idFeatures in retJSONArray.derivatives[derivativeID]['categories'][1]['features'])
					{
						for (var idSpecFeatures in specfeatures)
						{
							if (retJSONArray.derivatives[derivativeID]['categories'][1]['features'][idFeatures].id == specfeatures[idSpecFeatures].id)
							{
								//alert( JSON.stringify( specfeatures[idSpecFeatures] )+'\n\n\n'+JSON.stringify( retJSONArray.categories[1]['features'][idFeatures] ) );
								//alert( JSON.stringify( $.extend({}, specfeatures[idSpecFeatures], retJSONArray.categories[1]['features'][idFeatures]) ) );
								
								joined_specfeatures_array.push($.extend({}, specfeatures[idSpecFeatures], retJSONArray.categories[1]['features'][idFeatures]) );
							}
						}
					}
					//alert(JSON.stringify(specfeatures));return;
					if (typeof(retJSONArray.categories[1]['features']) != "undefined")
					{
						//retJSONArray.derivatives[derivativeID]['categories'].push(retJSONArray.categories[1]['features']);
						retJSONArray.derivatives[derivativeID]['categories'].push(joined_specfeatures_array);
					}
					//retJSONArray.derivatives[derivativeID]['categories'][1]['features'].concat({"test":"dawood"});
					//retJSONArray.derivatives[derivativeID]['categories'][1]['features'][0]= ["test:dawood"];
					//jsonStr = JSON.stringify(obj);
					//alert(JSON.stringify(retJSONArray.derivatives[derivativeID]));return;
					////////////////////////////////////////////////////////////////////////////
					fordWebappfilter.filterCar.push(retJSONArray.derivatives[derivativeID]);
					flagJoined = false;
				}
			} // End of Derivatives loops.
			
			
			//fordWebappfilter.namePlates.
			
			//alert(JSON.stringify());return;
			//fordWebappfilter.namePlates
			//fordWebappfilter.filterCar
			for (var keyFilterCar in fordWebappfilter.filterCar)
			{
				if (fordWebappfilter.filterCar.hasOwnProperty(keyFilterCar))
				{
					for (var keyNamePlates in fordWebappfilter.namePlates)
					{
						if (fordWebappfilter.namePlates.hasOwnProperty(keyNamePlates))
						{
							if (fordWebappfilter.namePlates[keyNamePlates].id == fordWebappfilter.filterCar[keyFilterCar].nameplateId)
							{
								fordWebappfilter.replaceByValue('nameplateId',fordWebappfilter.filterCar[keyFilterCar].nameplateId,fordWebappfilter.namePlates[keyNamePlates].name);
							}
							//alert(fordWebappfilter.namePlates[keyNamePlates].id+'|'+fordWebappfilter.filterCar[keyFilterCar].nameplateId);
						}
					}
					//alert(fordWebappfilter.filterCar[keyFilterCar].nameplateId);
				}
			}

			//fordWebappfilter.replaceByValue('nameplateId','1249028088338','Dawood');
			//fordWebappfilter.replaceByValue('nameplateId','1137384295452','Butt');
			var tmpfilterCar = fordWebappfilter.filterCar;
			//var tmpfilterCar = [];
			//var categories = [];
			//tmpfilterCar.push({ derivatives : fordWebappfilter.filterCar, categories : categories });
			fordWebappfilter.filterCar = [];
			//$('#dawood').html(JSON.stringify(tmpfilterCar));return;
			//alert(JSON.stringify(tmpfilterCar));return;

			if(JSON.stringify(tmpfilterCar) == "[]")
			{
				$('.car-filter-area').children().remove().end();
				var notFoundMarkup = $("#not-found-template").html();
				$.template("notFoundTemplate",notFoundMarkup);
				$.tmpl("notFoundTemplate",{ message: 'Sorry, there\'s no current model match. How about trying some different preferences? Hit the Refresh button at the top right.' }).appendTo( ".car-filter-area");
				var header_height = $('#header').height(),
					remaining_height = parseInt($(window).height() - header_height);
				$('.not-found').height(remaining_height);
				$('.loading').hide();
				$('#arrow-up-car').hide()
				$('#arrow-down-car').hide();
			}
			else
			{
				// Create the array of the selected derivatives.
				$('.car-filter-area').fadeOut("slow", function() {
					$('.car-filter-area').children().remove().end();
	
						/*if (tmpfilterCar.length != 0)
						{
							if($('.car-filter-area').children() != null) {
								$('.car-filter-area').children().remove().end();
							}*/
							if(tmpfilterCar.length > 20)
							{
								var orientation = Math.abs(window.orientation) == 90 ? 'landscape' : 'portrait';
								if (orientation == 'portrait')
								{
									if(tmpfilterCar.length > 7)
									{
										$('#arrow-down-car').show();
									}
								}
								else if (orientation == 'landscape')
								{
									if(tmpfilterCar.length >= 10)
									{
										$('#arrow-down-car').show();
									}
								}
								else
								{
									if(tmpfilterCar.length > 6)
									{
										$('#arrow-down-car').show();
									}
								}
								var viewTwoMarkup = $("#view-two-template").html();
								$.template("viewTwoTemplate",viewTwoMarkup);
								$.tmpl("viewTwoTemplate",tmpfilterCar).appendTo( ".car-filter-area");
								$('.loading').hide();
							}// End of IF.
							else
							{
								var orientation = Math.abs(window.orientation) == 90 ? 'landscape' : 'portrait';
								if (orientation == 'portrait')
								{
									if(tmpfilterCar.length >= 3)
									{
										$('#arrow-down-car').show();
									}
								}
								else if (orientation == 'landscape')
								{
									if(tmpfilterCar.length >= 4)
									{
										$('#arrow-down-car').show();
									}
								}
								else
								{
									if(tmpfilterCar.length > 2)
									{
										$('#arrow-down-car').show();
									}
								}
								var viewThreeMarkup = $("#view-three-template").html();
								$.template("viewThreeTemplate",viewThreeMarkup);
								$.tmpl("viewThreeTemplate",tmpfilterCar).appendTo( ".car-filter-area");
								//alert( JSON.stringify( $.extend( {}, tmpfilterCar, {"categoryid": 2} ) ) );return;
								//$.tmpl("viewThreeTemplate",$.extend(true, tmpfilterCar, {"categoryid": 2})).appendTo( ".car-filter-area");
								$('.loading').hide();
							}//End of Else.
						/*}
						else
						{
							if($('.car-filter-area').children() != null) {
								$('.car-filter-area').children().remove().end();
							}
						}*/
				}).fadeIn("fast");
			}// End Of Else Bracket.
			
		},
		error: function(e) {
		   	$('.car-filter-area').children().remove().end();
			var notFoundMarkup = $("#not-found-template").html();
			$.template("notFoundTemplate",notFoundMarkup);
			$.tmpl("notFoundTemplate",{ message: e.message }).appendTo( ".car-filter-area");
			var header_height = $('#header').height(),
				remaining_height = parseInt($(window).height() - header_height);
			$('.not-found').height(remaining_height);
			$('.loading').hide();
			$('#arrow-up-car').hide()
			$('#arrow-down-car').hide();
		},
		statusCode: {
		404: function() {
				$('.car-filter-area').children().remove().end();
				var notFoundMarkup = $("#not-found-template").html();
				$.template("notFoundTemplate",notFoundMarkup);
				$.tmpl("notFoundTemplate",{ message: '404 - Derivative Category Features URL - Not Found.' }).appendTo( ".car-filter-area");
				var header_height = $('#header').height(),
					remaining_height = parseInt($(window).height() - header_height);
				$('.not-found').height(remaining_height);
				$('.loading').hide();
				$('#arrow-up-car').hide()
				$('#arrow-down-car').hide();
			}
		}
	})// End of AJAX call.
};// End of Function: View2/3: Display Algo.



//////////////////////////////////////////////////////////////////////////////////////////
//function: setResponsiveness.															//
//////////////////////////////////////////////////////////////////////////////////////////
fordWebappfilter.setResponsiveness = function() {
	var header_height = $('#header').height(),
		remaining_height = parseInt($(window).height() - header_height),

		yQuestionArea = $('.search-area').scrollTop(),
		trueQuestionAreaHeight = $('.search-area')[0].scrollHeight,
		questionAreaHeight = $('.search-area').height(),
		questionAreaScrollLeft = trueQuestionAreaHeight - questionAreaHeight,

		yCarArea = $('.results-area').scrollTop(),
		trueCarAreaHeight = $('.results-area')[0].scrollHeight,
		carAreaHeight = $('.results-area').height(),
		carAreaScrollLeft = trueCarAreaHeight - carAreaHeight;

	$('.search-area').height(remaining_height);
	$('.results-area').height(remaining_height);
	$('.not-found').height(remaining_height);
	//$('.not-found').height(remaining_height);

	$('#arrow-up').css("margin-top", yQuestionArea+"px");
	$('#arrow-down').css("margin-top", parseInt($(window).height() - header_height) - 53 +6+ yQuestionArea+"px");
	
	$('#arrow-up-car').css("margin-top", yCarArea+"px");
	$('#arrow-down-car').css("margin-top", parseInt($(window).height() - header_height) - 53 + yCarArea+"px");

	//alert(trueQuestionAreaHeight+':'+questionAreaHeight);
	
	if (yQuestionArea == 0){$('#arrow-up').hide();}else{$('#arrow-up').show();}
	//if (yQuestionArea != questionAreaScrollLeft){$('#arrow-down').hide();}else{$('#arrow-down').show();}
	
	if (yCarArea == 0){$('#arrow-up-car').hide();}else{$('#arrow-up-car').show();}
	
	//alert('trueCarAreaHeight:'+trueCarAreaHeight+', $(".results-area")[0].scrollHeight:'+$('.results-area')[0].scrollHeight+'\ncarAreaHeight:'+carAreaHeight+', $(".results-area").height():'+$('.results-area').height()+'\nyCarArea:'+yCarArea+'\ncarAreaScrollLeft:'+carAreaScrollLeft);

	//if (yCarArea == carAreaScrollLeft){$('#arrow-down-car').hide();}else{$('#arrow-down-car').show();}
	//if (yCarArea == ($('.results-area')[0].scrollHeight - $('.results-area').height())){$('#arrow-down-car').hide();}else{$('#arrow-down-car').show();}
	//if ($(window).height() > $('.results-area')[0].scrollHeight ){$('#arrow-down-car').hide();}else{$('#arrow-down-car').show();}
	//alert($('.results-area')[0].scrollHeight+','+$(window).height());
	

	//$('.refresh-button').css("bottom", parseInt($(window).height() - (header_height/2) - 32)+"px");
	//$('.refresh-button').css("left", parseInt($(window).width() - ($(window).width()/50) - 31)+"px");
	
	/*var newDimensions = {
		width: $(window).width(),
		height: $(window).height()
	};*/

	/*if (newDimensions.width > fordWebappfilter.previousDimensions.width)
	{
		// scaling up
	}
	else
	{
		// scaling down
	}*/

	// Store the new dimensions
	//fordWebappfilter.previousDimensions = newDimensions;
};// End of Function: setResponsiveness.

//////////////////////////////////////////////////////////////////////////////////////////
//Function: embeddQuestions. 															//
//////////////////////////////////////////////////////////////////////////////////////////
fordWebappfilter.embeddQuestions = function() {
	fordWebappfilter.questionsArray = $('#questions-array').embeddedData();
	//alert(typeof(fordWebappfilter.questionsArray) == 'undefined');return;

	if(JSON.stringify(fordWebappfilter.questionsArray) != "{}")
	{
		if ($("#question-area-template").length != 0)
		{
			var questionAreaMarkup = $("#question-area-template").html();
			$.template("questionAreaTemplate",questionAreaMarkup);
			$.tmpl("questionAreaTemplate",fordWebappfilter.questionsArray).appendTo( ".question-area");
			fordWebappfilter.createQuestionsSliders();
		}
	}
	else
	{
		//fordWebappfilter.injectQuestions();
	}
};// End of  embeddQuestions.

//////////////////////////////////////////////////////////////////////////////////////////
//Function: injectQuestions. 															//
//////////////////////////////////////////////////////////////////////////////////////////
/*fordWebappfilter.injectQuestions = function() {
	$.ajax({
		url: fordWebappfilter.urlQuestionsArray,
		crossDomain: true,
		contentType:"application/json; charset=UTF-8",
		dataType: "json",
		success: function(data) {
			if ($("#question-area-template").length != 0)
			{
				var questionAreaMarkup = $("#question-area-template").html();
				$.template("questionAreaTemplate",questionAreaMarkup);
				$.tmpl("questionAreaTemplate",data).appendTo( ".question-area");
				fordWebappfilter.questionsArray = data;
				fordWebappfilter.createQuestionsSliders();
			}
		},
		error: function(e) {
		   console.log('QuestionsArray Error:'+e.message);
		},
		statusCode: {
		404: function() {
				console.log( "QuestionsArray API not found" );
			}
		}
	})// End of AJAX call.
}*/;// End of  injectQuestions.

//////////////////////////////////////////////////////////////////////////////////////////
//Function: createQuestionsSliders. 												//
//////////////////////////////////////////////////////////////////////////////////////////
fordWebappfilter.createQuestionsSliders = function() {
	////////////////////////////////////////////////////////////////////
	for (var i in fordWebappfilter.questionsArray)
	{
		if (fordWebappfilter.questionsArray[i]['type'] == 'equal')
		{
			fordWebappfilter.answers[fordWebappfilter.questionsArray[i].id] = 0;
		}
		else if (fordWebappfilter.questionsArray[i]['type'] == 'range')
		{
			fordWebappfilter.answers[fordWebappfilter.questionsArray[i].id] = fordWebappfilter.questionsArray[i]['answers'][0].value+','+fordWebappfilter.questionsArray[i]['answers'][1].value;
		}
	}
	////////////////////////////////////////////////////////////////////
	var slideid,slideMax,maxcnt;

	for (var key in fordWebappfilter.questionsArray)
	{
		if (fordWebappfilter.questionsArray.hasOwnProperty(key))
		{
			slideid = "#slider" + fordWebappfilter.questionsArray[key]['id'];
			slideMax = fordWebappfilter.questionsArray[key]['answers'].length - 1;
			maxcnt = parseInt(slideMax);

			if (fordWebappfilter.questionsArray[key]['type'] == 'equal')
			{
				$( slideid ).slider({
						  value:0,
						  min: 0,
						  max: maxcnt,
						  step: 1,
						  slide: function( event, ui ) {
								fordWebappfilter.answers[parseInt(this.id.replace("slider",""))] = ui.value;
								
						  },
						  stop: function(event, ui) {
								//reset.
								var isResetCounter = 0;
								for(i = 0 ; i < fordWebappfilter.questionsArray.length; i++)
								{
									if (fordWebappfilter.questionsArray[i]['type'] == 'equal')
									{
										if ($( "#slider"+fordWebappfilter.questionsArray[i]['id'] ).slider( "value" ) == 0)
										{
											isResetCounter = isResetCounter+1;
										}
									}

									if (fordWebappfilter.questionsArray[i]['type'] == 'range')
									{
										if ($( "#slider"+fordWebappfilter.questionsArray[i]['id'] ).slider( "values", 0 ) == fordWebappfilter.minRange && $( "#slider"+fordWebappfilter.questionsArray[i]['id'] ).slider( "values", 1 ) == fordWebappfilter.maxRange)
										{
											isResetCounter = isResetCounter+1;
										}
									}
								}
								if (fordWebappfilter.questionsArray.length == isResetCounter )
								{
									fordWebappfilter.viewNamePlates();
								}
								else
								{
									fordWebappfilter.viewTwoOrThree();
								}
						  }
					}); //End of Discrete Slider.
			}// End of if statement Type:Discrete
			if (fordWebappfilter.questionsArray[key]['type'] == 'range')
			{
				fordWebappfilter.minRange = parseInt(fordWebappfilter.questionsArray[key]['answers'][0].value);
				fordWebappfilter.maxRange = parseInt(fordWebappfilter.questionsArray[key]['answers'][1].value);

				$( slideid ).slider({
						  range: true,
						  min: fordWebappfilter.minRange,
						  max: fordWebappfilter.maxRange,
						  values: [ fordWebappfilter.minRange, fordWebappfilter.maxRange ],
						  step: 1000,
						  slide: function( event, ui ) {
							  if ((ui.values[1] - ui.values[0]) <= 4000  ) 
							  {
									return false;
							  }

							$( "#amount"+fordWebappfilter.questionsArray[key]['id'] ).val( "$" + fordWebappfilter.addCommas(ui.values[ 0 ]) + " - $" + fordWebappfilter.addCommas(ui.values[ 1 ]) );

							fordWebappfilter.answers[parseInt(this.id.replace("slider",""))] = ui.values[ 0 ]+','+ui.values[ 1 ];
						  },
						  stop: function(event, ui) {
							  	//reset.
								var isResetCounter = 0;
								for(i = 0 ; i < fordWebappfilter.questionsArray.length; i++)
								{
									if (fordWebappfilter.questionsArray[i]['type'] == 'equal')
									{
										if ($( "#slider"+fordWebappfilter.questionsArray[i]['id'] ).slider( "value" ) == 0)
										{
											isResetCounter = isResetCounter+1;
										}
									}

									if (fordWebappfilter.questionsArray[i]['type'] == 'range')
									{
										if ($( "#slider"+fordWebappfilter.questionsArray[i]['id'] ).slider( "values", 0 ) == fordWebappfilter.minRange && $( "#slider"+fordWebappfilter.questionsArray[i]['id'] ).slider( "values", 1 ) == fordWebappfilter.maxRange)
										{
											isResetCounter = isResetCounter+1;
										}
									}
								}
								if (fordWebappfilter.questionsArray.length == isResetCounter )
								{
									fordWebappfilter.viewNamePlates();
								}
								else
								{
									fordWebappfilter.viewTwoOrThree();
								}
							  }
					});
					$( "#amount"+fordWebappfilter.questionsArray[key]['id'] ).val( "$" + fordWebappfilter.addCommas($( slideid ).slider( "values", 0 )) +
					  " - $" + fordWebappfilter.addCommas($( slideid ).slider( "values", 1 ) ));
			}// End of if statement Type:Continuous
		}// End of if statement
	}// End of For loop on fordWebappfilter.questionsArray.
};// End of createQuestionsSliders.


	
(function($){
	
	//////////////////////////////////////////////////////////////////////////////////////////
	//document ready function. 																//
	//////////////////////////////////////////////////////////////////////////////////////////
	$(document).ready(function(){	

		//window.moveTo(0, 0);
		//window.resizeTo(screen.availWidth, screen.availHeight);

		/*window.moveTo(0,0);
		if (document.all)
		{
			top.window.resizeTo(screen.availWidth,screen.availHeight);
		}
		
		else if (document.layers||document.getElementById)
		{
			 if (top.window.outerHeight<screen.availHeight||top.window.outerWidth<screen.availWidth)
			 {
				top.window.outerHeight = screen.availHeight;
				top.window.outerWidth = screen.availWidth;
			 }
		}*/

		/*window.innerWidth = screen.width;
		window.innerHeight = screen.height;
		window.screenX = 0;
		window.screenY = 0;
		alwaysLowered = false;*/

		fordWebappfilter.viewNamePlates();
		//fordWebappfilter.injectQuestions();
		fordWebappfilter.embeddQuestions();

		//////////////////////////////////////////////////////////////////////////////////////////
		//Function: Reset Button. 																//
		//////////////////////////////////////////////////////////////////////////////////////////
		$('#reset').click(function () {
			var i,slideid;
			for(i = 0; i < fordWebappfilter.questionsArray.length; i++)
			{
				slideid = "#slider" + fordWebappfilter.questionsArray[i]['id'];
				if (fordWebappfilter.questionsArray[i]['type'] == 'equal')
				{
					$(slideid).slider({value:0});
					fordWebappfilter.answers[fordWebappfilter.questionsArray[i].id] = 0;
				}
				if (fordWebappfilter.questionsArray[i]['type'] == 'range')
				{
					$(slideid).slider("values",[fordWebappfilter.minRange, fordWebappfilter.maxRange]);
					$( "#amount"+fordWebappfilter.questionsArray[i]['id'] ).val( "$" + fordWebappfilter.addCommas($( slideid ).slider( "values", 0 )) +
					  " - $" + fordWebappfilter.addCommas($( slideid ).slider( "values", 1 ) ));

					  fordWebappfilter.answers[fordWebappfilter.questionsArray[i].id] = fordWebappfilter.questionsArray[i]['answers'][0].value+','+fordWebappfilter.questionsArray[i]['answers'][1].value;
				}
			}

			fordWebappfilter.viewNamePlates();		
		});// End of Reset Button.

		fordWebappfilter.setResponsiveness();

		$(window).bind('orientationchange', function(event) {
			//alert('new orientation:' + orientation);
			fordWebappfilter.setResponsiveness();
		});

		$(window).resize(function(e) {
			fordWebappfilter.setResponsiveness();
		});
		

		//////////////////////////////////////////////////////////////////////////////////////////
		//scroll: .search-area. 																//
		//////////////////////////////////////////////////////////////////////////////////////////
		$(".search-area").scroll(function(event) {
			//fordWebappfilter.setResponsiveness();
			var y = $(this).scrollTop();
			var x = $(this).scrollLeft();

			var trueQuestionAreaHeight = $('.search-area')[0].scrollHeight;
			var questionAreaHeight = $('.search-area').height();
			var questionAreaScrollLeft = trueQuestionAreaHeight - questionAreaHeight;

			if (y == 0){$('#arrow-up').hide();}else{$('#arrow-up').show();}
			if (y == questionAreaScrollLeft){$('#arrow-down').hide();}else{$('#arrow-down').show();}
			
			//alert(parseInt($(window).height() - $('#header').height()) - 53 + y);

			$('#arrow-down').css("margin-top", parseInt($(window).height() - $('#header').height()) - 53+6+ y+"px");
			$('#arrow-up').css("margin-top", y+"px");
		});
		
		//////////////////////////////////////////////////////////////////////////////////////////
		//scroll: .results-area. 																//
		//////////////////////////////////////////////////////////////////////////////////////////
		$(".results-area").scroll(function(event) {
			//fordWebappfilter.setResponsiveness();
			var y = $(this).scrollTop();
			var x = $(this).scrollLeft();

			var trueCarAreaHeight = $('.results-area')[0].scrollHeight;
			var carAreaHeight = $('.results-area').height();
			var carAreaScrollLeft = trueCarAreaHeight - carAreaHeight;

			if (y == 0){$('#arrow-up-car').hide();}else{$('#arrow-up-car').show();}
			if (y == carAreaScrollLeft){$('#arrow-down-car').hide();}else{$('#arrow-down-car').show();}
			
			//alert(parseInt($(window).height() - $('#header').height()) - 53 + y);

			$('#arrow-down-car').css("margin-top", parseInt($(window).height() - $('#header').height()) - 53 + y+"px");
			$('#arrow-up-car').css("margin-top", y+"px");
		});
		
		//////////////////////////////////////////////////////////////////////////////////////////
		//up: click. 																			//
		//////////////////////////////////////////////////////////////////////////////////////////
		$('#arrow-up-car').click(function () {
				scroll_iteration = (parseInt(parseInt($('.results-area')[0].scrollHeight - $('.results-area').height())/126))*126;
				if ($('.results-area').scrollTop() <= scroll_iteration)
				{
					$('#arrow-down-car').show();
				}
				if ($('.results-area').scrollTop() == 0){$('#arrow-up-car').hide();return;}
				if ($('.results-area').scrollTop() == 126){$('#arrow-up-car').hide();}
				$('.results-area').animate({ "scrollTop": "-=126px" }, "fast");
				$('#arrow-up-car').css("margin-top", "-=126px");
				$('#arrow-down-car').css("margin-top", "-=126px");
		});// End of up: click.
		
		//////////////////////////////////////////////////////////////////////////////////////////
		//down: click.			 																//
		//////////////////////////////////////////////////////////////////////////////////////////
		$('#arrow-down-car').click(function () {
			scroll_iteration = (parseInt(parseInt($('.results-area')[0].scrollHeight - $('.results-area').height())/126))*126;
			if ($('.results-area').scrollTop() >= scroll_iteration)
			{
				$('#arrow-down-car').hide();
				//return;
			}
			$('.results-area').animate({ "scrollTop": "+=126px" }, "fast");
			$('#arrow-up-car').css("margin-top", "+=126px");
			$('#arrow-down-car').css("margin-top", "+=126px");
			$('#arrow-up-car').show();
		});// End of down: click.
		
		//////////////////////////////////////////////////////////////////////////////////////////
		//up: click. 																			//
		//////////////////////////////////////////////////////////////////////////////////////////
		$('#arrow-up').click(function () {
				scroll_iteration = (parseInt(parseInt($('.search-area')[0].scrollHeight - $('.search-area').height())/150))*150;
				if ($('.search-area').scrollTop() <= scroll_iteration)
				{
					$('#arrow-down').show();
				}
				if ($('.search-area').scrollTop() == 0){$('#arrow-up').hide();return;}
				if ($('.search-area').scrollTop() == 150){$('#arrow-up').hide();}
				$('.search-area').animate({ "scrollTop": "-=150px" }, "fast");
				$('#arrow-up').css("margin-top", "-=150px");
				$('#arrow-down').css("margin-top", "-=150px");
		});// End of up: click.

		//////////////////////////////////////////////////////////////////////////////////////////
		//down: click.			 																//
		//////////////////////////////////////////////////////////////////////////////////////////
		$('#arrow-down').click(function () {
			//debugger;
			scroll_iteration = (parseInt(parseInt($('.search-area')[0].scrollHeight - $('.search-area').height())/150))*150;
			if ($('.search-area').scrollTop() >= scroll_iteration)
			{
				$('#arrow-down').hide();
				//return;
			}
			$('.search-area').animate({ "scrollTop": "+=150px" }, "fast");
			$('#arrow-up').css("margin-top", "+=150px");
			$('#arrow-down').css("margin-top", "+=150px");
			$('#arrow-up').show();
		});// End of down: click.


		//////////////////////////////////////////////////////////////////////////////////////////
		//up: mousedown. 																		//
		//////////////////////////////////////////////////////////////////////////////////////////
		var upTimeout;
		$('#arrow-up').mousedown(function () {
				upTimeout = setInterval(function(){
					scroll_iteration = (parseInt(parseInt($('.search-area')[0].scrollHeight - $('.search-area').height())/50))*50;
					if ($('.search-area').scrollTop() <= scroll_iteration)
					{
						$('#arrow-down').show();
					}
					if ($('.search-area').scrollTop() == 0){$('#arrow-up').hide();clearInterval(upTimeout); return false;}
					if ($('.search-area').scrollTop() == 50){$('#arrow-up').hide();clearInterval(upTimeout);}
					$('.search-area').animate({ "scrollTop": "-=50px" }, "fast");
					$('#arrow-up').css("margin-top", "-=50px");
					$('#arrow-down').css("margin-top", "-=50px");

				}, 500);

				return false;
		}).mouseup(function(){clearInterval(upTimeout); return false;});// End of up: mousedown.

		//////////////////////////////////////////////////////////////////////////////////////////
		//down: mousedown.		 																//
		//////////////////////////////////////////////////////////////////////////////////////////
		var downTimeout;
		$('#arrow-down').mousedown(function () {
				downTimeout = setInterval(function(){
					scroll_iteration = (parseInt(parseInt($('.search-area')[0].scrollHeight - $('.search-area').height())/50))*50;
					if ($('.search-area').scrollTop() >= scroll_iteration)
					{
						$('#arrow-down').hide();
						clearInterval(downTimeout);
						return false;
					}
					$('.search-area').animate({ "scrollTop": "+=50px" }, "fast");
					$('#arrow-up').css("margin-top", "+=50px");
					$('#arrow-down').css("margin-top", "+=50px");
					$('#arrow-up').show();
				}, 500);

				return false;
		}).mouseup(function() {clearInterval(downTimeout); return false;}); // End of down: mousedown.

	});// End of document ready function.

	$('#myModal').foundation('reveal', 'open');
	$('#myModal').foundation('reveal', 'close');
	$(".close-reveal-modal").click(function(){
		$('#myModal').hide();
	});
}(jQuery));// End of Document's manin fucntion.

