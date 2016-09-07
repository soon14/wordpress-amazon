/**
 * @author Sohrab Zabetian
 * @description controller to handle the calculation
 * @project Financial calculator
 */
ND.LFC.financialCalculator.controller('calculatorController', ['$scope', '$location', '$filter', '$routeParams', '$sce', 'webAPI', 'appValue', 'routeConstants', '$document', 'FCrevealModal', function ($scope, $location, $filter, $routeParams, $sce, webAPI, appValue, routeConstants, $document, FCrevealModal) {

    var init = function () {

        var isRcoSwitchedOff = typeof $('#summary-container').data('rco-switchoff') !== 'undefined';

        if (isRcoSwitchedOff) {
            appValue.calStateDefault = 'standard';
            appValue.selectedTerm = 12;
        }

        appValue.calState = appValue.calStateDefault;
        appValue.currentStep = 1;

        // appValue.standardTerms = ND.LFC.configJSON.termsConfig.standardTerms;
        // appValue.rcoTerms = ND.LFC.configJSON.termsConfig.rcoTerms;
        appValue.standardTerms = {};
        appValue.rcoTerms = {};
        appValue.ewTerms = {};
        appValue.ewPackages = {};
        appValue.halfTerms = {};        
        appValue.standardProduct = null;
        appValue.rcoProduct = null;
        appValue.ewProducts = null;
        appValue.halfProduct =null;
        appValue.pdfOption = '';
        $scope.DerivativeURL="#";

        $scope.encodedVehicleName = '';
        appValue.downPaymentPercentage = 20;
		
		//Lincoln customer rate CR
		if(appValue.gmfv.products)  {
			$.each(appValue.gmfv.products,function(i,pValue) {
				switch(pValue['product-code'].toUpperCase()) {
                    case 'STANDARD':
                            if (pValue['sub-products'][0]&&pValue['sub-products'][0]['term-rates']) {
                                appValue.standardProduct=pValue['sub-products'][0];
                                $.each(pValue['sub-products'][0]['term-rates'],function(j,sRatesValue){
                                    appValue.standardTerms[sRatesValue.term]=sRatesValue.rate;
                                    
                                });
                            };
                            break;
                    case 'RCO':
                            if (pValue['sub-products'].length===1){
                                //rco for bnp price only
                                if(pValue['sub-products'][0]['sub-code'].toUpperCase()==='GMFV') {
                                    appValue.gmfv['msrp']=pValue['sub-products'][0]['msrp'];   
                                }
                            }
                            if (pValue['sub-products'].length===2) {
                                $.each(pValue['sub-products'],function(j,sValue){
                                    if(sValue['sub-code'].toUpperCase()=='BASIC'&&sValue['term-rates'].length>0) {
                                        $.each(sValue['term-rates'],function(k,rRatesValue){
                                            appValue.rcoTerms[rRatesValue.term]=rRatesValue.rate;
                                        });
                                    }
                                    else if(sValue['sub-code'].toUpperCase()=='GMFV') {
                                        appValue.rcoProduct=sValue;
                                        appValue.gmfv['customer-rate']=sValue['customer-rate'];
                                        appValue.gmfv['msrp']=sValue['msrp'];
                                        appValue.gmfv['package-type']=sValue['package-type'];
                                        appValue.gmfv['pcv-code']=sValue['pcv-code'];
                                        appValue.gmfv['sub-code']=sValue['sub-code'];
                                        appValue.gmfv['term-rates']=sValue['term-rates'];
                                    }
                                    
                                });
                            };
                            break;
                    case 'EW_BO':
                            if(pValue['sub-products'].length>0) {
                                appValue.ewProducts=pValue['sub-products'];
                                // appValue.ewProduct=appValue.ewProducts[0];
                                $scope.changePackage(appValue.ewProducts[0]['package-type']);
                            };
                            break;
                    case '50_50O':
                            if(pValue['sub-products'].length>0) {
                                appValue.halfProduct=pValue['sub-products'][0];
                            };
                            break;

                }
			});
		}

        if ($scope.isReferrerLincolnBnP()) {
             $scope.vehiclePrice = parseInt(appValue.gmfv.msrp);
        } else {
            $scope.vehiclePrice = appValue.selectedEngine.price;
        }

        appValue.totalMonthlyPayment = $scope.getTotalMonthlyPayment();

        appValue.totalGMFV = $scope.getTotalGMFV();

        $scope.trustedSummary = angular.isDefined(appValue.selectedDerivative.financialCalculatorSummary) &&
                                (appValue.selectedDerivative.financialCalculatorSummary != null)
                                    ? $sce.trustAsHtml(appValue.selectedDerivative.financialCalculatorSummary)
                                    : '';
        var indexDerivative=angular.isDefined(appValue.selectedDerivative.financialCalculatorSummary) &&
                                (appValue.selectedDerivative.financialCalculatorSummary != null)
                                    ?appValue.selectedDerivative.financialCalculatorSummary.toLowerCase().lastIndexOf('<a '):-1;
        if (indexDerivative>-1) {
            $scope.DerivativeURL=appValue.selectedDerivative.financialCalculatorSummary.toLowerCase().substr(indexDerivative).split('href="')[1]?appValue.selectedDerivative.financialCalculatorSummary.toLowerCase().substr(indexDerivative).split('href="')[1].split('"')[0]:"#";
        }

        $scope.calculateDownPayment();
        appValue.minDownPayment = ($scope.vehiclePrice * 20) / 100;
        appValue.maxDownPayment = $scope.vehiclePrice;
        $scope.calculateSelectedTerm();

        $('html,body').scrollTop(0);
        FCrevealModal.init();
    },

        togglePrintBtn = function () {
            var isPrintEnabled = (40000 <= $scope.vehiclePrice-appValue.downPayment) &&
                                 appValue.downPayment >= $scope.vehiclePrice * 0.2;

            var $printBtn = angular.element('#body').find('.sum').find('.icon-bag');

            if (!isPrintEnabled) {
                $printBtn
                    .css({
                        'color': '#4f4c43',
                        'cursor': 'default'
                    })
                    .attr('onclick', 'return false;')
                    .addClass('icon-disabled');

            } else {
                $printBtn.removeAttr('onclick')
                         .removeClass('icon-disabled');
            }
        },

        fetchModelAndSeries = function () {
            $scope.removeChangeVehicle = false;


            if (appValue.models.length === 0) {
                webAPI.getModels().then(function (models) {

                    var modelId, seriesId, modelAttribute, seriesAttribute;
                    var userSelected = '';

                    if (angular.isDefined($routeParams.model) && angular.isDefined($routeParams.derivative)) {
                        modelAttribute = seriesAttribute = 'id';
                        modelId = $routeParams.model;
                        seriesId = $routeParams.derivative;
                    } else if (angular.isDefined($routeParams.catalogId) && angular.isDefined($routeParams.wersCode)) {
                        modelAttribute = 'gforceCatalogId';
                        seriesAttribute = 'wersCode';
                        modelId = $routeParams.catalogId;
                        seriesId = $routeParams.wersCode;

                        if (angular.isDefined($routeParams.userSelected) && $routeParams.userSelected.length) {
                            userSelected = $routeParams.userSelected;
                        }
                    }

                    for (var i = 0; i < models.length; i++) {
                        if (modelId === models[i][modelAttribute]) {
                            appValue.selectedModel = models[i];
                            break;
                        }
                    }

                    if (appValue.series.length === 0 && appValue.selectedModel != null) {

                        webAPI.getSeries(appValue.selectedModel).then(function (series) {

                            if (series.length === 0) throw 'Unable to get model series.';

                            for (var i = 0; i < series.length; i++) {
                                if (seriesId === series[i][seriesAttribute]) {
                                    appValue.selectedDerivative = series[i];

                                    // $scope.encodedVehicleName = encodeURIComponent(appValue.selectedDerivative);

                                    if (angular.isDefined($routeParams.engine)) {
                                        var engineTransmissions = series[i]["engineTransmissions"];
                                        for (var k = 0; k < engineTransmissions.length; k++) {
                                            if (engineTransmissions[k].id === $routeParams.engine) {
                                                appValue.selectedEngine = engineTransmissions[k];
                                            }
                                        }
                                        //series[i]["engineTransmissions"].forEach(function (item) {
                                        //    if (item.id === $routeParams.engine) {
                                        //        appValue.selectedEngine = item;
                                        //    }
                                        //});
                                    }
                                    if (!appValue.selectedEngine) {
                                        appValue.selectedEngine = series[i]["engineTransmissions"][0];
                                    }

                                    if (angular.isDefined($routeParams.price) && !isNaN($routeParams.price)) {
                                        //overwrite the price with parameter passed.
                                        $scope.vehiclePrice = parseInt($routeParams.price);
                                        //we are coming from b&p, so remove change vehicle link
                                        $scope.removeChangeVehicle = true;
                                    }

                                    break;
                                }
                            }

                            $scope.$evalAsync(function () {

                                userSelected = !!userSelected ? (appValue.selectedEngine.id + "," + userSelected) : appValue.selectedEngine.id;

                                webAPI
                                    .getGMFV(appValue.selectedModel.gforceCatalogId, appValue.selectedDerivative.wersCode, userSelected)
                                    .then(function (gmfvData) {
                                        init();
                                    });

                                $scope.appValue = appValue;
                            });

                        });
                    } else {

                        userSelected = !!userSelected ? (appValue.selectedEngine.id + ";" + userSelected) : appValue.selectedEngine.id;

                        webAPI
                            .getGMFV(appValue.selectedModel.gforceCatalogId, appValue.selectedDerivative.wersCode, appValue.selectedEngine.id)
                            .then(function (gmfvData) {
                                init();
                            });
                    }
                });
            } else {

                webAPI
                    .getGMFV(appValue.selectedModel.gforceCatalogId, appValue.selectedDerivative.wersCode, appValue.selectedEngine.id)
                    .then(function (gmfvData) {
                        init();
                    });
            }
        },

        calculateGMFV = function () {
            if (!$scope.isStandardState() && appValue.calState==='rco'&&appValue.selectedTerm &&
                appValue.gmfv && appValue.gmfv['term-rates']) {
                //appValue.gmfv.rates.forEach(function (rate) {
                //    if (parseInt(rate.months) === appValue.selectedTerm) {
                //        var rate = parseInt(rate.rate);
                //        appValue.totalGMFV = parseInt(appValue.gmfv.msrp) * rate / 100;
                //    }
                //});

                for (var j = 0; j < appValue.gmfv['term-rates'].length; j++) {
                    if (parseInt(appValue.gmfv['term-rates'][j].term) === appValue.selectedTerm) {
                        var rate = parseInt(appValue.gmfv['term-rates'][j].rate);
                        appValue.totalGMFV = parseInt(appValue.gmfv.msrp) * rate / 100;
                    }
                }
            }
        };

    $scope.calculate = function () {
        if (appValue.selectedDerivative != null && appValue.downPaymentPercentage >= 20 &&
            appValue.downPaymentPercentage <= 100 && ($scope.vehiclePrice - appValue.downPayment >=40000) && $scope.gmfvValid1() &&
            $scope.gmfvValid2()) {
                if(appValue.calState==='half') {
                    appValue.ballonPayment = $scope.vehiclePrice - appValue.downPayment;
                }
                else {
                    var amountFinanced = ($scope.vehiclePrice - appValue.downPayment),
                    customerRate = appValue[appValue.calState + 'Terms'][appValue.selectedTerm] / 100,
                    rc = (customerRate) / 12,
                    rcPlus1ToPowerOfSelectedTerm = Math.pow((1 + rc), appValue.selectedTerm),
                    rcPlus1ToPowerOfSelectedTermMinus1 = Math.pow((1 + rc), (appValue.selectedTerm-1));

                    calculateGMFV();

                    if ($scope.isStandardState()||!$scope.isStandardState()&&appValue.calState==='ew') {
                        appValue.totalMonthlyPayment =rc===0?amountFinanced/appValue.selectedTerm:
                            amountFinanced *
                            ((rc * rcPlus1ToPowerOfSelectedTerm) / (rcPlus1ToPowerOfSelectedTerm - 1));
                    } else {
                        appValue.totalMonthlyPayment =rc===0?(amountFinanced-appValue.totalGMFV)/(appValue.selectedTerm-1):
                            (amountFinanced - appValue.totalGMFV / rcPlus1ToPowerOfSelectedTerm) *
                            ((rc * rcPlus1ToPowerOfSelectedTermMinus1) / (rcPlus1ToPowerOfSelectedTermMinus1 - 1));
                    }

                }
                setPdfOption();           

        } else {
            appValue.totalMonthlyPayment = '';
            appValue.totalGMFV = '';
            appValue.ballonPayment = '';
        }
        function setPdfOption() {
            switch(appValue.calState) {
                case 'standard' :
                    appValue.pdfOption = '';
                    break;
                case 'half' :
                    appValue.pdfOption = '&bp='+appValue.ballonPayment+'&fp=50_50O';
                    break;
                case 'rco' :
                    appValue.pdfOption = '&gmfv='+appValue.totalGMFV+'&fp=RCO';
                    break;
                case 'ew' :
                    appValue.pdfOption = '&ew='+appValue.ewPackages[appValue.selectedTerm] +'&fp=EW_BO&pt='+appValue.ewProduct['package-type'].toUpperCase();
                    break;
            }
        }
    };

    $scope.gmfvValid1 = function () {
        //Amount financed should be greater than GMFV
        if (appValue.calState&&appValue.calState!=='rco') return true;
        var amountFinanced = ($scope.vehiclePrice - appValue.downPayment);
        return amountFinanced > appValue.totalGMFV;

    };
    $scope.gmfvValid2 = function () {
        //Downpayment ratio + GMFV ratio < 100%
        if (appValue.calState&&appValue.calState!=='rco' || !appValue.gmfv['term-rates']) return true;
        var gmfvRatio = 0;

        for (var j = 0; j < appValue.gmfv['term-rates'].length; j++) {
            if (parseInt(appValue.gmfv['term-rates'][j].term) === appValue.selectedTerm) {
                gmfvRatio = parseInt(appValue.gmfv['term-rates'][j].rate);
            }
        }
        return (appValue.downPaymentPercentage + gmfvRatio) < 100;
    };

    $scope.calculateDownPayment = function () {
        appValue.downPayment = ($scope.vehiclePrice * appValue.downPaymentPercentage) / 100;
    };

    $scope.calculateDownPaymentPercentage = function () {
        togglePrintBtn();
        if (!isNaN(appValue.downPayment)) {
            appValue.downPaymentPercentage = Math.round((appValue.downPayment / $scope.vehiclePrice) * 100);
            $scope.calculate();
        }
    };

    $scope.calculateSelectedTerm = function () {
        if (!appValue.standardProduct) return;
        appValue.selectedTerm = $scope.isStandardState()?appValue.standardProduct['term-rates'][appValue.sliderValue].term:appValue.rcoProduct['term-rates'][appValue.sliderValue].term;
        appValue.selectedTermRate = $scope.isStandardState()?appValue.standardProduct['term-rates'][appValue.sliderValue].rate:appValue.rcoProduct['term-rates'][appValue.sliderValue].rate;
        $scope.calculate();
    };
    $scope.setFlagValue = function(i,e) {
        if(e) {
            $(e.target).parent().children().removeClass('active');
            $(e.target).addClass('active');
        }
        
        appValue.selectedTerm=$scope.isStandardState()?appValue.standardProduct['term-rates'][i].term:appValue.calState==='rco'?appValue.rcoProduct['term-rates'][i].term:appValue.ewProduct['term-rates'][i].term;
        appValue.selectedTermRate=$scope.isStandardState()?appValue.standardProduct['term-rates'][i].rate:appValue.calState==='rco'?appValue.rcoProduct['term-rates'][i].term:appValue.ewProduct['term-rates'][i].rate;
        appValue[appValue.calState + 'Settings'] = {
                    selectedTerm: appValue.selectedTerm,
                    sliderValue: i,
                    downPayment: appValue.downPayment,
                    ewPackage: appValue.calState==='ew'?appValue.ewProduct['package-type']:''
                };
        $scope.calculate();
    }
    $scope.getTotalMonthlyPayment = function () {
        if (appValue.totalMonthlyPayment === '') {
            return $sce.trustAsHtml(appValue.totalMonthlyPayment);
        }

        return $sce.trustAsHtml($filter('lfcPriceFormatter')(Math.round(appValue.totalMonthlyPayment)));
    };

    $scope.getTotalGMFV = function () {
        if (appValue.totalGMFV === '') {
            return $sce.trustAsHtml(appValue.totalGMFV);
        }

        return $sce.trustAsHtml($filter('lfcPriceFormatter')(Math.round(appValue.totalGMFV)));
    };

   $scope.getBallonPayment = function () {
        if (appValue.ballonPayment === '') {
            return $sce.trustAsHtml(appValue.ballonPayment);
        }

        return $sce.trustAsHtml($filter('lfcPriceFormatter')(Math.round(appValue.ballonPayment)));
    };

    $scope.getPackageAmount = function() {
        if (!appValue.ewPackages||appValue.ewPackages[appValue.selectedTerm]===undefined||appValue.ewPackages[appValue.selectedTerm] === '') {
            return $sce.trustAsHtml('');
        }
        return $sce.trustAsHtml($filter('lfcPriceFormatter')(appValue.ewPackages[appValue.selectedTerm]));
    };
    
    $scope.getDownPayment = function() {
        if (appValue.downPayment === '') {
            return $sce.trustAsHtml(appValue.downPayment);
        }
        return $sce.trustAsHtml($filter('lfcPriceFormatter')(appValue.downPayment));
    };

    $scope.getVehiclePrice = function () {
        if (appValue.selectedDerivative != null) {
            return $sce.trustAsHtml($filter('lfcPriceFormatter')($scope.vehiclePrice));
        }
        return '';
    };
    $scope.changePackage = function(packageVal, event) {
        var flagValue=0;
        appValue.packageBump = false;
        appValue.packageDrive = false;
        if (event) {
            event.preventDefault();
        }
        if (appValue.ewProducts&&appValue.ewProducts.length>0) {
            $.each(appValue.ewProducts,function(i,value){
                if(value['package-type'].toUpperCase()==='BUMPER_TO_BUMPER') {
                    appValue.packageBump = true;
                }
                if(value['package-type'].toUpperCase()==='DRIVELINE') {
                    appValue.packageDrive = true;
                }

                if(value['package-type'].toUpperCase()===packageVal) {
                    appValue.ewProduct=value;
                    appValue.ewTerms={};
                    appValue.ewPackages={};
                    $.each(value['term-rates'],function(j,sRatesValue){
                        appValue.ewTerms[sRatesValue.term]=sRatesValue.rate;
                        appValue.ewPackages[sRatesValue.term]=sRatesValue['fixed-amount'];
                        flagValue=appValue.selectedTerm===sRatesValue.term?j:flagValue;                                    
                    });

                }


            });
            if (appValue.calState==='ew')
            $scope.setFlagValue(flagValue);
        }
    }

    $scope.changeState = function (stateVal, event) {
        if (event) {
            event.preventDefault();
        }
        $(event.target).parent().parent().removeClass('expand').siblings('.option-selected').text($(event.target).text());

        if (stateVal && appValue.calState !== stateVal) {
            switch (stateVal) {
                case "standard":
                    var standardSettings = appValue['standardSettings'];

                    appValue.calState = stateVal;

                    appValue.selectedTerm = !!standardSettings ? standardSettings.selectedTerm : appValue.standardProduct['term-rates'][0].term;
                    appValue.sliderValue = !!standardSettings ? standardSettings.sliderValue : 0;

                    /*$scope.vehiclePrice = $scope.isReferrerLincolnBnP() ? parseInt(appValue.gmfv.msrp)
                                                                        : appValue.selectedEngine.price;*/

                    setDownPayment(standardSettings);

                    break;

                case "rco":
                    var rcoSettings = appValue['rcoSettings'];

                    appValue.calState = stateVal;

                    appValue.selectedTerm = !!rcoSettings ? rcoSettings.selectedTerm : appValue.rcoProduct['term-rates'][0].term;
                    appValue.sliderValue = !!rcoSettings ? rcoSettings.sliderValue : 0;

                    /*$scope.vehiclePrice = $scope.isReferrerLincolnBnP() ? parseInt(appValue.gmfv.msrp)
                                                                        : appValue.selectedEngine.price;*/

                    setDownPayment(rcoSettings);

                    break;

                case "ew":
                    var ewSettings = appValue['ewSettings'];

                    appValue.calState = stateVal;

                    appValue.selectedTerm = !!ewSettings ? ewSettings.selectedTerm : appValue.ewProduct['term-rates'][0].term;
                    appValue.sliderValue = !!ewSettings ? ewSettings.sliderValue : 0;
                    appValue.ewPackage = !!ewSettings ? ewSettings.ewPackage : appValue.ewProduct['package-type'];

                    /*$scope.vehiclePrice = $scope.isReferrerLincolnBnP() ? parseInt(appValue.gmfv.msrp)
                                                                        : appValue.selectedEngine.price;*/

                    setDownPayment(ewSettings);

                    break;

                case "half":
                    var halfSettings = appValue['halfSettings'];
                    appValue.calState = stateVal;

                    appValue.selectedTerm = !!halfSettings? halfSettings.selectedTerm : appValue.halfProduct['term-rates'][0].term;
                    /*$scope.vehiclePrice = $scope.isReferrerLincolnBnP() ? parseInt(appValue.gmfv.msrp)
                                                                        : appValue.selectedEngine.price;*/
                    setDownPayment(halfSettings);
                    break;
            }
        }
        if(appValue.calState==='ew') {
            $scope.changePackage(appValue.ewPackage);
        }
        else {
            $scope.calculate();
        }        

        function setDownPayment(options) {
            if (options == null) {
                appValue.downPaymentPercentage = appValue.calState==='half'?50:20;
                $scope.calculateDownPayment();
            } else {
                appValue.downPayment = options.downPayment;
                $scope.calculateDownPaymentPercentage();
            }
        }

    };

    $scope.isStandardState = function () {
        if(appValue.calState) {
            return appValue.calState === "standard";
        }
        else {
            return true;
        }
    };
    $scope.isStandardProduct = function() {
        if(appValue.standardProduct&&appValue.standardProduct["customer-rate"]) {
            return appValue.standardProduct["customer-rate"].toUpperCase()==="STANDARD";
        }
        else {
            return true;
        }
    };
    $scope.isRCOProduct = function() {
        if(appValue.rcoProduct&&appValue.rcoProduct["sub-code"]) {
            return appValue.rcoProduct["sub-code"].toUpperCase()==="GMFV";
        }
        else {
            return false;
        }
    };

    $scope.changeModel = function (e) {
        e.preventDefault();
        appValue.selectedModel = null;
        appValue.selectedDerivative = null;
        appValue.calState = appValue.calStateDefault;
        appValue.standardTerms = {};
        appValue.rcoTerms = {};
        appValue.ewTerms = {};
        appValue.ewPackages = {};
        appValue.halfTerms = {};
        appValue.standardProduct = null;
        appValue.rcoProduct = null;
        appValue.ewProducts = null;
        appValue.halfProduct =null;
        appValue.pdfOption = '';
        $scope.DerivativeURL="#";

        $scope.removeSavedOptionSettings();
        webAPI.resetSeries();
        $location.path(routeConstants.home.path);
    };

    $scope.isReferrerLincolnBnP = function() {
        return $document[0].referrer.search('/lincoln-build-and-price') != -1;
    };

    $scope.toggleOption = function(e) {
        if (e) {
            $(e.target).toggleClass("expand");
            $(e.target).siblings(".tabs").toggleClass("expand");
        }
    };
    $scope.topBack = function(e) {
        if(e) e.preventDefault();
         $('html,body').scrollTop(0);
    }

    fetchModelAndSeries();


}]);