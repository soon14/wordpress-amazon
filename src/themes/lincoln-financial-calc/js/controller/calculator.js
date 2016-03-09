financialCalculator.controller('calculatorController',['$scope','routeConstants','appValue','$http','webAPI','$location','$routeParams',function($scope,routeConstants,appValue,$http,webAPI,$location,$routeParams){
	var init = function(){
		appValue.currentStep = 1;
		$scope.vehiclePrice=appValue.selectedDerivative.price;
		appValue.downPaymentPercentage=20;
		appValue.downPayment=$scope.vehiclePrice*appValue.downPaymentPercentage/100;
	},
		fetchModelAndSeries = function () {
		if (!appValue.selectedModel||!appValue.selectedDerivative) {
			webAPI.getModels().then(function(models){
				$.each(models,function(i,model){
					if(model.id==$routeParams.model) {
						appValue.selectedModel=model;
						webAPI.getSeries(appValue.selectedModel).then(function(series){
							$.each(series,function(j,derivative){
								if(derivative.id==$routeParams.derivative) {
									appValue.selectedDerivative=derivative;
									webAPI.getGMFV(appValue.selectedModel,appValue.selectedDerivative).then(function(gmfvData){
										init();
									});
								}
							});
						});
					}
				});
			});
		}
		else {
			webAPI.getGMFV(appValue.selectedModel,appValue.selectedDerivative).then(function(gmfvData){
				init();
			});
		}

	};
	$scope.changeModel = function(e) {
		e.preventDefault();
		appValue.selectedModel=null;
		appValue.selectedDerivative = null;
		appValue.model=null;
		appValue.series=null;
		$location.path(routeConstants.home.path);
	};
	$scope.changeState = function(stateVal,event) {
		event.preventDefault();
	};
	$scope.calculateDownPaymentPercentage = function() {
		if (!isNaN(appValue.downPayment) && appValue.downPayment<=$scope.vehiclePrice) {
			appValue.downPaymentPercentage = Math.round((appValue.downPayment/$scope.vehiclePrice)*100);
		}
	};
	$scope.calculateSelectedTerm = function() {
		appValue.selectedTerm=appValue.gmfv.products[0]['sub-products'][0]['term-rates'][appValue.sliderValue].term;
		appValue.selectedTermRate = appValue.gmfv.products[0]['sub-products'][0]['term-rates'][appValue.sliderValue].rate;
		
	}
	fetchModelAndSeries();
	
}]);
