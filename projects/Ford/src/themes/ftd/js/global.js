//LABjs window.onload helper
if( window.isWindowLoaded === undefined ) {
	window.isWindowLoaded = false;
}

/* //moved to mini-plugins.js
(function($){
	/* Quits when length is Zero
	$.fn.doOnce = function(func){
	    this.length && func.apply(this);
	    return this;
	};

	/* Same as .each except it quits when length is Zero
	$.fn.forEach = function(func){
	    this.length && this.each(func);
	    return this;
	};

})(jQuery);

//Enable lazy load images
(function($){
	var getData = function (image) {
		var data = (image.length > 0) ? image.metadata({type: 'class'}) : 0,
			ret = (data && 'src' in data) ? data : 0;
		return ret
	},
	defaults = {};

	$.fn.lazyLoadImages = function (options) {
	    this.length && this.each(function () {
	    	var item = $(this),
				data = getData(item);
				options = $.extend(defaults, options);
			if(data) {
				item.attr("src", data['src']);
				if(options['success']) {
					options.success.apply(this)
				}
			}
	    });
	    return this;
	}
})(jQuery);

//Enable elements to load Flash from there class meta data
(function($){
	var getData = function(flash){
			var data = flash.length > 0 ? flash.metadata({type: 'class'}) : 0,
				ret = (data && 'swf' in data) ? data : 0;
			return ret
			},
			defaults = {};

	$.fn.metaBasedFlash = function(options){
	    this.length && this.each(function(){
	    	var item = $(this),
	    		data = getData(item);
	    		options = $.extend(defaults, options);

	    	if(data) {
	    		//extend the JSON object extracted from the class with some system wide ones.
		    	data = $.extend(true, data, options.swfobject);

				item.flash(data);
				item.addClass("flash-loaded");
				if(options['success']) {
					options.success.apply(this)
				}
			}
	    });
	    return this;
	}

	$.fn.killFlash = function(){
	    this.length && this.each(function(){
	    	var flash = $(this).flash();
			flash.remove && flash.remove();
	    });
	    return this;
	}
})(jQuery);

*/

(function($, window, undefined){

	//namespacing
	var ND = window.ND = window.ND || {};
	ND.API = ND.api || {};

	//Protect from missing SiteConf page JS errors
	window.SiteConf = window.SiteConf || {};

	/* ND.urlParams Version 0.9 - Glenn Baker */
	ND.urlParams=function(){var d=function(s){var a=s.match(/[\%][a-fA-F0-9]{2}/g);for(o=0;a&&o<a.length;o++) {var hex=/[\%]([a-fA-F0-9]{2})/i.exec(a[o]).pop();s=s.replace(a[o],String.fromCharCode(parseInt(hex,16)));}return s;};if(!window.location['param']){window.location.param={};}var qs=window.location.href.match(/([^?=&]+)(=([^&#]*))?/g);for(i=0;i<qs.length;i++){if(qs[i].indexOf("=")>-1){var c=qs[i].split('=');var v=c.pop();var n=c.pop();window.location.param[n]=d(v);}}};ND.urlParams();


	// Pad with leading zeros
	ND.pad = function(num, size) {
	    var s = num+"";
	    while (s.length < size) s = "0" + s;
	    return s;
	};

	//ND is in the window scope.
	ND.flash = {
		init: function(){
			if($.flash.version.major < 1) {return;}

			var qsParams = window.location.param, swfOptions = {flashvars:{}};

			$.each(qsParams , function(key, i){
				if(typeof key === 'string' && key.indexOf('section') === 0) {
					swfOptions.flashvars[key] = qsParams[key]
				}
			});

			if ($("body").hasClass('lincoln')==false) {
				$('#banner').removeClass('flash').metaBasedFlash({
					swfobject: swfOptions,
					success: function(){

							$("#principal").addClass("banner-flash");

					}
				});
				$('.flash').metaBasedFlash({
					swfobject: swfOptions
				});
			}
		}
	}

	ND.twitter = {
		init: function () {
			var data;
			var newsFeed = $(".newsfeed");
			var paginationContainer;
			var markup = {
				container: function () {
					return '<ul class="pagination-dots"></ul>';
				},
				item: function () {
					return '<li></li>';
				},
				current: function (number) {
					return '<span title="' + number + '">Page ' + number + '</span>';
				},
				link: function (number) {
					return '<a href="#" class="page" title="' + number + '">Page ' + number + '</a>';
				}
			};

			var injectPagination = function (pages) {
				var i;
				var container = $(markup.container());

				for (i = 1; i <= pages; i = i + 1) {
					var item = $(markup.item());
					var content;
					if (i === 1) {
						$(item).addClass("current");
						content = $(markup.current(i));
					}
					else {
						content = $(markup.link(i));
					}
					$(item).append(content);
					$(container).append(item);
				}
				$(newsFeed).after(container);

				paginationContainer = container;
			};

			var getPagination = function (page, total, perpage) {
				var pagination = {};

				pagination.from = (page * perpage - perpage) + 1;
				pagination.to = page * perpage;
				pagination.to = (pagination.to > total) ? total : pagination.to;

				return pagination;
			};

			var applyPagination = function (object) {
				var i, tags = ["LI", "DT", "DD"];

				for (i = 0; i < tags.length; i = i + 1) {
					$(tags[i], newsFeed).each(function (i) {
						if (i >= (object.from - 1) && i <= (object.to - 1)) {
							$(this).show();
						}
						else {
							$(this).hide();
						}
					});
				}
			};

			var updateCurrent = function (current, page) {
				$("LI", paginationContainer).each(function () {
					if ($(this).children("SPAN").size() > 0) {
						$(this).removeClass("current");
						var oldPage = $("SPAN", this).attr("title");
						$(this).children("SPAN").replaceWith($(markup.link(oldPage)));
					}
				});
				$(current).parent().addClass("current");
				$(current).replaceWith($(markup.current(page)));
			};

			var wireEvents = function (total, perpage) {
				$(paginationContainer).delegate("A", 'click', function () {
					var page = $(this).attr("title");
					var object = getPagination(page, total, perpage);

					updateCurrent(this, page);
					applyPagination(object);

					return false;
				});
			};

			var callback = function () {
				var length = $("LI", newsFeed).size();
				length = (length === 0) ? $("DT", newsFeed).size() : length;
				var perpage = data.perpage || 3;

				if (length > 0) {
					var pages = Math.ceil(length / perpage);
					if(pages > 1){
						injectPagination(pages);
						wireEvents(length, perpage);
						applyPagination({
							from: 1,
							to: perpage
						});
					}
				}
			};

			if (newsFeed.size() > 0) {
				data = newsFeed.metadata({type: 'class'});

				if (data.username !== undefined) {
					data.success = function () {
						callback();
					};
					newsFeed.empty();
					newsFeed.tweet(data);
				}
				else {
					callback();
				}
			}
		}
	}

	ND.selectCurrent = {
		init: function () {

			var $navs = $('#nav, #subnav, #leftnav'),

			getIds = function () {
				$("#breadcrumb LI").each(function (i) {
					if (i !== 0) {
						var id = $(this).attr("id");
						if (id !== undefined) {
							selectPage(id);
						}
					}
				});
			},

			selectPage = function (id) {

				$navs.each(function(){
					var $this = $(this),
						$UL = !$this.is('UL') ? $this.children("UL") : $this;

					$UL.children("LI").each(function (i) {
						var link = $(this).children("A"),
							title = $(this).attr("title"),
							href = $(link).attr("href");

						if (title !== "" && title == id){
							$(this).addClass("current");
							return false;
						}
					});
				});

			};

			getIds();
		}
	};

	ND.delegate = {
		init: function () {

			var simulateNativeAnchor = '_sna';

			$(document)
				.delegate('.clickable', 'click', function(e){
					var $this = $(this);
					if(!$(e.target).is('a,a *')) {
						var a = $this.find("A:eq(0)");
						//Fix [105295] - Can't trigger native event handlers.
						a.trigger('click', simulateNativeAnchor)
					}
				})
				.delegate('a', 'click', function(e, data){
					if($(this).hasClass('external')) {
						window.open(this.href);
						e.stopPropagation();
						e.stopImmediatePropagation();
						e.preventDefault();
					} else if(data === simulateNativeAnchor){
						window.location = this.href;
					}
				});
		}
	};


	ND.gcamp = {

			init:function(){
				if ($('#gcamp').length > 0){
					var gcampForm = $('#gcamp');

					gcampForm.submit(function(){
						if ($('.results').length >0){
					        $('.results').remove();
						}
						var re = new RegExp("[0-9a-zA-Z]{17}");
						if(!re.test($('#vin').val())) {
							$p = $('#message').length > 0 ? $('#message') : $('<p id="message"></p>');
							gcampForm.append($p.addClass("warning").html($('#error-msg').val()));
							return false;
						}
						else{
							return true;
						}
					})
				}
			}
		}

	// Add icons based on the media type (carousel image)
	ND.links = {
		init:function() {

			var types = [
							{selector:"A.external-disclaimer", icon:"ext-icon"},
							{selector:"A.video-indicator", icon:"video-icon"}
						];

			$.each (types, function(i, type){
				$(type.selector).each(function(){
					var $this = $(this);

					//Ensure the UI updates are queued (subtle rather than blocking)
					setTimeout(function(){

						//check parents for context.
						if ($this.closest('.ei-enabled').size() > 0) {

							//if child is IMG then icon sits over the top of it
							if ($this.children("IMG").size()) {
								$this.addClass('img-external');
							}

							//if child is a span, then insert into it, not adjacent.
							if ($this.children("SPAN").size()) {
								$this = $this.children("SPAN").first();
							}
							$this.append("<span class='" + type.icon + "'></span>");
						}
					}, 20);
				});
			});
		}
	};

	ND.floatHeader = {
		init:function() {
			if(!$(".features-grid").size()) {return;}

			var $floatHeader = $("div.package-titles");
			var $floatHeaderClone = $floatHeader.clone();
			$floatHeader.before($floatHeaderClone.hide());
			$floatHeaderClone.addClass("floatingHeader");

			$(window).scroll(function(){
				var scrollTop = $(window).scrollTop();
				var offset = $floatHeader.offset();
				//console.log(offset);
				//console.log(scrollTop);
				if((scrollTop > offset.top) ){

					$floatHeaderClone.show();
				}else{
					$floatHeaderClone.hide();

				}

			});
		}
	};

	ND.accordionModule = {
		init:function() {
			if(!$(".accordion-active").size()) {return;}

			$("div.accordion-active > UL > LI > DIV.dropdown").hide();
			$("div.accordion-active > UL > LI.active > DIV.dropdown").show();

			$("div.accordion-active > UL > LI > DIV.tab-area").click(function(){
				var $this = $(this);
				if(!$this.parent("li").hasClass("active")){
					$this.next("div.dropdown").slideDown(200);
					$this.parent("li").addClass("active");
				}else{
					$this.next("div.dropdown").slideUp(200);
					$this.parent("li").removeClass("active");
				}
			});
		}
	};




























	ND.filterTableModule = (function () {

		var $selectFilter;
		var paginationPageCount;

		var slider;
		var $campaignNav;

		var $sliderNext;
		var $sliderPrev;

		var $dataRows;

		var $dealerNetworkArticle;

		var __options;

		var module = {
			init: init
		};

		return module;

		////////////////////////////////

		function init() {

			$dealerNetworkArticle = $('#dealer-network-article').length
										? $('#dealer-network-article')
										: $('#cn-dealer-network');

			if(!$('.campaign-article').length && !$dealerNetworkArticle.length) {
				// Don't initialize ND.filterTableModule if
				// .campaign-table is not present on page
				return;
			}

			$selectFilter = $('select.campaign-filter');

			$campaignNav = $('.campaign-slider-nav');
			$dataRows = $campaignNav.find('ul').slice(); // create a copy of rows

			$sliderNext = $('.campaign-slider-next');
			$sliderPrev = $('.campaign-slider-prev');

			if ($dealerNetworkArticle.length) {
				$campaignNav.on('article-added', setDealerNetworkProvinceColumnStyle);
			}

			populateSelectBoxOption();

			/////////////////////////
			/// Set event listeners
			$selectFilter.on('change', filterTableOnChanged);

			// init slider
			generateTable();
		}

		function generateTable() {

			setPaginationPageCount();
			explodeListToArticle();

			if (slider != null) {
				slider.reloadSlider({
					controls: true,
					infiniteLoop: false,
					nextSelector: '.campaign-slider-next',
					prevSelector: '.campaign-slider-prev',
					nextText: '&gt;',
					prevText: '&lt',
					pager: true,
					pagerType: 'short',
					onSlideAfter: showHidePaginationArrow
				});
			} else {
				slider = $campaignNav.bxSlider({
					slideWidth: 960,
					infiniteLoop: false,
					controls: false,
					pager: false,
					onSlideAfter: showHidePaginationArrow
				});
			}

			showHidePaginationArrow();

		}

		/**
		 * Show only 1 province in Province column per Article
		 * Remove the border in other Province row
		 */
		function setDealerNetworkProvinceColumnStyle(event, $dataList) {
			if ($dealerNetworkArticle != null) {

				var isFirstRowInGroup, isLastRowInGroup;
				var $row, $prevRow;
				var $firstColumn;

				$.each(getOptions(), function(i, val) {

					$dataList.each(function(rowIndex, row) {

						isFirstRowInGroup = rowIndex === 0;
						isLastRowInGroup  = rowIndex === $dataList.length - 1;

						$row = $(row);
						$prevRow = $row.prev();

						if (isFirstRowInGroup) {
							$row.find('li').first().addClass('bottom-less').find('p').show();
						} else if ($prevRow.data('group') === val && $row.data('group') === val) {
							$prevRow.find('li').first().addClass('bottom-less');
							$row.find('li').first().find('p').hide();
						}

						if (isLastRowInGroup) {
							$row.find('li').first().removeClass('bottom-less');
						}

					});

				});

			}
		}

		function showHidePaginationArrow() {
			var pagerText = $('.bx-pager').text();

			$('.campaign-slider-prev, .campaign-slider-next').show();

			var isOnFirstColumn = paginationPageCount === 1 || pagerText.charAt(0) === '1';
			var isInLastColumn = pagerText.match(new RegExp(pagerText.charAt(0), 'g')).length == 2;

			if (isOnFirstColumn) $sliderPrev.hide();
			if (isInLastColumn)  $sliderNext.hide();
		}

		/**
		 * Put every 6 uls inside an article
		 */
		function explodeListToArticle() {

			var articleSet = [];
			var $rows = $campaignNav.find('ul');

			for(var i = 0; i < paginationPageCount; i++) {
				articleSet.push($rows.slice(i * 6, (i + 1) * 6));
			}

			// Add article with 6 row content
			$.each(articleSet, function(index, dataList) {
				$campaignNav.append($('<article/>').append(dataList));
				$campaignNav.trigger('article-added', [dataList]);
			});
		}

		function populateSelectBoxOption() {
			$.each(getOptions(), function(index, value) {
				$selectFilter.append($('<option />').val(value).text(value));
			});
		}

		/**
		 * Get only the rows content of the selected value.
		 */
		function filterTableOnChanged() {
			var selectedValue = this.value;
			var isDefaultSelected = !selectedValue;

			if (isDefaultSelected) return;

			var filteredRows = $dataRows.filter(function(index, ul) {
				return $.trim($(ul).data('group')) === selectedValue;
			});

			$campaignNav.empty().append(filteredRows);

			generateTable();
		}

		function setPaginationPageCount() {
			var rowsLength = $campaignNav.find('ul').length;
			paginationPageCount = Math.ceil(rowsLength / 6);
		}

		/**
		 * Get options from data-group
		 */
		function getOptions() {

			if (__options != null) return __options;

			__options = [];

			$campaignNav.find('ul').each(function(index, ul) {
				var option = $.trim($(ul).data('group'));
				__options.push(option);
			});

			__options = $.grep(__options, isUniqueOptionOnly);

			return __options;

			////////////////////////////

			function isUniqueOptionOnly(value, index) {
				return $.inArray(value, __options) === index;
			}

		}

	})();

	ND.setColumnWith = {
		init:function() {
			if(!$(".column-unknown").size()) {return;}

			var columnCount = $("div.package-titles table").eq(0).find("th.column-width").size();
			var parentWidth = 960 - $("div.package-titles table").eq(0).find("th.package-icon").outerWidth() - $("div.package-titles table").eq(0).find("th.package-heading").outerWidth();
			var columnWidth = Math.floor(parentWidth/columnCount);

			$("div.column-unknown table th.column-width").width(columnWidth);

			$("div.column-unknown table tr td:last-child, div.column-unknown table tr th:last-child").addClass("last");
		}
	};

	ND.rolloverPopup = {
		init:function() {
			if(!$(".features-grid td div.hidden-content").size()) {return;}

			function getElementLeft(element){
				var actualLeft = element.offsetLeft;
				var current = element.offsetParent;
				while (current !== null){
					actualLeft += current.offsetLeft;
					current = current.offsetParent;
				}
				return actualLeft;
			}

			function getElementTop(element){
				var actualTop = element.offsetTop;
				var current = element.offsetParent;
				while (current !== null){
					actualTop += current.offsetTop;
					current = current.offsetParent;
				}
				return actualTop;
			}

			var popupHTML = "<div style='display:none;' class ='optional-popup'><div class='top'></div><div class='middle'></div><div class='bottom'></div></div>"
			var popupHTMLMirror = "<div style='display:none;' class ='optional-popup-adjust'><div class='top'></div><div class='middle'></div><div class='bottom'></div></div>"
			$('body').append(popupHTML+popupHTMLMirror);

			$(".features-grid td div.hidden-content").each(function(){
				var icon = $(this).prev("span");
				icon.css({"cursor":"pointer"});
			});

			$(".features-grid td span.optional, .features-grid td span.checked,.features-grid td.version-tip span").live("mouseover",function(){

				if($(this).next("div.hidden-content").size() < 1){return;}

				var thisIcon = $(this)[0];
				var leftPosition = getElementLeft(thisIcon);
				var topPosition = getElementTop(thisIcon);
				var browserWidth = $(window).width();
				var rightPosition = browserWidth - leftPosition;
				var popContent = $(this).next("div.hidden-content").html();
				var dValue = 32;
				if($(this).parents("td.version-tip").size() > 0 ){dValue = 2};
				if(rightPosition < 220 && $("body").hasClass("ltr")){

					dValue = 195;

					$("div.optional-popup-adjust div.middle").html(popContent);
					var popHeight = $("div.optional-popup-adjust").height();
					var newTopPosition = topPosition - popHeight;
					var newLeftPosition = leftPosition - dValue;
					var popHeight = $("div.optional-popup-adjust").css({'left':newLeftPosition+'px','top':newTopPosition+'px'}).show();
				}else{
					$("div.optional-popup div.middle").html(popContent);

					var popHeight = $("div.optional-popup").height();
					var newTopPosition = topPosition - popHeight;
					var newLeftPosition = leftPosition - dValue;
					var popHeight = $("div.optional-popup").css({'left':newLeftPosition+'px','top':newTopPosition+'px'}).show();
				}
			});

			$('.features-grid td span.optional, .features-grid td span.checked,.features-grid td.version-tip span').live("mouseleave",function(){
				if($(this).next("div.hidden-content").size() < 1){return;}
				$('div.optional-popup, div.optional-popup-adjust').hide();
				$('div.optional-popup div.middle, div.optional-popup-adjust div.middle').html('');
			});

		}
	};

	ND.syncSlideModule = {
		init:function() {
			if(!$(".content-slider").size()) {return;}

			var pageSum = $("div.content-slider > UL > LI").size();

			$("div.content-slider > UL > LI").each(function(index,value){
				var index = index + 1;
				$(this).find("span.page-current").text(index);
				$(this).find("span.page-sum").text(" / " + pageSum);
			});

			$("div.content-slider > UL").bxSlider({
				pager:true
			});

		}
	};

	ND.alternateLines = {
		init:function() {
			var isIE8 = $.browser.msie && $.browser.version < 9;

			if(!$(".sync-p5").size() && !isIE8) {return;}

			$(".sync-p5 div.searchresults-list div.item:even").addClass("even");

		}
	};

	ND.dropdownLink = {
		init:function() {

			if(!$("div.dropdown-list").size()) {return;}

			$("div.dropdown-list > span.dropdown-list-btn").live("click",function(){
				var $this = $(this);
				if($this.next("ul.dropdown").is(":hidden")){
					$this.next("ul.dropdown").show();
				}else{
					$this.next("ul.dropdown").hide();
				}
			})

			$("div.tab-nav ul li").removeClass("active");
			$("div.tab-nav ul li.syncicon-compatibility").addClass("active");

		}
	};

	ND.sideflowModule = {
		init:function() {

			if(!$("div.sideflow").size()) {return;}

			$("div.sideflow").find("span.btn").click(function(){

				var $sideflow = $(this).parent("div.sideflow");
				if($sideflow.hasClass("active")){

					$sideflow.removeClass("active");
				}else{

					$sideflow.addClass("active");
				}
			})

		}
	};

	ND.videoLoad = {
		init:function() {

			if(!$(".inner-video").size()) {return;}

			var videoConfig = $("#video-config").embeddedData();
			//console.log(videoConfig);


			ND.video.init(videoConfig);


		}
	};

	ND.listClone = {
		init:function() {

			if(!$(".list-table").size()) {return;}

			$("table.list-table").each(function(){
				var $thisTable = $(this);
				var listLengthArr = [];
				$thisTable.find("ul.package-list").each(function(i,v){
					var $thisList = $(this);
					var listLength = $thisList.children("li").size();
					//alert(listLength);
					listLengthArr.push(listLength);
				});

				var maxColumn = Math.max.apply(null, listLengthArr);

				var listCloneContent = "<ul class='package-list'>";

				for(i=0;i<maxColumn;i++){
					listCloneContent = listCloneContent + "<li></li>";
				}

				listCloneContent = listCloneContent + "</ul>";

				$thisTable.find("td.list-clone > div").html(listCloneContent);

				/* apend some empty li tag to the list if its amount of items is less than maxColumn */
				$thisTable.find("ul.package-list").each(function(i,v){
					var $thisList = $(this);
					var itemsAmount = $thisList.children("li").size();
					if(itemsAmount < maxColumn){
						var itemGap = maxColumn - itemsAmount;
						for(i=0;i<itemGap;i++){
							$thisList.append("<li></li>");
						}
					}
				});

				$thisTable.find("ul.package-list li:nth-child(even)").addClass("even");

			});



		}
	};


	ND.lang = {
		init:function(){
			if($("#lang-toggle")){
				$("#lang-toggle").change(function(){
					window.location.href = jQuery("#lang-toggle option:selected").val();
				});
			}
		}
	};

	ND.fblike = {
		load: function() {
			var fblikeButton = $('#facebook-page-like'),
				fblike = fblikeButton.parent(),
				url = window.location.href,
				done;

			//Fade In Social Widgets
			function doneFn() {
				if( !done ) {
					fblike.parent().find('.social-widget').fadeIn(200);
					done = true;
				}
			}

			if( fblikeButton.size() &&  fblike.size() ) {
				fblike.html( fblikeButton.val().replace('##REPLACEURL##', escape(url.split('#')[0]).replace("\/", "%2F", "g") ));
				//Once the facebook like iframe is loaded.. Fade all social widgets in.
				fblike.find('iframe').bind('load', doneFn);
				//Set a timeout incase the face book iframe takes too long.
				setTimeout(doneFn, 2e3);
			}
		}
	};

	function wLoad() {
		ND.fblike.load();
	}

	if( isWindowLoaded ) {
		wLoad();
	} else {
		$(window).bind('load', wLoad);
	}



	$(document).ready(function(){

		if(typeof Number !== 'function'){
			window.Number = function(string){
			return parseInt(string);
			}
		}

		ND.rtl = $('BODY').hasClass('rtl');
		ND.ltr = !ND.rtl;
		ND.flash.init();
		ND.links.init();
		ND.twitter.init();
		ND.selectCurrent.init();
		ND.delegate.init();
		ND.gcamp.init();
		ND.lang.init();
		// moved to app.js
		// ND.syncVersionManager();
		ND.floatHeader.init();
		ND.accordionModule.init();
		ND.filterTableModule.init();
		ND.setColumnWith.init();
		ND.rolloverPopup.init();
		ND.syncSlideModule.init();
		ND.alternateLines.init();
		ND.dropdownLink.init();
		ND.sideflowModule.init();
		ND.videoLoad.init();
		ND.listClone.init();



		/******************************************
		1. Tech section tiles layout and filering
		2. Poping up the full-screen overlay by clicking tile images
		3. HTML5 history API is used for mordern browers
		4. jQuery BBQ is used for IE
		 *******************************************/
	$(function(){

		if ($(".tech-section").length > 0){
			var tiles = techTiles().init();
		}


		$(".fullscreen-overlay").fullScreenOverlay();

		var overlayId = "fullscreen-overlay",
			location = window.location.toString(),
			index = location.indexOf(overlayId);

		if ( index > -1 ){
			var url = location.substring(index + overlayId.length + 1);
			url = decodeURIComponent(decodeURIComponent(url));
			// url = decodeURI(url);

			var cid = url.match(/cid=\d+/);
			if (Modernizr.history){
				history.pushState(null,overlayId,location.substring(0,index-1));

			}


			// $("a[href*='"+cid+"']").trigger('click');
			var $link = $("a[href*='"+cid+"']");
			$link[0].click();

		}

	});

	});


	//Protect from missing LAB/loader script.
	if(window['$wait'] === undefined) {
		window['$wait'] = function(fn){
			fn();
		}
	}

})(jQuery, window);


(function($){

	var exp = /^[a-zA-Z0-9#\s.\-_\u0081-\uFFFF]+$/;

	$("form#dragonflyform").submit(
		function(){
			var doSubmit = true;
			$("input.validate-simple").each(function(i){
				var strVal = $(this).val();
				if(strVal.length > 0 && !strVal.match(exp)){
					$(".validate-simple-msg").css("display","inline").fadeOut(2000);
				    $(this).focus();
					doSubmit = false;
				}
			});
			return doSubmit;
		}
	);

	// derivative dropdown
	$(function(){

		var changemodel = $('#changemodel'),
			el = changemodel.find('ul')
			dropdownopen = false,
			speed = 100;

		//On Click
		changemodel.click(function(e){
			if( !dropdownopen ) {
				el.slideDown(speed, function() {
					dropdownopen = true;
				});
			} else {
				el.slideUp(speed, function() {
					dropdownopen = false;
				});
			}
		});

		//On Blur
		$(document).click(function(){
			dropdownopen && el.slideUp(speed, function() {
				dropdownopen = false;
			});
		});

		// handsets select
		var brandItem = $(".handsetcat");
		if (brandItem.length){
			var $modellist = $(".model-select ul");
			for(var idx = 0; idx < brandItem.length; idx++){
				var $thisTitle = $(".title h3", $(brandItem[idx]));
				var brandAnchor = "#" + $(brandItem[idx]).attr("id");

				var $item = $("<li></li>").append(
					$("<a>"+$thisTitle.text()+"</a>").attr({
						href : window.location.href.indexOf(brandAnchor) < 0 ? window.location + brandAnchor : window.location,
						title : $thisTitle.text()
			})
				);

				$modellist.append($item);
			}

			var selectAction = function(selectItem){
				selectItem.addClass("selected");

				/*if (selectItem.attr("href") == "#viewall"){
					//$(".handsets .handsetcat").show();
				}else{*/
					//to fix Media and Phone Page

//1/ Remove current js, which set the filter value on media and phone page
//http://www.ford.com.au/sync/using-sync/handset-compatibility?v=101#Huawei

					//$(".handsets .handsetcat").hide();
					//var url = selectItem.attr("href");
					//url = url.substring(url.lastIndexOf("#"));
					//$(url).show();
				/*}*/

				var url = selectItem.attr("href");
				url = url.substring(url.lastIndexOf("#"));
				//console.log("url:"+url);
				var new_position = $(url).offset();
                window.scrollTo(new_position.left,new_position.top);

				//console.log($(selectItem));
				$(".model-select > span").replaceWith("<span>"+selectItem.text()+"</span>");
			};

			$(".model-select ul li a").click(function(e){
				var selectItem = $(this);
				$(".model-select ul li a").removeClass("selected");
				selectAction(selectItem);
				el.slideUp(speed, function() {
					dropdownopen = false;
				});
				e.stopPropagation();
			});

			$(window).bind("hashchange", function(e){
				var hash = window.location.hash;
				if (hash == ''){
					$(".handsets .handsetcat").show();
					//$(".model-select > span").replaceWith("<span>Change Model</span>");
					$(".model-select ul li a").removeClass("selected");
				}else{
					//var titleValue = hash.replace( "#", '' );
					//console.log($(".model-select ul li a[href='" + hash + "']"));
					$(".model-select ul li a[href$='" + hash + "']").trigger("click");
				}
			});
			//$(window).trigger( 'hashchange' );

		}else{
			changemodel.hide();
		};
		if (!$(".handsets").length > 0){
			changemodel.show();
		}
	});

	// clear inputs with the class "clearme"
	$(function(){
		$('input.clearme').focus(function(){
			var inputVal = $(this).attr('title');
			$(this).blur(function(){
				if ($(this).val() === '') {
					$(this).val(inputVal);
				}
			});
			if ($(this).val() === '' || $(this).val() === inputVal) {
				$(this).val('');
			}
		});
	});

	$(function(){
		// popup window
		$(".popup").popupWindow({
			fullscreen: true
		});

	});

	$(function(){
		// accordion-container
		$(".accordion-container .item h4").each(function(){
			var hasContent = $(this).next(".content");
			if (hasContent.length > 0){
				$(this).parents(".item").addClass("has-content");
				$(this).click(function(){
					$(this).parents(".item").toggleClass("item-active");
				});
			}else {
				$(this).addClass("disable");
			}
		});

		$(".accordion-container .item h4 a").click(function(e){
			return false;
		});

	});

	$(function(){
		// search-pannel focus func
		$(".search-pannel").each(function(){
			var kw = $(this).find(".keyw");
			var kwVal = kw.val();
			kw.focus(function (){
				$(this).val("");
			});
			kw.blur(function (){
				var newkwVal = kw.val();
				if (newkwVal == ""){
					$(this).val(kwVal);
				}else{
					$(this).val(newkwVal);
				}
			});
		});
	});

	$(function(){
		// form validation
		$("#vehicleown").validate({
			messages: {
				Model: "Please slect your model",
				Series: "Please slect your series",
				LastName: {
					required: "Please enter your lastname"
				},
				FirstName: {
					required: "Please enter your firstname"
				},
				email: "Please enter your email"
			}
		});

	});

	$(function(){
		// sync homepage banner slider
		if(!$("body").hasClass("rotating-banner")){
		$(".slider")
			.ndslider()
			.each(function() {
				var slider = $(this);
				slider.touchwipe({
			        wipeLeft: function() {
						slider.trigger('slidenext');
			        },
			        wipeRight: function() {
			        	slider.trigger('slideprev');
			        }
			    });
			})
		}
	});

	// Feature slider
	$(function(){
		$(".slideshow").touchwipe({
			wipeLeft: function() {
				$('div.jcarousel-next').trigger('click');
			},
			wipeRight: function() {
				$('div.jcarousel-prev').trigger('click');
			}
		})
	});

	$(function(){
		// login
		$(".btn-login").click(function(){
			var $this = $(this);
			$this.toggleClass("btn-loginactive");
			$(".loginform .container").toggle();
			//page url
			var targetUrl = window.location.href;
			var targetUrlIndex;
			var targetUrlParam = "targeturl=";

			//find start & end of parameter targeturl and inject it to hidden field
			if($(".loginform .container").length == 0){


				self.location($this.attr("href"));
			}
			if (targetUrl && (targetUrlIndex = targetUrl.indexOf(targetUrlParam)) > 0 ) {




				var endOfTargetUrl = targetUrl.indexOf("&", targetUrlIndex);
				targetUrl = targetUrl.substring((targetUrlIndex + targetUrlParam.length), (endOfTargetUrl > 0 ? endOfTargetUrl : targetUrl.length));

				//update action
				var form = $("#loginform");
				var loginFormAction = form.attr('action');
				if (loginFormAction != '') {
					form.attr('action', updateTargetUrl(loginFormAction, targetUrl));
				}
				//update registration & forget password links
				$("a.loginform-targeturl-link").each(function() {
					var link = $(this);
					link.attr('href', updateTargetUrl(link.attr('href'), targetUrl));
				});
			}



			return false;
		});

		function updateTargetUrl (origUrl, targetUrl) {
			var targetUrlParam = "targeturl=";
			var targetUrlIndex;
			if ((targetUrlIndex = origUrl.indexOf(targetUrlParam)) > 0) {
				var endOfTargetUrl = origUrl.indexOf("&", targetUrlIndex);
				var linkTargetUrl = origUrl.substring((targetUrlIndex + targetUrlParam.length), (endOfTargetUrl > 0 ? endOfTargetUrl : origUrl.length));
				origUrl = origUrl.replace(linkTargetUrl, targetUrl);
			} else {
				var indexOfQM = origUrl.indexOf("?");
				var targetUrlParamValue = "?" + targetUrlParam + targetUrl;
				origUrl = indexOfQM > 0 ? origUrl.replace("?", targetUrlParamValue + "&") : targetUrlParamValue;
			}
			return origUrl;
		}

        //Feedback: If customers click in the blank part of this website page, this overlay will be folded automatically.
        var $btnlogin = $(".btn-login");
        if($btnlogin.size()){
            $(document).click(function(e){
                //Click inner from the login-form? return back.
                var target = e.target;
                do{
                    if(target.className && target.className.indexOf("loginform") > -1) return;
                }while(target = target.parentNode);

                //click outter from the login-form? Close it.
                $(".loginform .container:visible").size() && $btnlogin.click();
            });
        }
	});


	// add last class on gallery items
	$(function(){
		if ($(".gallery").length != 0){
			var parentWidth =  $(".gallery").width();

			if($("body").hasClass("ltr")){
				parentWidth = parentWidth + parseInt($(".gallery").css("marginLeft"));
			}
			else{
				parentWidth = parentWidth + parseInt($(".gallery").css("marginRight"));
			}

			$(".gallery .item").each(function(){
				var offsetRight = parentWidth - $(this).position().left;
				var itemWidth = $(this).width();

				if($("body").hasClass("ltr")){
					if (offsetRight == (itemWidth+1) || offsetRight == itemWidth){
						$(this).addClass("last");
					}
				}
				else{
					$(this).attr("rel",offsetRight);

					if(offsetRight == (parentWidth-1) || offsetRight == parentWidth){
						$(this).addClass("last");
					}
				}
			});
		}

	});

	//add print function
	$(function(){
		$(".print").click(function(){
			window.print();
		});
	});

	$(function(){
		// Apply classnames odd and even to table rows
		$("TABLE TBODY").find("TR:even").addClass("even").end().find("TR:odd").addClass("odd");
		//eyebrow width hack for IE6 and IE7
		if($.browser.msie){
			if(jQuery.browser.version == "6.0" || jQuery.browser.version == "7.0" ){
				var width = 0;
				$("#eyebrow").children().each(function(){
					width = width + $(this).outerWidth();
				});
				$("#eyebrow").width(width);
			}
		};
	});



})(jQuery);
