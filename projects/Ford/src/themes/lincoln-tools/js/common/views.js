/**
 * @author Sohrab Zabetian
 * @description shared views for all modules
 * @project Lincoln Build and Price
 */

ND.LBP.CommonViews = (function ($, nv, dv, exv, sumv) {


    var v = {},
        events = {
            HideHeader: 'HideHeaderEvent',
            UpdateMobileHeader: 'UpdateMobileHeaderEvent'
        },
        Constants = {
            ACTIVE: 'active'
        };

    v.detectClickOutsideArea = function (context, callback, isPreventDefault) {
        var detectBodyClicks = function (e) {
            //console.log('detectBodyClicks');
            if (isPreventDefault) {
                e.preventDefault();
            }
            if (!$(e.target).parents().andSelf().is(context.id)) {
                callback.call(context);
                $("body").off('click', detectBodyClicks);
            }
        };

        $("body").on('click', detectBodyClicks);
    };

    v.Page = Backbone.View.extend({
        render: function () {
            return this;
        },

        trackPage: function () {
            Backbone.trigger(ND.LBP.Events.TrackOmniture, {state: ND.LBP.Constants.MODEL_OVERLAY_PAGE_NAME});
        },

        show: function () {
            this.trackPage();
            this.$locationOverlay.removeClass('hide');
        },

        hide: function () {
            this.$locationOverlay.addClass('hide');
        },

        events: {
            'click .close-btn': 'cancelLocSelection',
            'click .arrow-btn': 'selectLocation'
        },

        cancelLocSelection: function (e) {
            e.preventDefault();
            Backbone.trigger(ND.LBP.Events.LocationCanceled, null);
            this.hide();
        },

        selectLocation: function (e) {
            e.preventDefault();
            var $select = this.$locationOverlaySelect;
            Backbone.trigger(ND.LBP.Events.LocationChanged, $select.val(), $select.find('option:selected').text());
            this.hide();
        },

        initialize: function () {
            this.$locationOverlaySelect = $('#bp-select-locations');
            this.$locationOverlay = $('#bp-location-overlay');
            Backbone.on(ND.LBP.Events.ShowLocationOverlay, this.show, this);
            Backbone.on(ND.LBP.Events.HideLocationOverlay, this.hide, this);
        }
    });

    v.AlertOverlay = Backbone.View.extend({
        className: 'rad-overlay-bg',

        events: {
            'click .bp-yes': 'confirmChange',
            'click .bp-no': 'cancelChange'
        },

        confirmChange: function () {
            //Backbone.trigger(ND.LBP.Events.AcceptConflictResolution);
            this.hide();
        },

        cancelChange: function () {
//            Backbone.trigger(ND.LBP.Events.RejectConflictResolution, this.model);
            this.hide();
        },

        renderDefault: function (el) {
            el.html(this.alertTemplate());
            return el;
        },

        hide: function () {
            this.destroy();
        },

        initialize: function () {
            this.alertTemplate = _.template($('#bp-alert-overlay-template').html());
            //this.model.on('change', this.render, this);
        }
    });

    v.ConfirmationOverlay = v.AlertOverlay.extend({
        confirmChange: function () {
            Backbone.trigger(ND.LBP.Events.ChangeSeries);
            this.hide();
        },
        cancelChange: function () {
            this.hide();
        },

        render: function () {

            var el = this.$el;
            this.renderDefault(el).find('.message').html(this.confirmationTemplate(this.model.toJSON()));

            return this;
        },


        initialize: function () {
            v.AlertOverlay.prototype.initialize();
            this.confirmationTemplate = _.template($('#bp-confirmation-template').html());
            //this.model.on('change', this.render, this);
        }
    });

    v.SuccessOverlay = v.AlertOverlay.extend({
        events: {
            'click .bp-ok': 'dismiss'
        },

        dismiss: function () {
            this.hide();
        },

        render: function () {

            var el = this.$el;
            this.renderDefault(el).find('.message').html(this.confirmationTemplate({}));
            this.$('.bp-no').remove();
            this.$('.bp-yes').remove();
            this.$('.bp-ok').removeClass('hide');
            return this;
        },

        initialize: function () {
            v.AlertOverlay.prototype.initialize();
            this.confirmationTemplate = _.template($('#bp-success-template').html());
        }
    });

    v.ConflictOverlay = v.AlertOverlay.extend({

        cancelChange: function () {
            Backbone.trigger(ND.LBP.Events.RejectConflictResolution, this.model);
            this.hide();
        },

        render: function () {


            var el = this.$el;
            this.renderDefault(el).find('.message').html(this.conflictTemplate({featureName: this.model.get('featureName')}));
            var $addContainer = this.$('.bp-added-container'),
                $addContainerText = this.$('.bp-added-details'),
                $removeContainer = this.$('.bp-removed-container'),
                $removeContainerText = this.$('.bp-removed-details'),
                self = this,
                toggleContainer = true,
                additions = this.model.get('additions'),
                subtractions = this.model.get('subtractions');
            if (additions != null && additions.length > 0) {
                _.each(additions.models, function (addition) {
                    $addContainerText.append(self.conflictChangeTemplate(addition.toJSON()));
                });
                toggleContainer = false;
            }

            $addContainer.toggleClass('hide', toggleContainer);
            toggleContainer = true;
            if (subtractions != null && subtractions.length > 0) {
                _.each(subtractions.models, function (subtraction) {
                    $removeContainerText.append(self.conflictChangeTemplate(subtraction.toJSON()));
                });
                toggleContainer = false;
            }

            $removeContainer.toggleClass('hide', toggleContainer);

            return this;
        },


        initialize: function () {
            v.AlertOverlay.prototype.initialize();
            this.conflictTemplate = _.template($('#bp-conflict-template').html());
            this.conflictChangeTemplate = _.template($('#bp-conflict-changes-template').html());
            //this.model.on('change', this.render, this);
        }
    });

    v.ErrorOverlay = Backbone.View.extend({
        className: 'rad-overlay-bg',

        events: {
            'click .bp-yes': 'tryAgain',
            'click .bp-no': 'startOver'
        },

        tryAgain: function () {
            this.hide();
            Backbone.trigger(ND.LBP.Events.TryAgain);
        },

        startOver: function () {
            Backbone.trigger(ND.LBP.Events.StartOver);
            this.hide();
        },

        hide: function () {
            this.destroy();
        },

        initialize: function () {
            this.template = _.template($('#bp-error-overlay-template').html());
            Backbone.on(ND.LBP.Events.CloseOverlay, this.hide, this);
        }
    });


    v.Navigation = Backbone.View.extend({

        children: [],

        render: function () {
            return this;
        }
    });

    v.Headers = Backbone.View.extend({

        id: 'bp-headers',

        children: [],

        events: {
            'click .current-step': 'showMobileMenu'
        },

        showMobileMenu: function (e) {
            this.toggleMobileMenu(true);
            e.stopImmediatePropagation();
            v.detectClickOutsideArea(this, function () {
                this.toggleMobileMenu(false);
            }, true);
        },

        removeMobileMenu: function () {
            this.toggleMobileMenu(false);
        },

        toggleMobileMenu: function (show) {
            this.$el.toggleClass(Constants.ACTIVE, show);
        },

        render: function () {
            var i = 0,
                el = this.$el,
                self = this,
                $ul = $('<ul></ul>');

            _.each(this.collection.models, function (step) {
                this.children[i] = new v.Header({model: step});
                // Note: .append(' ') is needed to make "text-align: justify" work
                // http://stackoverflow.com/questions/6865194/fluid-width-with-equally-spaced-divs?rq=1#comment-13627118
                $ul.append(self.children[i].render().$el).append(' ');
                i++;
            }, this);

            el.append($ul);

            return this;
        },

        renderSelectionForMobile: function (step) {
            if (step.get('selected')) {
                //console.log('selected ' + step.get('name'));
                this.$el.find('#bp-mobile-header').remove();
                this.$el.prepend(this.template(step.toJSON()));
            }
        },

        initialize: function () {
            this.template = _.template($('#bp-nav-current-header-template').html());
            Backbone.on(events.HideHeader, this.removeMobileMenu, this);
            Backbone.on(events.UpdateMobileHeader, this.renderSelectionForMobile, this);
            //this.collection.on('change', this.render, this);
        }
    });


    v.Header = Backbone.View.extend({

        tagName: 'li',

        events: {
            'click .disabled': 'preventClick',
            'click .enabled': 'headerClicked'
        },

        preventClick: function (e) {
            e.preventDefault();
            return false;
        },

        headerClicked: function (e) {
            e.preventDefault();
            Backbone.trigger(ND.LBP.Events.HeaderLinkClicked, this.model);
            Backbone.trigger(events.HideHeader);
        },

        render: function () {
            var selected = this.model.get('selected');
            $(this.el).toggleClass(Constants.ACTIVE, selected).html(this.template(this.model.toJSON()));
            if (selected) {
                Backbone.trigger(events.UpdateMobileHeader, this.model);
            }
            return this;
        },

        initialize: function () {
            this.template = _.template($('#bp-nav-header-list-item-template').html());
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.destroy, this);
        }
    });


    v.Sidebar = Backbone.View.extend({

        children: [],

        events: {
            'click #bp-save-btn': 'saveConfiguration',
            'click #bp-share-btn': 'shareConfiguration',
            'click #bp-pdf-btn': 'pdfBtnClicked',
            'click .bp-share-config': 'socialLinkClicked',
            'click .bp-summary-btn' : 'callToActionButtonClicked'
        },

        pdfBtnClicked: function () {
            Backbone.trigger(ND.LBP.Events.ViewPDF);
        },

        saveConfiguration: function (e) {
            e.preventDefault();
            Backbone.trigger(ND.LBP.Events.SaveConfiguration, this.$('#bp-save-form'));
        },

        callToActionButtonClicked: function(e) {

            e.stopImmediatePropagation();
        },

        shareConfiguration: function (e) {
            e.preventDefault();
            Backbone
                .off(ND.LBP.Events.ShareConfigReady)
                .on(ND.LBP.Events.ShareConfigReady, function (url) {
                    this.$('#ckepop').html(this.jiaThisTemplate({shareUrl: encodeURI(url)}));
                    var $popupWrap = this.$('.share-popup-wrap');
                    $popupWrap.addClass('active');


                    v.detectClickOutsideArea({id: '#ckepop'}, function () {
                        $popupWrap.removeClass('active');
                    }, false);

                }, this);

            Backbone.trigger(ND.LBP.Events.ShareConfiguration, this.$('#bp-share-btn').data('shareurl'));


        },

        socialLinkClicked: function () {
            Backbone.trigger(ND.LBP.Events.SocialLinkClicked);
        },

        render: function () {
            //console.log('sidebar.render()');
            var i = 0,
                el = this.$el,
                self = this;
            el.empty().append($(this.template(this.model.toJSON())));
            var $firstButton = this.$('.actions.row.first'),
                $kmiMobileBtn = this.$('#bp-mobile-nav-btns'),
                sidebarButtons = this.model.get('buttons');

            _.each(sidebarButtons.models, function (sidebarButton) {
                this.children[i] = new v.SidebarButtons({model: sidebarButton});
                self.children[i].render().$el.insertBefore($firstButton);
                i++;
            }, this);

            sidebarButtons = this.model.get('mobileButtons');

            _.each(sidebarButtons.models, function (sidebarButton) {
                this.children[i] = new v.MobileSidebarButtons({model: sidebarButton});
                $kmiMobileBtn.append(self.children[i].render().el);
                i++;
            }, this);

            $('a.anchor-btn', $kmiMobileBtn).parent().addClass('next');
	        $('a.anchor-btn', $kmiMobileBtn).on('touchstart mouseover', function (e) {
                e.stopImmediatePropagation();
                $(this).addClass('hover');
            });
            $('a.anchor-btn', $kmiMobileBtn).on('touchend mouseleave', function (e) {
                e.stopImmediatePropagation();
                $(this).removeClass('hover');
            });

            if (this.model.get('pageName') === ND.LBP.Constants.SUMMARY_PAGE_NAME) {
                this.processSummaryLinks();
            }

            return this;
        },

        processSummaryLinks: function () {
            Backbone.trigger(ND.LBP.Events.SummaryButtonsLoaded, this.$el.find('.bp-summary-btn'));
            //HACK, copy call to action buttons from side nav to summary for mobile
            var $mobilCallToActions = $('#bp-mobile-summary-call-to-actions').html(this.$el.find('.bp-summary-call-to-actions').html());
            $mobilCallToActions.find('.actions.row').removeClass('small-hide').addClass('medium-hide');
        },


        initialize: function () {
            this.template = _.template($('#bp-sidebar-template').html());
            this.jiaThisTemplate = _.template($('#bp-jiathis-template').html());
            this.model.on('destroy', this.destroy, this);
            this.model.on('change', this.render, this);
        }
    });

    v.SidebarButtons = Backbone.View.extend({

        className: 'actions row small-hide',

        events: {
            'click .arrow-btn': 'continueClicked'
        },

        continueClicked: function (e) {
            e.preventDefault();
            Backbone.trigger(ND.LBP.Events.ButtonClicked, this.model);
        },

        initialize: function () {
            this.template = _.template($('#bp-sidebar-button-template').html());
            this.model.on('destroy', this.destroy, this);
            this.model.on('change', this.render, this);
        }
    });

    v.MobileSidebarButtons = Backbone.View.extend({

        className: 'columns small-4',

        events: {
            'click .anchor-btn': 'buttonClicked'
        },

        buttonClicked: function (e) {
            e.preventDefault();
            Backbone.trigger(ND.LBP.Events.ButtonClicked, this.model);
        },

        initialize: function () {
            this.template = _.template($('#bp-mobile-sidebar-button-template').html());
            this.model.on('destroy', this.destroy, this);
            this.model.on('change', this.render, this);
        }
    });


    v.Gallery = Backbone.View.extend({
        children: [],

        events: {
            'click .next': 'nextAngle',
            'click .prev': 'prevAngle',
            'click .pager-link': 'angelLink',
            'click .switch-btn': 'switchGallery'
        },

        switchGallery: function (e) {

            Backbone.trigger(ND.LBP.Events.ToggleGalleryView, $(e.currentTarget).data('categoryid'));
        },

        nextAngle: function (e) {
            e.preventDefault();

            var currentAngle = this.$galleryWrapper.find('li.active'),
                newAngle = currentAngle.next('li');

            if (newAngle.length === 0) {
                newAngle = this.$galleryWrapper.children('li').first();
            }

            this.animateToNextImage(currentAngle, newAngle);

            this.updatePage(newAngle.attr('id'));

//            Backbone.trigger(ND.LBP.Events.OrientationChanged) ;
        },

        prevAngle: function (e) {
            e.preventDefault();

            var currentAngle = this.$galleryWrapper.find('li.active'),
                newAngle = currentAngle.prev('li');

            if (newAngle.length === 0) {
                newAngle = this.$galleryWrapper.children('li').last();
            }

            this.animateToNextImage(currentAngle, newAngle);

            this.updatePage(newAngle.attr('id'));

//            Backbone.trigger(ND.LBP.Events.OrientationChanged);
        },

        angelLink: function (e) {
            e.preventDefault();

            var element = $(e.currentTarget);

            if (!element.hasClass(Constants.ACTIVE)) {
                var view = $(e.currentTarget).data('view'),
                    currentAngle = this.$galleryWrapper.find('li.active'),
                    newAngle = this.$('#' + view);
                this.animateToNextImage(currentAngle, newAngle);
                this.updatePage(view);
            }
        },

        animateToNextImage: function ($current, $next) {
            //console.log(' has class ' + $current.attr('class'));
            $current.removeClass(Constants.ACTIVE);
            //console.log('now it has class ' + $current.attr('class'));
            $next.addClass(Constants.ACTIVE);
        },

        updatePage: function (className) {
            var $pager = this.$pager;
            $pager.find('a.active').removeClass(Constants.ACTIVE);
            $pager.find('a.pager-link.' + className).addClass(Constants.ACTIVE);
        },

        render: function () {
            //console.log('gallery.render()');
            if (!this.model) { return this; }
            var i = 0,
                el = this.$el;
            el.empty().prepend($(this.template({id: this.model.id})));
            this.$galleryWrapper = el.find('ul.car-gallery');

            this.$pager = el.find('.pager');
            //console.log('getting layers for ' + vm.pf.determineDeviceType() + ' imageGroupId: ' + this.model.id);
            var layers = this.model.get(vm.pf.determineDeviceType()),
                activeClass,
                hidePager = false;
            if (layers.length === 1) {
                el.find('.controls-direction').hide();
                this.$pager.hide();
                hidePager = true;
            }
            _.each(layers.models, function (layer) {

                activeClass = (i == 0) ? Constants.ACTIVE : '';
                if (!hidePager) {
                    this.$pager.append(this.pagerTemplate({view: layer.get('view'), className: activeClass}));
                }
                this.children[i] = new v.GalleryImage({className: activeClass, model: layer});
                this.$galleryWrapper.append(this.children[i].render().$el);
                i++;
            }, this);

            el.find('.switch-btn').toggleClass('hide', this.showSwitchBtn);


            return this;
        },

        destroy: function () {
            this.off();
            this.$el.empty();
            this.stopListening();

            Backbone.off(ND.LBP.Events.ImageGroupUpdated);
            /**
             * if view has children, close the children as well
             */
            if (this.children) {
                _.each(this.children, function (child) {
                    child.destroy();
                });
                this.children = [];
            }
        },

        initialize: function (options) {
            this.template = _.template($('#bp-gallery-template').html());
            this.pagerTemplate = _.template($('#bp-gallery-pager-template').html());
            this.showSwitchBtn = (typeof options.showSwitchBtn === 'undefined') ? true : options.showSwitchBtn;
            Backbone.on(ND.LBP.Events.ImageGroupUpdated, this.render, this);
        }
    });

    v.GalleryImage = Backbone.View.extend({
        tagName: 'li',

        initialize: function (options) {
            this.noId = options.noId || false;
            this.model.on('destroy', this.destroy, this); // destroy fn unavailable?? Ronnel
            this.model.on('change', this.render, this);
        },

        render: function () {
            //console.log('galleryImage.render()');
            var el,
                index = 0,
                layers = this.model.get('layers');

            el = this.noId ? this.$el : this.$el.attr({id: this.model.get('view')});

            _.each(layers, function (layer) {
                //console.log('displaying layer image ' + layer);
                el.append('<div class="' + (index === 0 ? 'layer-bg' : 'layer')
                    + '" style="z-index:' + index + '"><img src="' + ND.LBP.Config.baseImageURL + layer + '"> </div>');
                index++;
            });

            return this;
        }
    });


    v.KeyFeatures = Backbone.View.extend({
//        children : [],
        events: {
            'click .comparison-overlay': 'showComparisonChart'
        },

        render: function () {
            this.$el.removeClass('hide').append(this.template(this.model.toJSON()));
            return this;
        },

        showComparisonChart: function (e) {
            e.preventDefault();
            var comparisonUrl = $(e.currentTarget).data('href');
            if (typeof comparisonUrl !== 'undefined') {
                $.ajax({
                    url: comparisonUrl,
                    type: 'GET'
                }).done(function (data) {
                    ND.LBP.ComparisonOverlay(data);
                }).fail(function () {
                    Backbone.trigger(ND.LBP.Events.ErrorOccurred, new ND.LBP.CommonModels.Error());
                });
            }
        },

        initialize: function () {
            this.template = _.template($('#bp-keyFeatures-template').html());
            this.model.on('change', this.render, this);
        }
    });


//    v.Hotspots = Backbone.View.extend({
//        className: 'row hotspots-list',
//
//        initialize: function() {
//            this.template = _.template($('#bp-hotspots-template').html());
//        }
//    });

    //View Manager
    var vm = {

        _cache: [],

        _hotspots: null,
        _hasPage: false,
        _hasKeyFeatures: false,
        _hasHeader: false,
        _hasSidebar: false,
        _gallery: null,

        _init: function () {

            Backbone.on(ND.LBP.Events.BlockUI, vm._blockUI, vm.pf);
            Backbone.on(ND.LBP.Events.UnblockUI, vm._unblockUI, vm.pf);
            Backbone.on(ND.LBP.Events.TriggerConflictResolution, vm.pf.conflictAlert, vm);
            Backbone.on(ND.LBP.Events.ConfirmSeriesChange, vm.pf.confirmationAlert, vm);
            Backbone.on(ND.LBP.Events.SuccessfullySaved, vm.pf.successAlert, vm);
//            Backbone.on(ND.LBP.Events.StartOver, vm._clearCache, vm.pf);
            Backbone.on(ND.LBP.Events.ErrorOccurred, vm.pf.error, vm);
            vm._cache['body'] = $('.build-and-price');
            vm._cache['gallery'] = $('<div class="car-stage border-wrap row"></div>');
            vm._cache['summary'] = $('<div class="summary border-wrap row"></div>');
            vm._cache['loader'] = $('<div id="bp-lincoln-loader" class="loading-bkground"><span class="loading-gif"></span></div>');
            vm._cache['alertOverlay'] = $('<div id="bp-alert-overlay" class="rad-overlay-bg"></div>');
            return vm;
        },

//        _clearCache: function(){
//            vm._hotspots = null;
//            vm._hasPage = false;
//            vm._hasKeyFeatures =  false;
//            vm._hasHeader  = false;
//            vm._hasSidebar = false;
//            vm._gallery = null;
//        },

        _blockUI: function () {

            //setTimeout(function() {
            $('body').append(vm._cache['loader']);
            // }, 1000);


        },

        _unblockUI: function () {

            vm._cache['loader'].remove();
        },

        pf: {      //public functions

            page: function () {
                if (!vm._hasPage) {
                    //console.log('create page');

                    vm._cache['page'] = $('.main.columns.large-12');
                    vm._cache['keyFeatures'] = vm._cache['page'].html();
                    vm._cache['page'].empty();
                    new v.Page({ el: $('.build-and-price') });
                    vm._hasPage = true;
                }
                $("html, body").animate({ scrollTop: 0 }, "slow");
                return vm.pf;
            },

            headers: function (steps) {
                if (!vm._hasHeader) {
                    //console.log('create categories');
                    new v.Headers({el: $('.steps-nav'), collection: steps}).render();
                    vm._hasHeader = true;
                }
                return vm.pf;
            },

            nameplates: function (nameplates) {
                //console.log('create nameplates');
                new nv.Nameplates({el: vm._cache['page'], collection: nameplates}).render();
                return vm.pf;
            },

            derivatives: function (series) {
                //console.log('create derivatives');
                new dv.Derivatives({el: vm._cache['page'], model: series}).render();
                return vm.pf;
            },

            exterior: function (exterior) {
                //console.log('create exterior');
                new exv.AllAccessories({el: vm._cache['page'], model: exterior}).render();
                return vm.pf;
            },

            summary: function (summaryModel) {
                //console.log('create summary');
                vm._cache['page'].append(vm._cache['summary']);
                new sumv.Summary({el: vm._cache['page'], model: summaryModel}).render();
                return vm.pf;
            },

            keyFeatures: function (model) {
                //if (!vm._hasKeyFeatures) {
                //console.log('create keyFeatures');
                //{el : vm._cache['page'], collection: features}
                vm._cache['page'].find('.large-9').append(vm._cache['keyFeatures']);

                new v.KeyFeatures({el: '#bp-key-features', model: model}).render();
                //   vm._hasKeyFeatures  = true;
                //}
                return vm.pf;
            },

            gallery: function (gallery) {
                //console.log('create gallery');
                vm._cache['page'].prepend(vm._cache['gallery']);
                if (vm._gallery != null) {
                    vm._gallery.destroy();
                }
                vm._gallery = new v.Gallery({el: $('.car-stage.border-wrap'), model: gallery});
                vm._gallery.render();
                return vm.pf;
            },

            hotspots: function () {
                //console.log('create hotspots');

                if (vm._hotspots == null) {
                    vm._hotspots = _.template($('#bp-hotspots-template').html());
                }

                vm._cache['page'].find('.large-9').append(vm._hotspots());

                return vm.pf;
            },

            sidebar: function (sidebarModel) {
                //console.log('create sidebar');
                // if (!vm._hasSidebar) {
                //     new v.Sidebar({ el: $('.aside.columns.large-3'), model: sidebarModel }).render();
                //     vm._hasSidebar = true;
                // }

                new v.Sidebar({ el: $('.aside.columns.large-3'), model: sidebarModel }).render();
                return vm.pf;
            },

            conflictAlert: function (alertData) {
                //console.log('create alert');
                $('.build-and-price').append(vm._cache['alertOverlay']);
                new v.ConflictOverlay({el: $('#bp-alert-overlay'), model: alertData}).render();
                return vm.pf;
            },

            confirmationAlert: function (alertData) {
                //console.log('create alert');
                $('.build-and-price').append(vm._cache['alertOverlay']);
                new v.ConfirmationOverlay({el: $('#bp-alert-overlay'), model: alertData}).render();
                return vm.pf;
            },

            successAlert: function () {
                $('.build-and-price').append(vm._cache['alertOverlay']);
                new v.SuccessOverlay({el: $('#bp-alert-overlay'), model: {}}).render();
                return vm.pf;
            },

            error: function (alertData) {
                $('.build-and-price').append(vm._cache['alertOverlay']);
                new v.ErrorOverlay({el: $('#bp-alert-overlay'), model: alertData}).render();

                return vm.pf;
            },

            determineDeviceType: function () {
                //console.log('screen.width: '  + screen.width + ' window.outerWidth: ' + window.outerWidth+ ' window.innerWidth: ' + window.innerWidth);
                if (window.screen.width < ND.LBP.Constants.MOBILE_SCREEN_SIZE) {
                    return 'mobile';
                }
                return 'web';
            }
        }
    };


    var pf = vm._init().pf;
    pf.Gallery = v.Gallery;
    pf.GalleryImage = v.GalleryImage;

    return pf;

})(jQuery, ND.LBP.NameplateViews, ND.LBP.DerivativeViews, ND.LBP.ExteriorViews, ND.LBP.SummaryViews);