
ND.LFC.financialCalculator.directive('sliderOnFinishRender', ['$timeout',function ($timeout) {
    return {
            link: function (scope, element, attr, ngModel) {

                if (scope.$last === true) {

                   $timeout(function() {


                        element.on("click",function(event) {
                            scope.setSliderMax(scope.$index,event)
                        });

                        var $slide = $('.controller .slide'),
                            sliderMin = 0;

                        $slide.each(function (index, item) {
                            var $element = $('#slider', $(item).parent()),
                                sliderMax = $('.block', item).length - 1;

                            $element.slider("option","max",sliderMax);
                            $element.css('width',(sliderMax*11.1).toString()+'%');
                            $('.ui-slider-handle', $element).css('width',(100/sliderMax).toString()+'%');
                        });
                        scope.resetSlider();

                    });
                    // },100);

                }
        }
    }
}]);
ND.LFC.financialCalculator.directive('flagOnRender', ['$timeout',function ($timeout) {
    return {
            link: function (scope, element, attr, ngModel) {

                if (scope.$first === true) {

                    $timeout(function() {
                        $(element).addClass('active');
                    });

                }
                if(scope.$last === true) {

                    $timeout(function(){
                        var flagValue=scope.appValue[scope.appValue.calState + 'Settings']?scope.appValue[scope.appValue.calState + 'Settings'].sliderValue||0:0;
                        // scope.setFlagValue(flagValue,$(element).parent().children()[flagValue]);
                        $(element).parent().children().eq(flagValue).trigger('click');
                    })
                }
        }
    }
}]);