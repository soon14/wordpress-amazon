//LABjs window.onload helper
if( window.isWindowLoaded === undefined ) {
	window.isWindowLoaded = false;
}

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

	
	
	
	


	

	


	ND.videoLoad = {
		init:function() {
			
			if(!$(".inner-video").size()) {return;}

			var videoConfig = $("#video-config").embeddedData();
			//console.log(videoConfig);


			ND.video.init(videoConfig);
				

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
		
		ND.selectCurrent.init();		
		ND.delegate.init();	
		
		ND.lang.init();
		
		ND.videoLoad.init();
		
	});
	
	//add print function
	$(function(){		
		$(".print").click(function(){
			window.print();
		});		
	});		
	
	//Protect from missing LAB/loader script.
	if(window['$wait'] === undefined) {
		window['$wait'] = function(fn){
			fn();
		}
	}
	
})(jQuery, window);


