/*
Author:                 Joel Wang
File name:              paymentEstimatorFilter.js
Description:            Price format filter
Dependencies:           angular.min.js angular-route.min.js
Usage:                  China Payment Estimator project
*/
guxApp.paymentEstimator.filter('petCurrency',[function() {
//filter to format price

  var config = FCC.configJSON;

  guxApp.priceFormatter.initialise({
        data: config.priceFormat,
        formatString:  config.currencySymbol,
        centsSeparator: config.monetaryDecimalSeparator,
        thousandsSeparator: config.groupingSeparator
      });

  return function(input) {
    if (angular.isDefined(input) && input != null) {
      if (input<0)       return 'NA';
      //show NA for invalid price
      return '' + guxApp.priceFormatter.format(input);
    }
    return '';
  }

}]);
