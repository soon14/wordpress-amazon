/*
Author: Ruiwen Qin
File name: serviceBookingDealers.js
Description: 

Dependencies: jQuery, underscore.js
*/

(function($){
    serviceBookingDealers = {
        init: function(elem){
            if (!$(".service-booking-overlay").length) {return;}
            
            this.commonConfig = $("#common-config").embeddedData(),
            this.restServices = $("#rest-services").embeddedData();
            this.keyword      = elem.data("sb-keyword");
            this.serviceURL   = elem.data("sb-url");
            this.templateWrap = $(".service-booking-overlay .content-col");
            this.templateheader = $(".service-booking-overlay .content-col h1");
            this.site         = this.commonConfig.site;
            this.checkPreferredDealer();
            this.isMobile = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) );
            // will get the config from x-time-filter.html (if the publisher will publish a filtering function)
            this.menuURL = $("#xtimeURL").embeddedData();
            this.authorisedFilter = this.menuURL.authorisedFilter;
            this.urlAtrrib = "&provider=FORDAUPORTAL&keywordParam=null";
        },

        checkPreferredDealer: function(){
            $(".dealer-search").show();

            if ($.cookie("dfy.dl")) {
                serviceBookingDealers.populatePrefDealer();
            } else if ($.cookie("sp.pc")) {
                setTimeout(function() {
                    serviceBookingDealers.nearestDealer();
                },100);
            } else {
                serviceBookingDealers.searchDealer();
            }
        },
        
        populatePrefDealer: function() {

            var dataDealerCode  =   $.cookie("dfy.dl"),
                dealer          =   this.restServices["dealer.code"].replace("{site}",this.site).replace("{code}",dataDealerCode) + serviceBookingDealers.authorisedFilter;
            serviceBookingDealers.fetchData(dealer, 
                function (data) {
                    $(".dealer-search").hide();
                    
                    // check if dealer is an Xtime participant
                    if (data.fullXtimeParticipant === "Y" ) {

                        serviceBookingDealers.renderDealerTemplate(true, data);
                        $(".preferred-dealer .noxtime").hide();
                        $(".preferred-dealer .xtime").show();
                        $(".alert-text").hide();
                        var separator = (serviceBookingDealers.serviceURL.indexOf("?") == -1) ? "?" : "&";
                        $(".request-service").attr("href", serviceBookingDealers.serviceURL + separator + "dcode=" + data.dealerCode + "&keyword=" + this.keyword);

                        $(".button.request-service").on("click", function(e) {
                            e.preventDefault();
                            var serviceURL = $(this).attr("href");
                            serviceBookingDealers.requestServiceTracking(data.dealerCode, serviceURL);
                        });

                    } else if(data.fullXtimeParticipant === null){
                        

                        if(serviceBookingDealers.isMobile){
                            var mobURL = data.mobileURL;
                            if(mobURL === "" || mobURL === null ){
                                serviceBookingDealers.renderDealerTemplate(true, data);
                                $(".preferred-dealer .xtime").hide();
                                $(".preferred-dealer .noxtime").show();
                                $(".request-service").hide();
                                $(".change-dealer.results").hide();
                            } else {
                                serviceBookingDealers.renderDealerTemplate(true, data);
                                $(".preferred-dealer .noxtime").hide();
                                $(".preferred-dealer .xtime").show();
                                $(".alert-text").hide();
                                $(".search-results .request-service").eq(idx).attr("href", mobURL + serviceBookingDealers.urlAtrrib);
                                $(".search-results .no-service").eq(idx).hide();
                            }
                        } else {
                            var conURL = data.consumerURL;
                            if(conURL === "" || conURL === null ){
                                serviceBookingDealers.renderDealerTemplate(true, data);
                                $(".preferred-dealer .xtime").hide();
                                $(".preferred-dealer .noxtime").show();
                                $(".request-service").hide();
                                $(".change-dealer.results").hide();
                            } else {
                                 var separator = (serviceBookingDealers.serviceURL.indexOf("?") == -1) ? "?" : "&";
                                serviceBookingDealers.renderDealerTemplate(true, data);
                                $(".preferred-dealer .noxtime").hide();
                                $(".preferred-dealer .xtime").show();
                                $(".alert-text").hide();
                                $(".request-service").attr("href", serviceBookingDealers.serviceURL + separator + "dcode=" + data.dealerCode + "&keyword=" + this.keyword + serviceBookingDealers.urlAtrrib);

                                $(".search-results .no-service").eq(idx).hide();
                            }
                        }

                        $(".button.request-service").on("click", function(e) {
                            e.preventDefault();
                            var serviceURL = $(this).attr("href");
                            serviceBookingDealers.requestServiceTracking(data.dealerCode, serviceURL);
                        });

                    } else {
                        
                        serviceBookingDealers.renderDealerTemplate(true, data);
                        $(".preferred-dealer .xtime").hide();
                        $(".preferred-dealer .noxtime").show();
                        $(".request-service").hide();
                        $(".change-dealer.results").hide();

                    }
                    
                    $(".change-dealer").on("click", function(e) {
                        e.preventDefault();
                        serviceBookingDealers.searchDealer();
                    });             

                },
                function (url, e, extStatus) {
                    serviceBookingDealers.renderDealerTemplate(false, null, e);
                });


        },
        renderDealerTemplate: function(success, data, e){

            if (success){
                $("#preferred-dealer-template").tmpl(data).appendTo(".preferred-dealer", this.templateWrap);
                serviceBookingDealers.templateheader.removeClass("loading");
            } 
            else {
                $(".dealer-search").show();
                $(".search-error").show();
                serviceBookingDealers.templateheader.removeClass("loading");

                var searchContainer = $(".dealer-search"),
                    form            = $("form", searchContainer);

                form.submit(function(e){
                    e.preventDefault();
                    serviceBookingDealers.formSubmit();
                });
            }

        },
        requestServiceTracking: function(dcode, serviceURL) {
            var params = {type: "o"};
            params.link = params.title = _da.pname + ":request service";
            params.onclicks = "service:book online";
            params.pname = _da.pname;
            s.prop1 = s.eVar1 = dcode;
            $.publish('/analytics/link/', params);
                        
            window.location.href = serviceURL;
        },
        templateError: function(e) {

            var errorData = {"error" : "An error has occurred: " + e.statusText};
            $("#dealer-template-error").tmpl(errorData).appendTo(SB.templateWrap);

        },

        templateErrorSearch: function(e) {

            var errorData = {"error" : "An error has occurred: " + e.statusText};
            $("#search-template-error").tmpl(errorData).appendTo(SB.templateWrap);

        },

        nearestDealer: function() {
            var userLocation     = $.cookie("sp.pc"),
                searchContainer  = $(".dealer-search"),
                form             = $("form", searchContainer),
                dealerByLocation = this.restServices["dealer.byAddressUrl"].replace("{site}", this.site).replace("{location}", userLocation) + serviceBookingDealers.authorisedFilter;

            $(".your-location").show().find("span").html(userLocation);

            serviceBookingDealers.fetchData(dealerByLocation,
                function (data) {
                    $(".dealer-search").hide();
                    $(".search-results").show();

                    serviceBookingDealers.renderSearchListTemplate(true, data);

                    $(".change-dealer").on("click", function(e) {
                        serviceBookingDealers.changeDealerBtn(e);
                    });                 
                },
                function (url, e, extStatus) {
                    serviceBookingDealers.renderSearchListTemplate(false, null, e);
                });     

            form.submit(function(e){

                e.preventDefault();
                serviceBookingDealers.formSubmit();
                
            });
        },
        searchDealer: function() {
            var searchContainer = $(".dealer-search");

            $(".preferred-dealer").hide();
            $(".search-results").hide();
            searchContainer.show();

            var form = $("form", searchContainer);

            form.submit(function(e){
                e.preventDefault();
                serviceBookingDealers.formSubmit();
            });
        },
        formSubmit: function() {
            $(".search-error").hide();
            
            var searchContainer = $(".dealer-search"),
                location        = $("#sb-dealerlocation").val(),
                name            = $("#sb-dealername").val();

            if (location === "" && name === ""){
                $(".search-error", searchContainer).show();
                return;
            } else {
                $(".reveal-modal .item").remove();
                serviceBookingDealers.runSearch(location, name);
            }
        },
        runSearch: function(location, name){
            // rest services for search
            var dealerByName         = this.restServices["dealer.name"].replace("{site}", this.site).replace("{name}", name) + serviceBookingDealers.authorisedFilter,
                dealerByLocation     = this.restServices["dealer.byAddressUrl"].replace("{site}", this.site).replace("{location}", location) + serviceBookingDealers.authorisedFilter ,
                dealerByLocationName = this.restServices["dealer.byLocationName"].replace("{site}", this.site).replace("{location}", location).replace("{name}", name) + serviceBookingDealers.authorisedFilter;

            $(".dealer-name").hide();
            $(".your-location").hide();

            if (name) {
                $(".dealer-name").show().find("span").html(name);
            }
            if (location) {
                $(".your-location").show().find("span").html(location);
            }

            if (name !== "" && location !== "" && name !== undefined) {
                // both name and location has a value
                $("reveal-modal .item").remove();

                serviceBookingDealers.fetchData(dealerByLocationName, 
                    function (data) {
                        $(".dealer-search").hide();
                        $(".search-results").show();

                        serviceBookingDealers.renderSearchListTemplate(true, data);

                        $(".change-dealer").on("click", function(e) {
                            serviceBookingDealers.changeDealerBtn(e);
                        });
                    },
                    function (url, e, extStatus) {
                        serviceBookingDealers.renderSearchListTemplate(false, null, e);
                    });
            }
            else if (name !== "" && location === "") {
                // only name has a value
                $("reveal-modal .item").remove();

                serviceBookingDealers.fetchData(dealerByName, 
                    function (data) {
                        $(".dealer-search").hide();
                        $(".search-results").show();

                        serviceBookingDealers.renderSearchListTemplate(true, data);

                        $(".change-dealer").on("click", function(e) {
                            serviceBookingDealers.changeDealerBtn(e);
                        });
                    },
                    function (url, e, extStatus) {
                        serviceBookingDealers.renderSearchListTemplate(false, null, e);
                    });
            }
            else if (name === "" && location !== "" || name === undefined  && location !== "") {
                // only location has a value
                $("reveal-modal .item").remove();

                serviceBookingDealers.fetchData(dealerByLocation,
                    function (data) {
                        $(".dealer-search").hide();
                        $(".search-results").show();

                        serviceBookingDealers.renderSearchListTemplate(true, data);

                        $(".change-dealer").on("click", function(e) {
                            serviceBookingDealers.changeDealerBtn(e);
                        }); 
                    },
                    function (url, e, extStatus) {
                        serviceBookingDealers.renderSearchListTemplate(false, null, e);
                    });

                var searchContainer = $(".dealer-search"),
                    form            = $("form", searchContainer);


            }

        },
        fetchData: function(url, onSuccess, onError){
            if (serviceBookingDealers.templateheader) {
                serviceBookingDealers.templateheader.addClass("loading");
            }

            $.ajax({
                url: url,
                async: true,
                dataType: "json", 
                success: function(data){
                    if (data.length > 0 || typeof data.dealerCode !== "undefined") {
                        onSuccess(data);
                    } else {
                        $(".search-error").show();
                        serviceBookingDealers.templateheader.removeClass("loading");
                    }
                },
                error: function(e, extStatus){
                    onError(url, e, extStatus);
                }
            });
        },
        renderSearchListTemplate: function(success, data, e){
            if (success){
                $("#search-template").tmpl(data).appendTo("#search-items", this.templateWrap);
                serviceBookingDealers.templateheader.removeClass("loading");

                if (data.length === 1) {
                    $(".pagination").hide();
                } else {
                    $(".pagination").show();
                }

                var separator = (serviceBookingDealers.serviceURL.indexOf("?") == -1) ? "?" : "&";

                $.each(data, function(idx) {

                    // loop through each dealer and display the "request service" button if a full Xtime participant
                    if (data[idx].fullXtimeParticipant === "Y") {
                        $(".search-results .request-service").eq(idx).attr("href", serviceBookingDealers.serviceURL + separator + "dcode=" + data[idx].dealerCode + "&keyword=" + this.keyword).attr("data-dcode", data[idx].dealerCode);

                        $(".search-results .no-service").eq(idx).hide();

                    } else if(data[idx].fullXtimeParticipant === null){
                        if(serviceBookingDealers.isMobile){
                            var mobURL = this.mobileURL;
                            if(mobURL === "" || mobURL === null ){
                                $(".search-results .request-service").eq(idx).hide();
                            } else {
                                $(".search-results .request-service").eq(idx).attr("href", mobURL + serviceBookingDealers.urlAtrrib);
                                $(".search-results .no-service").eq(idx).hide();
                            }
                        } else {
                            var conURL = this.consumerURL;
                            if(conURL === "" || conURL === null ){
                                $(".search-results .request-service").eq(idx).hide();
                            } else {
                                $(".search-results .request-service").eq(idx).attr("href", serviceBookingDealers.serviceURL + separator + "dcode=" + data[idx].dealerCode + "&keyword=" + this.keyword).attr("data-dcode", data[idx].dealerCode + serviceBookingDealers.urlAtrrib);

                                $(".search-results .no-service").eq(idx).hide();
                            }
                        }
                    } else {
                        $(".search-results .request-service").eq(idx).hide();
                    }
                });

                $(".search-results").after("<a href='#' class='button change-dealer results'>Change Dealer</a>");
                
                $(".listing-details .results").show();
                $("div.pagination").pagination({
                    callback : function(pages, items) {
                        $(".listing-details .results").html("Results : " + items.range.start + "-" + items.range.end + " of " + items.count);
                    }
                });

                $(".button.request-service").on("click", function(e) {
                    e.preventDefault();
                    var serviceURL      = $(this).attr("href"),
                        dataDealerCode  = $(this).data("dcode");

                    serviceBookingDealers.requestServiceTracking(dataDealerCode, serviceURL);
                });
            
            } 
            else {
                $(".search-error").show();
                serviceBookingDealers.templateheader.removeClass("loading");
            }
        },
        changeDealerBtn: function(e) {
            e.preventDefault();
           
            $(".dealer-search").show();
            $(".search-results").hide();
            $(".change-dealer.results").remove();
        }

        
        
    };

    $(function(){
        //topic broadcast from revealModal.js when overlay is open successfully
        $.subscribe('foundation-reveal-modal-open', function(e,elem){
            serviceBookingDealers.init(elem);
        });
    });

})(jQuery);