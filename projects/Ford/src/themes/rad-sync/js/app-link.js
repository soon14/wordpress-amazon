/**
 Author: Doris
 Description:
 1. Fetch json data and render category list
 2. Bind overlay to element with class "fullscreen-overlay", update content in complete callback
 3. Tab pre-select. Detect device system (Android/iOS), using ND.detectDevice
 */

(function ($) {

    var appLink = {
        init: function () {
            if ($(".applink .accordion-panel .dropdown-content").length <= 0) { return; }
            appLink.appendApps();
            appLink.tabActivation();
        },

        appendApps: function () {

            var appLinkContent = $('.applink .accordion-panel .tab-content');

            // get category list for app
            appLink.fetchCategoryListByTab($('.appLink-accordion-panel.apple', appLinkContent), 'iOS');
            appLink.fetchCategoryListByTab($('.appLink-accordion-panel.android', appLinkContent), 'Android');

            appLink.preOpenOverlaybyURL();

        },

        preOpenOverlaybyURL: function () {
            var location = window.location.toString();
            var url = '';
            if (window.location.toString().indexOf('fullscreen-overlay') > -1) {
                url = location.substring(location.indexOf('fullscreen-overlay') + 'fullscreen-overlay'.length + 1);
            }
            else if (window.location.toString().indexOf('overlay') > -1) {
                url = location.substring(location.indexOf('overlay') + 'overlay'.length + 1);
            }
            if (url.length > 0) {
                if (Modernizr.history) {
                    history.pushState(null, "fullscreen-overlay", location.substring(0, location.indexOf('#')));
                    //history.replaceState(null, "fullscreen-overlay", "");
                    //history.back();
                    //history.replaceState(null, "fullscreen-overlay", location + "#fullscreen-overlay=" + param);
                }
                url = decodeURIComponent(decodeURIComponent(url));
                var appid = '', platform = '';
                $.each(url.split('&'), function (i, item) {
                    if (item.split('=')[0].toLowerCase() == 'appid') {
                        appid = item.split('=')[1];
                    }
                    else if (item.split('=')[0].toLowerCase() == 'platform') {
                        platform = item.split('=')[1];
                    }
                });
                if (appid.length > 0 && platform.length > 0) {
                    var clickELE = $("<a href='#' id='" + appid + "' class='fullscreen-overlay'></a>");
                    clickELE.id = appid;
                    clickELE.addClass('fullscreen-overlay');
                    clickELE.fullScreenOverlay({
                        useCustomizeContent: true,
                        customizedContent: "<span class='loading'></span>",
                        close: Translator.translate('AssetMg/Apa/Owner/Sync/Overlay/Close'),
                        backtotop: Translator.translate('AssetMg/BackToTop'),
                        complete: function () { appLink.updateAppDetailOverlay(clickELE, platform); }
                    });
                    clickELE[0].click();
                }
            }
        },

        fetchCategoryListByTab: function ($tab, platform) {
            var catListTemplate = $('#cat-list-template').html();
            var catListItemTemplate = $('#cat-list-item-template').html();
            $.template('catlist-template', catListTemplate);
            $.template('catlistitem-template', catListItemTemplate);
            $.template('noresult-msg-template', $('#app-list-noresult-message-template').html());

            //var appIcons = $("#applink-icon").embeddedData();

            var urlCategoryList = appLink.generateRequestURL('category/list', platform);
            //get category list
            $.ajax({
                type: 'GET',
                url: urlCategoryList,
                dataType: 'json',
                success: function (data) {
                    $tab.empty();
                    if (data.list.length == 0) {
                        $.tmpl('noresult-msg-template').appendTo($tab);
                        return;
                    }
                    var list = $('<ul></ul>');
                    $.each(data.list, function (i, item) {

                        var itembar = $('<li></li>');
                       
                        var iconURL = item.icon[0].imageLocation;
                        //if (appIcons[item.idCat]) {
                        //    iconURL = appIcons[item.idCat];
                        //}
                        //else if (appIcons['default']) {
                        //    iconURL = appIcons['default'];
                        //}
                        $.tmpl('catlist-template', { icon: iconURL, title: item.name, id: item.idCat }).appendTo(itembar);
                        list.append(itembar);

                        //dropdown event
                        $('.dropdown', itembar).hide();
                        $('li:eq(0)', list).addClass('active');
                        $('li:eq(0) .dropdown', list).show();
                        $('.tab-area', itembar).click(function () {
                            var $this = $(this);
                            if (!$this.parent("li").hasClass("active")) {
                                $this.next("div.dropdown").slideDown(200);
                                $this.parent("li").addClass("active");
                            } else {
                                $this.next("div.dropdown").slideUp(200);
                                $this.parent("li").removeClass("active");
                            }
                        });
                        
                        $('.tab-area', itembar).on('mouseover', function () {
                            $(this).addClass('hover');
                        });
                        $('.tab-area', itembar).on('mouseleave', function () {
                            $(this).removeClass('hover');
                        });
                    });

                    //get category detail
                    $('.dropdown', list).each(function (i, cat) {
                        var urlCategoryDetail = appLink.generateRequestURL('category/detail', platform, { catId: cat.id, maxResults: 20 });
                        $.ajax({
                            type: 'GET',
                            url: urlCategoryDetail,
                            dataType: 'json',
                            success: function (catdata) {
                                if (catdata.subCategories.length == 0) {
                                    var apps = [];
                                    $.each(catdata.applications, function (i, app) {
                                        $.each(app.appList, function (i, a) {
                                            apps.push(a);
                                        });
                                    });
                                    var appCount = apps.length;

                                    if (appCount > 0) {
                                        $(cat).empty();
                                        $(cat).append('<ul></ul>');
                                        var dropdown = $('ul', $(cat));
                                        $.each(apps, function (i, app) {
                                            var appItem = $('<li></li>');
                                            $.tmpl('catlistitem-template', { id: app.idApp, image: app.icon[0].imageLocation, name: app.name }).appendTo(appItem);
                                            dropdown.append(appItem);
                                        });

                                        $('span.count', $(cat).parent()).html('(' + appCount + ')');

                                        //overlay
                                        var markupData = null;
                                        $(".fullscreen-overlay", cat).each(function (i, app) {
                                            $(app).fullScreenOverlay({
                                                useCustomizeContent: true,
                                                customizedContent: "<span class='loading'></span>",
                                                close: Translator.translate('AssetMg/Apa/Owner/Sync/Overlay/Close'),
                                                backtotop: Translator.translate('AssetMg/BackToTop'),
                                                complete: function () { appLink.updateAppDetailOverlay(app, platform); }
                                            });
                                        });
                                    }
                                    else {
                                        //$.tmpl('noresult-msg-template').appendTo($(cat));
                                        $(cat).closest('li').hide();
                                    }
                                }
                                else {
                                    $(cat).closest('li').hide();
                                    $.each(catdata.subCategories, function (i, sub) {
                                        var urlSubCategoryDetail = appLink.generateRequestURL('category/detail', platform, { catId: sub.idCat, maxResults: 20 });
                                        $.ajax({
                                            type: 'GET',
                                            url: urlSubCategoryDetail,
                                            dataType: 'json',
                                            success: function (subdata) {
                                                var apps = [];
                                                $.each(subdata.applications, function (i, app) {
                                                    $.each(app.appList, function (i, a) {
                                                        apps.push(a);
                                                    });
                                                });
                                                if (apps.length > 0) {
                                                    if ($('ul', $(cat)).length == 0) {
                                                        $(cat).empty();
                                                        $(cat).append('<ul></ul>');
                                                    }
                                                    var dropdown = $('ul', $(cat));
                                                    $.each(apps, function (i, app) {
                                                        var appItem = $('<li></li>');
                                                        $.tmpl('catlistitem-template', { id: app.idApp, image: app.icon[0].imageLocation, name: app.name }).appendTo(appItem);
                                                        dropdown.append(appItem);
                                                        $('.fullscreen-overlay', appItem).fullScreenOverlay({
                                                            useCustomizeContent: true,
                                                            customizedContent: "<span class='loading'></span>",
                                                            close: Translator.translate('AssetMg/Apa/Owner/Sync/Overlay/Close'),
                                                            backtotop: Translator.translate('AssetMg/BackToTop'),
                                                            complete: function () { appLink.updateAppDetailOverlay($('.fullscreen-overlay', appItem)[0], platform); }
                                                        });
                                                    });
                                                    var appCount = $('ul li', $(cat)).length;
                                                    $('span.count', $(cat).parent()).html('(' + appCount + ')');
                                                    if (appCount > 0) {
                                                        $(cat).closest('li').show();
                                                    }
                                                }
                                            },
                                            error: function () {
                                                
                                            }
                                        });
                                    });
                                }
                            },
                            error: function () {
                                $.template('error-msg-template', $('#app-list-error-message-template').html());
                                $(cat).empty();
                                $.tmpl('error-msg-template').appendTo($(cat));
                            }
                        });
                    });

                    $tab.append(list);
                },
                error: function () {
                    $.template('error-msg-template', $('#app-list-error-message-template').html());
                    $tab.empty();
                    $.tmpl('error-msg-template').appendTo($tab);
                }
            });

        },

        updateAppDetailOverlay: function (item, platform) {
            $.template('app-detail-overlay-template', $('#app-detail-overlay-template').html());
            var container = $('.overlay-wrap > .overlay-content > .content');
            var appid = item.id;
            var urlApplicationDetail = appLink.generateRequestURL('application/detail', platform, { appId: appid });
            var appconfig = $("#applink-config").embeddedData();
            var markupData = {};
            $.ajax({
                type: 'GET',
                url: urlApplicationDetail,
                dataType: 'json',
                success: function (data) {
                    markupData.icon = data.iconLoResUrl;
                    markupData.appname = data.name;
                    markupData.version = data.versionName;
                    markupData.description = data.description80;
                    markupData.voice = new Array();
                    //markupData.voice = data.voiceCommand;
                    //$.each(markupData.voice, function (i, item) {
                    //    item.index = i + 1;
                    //});
                    $.each(data.voiceCommand, function (i, item) {
                        var isExist = false;
                        markupData.voice = $.map(markupData.voice, function (n,i) {
                            if (n.description === item.description) {
                                isExist = true;
                                if (item.type.toLowerCase() === 'manual') {
                                    n.manualCommand = item.title;
                                }
                                else if (item.type.toLowerCase() === 'voice') {
                                    n.voiceCommand = item.title;
                                }
                            }
                            return n;
                        });
                        if (!isExist) {
                            var com = {};
                            com.index = markupData.voice.length + 1;
                            com.description = item.description;
                            if (item.type.toLowerCase() === 'manual') {
                                com.voiceCommand = '/';
                                com.manualCommand = item.title;
                                markupData.voice.push(com);
                            }
                            else if (item.type.toLowerCase() === 'voice') {
                                com.voiceCommand = item.title;
                                com.manualCommand = '/';
                                markupData.voice.push(com);
                            }
                            
                        }
                    });

                    markupData.market = data.market;
                    if (appconfig[appid]) {
                        markupData.appspecific = appconfig[appid];
                    }
                    container.html($.tmpl('app-detail-overlay-template', markupData));

                    if (platform.toLowerCase() != 'ios') {
                        $('.applink-overlay .ios-only').hide();
                    }
                    else {
                        $('.applink-overlay .android-only').hide();
                    }

                    if (Modernizr.touch) {
                        var overlayContent = $('.overlay-wrap > .overlay-content');
                        var topControlHeight = $(".top-close", overlayContent).outerHeight();
                        var bodyHeight = $(".content", overlayContent).outerHeight();
                        var bottomControlHeight = $(".controls", overlayContent).outerHeight();
                        overlayContent.css("height", topControlHeight + bodyHeight + bottomControlHeight + 80 + 'px');
                    }

                    var location = window.location.toString().substring(0, window.location.toString().indexOf('#'));
                    var param = encodeURIComponent("appid=" + appid + "&platform=" + platform);
                    if (Modernizr.history) {
                        //history.pushState(null, "fullscreen-overlay", location);
                        //history.replaceState(null, "fullscreen-overlay", "");
                        //history.back();
                        history.replaceState(null, "fullscreen-overlay", location + "#fullscreen-overlay=" + param);
                    }
                    else {
                        var state = {};
                        state["fullscreen-overlay"] = param;
                        $.bbq.pushState(state);
                    }
                    
                },
                error: function () {
                    container.empty();
                    $.template('error-msg-template', $('#app-list-error-message-template').html());
                    $.tmpl('error-msg-template').appendTo(container);
                }
            });
        },

        // actionName: home | category/list | categroy/detail | application/detail
        // platform: Android | iOS
        // params: {catId, maxResults, appId, uid, timestamp}
        generateRequestURL:function(actionName,platform, params){
            var urlRequest = instance.serviceLocator('applink.request');
            var applinksArg = actionName + '?platform=' + platform;
            //country & locale
            var appconfig = $("#applink-config").embeddedData();
            applinksArg += "&country=" + appconfig['country-code'] + "&locale=" + appconfig['locale-code'];
            //transactionid
            applinksArg += "&transactionid=" + Math.floor(Math.random() * 10000000);            
            //other params
            if (params) {
                if (params.catId) {
                    applinksArg += "&idCat=" + params.catId;
                }
                if (params.maxResults) {
                    applinksArg += "&maxResults=" + params.maxResults;
                }
                if (params.appId) {
                    applinksArg += "&idApp=" + params.appId;
                }
            }
            //uid & timestamp
            //applinksArg += "&uid=abdshweodjskhfcneuwifw&timestamp=123912740932874";

            //just for test
            urlRequest = urlRequest.replace('{testpath}', actionName);
            //console.log("http://10.3.104.29/servlet/rest/tools/appcatalog?category={applinksarg}".replace('{applinksarg}', encodeURIComponent(applinksArg.toLowerCase())));

            return urlRequest.replace('{applinksarg}', encodeURIComponent(applinksArg.toLowerCase()));
        },

        //activate current tab, show/hide related tab content
        tabActivation: function () {
            var _tab = $(".applink .accordion-panel .tab-con");
            var _content = $(".applink .accordion-panel .tab-content");
            _tab.on("click", function () {
                var _currentTab = $(this);
                if (!_currentTab.hasClass("current")) {
                    _tab.removeClass("current");//remove "current" state from tab field
                    _content.children(".appLink-accordion-panel").removeClass("current");//remove "current" state to hide all the content
                    _currentTab.addClass("current");//add "current" to clicked tab field
                    _content.children(".appLink-accordion-panel:eq(" + _currentTab.index() + ")").addClass("current");//add "current" state to show related content
                }
            });
            appLink.tabPreSelect();
        },

        tabPreSelect: function () {
            if (ND.detectDevice.isIOS()) {
                $(".applink .accordion-panel .tab-nav .tab-con").removeClass('current');
                $(".applink .accordion-panel .tab-nav .tab-con.apple").addClass('current');
                $(".applink .accordion-panel .tab-content .appLink-accordion-panel").removeClass('current');
                $(".applink .accordion-panel .tab-content .appLink-accordion-panel.apple").addClass('current');
            }
            else if (ND.detectDevice.isAndroid()) {
                $(".applink .accordion-panel .tab-nav .tab-con").removeClass('current');
                $(".applink .accordion-panel .tab-nav .tab-con.android").addClass('current');
                $(".applink .accordion-panel .tab-content .appLink-accordion-panel").removeClass('current');
                $(".applink .accordion-panel .tab-content .appLink-accordion-panel.android").addClass('current');
            }
            else {
                $(".applink .accordion-panel .tab-nav .tab-con").removeClass('current');
                $(".applink .accordion-panel .tab-nav .tab-con:eq(0)").addClass('current');
                $(".applink .accordion-panel .tab-content .appLink-accordion-panel").removeClass('current');
                $(".applink .accordion-panel .tab-content .appLink-accordion-panel:eq(0)").addClass('current');
            }
        }

    };

    $(function () {
        appLink.init();
	})
}(jQuery));
