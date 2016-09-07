/**
 * @author Sohrab Zabetian
 * @description directive for slider, wraps around jQuery slider and requires jQuery ui and jQuery slider
 * @project Financial calculator
 */
ND.LFC.financialCalculator.directive('lfcSliderxx', [function () {

    var displayValue = function($element, $slide, ngModel) {
        $('.ui-slider-handle', $element).html($('.block', $slide).eq(ngModel.$viewValue).data('value'));
    };

    return {
        restrict: 'A',
        require: 'ngModel',
        replace:true,
        template: '<div id="slider"></div>',
        link: function (scope, element, attr, ngModel) {
            if (!angular.isDefined(ngModel.$viewValue) || ngModel.$viewValue == null || isNaN(ngModel.$viewValue)) {
                ngModel.$setViewValue(parseInt(attr.min));
            }

            var $slide = $('.controller .slide'),
                $element = angular.element('#slider');

            $element.slider({
                orientation: "horizontal",
                range: "min",
                min: parseInt(attr.min),
                max: parseInt(attr.max),
                step: parseInt(attr.step),
                value: ngModel.$viewValue,
                slide: function (event, ui) {
                    if (ui.value >= 0) {

                        ngModel.$setViewValue(ui.values || ui.value);
                        displayValue($element, $slide, ngModel);
                        scope.$apply();
                    }
                },
                create: function (event, ui) {
                    displayValue($element, $slide, ngModel);
                }
            });
        }

    };
}]);