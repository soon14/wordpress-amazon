/**
 * @author Sohrab Zabetian
 * @description nameplate module Lincoln build and price
 * @project Lincoln Build and Price
 */
(function () {

    var Constants = {
            FRAGMENT: 'nameplates',
            HEADER_ID: 1
        },

        _cache = { askForLocation: true },

        module = {

            trackPage: function () {
                Backbone.trigger(ND.LBP.Events.TrackOmniture, {state: ND.LBP.Constants.NAMEPLATE_PAGE_NAME});
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

            loadAndDisplay: function () {

                //console.log('nameplateModule.loadAndDisplay');
                module.subscribeToEvents();
                Backbone.trigger(ND.LBP.Events.BlockUI);
                module.dataloader.getNameplates(function (nameplateCollection) {

                    ND.LBP.CommonViews
                        .page()
                        .headers(module.dataloader.updateHeaders(Constants.HEADER_ID, []))
                        .nameplates(module.filterNameplates(nameplateCollection));

                    /*Show Location Overlay*/
                    /*Comment out the code in case that the Clients need again ==!*/
                    /*Backbone.trigger(ND.LBP.Events.LoadFromCookie, function (cookie) {
                        if (_cache.askForLocation &&
                            !(typeof cookie.d !== 'undefined' &&
                            typeof cookie.l !== 'undefined' &&
                            typeof cookie.s !== 'undefined' && cookie.s === ND.LBP.Config.site)) {
                            Backbone.trigger(ND.LBP.Events.ShowLocationOverlay);
                            _cache.askForLocation = false;

                            Backbone.once(ND.LBP.Events.LocationChanged, module.trackPage, module);
                            Backbone.once(ND.LBP.Events.LocationCanceled, module.trackPage, module)

                        } else {
                            module.trackPage();
                        }
                    });*/
                    
                    module.trackPage(); 
					module.setupConfirmationBeforeLeave();
                    
                    Backbone.trigger(ND.LBP.Events.UnblockUI);

                    $('.nameplate-title').empty();

                });
            },

            filterNameplates: function (nameplateCollection) {
                var modelsNotShowHackConfig = ND.LBP.Config.modelsNotShow;

                if (modelsNotShowHackConfig && modelsNotShowHackConfig.length) {
                    var modelsToShow = [];
                    _.each(nameplateCollection.models, function (model) {
                        if (modelsNotShowHackConfig.indexOf(model.id) == -1) {
                            modelsToShow.push(model);
                        }
                    });

                    // if (notShowModels.length) {
                    //      // Backbone Collection.remove() not working in IE8 :(
                    //     nameplateCollection.remove(notShowModels);
                    // }

                    nameplateCollection.reset(modelsToShow);
                }

                return nameplateCollection;
            },

            saveAndContinue: function (model) {

                module.dataloader.getNameplates(function (nameplateCollection) {
                    nameplateCollection.select(model);
                    var replaceUrl = model.get('isModelNavigator');
                    Backbone.trigger(ND.LBP.Events.ChangePage, model.get('getModelPageUrl')(), replaceUrl);
                });
            },

            headerLinkClicked: function (model) {
                //console.log('nameplate.headerLinkClicked()');
                var pathUrl = model.get('pathURL');
                if (Constants.HEADER_ID < model.id) {
                    //console.log('nameplate.headerLinkClicked() changing path');
                    Backbone.trigger(ND.LBP.Events.ChangePage, pathUrl);
                }
            },

            buildPageUrl: function () {
                return '#' + Constants.FRAGMENT;
            },

            subscribeToEvents: function () {
                //register events and handlers
                Backbone.on(ND.LBP.Events.NameplateSelected, module.saveAndContinue, module);

            },

            unsubscribeFromEvents: function () {
                Backbone.off(ND.LBP.Events.NameplateSelected, module.saveAndContinue);
            },

            clearCache: function () {
                _cache = { askForLocation: true };
            },

            _init: function () {
                Backbone.on(ND.LBP.Events.StartOver, module.clearCache, module);
                Backbone.on(Constants.HEADER_ID + ND.LBP.Events.HeaderLinkClicked, module.headerLinkClicked, module);
                Backbone.on(ND.LBP.Events.UnsubscribeFromEvents, module.unsubscribeFromEvents, module);

                module.dataloader = ND.LBP.Builder;
                var routes = [
                    {
                        fragment: Constants.FRAGMENT,
                        name: ND.LBP.Constants.NAMEPLATE_PAGE_NAME,
                        buildPageUrl: module.buildPageUrl,
                        action: module.loadAndDisplay
                    }
                ];

                Backbone.on(ND.LBP.Events.RegisterModule, function (registerCallback) {
                    //console.log('nameplateModule.on ' + ND.LBP.Events.RegisterModule + ' event');
                    registerCallback.call(registerCallback, routes);
                });
            }
        };

    module._init();

//    Backbone.on(ND.LBP.Events.InitModules, $.proxy(nameplateModule._init, nameplateModule));

})();