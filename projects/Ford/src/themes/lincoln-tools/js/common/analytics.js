/**
 * @author Sohrab Zabetian
 * @description Analytics module for Lincoln Build and price
 * @project Lincoln Build and Price
 */
ND.LBP.Analytics = (function() {

    var analytics = {

        region: null,

        nameplate: null,

        usedNameplateIds: {},

        resetOmnitureVars: function() {
            _da.tool = _da.der = _da.nameplate = _da.events = _da.region = undefined;
            _da.funnel.stepname = undefined;
        },

        getDeviceType : function() {
            var prefix = 'ui:rad:';
            if (screen.width < ND.LBP.Constants.MOBILE_SCREEN_SIZE) {
               return prefix + 'phone';
            } else if (screen.width >= ND.LBP.Constants.MOBILE_SCREEN_SIZE && screen.width < ND.LBP.Constants.TABLET_SCREEN_SIZE) {
               return prefix + 'tablet';
            }
            return prefix + 'pc';
        },

        setupOmnitureVars: function(data) {
            _da.funnel.stepname = data.state + data.stepName;
            _da.deviceType = analytics.getDeviceType();
            analytics.setupNameplateVars();
            if (typeof data.events !== 'undefined' && data.events != null) {
                _da.events = data.events.split(',');
            }
        },

        /**
         *
         * @param nameplateData should contain name, modelYear, id, category
         */
        nameplateChanged: function(nameplateData) {
            analytics.nameplate =  nameplateData ;
            //console.log('Omniture: nameplateChanged: ' + nameplateData);
            //each event can be fired once per nameplate per visit
            if (typeof analytics.usedNameplateIds[analytics.nameplate.id] === 'undefined') {

                analytics.usedNameplateIds[analytics.nameplate.id] = 'used'; //some random value

                Backbone.off(ND.LBP.Events.ColorSelected, analytics.colorChanged)
                        .once(ND.LBP.Events.ColorSelected, analytics.colorChanged, analytics);

                Backbone.off(ND.LBP.Events.TrimSelected, analytics.trimChanged)
                        .once(ND.LBP.Events.TrimSelected, analytics.trimChanged, analytics);

                Backbone.off(ND.LBP.Events.FabricSelected, analytics.fabricChanged)
                        .once(ND.LBP.Events.FabricSelected, analytics.fabricChanged, analytics);

                Backbone.off(ND.LBP.Events.RimSelected, analytics.rimChanged)
                        .once(ND.LBP.Events.RimSelected, analytics.rimChanged, analytics);

                Backbone.off(ND.LBP.Events.AccessorySelected, analytics.accessorySelected)
                        .once(ND.LBP.Events.AccessorySelected, analytics.accessorySelected, analytics);
            }
        },

        setupNameplateVars: function() {
            var nameplate = analytics.nameplate;
            if (typeof nameplate !== 'undefined' && nameplate != null) {
                _da.nameplate = {
                    name: (nameplate.analyticsName || nameplate.name),
                    year : nameplate.year,
                    id : nameplate.id,
                    cat : nameplate.analyticsCategory || nameplate.category || ''
                };
            }
           // //console.log('analytics setupNameplateVars ' + _da.nameplate);
        },

        locationChanged: function(loc) {
            //console.log('Omniture: locationChanged: ' + loc);
            analytics.region = loc;
        },

        viewPDF: function() {
            //console.log('viewPDF');
            analytics.resetOmnitureVars();
            var data = {},
                params = analytics.setupParams(data, 'd');
            _da.region = undefined;
            params.pname = _da.pname + ':5' + data.path + 'summary';
            params.link = params.title = _da.pname + data.path + 'vehicle summary:pdf:download';
            params.onclicks = _da.pname +  ' summary:download pdf';
            params.deviceType = analytics.getDeviceType();
            analytics.setupNameplateVars();
            //ND.omniture.trackLink(params);
            $.publish('/analytics/link/', params);
        },

        shareConfig: function() {
            analytics.resetOmnitureVars();
            var data = {},
                params = analytics.setupParams(data, 'o');
            _da.region = undefined;
            params.pname = _da.pname + ':5' + data.path + 'summary';
            params.link = params.title = _da.pname + data.path + 'vehicle summary:share';
            params.onclicks = _da.pname +  ' summary:share';
            params.deviceType = analytics.getDeviceType();
            analytics.setupNameplateVars();
            //ND.omniture.trackLink(params);
            $.publish('/analytics/link/', params);
        },

        saveConfig: function() {
            analytics.resetOmnitureVars();
            var data = {},
                params = analytics.setupParams(data, 'o');
            _da.region = undefined;
            params.pname = _da.pname + ':5' + data.path + 'summary';
            params.link = params.title = _da.pname + data.path + 'vehicle summary:save';
            params.onclicks = _da.pname +  ':summary:save';
            params.deviceType = analytics.getDeviceType();
            analytics.setupNameplateVars();
            //ND.omniture.trackLink(params);
            $.publish('/analytics/link/', params);
        },

        _init: function() {
           Backbone.once(ND.LBP.Events.LocationUpdated, analytics.locationChanged, analytics);
           Backbone.on(ND.LBP.Events.NameplateChanged, analytics.nameplateChanged, analytics);
           Backbone.on(ND.LBP.Events.TrackOmniture, analytics.trackOmniturePage, analytics);
           Backbone.on(ND.LBP.Events.ViewPDF, analytics.viewPDF, analytics);
           Backbone.on(ND.LBP.Events.SocialLinkClicked, analytics.shareConfig, analytics);
           Backbone.on(ND.LBP.Events.SaveConfiguration, analytics.saveConfig, analytics);
        },

        setupRegionVars: function() {
            if (analytics.region != null) {
               _da.region = analytics.region ;
            }
        },

        tabChanged: function(data) {
            analytics.resetOmnitureVars();
            analytics.constructTabPageName(data);
            analytics.setupOmnitureVars(data);
            ND.analyticsTag.trackOmnitureSinglePageApp();
        },

        colorChanged: function(data) {
            //console.log('colorChanged');
            analytics.trackAccessoryChange(data, 2, 'exterior', 'exterior:colour trim', 'color trim:ext');
        },

        rimChanged: function(data) {
            //console.log('rimChanged');
            analytics.trackAccessoryChange(data, 2, 'exterior', 'exterior:rim', 'rims');
        },

        exteriorAccessorySelected: function(data) {
            //console.log('exteriorAccessorySelected');
            analytics.trackAccessoryChange(data, 2, 'features', 'features:exterior', 'color trim:ext');
        },

        trimChanged: function(data) {
            //console.log('trimChanged');
            analytics.trackAccessoryChange(data, 3, 'interior', 'interior:colour trim', 'color trim:int');
        },

        fabricChanged : function(data) {
            //console.log('fabricChanged');
            analytics.trackAccessoryChange(data, 3, 'interior', 'interior:applique', 'applique:int');
        },

        interiorAccessorySelected : function(data) {
            //console.log('interiorAccessorySelected');
            analytics.trackAccessoryChange(data, 3, 'interior', 'interior:accessories', 'accessories:int');
        },

        accessorySelected: function(data) {
            //console.log('accessorySelected');
            analytics.trackAccessoryChange(data, 4, data.category.name, 'features', 'features');
        },

        trackAccessoryChange: function(data, step, pageNameSuffix, linkSuffix, onClicksSuffix) {
            //console.dir(data) ;
            analytics.resetOmnitureVars();
            var params = analytics.setupParams(data, 'o');
            _da.region = undefined;
            params.pname = _da.pname + ':' + step + data.path + pageNameSuffix;
            params.link = params.title = _da.pname + data.path + linkSuffix;
            params.onclicks = _da.pname + ' ' + onClicksSuffix;
            params.deviceType = analytics.getDeviceType();
            analytics.setupNameplateVars();
            //ND.omniture.trackLink(params);
            $.publish('/analytics/link/', params);
        },


        accessoryDetailViewed: function(data) {
            var params = { type: 'o'};
            analytics.resetOmnitureVars();
            //find the selected category and construct its page name
            analytics.constructTabPageName(data);
            params.pname = data.state + data.stepName;
            params.link = params.title = 'vehicle:accessories:pop up:detail';
            params.onclicks = 'accessories: detail popup';
            if (typeof data.state !== 'undefined') {
                //ND.omniture.trackLink(params);
                $.publish('/analytics/link/', params);
            }
        },

        constructTabPageName: function(data) {

            var category = data.category,
                analyticsName = category.name;

                analytics.setPath(data);
                data.state = category.omniState;
                data.isColorTrimTab = data.isColourCategory;
                data.stepName = data.path + analyticsName;
                data.stepNameNoAnalyticsStep = data.path + analyticsName;
        },


        setupParams: function(data, type) {
            var params = { type: type};
            this.resetOmnitureVars();
            this.setPath(data);
            return params;
        },

        setPath: function(data) {
            data.path = ':full:';
        },

        trackOmniturePage: function(data) {

            var stepName, events;
            //make sure these global object exist and clear them all.
            //values should not be carried from page to page.
            analytics.resetOmnitureVars();
            analytics.setupRegionVars();

            switch(data.state) {
                case ND.LBP.Constants.MODEL_OVERLAY_PAGE_NAME:
                    stepName = ':model:postal code';
                    data.state = '0a';
                    break;
                case ND.LBP.Constants.NAMEPLATE_PAGE_NAME:
                    stepName = ':model:select';
                    data.state = '0';
                    break;
                case ND.LBP.Constants.SERIES_PAGE_NAME:
                    data.state = '1';
                    _da.region = undefined;
                        stepName = ':full:derivative';
                    _da.tool = {name : 'event: bp start'};
                    events = 'event6,event43';
                    break;
                case ND.LBP.Constants.ACCESSORIES_PAGE_NAME:
                    //data.state = '2';
                    _da.region = undefined;
                    analytics.tabChanged(data);
                    return;
                case ND.LBP.Constants.SUMMARY_PAGE_NAME:
                    data.state = '5';
                        stepName = ':full:summary';
                    _da.tool = {name : 'event: bp finished'};
                    events = 'event2,event43';
                    //v18	"Body Model,Trim"
                    //v19	"Ext:Int Color Code"
                    //v20	Accessories Picked
                    //v21	Veh. Options Picked
                    //v23	"Option	Pkgs Picked"
                    //v24	"Engine: Trans"
                    //v25 	Price
                    _da.der = {};
                    //get all the ids from user object.
                    _da.der.colour = data.colourId;
                    _da.der.trim = data.trimId;


                    _da.der.optionpacks = undefined;
                    _da.der.features = data.omnitureFeatures.length > 0 ? data.omnitureFeatures.join(',') : undefined;
                    _da.der.options = data.vehicleOptions.length > 0 ? data.vehicleOptions.join(',') : undefined;
                    analytics.setPath(data);
                    _da.der.engine = data.engineId;
                    _da.der.name = data.seriesId;
                    break;
                default :
                    //console.log('unknown step ' + data.state);
            }

            data.stepName = stepName;
            data.events = events;
            analytics.setupOmnitureVars(data);

            //console.dir(_da);

            ND.analyticsTag.trackOmnitureSinglePageApp();

        }
    }

    if (ND.analyticsTag.isSinglePageAppOmnitureConfigured()) {
        analytics._init();
    }


})();