/**
 * @author Sohrab Zabetian
 * @description module  for nameplate detail module
 * @project Lincoln Build and Price
 *
 *
 *     AVAILABLE     Not-selected - Can be selected by the user (could cause a conflict)
 *     DEFAULT       Selected by the system as part of GForce auto-complete
 *     SELECTED      Selected by the user explicitly
 *     INCLUDED      Selected by the system due to another feature requiring it
 *     EXCLUDED      Not-selected – Can be selected by user but will cause a conflict
 *     FORBIDDEN     Should never have features in this state.
 */

ND.LBP.SummeryModels = (function() {


    var m = {};

    m.Summary = Backbone.Model.extend({

        series : null, //selected series name
        seriesRoute: null,
        engine : null, //selected engine name
        categories : null,
        images: null,
        galleryPreview: null,
        total: null,
        defaults: {
            userLocation : 'setLoc'
        }
    });

    m.SummaryCategory = Backbone.Model.extend({

       defaults : {
           name: '',
           sequence: 0,
           categoryRoute: '#'
       },
       accessories : null
    });

    m.SummaryAccessory = Backbone.Model.extend({

        defaults : {
            name: '',
            price : null,
            sequence: 0
        }
    });

    return m;


})();