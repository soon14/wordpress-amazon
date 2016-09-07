/**
 * @author Sohrab Zabetian
 * @description filter to replace %1 parameter with a value
 * @project Financial calculator
 */
ND.LFC.financialCalculator.filter('lfcReplaceWithParam', ['$filter', function ($filter) {
	return function (input, param) {

		if (angular.isDefined(input) && input != null) {
			return input.replace('%1', $filter('lfcPriceFormatter')(param));
		}
		return '';
	};
}]);
