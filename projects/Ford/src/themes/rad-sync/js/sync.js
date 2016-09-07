(function($){
	
	var sync={
		init:function(){
			var self=this;
			self.repaginationpd(".searchresults-list .pagination");
			self.syncinstruction();
			self.syncmultipleSlideModule();
			self.resaultEven();
			self.highlightSyncPage();
			//self.tabActivation();  //moved to app-link.js
		},
		
		repaginationpd:function(elm){
			var eul=$(elm),
			    liitem=$("li",eul),
				lisize=liitem.size(),
				firstwid=liitem.eq(0),
				lastwid=liitem.eq(lisize-1),
				totalwid=0,
				previtem=$("li.prev",eul),
				nextitem=$("li.next",eul);
			
			$.each(liitem,function(i){
				
					if((!liitem.eq(i).hasClass("prev")) && (!liitem.eq(i).hasClass("next"))){
						totalwid+=1;
					}
				})
			totalwid=totalwid*30+(previtem.outerWidth(true)*1.5)-18;
			if($('body').hasClass("rtl")){
				if(!$("form",firstwid).size()){
					firstwid.css({"margin-right":((eul.width()-totalwid)/2+"px")});
				}else{
					firstwid.css({"margin-left":((eul.width()-totalwid)/2+"px")});
				}
			} else {
				if(!$("form",firstwid).size()){
					firstwid.css({"margin-left":((eul.width()-totalwid)/2+"px")});
				}else{
					firstwid.css({"margin-right":((eul.width()-totalwid)/2+"px")});
				}
			}
			
			$(window).resize(function(){
				if($('body').hasClass("rtl")){
					if(!$("form",firstwid).size()){
						firstwid.css({"margin-right":((eul.width()-totalwid)/2+"px")});
					}else{
						firstwid.css({"margin-left":((eul.width()-totalwid)/2+"px")});
					}
				} else {
					if(!$("form",firstwid).size()){
						firstwid.css({"margin-left":((eul.width()-totalwid)/2+"px")});
					}else{
						firstwid.css({"margin-right":((eul.width()-totalwid)/2+"px")});
					}
				}
				

			})
		},syncinstruction:function(){
			var self=this;
			self.initsmobinstruction();
			$(window).resize(function(){
				self.initsmobinstruction();
				
			})
		},
		smobslidershow:false,
		smobsilder:{},
		removepagercss:function(){
			$("#instruction a.bx-next").removeClass("disabled");
			$("#instruction a.bx-prev").removeClass("disabled");
		}
		,initsmobinstruction:function(){
			var sliderul=$(".accordion-panel #instruction"),
			    sliderli=$("li",sliderul),
			    sliderlidiv=$(">div",sliderli),
			    imgdiv,
			    infodiv,
			    self=this,
			    imgslider,
			    isslider=false;
			if(!sliderul.size()) {return;}
			sync.isMobile = $("body").hasClass("smobile");
			sync.isDesktop = $("body").hasClass("desktop");   
			
			 
			if(self.isMobile==true){
				//switch elm sort
				$.each(sliderli,function(i){
					imgdiv=$("#img",sliderli.eq(i));
					infodiv=$("#info",sliderli.eq(i));
					imgdiv.before(infodiv);
				})
				
				if(self.smobslidershow==false){
					self.smobsilder = $("#instruction .bxslider").bxSlider({
						mode:"fade",
						pagerType:"short",
						adaptiveHeight: true,
						infiniteLoop:false,
						onSlideNext:function(){
							
							var curindex=parseInt(self.smobsilder.getCurrentSlide())+1;
							var totalnum=parseInt(self.smobsilder.getSlideCount());
							self.removepagercss();
							if(curindex==totalnum){
								$("#instruction a.bx-next").addClass("disabled");
							}
						},
						onSlidePrev:function(currentIndex){
							
							var curindex=parseInt(self.smobsilder.getCurrentSlide());
							self.removepagercss();
							if(curindex==0){
								$("#instruction a.bx-prev").addClass("disabled");
							}else{
								
							}
						},onSliderLoad:function(currentIndex){
							var curindex=parseInt(currentIndex);
							self.removepagercss();
							if(curindex==0){
								$("#instruction a.bx-prev").addClass("disabled");
							}
						}
						
					})
					self.smobslidershow=true;
				}
				
				
			}else{
				
				if(self.smobslidershow==true){
					
					self.smobsilder.destroySlider();
					self.smobslidershow=false;
				}
				$.each(sliderli,function(i){
					imgdiv=$("#img",sliderli.eq(i));
					infodiv=$("#info",sliderli.eq(i));
					infodiv.before(imgdiv);
				})
				
			}
		},syncmultipleSlideModule:function(){
			
			if(!$(".content-slider").size()) {return;}

			var pageSum = $("div.content-slider > UL > LI").size();

			$("div.content-slider > UL > LI").each(function(index,value){
				var index = index + 1;
				$(this).find("span.page-current").text(index);
				$(this).find("span.page-sum").text(" / " + pageSum);
			});

			$("div.content-slider > UL").bxSlider({
				mode:"fade",
				adaptiveHeight: false,
				onSliderLoad:function(){sync.reposcsldctr();},
				onSlideNext:function(){sync.reposcsldctr();},
				onSlidePrev:function(){sync.reposcsldctr();}
			});
			

		},reposcsldctr:function(){
			if(!$(".content-slider").size()) {return;}
			var cspager=$(".content-slider .bx-pager.bx-default-pager"),
				prenext=$(".content-slider .bx-wrapper .bx-controls-direction"),
				bximg=$(".content-slider .bx-wrapper .image"),
				bxtext=$(".content-slider .bx-wrapper .text"),
				bxsli=$(".content-slider .bx-wrapper .bx-viewport"),
				bxcontrols=$(".content-slider .bx-controls"),
				mheight=-(bxsli.height());
				bxcontrols.css({"top":mheight});
				prenext.css({"height":bxsli.height()});
				cspager.css({"height":bxsli.height()});
				$(window).resize(function(){
					mheight=-(bxsli.height());
					bxcontrols.css({"top":mheight});
					prenext.css({"height":bxsli.height()});
					cspager.css({"height":bxsli.height()});
				})
		},resaultEven:function(){
			/*var isIE8 = $.browser.msie && $.browser.version < 9;
			
			if(!isIE8) {return;}*/
			
			$("div.searchresults-list div.item:even").addClass("even");
		},highlightSyncPage:function(){
			if($("body").hasClass("highlightsync")){
				var syncspan="span.icon-talk",
					primaryli=$(".primary-nav li");
				$.each(primaryli,function(i){
					if($(syncspan,primaryli.eq(i)).size()>0){
						primaryli.eq(i).addClass("active");
					}
				})
				
			}
		}
	    ////activate current tab, show/hide related tab content         //moved to app-link.js
		//tabActivation : function() {
		//	if($(".appLink-content").length>0){//if appLink page
		//		var _tab = $(".appLink-content .tab-con");
		//		var _content =  $(".appLink-content .tab-content");
		//		_tab.on("click",function(){
		//			var _currentTab = $(this);
		//			if(!_currentTab.hasClass("current")){
		//				_tab.removeClass("current");//remove "current" state from tab field
		//				_content.children(".appLink-accordion-panel").removeClass("current");//remove "current" state to hide all the content
		//				_currentTab.addClass("current");//add "current" to clicked tab field
		//				_content.children(".appLink-accordion-panel:eq("+_currentTab.index()+")").addClass("current");//add "current" state to show related content
		//			}
		//		})
		//	}
		//}
	};
	$(function(){
		
		sync.init();
	});
})(jQuery);