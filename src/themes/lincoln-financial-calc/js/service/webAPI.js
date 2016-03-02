financialCalculator.factory('webAPI',['$http','$q','appValue',function($http,$q,appValue){
	var cache = {

	},
		services = {
			get:function(url,appValueAttrName) {
				return $http.get(url).then(function(data){
					appValue[appValueAttrName] = data.data;
					return data.data;
				},function(error){
					console.log(error.statusText);
				});
			}
		},
		publicServices = {
			getModels: function() {
				return services.get('../rest/financialcalc/models.json','models');
			},
			getSeries: function(model){
				return services.get('../rest/financialcalc/series.json','series');
			}
		};

		return publicServices;
}]);
