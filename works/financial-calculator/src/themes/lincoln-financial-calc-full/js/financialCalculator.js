financialCalculator=angular.module('financialCalculator',['ngRoute']);
financialCalculator.config(['$routeProvider',function($routeProvider){
	$routeProvider
		.when('/',{
			template:function(){return $('#lfc-model-series-template').html();},
			controller:'modelSeriesController'
		}).when('/model/:model/series/:derivative/calculate',{
			template:function(){return $('#lfc-calculate-template').html();},
			controller:'calculatorController'
		}).otherwise({
			redirectTo:'/'
		});
}]);
financialCalculator.value('appValue',{});
financialCalculator.factory('webAPI',['$http','appValue',function($http,appValue){
	var services = {get:function(url,appValueAttrName){
		return $http.get(url).then(function(data){
			appValue[appValueAttrName]=data.data;
			return data.data;
			},function(error){
			console.log(error.statusText);
			});
		}
	};
	return services;	
}]);
financialCalculator.controller('modelSeriesController',['$scope','$location','appValue','webAPI',function($scope,$location,appValue,webAPI){
	$scope.appValue=appValue;
	appValue.currentStep=1;
	webAPI.get('../rest/financialcalcfull/models.json','models');

	$scope.selectModel=function(model){
		appValue.selectedModel=model;
		webAPI.get('../rest/financialcalcfull/derivatives.json','derivatives');
	};
	$scope.selectDerivative=function(derivative){
		appValue.selectedDerivative=derivative;
	};
	$scope.gotoCalculatePage=function(){
		appValue.currentStep=2;
		$location.path('/model/:model/series/:derivative/calculate'.replace(':model',appValue.selectedModel.id).replace(':derivative',appValue.selectedDerivative.id));
	}

}]);
financialCalculator.controller('calculatorController',['$scope','$location','appValue','webAPI',function($scope,$location,appValue,webAPI){
	$scope.appValue=appValue;
	webAPI.get('../rest/financialcalcfull/gmfv.json','gmfv').then(
		function (gmfv){
			appValue.selectedProduct=gmfv.products[0];
		}
	);
	appValue.selectedTerm=12;
	appValue.downPayment=appValue.selectedDerivative.price*0.2;
	appValue.monthlyPayment=appValue.selectedDerivative.price/appValue.selectedTerm;

	$scope.changeFlag=function(e){
		e.preventDefault();
		$(e.target).parent().children().removeClass('active');
		$(e.target).addClass('active');
		appValue.selectedTerm=$(e.target).data('value');
		appValue.monthlyPayment=appValue.selectedDerivative.price/appValue.selectedTerm;
	} ;
	$scope.changeProduct=function(index,e){

		e.preventDefault();
		$(e.target).parent().parent().children().removeClass('active');
		$(e.target).parent().addClass('active');
		appValue.selectedProduct=appValue.gmfv.products[index];
	}

}]);
(function($){
	angular.element(document).ready(function(){
		angular.bootstrap($('#content'),['financialCalculator']);
	});
})(jQuery);


