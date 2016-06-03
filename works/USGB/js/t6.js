/*
Author: Joel Wang
Description:
Dependencies: jQuery
*/
(function($){
	docListTable = {
		init: function(){
			if(!$(".content").length) return;
			this.templateWrap = $(".content");
			// this.restServices = $("#rest-services").embeddedData();
			this.restServices = location.origin+restfulurl;
			this.filteredItems=[];
			this.resp={};
			this.searchData();
			this.runSearch('','All');

		},
		searchData:function(){
			var searchContainer = $(".search-box");
			var form = $("form", searchContainer);
			form.submit(function(e){
				e.preventDefault();
				docListTable.formSubmit();
			});
			
		},
		formSubmit: function(){
			var searchContainer = $(".search-box"),
				searchText = $(".text-search", searchContainer).val(),
				serachCategory = docListTable.resp.ShowFilters?$("#filter-box .filter-list .filter-btn.active", docListTable.templateWrap).data('category'):'All';
			docListTable.runSearch(searchText,serachCategory);
		},
		runSearch:function(keywords,category){
			// var restURL = this.restServices["url"];
			var restURL = this.restServices;
			if($.isEmptyObject(docListTable.resp)){
				docListTable.fetchData(restURL,
				function(data){
					docListTable.resp=data;
					filterData(docListTable.resp,keywords,category);
					docListTable.renderFilterTempalte(true, docListTable.resp);
					docListTable.renderSearchListTemplate(true, docListTable.resp);
					$(".error-msg", this.templateWrap).hide();
					$(".search-box",this.templateWrap).show();
					$("#filter-box",this.templateWrap).show();
				},
				function(url,e,extStatus){
					docListTable.resp={};
					$(".error-msg", this.templateWrap).show();
					$(".search-box",this.templateWrap).hide();
					$("#filter-box",this.templateWrap).hide();
				});
			}
			else {
				filterData(docListTable.resp,keywords,category);
				docListTable.renderSearchListTemplate(true, docListTable.resp);
				setTimeout(function(){
					docListTable.setSliderBtn();
					$(window).on('resize',function(){
						docListTable.setSliderBtn();
					});
				},100);
			}
			
			function filterData(data,keywords,category) {
				var id=0,
					i=0,
					filteredItems=[];
				$.each(data.Items,function(index, item){
					filteredItems.push({filter:true,len:0});
					if(!item.Category||item.Category.toLowerCase()===category.toLowerCase()||category.toLowerCase()==='all'){
						$.each(item,function(j,node){
							data.Subject.len=0;
							$.each(data.Subject,function(k,subject){
								if(!item[k]) item[k]="";
								if(k.toLowerCase()!=='no'&&k.toLowerCase()!=='len') {
									data.Subject.len++;
									if(j.toLowerCase()===k.toLowerCase()){
										filteredItems[index][j]=node;
										if(k.toLowerCase()==='downloadcopy') {filteredItems[index].Path=item.Path;}
										if(k.toLowerCase()!=='rowclass') {
											filteredItems[index].len++;
										}
										if (typeof(keywords)==="undefined"||keywords.trim()===''||typeof(node)==='string'&&node.toLowerCase().indexOf(keywords.toLowerCase())>-1) filteredItems[index].filter=false;
									}
								}
								
							});
							data.Subject.rowclass="even c-"+ (data.Subject.len-1);
						});
					}
					
					if(!filteredItems[index].filter) {
						filteredItems[index].ID = ++id;
						filteredItems[index].rowclass = id%2===0?"even c-" + filteredItems[index].len:"odd c-" + filteredItems[index].len;
					}
				});
				if (filteredItems.length>0) {
					docListTable.filteredItems=[];
					$.each(filteredItems,function(index,item){
						if(!item.filter) {
							docListTable.filteredItems[i]=item;
							i++;
						}
					});
				}
			}
		},
		fetchData: function(url,onSuccess, onError){
			$.ajax({
				url:url,
				async:true,
				dataType:"json",
				success:function(data){
					if(data&&data.Items&&data.Items.length >0 ) {
						onSuccess(data);
					} else {
						onError();

					}
				},
				error: function(e, extStatus) {
					onError(url, e, extStatus);
				}
			});
		},
		renderFilterTempalte:function(success, data, e) {
			if(success) {
				$("#filter-group li",this.templateWrap).remove();
				$("#list-header ul",this.templateWrap).remove();
				// $("#list-header-template").tmpl(data.Subject).appendTo("#list-header",this.templateWrap);
				$("#list-header",this.templateWrap).loadTemplate("#list-header-template",data.Subject);
				$.each($("#list-header ul li", this.templateWrap),function(index,l){
					if($(l).html()=='') $(l).remove();
				});
				if(data.ShowFilters) {
					// $("#filter-box-template").tmpl(data.Categories).appendTo("#filter-box",this.templateWrap);				
					// $("#filter-box",this.templateWrap).loadTemplate("#filter-box-template",data.Categories);
					$("#filter-group",this.templateWrap).loadTemplate("#filter-group-template",data.Categories);
					var filterButton = $("#filter-box .filter-list .filter-btn", docListTable.templateWrap);
					$("#filter-box .filter-value",docListTable.templateWrap).on('click',function(e){
						e.preventDefault();
						$("#filter-box .filter-list", docListTable.templateWrap).toggleClass('expand');
					});
					filterButton.on('click',function(e){
						var category=$(e.target).data('category'),
						searchText = $(".search-box .text-search",this.templateWrap).val();
						$("#filter-box .filter-list", docListTable.templateWrap).toggleClass('expand');
						e.preventDefault();
						$("#filter-box .filter-value p",docListTable.templateWrap).html(category);
						filterButton.removeClass('active');
						$(e.target).addClass('active');
						docListTable.runSearch(searchText,category);

					});
					var btnAll = filterButton[0];
					$.each(filterButton,function(index,btn){
						if ($(btn).data('category').toLowerCase==='all') {
							btnAll=btn;
							return;
						}
					});
					btnAll.click();
					$("#filter-group",this.templateWrap).removeClass('expand');
				}
				
			}
		},
		renderSearchListTemplate: function(success, data, e) {
			if(success) {
				$("#search-items ul",this.templateWrap).remove();			
				// $("#search-template").tmpl(docListTable.filteredItems).appendTo("#search-items",this.templateWrap);
				$("#search-items",this.templateWrap).loadTemplate("#search-template",docListTable.filteredItems);
				$.each($("#search-items ul li", this.templateWrap),function(index,l){
					if($(l).html()=='') $(l).remove();
				});
				if(data.Pagination&&data.Pagination>0) {
					$("div.pagination").pagination({
					 	 perPage:data.Pagination,
					 	 callback : function(pages, items) {
					 	 	$(".pagination .pag-previous", this.templateWrap).html("<");
					 	 	$(".pagination .pag-next", this.templateWrap).html(">");

	                    }
					});	
				};
			}

		},
		setSliderBtn: function(){
					var listhead=$("article #list-header>ul",this.templateWrap),
						listcontent = $("article ul", this.templateWrap),
						leftbtn=$("#filter-box .page-slide .slide-left",this.tempalteWrap),
						rightbtn=$("#filter-box .page-slide .slide-right",this.tempalteWrap),
						attval=listhead.width(),
						w=0,
						listswrap=$("article", this.templateWrap),
						wival=listswrap.width();
					listcontent.css('left',0);
					$.each($("article #list-header>ul>li",this.templateWrap),function(index,lis){
						w+=$(lis).width();
					});
					if (w>$("article #list-header>ul",this.templateWrap).width()) {
						$.each($("article ul", this.templateWrap),function(index,u){
							$(u).width(w);
						});
					}
					attval=listhead.width();
					resetBtn(listhead,attval,wival,rightbtn,leftbtn);

					$("#filter-box .page-slide>div", this.templateWrap).unbind('click').on('click',function(e){
						slides(e);
					});
					function slides(event) {
						var lhead=$("article #list-header>ul",this.templateWrap),
							lcontent = $("article ul", this.templateWrap),
							lbtn=$("#filter-box .page-slide .slide-left",this.tempalteWrap),
							rbtn=$("#filter-box .page-slide .slide-right",this.tempalteWrap),
							aval=lhead.width(),
							listwrap=$("article", this.templateWrap),
							wval=listwrap.width();
						if ($(event.target).hasClass('disable')) return;
						var posval=lhead.css('left').replace('px','');
						event.preventDefault();
						event.stopPropagation()
						if($(event.target).hasClass('slide-right')) {
							if(Number(posval)*-1<=Number(aval)){
								if(Number(aval)*0.25>(aval-wval+Number(posval))){
									lcontent.css("left",(wval-aval)+'px');
								}	
								else{
									lcontent.css("left",(Number(posval)-Number(aval)*0.25)+'px');
								}	
							}
							
						}
						else if($(event.target).hasClass('slide-left')&&Number(posval)<0) {
							if(Number(posval)*-1<Number(aval)*0.25) {
								lcontent.css("left",0);
							}
							else {
								lcontent.css("left",(Number(posval)+Number(aval)*0.25)+'px');
							}
							
						}
						resetBtn(lhead,aval,wval,rbtn,lbtn);


					};
					function resetBtn(listhead,attval,wival,rightbtn,leftbtn){
						if(Number(listhead.css('left').replace('px',''))*-1>=attval-wival) {
								rightbtn.addClass('disable');
						}
						else{
									rightbtn.removeClass('disable');
						}
						if(Number(listhead.css('left').replace('px',''))>=0) {
									leftbtn.addClass('disable');
						}
						else{
									leftbtn.removeClass('disable');
						}
					}
		}
	};
	$(function(){
		docListTable.init();
	});

})(jQuery);

(function($){
	$.fn.embeddedData = function(prop){
		var xJson = this.data('x-json');
		
		if( !xJson && this.attr('type') === 'text/x-json' ) {
			xJson = $.parseJSON( this.html() );
			this.data( 'x-json', xJson );
		}	
		
		if( prop ) {
			return xJson[prop] || null;
		} else {
			return xJson || {};
		}
	};
})(jQuery);


(function($, window, document, undefined) {

  	var name = "pagination",
      	instance = null,
      	defaults = {
	        containerID: "search-items",
	        previous : "PREV",
	        next: "NEXT",
	        startPage: 1,
	        perPage: 6,
	        midRange: 10,
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

(function ($) {
    "use strict";
    var templates = {},
        queue = {},
        formatters = {};

    function loadTemplate(template, data, options) {
        var $that = this,
            $template,
            isFile,
            settings;

        data = data || {};

        settings = $.extend(true, {
            // These are the defaults.
            async: true,
            overwriteCache: false,
            complete: null,
            success: null,
            error: function () {
                $(this).each(function () {
                    $(this).html(settings.errorMessage);
                });
            },
            errorMessage: "There was an error loading the template.",
            paged: false,
            pageNo: 1,
            elemPerPage: 10,
            append: false,
            prepend: false,
            beforeInsert: null,
            afterInsert: null,
            bindingOptions: {
                ignoreUndefined: false,
                ignoreNull: false,
                ignoreEmptyString: false
            }
        }, options);

        if ($.type(data) === "array") {
            return processArray.call(this, template, data, settings);
        }

        if (!containsSlashes(template)) {
            $template = $(template);
            if (typeof template === 'string' && template.indexOf('#') === 0) {
                settings.isFile = false;
            }
        }

        isFile = settings.isFile || (typeof settings.isFile === "undefined" && (typeof $template === "undefined" || $template.length === 0));

        if (isFile && !settings.overwriteCache && templates[template]) {
            prepareTemplateFromCache(template, $that, data, settings);
        } else if (isFile && !settings.overwriteCache && templates.hasOwnProperty(template)) {
            addToQueue(template, $that, data, settings);
        } else if (isFile) {
            loadAndPrepareTemplate(template, $that, data, settings);
        } else {
            loadTemplateFromDocument($template, $that, data, settings);
        }
        return this;
    }

    function addTemplateFormatter(key, formatter) {
        if (formatter) {
            formatters[key] = formatter;
        } else {
            formatters = $.extend(formatters, key);
        }
    }

    function containsSlashes(str) {
        return typeof str === "string" && str.indexOf("/") > -1;
    }

    function processArray(template, data, settings) {
        settings = settings || {};
        var $that = this,
            todo = data.length,
            doPrepend = settings.prepend && !settings.append,
            done = 0,
            success = 0,
            errored = false,
            newOptions;

        if (settings.paged) {
            var startNo = (settings.pageNo - 1) * settings.elemPerPage;
            data = data.slice(startNo, startNo + settings.elemPerPage);
            todo = data.length;
        }

        newOptions = $.extend(
            {},
            settings,
            {
                complete: function () {
                    if (this.html) {
                        if (doPrepend) {
                            $that.prepend(this.html());
                        } else {
                            $that.append(this.html());
                        }
                    }
                    done++;
                    if (done === todo || errored) {
                        if (errored && settings && typeof settings.error === "function") {
                            settings.error.call($that);
                        }
                        if (settings && typeof settings.complete === "function") {
                            settings.complete();
                        }
                    }
                },
                success: function () {
                    success++;
                    if (success === todo) {
                        if (settings && typeof settings.success === "function") {
                            settings.success();
                        }
                    }
                },
                error: function () {
                    errored = true;
                }
            }
        );

        if (!settings.append && !settings.prepend) {
            $that.html("");
        }

        if (doPrepend) data.reverse();
        $(data).each(function () {
            var $div = $("<div/>");
            loadTemplate.call($div, template, this, newOptions);
            if (errored) {
                return false;
            }
        });

        return this;
    }

    function addToQueue(template, selection, data, settings) {
        if (queue[template]) {
            queue[template].push({ data: data, selection: selection, settings: settings });
        } else {
            queue[template] = [{ data: data, selection: selection, settings: settings}];
        }
    }

    function prepareTemplateFromCache(template, selection, data, settings) {
        var $templateContainer = templates[template].clone();

        prepareTemplate.call(selection, $templateContainer, data, settings);
        if (typeof settings.success === "function") {
            settings.success();
        }
    }

    function uniqueId() {
        return new Date().getTime();
    }

    function urlAvoidCache(url) {
        if (url.indexOf('?') !== -1) {
            return url + "&_=" + uniqueId();
        }
        else {
            return url + "?_=" + uniqueId();
        }
    }

    function loadAndPrepareTemplate(template, selection, data, settings) {
        var $templateContainer = $("<div/>");

        templates[template] = null;
        var templateUrl = template;
        if (settings.overwriteCache) {
            templateUrl = urlAvoidCache(templateUrl);
        }
        $.ajax({
            url: templateUrl,
            async: settings.async,
            success: function (templateContent) {
                $templateContainer.html(templateContent);
                handleTemplateLoadingSuccess($templateContainer, template, selection, data, settings);
            },
            error: function () {
                handleTemplateLoadingError(template, selection, data, settings);
            }
        });
    }

    function loadTemplateFromDocument($template, selection, data, settings) {
        var $templateContainer = $("<div/>");

        if ($template.is("script") || $template.is("template")) {
            $template = $.parseHTML($.trim($template.html()));
        }

        $templateContainer.html($template);
        prepareTemplate.call(selection, $templateContainer, data, settings);

        if (typeof settings.success === "function") {
            settings.success();
        }
    }

    function prepareTemplate(template, data, settings) {
        bindData(template, data, settings);

        $(this).each(function () {
            var $templateHtml = $(template.html());
            if (settings.beforeInsert) {
                settings.beforeInsert($templateHtml);
            }
            if (settings.append) {

                $(this).append($templateHtml);
            } else if (settings.prepend) {
                $(this).prepend($templateHtml);
            } else {
                $(this).html($templateHtml);
            }
            if (settings.afterInsert) {
                settings.afterInsert($templateHtml);
            }
        });

        if (typeof settings.complete === "function") {
            settings.complete.call($(this));
        }
    }

    function handleTemplateLoadingError(template, selection, data, settings) {
        var value;

        if (typeof settings.error === "function") {
            settings.error.call(selection);
        }

        $(queue[template]).each(function (key, value) {
            if (typeof value.settings.error === "function") {
                value.settings.error.call(value.selection);
            }
        });

        if (typeof settings.complete === "function") {
            settings.complete.call(selection);
        }

        while (queue[template] && (value = queue[template].shift())) {
            if (typeof value.settings.complete === "function") {
                value.settings.complete.call(value.selection);
            }
        }

        if (typeof queue[template] !== 'undefined' && queue[template].length > 0) {
            queue[template] = [];
        }
    }

    function handleTemplateLoadingSuccess($templateContainer, template, selection, data, settings) {
        var value;

        templates[template] = $templateContainer.clone();
        prepareTemplate.call(selection, $templateContainer, data, settings);

        if (typeof settings.success === "function") {
            settings.success.call(selection);
        }

        while (queue[template] && (value = queue[template].shift())) {
            prepareTemplate.call(value.selection, templates[template].clone(), value.data, value.settings);
            if (typeof value.settings.success === "function") {
                value.settings.success.call(value.selection);
            }
        }
    }

    function bindData(template, data, settings) {
        data = data || {};

        processElements("data-content", template, data, settings, function ($elem, value) {
            $elem.html(applyFormatters($elem, value, "content", settings));
        });

        processElements("data-content-append", template, data, settings, function ($elem, value) {
            $elem.append(applyFormatters($elem, value, "content", settings));
        });

        processElements("data-content-prepend", template, data, settings, function ($elem, value) {
            $elem.prepend(applyFormatters($elem, value, "content", settings));
        });

        processElements("data-content-text", template, data, settings, function ($elem, value) {
            $elem.text(applyFormatters($elem, value, "content", settings));
        });

        processElements("data-src", template, data, settings, function ($elem, value) {
            $elem.attr("src", applyFormatters($elem, value, "src", settings));
        }, function ($elem) {
            $elem.remove();
        });
        
        processElements("data-href", template, data, settings, function ($elem, value) {
            $elem.attr("href", applyFormatters($elem, value, "href", settings));
        }, function ($elem) {
            $elem.remove();
        });

        processElements("data-alt", template, data, settings, function ($elem, value) {
            $elem.attr("alt", applyFormatters($elem, value, "alt", settings));
        });

        processElements("data-id", template, data, settings, function ($elem, value) {
            $elem.attr("id", applyFormatters($elem, value, "id", settings));
        });

        processElements("data-value", template, data, settings, function ($elem, value) {
            $elem.attr("value", applyFormatters($elem, value, "value", settings));
        });

        processElements("data-link", template, data, settings, function ($elem, value) {
            var $linkElem = $("<a/>");
            $linkElem.attr("href", applyFormatters($elem, value, "link", settings));
            $linkElem.html($elem.html());
            $elem.html($linkElem);
        });

        processElements("data-link-wrap", template, data, settings, function ($elem, value) {
            var $linkElem = $("<a/>");
            $linkElem.attr("href", applyFormatters($elem, value, "link-wrap", settings));
            $elem.wrap($linkElem);
        });

        processElements("data-options", template, data, settings, function ($elem, value) {
            $(value).each(function () {
                var $option = $("<option/>");
                $option.attr('value', this).text(this).appendTo($elem);
            });
        });

        processAllElements(template, data, settings);
    }

    function processElements(attribute, template, data, settings, dataBindFunction, noDataFunction) {
        $("[" + attribute + "]", template).each(function () {
            var $this = $(this),
                param = $this.attr(attribute),
                value = getValue(data, param);

            if (!valueIsAllowedByBindingOptions($this, value, settings)) {
                $this.remove();
                return;
            }

            $this.removeAttr(attribute);

            if (typeof value !== 'undefined' && dataBindFunction) {
                dataBindFunction($this, value);
            } else if (noDataFunction) {
                noDataFunction($this);
            }
        });
        return;
    }

    function valueIsAllowedByBindingOptions(bindingOptionsContainer, value, settings) {

        var bindingOptions = getBindingOptions(bindingOptionsContainer, settings);

        if (bindingOptions.ignoreUndefined && typeof value === "undefined") {
            return false;

        } else if (bindingOptions.ignoreNull && value === null) {
            return false;

        } else if (bindingOptions.ignoreEmptyString && value === "") {
            return false;

        } else {
            return true;
        }
    }

    function getBindingOptions(bindingOptionsContainer, settings) {

        var bindingOptions = {};

        // binding options passed as template attribute, i.e. 'data-binding-options'
        if (bindingOptionsContainer instanceof jQuery && bindingOptionsContainer.attr("data-binding-options")) {

            bindingOptions = $.parseJSON(bindingOptionsContainer.attr("data-binding-options"));
            bindingOptionsContainer.removeAttr("data-binding-options");

            // binding options defined in a "data-template-bind" attribute
        } else if (typeof bindingOptionsContainer === "object" && bindingOptionsContainer.hasOwnProperty('bindingOptions')) {
            bindingOptions = bindingOptionsContainer.bindingOptions;
        }

        // extend general bindingOptions with specific settings
        return $.extend({}, settings.bindingOptions, bindingOptions);
    }

    function processAllElements(template, data, settings) {
        $("[data-template-bind]", template).each(function () {
            var $this = $(this),
                param = $.parseJSON($this.attr("data-template-bind"));

            $this.removeAttr("data-template-bind");

            $(param).each(function () {
                var value;

                if (typeof (this.value) === 'object') {
                    value = getValue(data, this.value.data);
                } else {
                    value = getValue(data, this.value);
                }
                if (this.attribute) {

                    if (!valueIsAllowedByBindingOptions(this, value, settings)) {
                        $this.remove();
                        return;
                    }

                    switch (this.attribute) {
                        case "content":
                            $this.html(applyDataBindFormatters($this, value, this));
                            break;
                        case "contentAppend":
                            $this.append(applyDataBindFormatters($this, value, this));
                            break;
                        case "contentPrepend":
                            $this.prepend(applyDataBindFormatters($this, value, this));
                            break;
                        case "contentText":
                            $this.text(applyDataBindFormatters($this, value, this));
                            break;
                        case "options":
                            var optionsData = this;
                            $(value).each(function () {
                                var $option = $("<option/>");
                                $option
                                    .attr('value', this[optionsData.value.value])
                                    .text(applyDataBindFormatters($this, this[optionsData.value.content], optionsData))
                                    .attr('selected', typeof this[optionsData.value.selected] == undefined ? false : this[optionsData.value.selected])
                                    .appendTo($this);
                            });
                            break;
                        default:
                            $this.attr(this.attribute, applyDataBindFormatters($this, value, this));
                    }
                }
            });
        });
    }

    function applyDataBindFormatters($elem, value, data, settings) {
        if (data.formatter && formatters[data.formatter]) {
            return (function (formatterSettings) {
                return formatters[data.formatter].call($elem, value, data.formatOptions, formatterSettings);
            })(settings);
        }
        return value;
    }

    function getValue(data, param) {
        if (param === "this") {
            return data;
        }
        var paramParts = param.split('.'),
            part,
            value = data;

        while ((part = paramParts.shift()) && typeof value !== "undefined" && value != null) {
            value = value[part];
        }

        return value;
    }

    function applyFormatters($elem, value, attr, settings) {
        var formatterTarget = $elem.attr("data-format-target"),
            formatter;

        if (formatterTarget === attr || (!formatterTarget && attr === "content")) {
            formatter = $elem.attr("data-format");
            if (formatter && typeof formatters[formatter] === "function") {
                var formatOptions = $elem.attr("data-format-options");
                return (function (formatterSettings) {
                    return formatters[formatter].call($elem[0], value, formatOptions, $.extend({}, formatterSettings));
                })(settings);
            }
        }

        return value;
    }
    addTemplateFormatter("nestedTemplateFormatter", function (value, options, internalSettings) {
        if (!options) {
            return;
        }

        if (typeof options === "string" && options[0] === "{") {
            options = $.parseJSON(options);
        }

        var parentElement = options.parentElement || "div";
        var template = options.template || options;
        
        //If a parent is specified, return it; otherwise only return the generated children.
        if(options.parentElement)
            return $("<" + parentElement + "/>").loadTemplate(template, value, internalSettings);
        else
            return $("<" + parentElement + "/>").loadTemplate(template, value, internalSettings).children();
    });
    $.fn.loadTemplate = loadTemplate;
    $.addTemplateFormatter = addTemplateFormatter;

})(jQuery);
