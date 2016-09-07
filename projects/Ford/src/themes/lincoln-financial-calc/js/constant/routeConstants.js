/**
 * @author Sohrab Zabetian
 * @description constants for routing
 * @project Financial calculator
 */
ND.LFC.financialCalculator.constant('routeConstants', {
    home: {
        path: '/',
        controller: 'modelSeriesController',
        template: function() {
            return $('#lfc-model-series-template').html(); //must use templates in this way. we cannot dynamically pull html pages
        }
    },
    calculate: {
        path:'/model/:model/series/:derivative/engine/:engine/calculate',
        template: function() {
            return $('#lfc-calculate-template').html(); //must use templates in this way. we cannot dynamically pull html pages
        },
        controller: 'calculatorController'
    },
    calculateWithPrice: {
        //path:'/catalogId/:catalogId/wersCode/:wersCode/price/:price/calculate',
        path: '/catalogId/:catalogId/wersCode/:wersCode/engine/:engine/price/:price/userSelected/:userSelected?/calculate',
        template: function() {
            return $('#lfc-calculate-template').html(); //must use templates in this way. we cannot dynamically pull html pages
        },
        controller: 'calculatorController'
    }
});