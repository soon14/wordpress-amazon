(function(window, document, $, undefined){

//    var registeredRoutes = {};

    var Constants =  {
       COOKIE_NAME : 'lbnpfe'  //Lincoln build and price front end
    };

    var _cache = {};

    var LincolnBuildAndPriceApp = Backbone.Router.extend({

        routeDetails : {},

		routes: {
		   //define static routes here
		    '' : 'start',
			'error' : 'navToErrorPage',
		    'reset"': 'navToResetPage' //used to reset the tool
		},

		registerDynamicRoutes: function() {
			//define dynamic routes
			//this.route(":modelId/" + Constants.path.pth,"navToPathsPage");
		},

		initialize: function(options) {
			this.registerDynamicRoutes();
			this.registerEventListeners();

            this.setupPriceFormatter();

            this.setupOnError();
            this.setupConfirmationBeforeLeave();
            this.registerModules();
		},

        setupPriceFormatter: function() {
            var formatterConfig = ND.LBP.Config.priceFormatterConfig;
            ND.PriceFormatter.initialise({
                data: formatterConfig.priceFormat,
                formatString:  formatterConfig.currencySymbol,
                centsSeparator: formatterConfig.monetaryDecimalSeparator,
                thousandsSeparator: formatterConfig.groupingSeparator
            });
        },

		setupOnError: function() {
			window.onerror = function () {
                Backbone.trigger(ND.LBP.Events.UnblockUI);
                Backbone.trigger(ND.LBP.Events.ErrorOccurred, new ND.LBP.CommonModels.Error());
                //wait a bit before registering the listener
                //so we don't kill the overlay too quickly.
                setTimeout(function() {
                    $(window).on('hashchange', function() {
                        Backbone.trigger(ND.LBP.Events.CloseOverlay);
                        $(window).off('hashchange');
                    });
                }, 500);


			};
		},

        setupConfirmationBeforeLeave: function() {
		leaveoutOverlay = function(url) {
			var destinationURL=url;
				$('#bp-leaveout-overlay').remove();
				$('.build-and-price').append($('<div id="bp-leaveout-overlay" class="rad-overlay-bg"></div>'));
				$('#bp-leaveout-overlay').hide();
				$('#bp-leaveout-overlay').html($('#bp-leaveout-overlay-template').html());				
                setTimeout(function(){
							$('#bp-leaveout-overlay .bp-yes').on("click", function(){
							$.cookie('bnp.anchor','N',{ path: '/', expires: 1 });
							$.cookie('dfy.pg.bkbtn',$('#badge a').attr('href'),{ path: '/', expires: 1 });
							if($(this).data("link")) {
									location.href=$(this).data("params")?$(this).data("link")+'?'+$(this).data("params"):$(this).data("link");
									}
							else {
									location.reload();
									}
								}
							);
							$('#bp-leaveout-overlay .bp-no').on("click", function(){
							$.cookie('bnp.anchor','N',{ path: '/', expires: 1 });
									if(destinationURL) {
										if(destinationURL==location.href) {
											location.reload();
										}
										else {									
											location.href=destinationURL;
											}
									} 
									else {
										$('#submit').trigger('click');
									}
								}
							);
							$('#bp-leaveout-overlay').show();
					},1000);
				};	
		$.cookie('bnp.anchor','Y',{ path: '/', expires: 1 });
		$('a').on('click',function(e){
			if($(this).attr('href')&&$(this).attr('href').toLowerCase().indexOf('http')==0&&(!$(this).attr('target')||$(this).attr('target').toLowerCase()!=='_blank')) {
				e.preventDefault();
				e.stopPropagation();
				leaveoutOverlay($(this).attr('href'),null);
				}
			});
		document['search-pannel'].onsubmit = function(e) {
			if($.cookie('bnp.anchor')=='Y') {
			if(e&&e.preventDefault) {
				e.preventDefault();
				e.stopPropagation();
				}
			else {
			event.returnValue = false;
			}
			leaveoutOverlay();
			};
		};
		window.onbeforeunload=function() {		
			window.onunload = function() {
			if($.cookie('bnp.anchor')=='Y') {
				$.cookie('bnp.anchor','N',{ path: '/', expires: 1 });
				location.href=location.href;
				leaveoutOverlay(location.href);
				}
			};
		}

        },

		registerEventListeners : function() {
            var events = ND.LBP.Events;
            //Backbone.on(ND.LBP.Events.SaveInCookie, this.saveInCookie, this);
            Backbone.on(events.HeaderLinkClicked, this.headerLinkClicked , this);
            Backbone.on(events.LoadFromCookie, this.loadFromCookie, this);
            Backbone.on(events.ChangePage, this.changePage, this);
            Backbone.on(events.GetPage, this.getPageUrl, this);
            Backbone.on(events.SaveProgress, this.saveProgress, this);
            Backbone.on(events.LocationChanged, this.updateLocation, this);
            Backbone.on(events.StartOver, this.startOver, this);
            Backbone.on(events.AppStateIsNull, this.appStateIsNull, this);
            Backbone.on(events.TryAgain, this.tryAgain, this);
            Backbone.on(events.RejectConflictResolution, this.rollbackChanges, this);

            //this.on('route', this.routeChanged, this);
		},

//        routeChanged: function(route, params) {
//            console.log('unregister all events in modules');
//            //Backbone.trigger(ND.LBP.Events.UnsubscribeFromEvents);
//        },

        getCookie: function() {
            var bnpCookie = $.cookie(Constants.COOKIE_NAME);
           return ((typeof bnpCookie === 'undefined') || (bnpCookie == null)) ? {}  : JSON.parse(bnpCookie);
        },

        changePage: function(url, replaceUrl) {
            //TODO: before page change we need to trigger an event
            //nextpage.trigger('before'); //register any events you need.

            if (!!replaceUrl) {
                window.location.assign(url);
            } else {
                Backbone.trigger(ND.LBP.Events.UnsubscribeFromEvents);
                var orgurl=url,
                        nexturl='',
                        i=0;
                    $.each(orgurl,function(index,c){
                        if (c==='#') {
                            i++;
                            if(i>1) {
                                nexturl=nexturl+encodeURIComponent("#");
                                }
                            else {
                                nexturl=nexturl+c;
                            }
                        }
                        else {
                            nexturl=nexturl+c;
                        }
                    }); 
                this.navigate(nexturl, {trigger: true});
            }

            //prevPage.trriger('after') //clean up...unregister anything you've got
        },

        headerLinkClicked : function(model) {
            var currentHeader = ND.LBP.Builder.getCurrentHeader();
            Backbone.trigger(currentHeader.id + ND.LBP.Events.HeaderLinkClicked, model);
           // this.changePage(model.get('pathURL'));
        },

        /**
         * arguments should be
         * 1) next route name
         * 2) all parameters (nameplate, derivative, etc)
         * 3) callback
         */
        getPageUrl: function() {
            //call callback function with result of buildPageUrl, passing all arguments
            var args = arguments.length > 2 ? [].slice.call(arguments, 1, arguments.length - 1) : [];
            arguments[arguments.length - 1].call(null, this.routeDetails[arguments[0]].buildPageUrl.apply(null, args));
        },

        saveProgress: function(dataToSave, callback) {

            if (dataToSave.selections.length > 0) {
                var self = this;
                ND.LBP.Builder.getNameplateDetails(dataToSave.nameplateId, null, true, function(nameplateDetail) {

                    _cache = dataToSave;

                    var state = (typeof dataToSave.state === 'undefined' ? nameplateDetail.get('state') : dataToSave.state);
                    var userActivity = new ND.LBP.CommonModels.UserActivity({state: state});
                    userActivity.url = userActivity.buildSaveURL(dataToSave.nameplateId);

                    var uSelections = new ND.LBP.CommonCollections.UserSelections();

                    _.each(dataToSave.selections, function(selection) {
                        uSelections.add(new ND.LBP.CommonModels.UserSelection(selection));
                    });

                    userActivity.set('selections', uSelections);
                    self.save(userActivity, nameplateDetail, callback);
                });
            }
        },

        rollbackChanges: function(changes) {
            var self = this;
            Backbone.trigger(ND.LBP.Events.BlockUI);
            var nameplateId = changes.get('nameplateId');
            if (typeof nameplateId !== 'undefined' && nameplateId != null) {
                ND.LBP.Builder.getNameplateDetails(nameplateId, null, true, function(nameplateDetail) {
                    var changes = nameplateDetail.get('changes'),
                        userActivity;
                    if (typeof changes !== 'undefined' && changes != null) {
                        userActivity = new ND.LBP.CommonModels.UserActivity({state: changes.get('rollbackState')});
                        userActivity.url = userActivity.buildSaveURL(nameplateId);
                        self.save(userActivity, nameplateDetail, function() {
                            if (_cache.changePath) {
                                self.changePage(_cache.currentPathUrl);
                            }
                            Backbone.trigger(ND.LBP.Events.UnblockUI);
                        });
                    }
                });
            }
        },

        save: function(userActivity, nameplateDetail, callback) {
            userActivity.save(null, {
                wait: true,
                success: function(model, response, options) {
                    nameplateDetail.trigger(ND.LBP.Events.ObjectUpdated, model, response, options, callback);
                },
                error: function() {
                    Backbone.trigger(ND.LBP.Events.UnblockUI);
                    Backbone.trigger(ND.LBP.Events.ErrorOccurred, new ND.LBP.CommonModels.Error());
                }
            });
        },

        updateLocation: function(locValue, locText) {
            this.saveInCookie({
                l: locValue,  //location
                d: locText                //display name
            });
            Backbone.trigger(ND.LBP.Events.LocationUpdated, locValue);
        },

        loadFromCookie: function(callback) {
            callback(this.getCookie());
        },

        saveInCookie : function(object) {
            var bnpCookie = this.getCookie();
            $.cookie(Constants.COOKIE_NAME, JSON.stringify($.extend(bnpCookie, object, { "s": ND.LBP.Config.site })), { path: '/', expires: 30 });
        },

		registerModules : function() {
			//fire module registration

           // console.log('Trigger module registration ');
            var self = this;
			Backbone.trigger(ND.LBP.Events.RegisterModule, function(moduleRoutes) {
               // console.log('Lincoln App registering module '  + moduleRoutes);
                //registeredRoutes = $.extend(registeredRoutes, moduleRoute);

                _.each(moduleRoutes, function(moduleRoute) {
                    self.routeDetails[moduleRoute.name] = {
                        buildPageUrl: moduleRoute.buildPageUrl,
                        fragment :  moduleRoute.fragment
                    };
                    self.route(moduleRoute.fragment, moduleRoute.name, moduleRoute.action);
                });

               // console.dir(moduleRoutes);
            });
		},

		/**
		 * Hard reset on all feeds.
		 */
        startOver : function(reset) {
            //clear cache
            if (typeof reset === 'undefined' || reset === true) {
                ND.LBP.Builder.reset();
            }
            //start over
			this.navigate('', {trigger: true, replace: true});
		},
        /**
         *   if app state is null, we need to go back to nameplate page
         */
        appStateIsNull: function() {
            this.startOver(false);
        },

        tryAgain: function() {
            Backbone.trigger(ND.LBP.Events.UnblockUI);
        },

        start: function() {
            //console.log('Lincoln App start');
            //var self = this;
//            this.loadProgressFromCookie(function(cookieValue) {
                var url =  this.routeDetails['nameplates'].buildPageUrl();
////                if (cookieValue != null) {
////                    url = cookieValue.buildPageUrl;
////                }
//
                this.changePage(url);
//            });
        }
	});


    $(document).ready(function () {

		setTimeout(function() {
			var $configData = $('#build-and-price-config');

	        //console.log('Lincoln Build and price config was found');
            //
	        ND.LBP.Config = JSON.parse($configData.html());

	        ND.LBP.Config.getPageConfig = function(id) {
	            return _.findWhere(ND.LBP.Config.defaultHeaderConfiguration, {'id': id});
	        };

	        new LincolnBuildAndPriceApp();
	        Backbone.history.start();

		}, 100);

	});

})(window, document, jQuery);