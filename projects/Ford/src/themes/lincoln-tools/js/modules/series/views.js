/**
 * @author Sohrab Zabetian
 * @description views for series module
 * @project Lincoln Build and Price
 */


ND.LBP.DerivativeViews = (function($) {


    var v = {},
        events = {
            HideSeriesDetailOverlay : 'HideSeriesDetailOverlayEvent',
            UpdateSeriesImage : 'UpdateSeriesImageEvent'

        };

    v.Derivatives = Backbone.View.extend({

        children : [],


        render: function() {
            var i = 0,
                el = this.$el,
                html = this.template();

            el.html(html);
            var $div = el.find('.series-row');
            var collection = this.model.get(ND.LBP.Constants.DERIVATIVES);

            _.each(collection.models, function (derivative) {
                this.children[i] = new v.Derivative({model:derivative});
                $div.append(this.children[i].render().$el);
                i++;
            }, this);

            if (i === 4) {
                $div.addClass('grid-4');
            }else if (i === 2) {
                $div.addClass('grid-2');
            }else if (i === 5) {
                $div.addClass('grid-5');
				$div.parent().parent().removeClass('large-9');
            }
            this.addTotalPrice();
            return this;
        },

        addTotalPrice : function() {
            this.$el.find('#bp-series-total-price').empty()
                .append( this.totalPriceTemplate({total : this.model.get('total')}));
        },

        initialize: function() {
            this.template = _.template($('#bp-derivative-list-template').html());
            this.totalPriceTemplate = _.template($('#bp-derivative-list-total-price-template').html());
            this.model.on('change:total', this.addTotalPrice, this);
            Backbone.on(events.HideSeriesDetailOverlay, this.hideOverlays, this);
            Backbone.on(events.UpdateSeriesImage, this.updateSeriesImage, this);
        },

        updateSeriesImage: function(imagePath) {
            this.$el.find('.car-stage').empty().append($('<img src="' + ND.LBP.Config.baseImageURL + imagePath + '" />'));
        },

        hideOverlays : function() {
            this.$('.series-detail').attr('class', 'bp-details-overlay hide');
        }
    });

    v.Derivative = Backbone.View.extend({

        tagName: 'li',

        children : [],


        render: function() {

            var i = 0,
                el = this.$el,
                engines = this.model.get(ND.LBP.Constants.ENGINES);

            el.html(this.template(this.model.toJSON()));

            var $div = el.find('.series');
            _.each(engines.models, function (engine) {
                this.children[i] = new v.Engine({model:engine});
                $div.append(this.children[i].render().$el);
                i++;
            }, this);

            this.changeSeriesImage();

            return this;
        },

        initialize: function() {
            this.template = _.template($("#bp-derivative-list-item-template").html());
            this.model.bind('change:selected', this.render, this);
            this.model.bind('destroy', this.destroy, this);
        },

        changeSeriesImage: function() {
            if (this.model.get('selected') && this.model.get(ND.LBP.Constants.IMAGES).length > 0) {
                Backbone.trigger(events.UpdateSeriesImage, this.model.get(ND.LBP.Constants.IMAGES).at(0).get('src'));
            }
        }


    });

    v.Engine = Backbone.View.extend({

        tagName: 'li',

        events: {
            'click .bp-engine-name' : 'engineSelected' ,
            'click .series-options' :  'engineSelected',
            'click .comparison-overlay' : 'showComparisonChart'
        },

        render: function() {

            var el = $(this.el);
            el.toggleClass('active', this.model.get('selected')).html($(this.template(this.model.toJSON())));
            if (!this.firstTime && this.model.get('selected')) {
                this.$('.bp-details-overlay').attr('class', 'bp-details-overlay series-detail');
            }
            this.firstTime = false;
            return this;
        },

        showComparisonChart: function(e) {
            e.preventDefault();
            var comparisonUrl = $(e.currentTarget).data('href');
            if (typeof comparisonUrl !== 'undefined') {
                $.ajax({
                    url: comparisonUrl,
                    type: 'GET'
                }).done(function(data){
                        ND.LBP.ComparisonOverlay(data);
                    }).fail(function(){
                        Backbone.trigger(ND.LBP.Events.ErrorOccurred, new ND.LBP.CommonModels.Error());
                    });
            }
        },

        engineSelected: function(e) {
            Backbone.trigger(events.HideSeriesDetailOverlay);
            Backbone.trigger(ND.LBP.Events.SeriesEngineSelected, this.model);

            e.preventDefault();
            e.stopImmediatePropagation();
            $('body').on('click', this.detectBodyClicks);
        },

        detectBodyClicks : function(e) {
            if (!$(e.target).parents().andSelf().is('.bp-details-overlay')) {
                Backbone.trigger(events.HideSeriesDetailOverlay);
                $("body").off('click', this.detectBodyClicks);
            }
        },

        initialize: function() {
            this.firstTime = true;
            this.template = _.template($("#bp-engine-list-item-template").html());
            this.model.bind('change:selected', this.render, this);
            this.model.bind('destroy', this.destroy, this);
        }

    });


    return v;

})(jQuery);