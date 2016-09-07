/*
Author: Ruiwen Qin
File name: video.js
Description: Initialize jwPlayer
Dependencies: jQuery, jwPlayer
*/
var guxApp = guxApp || {};

(function($){
	guxApp.video = {
		settings : {},
		defaults : {
	    	width : 593,
	    	height : 348,
	      	modes : [
	          {
	            type : 'html5',
	            config : {
	              // skin : "../../src/themes/ftd/skin/glow/glow.xml"
	              skin: "/themes/ftd/skin/glow/glow.xml"
	            }
	          }, 
	          {
	            type : 'flash',
	            // src : '../../src/themes/ftd/swf/player.swf',
	            src: "/themes/ftd/swf/player.swf",
	            config : {
	              // skin : "../../src/themes/ftd/skin/glow.zip"
	              skin: "/themes/ftd/skin/glow.zip"
	            }
	          } ],
	      	// Close tracking by default (begin, 25, 50, 75, finish)
	      	track : "00000",
	      	play : false
	    },

		init: function(){
			if (!$("#video-inner").length) {return;}
			
			//prepare setting options
			guxApp.video.dataSetup();
			guxApp.video.load("jwplayer-js", "/themes/ftd/js/lib/jwplayer.js");
		    $ready("jwplayer", guxApp.video.videoSetup);
			//video options setup and video initialize
			//guxApp.video.videoSetup();
			
		},
		//load script dynamicly
	    load: function(id, src){
	      if(document.getElementById(id)) return;

	      var js, fjs = document.getElementsByTagName("script")[0];
	      js = document.createElement("script");
	      js.id = id;
	      js.src = src;
	      fjs.parentNode.insertBefore(js, fjs);
	    },
		dataSetup: function(){
			if ($("#video-config").length > 0){
				var videoConfig = $("#video-config").embeddedData();
			}
			
			if (videoConfig !== undefined && !guxApp.tools.isEmpty(videoConfig)){
				guxApp.video.settings = $.extend({},guxApp.video.defaults,videoConfig);

				// customize skin for html5 video player
			    if (videoConfig.skin){
			    	// guxApp.video.settings.modes[0].config.skin = "../../src/themes/ftd/skin/" + guxApp.video.settings.skin + "/" + guxApp.video.settings.skin + ".xml";
			    	guxApp.video.settings.modes[0].config.skin = "/themes/ftd/skin/" + guxApp.video.settings.skin + "/" + guxApp.video.settings.skin + ".xml";
			    }
			}
		},
		videoSetup: function(){

			/*if (guxApp.viewport.view === "mobile") {
				guxApp.video.settings.play = false;
			} else {
				guxApp.video.settings.play = true;
			}*/

			var playerOptions = {
	        	image: guxApp.video.settings.image,
	        	modes: guxApp.video.settings.modes,
	        	levels : [ {
	          		type : 'video/mp4',
	          		file : guxApp.video.settings.file
	        	}],
	        	width: guxApp.video.settings.width,
	        	autostart:guxApp.video.settings.play,
	        	'plugins' : {}
	      	};

	      	if (guxApp.video.settings.controlbar) {
		    	playerOptions.controlbar = "none";
		    }

		    if (guxApp.video.settings.caption) {
        		playerOptions["plugins"]["captions-2"] = {
          			"file" : guxApp.video.settings.caption
        		};
      		}

      		//video initialize
      		jwplayer("video-inner").setup(playerOptions);
      		
      		jwplayer().onReady(function(){
      			var videoContainer = $("#modalWrap .modal-body"),
      				containerWidth = videoContainer.width(),
      				playerHeight,ratio;

      			//hide control bar until video starts to play
  				if (guxApp.video.settings.hideControls){
      				jwplayer().getPlugin("controlbar").hide();
      			}

      			//Don't hide control bar if using chrome.
      			console.log(guxApp.tools.isMobile());
      			if(!(guxApp.tools.isMobile() == "Android")){
      				jwplayer().getPlugin("controlbar").hide();
      			}

      			//set height of the player based on the ratio
      			if (guxApp.video.settings.ratio){
		      		var prop = guxApp.video.settings.ratio.split(":");
		      		ratio = prop[1] / prop[0];
		      		playerHeight = containerWidth * ratio;
		      		jwplayer().resize(containerWidth,playerHeight);
		      	}

      			//resize the dimension of the player along with window size
      			$(window).resize(function(){
		            containerWidth = videoContainer.width();
		            playerHeight = containerWidth * ratio;
		            jwplayer().resize(containerWidth,playerHeight);
      			});

      			// hide close button on fullscreen
      			$("#video-inner").on("click", "#video-inner_jwplayer_controlbar_fullscreenButton", function() {
		            $(".modal .icon-close").hide();
		        });
		        
				// show close button on fullscreen
		        $("#video-inner").on("click", "#video-inner_jwplayer_controlbar_normalscreenButton", function() {
		            $(".modal .icon-close").show();
		        });

      			jwplayer().play(guxApp.video.settings.play);

      			$(".modal-body").removeClass("loading-video");
  			});

  			jwplayer().onPlay(function(){
          		jwplayer().getPlugin("controlbar").show();
          		jwplayer().resize(jwplayer().getWidth(),jwplayer().getHeight());
        	});

        	// tracking impl
          	guxApp.video.settings.track != "00000" && guxApp.video.track(guxApp.video.settings);
	},
		// track video
	    track : function(settings) {
	      	// tracking flag
	      	var trackPos = { "0" : 1, "0.2" : 1, "0.5" : 1, "0.7" : 1, "0.8" : 1},
	          	ti = settings.title || "",
	          	dcsuri = settings.url || "",
	          	pname = settings.pname || "",
	          	hier = settings.hier|| "";
	      	jwplayer().onTime(function(e) {
	        	var percent = Math.round(e.position / e.duration * 10) / 10, action;
	        	var omTitle, omEvents, year, nameplate='none';	        	
	        	if (trackPos[percent]) {
	          		switch (percent) {
			            case 0:
			              if (settings.track.charAt(0) == "1") {
			                action = "Play";
			                omTitle = "video start";
			                omEvents = "event56";
			              }
			              break;
			            case 0.2:
			              if (settings.track.charAt(1) == "1") {
			                action = "Play 25";
			              }
			              break;
			            case 0.5:
			              if (settings.track.charAt(2) == "1") {
			                action = "Play 50";
			              }
			              break;
			            case 0.7:
			              if (settings.track.charAt(3) == "1") {
			                action = "Play 75";
			              }
			              break;
			            case 0.8:
			              if (settings.track.charAt(4) == "1") {
			                action = "Finish";
			                omTitle = "video finish";
			                omEvents = "event57";
			              }
			              break;
	          		}

	          		trackPos[percent] = 0;

		          	if (omTitle && omEvents) {
		        		if (window._da && window._da.om && ND && ND.omniture ) {
		        			var clip_n = settings.clip_n || ti;	
//		        			$.publish('/analytics/link',{
//		              			'link':true,
//		              	      	'onclicks':omTitle,
//		              			'events':omEvents,
//		              			'type':'o',
//		              			'content':clip_n,
//		              			'title':omTitle,
//		              			'nameplate':'none',
//		              			'pname':pname,
//		              			'hier1':hier
//		              		});
		        			if(_da.nameplate && _da.nameplate.year) year = _da.nameplate.year;
					    	if(_da.nameplate && _da.nameplate.name) nameplate = _da.nameplate.name;
					    	
		        			ND.omniture.trackLink({
		              			'link':true,
		              	      	'onclicks':omTitle,
		              			'events':omEvents,
		              			'type':'o',
		              			'content':clip_n,
		              			'title':omTitle,
		              			'nameplate':nameplate,
		    				    "titleNameplate":"none",
		              			'pname':pname,
		              			'hier1':hier,
		              			'year':year
		        			});
		    		  	}
		          	}          	          
//		          	if (action) {
//		            	var clip_n = settings.clip_n || (ti + (e.duration>>0)) ;
//		          
//			            // Tracking implementation
//			            ND.analytics._tag.dcsMultiTrack(
//			                "WT.ti", ti + action,
//			                "DCS.dcsuri", (dcsuri + action.replace(/ /g, '')).toLowerCase().replace(/ /g, '-'),
//			                "WT.clip_ev", action.replace(/ /g,''),
//			                "WT.clip_n", clip_n,
//			                "WT.dl", 7
//			            );
//		          	}
	        	}
	    	});

	      	// For replaying.
	      	jwplayer().onComplete(function(){
	        	trackPos = { "0" : 1, "0.2" : 1, "0.5" : 1, "0.7" : 1, "0.8" : 1};
	      	});
    	}
	};

})(jQuery);