(function($){
	
	$.fn.ndslider = function (options) {
		var defaults = {
				slidespeed: 500
			},
			settings = $.extend({}, defaults, options);

			this.each(function () {

				var slider = $(this),
					sliderItem = slider.find(".slideritem"), 
					sliderWidth = slider.width(), 
					sliderItemLen = sliderItem.length,
					sliderItemWidth = sliderItem.width(),
					sliderItemWrap = slider.find(".slideritemwrap"), 
					sliderItemWrapWidth = sliderItemWidth * sliderItemLen,
					infoBox = slider.find(".infowrap"),
					controlBar = $('<div class="controlbar"><div class="bgwrap"><ul></ul></div></div>'),
					btnCtrl = slider.find(".control"),
					btnNext = slider.find(".control a.next"),
					btnPrev = slider.find(".control a.prev");
				
				//register external listeners
				slider.bind('slidenext.slider', function() { 
					btnNext.trigger('click');
				}).bind('slideprev.slider', function() { 
					btnPrev.trigger('click');
				});
				
				sliderItemWrap.css("width", sliderItemWrapWidth);

				if (sliderItemLen > 1){

					//controlBar mark-up
					slider.append(controlBar);
					for(var i = 0; i < sliderItemLen; i++){
						$("<li><span>Page" + i + "</span></li>").appendTo(slider.find(".controlbar ul"));
					};
					var controlItem = slider.find(".controlbar ul li");
					controlItem.eq(0).addClass("first current");										
					controlBar.fadeIn();
					
					var controlWidth = slider.find(".controlbar .bgwrap").width(),
					controlBarPadding = (sliderWidth - controlWidth)/2;
					if (ND.rtl){
						controlBar.css("padding-right",controlBarPadding);
					}else {
						controlBar.css("padding-left",controlBarPadding);
					}
					
					btnCtrl.show();
					infoBox.eq(0).show(500);
					
					//sliderAction
					var sliderAction = function(itemNo) {
						if (itemNo < sliderItemLen && itemNo > -1){
							var marginleftvalue = -(itemNo * sliderItemWidth);
							if (ND.rtl){
								sliderItemWrap.animate({
									marginRight:marginleftvalue
								 }, settings.slidespeed);
							}else{
								sliderItemWrap.animate({
									marginLeft:marginleftvalue
								 }, settings.slidespeed);
							}
							btnPrev.removeClass("prev-disable");
							btnNext.removeClass("next-disable");
							infoBox.fadeOut();
							infoBox.eq(itemNo).fadeIn();
						}
						if (itemNo >= sliderItemLen-1){
							btnNext.addClass("next-disable");
						}
						if (itemNo <= 0){
							btnPrev.addClass("prev-disable");
						}
					}
					
					//controlBar sliderAction
					controlItem.click(function(){
						var controlCurrentItem = $(this);
						itemNo = controlCurrentItem.index();
						controlItem.removeClass("current");
						controlCurrentItem.addClass("current");
						sliderAction(itemNo);
					});
					//add thumb control
					
					
					
					
					$(".bq_slider_thumbs_item").click(function(){
						
						var $thisthumb= $(this);
						
						var currentid=$thisthumb.attr("id");
						
						for(var i=0;i<$(".bq_slider_thumbs_item").children("a").length;i++){
							
							
							if(i<=1){
								
							if(i%2==0){
							$(".bq_slider_thumbs_item").children("a").eq(i).hide();	
							}else{
							$(".bq_slider_thumbs_item").children("a").eq(i).show();	
							}
								
							}else{
							
							if(i%2==0){
							$(".bq_slider_thumbs_item").children("a").eq(i).show();	
							}else{
							$(".bq_slider_thumbs_item").children("a").eq(i).hide();	
							}
							
							}
								
							
						}
						
						
						$thisthumb.children("a").eq(0).toggle();
						$thisthumb.children("a").eq(1).toggle();
						
						sliderAction(currentid);
						
					});
					
					//$(".bq_slider_thumbs_item").eq(0).click();					
					//control arrow sliderAction
					var itemNo = 0;
					btnNext.click(function(){						
						itemNo = itemNo + 1;						
						sliderAction(itemNo);
						if (itemNo > sliderItemLen-1){
							itemNo = sliderItemLen -1;
							return false;
						}else{
							controlItem.eq(itemNo-1).removeClass("current");
							controlItem.eq(itemNo).addClass("current");						
						}
						return false;
					});
					
					btnPrev.click(function(){
						itemNo = itemNo - 1;
						sliderAction(itemNo);
						if (itemNo < 0){
							itemNo = 0;
							return false;
						}else{
							controlItem.eq(itemNo+1).removeClass("current");
							controlItem.eq(itemNo).addClass("current");					
						}
						return false;
					});

				} else if(sliderItemLen == 1){
					infoBox.eq(0).show();
					return false;
				} else {
					btnCtrl.hide();
					return false;
				}
				
			});

		return this;
	}
	
})(jQuery);