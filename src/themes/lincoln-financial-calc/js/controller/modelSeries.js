financialCalculator.controller('modelSeriesController',['$scope','routeConstants','appValue',function($scope,routeConstants,appValue){
	$scope.appValue=appValue;
	appValue.currentStep=0;
}])