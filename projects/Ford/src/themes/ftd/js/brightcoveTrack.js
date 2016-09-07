/*
Author: 		Ivy/Brett
File name: 		brightcoveTrack.js
Description: 	track brightcove event  video start/video finish
Dependencies: 	jQuery,brightcove
Usage: 			
*/

var ND = window.ND = window.ND || {};

(function($){

	var newWidth, year, modulename, mediaName,ts25,ts50,ts75,ts100,
		currWidth = window.innerWidth,
		trackPos = { "0" : 1, "0.25" : 1, "0.5" : 1, "0.75" : 1, "1" : 1},
		settings= {"track":"11111"};

	ND.Brightcove = {

		//template loaded event handler
		onTemplateLoad: function (experienceID) {
		  	// get references to the player and API Modules and Events
			ND.Brightcove.player = brightcove.api.getExperience(experienceID);
			ND.Brightcove.APIModules = brightcove.api.modules.APIModules;
			trackPos = { "0" : 1, "0.25" : 1, "0.5" : 1, "0.75" : 1, "1" : 1};
		},

		// template ready event handler
		onTemplateReady: function (evt) {
			ND.Brightcove.videoPlayer = ND.Brightcove.player.getModule(ND.Brightcove.APIModules.VIDEO_PLAYER);
			ND.Brightcove.experienceModule = ND.Brightcove.player.getModule(ND.Brightcove.APIModules.EXPERIENCE);
			ND.Brightcove.cuePointsModule = ND.Brightcove.player.getModule(ND.Brightcove.APIModules.CUE_POINTS);
			
			ND.Brightcove.videoPlayer.getCurrentVideo(function(video){
				var videoLengthEightyPercent = video.length/1000 * 0.8;
				ND.Brightcove.cuePointsModule.addCuePoints(video.id, [videoLengthEightyPercent]);
			});
			
			ND.Brightcove.resizeVideo();
			ND.Brightcove.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.PROGRESS,function(e){				
				 var omTitle, omEvents,omType,omProgress,omSegment;				
				 var percent = Math.round(e.position / e.duration *100) / 100;
				 if (trackPos[percent]) {
			          switch (percent) {
			            case 0:
			              if (settings.track.charAt(0) == "1") {
			                omTitle = "video start";
			                omEvents = "event56";
			                mediaName = e.media.displayName; 
			                omType = "m_s";
			                omProgress = "0%";
			                omSegment = "1:M:0-25";
			              }
			              break;
			            case 0.25:
			              if (settings.track.charAt(1) == "1") {	
			            	omTitle = "video 25%";
			            	ts25 = Math.round(e.position);
			                omEvents = "event58,event61="+ts25+",event62";
			                omType = "m_i";
			                omProgress = "25%";
			                omSegment = "1:M:0-25";
			              }
			              break;
			            case 0.5:
			              if (settings.track.charAt(2) == "1") {
			            	omTitle = "video 50%";
			            	ts50 = Math.round(e.position);
			                omEvents = "event59,event61="+(ts50 - ts25)+",event62";
			                omType = "m_i";
			                omProgress = "50%";
			                omSegment = "2:M:25-50";
			              }
			              break;
			            case 0.75:
			              if (settings.track.charAt(3) == "1") {
			            	omTitle = "video 75%";
			            	ts75 = Math.round(e.position);
			                omEvents = "event57,event61="+(ts75 - ts50)+",event62";
			                omType = "m_i";
			                omProgress = "75%";
			                omSegment = "3:M:50-75";
			              }
			              break;
			            case 1:
			              if (settings.track.charAt(4) == "1") {
			                omTitle = "video finish";
			                ts100 = Math.round(e.position);
			                omEvents = "event60,event61="+(ts100 - ts75)+",event62";
			                omType = "m_i";
			                omSegment = "4:M:75-100";
			              }
			              break;
			          }
			          trackPos[percent] = 0;
//			          console.log("omTitle="+omTitle);
//			          console.log("omEvents="+omEvents);
//			          console.log("mediaName="+mediaName);
//			          console.log("omType="+omType);
//			          console.log("omProgress="+omProgress);
//			          console.log("omSegment="+omSegment);
			          if (omType) { 
			        	  ND.Brightcove.trackEvent(omEvents,omType,omProgress,omSegment);
			          }
				 }
			});
//			ND.Brightcove.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.PLAY,function(e){
//				if (e.position == 0) {
//					mediaName = e.media.displayName; 
//					omTitle = "video start";
//					omEvents = "event56";
//					ND.Brightcove.trackEvent();
//				}
//			});
//			ND.Brightcove.videoPlayer.removeEventListener(brightcove.api.events.MediaEvent.PLAY);
//			
//			ND.Brightcove.videoPlayer.addEventListener(brightcove.api.events.CuePointEvent.CUE,function(e){
//				omTitle = "video finish";
//				omEvents = "event57";
//				ND.Brightcove.trackEvent();
//			})
//			ND.Brightcove.videoPlayer.removeEventListener(brightcove.api.events.CuePointEvent.CUE);
			ND.Brightcove.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, function(e){
				/*mediaName = e.media.displayName; 
				omTitle = "video finish";
				omEvents = "event57";
				ND.Brightcove.trackEvent();
				*/
				//For replaying.
				trackPos = { "0" : 1, "0.25" : 1, "0.5" : 1, "0.75" : 1, "1" : 1};
			});
			//ND.Brightcove.videoPlayer.removeEventListener(brightcove.api.events.MediaEvent.COMPLETE);

			// HTML5 iframe resize fix
			// Code taken from: http://docs.brightcove.com/en/video-cloud/smart-player-api/samples/responsive-sizing.html#HtmlMode
			ND.Brightcove.videoPlayer.getCurrentRendition(function(renditionDTO) {
			
				if (renditionDTO) {
					ND.Brightcove.calulateNewPercentage(renditionDTO.frameWidth, renditionDTO.frameHeight);
				} else {
					ND.Brightcove.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.PLAY, function(event) {
						ND.Brightcove.calulateNewPercentage(event.media.renditions[0].frameWidth, event.media.renditions[0].frameHeight);
					});
				}
			});

			var evt = document.createEvent("UIEvents");
			evt.initUIEvent("resize",true,false,0);
			window.dispatchEvent(evt);
		},

		trackEvent: function(omEvents,omType,omProgress,omSegment){
			if (mediaName && omType && window._da && window._da.om && ND && ND.omniture ) {
			    var  data ={
				    "events":omEvents,
				    "linkType":omType,
				    "content":mediaName,
				    "progress":omProgress,
				    "segment":omSegment,
				    "mediaType":"video"
			    };
				ND.omniture.trackMedia(data);			    
			}
		},

		calulateNewPercentage: function(width,height) {
			var newPercentage = ((height / width) * 100) + "%";
			document.getElementById("videocontainer").style.paddingBottom = newPercentage;
		},

		resizeVideo: function() {
			window.onresize = function(evt) {
				newWidth = window.innerWidth;

				// only run this code if the browser width changes
				if (currWidth !== newWidth) {
					var resizeWidth = $(".BrightcoveExperience").width(),
						resizeHeight = $(".BrightcoveExperience").height();

					if (ND.Brightcove.experienceModule.experience.type == "html") {
						ND.Brightcove.experienceModule.setSize(resizeWidth, resizeHeight);
					}

					currWidth = window.innerWidth;
				}
			};
		}
	};

})(jQuery);
