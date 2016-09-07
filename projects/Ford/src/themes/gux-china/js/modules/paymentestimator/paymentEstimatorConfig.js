/*
Author:                 Joel Wang
File name:              paymentEstimatorConfig.js
Description:    		payment estimator config
Dependencies:   		angular.min.js  angular-route.min.js
Usage:                  China Payment Estimator project
*/

guxApp.paymentEstimator.config(['$routeProvider','routeConstants', function ($routeProvider, routeConstants) {
	$routeProvider
		.when(routeConstants.home.path, {
		//root url to call nameplate service
			template:routeConstants.home.template,
			controller:routeConstants.home.controller
		}).when(routeConstants.model.path, {
		//model url to call model service
			template:routeConstants.model.template,
			controller:routeConstants.model.controller
		}).when(routeConstants.errorpage.path, {
		//error page
			template:routeConstants.errorpage.template,
			controller:routeConstants.errorpage.controller
		}).otherwise({
		//redirect to root rul
			redirectTo:routeConstants.home.path
		});
}])
// page level ominature collected by applicaiton by default
/*.run(['$rootScope', function($rootScope) {
    $rootScope.$on('getmodelFinished', function(event, current){        
        _da.pname = 'ford credit:payment estimator';
        ND.analyticsTag.trackOmnitureSinglePageApp();
    });
}])*/
;