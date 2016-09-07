/**
 * @author Sohrab Zabetian
 * @description directive for slider, wraps around jQuery slider and requires jQuery ui and jQuery slider
 * @project Financial calculator
 */

ND.LFC.financialCalculator.directive('lfcSlider', [function () {

    var displayValue = function($element, $slide, ngModel) {
        $('.ui-slider-handle', $element).html($('.block', $slide).eq(ngModel.$viewValue).data('value'));
    };

    return {
        restrict: 'A', //to comply with IE 8
        replace: true,//to comply with IE 8,
        require: 'ngModel',
        template: function() {
            return $('#lfc-slider-template').html();
        },
        reset: function () {

        },
        link: function (scope, element, attr, ngModel) {

            var $slide = $('.controller .slide'),
                sliderMin = 0;

            if (!angular.isDefined(ngModel.$viewValue) || ngModel.$viewValue == null || isNaN(ngModel.$viewValue)) {
                ngModel.$setViewValue(sliderMin);
            }

            $slide.each(function (index, item) {
                var $element = $('#slider', $(item).parent()),
                    sliderMax = $('.block', item).length - 1;

                $element.slider({
                    orientation: "horizontal",
                    range: "min",
                    min: sliderMin,
                    max: sliderMax,
                    step: 1,
                    value: ngModel.$viewValue,
                    slide: function (event, ui) {

                        if (ui.value >= 0) {
                            ngModel.$setViewValue(ui.values || ui.value);
                            displayValue($element, $(item), ngModel);
                            scope.$apply();
                        }

                        saveOptionSettings();

                    },
                    create: function (event, ui) {
                        displayValue($element, $(item), ngModel);
                    }
                });
            });

            scope.$watch('appValue.downPayment', saveOptionSettings);

            scope.setSliderMax = function (max,e) {
                var maxVal = max,
                    slider = $(e.target).parent(),
                    element = $('#slider', slider.parent());
                element.slider('value', maxVal);
                ngModel.$setViewValue(maxVal);
                displayValue(element, slider, ngModel);
                scope.$apply();
                saveOptionSettings();
            };

            scope.resetSlider = function () {
                $slide.each(function (index, item) {
                    var $element = $('#slider', $(item).parent());
                    $element.slider('value', 0);
                    ngModel.$setViewValue(0);
                    displayValue($element, $(item), ngModel);
                });
            };


            /**
             * Retain previous settings of options
             * - To be used by parent's controller
             */
            function saveOptionSettings() {
                scope.appValue[scope.appValue.calState + 'Settings'] = {
                    selectedTerm: scope.appValue.selectedTerm,
                    sliderValue: ngModel.$viewValue,
                    downPayment: scope.appValue.downPayment
                };
            }

            scope.removeSavedOptionSettings = function() {
                scope.appValue['rcoSettings'] = null;
                scope.appValue['ewSettings'] = null;
                scope.appValue['standardSettings'] = null;
                scope.appValue['halfSettings'] = null;
            }
        },
        controller: ['$scope', 'appValue', function ($scope, appValue) {

            $scope.appValue = appValue;

        }]

    }
}]);