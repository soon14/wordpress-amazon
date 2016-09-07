/*
 * Author: Dawood Butt
 * Description: Need Assessment global JS
 */
var fordWebappfilter = fordWebappfilter || {};
fordWebappfilter.answers = new Array();
fordWebappfilter.filterCar = [];
fordWebappfilter.namePlates = [];
fordWebappfilter.sendDownLoadMsg;
fordWebappfilter.SiteConf = {
	'dev':true
};
/*fordWebappfilter.previousDimensions = {
		width: $(window).width(),
		height: $(window).height()
	};*/

$(document).ready(function(){

	fordWebappfilter.commonConfig = function() {
		if (fordWebappfilter.commonConfiture === undefined) {
			fordWebappfilter.commonConfiture = $('#common-config').embeddedData();
		} 
		return fordWebappfilter.commonConfiture;
	};

	fordWebappfilter.derivativeCategory = function() {
		if (fordWebappfilter.categoryids === undefined) {
			fordWebappfilter.categoryids = $('#derivative-category').embeddedData();
		}
		
		fordWebappfilter.categoryid = [];
		for (var i in fordWebappfilter.categoryids)
		{
			 fordWebappfilter.categoryid.push(fordWebappfilter.categoryids[i]['id']);
		}
		return fordWebappfilter.categoryid.join(",");
	};
	
	fordWebappfilter.serviceLocator = function(service) {
		if (fordWebappfilter.restServicesConfig == null) {
			fordWebappfilter.restServicesConfig = $('#rest-services').embeddedData();
		}
		//{site}/{priceZone}{categoryids}
		var url = fordWebappfilter.restServicesConfig[service].replace('{site}', fordWebappfilter.commonConfig().site);
		url = url.replace('{priceZone}', fordWebappfilter.commonConfig().priceZone);
		return url.replace('{categoryids}', fordWebappfilter.derivativeCategory());
	};
	if (fordWebappfilter.SiteConf.dev)
	{
		//fordWebappfilter.urlQuestionsArray = fordWebappfilter.serviceLocator("questions.array");
		fordWebappfilter.urlNamePlates = fordWebappfilter.serviceLocator("model.derivatives");
		fordWebappfilter.urlDerivativeCategory = fordWebappfilter.serviceLocator("derivative.category-features");
	}
	else
	{
		//fordWebappfilter.urlQuestionsArray = fordWebappfilter.serviceLocator("questions.array");
		fordWebappfilter.urlNamePlates = 'http://www.ford.com.au/servlet/rest/tools/buildandprice/FOA/1137384063721/models';
		fordWebappfilter.urlDerivativeCategory = 'http://www.ford.com.br/servlet/rest/tools/comparator/FBR/results/derivatives/1249038351864%2c1249038352102%2c1249038352140';
	}
});