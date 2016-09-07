/**
 * @author jbao
 * @description Bootstrap module: starts up omniture
 * @project Financial calculator
 */

ND.LFC.Analytics = (function (){

    var MOBILE_SCREEN_SIZE = 768,
        TABLET_SCREEN_SIZE = 977;

    var resetOmnitureVars = function(){
        _da.tool = _da.der = _da.nameplate = _da.events = _da.region = undefined;
        _da.funnel.stepname = undefined;
    };

    var setupParams = function(data, type){
        var params = { type: type};
        resetOmnitureVars();
        return params;
    };

    var getDeviceType = function(){
        var prefix = 'ui:rad:';
        if (screen.width < MOBILE_SCREEN_SIZE) {
            return prefix + 'phone';
        } else if (screen.width >= MOBILE_SCREEN_SIZE && screen.width < TABLET_SCREEN_SIZE) {
            return prefix + 'tablet';
        }
        return prefix + 'pc';
    };
    return {
        'resetOmnitureVars': resetOmnitureVars,
        'setupParams': setupParams,
        'getDeviceType': getDeviceType
    };
})();