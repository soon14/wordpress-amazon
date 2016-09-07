/*
Author:                 Joel Wang
File name:              paymentEstimatorBootstrap.js
Description:            starts up angular
Dependencies:           angular.min.js angular-route.min.js
Usage:                  China Payment Estimator project
*/
(function() {
        angular.element(document).ready(function() {
                        //config of pet scope
        		var $petConfig = $('#payment-estimator-config');
                        //config of common,restINfo&priceFormat
        		FCC.commonConfig = $('#common-config').embeddedData();
                        FCC.restInfo = guxApp.tools.restServicesData();
        		FCC.priceFormatOptions = $('#mpz-config').embeddedData();
		        if ($petConfig.length > 0) {
		            FCC.configJSON = JSON.parse($petConfig.html());
		        } else {
		            FCC.configJSON = {};
		        };
                // if($('.payment-presenter-alt').length==0) return;
                angular.bootstrap($('#content'),['paymentEstimator']);
        });
})();
 