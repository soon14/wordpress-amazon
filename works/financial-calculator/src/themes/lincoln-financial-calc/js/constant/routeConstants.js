financialCalculator.constant('routeConstants',{
	home:{
		path:'/',
		controller:'modelSeriesController',
		template:function(){
			return $('#lfc-model-series-template').html();
		}
	},
	calculate: {
		path:'/model/:model/series/:derivative/calculate',
		template: function() {
			return $('#lfc-calculate-template').html();
		},
		controller:'calculatorController'
	}
});
