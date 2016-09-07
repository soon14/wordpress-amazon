/*
* Author: Doris
*/

ND.LincolnContext = (function (NDContext,$) {

    var 
    
    ctx = {},

    init = function () {
        ctx = NDContext.toJSONFromUrl();
        if (ctx != null && ((typeof ctx.m !== 'undefined' && ctx.m != null)) && ((typeof ctx.d !== 'undefined' && ctx.d != null))) {
            prePopulate();
        }
    },
        
    prePopulate = function () {
        var ddlModel = $('#voi-model-name');
        var ddlSeries = $('#voi-series-name');
        if ($('#mapping-m-config').length > 0) {
            var config_m = $('#mapping-m-config').embeddedData();
            if (config_m[ctx.m]) {
                ddlModel.val(config_m[ctx.m]);
            }
        }
        if ($('#mapping-d-config').length > 0) {
            var config_d = $('#mapping-d-config').embeddedData();
            if (config_d[ctx.d]) {
                ddlSeries.val(config_d[ctx.d]);
            }
        }
    };


    $(document).ready(function () {
        init();
    });

})(ND.Context || {}, jQuery);
