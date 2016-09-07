/**
 * @author Sohrab Zabetian
 * @description views for accessories module
 * @project Lincoln Build and Price
 */
ND.LBP.ExteriorViews = (function($) {


    var v = {},
        events = {
            ToggleSection: 'ToggleSectionEvent', //toggles between tabs in exterior
            HideFeaturePopup : 'HideFeaturePopupEvent'
        };

    v.toggleSection = function(e) {
        var $this = this.$el,
            isExpanded = $this.hasClass('active');

        $this.toggleClass('active', !isExpanded);
    };

    v.AllAccessories = Backbone.View.extend({
        children : [],

        render: function() {
            var i = 0,
                el = this.$el,
                html = this.template({total : this.model.get('total')}),
                $ul,
                specialType,
                featureGroups = this.model.get(ND.LBP.Constants.FEATURE_GROUPS);

            el.html(html);
            $ul = el.find('#bp-exterior-content');

            _.each(featureGroups.models, function(featureGroup) {
                  specialType = featureGroup.get(ND.LBP.Constants.SPECIAL_TYPE);
                if (specialType === ND.LBP.Constants.COLOUR_TAB_ID ||
                    specialType === ND.LBP.Constants.INTERIOR_TRIM_TAB_ID ||
                    specialType === ND.LBP.Constants.INTERIOR_FABRIC_TAB_ID) {
                    this.children[i] = new v.Colours({model : featureGroup });
                } else {
                   this.children[i] = new v.Accessories({id: ('accessory_' + i), model : featureGroup });
                }

                $ul.prepend(this.children[i].render().$el);
                $ul.find('li:empty').remove();
                i++;
           }, this);

            //expand the first section
            //this.children[0].trigger(events.ToggleSection);
            this.addTotalPrice();
            return this;
        },

        addTotalPrice : function() {
            this.$el.find('#bp-exterior-total-price').empty()
                .append( this.totalPriceTemplate({total : this.model.get('total')}));
        },

        initialize: function() {
            this.totalPriceTemplate = _.template($('#bp-derivative-list-total-price-template').html());
            this.template = _.template($('#bp-exterior-template').html());
            this.model.on('change:total', this.addTotalPrice, this);
        }
    });


    v.Colours = Backbone.View.extend({

        tagName: 'li',

        className: 'expanded active',

        children : [],

        events: {
            'click span.title': 'toggleSection'
        },

        toggleSection: v.toggleSection,

        render: function() {
            //console.log('colours.render()');
            var i = 0,
                el = this.$el,
                isHidden = this.model.get('isHidden'),
				iColor = 0;

            el.toggleClass('hide', isHidden);
            if (!isHidden) {
                el.html(this.template(this.model.toJSON()));
                var $ul = this.$('ul.colors'),
                    features = this.model.get('features');

                _.each(features.models, function (feature) {
                    this.children[i] = new v.Colour({model: feature});
                    $ul.append(this.children[i].render().$el);
					if(!this.children[i].render().$el.hasClass('hide')) iColor++;
                    i++;
                }, this);
				if(iColor===10) {
					$ul.addClass('exterior-color-10'); 
					}
				else {
					$ul.removeClass('exterior-color-10');
					}
				
            }
            return this;
        },


        initialize: function() {
            this.template = _.template($('#bp-colour-list-template').html());
            this.model.on('change:isHidden', this.render, this);
            this.on(events.ToggleSection, this.toggleSection, this);
        }
    });

    v.Colour = Backbone.View.extend({
        tagName: 'li',

        events: {
           'click .color' : 'colourSelected'
        },

        colourSelected: function() {

           Backbone.trigger(ND.LBP.Events.AccessoryToggled, this.model);
        },

        render : function() {
            //console.log(this.model.get('name')  + ' isHidden? ' + this.model.get('isHidden'));
            var isSelected = this.model.get('selected');
            $(this.el).html($(this.template(this.model.toJSON())))
                      .toggleClass('hide', this.model.get('isHidden'))
                      .toggleClass('active',isSelected);

            var $colorWrap = this.$('.color-popup-wrap');
            if (isSelected) {
                $colorWrap.addClass('active');
                setTimeout(function() {
                    $colorWrap.removeClass('active');
                }, 5000);
            } else {
                $colorWrap.removeClass('active');
            }
            return this;
        },

        initialize: function() {
            this.template = _.template($('#bp-colour-list-item-template').html());
            this.model.on('change', this.render, this);
            this.on(events.ToggleSection, this.toggleSection, this);
        }
    });

    v.Accessories = Backbone.View.extend({

        tagName: 'li',

        className: 'expanded active',

        children : [],

        events: {
            'click span.title': 'toggleSection',
            'click div.option-thumbnail .image' : 'displayAccessoryDetails'
        },

        toggleSection: v.toggleSection,

        displayAccessoryDetails: function(e) {
            this.hideAllFeatureGroups();
            var popupId = $(e.currentTarget).data('popupid'),
                $popup = $('#' + popupId);
            $popup.addClass('active');

            Backbone.once(events.HideFeaturePopup, function() {
                //console.log('once ' + events.HideFeaturePopup);
                $popup.removeClass('active');
            });

            e.preventDefault();
            e.stopImmediatePropagation();

            $("body").one('click', this.hideAllFeatureGroups);

            //$popup.on('click', this.hideAllFeatureGroups);
            //TODO: figure out a way to hide overlay when someone clicks outside the overlay
             //$(document).not($popup).on('click', this.hideAllFeatureGroups);
        },

        hideAllFeatureGroups : function() {
            //console.log('hideAllFeatureGroups');
            Backbone.trigger(events.HideFeaturePopup);
        },

        render: function() {
            var i = 0,
                el = this.$el,
                isHidden = this.model.get('isHidden');
            el.toggleClass('hide', isHidden);
            //console.log('accessories.render() isHidden:' + isHidden);
            if (!isHidden) {
                el.toggleClass('expanded', el.hasClass('expanded'))
                  .html(this.template(this.model.toJSON()));

                var $ul = el.find('ul.options'),
                    features = this.model.get('features');

                _.each(features.models, function (feature) {
                    this.children[i] = new v.Accessory({model:feature});
                    var list = this.children[i].render().$el;
                    if (!list.hasClass('hide')) $ul.append(list);
                    i++;
                }, this);
            }

            return this;
        },

        initialize: function() {
            this.template = _.template($('#bp-option-list-template').html());
            this.model.on('change:isHidden', this.render, this);
            this.on(events.ToggleSection, this.toggleSection, this);
        }
    });

    v.Accessory = Backbone.View.extend({
        tagName: 'li',

        events: {
            'click .enabled' : 'accessorySelected'
        },

        render : function() {
            $(this.el).html($(this.template(this.model.toJSON())))
                      .toggleClass('hide', this.model.get('isHidden'));

//            var $colorWrap = this.$('.option-popup-wrap'),
//                isSelected = this.model.get('selected');
//            if (isSelected) {
//                $colorWrap.addClass('active').fadeOut(7000);
//            } else {
//                $colorWrap.removeClass('active');
//            }

            return this;
        },

        accessorySelected: function() {
            Backbone.trigger(ND.LBP.Events.AccessoryToggled, this.model);
        },

        initialize: function() {
            this.template = _.template($('#bp-option-list-item-template').html());
            this.model.on('change', this.render, this);
        }
    });

    return v;

})(jQuery);