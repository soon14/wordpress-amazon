/**
 * @author Sohrab Zabetian
 * @description controller to handle model and series page
 * @project Financial calculator
 */
ND.LFC.financialCalculator.controller('modelSeriesController',
    ['$scope', '$location', '$filter', '$sce', 'routeConstants', 'webAPI', 'appValue',
    function ($scope, $location, $filter, $sce, routeConstants, webAPI, appValue) {

        $scope.selectedModel = appValue.selectedModel != null ? appValue.selectedModel.id : null;
        $scope.selectedDerivative = appValue.selectedDerivative != null ? appValue.selectedDerivative.id : null;
        $scope.selectedEngine = appValue.selectedEngine != null ? appValue.selectedEngine.id : null;
        $scope.appValue = appValue;
        var gforceCatalogId_navigator =ND.LFC.configJSON.gforceCatalogId_navigator|| ['2016_TB5_1007_WSPAD_C_DFYS_NULL','2016_TB5_1007_WSPAD_C_DFYP_NULL'];

        appValue.currentStep = 0;

        $('html,body').scrollTop(0);

        webAPI.getModels().then(function (models) {

        });

        $scope.selectModel = function (model) {
            $scope.selectedModel = model.id;
            appValue.selectedModel = model;
            $scope.selectedDerivative = null;

            webAPI.getSeries(model).then(function (series) {
                //hide series section for navigator
                if($.inArray(appValue.selectedModel.gforceCatalogId.toUpperCase(),gforceCatalogId_navigator)>-1&&series.length>0) {
                    appValue.series=[];
                    $scope.selectDerivative(series[0]);
                    $('html,body').scrollTop(0);

                }

            });

        };

        $scope.getVehiclePrice = function (price) {
            return $sce.trustAsHtml($filter('lfcPriceFormatter')(price));
        };

        $scope.selectDerivative = function (derivative, engine, event) {
            if (event) {
                event.preventDefault();
            }

            $scope.selectedDerivative = appValue.selectedDerivative = derivative;
            $scope.selectedEngine = appValue.selectedEngine = (engine != null)
                                                            ? engine
                                                            : derivative.engineTransmissions[0];
            $scope.continueButtonDisabled = false;
        };

        $scope.goToCalculatePage = function () {
            $scope.continueButtonDisabled = false;

            if ($scope.selectedModel != null && $scope.selectedDerivative != null) {
                var url = routeConstants.calculate.path
                                        .replace(':model', appValue.selectedModel.id)
                                        .replace(':derivative', appValue.selectedDerivative.id)
                                        .replace(':engine', appValue.selectedEngine.id);

                $location.path(url);
            } else {
                $scope.continueButtonDisabled = true;
            }
        };

        $scope.resetModels = function () {
            $scope.continueButtonDisabled = false;
            $scope.selectedModel = null;
            appValue.selectedModel = null;
            $scope.selectedDerivative = null;
            $scope.selectedEngine = null;
            webAPI.resetSeries();
            $('html,body').scrollTop(0);
        };

    }]);