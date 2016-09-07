//Enhance HTML5 video player
(function(window, document) {
  var ND = window.ND = window.ND || {};
  var settings;

  var video = ND.video = {
    // the deeplink only works when user open the page by default,
    // when user click sth. in video list, it will be false.
    deepLink : 1,
    fromLink : 0,

    defaults : {
      width : 559,
      height : 521,
      modes : [
          // Bug #146204: Enhanced Video Player - 30 box FOA - IE 8 - The
          // second time user clicks the video player, a js error will be
          // displayed.; html5 mode is not stable, disable it.
          {
            type : 'html5',
            config : {
              skin : "/themes/ftd/skin/glow/glow.xml"
            }
          }, 
          {
            type : 'flash',
            src : '/themes/ftd/swf/player.swf',
            config : {
              skin : "/themes/ftd/skin/glow.zip"
            }
          } ],
      // Close tracking by default (begin, 25, 50, 75, finish)
      track : "00000",
      play : false
    },

    init : function(options) {
      settings = $.extend( {}, video.defaults, options);
      
      // if($(".sync-p5").size() > 0){
      //   alert($(".sync-p5").size());

      // }else{

      video.load("jwplayer-js", "/themes/ftd/js/lib/jwplayer.js");

      $ready("jwplayer", video.setup);
      // }
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

    setup2: function(){
      //alert("inner test");
    },

    // set up jwplayer
    setup: function(){
      // setup video list
      var $listlinks = $(".feature-overlay .video-list li").bind("click", function(e) {
          e.preventDefault();

          var $this = $(this);

          if (!video.deepLink) {
            vpos = $(".video-list ul").data('jcarousel').first;
            vcur = $this.index() + 1;

                // remember the the first and active position of
            // carsouel
            // if the value is the same, it will not change.
            $.bbq.pushState( {
              vpos : vpos,
              vcur : vcur
            });
          }

          // disable deeplink after the first time fired.
          video.deepLink = 0;
          // disable the carousel and videoplayer the next time: overlay
          // opened by deeplink.
          video.fromLink = 1;

          // when a new fragement parameter to the url, the parent overlay
          // will be reopened, so delay some time to load.
          window.setTimeout(function() {
            // enable the carousel and videoplayer
              video.fromLink = 0;

              // $.publish("overlay.launch",{url: $(this).attr("href")});
              //var overlay = ND.API.getOverlay();
             // overlay.load($("a", $this)[0]);
          }, 100);
      });

      if (!video.fromLink) {
        // get the video player list
        var vpos = $.bbq.getState("vpos"), vcur = $.bbq.getState("vcur");
        // default means play current video not in play list.
        var pos = vpos ? Number(vpos) : 1, cur = vcur ? Number(vcur) : 100001;
        var $list = $(".video-list ul");

        // add a custom class to fix the layout
        if ($list.size()) {
          $(".feature-overlay").addClass("has-videolist");
        }

        // Is user enter the video by deeplink?
        if (cur < 100001 && video.deepLink) {
          $listlinks.eq(cur - 1).trigger("click");
        } else {
          // alternative image
          var imageUrl = $(".video-image img").attr("src");

          if($("div.staging-wrap").size()>0){
            imageUrl = settings.image;
          }

          // setup playlist
          $list.jcarousel( {
            start : pos,
            scroll : 1,
            // Feedback: Using "hover" event instead of "click".
            buttonNextEvent : "mouseenter click",
            buttonPrevEvent : "mouseenter click"
          });

          var playerOption = {
            image : imageUrl,
            modes : settings.modes,
            levels : [ {
              type : 'video/mp4',
              file : settings.file
            } ],
            width : settings.width,
            height : settings.height,
            'plugins' : {}
          }

          if (settings.caption) {
            playerOption["plugins"]["captions-2"] = {
              "file" : settings.caption
            };
          }

          // setup video player
          jwplayer("video-inner").setup(playerOption);

          // tracking impl
          settings.track != "00000" && video.track(settings);

          // autoplay interface
          settings.play && jwplayer().play();

          // Bug #146214 Enhanced video player - 30 box FOA - The shared
          // URL is wrong.
          //var overlay = ND.API.getOverlay();
          //overlay.injectSocial();
        }
      }
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
        var omTitle, omEvents;
        
        
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
        	  
        	  if( window._da && window._da.om && ND && ND.omniture ) {
        		  
        		  var clip_n = settings.clip_n || ti;
        		 
        		  //ND.omniture.trackLink({
        		//	  	'link':true,
        		//	  	'onclicks':omTitle,
        		//	  	'events':omEvents,
        		//	  	'type':'o',
        		//	  	'content':clip_n,
        		//	  	'title':omTitle,
        		//	  	'nameplate':'none',
        		//	  	'pname':pname,
        		//	  	'hier1':hier
        		//	  	}
        		//  );
        		  
        		 $.publish('/analytics/link/',{
          			  	'link':true,
          			  	'onclicks':omTitle,
          			  	'events':omEvents,
          			  	'type':'o',
          			  	'content':clip_n,
          			  	'title':omTitle,
          			  	'nameplate':'none',
          			  	'pname':pname,
          			  	'hier1':hier
          			  	}
          		  );
    		  }
          }          
          
          if (action) {
            var clip_n = settings.clip_n || (ti + (e.duration>>0)) ;
          
            //console.log('action: ' + action + ' clip_n: ' + clip_n);
            //console.log(ND.analytics._tag);
            
            // Tracking implementation
            ND.analytics._tag.dcsMultiTrack(
                "WT.ti", ti + action,
                "DCS.dcsuri", (dcsuri + action.replace(/ /g, '')).toLowerCase().replace(/ /g, '-'),
                "WT.clip_ev", action.replace(/ /g,''),
                "WT.clip_n", clip_n,
                "WT.dl", 7
              );
          }
          
          
        }

      });

      // For replaying.
      jwplayer().onComplete(function(){
          trackPos = { "0" : 1, "0.2" : 1, "0.5" : 1, "0.7" : 1, "0.8" : 1};
      });
    }

  };

})(window, document);
