/*
 * Description: B299 Experience
 * Project: B299
 * Author: Biao Qu
 */
ND.Experienceb299 = (function($,Number, undefined){

    Experienceb299 = {
    
        init: function(){
        
        
            var self = this;
			
			//self.removeVideo();
			
			$(".experienceb299 #hotspot>#video-inner").remove();
			$wait(function(){ 
			
			//self.ckvideoready();
			self.pageGuide();
			
			})
           
			
            
        },
		initcssthing:function(){
			
			
			
		},
		isclickvideo:false,
		ckvideoready:function(){
			var self=this;
			var isckvideono=setInterval(function(){
				
				if(typeof jwplayer!== 'undefined'){
					
					clearInterval(isckvideono);
					self.removeVideo();
					
					
					
				}
			},10);
			
		}
		,
		initLanding:function(){
			var self=this;
			
			$('.kwicks').kwicks({
                    size: 231,
                    maxSize : 372,
					//minSize:231,
					duration:500,
                    spacing : 0,
                    behavior: 'menu',
					easing:'swing',
					autoResize:false
                });
				
			$(".video-indicator").bind("click",function(){
            
			   
					self.removeVideo();
					
					
				
			})
			$('.kwicks').on('expand.kwicks', function(e, data) {
				var curentget=$(".kwicks li").eq(data.index);
				
				
			})
			
			
			
			$('.kwicks>li').hover(function(){
					
                if ($(this).index() != 0) {
                    $(this).addClass("hover");
                    $('.kwicks>li').eq($(this).index() + 1).addClass("hover");
                }else{
					
					$('.kwicks>li').eq($(this).index() + 1).addClass("hover");
				}
				
				$('.kwicks>li').removeClass("active");
				self.updateLdHoverdir($(this).index());
			},function(){
				
				$('.kwicks>li').removeClass("hover");
				self.kwicksactive();
				//self.updatekwiksDir(self.timezone);
			})
			
			$(".kwicks>li").live("click",function(){
				
				if(self.hasClickedLi==false){
				self.hasClickedLi=true;
				self.initSilderPage($(this).index());
				
				}
			})/*end click*/
			
			self.kwicksactive();
			
			///goto deep link page
				
            var pagelink = window.location.href;
            if (pagelink.indexOf("#expage") != -1) {
            
               self.isdeeplink = true;
			   self.gotoDeeplink();
               
            }
            else {
            
                self.isdeeplink = false;
            }
				
			
			
			
		}
		,
		hasClickedLi:false
		,
		updateLdHoverdir:function(index){
		
		  var selectedindex=$(".kwicks-selected").index();
		  if(selectedindex==1 || selectedindex==2){
		     if(index>selectedindex){
			 
			 $(".kwicks-selected .pagetip>img").css({"float":"right"});
			 
			 }else if(index<selectedindex){
			 
			 $(".kwicks-selected .pagetip>img").css({"float":"left"});
			 
			 }
		  }
		}
		,
		initSilderPage:function(index){
			var self=this;
			$('.kwicks>li').removeClass("active");
            $('.kwicks>li').eq(index).addClass("active");
				
			self.timezone=index;
			
             //$('.kwicks>li').unbind("hover");
			self.initbxslider();
			self.showSilderPage();
			self.updatekwiksDir(index);
		}
		,
		showSilderPage:function(){
			var self=this;
			var deepsetInterval = window.setInterval(function(){
               
                if (self.isloaded === true) {
                    window.clearInterval(deepsetInterval);
                    $("#leftanimate").animate({
                        "top": "-580px"
                    }, 500, function(){
                        $(".experienceb299 #pager").show();
                        
                    });
                }
                
            }, 100)
			
			
			
		}
		,
		kwicksactive:function(){
			
			$(".kwicks>li").each(function(index){
				
				if($(".kwicks>li").eq(index).hasClass("kwicks-selected")){
					
					$(".kwicks>li").eq(index).addClass("active");
					$(".kwicks>li").eq(index+1).addClass("active");
				}
				
			})
		}
		,
		updatekwiksDir:function(index){
			
			$(".kwicks>li").removeClass("right");
			
            
            if (index == 3) {
            
                //$(".kwicks>li").eq(2).addClass("right");
                $(".kwicks>li").eq(3).addClass("right");
                
            }
            else if (index == 2) {
                $(".kwicks>li").eq(3).addClass("right");
                
                }
                else if (index == 1) {
                        $(".kwicks>li").eq(2).addClass("right");
                        $(".kwicks>li").eq(3).addClass("right");
                    }
                    else if (index == 0) {
                            $(".kwicks>li").eq(1).addClass("right");
                            $(".kwicks>li").eq(2).addClass("right");
                            $(".kwicks>li").eq(3).addClass("right");
                            
                        }
		},
        pageIndex: Number = 0,
        thumbIndex: Number = 0,
        thumbgroupIndex: Number = 0,
        slider: {},
        deepthumb: {},
        dtgroup: {},
        isdeeplink: false,
        ispreClick: false,
        isloaded: false,
        isend: false,
        isfirst: false,
        contentslider: {},
		epreslider:{},
        isNext: false,
        isPre: false,
		timezone:Number=0
		,
		gototilePage:function(){
			var self=this;
			//self.initbxslider();
			$(".experienceb299 .kwicks").fadeOut(function(){
				
				$(".experienceb299 .kwicks").remove();
			});
			
			$(".experienceb299 #titleslider").fadeIn();
			
			
			
			
			
		},
        initbxslider: function(){
        
            var self = this;
            
            self.slider = $('#titleslider').bxSlider({
            
                mode: "vertical",
                pager: false,
                controls: false,
                preloadImages: 'all',
                //easing:"ease",
				touchEnabled:false,
				startSlide:self.timezone,
                onSlideAfter: function(){
                
                    
					
					var currentcs = self.slider.getCurrentSlide() + 1;
                    var elmts = $("#contentslider", $(this));
					
					//$(".experienceb299 #hotspot").hide();
					
                    $("#sliderconatiner>div.bx-wrapper>div.bx-controls>DIV.bx-controls-direction").hide();
                    
                    /*if (self.contentslider.destroySlider) {
                        self.contentslider.destroySlider();
                    }
					
                    self.initcontentslider(currentcs);*/
					if (self.epreslider.destroySlider) {
                        self.epreslider.destroySlider();
                    }
					self.ispagerclicked=false;
					self.updatepager();
					self.pageIndex=self.slider.getCurrentSlide();
					
					
					///switch thumbs on top charome fix
					var ctspre=self.contentslider.parent().parent().parent();
					var ctwrap=self.contentslider.parent().parent();
					$(".thumbs",ctspre).before(ctwrap);
					$(".experienceb299 .thumbs").show();
					$("#sliderbtnsnext").show();
					$("#sliderbtnspre").show();
;					self.buildeeplink();

                },
                onSlideBefore: function(){
                    
                    //self.removeVideo();
					$("#sliderbtnsnext").hide();
					$("#sliderbtnspre").hide();
					$("#sliderbtnspre .bx-prev").remove();
					$("#sliderbtnsnext .bx-next").remove();
					$(".experienceb299 .thumbs").hide();
					$(".experienceb299 #hotspot").unbind("hover");
					
                    $("#sliderconatiner>div.bx-wrapper>div.bx-controls>DIV.bx-controls-direction").show();
                    var currentcs = self.slider.getCurrentSlide() + 1;
                    /*if (self.contentslider.destroySlider) {
                        //self.contentslider.destroySlider();
                    }*/
					self.epreslider=self.contentslider;
					self.pageIndex=self.slider.getCurrentSlide();
                    self.initcontentslider(currentcs);
					
                },
                onSliderLoad: function(){
                    
                    var currentcs = parseInt(self.slider.getCurrentSlide()) + 1;
                    var elmts = $("#contentslider", $(this));
                    self.pageIndex=self.timezone;
					self.initpager();
                    self.initcontentslider(currentcs);
                    
					
                   
					
                },
                onSlidePrev: function(){
                   
                    self.isNext = false;
                    self.isPre = true;
                    
                   
                },
                onSlideNext: function(){
                
                   
                    
                   //$(".pageitem").show();
                    self.isNext = true;
                    self.isPre = false;
                }
                
            })
        },
		ispagerclicked:false,
		initpager:function(){
			var self=this;
			
			var pageritem="<li></li>";
			$(".experienceb299 #pager li").remove();
			
			for(var i=0;i<self.slider.getSlideCount();i++){
				
				$(".experienceb299 #pager").append(pageritem);
			}
			self.updatepager();
			$(".experienceb299 #pager>li").click(function(e){
			  
               if (($(e.currentTarget).hasClass("active") == false) &&  (self.ispagerclicked==false)) {
			    self.ispagerclicked=true;
			   	$(".thumb>span").removeClass("active");
			   	$(".thumb .rollstate").removeClass("active");
			   	$(".experienceb299 #hotspot").hide();
			   	//$(".pageitem").show();
				self.removeVideo();
				self.slider.goToSlide(parseInt($(this).index()));
				
				}
			})
			$(".experienceb299 .logo").click(function(){
				if (self.slider != {}) {
                        self.slider.destroySlider();
                    }
				if (self.contentslider !={}) {
                        self.contentslider.destroySlider();
                    }
				self.removeVideo();
				//unbind event
				$(".experienceb299 #hotspot").unbind("hover");
				$(".experienceb299 #hotspot .video").unbind("click");
				$("#e299videooverlay .close").unbind("click");
				$(".thumb").unbind("click");
				$(".experienceb299 .bx-prev").unbind("click");
				$(".experienceb299 .bx-next").unbind("click");
				$(".experienceb299 #pager>li").unbind("click");
				$(".experienceb299 .logo").unbind("click");
				$(".experienceb299 #hotspot").unbind("mouseover");
				$(".experienceb299 #hotspot").unbind("mouseleave");
				$("#sliderbtnspre .bx-prev").remove();
				$("#sliderbtnsnext .bx-next").remove();
				$(".experienceb299 #hotspot .video>a").unbind("click");
				//
				$("#leftanimate").animate({
                        "top": "0px"
                    }, 500,function(){
					
					self.hasClickedLi=false;
					self.ispagerclicked=false;
					$(".experienceb299 #pager").hide();
					self.removedeepLink();
					//self.slider.destroySlider();		
					//self.contentslider.destroySlider();	
					
					self.isloaded=false;
                    
                    self.thumbIndex = 0;
                    self.thumbgroupIndex = 0;
                    //self.slider = {};
                    self.deepthumb = {};
                    self.dtgroup = {};
                    self.isdeeplink = false;
                    self.ispreClick = false;
                    self.isloaded = false;
                    self.isend = false;
                    self.isfirst = false;
                    //self.contentslider = {};
                    self.isNext = false;
                    self.isPre = false;
                    //self.timezone = 0;
					
					});
				
			})
			
			
		},
		updatepager:function(){
			var self=this;
			
			var currentPager = self.slider.getCurrentSlide();
			
			$(".experienceb299 #pager>li").removeClass("active");
			$(".experienceb299 #pager>li").eq(currentPager).addClass("active");
			
		},
		clicktrack:function(elment){
                
                    $omidata = $(elment);
                    var $opname = $omidata.attr("data-pname");
                    var $oname = $omidata.attr("data-name");
                    var $otype = $omidata.attr("data-type");
                    var $oclick = $omidata.attr("data-onclicks");
                    var $ohier = $omidata.attr("data-hier");
					var $otool = $omidata.attr("data-tool");
					var $otooldesc = $omidata.attr("data-tooldesc");
                    
                    ND.analyticsTag.trackOmniturePage({
                        pname: $opname,
                        hier: $ohier,
                        onclicks: $oclick,
                        type: $otype,
                        name: $oname,
						tool: $otool,
						tooldesc:$otooldesc
                    });
                    
                
         }
		,
        initcontentslider: function(elmts){
            var self = this;
            
            var ctsld = $('.contentpage').eq(elmts);
            var ctumbs = $('.thumbs').eq(elmts);
            var startindex = 0;
			var dir="pre";
            if (self.ispreClick === true) {
                startindex = 6;
				dir="next";
				
            }
            else {
                startindex = 0;
            }
			if(self.isdeeplink===true){
			   startindex=self.thumbIndex;
			   self.isdeeplink=false;
			}
			//$(".pageitem").show();
			
			
			
            self.contentslider = ctsld.bxSlider({
                //mode: "horizontal",
                pager: false,
                infiniteLoop: false,
                controls: true,
                preloadImages: 'all',
                startSlide: startindex,
				touchEnabled:false,
				nextSelector:$("#sliderbtnsnext"),
				prevSelector:$("#sliderbtnspre"),
				autoDirection:dir,
                // easing:"ease-in-out",
                onSliderLoad: function(currentIndex){
					
                    $("#sliderconatiner>div.bx-wrapper>div.bx-controls>DIV.bx-controls-direction").hide();
                    
					
					self.initcssthing();
				    self.ispreClick = false;
                    self.isloaded = true;
					
                    self.csliderprevent();
                    self.csnextEvent();
                    self.thumbclickevent();
					self.thumbMouseDownup();
                   
					if(startindex==0){
						
						self.hidepreImgs();
					}
					$(".experienceb299 #hotspot .video").unbind("click touchend");
					
                    self.hotspotevt();
                    //self.removeVideo();
                    self.activeCss();
                    
					self.thumbIndex=startindex;
                    self.buildeeplink();
					$(".experienceb299 #hotspot").show();
					var currentelmts=$(".pageitem",self.contentslider).eq(currentIndex);
					self.clicktrack(currentelmts);
					
                },
                onSlidePrev: function(){
                
                
                },
                onSlideBefore: function(){
				
                self.removeVideo();
				self.activeCss();
                },
                onSlideAfter: function(){
					
                    self.isloaded = false;
					$(".experienceb299 #hotspot").show();
					
                    var CurrentS = (self.contentslider.getCurrentSlide());
                    var SlideC = (self.contentslider.getSlideCount() - 1);
                    
                    if (CurrentS == SlideC) {
                    
                        self.isend = true;
                        
                    }
                    else {
                    
                        self.isend = false;
                    }
                    if (CurrentS == 0) {
                    
                        self.isfirst = true;
						
						self.hidepreImgs();
                    }
                    else {
                    
                        self.isfirst = false;
                    }
                    
                   
                    self.removeVideo();
					
                    self.thumbIndex=self.contentslider.getCurrentSlide();
					self.buildeeplink();
					var currentelmts=$(".pageitem",self.contentslider).eq(self.contentslider.getCurrentSlide());
					self.clicktrack(currentelmts);
                }
            });
            
        },
		thumbMouseDownup:function(){
			
			$(".thumb").bind("mousedown", function(event){
				
				
				$(".rollstate",$(this)).addClass("mousedown");
			})
			
			$(".thumb").bind("mouseup", function(event){
				
				
				
			})
		},
		unbindMouseDown:function(){
			
			$(".thumb").unbind("mousedown");
		}
		,
		hidepreImgs:function(){
			var self=this;
			var prentslider=0;//self.slider.getCurrentSlide();
			
			var precontent=$(".contentpage").eq(prentslider);
			var prelastpage=$(".pageitem",precontent).size()-1;
			var clone1=$(".experienceb299 #titleslider .bx-clone").eq(0);
			
			$(".pageitem",clone1).eq(6).show();
			
			
			
		}
		,
        hotspotevt: function(){
        
            var self = this;
            $(".experienceb299 #hotspot").mouseover(function(e){
                e.stopPropagation();
                e.preventDefault();
				$(".experienceb299 #hotspot").removeClass("noopacity");
				var currenthot = $(this);
				var parenthold=$(this).parent();
				
				var currentindex=$(e.currentTarget).index();
				var $small=$("#small", currenthot);
				var $large=$("#large", currenthot);
				
				if ($small.size() > 0) {
                    currenthot.addClass("noopacity");
					$small.stop(true,true).hide(0,function(){
						$large.fadeIn(500);
					});
                    $("#hotspot", parenthold).stop(true,true).animate({
                        'opacity': 0.4
                    }, 500);
                   
                }
            }
			
			)
			
			$(".experienceb299 #hotspot").mouseleave(function(e){
				e.preventDefault();
				e.stopPropagation();
				
				var currenthot = $(this);
				var $small=$("#small", currenthot);
				var $large=$("#large", currenthot);
				$large.stop(true,true).hide(0,function(){
					$small.fadeIn(500);
				});
				
				$(".experienceb299 #hotspot").stop(true,true).animate({
                    'opacity': 1
                }, 500);
			})
			
			
            ///video event
            $(".experienceb299 #hotspot .video>a").bind("click touchend"),function(e){
				e.preventDefault();
				e.stopPropagation();
                
				
			}
            $(".experienceb299 #hotspot .video").bind("click touchend", function(e){
                e.preventDefault();
				e.stopPropagation();
				
				var overlaydiv = '<div id="overlay-ex299"><div id="e299videooverlay">'+'<span class="bg"></span>'+
				'</div></div>';
				var sharebtn=$("#b299videoshare");
				var videodiv='<div id="videopanel"><span class="close"></span><div id="video-inner" class="video inner-video"></div></div>';
                
				var parentDIV =$(".experienceb299 #pager");
				
				var videoConfig = $(".video-config", $(this).parent()).embeddedData();
                self.removeVideo();
				
				var disccont=videoConfig["disclaimer"];
				
				if(typeof disccont === 'undefined'){
					
					disccont="";
				}
				var disclamerp="<p>"+disccont+"</p>"
				$("#e299videooverlay").hide();
				
				
				var exp299overlay=$(".experienceb299 #overlay-ex299");
				
				if(exp299overlay.size()>0){
					
					exp299overlay.remove();
				}
				var ex299vpanel=$(".experienceb299 #videopanel");
				if(ex299vpanel.size()>0){
					
					ex299vpanel.remove();
				}
				var ex299shareDIV=$(".experienceb299 #b299videoshare");
				if(ex299shareDIV.size()>1){
					
					ex299shareDIV.remove();
				}
				var panelpc=$("#videopanel>p");
				if(panelpc.size()>0){
					panelpc.remove();
				}
				
                parentDIV.after(overlaydiv);
				
				$("#e299videooverlay").css({"top":"-700px",'opacity': 0}).show().animate({"top":"0px",'opacity': 1},500,"easeOutQuart",function(){
				
				$("#overlay-ex299").css({"overflow":"visible"});
				parentDIV.after(videodiv);
				$("#videopanel .close").before($(sharebtn).clone());
				$("#videopanel #b299videoshare").before(disclamerp);
                ND.video.init(videoConfig);
				self.videoConrolevnt();
				self.isclickvideo=true;	
				});;
				
                
                
            })
            
        },
		videoConrolevnt:function(){
			var self=this;
			
			
			$("#videopanel .close").click(function(){
					
					$("#overlay-ex299").css({"overflow":"hidden"});
					$("#videopanel").remove();
					$("#e299videooverlay").animate({"top":"-700px",'opacity': 0},500,"easeOutQuart",function(){
						
						$("#overlay-ex299").remove();
						self.removeVideo();
					})
					
					
				});
		}
		,
        activeCss: function(){
        
            var self = this;
            var sindex = parseInt(self.slider.getCurrentSlide()) + 1;
			
			
            var csindex =self.contentslider.getCurrentSlide().toString();
            var csld = $(".experiencepage #contentslider").eq(sindex);
            var ctarget = $(".thumb", csld).eq(csindex);
            $(".thumb>span").removeClass("active");
            $(".thumb>span").removeClass("prechild");
            $(".thumb .rollstate").removeClass("active");
            $(".thumb .rollstate").removeClass("mousedown");
            $(".thumb>span", csld).eq(parseInt(csindex)+1).addClass("prechild");
            
            $(">span", ctarget).addClass("active");
            $(".rollstate", ctarget).addClass("active");
            
            
            ctarget.unbind("mousedown");
            
            
        },
        thumbclickevent: function(){
            
            var self = this;
            $(".thumb").bind("click", function(event){
                event.preventDefault();
                event.stopPropagation();
				
                var $target = $(this);
                var sindex = $("a", $target).attr("data-slide-index");
				self.thumbMouseDownup();
                $target.unbind("mousedown");
                self.isloaded = false;
                
                
                self.contentslider.goToSlide(sindex);
                var CurrentS = (parseInt(self.contentslider.getCurrentSlide()));
                var SlideC = (self.contentslider.getSlideCount() - 1);
                
				if (CurrentS == SlideC) {
                
                    self.isend = true;
                    
                }
                else {
                
                    self.isend = false;
                }
            })
            
        },
        csnextEvent: function(){
            var self = this;
            
            $(".experienceb299 .bx-next").bind("click", function(){
				self.removeVideo();
				var isgocontent=true;
				
                if ((self.contentslider.getCurrentSlide() == (self.contentslider.getSlideCount() - 1)) && (self.isloaded == true)) {
                
				    isgocontent=false;
                    self.isNext = true;
                    self.isPre = false;
                    self.slider.goToNextSlide();
                   
                }
				
				if (self.isend == true) {
                    isgocontent=false;
                    self.isNext = true;
                    self.isPre = false;
                    self.slider.goToNextSlide();
                    self.isend = false;
                    self.isfirst = false;
                    
                }
				
				
				
				
            })
            
            
            
        },
        csliderprevent: function(){
            var self = this;
            
            
            $(".experienceb299 .bx-prev").bind("click", function(){
				self.removeVideo();
				var gocontent=true;
				
                if (self.contentslider.getCurrentSlide() == 0 && self.isloaded == true) {
                
				    gocontent=false;
                    self.ispreClick = true;
                    self.isNext = false;
                    self.isPre = true;
					
                    self.slider.goToPrevSlide();
                }
				if (self.isfirst == true) {
                
                    gocontent=false;
                    self.ispreClick = true;
                    self.isNext = false;
                    self.isPre = true;
                    self.slider.goToPrevSlide();
                    self.isend = true;
                    self.isfirst = false;
                }
				
				
            })
        },
        pageGuide: function(){
        
            var self = this;
            self.getTimezonePage();
            
        },
        /**timezone select*/
        
        getTimezonePage: function(){
            var cd = new Date();
            var ch = cd.getHours();
            var self = this;
            
            
            if (ch >= 4 && ch < 10) {
            
                self.timezone=0;
            }
            else 
                if (ch >= 10 && ch < 16) {
                
                
                    self.timezone=1;
                    
                }
                else 
                    if (ch >= 16 && ch < 22) {
                    
                    
                        self.timezone=2;
                        
                    }
                    else {
                    
                    
                        self.timezone=3;
                    }
			 $('.kwicks>li').eq(self.timezone).addClass("kwicks-selected");
			 self.updatekwiksDir(self.timezone);
			 self.initLanding();
            //
        
        },
        
        /**silder deeplink*/
        
        gotoPage: function(slideindex, thumbindex){
        
            var self = this;
            self.timezone = slideindex;
            self.thumbIndex = thumbindex;
		    
			//$(".kwicks>li").eq(self.timezone).trigger("click");
            self.initSilderPage(self.timezone);
        },
        
        /** deeplink*/
        buildeeplink: function(){
            var self = this;
            var thishref = window.location.href;
            var dpstr = "#expage" + self.pageIndex  + "-" + self.thumbIndex + "b299exp";
            
            if (thishref.toLowerCase().indexOf("#expage") >= 0) {
                //update deep link
                
                var thislink = thishref.substr(0, thishref.indexOf("#expage"));
                var endlink = thishref.substr((thishref.indexOf("b299exp") + 7));
                window.location = thislink + dpstr + endlink;
            }
            else {
            
                //create deep link
                window.location = thishref + dpstr;
            }
            
        },
		removedeepLink:function(){
			
			var self = this;
			var thishref = window.location.href;
			if (thishref.toLowerCase().indexOf("#expage") >= 0) {
			    var thislink = thishref.substr(0, thishref.indexOf("#expage"));
                var endlink = thishref.substr((thishref.indexOf("b299exp") + 7));
				thislink=thishref.substr(0, thishref.indexOf("#exhome"));	
				window.location = thislink +"#exhome"+ endlink;
			}
		}
		,
        gotoDeeplink: function(){
        
            var self = this;
            var pagelink = window.location.href;
            var dstart = pagelink.indexOf("#expage") + 7;
            var dend = pagelink.indexOf("b299exp");
            var deeplinkstr = pagelink.substring(dstart, dend);
            var pages = deeplinkstr.split("-");
            
            self.gotoPage(pages[0], pages[1]);
        },
        /**remove video*/
        removeVideo: function(){
        
            /*if ($(".experienceb299 #video-inner").size() > 0) {
            
                $(".experienceb299 #video-inner").remove();
                
            }
            if ($(".experienceb299 #video-inner_wrapper").size() > 0) {
            
                $(".experienceb299 #video-inner_wrapper").remove();
            }*/
			var vidinner=$("#videopanel #video-inner");
			if (vidinner.size() > 0) {
            
                vidinner.remove();
                
            }
			var vidinnerwrap=$("#videopanel #video-inner_wrapper");
            if (vidinnerwrap.size() > 0) {
            
                vidinnerwrap.remove();
            }
			var vidoex299=$(".experienceb299 #overlay-ex299");
			if(vidoex299.size()>0){
					
					vidoex299.remove();
			}
			var videx299pannel=$(".experienceb299 #videopanel");
			if (videx299pannel.size() > 0) {
			videx299pannel.remove();
			}
            
        },
        /** image loaded callback*/
        imageLoaded: function(){
            var self = this;
            
            
            var currentgroup = $(".thumbgroup").eq(self.thumbgroupIndex);
            var currentDIV = $("#showpanel>div", currentgroup);
            var currentpanel = $("#showpanel", currentgroup);
            //currentpanel.show();
            currentDIV.slideDown(500, function(){
            
            
                $("#showpanel #img>img").undelegate("load");
                
            });
        }
        
    };
    
    return function(arg){
        var experience = Object.create(Experienceb299);
        experience.init.call(experience, arg);
        return experience;
    };
    
}(jQuery, Number));
