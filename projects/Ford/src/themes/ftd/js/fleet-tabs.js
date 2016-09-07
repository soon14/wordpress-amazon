ND.fleetTabs = ( function($, undefined) {
	
	 fleetTabs = {
    
        init: function(){
			
			var self=this;
			self.inittabscss();
			self.tabscontrol();
			self.closeTabs();
			self.repositionThumbs();
			
        },
		repositionThumbs:function(){
            
            if ($("#thumbs").length > 0) {
               
				var totalsize=$(".fleet_tabs_content>div").size();
                for (var n = 0; n < totalsize; n++) {
                
				    var currentThumb=$(".fleet_tabs_content>div").eq(n);
					
                    var thumbs = $("#thumbs li",currentThumb);
                    var tbindex = 0;
                    for (var i = 0; i < thumbs.size(); i++) {
                        tbindex++;
						
                        if (tbindex % 4 == 0) {
							
                            thumbs.eq(i).css("margin-right", "0px");
                            thumbs.eq(i).css("margin-left", "0px");
                        }
                        
                    }
                    
                }
                
                
                
            }
			
		}
		,
		inittabscss:function(){
			
			$("#fleet_tabs>ul>li").eq(0).addClass("tab_blue");
			$("#fleet_tabs>ul>li").eq(1).addClass("tab_grey");
			$("#fleet_tabs>ul>li").eq(2).addClass("tab_yellow");
			$("#fleet_tabs>ul>li").eq(3).addClass("tab_dark");
			
			$("#fleet_tabs .fleet_tabs_content>div").eq(0).addClass("tab_blue");
			$("#fleet_tabs .fleet_tabs_content>div").eq(1).addClass("tab_grey");
			$("#fleet_tabs .fleet_tabs_content>div").eq(2).addClass("tab_yellow");
			$("#fleet_tabs .fleet_tabs_content>div").eq(3).addClass("tab_dark");
		}
		,
		tabscontrol:function(){
			
			$("#fleet_tabs>ul>li").bind("click",function(){
				
				var curelmts=$(this);
				var currentID=curelmts.attr("id");
				var contents=$(".fleet_tabs_content>DIV");
				var curcontID="DIV#"+currentID;
				var btns=$("#fleet_tabs>ul>li");
				var currentContent=$(curcontID);
				btns.removeClass("active");
				contents.removeClass("active");
				currentContent.addClass("active");
				curelmts.addClass("active");
				
				$("#fleet_tabs SPAN.close").css({"visibility":"visible"});
				
				
			})
		},
		closeTabs:function(){
			$("#fleet_tabs SPAN.close").bind("click",function(){
				var contents=$(".fleet_tabs_content>DIV");
				var btns=$("#fleet_tabs>ul>li");
				contents.removeClass("active");
				btns.removeClass("active");
				$("#fleet_tabs SPAN.close").css({"visibility":"hidden"});
			})
		}
    };
    
    
    return function(arg){
        var ftabs = Object.create(fleetTabs);
        ftabs.init.call(ftabs, arg);
        return ftabs;
    };
	
}(jQuery)); 
