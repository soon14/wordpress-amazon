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
		appValue.stateVal=stateVal;
		appValue.downPayment=$scope.vehiclePrice*0.2;
	};
	$scope.calculateDownPaymentPercentage = function() {
		if (!isNaN(appValue.downPayment) && appValue.downPayment<=$scope.vehiclePrice) {
			appValue.downPaymentPercentage = Math.round((appValue.downPayment/$scope.vehiclePrice)*100);
			$scope.calculate();
		}
	};
	$scope.calculateSelectedTerm = function() {
		appValue.selectedTerm=appValue.gmfv.products[0]['sub-products'][0]['term-rates'][appValue.sliderValue].term;
		appValue.selectedTermRate = appValue.gmfv.products[0]['sub-products'][0]['term-rates'][appValue.sliderValue].rate;
		$scope.calculate();
		
	};
	$scope.setFlagValue = function(i,e) {
		$(e.target).parent().children().removeClass('active');
		$(e.target).addClass('active');
		appValue.selectedTerm=appValue.gmfv.products[1]['sub-products'][1]['term-rates'][i].term;
		appValue.selectedTermRate = appValue.gmfv.products[1]['sub-products'][1]['term-rates'][i].rate;
		$scope.calculate();
	};
	$scope.calculate = function() {
		var amountFinanced = ($scope.vehiclePrice - appValue.downPayment),
            rc=	appValue.selectedTermRate/1200,
			rcPlus1ToPowerOfSelectedTerm = Math.pow((1 + rc), appValue.selectedTerm),
            rcPlus1ToPowerOfSelectedTermMinus1 = Math.pow((1 + rc), (appValue.selectedTerm-1));
            appValue.totalMonthlyPayment =
                    amountFinanced *
                    ((rc * rcPlus1ToPowerOfSelectedTerm) / (rcPlus1ToPowerOfSelectedTerm - 1));

	};
	fetchModelAndSeries();
	
}]);
