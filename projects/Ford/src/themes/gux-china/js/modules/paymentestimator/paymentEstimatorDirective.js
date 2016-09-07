/*
Author:                 Joel Wang
File name:              paymentEstimatorDirective.js
Description:            Directives
Dependencies:           angular.min.js angular-route.min.js
Usage:                  China Payment Estimator project
*/
//directives to load template of nameplate and model container
guxApp.paymentEstimator.directive('petNameplateContainer', function () {
    return {
            replace: true,
            template: function() {
                return $('#pet-nameplate-container-template').html();
            }
    }
});
guxApp.paymentEstimator.directive('petModelContainer', function () {
    return {
            replace: true,
            template: function() {
                return $('#pet-model-container-template').html();
            }
    }
});
//to initialize and register event for the slider
guxApp.paymentEstimator.directive('petSlider',function() {

	return {
    		link: function(scope, element, attrs) {
        			element.slider({
        				range: "min",
                        min: FCC.configJSON.minDownpaymentPercent,
                        animate: "slow",
        				slide: function(event, ui) {
        					scope.$apply(function() {
                                scope.appValue.currentProduct.downpaymentPercent=ui.value;
                            });
        				},
                        stop: function(event, ui) {
                            scope.$apply(function() {
                                scope.changeDownpaymentPercent();
                                    });
                        }
        			});
    		}
	}
});
//show loading icon before the end of nameplate service call 
guxApp.paymentEstimator.directive('petButterBar', ['$rootScope',function($rootScope) {

    return {
            link: function(scope, element, attrs) {
                /*element.addClass('hide');*/
                //show it once route change begin
                $rootScope.$on('$routeChangeStart', function() {
                    element.removeClass('hide');
                });
                //hide it once route change done
                $rootScope.$on('$routeChangeSuccess',function() {
                    element.addClass('hide');
                });
                //show it once nameplate service call start
                $rootScope.$on('getnameplateStarted',function() {
                    element.removeClass('hide');
                });
                //hide it once nameplate service call end
                $rootScope.$on('getnameplateFinished',function() {
                    element.addClass('hide');
                });
                /*$rootScope.$on('invalidInputNameplateID', function() {
                    element.addClass('hide');
                });
                $rootScope.$on('invalidInputModelID', function() {
                    element.addClass('hide');
                });
                $rootScope.$on('getmodelFinished',function() {
                    element.addClass('hide');
                });*/
            },
            replace:true,
            template: '<div class="nameplate-butter"></div>'
    };
}]);
//show namepalte part once data is ready
guxApp.paymentEstimator.directive('petModuleNameplateLoader', ['$rootScope',function($rootScope) {

    return {
            link: function(scope, element, attrs) {
                element.addClass('hide');
                /*$rootScope.$on('$routeChangeStart', function() {
                    element.addClass('hide');
                });*/
                //show nameplate container when namplate data ready
                $rootScope.$on('getnameplateFinished',function() {
                    element.removeClass('hide');
                });
                /*$rootScope.$on('invalidInputModelID', function() {
                    element.addClass('hide');
                });*/
            }
    };
}]);
//show loading icon before model data ready
guxApp.paymentEstimator.directive('petModelButterBar', ['$rootScope',function($rootScope) {

    return {
            link: function(scope, element, attrs) {
                /*element.addClass('hide');
                $rootScope.$on('$routeChangeStart', function() {
                    element.removeClass('hide');
                });
                $rootScope.$on('$routeChangeSuccess',function() {
                    element.removeClass('hide');
                });*/
                //show it once model service call start
                $rootScope.$on('getmodelStarted',function() {
                    element.removeClass('hide');
                });
                //hide it once model data is ready
                $rootScope.$on('getmodelFinished',function() {
                    element.addClass('hide');
                });
                /*$rootScope.$on('invalidInputModelID', function() {
                    element.addClass('hide');
                });*/
            },
            replace:true,
            template: '<div class="model-butter"></div>'
    };
}]);
//show model part once model data is ready
guxApp.paymentEstimator.directive('petModuleModelLoader', ['$rootScope',function($rootScope) {

    return {
            link: function(scope, element, attrs) {
                element.addClass('hide');
                /*$rootScope.$on('$routeChangeStart', function() {
                    element.addClass('hide');
                });*/
                //show model container when model data ready
                $rootScope.$on('getmodelFinished',function() {
                    element.removeClass('hide');
                });
                /*$rootScope.$on('invalidInputModelID', function() {
                    element.addClass('hide');
                });*/
            }
    };
}]);
//show error page when url contains invalid nameplate id or model id
/*guxApp.paymentEstimator.directive('petErrorPage',['$rootScope',function($rootScope) {
    return {
            replace: true,
            template: function() {
                return $('#pet-error-page-template').html();
            },
            link: function(scope, element, attrs)  {
                element.addClass('hide');
                $rootScope.$on('invalidInputNameplateID', function() {
                    element.removeClass('hide');
                });
                $rootScope.$on('invalidInputModelID', function() {
                    element.removeClass('hide');
                });
            }
    }
}]);*/

//directives to load template of carousel and initialize it when data ready
guxApp.paymentEstimator.directive('petProductCarousel', ['$rootScope','$window','$compile',function ($rootScope,$window,$compile) {
    return {
            
            replace: true,
            template: function() {
                return $('#pet-product-carousel-template').html();
            }/*,
            link: function(scope, element, attrs) {
                angular.element($window).bind('resize', function() {
                $('.flexslider').resize();
                console.log($('.flexslider'));
                guxApp.billboardCarousel.init();
                });
                $rootScope.$on('programswitchStarted',function(){
                    element.html('<div class="loading"></div>');
                    $compile(angular.element('<div class="loading"></div>'))(scope);
                    element.replaceWith(angular.element('<div class="loading"></div>'));
                });
                $rootScope.$on('programswitchFinished',function(){
                    element.html($('#pet-product-carousel-template').html());                    
                    $compile(angular.element('<div id="product-carousel" pet-product-carousel></div>'))(scope);
                    element.replaceWith(angular.element('<div id="product-carousel" pet-product-carousel></div>'));
                    element.resize();
                });
            }*/
    }
}]);
/*guxApp.paymentEstimator.directive('petOnFinishRender', function ($timeout) {
    return {
            link: function (scope, element, attrs) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
    }
});*/
//initial carousel once angular js finished render the last node
guxApp.paymentEstimator.directive('petOnFinishRender', function () {
    return {
            link: function (scope, element, attrs) {
                    if (scope.$last === true) {
                        guxApp.billboardCarousel.init();
                    }
            }
    }
});
//directives to load and initialize template of accordion and switch tab
guxApp.paymentEstimator.directive('petPaymentPresenterAccordion', function () {
    return {
            replace: true,
            template: function() {
                return $('#pet-payment-presenter-accordion-template').html();
            },
            link: function (scope, element, attrs) {
                    guxApp.accordion.init();
            }
    }
});
guxApp.paymentEstimator.directive('petModelCompareAccordion', function () {
    return {
            replace: true,
            template: function() {
                return $('#pet-model-compare-accordion-template').html();
            },
            link: function (scope, element, attrs) {
                    guxApp.accordion.init();
                    //init citation when the last module loaded
                    guxApp.innerPopup.init();
            }
    }
});
guxApp.paymentEstimator.directive('petTabSwitch', function () {
    return {
            replace: true,
            template: function() {
                return $('#pet-tab-switch-template').html();
            },
            link: function (scope, element, attrs) {
                    tabSwitch.init();
            }
    }
});
//directives to load template of preserve, showroom and citation container
guxApp.paymentEstimator.directive('petPreserveContainer', function () {
    return {
            replace: true,
            template: function() {
                return $('#pet-preserve-container-template').html();
            }
    }
});
guxApp.paymentEstimator.directive('petShowroomContainer', function() {
    return {
            replace: true,
            template: function() {
                return $('#pet-showroom-container-template').html();
            }
    }
});
/*guxApp.paymentEstimator.directive('petCitation', function () {
    return {
            replace: true,
            template: function() {
                return $('#pet-citation-template').html();
            },
            link: function (scope, element, attrs) {
                    guxApp.innerPopup.init();
            }
    }
});*/
