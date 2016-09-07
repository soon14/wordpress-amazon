(function($){
	
	$.fn.popupWindow = function (options) {
		var defaults = {
			width: 1000,
			height: 760,
			fullscreen: false,
			resizable: 'yes',
			status: 'no',
			toolbar: 'no',
			menubar: 'no',
			location: 'no'
		},
		settings = $.extend({}, defaults, options);
		
			this.live("click", function (url,window) {
				var url = $(this).attr("href");
				var str = "resizable=" + settings.resizable + ",status=" + settings.status + ",toolbar=" + settings.toolbar + ",menubar=" + settings.menubar + ",location=" + settings.location;
							
				if(settings.fullscreen == true) {					
					var ah = screen.availHeight - 30;
					var aw = screen.availWidth;
					str += ",height=" + ah + ",innerHeight=" + ah;
					str += ",width=" + aw + ",innerWidth=" + aw;
					var xc = 0;
					var yc = 0;
					str += ",left=" + xc + ",screenX=" + xc;
					str += ",top=" + yc + ",screenY=" + yc;
					str += ",type=fullWindow,fullscreen";
				}else {
					str += ",height=" + settings.height + ",innerHeight=" + settings.height;
					str += ",width=" + settings.width + ",innerWidth=" + settings.width;
				}
				
				childWindow = open(url,window,str);
				if(childWindow.opener == null){
					childWindow.opener = self;
				}
				return false;
			}); 
			
			$(".close-window a").live("click", function(){
				window.close();
				return false;
			});

		return this;
	}
	
})(jQuery);