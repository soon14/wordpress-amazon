/**
 * @author Sohrab Zabetian
 * @description Analytics for Nameplate page
 * @project Lincoln build and price
 */
(function() {


    var analytics = {

        logLocationChange: function(loc) {
            var params = { type: 'o'};
            ND.LBP.Analytics.resetOmnitureVars();
            ND.LBP.Analytics.setupOmnitureVars();
            _da.region = loc;
            params.link = params.title = _da.pname + ':0a:model:postal code';
            params.onclicks = 'postal code';
            params.pname = _da.pname + ':0:model:postal code';
            //ND.omniture.trackLink(params);
            $.publish('/analytics/link/', params);
        },

        _init: function() {
           // Backbone.on(ND.LBP.Events.LocationChanged, analytics.logLocationChange, analytics);
        }
    }

    //

    analytics._init();
})();
