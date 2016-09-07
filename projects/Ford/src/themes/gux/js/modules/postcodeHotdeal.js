/*
Discription: For latest offer click event, to open the postcode overlay
             Combitation of '/ftd/web-hotdeals.js' and '/ftdsmob/mobile-hotdeals.js'
*/

ND.platformDependentHotDeal = {

    regionObtainer: {
        /**
		 * Display region link on the page. 
		 * @param model
		 */
        view: function (model) {
            if ($.mobile) {
                var existing = this._panel.find('.hotdeals-postcode');
                // Create the HTML to be injected
                render = $.tmpl(this.tmpl, model);
                //			console.log('postcodeTemplate.view');


                //Either replace or inject
                if (existing.length > 0) {
                    existing.replaceWith(render);
                    //				console.log('postcodeTemplate.view - > replacing with old');
                } else {
                    //				console.log('postcodeTemplate.view - > appending to page');
                    this._panel.append(render);
                }

                //used for mobile only, has no effect on web
                this._panel.trigger('create');
            }
            else {
                var existing = this._panel.find('.hotdeals-postcode'),
                    // Create the HTML to be injected
                    render = $.tmpl(this.tmpl, model);
                //Either replace or inject
                if (existing.length) {
                    existing.replaceWith(render);
                } else {
                    this._panel.append(render);
                }
            }
        },

        bindAdditionalListeners: function () {
            if ($.mobile) {
                var self = this;

                var locationTimeout;
                var doesCurrentLocationButtonExist = $('input.hotDeals-form-currentLocation').length > 0;
                if (doesCurrentLocationButtonExist) {
                    $(document).on('click', 'input.hotDeals-form-currentLocation', function (e) {

                        e.preventDefault();
                        self.loadingStatus(true);

                        locationTimeout = setTimeout(function () {
                            self.loadingStatus(false);
                            geoLocator.locationNotFound(1);
                        }, 20000);

                        var geoLocator = ND.geoLocator({
                            success: function (postcode) {
                                clearTimeout(locationTimeout);
                                //						console.log('success: clearTimeout');
                                self.loadingStatus(false);
                                //						console.log('Found postcode ' + postcode);
                                var form = $(self.formSelector);
                                form.find('#postcode').val(postcode);
                                form.submit();
                            },
                            error: function (message) {

                                //						console.log('error: clearTimeout');
                                self.loadingStatus(false);
                                self.formError(message);
                            },
                            maximumAge: 15000,
                            timeout: 15000
                        });
                        geoLocator.findLocation();
                    });
                }

                $(document).on('submit', '#hotDeals-form', function () {
                    if (doesCurrentLocationButtonExist) {
                        clearTimeout(locationTimeout);
                    }
                    return false;
                });

                //clean up the overlay for next round
                $.subscribe('overlay.usercancel', function () {
                    var form = $(self.formSelector);
                    form.find('#postcode').val('');
                    self._errorMsg.slideUp('fast');
                });

                $(document).on('click', '.cancel', function (e) {
                    e.preventDefault();
                    $('.close-button a').click();
                });

                $(window).unbind('scroll');
            }
        },

        loadingStatus: function (working) {
            if ($.mobile) {
                $.mobile.loading(working ? 'show' : 'hide');
                if($('#overlay .fbform .group > span.ui-icon').length==0){
                    $('#overlay .fbform .group > input[type=button],#overlay .fbform .group > input[type=submit]').parent().append("<span class='ui-icon ui-icon-arrow-r ui-icon-shadow'></span>");
                }
            }
            else {
                var self = this;

                // Clear delay
                self._loaderTimeout && clearTimeout(self._loaderTimeout);

                // Delay the error
                self._loaderTimeout = setTimeout(function () {
                    if (!self._form) { return; }
                    self.loader || (self.loader = $('<span class="loader"/>').appendTo(self._form.find('.final')));
                    self._form.toggleClass("loading", working);
                    self._loaderTimeout = null;
                }, 100);
            }
        }
    },

    hotDeal: {
        needPostcodeTemplate: function (selector) {
            if ($.mobile) {
                var hd = $.mobile.activePage.find(selector);
                return hd.length > 0 ? hd : null;
            }
            else {
                var hd = $(selector);
                return hd.length ? hd : null;
            }
        }
    }
};