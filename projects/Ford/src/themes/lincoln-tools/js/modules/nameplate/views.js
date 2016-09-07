/**
 * @author Sohrab Zabetian
 * @description views for nameplate module
 * @project Lincoln Build and Price
 */


ND.LBP.NameplateViews = (function($) {


    var v = {};

    v.Nameplates = Backbone.View.extend({

        children : [],

        render: function() {
            var i = 0,
                el = this.$el,
                html = this.template();

            var threeColumns = this.collection.models.length === 3;

            el.html(html);

            if (threeColumns) {
                el.find('.model-select').addClass('is-3-columns');
            }

            var $div = el.find('.row');

            _.each(this.collection.models, function (nameplate) {
                this.children[i] = new v.Nameplate({model: nameplate});

                if (threeColumns) {
                    this.children[i].$el.removeClass('medium-6').addClass('medium-4');
                }

                $div.append(this.children[i++].render().el);
            }, this);

            return this;
        },

        initialize: function() {
            this.template = _.template($('#bp-nameplate-list-template').html());
            this.collection.bind("reset", this.render, this);
        }
    });

    v.Nameplate = Backbone.View.extend({

        tagName: 'div',

        className: 'tier columns medium-6',

        events: {
           'click .bp-nameplate-list-item' : 'nameplateSelected'
        },



        nameplateSelected : function(e) {
            e.preventDefault();
            Backbone.trigger(ND.LBP.Events.NameplateSelected, this.model);
        },

        initialize: function() {

            var model = this.model;

            this.model.set('getModelPageUrl', getModelPageUrl, {silent: true});

            this.template = _.template($("#bp-nameplate-list-item-template").html());

            // this.model.bind('change', this.toggleClass, this);
            this.model.bind('destroy', this.destroy, this);

            var navigatorModels = ND.LBP.Config.navigatorModels.split(",");

            // TODO: remove anti-pattern
            // This logic should be in JSP template
            function getModelPageUrl() {

                var isModelNavigator = navigatorModels.indexOf(model.get('id')) > -1;

                model.set('isModelNavigator', isModelNavigator);

                return model.get('isModelNavigator') ? model.get('modelNavigatorPageUrl')
                                                     : model.get('seriesURL');

            }
        },

        toggleClass: function() {
            //$(this.el).toggleClass('cur', this.model.get('selected'));
        }

    });


    return v;

})(jQuery);