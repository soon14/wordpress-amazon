(function($){
	var syncselect={
			
		init:function(){
			var self = this;
			
			self.chooseSiteVersion();
		},
		overlayelm:"<div id='overlay-select'><div id='overlay-content'><div id='closebtn'><span>" + Translator.translate("AssetMg/Apa/Owner/Sync/Overlay/Close") + "</span></div>|</div></div>",
		chooseSiteVersion:function(){
			
			var self = this,
				syncData = $("#sync-data").embeddedData();
				
			
			if( syncData['xhr-sync-flag']=="sync5" ) {
				
				self.savecookie();
				self.poposync5overlay();
				self.synclinksguide();
				self.forceoverlaysync();
				self.checkOverlayDeepLink();

			}
		},
		poposync5overlay:function(){
			var self=this;
			if($("body").hasClass("popsyncselect")){
				self.popoverlay();
				$("body.popsyncselect").css({"height":window.screen.availHeight+"px"})
			}
		},
		setsync5versionCookie: function(value){
			////SYNC5
			$.cookie("sync5version",value);
			
		},
		 getParameterByName:function(name)
		{
		  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		  var regexS = "[\\?&]"+name+"=([^&#]*)",
		  regex = new RegExp( regexS ),
		  results = regex.exec( window.location.href );
		  
		  if( results == null )
		    return "";
		  else
		    return decodeURIComponent(results[1].replace(/\+/g, " "));
		}
		,
		getsync5versionCookie:function(){
			////SYNC5
			return $.cookie("sync5version");
		},
		savecookie:function(){
			////SYNC5
			var self = this,
			vs= self.getParameterByName("v");
			
			if(vs !=""){
			self.setsync5versionCookie(vs);
			}
			
		},
		removeOvelay:function(){
			var headdiv=$(".apa .page-heading");
			$("#rad-sync-overlay #overlay-select").remove();
			if(headdiv.size()){headdiv.show()};
			if($(".sync-select-version").size()>0){
				$(".sync-select-version").show();
			}
            //location hash
			var location = window.location.toString().substring(0, window.location.toString().indexOf('#'));
			if (Modernizr.history) {
			    history.pushState(null, "popsync", location);
			}
			else {
			    var state = {};
			    state["popsync"] = null;
			    $.bbq.pushState(state);
			}
		}
		,
		synclinksguide:function(){
			////SYNC5
			var self = this;
			
			$("#overlay-select #closebtn").live("click",function(){
				self.removeOvelay();
			})
			$("#overlay-select .header").live("click",function(){
				self.removeOvelay();
			})
			
			$(".overlay-sync").click(function( e ){
				
				
				var currentahref=$(this).attr("href"),
			    vsi= self.getParameterByName("v");
			    
			  
			    if($(this).hasClass("sync4")){
			    	
			    	e.preventDefault();	
			    }else{
			    	
			    if(vsi==""){
			    
			    	
			    	
			    if(self.getsync5versionCookie() !=null){
				
			    	
				    var currenthref;
				    
				    if(currentahref.indexOf("?") === -1){
				    
				    currenthref=currentahref+"?v="+	self.getsync5versionCookie();
				    
				    }else{
				    	
				     currenthref=currentahref+"&v="+	self.getsync5versionCookie();
				    }
				   
				    e.preventDefault();	
				    e.stopPropagation();
				    window.location.href = currenthref;
				    
				    
			     }else{
			    	 
				//Lanch overlay
				e.preventDefault();	
				e.stopPropagation();
				
			    self.popoverlay();
				//track sync5
			    if(!$(this).hasClass("trackable")){
			    	self.track(this);	
			    	}
			     }
			    	
			    	
			    }
			    }
			    
			})
		},
		track:function(){
			//sync5 omniture
		     $.publish('/analytics/link/', { 
					title: "owner support:sync:change sync version",
					link: this,
					type: "o",
					onclicks: "change sync version"
				});
			 // 
		},
		resizeItemwidth:function(){
			var vitem=$("#overlay-select #versionItem"),
				overlay=$("#rad-sync-overlay"),
				widp=(1/vitem.size()*100)+"%",
				infoPheight=0,
				h4height=0,
				h5height=0;
				
			if($("body").hasClass("smobile")==false){
				vitem.width(widp);
			}else{
				vitem.width("100%");
			}
			$.each(vitem,function(i){
				var eachPh=$("#info p",vitem.eq(i)).height();
				var eachh4=$("#info h4",vitem.eq(i)).height();
				var eachh5=$("#info h5",vitem.eq(i)).height();
				if(eachPh>infoPheight){
					infoPheight=eachPh;
				}
				if(eachh4>h4height){
					h4height=eachh4;
				}
				if(eachh5>h5height){
					h5height=eachh5;
				}
			})
			$("#info p",vitem).height(infoPheight);
			$("#info h4",vitem).height(h4height);
			$("#info h5",vitem).height(h5height);
		}
		,popoverlay: function( ) {

			var self = this,
			syncData = $("#sync-data").embeddedData(),
			forceoverlay=$(".sync-select-version"),
			overlaypanel=$("#rad-sync-overlay #overlay-select");
			
			if(forceoverlay.size()>0){
				forceoverlay.hide();
			}
			if(syncData['xhr-sync-close']){
				
				self.overlayelm=self.overlayelm.replace("%CLOSE",syncData['xhr-sync-close'])
			}else{
				
				self.overlayelm=self.overlayelm.replace("%CLOSE","CLOSE");
			}
			
			if( syncData['xhr-sync-overlay'] ) {
				
				//Launch overlay
				if(overlaypanel.size()==0){
					self.loadselect($("#rad-sync-overlay"),syncData['xhr-sync-overlay']);
				}
                //location hash
				var location = window.location.toString().substring(0, window.location.toString().indexOf('#'));
				if (Modernizr.history) {
				    history.pushState(null, "popsync", location);
				    history.pushState(null, "popsync", location + "#popsync=show");
				}
				else {
				    var state = {};
				    state["popsync"] = 'show';
				    $.bbq.pushState(state);
				}
		
			}
			
	
		},loadselect:function(brother,url,option){
			var self=this;
			
			$.get(url,function(data){
				var headdiv=$(".apa .page-heading");
				if(headdiv.size()){headdiv.hide()};
				brother.html(self.overlayelm.split("|")[0]+data+self.overlayelm.split("|")[1]);
				self.resizeItemwidth();
				$(window).resize(function(){
					self.resizeItemwidth();
				})
			})		
			
		}
		,forceoverlaysync:function(){
			////SYNC5
			var self = this;
			$("A.force-overlay-sync").bind("click",function(e){
				 e.preventDefault();
				 self.popoverlay();	
			})
		},
		checkOverlayDeepLink: function () {
		    var self = this;
		    if (window.location.hash.indexOf('popsync=show') >= 0) {
		        self.popoverlay();
		    }
		}
	};
	$(function(){
		
		syncselect.init();
	});
})(jQuery);