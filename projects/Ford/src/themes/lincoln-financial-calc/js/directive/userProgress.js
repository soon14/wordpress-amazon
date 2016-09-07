/**
 * @author Sohrab Zabetian
 * @description directive to display user's progress in the application
 * @project Financial calculator
 */
ND.LFC.financialCalculator.directive('lfcUserProgress', [function () {

    return {
        restrict: 'A', //to comply with IE 8
        replace: true,//to comply with IE 8
        template: function () {
            return $('#lfc-user-progress-template').html();
        },
        link: function (scope, element, attr) {
        },
        controller: ['$scope', 'appValue', function ($scope, appValue) {

            $scope.appValue = appValue;

        }]

    }
}]);