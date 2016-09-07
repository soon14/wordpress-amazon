/**
 * @author Sohrab Zabetian
 * @description filter to round down percentages
 * @project Financial calculator
 */
ND.LFC.financialCalculator.filter('lfcRoundDown', function () {

    return function (input) {

        if (angular.isDefined(input) && input != null) {
            return '' + Math.floor(input);
        }
        return '';
    };
});
