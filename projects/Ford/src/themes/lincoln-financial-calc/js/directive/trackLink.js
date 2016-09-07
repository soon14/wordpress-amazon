/**
 * Created by bjie on 11/10/2014.
 */
ND.LFC.financialCalculator.directive('trackLink', [function(){
   return {
       restrict: 'A',
       replace: false,
       link: function(scope, element) {
            element.bind('click', function(){
                ND.LFC.Analytics.resetOmnitureVars();
                var data = {},
                    params = ND.LFC.Analytics.setupParams(data, 'o');
                _da.region = undefined;
                params.pname = _da.pname;
                params.link = _da.pname +  ':print';
                params.title = _da.pname + ':print';
                params.deviceType = ND.LFC.Analytics.getDeviceType();
                $.publish('/analytics/link/', params);
            });
       }
   };
}]);