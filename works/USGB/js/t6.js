//Ford chooses to use jQuery tmpl and its associated components under the MIT License.
(function(a){var r=a.fn.domManip,d="_tmplitem",q=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,b={},f={},e,p={key:0,data:{}},h=0,c=0,l=[];function g(e,d,g,i){var c={data:i||(d?d.data:{}),_wrap:d?d._wrap:null,tmpl:null,parent:d||null,nodes:[],calls:u,nest:w,wrap:x,html:v,update:t};e&&a.extend(c,e,{nodes:[],parent:d});if(g){c.tmpl=g;c._ctnt=c._ctnt||c.tmpl(a,c);c.key=++h;(l.length?f:b)[h]=c}return c}a.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(f,d){a.fn[f]=function(n){var g=[],i=a(n),k,h,m,l,j=this.length===1&&this[0].parentNode;e=b||{};if(j&&j.nodeType===11&&j.childNodes.length===1&&i.length===1){i[d](this[0]);g=this}else{for(h=0,m=i.length;h<m;h++){c=h;k=(h>0?this.clone(true):this).get();a.fn[d].apply(a(i[h]),k);g=g.concat(k)}c=0;g=this.pushStack(g,f,i.selector)}l=e;e=null;a.tmpl.complete(l);return g}});a.fn.extend({tmpl:function(d,c,b){return a.tmpl(this[0],d,c,b)},tmplItem:function(){return a.tmplItem(this[0])},template:function(b){return a.template(b,this[0])},domManip:function(d,l,j){if(d[0]&&d[0].nodeType){var f=a.makeArray(arguments),g=d.length,i=0,h;while(i<g&&!(h=a.data(d[i++],"tmplItem")));if(g>1)f[0]=[a.makeArray(d)];if(h&&c)f[2]=function(b){a.tmpl.afterManip(this,b,j)};r.apply(this,f)}else r.apply(this,arguments);c=0;!e&&a.tmpl.complete(b);return this}});a.extend({tmpl:function(d,h,e,c){var j,k=!c;if(k){c=p;d=a.template[d]||a.template(null,d);f={}}else if(!d){d=c.tmpl;b[c.key]=c;c.nodes=[];c.wrapped&&n(c,c.wrapped);return a(i(c,null,c.tmpl(a,c)))}if(!d)return[];if(typeof h==="function")h=h.call(c||{});e&&e.wrapped&&n(e,e.wrapped);j=a.isArray(h)?a.map(h,function(a){return a?g(e,c,d,a):null}):[g(e,c,d,h)];return k?a(i(c,null,j)):j},tmplItem:function(b){var c;if(b instanceof a)b=b[0];while(b&&b.nodeType===1&&!(c=a.data(b,"tmplItem"))&&(b=b.parentNode));return c||p},template:function(c,b){if(b){if(typeof b==="string")b=o(b);else if(b instanceof a)b=b[0]||{};if(b.nodeType)b=a.data(b,"tmpl")||a.data(b,"tmpl",o(b.innerHTML));return typeof c==="string"?(a.template[c]=b):b}return c?typeof c!=="string"?a.template(null,c):a.template[c]||a.template(null,q.test(c)?c:a(c)):null},encode:function(a){return(""+a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")}});a.extend(a.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){_=_.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(_,$1,$2);_=[];",close:"call=$item.calls();_=call._.concat($item.wrap(call,_));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},"if":{open:"if(($notnull_1) && $1a){",close:"}"},"else":{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){_.push($1a);}"},"=":{_default:{$1:"$data"},open:"if($notnull_1){_.push($.encode($1a));}"},"!":{open:""}},complete:function(){b={}},afterManip:function(f,b,d){var e=b.nodeType===11?a.makeArray(b.childNodes):b.nodeType===1?[b]:[];d.call(f,b);m(e);c++}});function i(e,g,f){var b,c=f?a.map(f,function(a){return typeof a==="string"?e.key?a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+d+'="'+e.key+'" $2'):a:i(a,e,a._ctnt)}):e;if(g)return c;c=c.join("");c.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,function(f,c,e,d){b=a(e).get();m(b);if(c)b=j(c).concat(b);if(d)b=b.concat(j(d))});return b?b:j(c)}function j(c){var b=document.createElement("div");b.innerHTML=c;return a.makeArray(b.childNodes)}function o(b){return new Function("jQuery","$item","var $=jQuery,call,_=[],$data=$item.data;with($data){_.push('"+a.trim(b).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,function(m,l,j,d,b,c,e){var i=a.tmpl.tag[j],h,f,g;h=i._default||[];if(c&&!/\w$/.test(b)){b+=c;c=""}if(b){b=k(b);e=e?","+k(e)+")":c?")":"";f=c?b.indexOf(".")>-1?b+c:"("+b+").call($item"+e:b;g=c?f:"(typeof("+b+")==='function'?("+b+").call($item):("+b+"))"}else g=f=h.$1||"null";d=k(d);return"');"+i[l?"close":"open"].split("$notnull_1").join(b?"typeof("+b+")!=='undefined' && ("+b+")!=null":"true").split("$1a").join(g).split("$1").join(f).split("$2").join(d?d.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g,function(d,c,b,a){a=a?","+a+")":b?")":"";return a?"("+c+").call($item"+a:d}):h.$2||"")+"_.push('"})+"');}return _;")}function n(c,b){c._wrap=i(c,true,a.isArray(b)?b:[q.test(b)?b:a(b).html()]).join("")}function k(a){return a?a.replace(/\\'/g,"'").replace(/\\\\/g,"\\"):null}function s(b){var a=document.createElement("div");a.appendChild(b.cloneNode(true));return a.innerHTML}function m(o){var n="_"+c,k,j,l={},e,p,i;for(e=0,p=o.length;e<p;e++){if((k=o[e]).nodeType!==1)continue;j=k.getElementsByTagName("*");for(i=j.length-1;i>=0;i--)m(j[i]);m(k)}function m(j){var p,i=j,k,e,m;if(m=j.getAttribute(d)){while(i.parentNode&&(i=i.parentNode).nodeType===1&&!(p=i.getAttribute(d)));if(p!==m){i=i.parentNode?i.nodeType===11?0:i.getAttribute(d)||0:0;if(!(e=b[m])){e=f[m];e=g(e,b[i]||f[i],null,true);e.key=++h;b[h]=e}c&&o(m)}j.removeAttribute(d)}else if(c&&(e=a.data(j,"tmplItem"))){o(e.key);b[e.key]=e;i=a.data(j.parentNode,"tmplItem");i=i?i.key:0}if(e){k=e;while(k&&k.key!=i){k.nodes.push(j);k=k.parent}delete e._ctnt;delete e._wrap;a.data(j,"tmplItem",e)}function o(a){a=a+n;e=l[a]=l[a]||g(e,b[e.parent.key+n]||e.parent,null,true)}}}function u(a,d,c,b){if(!a)return l.pop();l.push({_:a,tmpl:d,item:this,data:c,options:b})}function w(d,c,b){return a.tmpl(a.template(d),c,b,this)}function x(b,d){var c=b.options||{};c.wrapped=d;return a.tmpl(a.template(b.tmpl),b.data,c,b.item)}function v(d,c){var b=this._wrap;return a.map(a(a.isArray(b)?b.join(""):b).filter(d||"*"),function(a){return c?a.innerText||a.textContent:a.outerHTML||s(a)})}function t(){var b=this.nodes;a.tmpl(null,null,null,this).insertBefore(b[0]);a(b).remove()}})(jQuery);
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
				serachCategory = docListTable.resp.showFilters?$("#filter-box .filter-list .filter-btn.active", docListTable.templateWrap).data('category'):'All';
			docListTable.runSearch(searchText,serachCategory);
		},
		runSearch:function(keywords,category){
			var restURL = "json/test.json";
			if($.isEmptyObject(docListTable.resp)){
				docListTable.fetchData(restURL,
				function(data){
					docListTable.resp=data;
					filterData(docListTable.resp,keywords,category);
					docListTable.renderFilterTempalte(true, docListTable.resp);
					docListTable.renderSearchListTemplate(true, docListTable.resp);
				},
				function(url,e,extStatus){
					docListTable.resp={};
				});
			}
			else {
				filterData(docListTable.resp,keywords,category);
				docListTable.renderSearchListTemplate(true, docListTable.resp);
			}
			
			function filterData(data,keywords,category) {
				var id=0;
				docListTable.filteredItems=[];
				$.each(data.items,function(index, item){
					docListTable.filteredItems.push({filter:true,len:0});
					if(item.Category.toLowerCase()===category.toLowerCase()||category.toLowerCase()==='all'){
						$.each(item,function(j,node){
							data.Subject.len=0;
							$.each(data.Subject,function(k,subject){
								if(k.toLowerCase()!=='no'&&k.toLowerCase()!=='len') {
									data.Subject.len++;
									if(j.toLowerCase()===k.toLowerCase()){
										docListTable.filteredItems[index][j]=node;
										if(k.toLowerCase()==='downloadcopy') {docListTable.filteredItems[index].Path=item.Path;}
										docListTable.filteredItems[index].len++;
										if (typeof(keywords)==="undefined"||keywords.trim()===''||typeof(node)==='string'&&node.toLowerCase().indexOf(keywords.toLowerCase())>-1) docListTable.filteredItems[index].filter=false;
									}
								}
								
							});
						});
					}
					
					if(!docListTable.filteredItems[index].filter) {
						docListTable.filteredItems[index].ID = ++id;
						docListTable.filteredItems[index].rowclass = id%2===0?"even c-" + docListTable.filteredItems[index].len:"odd c-" + docListTable.filteredItems[index].len;
					}
				});
			}
		},
		fetchData: function(url,onSuccess, onError){
			$.ajax({
				url:url,
				async:true,
				dataType:"json",
				success:function(data){
					if(data&&data.items&&data.items.length >0 ) {
						onSuccess(data);
					} else {

					}
				},
				error: function(e, extStatus) {
					onError(url, e, extStatus);
				}
			});
		},
		renderFilterTempalte:function(success, data, e) {
			if(success) {
				$("#filter-box ul",this.templateWrap).remove();
				$("#list-header ul",this.templateWrap).remove();
				$("#list-header-template").tmpl(data.Subject).appendTo("#list-header",this.templateWrap);
				if(data.showFilters) {
					$("#filter-box-template").tmpl(data.Categories).appendTo("#filter-box",this.templateWrap);				
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
						$("#filter-box .filter-value",docListTable.templateWrap).html(category);
						filterButton.removeClass('active');
						$(e.target).addClass('active');
						docListTable.runSearch(searchText,category);

					});
				}
				
			}
		},
		renderSearchListTemplate: function(success, data, e) {
			if(success) {
				$("#search-items ul",this.templateWrap).remove();			
				$("#search-template").tmpl(docListTable.filteredItems).appendTo("#search-items",this.templateWrap);
				if(data.pagination&&data.pagination>0) {
					$("div.pagination").pagination({
					 	 perPage:data.pagination,
					 	 callback : function(pages, items) {
					 	 	$(".pagination .pag-previous", this.templateWrap).html("<");
					 	 	$(".pagination .pag-next", this.templateWrap).html(">");

	                    }
					});	
				};
				

			

			}

		}
	};
	$(function(){
		docListTable.init();
	});

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