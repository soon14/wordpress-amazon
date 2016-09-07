/*
Author:                 Joel Wang
File name:              paymentEstimatorConstant.js
Description:            payment estimator constants
Dependencies:           angular.min.js  angular-route.min.js
Usage:                  China Payment Estimator project
*/

guxApp.paymentEstimator.constant('routeConstants', {
    home: {
        path: '/',
        controller: 'nameplateController',
        template: function() {
        	return $('#pet-nameplate-template').html();
        }
    },
    model: {
    	path:'/model',
        controller: 'modelController',
        template: function() {
        	return $('#pet-model-template').html();
        }
    },
    errorpage: {
        path:'/errorpage',
        controller: 'errorController',
        template: function() {
            return $('#pet-error-page-template').html();
        }
    }
});


/*guxApp.paymentEstimator.constant('apiConstants', {
});*/
 