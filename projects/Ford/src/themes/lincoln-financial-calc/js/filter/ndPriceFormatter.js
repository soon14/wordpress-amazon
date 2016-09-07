ND.LFC.financialCalculator.filter('ndPriceFormatter', function () {


    //console.log('init ndPriceFormatter');
    var config = ND.LFC.configJSON.priceFormatterConfig;
    //console.dir(config);
    ND.PriceFormatter.initialise({
        data: config.priceFormat,
        formatString:  config.currencySymbol,
        centsSeparator: config.monetaryDecimalSeparator,
        thousandsSeparator: config.groupingSeparator
    });

    return function (input) {

        if (angular.isDefined(input) && input != null) {
            return '' + ND.PriceFormatter.format(input);
        }
        return '';
    };
});
