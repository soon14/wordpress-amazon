financialCalculator.directive('lfcUserProgress',[function(){
	return {
		restrict:'A',
		replace:true,
		template: function() {
			return $('#lfc-user-progress-template').html();
		},
		link:function(scope,element,attr){

		},
		controller:['$scope','appValue',function($scope,appValue){
			$scope.appValue = appValue;
		}]

	}
}]);
