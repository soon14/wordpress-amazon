
/**
 * @author Sohrab Zabetian
 * @description Bootstrap module: starts up angular
 * @project Financial calculator
 */
(function() {


    angular.element(document).ready(function() {

        //load configuration. we cannot use a constant since constants execute right away before the dom is ready
        var $fcConfig = $('#financial-calculator-config');

        if ($fcConfig.length > 0) {
            ND.LFC.configJSON = JSON.parse($fcConfig.html());
        } else {
            ND.LFC.configJSON = {};
        }

        //app starts in #content
        angular.bootstrap($('#content'), ['financialCalculator']);
    });


})();
