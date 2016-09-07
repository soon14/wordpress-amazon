/*
Author:                 Joel Wang
File name:              paymentEstimatorService.js
Description:            payment estimator services
Dependencies:           angular.min.js  angular-route.min.js angular-resource.min.js
Usage:                  China Payment Estimator project
*/
guxApp.paymentEstimator.factory('webAPI', ['$http', '$q', 'appValue', function ($http, $q, appValue) {
// service for ajax call

    var cache = {

    },
        services = {
            get: function (url, appValueAttrName) {
                if (services.isCached(url)) {
                    var defer = $q.defer();
                    var cachedData = services.cached(url);
                    
                    appValue[appValueAttrName] = cachedData;
                    defer.resolve(cachedData);

                    return defer.promise;
                }
                return $http.get(url).then(function (data) {
                    services.store(url, data.data);
                    appValue[appValueAttrName] = data.data;
                    return data.data;
                });
            },

            store: function (url, value) {
                cache[url] = value;

            },

            cached: function (url) {
                return cache[url];
            },

            isCached: function (url) {
                return angular.isDefined(cache[url]) && cache[url] != null;
            },

            reset: function (appValueAttrName) {
                appValue[appValueAttrName] = null;
            }
        },

        publicServices = {

            getNameplates: function () {
                return services.get(FCC.restInfo["pet.nameplateUrl"].replace('{site}', FCC.commonConfig.site), 'nameplates');
            },

            getModel: function (model) {
                return services.get(FCC.restInfo["pet.modelUrl"].replace('{site}', FCC.commonConfig.site).replace(':model', model.vehicleAssetId), 'modelDetail');
            },

            resetSeries: function () {
                services.reset('modelDetail');
            }
        };

    return publicServices;
}]);
guxApp.paymentEstimator.factory('formulaAPI', ['appValue', function(appValue) {
//service for calculation formula 
    var publicServices = {

        formulaEEB: function (program,product,term) {
        //formula for Equal/EW-Bundled product
            var iTerm = !!term.term?isNaN(term.term)?0:parseInt(term.term):0;
            var bRate = !!term.baseRate?isNaN(term.baseRate)?0:parseFloat(term.baseRate)/1200:0;
            var cRate = !!term.customerRate?isNaN(term.customerRate)?0:parseFloat(term.customerRate)/1200:0;
            var ratioSubvention = bRate==0?0:(Math.pow(1+bRate,iTerm)-1)/(bRate * Math.pow(1+bRate,iTerm));
            var ratioPayment    = iTerm==0?0:(cRate==0)?1/iTerm:cRate * Math.pow(1+cRate,iTerm)/(Math.pow(1+cRate,iTerm) - 1);
            if(appValue.invalidData) {
                term.monthlyPayment=term.totalSuvention=term.oemCSubvention=term.dealerSubvention=-1;
                return;
            }
            term.monthlyPayment = Math.round(product.amountFinanced * ratioPayment);  
            //monthly payment for equal or ew-bundled product
            switch (program.type) {
            //subvention for equal or ew-bundled product
                case  FCC.configJSON.standardProgram:
                //for standard program
                    term.totalSubvention    =   term.oemCSubvention=term.dealerSubvention=0;
                    break;
                case FCC.configJSON.timelimitedProgram:
                //for time limited program
                    if (term.oemSubvention=='') {
                        //fully subvention
                        term.totalSubvention    =   term.oemCSubvention =   Math.round(product.amountFinanced - product.amountFinanced * ratioPayment*ratioSubvention) ;
                        term.dealerSubvention   =   0;
                    } 
                    else {
                        //partial subvention
                        term.totalSubvention    =   Math.round(product.amountFinanced - product.amountFinanced * ratioPayment*ratioSubvention)  ;
                        term.oemCSubvention     =   term.totalSubvention<term.oemSubvention?term.totalSubvention:term.oemSubvention;
                        term.dealerSubvention   =   term.totalSubvention - term.oemCSubvention;
                    }
                    break;
                case FCC.configJSON.dealerProgram:
                //for dealer program
                    term.totalSubvention    =   Math.round(product.amountFinanced - product.amountFinanced * ratioPayment * ratioSubvention)  ;
                    term.oemCSubvention     =   0;
                    term.dealerSubvention   =   term.totalSubvention;
                    break;
            } 

            return ;

        },
        formulaHH: function (program,product,term) {
        //formula for 50-50 product
            var ballonPercent = !!FCC.configJSON.minFFDownpaymentPercent?isNaN(FCC.configJSON.minFFDownpaymentPercent)?50:parseFloat(FCC.configJSON.minFFDownpaymentPercent):50
            var ballonPayment = appValue.price*ballonPercent/100;
            var bRate = !!term.baseRate?isNaN(term.baseRate)?0:parseFloat(term.baseRate)/100:0;
            if(appValue.invalidData) {
                term.monthlyPayment=term.totalSuvention=term.oemCSubvention=term.dealerSubvention=-1;
                return;
            }
            term.monthlyPayment = 0;
            //monthly payment for 50-50 product
            switch (program.type) {
            //subvention for 50-50 product
                case  FCC.configJSON.standardProgram:
                //for starndard program
                    term.totalSubvention=term.oemCSubvention=term.dealerSubvention   =   0;
                    break;
                case FCC.configJSON.timelimitedProgram:
                //for time limited program
                    if (term.oemSubvention=='') {
                        //fully subvention
                        term.totalSubvention=term.oemCSubvention    =   Math.round(product.amountFinanced - ballonPayment/(1+bRate)) ;
                        term.dealerSubvention   =   0;
                    } 
                    else {
                        //partial subvention
                        term.totalSubvention=term.oemCSubvention=    Math.round(product.amountFinanced - ballonPayment/(1+bRate))  ;
                        term.oemCSubvention =   term.totalSubvention<term.oemSubvention?term.totalSubvention:term.oemSubvention;
                        term.dealerSubvention   =    Math.round(term.totalSubvention - term.oemCSubvention);
                    }
                    break;
                case FCC.configJSON.dealerProgram:
                //for dealer program
                    term.totalSubvention    =    Math.round(product.amountFinanced - ballonPayment/(1+bRate)) ;
                    term.oemCSubvention     =   0;
                    term.dealerSubvention   =   term.totalSubvention;
                    break;
            } 
            return ;
        }
    };
    return publicServices;
}]);