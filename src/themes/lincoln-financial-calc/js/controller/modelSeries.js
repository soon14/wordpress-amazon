financialCalculator.controller('modelSeriesController',['$scope','routeConstants','appValue','$http','webAPI',function($scope,routeConstants,appValue,$http,webAPI){
	$scope.appValue=appValue;
	appValue.currentStep=0;
	// $http.get('../rest/financialcalc/models.json').then(function(data){
	// 	appValue.model=data;
	// });
	webAPI.getModels();
	$scope.selectModel = function(model) {
		appValue.selectedModel = model;
		webAPI.getSeries(model);
	}
	
}])