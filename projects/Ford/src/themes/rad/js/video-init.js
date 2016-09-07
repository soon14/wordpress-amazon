/*
Author: York Zhang
Description: Owner video page
*/

(function($){

	var videosModule = {
		init: function(){
			if(!$(".video-list").size()) {return;}

			var $firstVideo = $(".video-list").find(".video-link").eq(0);

			var videoSetting = $firstVideo.find(".video-config").embeddedData();
			var imgCount = 0;
			var $firstTierImgs = $(".video-list").find(".columns.large-6").eq(1).find('img.video-img');
			$firstTierImgs.each(function(index,element){
				var $this = $(this);
				//console.log("size", $firstTierImgs.size());
				if(element.complete){
					imgCount++;
					//console.log("complete count", imgCount);
					if(imgCount == ($firstTierImgs.size())){
						var videoWidth = $firstVideo.width();
						var videoHeight = $firstVideo.parent(".columns.large-6").height();

						var videoSize = {
							width: videoWidth,
							height: videoHeight,
							play:false
						}

						var videoOption = $.extend({},videoSetting,videoSize);
						ND.video.init(videoOption);
					}
				}else{

					element.onload = function(){
						imgCount++;
						//console.log("count", imgCount);
						if(imgCount == ($firstTierImgs.size())){
							var videoWidth = $firstVideo.width();
							var videoHeight = $firstVideo.parent(".columns.large-6").height();

							var videoSize = {
								width: videoWidth,
								height: videoHeight,
								play:false
							}

							var videoOption = $.extend({},videoSetting,videoSize);
							ND.video.init(videoOption);
						}
					}
				}

			});

			
			$("div.video-link a.play-video").click(function(e){
				var $this = $(this);
				var $videoStaging = $(".video-list");
				//console.log($videoStaging.offset().top);
				var targetOffset = $videoStaging.offset().top;
				$('html,body').animate({scrollTop:targetOffset},300);
				e.preventDefault();
				jwplayer("video-inner").remove();
				var videoSetting = $this.next(".video-config").embeddedData();

				var videoWidth = $this.parent(".video-link").width();
				var videoHeight = $this.parents(".columns.large-6").eq(0).height();

				var videoSize = {
					width: videoWidth,
					height: videoHeight,
					play:true
				}

				var videoOption = $.extend({},videoSetting,videoSize);
				//console.log(videoOption);
				ND.video.init(videoOption);
				
			});
		}

	};

	$(function(){
		videosModule.init();
	});

})(jQuery);


