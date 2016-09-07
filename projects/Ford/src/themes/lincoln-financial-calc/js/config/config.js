
ND.LFC.financialCalculator

.config(['$routeProvider', 'routeConstants', function ($routeProvider, routeConstants) {
    $routeProvider
        .when(routeConstants.home.path, {
            template: routeConstants.home.template,
            controller: routeConstants.home.controller
        }).when(routeConstants.calculate.path, {
            template: routeConstants.calculate.template,
            controller: routeConstants.calculate.controller
        }).when(routeConstants.calculateWithPrice.path, {
            template: routeConstants.calculateWithPrice.template,
            controller: routeConstants.calculateWithPrice.controller
        }).otherwise({
            redirectTo: routeConstants.home.path
        });

}])

.run(['$rootScope', 'routeConstants', 'lincolnNav', function($rootScope, routeConstants, lincolnNav) {

    $rootScope.$on('$routeChangeSuccess', function(event, current){
        var curController = current.controller;

        if(curController === routeConstants.calculate.controller){
            _da.pname += ':summary';
        }else if(curController ===  routeConstants.home.controller){
            _da.pname = 'finance:payment estimator';
        }else{
            return false;
        }
        ND.analyticsTag.trackOmnitureSinglePageApp();
    });

    // Fix vehicle nav header
    lincolnNav.init();

}]);
