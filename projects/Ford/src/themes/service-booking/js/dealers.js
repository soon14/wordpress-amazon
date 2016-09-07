var SB = SB || {};

(function($) {

	SB.dealers = {

		init: function() {
			if (!$(".service-booking-overlay").length) {return;}
			this.checkPreferredDealer();
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
	  			async: true,
	  			dataType: "json", 
	  			success: function(data){
	  				if (data.length > 0 || typeof data.dealerCode !== "undefined") {
	  					onSuccess(data);
	  				} else {
	  					$(".search-error").show();
						SB.templateWrap.removeClass("loading");
	  				}
	  			},
				error: function(e, extStatus){
					onError(url, e, extStatus);
				}
	  		});	

		},

		renderDealerTemplate: function(success, data, e){

			if (success){
				$("#preferred-dealer-template").tmpl(data).appendTo(".preferred-dealer", SB.templateWrap);
				SB.templateWrap.removeClass("loading");
			} 
			else {
				$(".dealer-search").show();
				$(".search-error").show();
				SB.templateWrap.removeClass("loading");

				var searchContainer = $(".dealer-search"),
					form 			= $("form", searchContainer);

				form.submit(function(e){
					e.preventDefault();
					SB.dealers.formSubmit();
				});
			}

		},

		renderSearchListTemplate: function(success, data, e){

			if (success){
				$("#search-template").tmpl(data).appendTo("#search-items", SB.templateWrap);
				SB.templateWrap.removeClass("loading");

				if (data.length === 1) {
					$(".pagination").hide();
				} else {
					$(".pagination").show();
				}

				$.each(data, function(idx) {
					// loop through each dealer and display the "request service" button if a full Xtime participant
					if (data[idx].fullXtimeParticipant === "Y") {
						var separator = (SB.serviceURL.indexOf("?") == -1) ? "?" : "&";
						$(".search-results .request-service").eq(idx).attr("href", SB.serviceURL + separator + "dcode=" + data[idx].dealerCode + "&keyword=" + SB.keyword).attr("data-dcode", data[idx].dealerCode);
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

						}else{
							var conURL = this.consumerURL;
							if(conURL === "" || conURL === null ){
								$(".search-results .request-service").eq(idx).hide();
							} else {
								var separator = (SB.serviceURL.indexOf("?") == -1) ? "?" : "&";
								$(".search-results .request-service").eq(idx).attr("href", SB.serviceURL + separator + "dcode=" + data[idx].dealerCode + "&keyword=" + SB.keyword).attr("data-dcode", data[idx].dealerCode +  + SB.dealers.urlAtrrib);
								$(".search-results .no-service").eq(idx).hide();
							}
						}

					} else {
						$(".search-results .request-service").eq(idx).hide();
					}
				});

				$(".search-results").after("<a href='#' class='btn change-dealer results'>Change Dealer</a>");
				
				$(".listing-details .results").show();
				$("div.pagination").pagination({
					callback : function(pages, items) {
    					$(".listing-details .results").html("Results : " + items.range.start + "-" + items.range.end + " of " + items.count);
					}
				});

				$(".btn.request-service").on("click", function(e) {
					e.preventDefault();
					var serviceURL 		= $(this).attr("href"),
						dataDealerCode 	= $(this).data("dcode");

					SB.dealers.requestServiceTracking(dataDealerCode, serviceURL);
				});
			
			} 
			else {
				$(".search-error").show();
				SB.templateWrap.removeClass("loading");
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

		checkPreferredDealer: function() {

			$(".dealer-search").hide();

			if ($.cookie("dfy.dl")) {
				this.populatePrefDealer();
			} else if ($.cookie("sp.pc")) {
				setTimeout(function() {
					SB.dealers.nearestDealer();
				},100);
			} else {
				this.searchDealer();
			}

		},

		populatePrefDealer: function() {

			var dealerCode 	= $.cookie("dfy.dl"),
				dealer		= SB.restServices["dealer.code"].replace("{site}", SB.site).replace("{code}", dealerCode) + SB.dealers.authorisedFilter;

			this.fetchData(dealer, 
				function (data) {
					
					// check if dealer is an Xtime participant
					if (data.fullXtimeParticipant === "Y") {

						SB.dealers.renderDealerTemplate(true, data);
						$(".preferred-dealer .large-text").hide();
						$(".preferred-dealer .large-text.xtime").show();
						$(".alert-text").hide();
						var separator = (SB.serviceURL.indexOf("?") == -1) ? "?" : "&";
						$(".request-service").attr("href", SB.serviceURL + separator + "dcode=" + data.dealerCode + "&keyword=" + SB.keyword);

						$(".btn.request-service").on("click", function(e) {
							e.preventDefault();
							var serviceURL = $(this).attr("href");
							SB.dealers.requestServiceTracking(data.dealerCode, serviceURL);
						});

					} else if(data.fullXtimeParticipant === null){
						if(SB.dealers.isMobile){
							var mobURL = data.mobileURL;
							if(mobURL === "" || mobURL === null ){
								SB.dealers.renderDealerTemplate(true, data);
								$(".preferred-dealer .large-text").hide();
								$(".preferred-dealer .large-text.noxtime").show();
								$(".request-service").hide();
								$(".change-dealer.results").hide();
							} else {
								SB.dealers.renderDealerTemplate(true, data);
								$(".preferred-dealer .large-text").hide();
								$(".preferred-dealer .large-text.xtime").show();
								$(".alert-text").hide();
								var separator = (SB.serviceURL.indexOf("?") == -1) ? "?" : "&";
								$(".request-service").attr("href", mobURL + SB.dealers.urlAtrrib);

								$(".btn.request-service").on("click", function(e) {
									e.preventDefault();
									var serviceURL = $(this).attr("href");
									SB.dealers.requestServiceTracking(data.dealerCode, serviceURL);
								});
							}

						} else {
							 var conURL = data.consumerURL;
							  if(conURL === "" || conURL === null ){
							  	SB.dealers.renderDealerTemplate(true, data);
								$(".preferred-dealer .large-text").hide();
								$(".preferred-dealer .large-text.noxtime").show();
								$(".request-service").hide();
								$(".change-dealer.results").hide();
							  } else {
							  	SB.dealers.renderDealerTemplate(true, data);
								$(".preferred-dealer .large-text").hide();
								$(".preferred-dealer .large-text.xtime").show();
								$(".alert-text").hide();
								var separator = (SB.serviceURL.indexOf("?") == -1) ? "?" : "&";
								$(".request-service").attr("href", SB.serviceURL + separator + "dcode=" + data.dealerCode + "&keyword=" + SB.keyword + SB.dealers.urlAtrrib);

								$(".btn.request-service").on("click", function(e) {
									e.preventDefault();
									var serviceURL = $(this).attr("href");
									SB.dealers.requestServiceTracking(data.dealerCode, serviceURL);
								});
							  }
						}

					} else {
						
						SB.dealers.renderDealerTemplate(true, data);
						$(".preferred-dealer .large-text").hide();
						$(".preferred-dealer .large-text.noxtime").show();
						$(".request-service").hide();
						$(".change-dealer.results").hide();

					}
					
					$(".change-dealer").on("click", function(e) {
						e.preventDefault();
						SB.dealers.searchDealer();
					});				

				},
				function (url, e, extStatus) {
					SB.dealers.renderDealerTemplate(false, null, e);
				});

		},

		nearestDealer: function() {
			var userLocation 	 = $.cookie("sp.pc"),
				searchContainer  = $(".dealer-search"),
				form 			 = $("form", searchContainer),
				dealerByLocation = SB.restServices["dealer.byAddressUrl"].replace("{site}", SB.site).replace("{location}", userLocation) + SB.dealers.authorisedFilter;

			$(".your-location").show().find("span").html(userLocation);

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

		searchDealer: function() {

			var searchContainer = $(".dealer-search");

			$(".preferred-dealer").hide();
			$(".search-results").hide();
			searchContainer.show();

			var form = $("form", searchContainer);

			form.submit(function(e){
				e.preventDefault();
				SB.dealers.formSubmit();
			});

		},

		formSubmit: function() {
			$(".search-error").hide();
			
			var searchContainer = $(".dealer-search"),
				location 		= $("#sb-dealerlocation").val(),
				name 			= $("#sb-dealername").val();

			if (location === "" && name === ""){
				$(".search-error", searchContainer).show();
				return;
			} else {
				$(".reveal-modal .item").remove();
				SB.dealers.runSearch(location, name);
			}
		},

		runSearch: function(location, name) {

			// rest services for search
			var dealerByName		 = SB.restServices["dealer.name"].replace("{site}", SB.site).replace("{name}", name) + SB.dealers.authorisedFilter,
				dealerByLocation 	 = SB.restServices["dealer.byAddressUrl"].replace("{site}", SB.site).replace("{location}", location) + SB.dealers.authorisedFilter,
				dealerByLocationName = SB.restServices["dealer.byLocationName"].replace("{site}", SB.site).replace("{location}", location).replace("{name}", name) + SB.dealers.authorisedFilter;

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

				SB.dealers.fetchData(dealerByLocationName, 
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


			} else if (name !== "" && location === "") {
				// only name has a value
				$("reveal-modal .item").remove();

				SB.dealers.fetchData(dealerByName, 
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

			} else if (name === "" && location !== "" || name === undefined  && location !== "") {
				// only location has a value
				$("reveal-modal .item").remove();

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

				var searchContainer = $(".dealer-search"),
					form 			= $("form", searchContainer);

			}
		},

		changeDealerBtn: function(e) {
			e.preventDefault();
			SB.overlay.scrollToTop();
			$(".dealer-search").show();
			$(".search-results").hide();
			$(".change-dealer.results").remove();
		}

	};

	$(function() {

		var commonConfig = $("#common-config").embeddedData();

		SB.site 		= commonConfig.site;
		SB.restServices = $("#rest-services").embeddedData();


		if ($(".service-booking .iframe").length > 0) {

			$(".service-booking .iframe").addClass("loading");

			$(".service-booking .iframe iframe").on("load", function() {
			  	$(".service-booking .iframe").removeClass("loading");
			});

		}

	});

})(jQuery);