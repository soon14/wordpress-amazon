var SB = SB || {};

(function($) {

	SB.init = false;
	SB.pagename = _da.pname;

	SB.dealers = {

		init: function() {
			// hide search section
			$(".service-booking .ui-header .black").parent().hide();
			$(".dealer-search").hide();

			SB.dealers.getCurrentLocation();

			if ($.cookie("sp.pc")) {
				SB.dealers.nearestDealer();
			} else {
				this.searchDealer();
			}
			this.menuURL = $("#xtimeURL").embeddedData();
			this.authorisedFilter = this.menuURL.authorisedFilter || "";
			// this.authorisedFilter = "?authorisedFilter=HasServiceDepartmentPV";
			this.isMobile = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) );
			this.urlAtrrib = "&provider=FORDAUPORTAL&keywordParam=null";
		},

		fetchData: function(url, onSuccess, onError){
			
			if (SB.templateWrap) {
				SB.templateWrap.addClass("loading");
			}

			$.ajax({
	  			url: url,
	  			beforeSend: function() {
	  				$.mobile.loading("show");
	  			},
	  			async: true,
	  			dataType: "json", 
	  			success: function(data){
	  				$.mobile.loading("hide");
	  				onSuccess(data);
	  			},
				error: function(e, extStatus){
					$.mobile.loading("hide");
					onError(url, e, extStatus);
				}
	  		});

		},

		getParameterByName: function(name) {
		    var match = RegExp("[?&]" + name + "=([^&]*)").exec(window.location.search);
		    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
		},

		renderSearchListTemplate: function(success, data, e){

			if (success){
				$("#search-template").tmpl(data).appendTo("#search-items", SB.templateWrap);
				SB.templateWrap.removeClass("loading");

				SB.dlength = data.length;

				$(".request-service").buttonMarkup("refresh");

				// more results button
				var maxItems = 3;
				SB.dealers.resultDetails(data.length, maxItems);

				$.each(data, function(idx) {
					SB.serviceURL = data[idx].mobileURL;
					var dealerByCode = SB.restServices["dealer.code"].replace("{site}", SB.site).replace("{code}", data[idx].dealerCode) + SB.dealers.authorisedFilter;

					// loop through each dealer and display the "request service" button if a full Xtime participant
					if (data[idx].fullXtimeParticipant === "Y") {
						$(".search-results .request-service").eq(idx).attr("href", SB.serviceURL + SB.dealers.getParameterByName("keyword")).attr("data-dcode", data[idx].dealerCode);
						$(".search-results .no-service").eq(idx).hide();
					} else if (data[idx].fullXtimeParticipant === null){
						
						if(SB.dealers.isMobile){
							var mobURL = this.mobileURL;
							if(mobURL === "" || mobURL === null ){
								$(".search-results .request-service").eq(idx).hide();
							} else {
								$(".search-results .request-service").eq(idx).attr("href", mobURL + SB.dealers.urlAtrrib);
								$(".search-results .no-service").eq(idx).hide();
							}
						} else {
							var conURL = this.consumerURL;
							if(conURL === "" || conURL === null ){
								$(".search-results .request-service").eq(idx).hide();
							} else {
								$(".search-results .request-service").eq(idx).attr("href", SB.serviceURL + SB.dealers.getParameterByName("keyword")).attr("data-dcode", data[idx].dealerCode +  SB.dealers.urlAtrrib);
								$(".search-results .no-service").eq(idx).hide();
							}
						}

					} else {
						$(".search-results .request-service").eq(idx).hide();
					}

					$(".item").eq(idx).attr("id", data[idx].dealerCode);

					SB.dealers.fetchData(dealerByCode,
						function (data) {

							$("#" + data.dealerCode).find(".dealer-address").attr({
									"data-lng": data.latitudeLongitude.longitude,
									"data-lat": data.latitudeLongitude.latitude
								});

							SB.dcount = SB.dcount + 1;
							
							if (SB.dcount >= SB.dlength) {
								// do this once all the dealer ajax requests are complete
								$(document).trigger("pagechange", function() {
							    	nativeMapURLGenerator();
							    });
							} 
						},
						function (url, e, extStatus) {
							// no long/lat returned for each dealer
						});

				});

				$(".change-dealer.results").show();
				$(".listing-details .results").show();

				$(".btn.request-service").on("click", function(e) {
					e.preventDefault();
					var serviceURL 		= $(this).attr("href"),
						dataDealerCode 	= $(this).data("dcode");

					SB.dealers.requestServiceTracking(dataDealerCode, serviceURL);
				});
			} 
			else {
				$(".error").show();
				SB.templateWrap.removeClass("loading");
			}

		},

		requestServiceTracking: function(dcode, serviceURL) {
			var params = {type: "e"};
            params.link = params.title = SB.pagename + ":results:request service";
            params.onclicks = "service:book online";
            params.pname = SB.pagename + ":results";
            s.prop1 = s.eVar1 = dcode;

            ND.omniture.trackLink(params);

			setTimeout(function() {
				window.location.href = serviceURL;
			},100);
            
		},

		searchResultsTracking: function() {
			var params = {type: "o"};
			_da.pname = SB.pagename + ":results";
            params.link = params.title = SB.pagename + ":results";
            params.onclicks = SB.pagename;
            params.pname = SB.pagename + ":results";
            var events = 'event1';
            params.events = _da.events = events.split(',');
		},

		searchDealerTracking: function() {
            var params = {type: "o"};
            _da.pname = SB.pagename;
            params.link = params.title = SB.pagename;
            params.onclicks = SB.pagename;
            params.pname = SB.pagename;
            params.events = _da.events = "event1";
		},

		searchDealerBtnTracking: function() {
            var params = {type: "o"};
            _da.pname = SB.pagename;
            params.link = params.title = SB.pagename;
            params.onclicks = SB.pagename;
            params.pname = SB.pagename;

            ND.omniture.trackLink(params);
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

			var userLocation 	 = $.cookie("sp.pc"),
				searchContainer  = $(".dealer-search"),
				form 			 = $("form", searchContainer),
				dealerByLocation = SB.restServices["dealer.byAddressUrl"].replace("{site}", SB.site).replace("{location}", userLocation) + SB.dealers.authorisedFilter;

			$(".item").remove();

			$(".details-user-location").show().find("span").html(userLocation);

			SB.dealers.searchResultsTracking();		

			SB.dealers.fetchData(dealerByLocation,
				function (data) {
					$(".dealer-search").hide();
					$(".search-results").show();

					SB.dealers.renderSearchListTemplate(true, data);

					$(".change-dealer").on("click", function(e) {
						SB.dealers.changeDealerBtn(e);
					});
				},
				function (url, e, extStatus) {
					SB.dealers.renderSearchListTemplate(false, null, e);
				});

			form.submit(function(e){

				e.preventDefault();
				SB.dealers.formSubmit();
				
			});

		},

		geoDealers: function(postcode) {
			
			var searchContainer  = $(".dealer-search"),
				form 			 = $("form", searchContainer),
				dealerByLocation = SB.restServices["dealer.byAddressUrl"].replace("{site}", SB.site).replace("{location}", postcode) + SB.dealers.authorisedFilter;

			$(".item").remove();

			$(".details-user-location").show().find("span").html(postcode);

			SB.dealers.fetchData(dealerByLocation,
				function (data) {
					$(".dealer-search").hide();
					$(".search-results").show();
					$(".details-state").add(".details-city").hide();

					SB.dealers.renderSearchListTemplate(true, data);

					$(".change-dealer").on("click", function(e) {
						SB.dealers.changeDealerBtn(e);
					});
				},
				function (url, e, extStatus) {
					$(".location-error").show();
				});

		},

		searchDealer: function() {

			var searchContainer = $(".dealer-search");

			$(".search-results").hide();
			searchContainer.show();
			$(".service-booking .ui-header .black").parent().show();

			SB.dealers.searchDealerTracking();

			var form = $("form", searchContainer);
			
			form.submit(function(e){
				e.preventDefault();
				SB.dealers.formSubmit();
			});

		},

		getCurrentLocation: function() {
			$(".sb-currentLocation-btn").on("click", function(e) {
				
				e.preventDefault();
				locationTimeout = setTimeout(function() {
					geoLocator.locationNotFound(1);
				}, 15000);

				$.mobile.loading("show");
				
				var geoLocator = ND.geoLocator({
					success: function(postcode) {
						clearTimeout(locationTimeout);
						$("#sb-currentLocation").val(postcode);
						$.mobile.loading("hide");
						SB.dealers.geoDealers(postcode);
					},
					error: function(message) {
						clearTimeout(locationTimeout);
						$(".location-error").show();
						$.mobile.loading("hide");
					},
					maximumAge: 10000,
					timeout: 10000
				});
				geoLocator.findLocation();
			});
		},

		formSubmit: function() {
			$(".error").hide();
			
			var searchContainer = $(".dealer-search"),
				state 			= $("#select-state").val(),
				city 			= $("#select-city").val();

			if (state === "" && city === ""){
				$(".error", searchContainer).show();
				return;
			} else {
				$(".item").remove();
				SB.dealers.runSearch(state, city);
			}
		},

		runSearch: function(state, city) {

			// rest services for search
			var byRegionCityUrl = SB.restServices["dealer.byRegionCityUrl"].replace("{site}", SB.site).replace("{region}", state).replace("{city}", city) + SB.dealers.authorisedFilter;

			$(".details-user-location").hide();
			$(".details-state").show().find("span").html(state);
			$(".details-city").show().find("span").html(city);

			SB.dealers.searchResultsTracking();

			$(".item").remove();

			SB.dealers.fetchData(byRegionCityUrl, 
				function (data) {
					$(".dealer-search").hide();
					$(".search-results").show();

					SB.dealers.renderSearchListTemplate(true, data);

					$(".change-dealer").on("click", function(e) {
						SB.dealers.changeDealerBtn(e);
					});
				},
				function (url, e, extStatus) {
					SB.dealers.renderSearchListTemplate(false, null, e);
				});
		},

		changeDealerBtn: function(e) {
			e.preventDefault();
			
			$(".dealer-search").show().find("select").val("").selectmenu("refresh");
			$("select#select-city").html('<option value="">Select</option>');
			$(".search-results").hide();
			$(".location-error").add(".error").hide();
			$(".change-dealer.results").hide();
			$(".item").remove();
			SB.dealers.scrollToTop();

			SB.dealers.searchDealerBtnTracking();
		},

		scrollToTop: function() {
			$("html, body").animate({
				 scrollTop:$(".dealer-search").offset().top - 20
			},400);
		},

		resultDetails: function(itemCount, maxItems) {
			if (itemCount > maxItems) {
				$(".more-results").css("display","block");

				$("#search-items > div.item").hide().slice(0,maxItems).css("display", "block");
				$(".search-results").on("click", ".more-results", function(e) {
					e.preventDefault();
					SB.dealers.moreButton(maxItems);
					$("#search-items > div.item").css("border-bottom", "1px solid #ddd");
					$("#search-items > div.item:visible:last").css("border-bottom", 0);
					$("#search-items > div.item:last-child").css("border-bottom", "1px solid #ddd");
				});

				$("#search-items > div.item:visible:last").css("border-bottom", 0);

			} else {
				$(".more-results").css("display","none");
			}
			setTimeout(function(){
				var visibleDealerItems = $("#search-items > div.item:visible").length;
				$(".listing-details .details-results span.items-range").html("1-" + visibleDealerItems).next().html(" of " + itemCount);
			},200);
		},

		moreButton: function(maxItems) {
			$("#search-items > div.item:hidden").slice(0,maxItems).fadeIn(350);

			var visibleItems = $("#search-items > div.item:visible").length;
			$(".listing-details .details-results span.items-range").html("1-" + visibleItems);

		    if (!($("#search-items > div.item:hidden").length >= 1)) {
		    	// remove "load more results..." button
		        $(".search-results .more-results").remove();
		    }
		}

	};

    //$(document).on("pageinit", function() {...});    //not work if user visit this page directly

	$(function () {
	    
		var commonConfig = $("#common-config").embeddedData();

		SB.site 		= commonConfig.site;
		SB.restServices = $("#rest-services").embeddedData();
		SB.templateWrap = $(".ui-content");		

	    if ($(".service-booking").length > 0 && SB.init === false) {
	    	SB.init = true;
	        SB.dcount = 0; 
	        SB.dealers.init();
	    }

	    $(".service-booking-btn").on("click", function() {

			var thisHref 	= $(this).attr("href"),
				separator 	= (thisHref.indexOf("?") == -1) ? "?" : "&";
				SB.keyword 	= $(this).data("sb-keyword");

			// if keyword does not exist as a parameter then attach it to the URL
			if (thisHref.indexOf("keyword") == -1) {
				$(this).attr("href", thisHref + separator + "keyword=" + SB.keyword);
			}			
			
		});

	});

	$(document).on("pageinit", function () {
		
		var commonConfig = $("#common-config").embeddedData();

		SB.site 		= commonConfig.site;
		SB.restServices = $("#rest-services").embeddedData();
		SB.templateWrap = $(".ui-content");		

	    if ($(".service-booking").length > 0) {
	    	SB.init = true;
	        SB.dcount = 0; 
	        SB.dealers.init();
	    }

	});

})(jQuery);