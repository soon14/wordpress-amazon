financialCalculator.controller('modelSeriesController',['$scope','routeConstants','appValue','$http','webAPI','$location',function($scope,routeConstants,appValue,$http,webAPI,$location){
	$scope.appValue=appValue;
	appValue.currentStep=0;
	$scope.continueButtonDisabled = true;
	// $http.get('../rest/financialcalc/models.json').then(function(data){
	// 	appValue.model=data;
	// });
	webAPI.getModels();
	$scope.selectModel = function(model) {
		appValue.selectedModel = model;
		appValue.series = null;
		webAPI.getSeries(model);
	}
	$scope.selectDerivative = function(derivative) {
		appValue.selectedDerivative = derivative;
		$scope.continueButtonDisabled = false;
	}
	$scope.gotoCalculatePage = function() {
		appValue.currentStep=1;
		$location.path(routeConstants.calculate.path.replace(':model',appValue.selectedModel.id).replace(':derivative',appValue.selectedDerivative.id));
	}
	
}]);
