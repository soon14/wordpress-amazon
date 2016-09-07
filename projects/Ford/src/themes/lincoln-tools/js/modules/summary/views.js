/**
 * @author Sohrab Zabetian
 * @description views for nameplate module
 * @project Lincoln Build and Price
 */

    //DO NOT CHANGE
ND.LBP.SummaryViews = (function($) {
    //DO NOT CHANGE

    var v = {};

    v.Summary = Backbone.View.extend({

        children : [],

        events: {
            // 'click .car-review' : 'showVehicleOverlay',
            // 'click .close-btn' : 'hideVehicleOverlay',
            'click .bp-set-location' : 'displayLocationOverlay',
            'click .bp-summary-btn' : 'callToActionButtonClicked'
        },

        callToActionButtonClicked: function(e) {
            e.stopImmediatePropagation();
        },

        displayLocationOverlay: function(e) {
            e.preventDefault();
            Backbone.trigger(ND.LBP.Events.ShowLocationOverlay);
        },

        showVehicleOverlay: function(e) {
            e.preventDefault();
            $('#bp-summary-gallery').removeClass('hide');
            setTimeout(function() {
                $(window).on('hashchange', function() {
                    $('body').removeClass('noscroll');
                    $(window).off('hashchange');
                });
            }, 300);
            $('body').addClass('noscroll');
        },

        hideVehicleOverlay: function(e) {
            e.preventDefault();
            $('#bp-summary-gallery').addClass('hide');
            $('body').removeClass('noscroll');
        },

        render: function() {

            //console.log(this.model.toJSON());
            var i = 0,
                el = this.$el,
                html = this.template(this.model.toJSON());

            el.html(html);

            var $summaryDetails = $('#bp-summary-details'),
                categories = this.model.get('categories');

            _.each(categories.models, function (category) {
                this.children[i] = new v.SummaryCategory({ model:category });
                $summaryDetails.append(this.children[i].render().$el);
                i++;
            }, this);

            if (this.model.get('galleryPreview')) {

                // var galleryPreview = this.model.get('galleryPreview').get(ND.LBP.CommonViews.determineDeviceType());

                // this.children[i] = new ND.LBP.CommonViews.GalleryImage({
                //     className: 'active',
                //     noId: true,
                //     el: $('#bp-summary-image').find('.car-review'),
                //     model: galleryPreview.at(0)
                // });

                // this.children[i++].render();

                this.children[i] = new ND.LBP.CommonViews.Gallery({
                    el : $('#bp-summary-image').find('.car-review'),
                    showSwitchBtn: false,
                    model: this.model.get(ND.LBP.Constants.IMAGES)
                });

                this.children[i++].render();
            }

            //Show Location Info not needed. Comment out the code in case that the Clients need again ==!
            //this.renderLocation();
            this.$el.find('#bp-summary-location-title').parent('.location').hide();

            this.renderOverlay();

            return this;
        },

        renderLocation: function() {
            this.$el.find('#bp-summary-location-title').html(
                this.locTemplate({
                    userLocation: this.model.get(ND.LBP.Constants.USER_LOCATION)
                }));
        },

        renderOverlay : function() {
            // var $galleryContainer = $('#bp-summary-gallery').find('.car-stage');
            var $galleryContainer = $('#bp-summary-image').find('.car-review');
            this.children[this.children.length - 1] = new ND.LBP.CommonViews.Gallery({
                el : $galleryContainer,
                showSwitchBtn: false,
                model: this.model.get(ND.LBP.Constants.IMAGES)
            });
            this.children[this.children.length - 1].render();
        },

        initialize: function() {
            this.template = _.template($('#bp-summary-template').html());
            this.locTemplate = _.template($('#bp-summary-location-template').html());
            this.model.bind('change:images', this.renderOverlay, this);
            this.model.bind('change:userLocation', this.renderLocation, this);
            this.model.bind('destroy', this.destroy, this);
        }

    });

    v.SummaryCategory = Backbone.View.extend({
        tagName: 'li',

        initialize: function() {
            this.template = _.template($('#bp-summary-category-template').html());
            this.categoryItemTemplate = _.template($('#bp-summary-category-item-template').html());
            //this.model.bind('change', this.render, this);
            this.model.bind('destroy', this.destroy, this);
        },

        render: function() {
            var el = this.$el;

            el.html(this.template(this.model.toJSON()));
            var $details = el.find('.details'),
                accessories = this.model.get('accessories');
            _.each(accessories.models, function (accessory) {
                $details.append(this.categoryItemTemplate(accessory.toJSON()));
            }, this);

            return this;
        }

    });

    return v;

})(jQuery);