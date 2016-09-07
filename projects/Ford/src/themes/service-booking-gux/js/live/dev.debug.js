
var SB = SB || {};

(function($) {

	SB.overlay = {

		init: function() {

			// Reveal overlay/modal click events
			$(".service-booking-overlay").not("#content-modal").on("click", function(e) {
				e.preventDefault();
				SB.overlay.scrollToTop();
				
				var modalContent = $(this).attr("href");

				// Attach the keyword and Xtime URL to the SB object associated with this link
				SB.keyword 		= $(this).data("sb-keyword");
				SB.serviceURL 	= $(this).data("sb-url");

				$.ajax({
					url: modalContent,
					success: function(data) {
						SB.overlay.modalSuccess(data);
					},
					error: function() {
						SB.overlay.modalError();
					}
				});
			});

			SB.overlay.modalClose();

		},

		modalSuccess: function(data) {

			$("#content-modal .content").html(data);
			SB.templateWrap = $(".content-col");
			SB.dealers.init();
			$("#content-modal").foundation("reveal", "open", {
				animationSpeed: 100,
				animation: "fade"
			});

		},

		modalError: function() {

			$("#content-modal .content").html('<div class="row"><div class="columns"><div class="content-col"><h3>An Error Occurred</h3><p>There seems to be a problem.</p></div></div></div>');
			$("#content-modal").foundation("reveal", "open", {
				animationSpeed: 100,
				animation: "fade"
			});

		},

		modalClose: function() {

			$("#content-modal .close-reveal-modal").on("click", function(e) {
				e.preventDefault();
				$(".reveal-modal").foundation("reveal", "close");

				setTimeout(function() {
					$("#content-modal .content").html("");
				}, 500);

				// ensure focus onto document body after overlay is closed - IE has focus issues
				$("body").focus();
			});

		},

		scrollToTop: function() {
			$("html, body").animate({
				 scrollTop:0
			},400);
		}

	};

	$(function() {
		SB.overlay.init();
	});

})(jQuery);


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


(function($, window, document, undefined) {

  	var name = "pagination",
      	instance = null,
      	defaults = {
	        containerID: "search-items",
	        previous : "Prev",
	        next: "Next",
	        startPage: 1,
	        perPage: 3,
	        midRange: 5,
	        startRange: 1,
	        endRange: 1,
	        delay: 50,
	        direction: "forward",
	        animation: "",
	        fallback: 0,
	        callback: undefined //function( pages, items ) { }
      	};


  	function pag(element, options) {
	    this.options = $.extend({}, defaults, options);

	    this._container = $("#" + this.options.containerID);
	    if (!this._container.length) return;

	    this.jQwindow = $(window);
	    this.jQdocument = $(document);

	    this._holder = $(element);
	    this._nav = {};

	    this._first = {};
	    this._previous = $(this.options.previous);
	    this._next = $(this.options.next);
	    this._last = {};

	    /* only visible items! */
	    this._items = this._container.children(":visible");
	    this._itemsShowing = $([]);
	    this._itemsHiding = $([]);

	    this._numPages = Math.ceil(this._items.length / this.options.perPage);
	    this._currentPageNum = this.options.startPage;

	    this._clicked = false;
	    this._cssAnimSupport = this.getCSSAnimationSupport();

	    this.init();
  	}

  	pag.prototype = {

	    constructor : pag,

	    getCSSAnimationSupport: function() {
	      	var animation = false,
		        animationstring = 'animation',
		        keyframeprefix = '',
		        domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
		        pfx = '',
		        elm = this._container.get(0);

	      	if (elm.style.animationName) animation = true;

	      	if (animation === false) {
		        for (var i = 0; i < domPrefixes.length; i++) {
		          	if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
			            pfx = domPrefixes[i];
			            animationstring = pfx + 'Animation';
			            keyframeprefix = '-' + pfx.toLowerCase() + '-';
			            animation = true;
			            break;
		          	}
		        }
	      	}

	      	return animation;
	    },

	    init: function() {
	      	this.setStyles();
	      	this.setNav();
	      	this.paginate(this._currentPageNum);
	    },

	    setStyles: function() {
	      	var requiredStyles = "<style>" +
	      	".pag-invisible { visibility: hidden !important; } " +
	      	".pag-hidden { display: none !important; }" +
	      	"</style>";

	      $(requiredStyles).appendTo("head");

	      	if (this._cssAnimSupport && this.options.animation.length)
	        	this._items.addClass("animated pag-hidden");
	      	else this._items.hide();

	    },

	    setNav: function() {
	      	var navhtml = this.writeNav();

	      	this._holder.each(this.bind(function(index, element) {
	        	var holder = $(element);
	        	holder.html(navhtml);
	        	this.cacheNavElements(holder, index);
	        	this.bindNavHandlers(index);
	        	this.disableNavSelection(element);
	      	}, this));
	    },

	    writeNav: function() {
	      	var i = 1, navhtml;
	      	navhtml = this.writeBtn("first") + this.writeBtn("previous");

	      	for (; i <= this._numPages; i++) {
	        	if (i === 1 && this.options.startRange === 0) navhtml += "<span>...</span>";
	        	if (i > this.options.startRange && i <= this._numPages - this.options.endRange)
	          		navhtml += "<a href='#' class='pag-hidden'>";
	        	else
	          		navhtml += "<a>";
	            	navhtml += i;
	            	
	        navhtml += "</a>";
	        if (i === this.options.startRange || i === this._numPages - this.options.endRange)
	          	navhtml += "<span>...</span>";
	      	}
	      	navhtml += this.writeBtn("next") + this.writeBtn("last") + "</div>";
	      	return navhtml;
	    },

	    writeBtn: function(which) {

	      	return this.options[which] !== false && !$(this["_" + which]).length ?
	      	"<a class='pag-" + which + "'>" + this.options[which] + "</a>" : "";

	    },

	    cacheNavElements: function(holder, index) {
	      	this._nav[index] = {};
	      	this._nav[index].holder = holder;
	      	this._nav[index].first = this._first.length ? this._first : this._nav[index].holder.find("a.pag-first");
	      	this._nav[index].previous = this._previous.length ? this._previous : this._nav[index].holder.find("a.pag-previous");
	      	this._nav[index].next = this._next.length ? this._next : this._nav[index].holder.find("a.pag-next");
	      	this._nav[index].last = this._last.length ? this._last : this._nav[index].holder.find("a.pag-last");
	      	this._nav[index].fstBreak = this._nav[index].holder.find("span:first");
	      	this._nav[index].lstBreak = this._nav[index].holder.find("span:last");
	      	this._nav[index].pages = this._nav[index].holder.find("a").not(".pag-first, .pag-previous, .pag-next, .pag-last");
	      	this._nav[index].permPages = this._nav[index].pages.slice(0, this.options.startRange).add(this._nav[index].pages.slice(this._numPages - this.options.endRange, this._numPages));
	      	this._nav[index].pagesShowing = $([]);
	      	this._nav[index].currentPage = $([]);
	    },

	    bindNavHandlers: function(index) {
	      	var nav = this._nav[index];

	      	// default nav
	      	nav.holder.bind("click.pagination", this.bind(function(evt) {
		        var newPage = this.getNewPage(nav, $(evt.target));
		        if (this.validNewPage(newPage)) {
		          	this._clicked = true;
		          	this.paginate(newPage);
		        }
	        	evt.preventDefault();
	      	}, this));

	      	// custom previous
	      	if (this._previous.length) {
	        	this._previous.bind("click.pagination", this.bind(function() {
		          	var newPage = this._currentPageNum - 1;
		          	if (this.validNewPage(newPage)) {
		            	this._clicked = true;
		            	this.paginate(newPage);
		          	}
	        	}, this));
	      	}

	      	// custom next
	      	if (this._next.length) {
	        	this._next.bind("click.pagination", this.bind(function() {
		          	var newPage = this._currentPageNum + 1;
		          	if (this.validNewPage(newPage)) {
		            	this._clicked = true;
		            	this.paginate(newPage);
		          	}
	        	}, this));
	      	}

	    },

	    disableNavSelection: function(element) {
	      	if (typeof element.onselectstart != "undefined")
	        	element.onselectstart = function() {
	          	return false;
	        };
	      	else if (typeof element.style.MozUserSelect != "undefined")
	        	element.style.MozUserSelect = "none";
	      	else
	        	element.onmousedown = function() {
	          	return false;
	        };
	    },

	    getNewPage: function(nav, target) {
	      	if (target.is(nav.currentPage)) return this._currentPageNum;
	      	if (target.is(nav.pages)) return nav.pages.index(target) + 1;
	      	if (target.is(nav.first)) return 1;
	      	if (target.is(nav.last)) return this._numPages;
	      	if (target.is(nav.previous)) return nav.pages.index(nav.currentPage);
	      	if (target.is(nav.next)) return nav.pages.index(nav.currentPage) + 2;
	    },

	    validNewPage: function(newPage) {
	      	return newPage !== this._currentPageNum && newPage > 0 && newPage <= this._numPages;
	    },

	    paginate: function(page) {
	      	var itemRange, pageInterval;
	      	itemRange = this.updateItems(page);
	      	pageInterval = this.updatePages(page);
	      	this._currentPageNum = page;
	      	if ($.isFunction(this.options.callback))
	        	this.callback(page, itemRange, pageInterval);
	    },

	    updateItems: function(page) {
	      	var range = this.getItemRange(page);
	      	this._itemsHiding = this._itemsShowing;
	      	this._itemsShowing = this._items.slice(range.start, range.end);
	      	if (this._cssAnimSupport && this.options.animation.length) this.cssAnimations(page);
	      		else this.jQueryAnimations(page);
	      	return range;
	    },

	    getItemRange: function(page) {
	      	var range = {};
	      	range.start = (page - 1) * this.options.perPage;
	      	range.end = range.start + this.options.perPage;
	      	if (range.end > this._items.length) range.end = this._items.length;
	      	return range;
	    },

	    cssAnimations: function(page) {
	      	clearInterval(this._delay);

	      	this._itemsHiding.removeClass(this.options.animation + " pag-invisible").addClass("pag-hidden");

	      	this._itemsShowing.removeClass("pag-hidden").addClass("pag-invisible");

	      	this._itemsOriented = this.getDirectedItems(page);
	      	this._index = 0;

	      	this._delay = setInterval(this.bind(function() {
	        	if (this._index === this._itemsOriented.length) clearInterval(this._delay);
	       		else {
	          		this._itemsOriented.eq(this._index).removeClass("pag-invisible").addClass(this.options.animation);
	        	}
	        	this._index = this._index + 1;
	      	}, this), this.options.delay);
	    },

	    jQueryAnimations: function(page) {
	      	clearInterval(this._delay);
	      	this._itemsHiding.addClass("pag-hidden");
	      	this._itemsShowing.fadeTo(0, 0).removeClass("pag-hidden");
	      	this._itemsOriented = this.getDirectedItems(page);
	      	this._index = 0;
	      	this._delay = setInterval(this.bind(function() {
	        	if (this._index === this._itemsOriented.length) clearInterval(this._delay);
	        	else {
	          		this._itemsOriented.eq(this._index).fadeTo(this.options.fallback, 1);
	        	}
	        	this._index = this._index + 1;
	      	}, this), this.options.delay);
	    },

	    getDirectedItems: function(page) {
	      	var itemsToShow;

	      	switch (this.options.direction) {
	        	case "backwards":
	          		itemsToShow = $(this._itemsShowing.get().reverse());
	          		break;
	        	case "random":
	          		itemsToShow = $(this._itemsShowing.get().sort(function() {
	            		return (Math.round(Math.random()) - 0.5);
	          		}));
	          		break;
	        	case "auto":
	          		itemsToShow = page >= this._currentPageNum ?
	          		this._itemsShowing : $(this._itemsShowing.get().reverse());
	          		break;
	        	default:
	          		itemsToShow = this._itemsShowing;
	          		break;
	      	}

	      	return itemsToShow;
	    },

	    updatePages: function(page) {
	      	var interval, index, nav;
	      	interval = this.getInterval(page);
	      	for (index in this._nav) {
	        	if (this._nav.hasOwnProperty(index)) {
		          	nav = this._nav[index];
		          	this.updateBtns(nav, page);
		          	this.updateCurrentPage(nav, page);
		          	this.updatePagesShowing(nav, interval);
		          	this.updateBreaks(nav, interval);
	        	}
	      	}
	      	return interval;
	    },

	    getInterval: function(page) {
	      	var neHalf, upperLimit, start, end;
	      	neHalf = Math.ceil(this.options.midRange / 2);
	      	upperLimit = this._numPages - this.options.midRange;
	      	start = page > neHalf ? Math.max(Math.min(page - neHalf, upperLimit), 0) : 0;
	      	end = page > neHalf ?
	        Math.min(page + neHalf - (this.options.midRange % 2 > 0 ? 1 : 0), this._numPages) :
	        Math.min(this.options.midRange, this._numPages);
	      	return {start: start,end: end};
	    },

	    updateBtns: function(nav, page) {
	      	if (page === 1) {
	        	nav.first.addClass("pag-disabled");
	        	nav.previous.addClass("pag-disabled");
	      	}
	      	if (page === this._numPages) {
	        	nav.next.addClass("pag-disabled");
	        	nav.last.addClass("pag-disabled");
	      	}
	      	if (this._currentPageNum === 1 && page > 1) {
	        	nav.first.removeClass("pag-disabled");
	        	nav.previous.removeClass("pag-disabled");
	      	}
	      	if (this._currentPageNum === this._numPages && page < this._numPages) {
	        	nav.next.removeClass("pag-disabled");
	        	nav.last.removeClass("pag-disabled");
	      	}
	    },

	    updateCurrentPage: function(nav, page) {
	      	nav.currentPage.removeClass("pag-current");
	      	nav.currentPage = nav.pages.eq(page - 1).addClass("pag-current");
	    },

	    updatePagesShowing: function(nav, interval) {
	      	var newRange = nav.pages.slice(interval.start, interval.end).not(nav.permPages);
	      	nav.pagesShowing.not(newRange).addClass("pag-hidden");
	      	newRange.not(nav.pagesShowing).removeClass("pag-hidden");
	      	nav.pagesShowing = newRange;
	    },

	    updateBreaks: function(nav, interval) {
	      	if (interval.start > this.options.startRange || (this.options.startRange === 0 && interval.start > 0)) nav.fstBreak.removeClass("pag-hidden");
	      	else nav.fstBreak.addClass("pag-hidden");

	      	if (interval.end < this._numPages - this.options.endRange) nav.lstBreak.removeClass("pag-hidden");
	      	else nav.lstBreak.addClass("pag-hidden");
	    },

	    callback: function(page, itemRange, pageInterval) {
	      	var pages = {
	            current: page,
	            interval: pageInterval,
	            count: this._numPages
	        },
	        items = {
	            showing: this._itemsShowing,
	            oncoming: this._items.slice(itemRange.start + this.options.perPage, itemRange.end + this.options.perPage),
	            range: itemRange,
	            count: this._items.length
	        };

	      	pages.interval.start = pages.interval.start + 1;
	      	items.range.start = items.range.start + 1;
	      	this.options.callback(pages, items);
	    },

	    bind: function(fn, me) {
	      	return function() {
	        	return fn.apply(me, arguments);
	      	};
	    },

	    destroy: function() {
	      	this.jQdocument.unbind("keydown.pagination");
	      	this._container.unbind("mousewheel.pagination DOMMouseScroll.pagination");

	      	if (this._cssAnimSupport && this.options.animation.length)
	        	this._items.removeClass("animated pag-hidden pag-invisible " + this.options.animation);
	      	else this._items.removeClass("pag-hidden").fadeTo(0, 1);
	      	this._holder.unbind("click.pagination").empty();
	    }

  	};

  	$.fn[name] = function(arg) {
	    var type = $.type(arg);

	    if (type === "object") {
	      	if (this.length && !$.data(this, name)) {
	        	instance = new pag(this, arg);
	        	this.each(function() {
	          		$.data(this, name, instance);
	        	});
	      	}
	      	return this;
	    }

	    if (type === "string" && arg === "destroy") {
	      	instance.destroy();
	      	this.each(function() {
	        	$.removeData(this, name);
	      	});
	      	return this;
	    }

	    if (type === 'number' && arg % 1 === 0) {
	      	if (instance.validNewPage(arg)) instance.paginate(arg);
	      	return this;
	    }

	    return this;
  	};

})(jQuery, window, document);

