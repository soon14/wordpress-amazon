/*
Author: 		Roy anonuevo
File name: 		brightcove.js
Description: 	brightcove event

				1. By Adding this mark up, it will add a custom preview image

				<div class="preview-image">
					<a href="#" class="play-btn" data-video-id="3571385405001">
						<img src="media/4E_QL_nextgen_mobile_carousel_435x250_copvideo.png">
						<span class="play-button"></span>
					</a>
				</div>

Dependencies: 	jQuery, brightcove		
*/

var qlApp = qlApp || {};

(function($){

	qlApp.Brightcove = {

		init: function(){
			 if(!$(".brightcove").length){return;}
			 
			// cache dom			
			this.$brightcove = $('.brightcove');
			this.$brightcovePlayBtn = this.$brightcove.find('.play-btn');
			//Firefox fix; Brightcove not firing on firefox
			brightcove.createExperiences();
		},

		onTemplateLoad: function(experienceID){		
		  	// get references to the player and API Modules and Events
			this.player = brightcove.api.getExperience(experienceID);
			this.APIModules = brightcove.api.modules.APIModules;
			this.brPlayer = this.player.getModule(this.APIModules.VIDEO_PLAYER);
			// bind listener
			$('.brightcove').on("click",'.play-btn', this.playVideo);
		},

		onTemplateReady: function(evt){			
			var self = qlApp.Brightcove,omTitle, omEvents,mediaName;			
			self.brPlayer.addEventListener(brightcove.api.events.MediaEvent.BEGIN, function(e){
				mediaName = e.media.displayName; 
				omTitle = "video start";
				omEvents = "event56";
				self.trackEvent(mediaName,omTitle,omEvents);							
			});
			self.brPlayer.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, function(e){
				mediaName = e.media.displayName; 
				omTitle = "video complete";
				omEvents = "event57";
				self.trackEvent(mediaName,omTitle,omEvents);
			});
		},

		playVideo: function(e){
            e.preventDefault();

            var self = qlApp.Brightcove;

            if(self.$brightcove.find(".preview-image").length){
            	self.$brightcove.find(".preview-image").fadeOut();
            }

            var videoID =  $(this).attr("data-video-id");
            self.brPlayer.loadVideoByID(videoID);
        },
        trackEvent: function(mediaName,omTitle,omEvents){
			if (mediaName&& window._da && window._da.om && ND && ND.omniture ) {
				 var linkTitle = omTitle;
				if(typeof _da.pname !=="undfined"){
					linkTitle = _da.pname + ":" + omTitle;
				}
			    var  data ={
				    "content":mediaName,
				    "link":true,
    			  	"onclicks":omTitle,
    			  	"events":omEvents,
    			  	"type":'o',
    			  	"title":linkTitle
			    };
				ND.omniture.trackLink(data);			    
			}
		}
	};


	$(function(){
        qlApp.Brightcove.init();
    });

})(jQuery);
