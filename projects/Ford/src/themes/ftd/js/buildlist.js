/*
 * shopping-tools: nameplate page, switch the vehicles.
 */
window.ND.BuildList = (function(window, document, $){

	/*
	* build List behavior
	*/
	var BuildList = function(){
		var self = this,
			$container = $(".buildlist"),
			$content = $(".buildlist .buildview"),
			$list = $(".buildlist .row"),
			$item = $(".buildlist .derivative"),
			width = $container.width();

		/*
		* etc: reset the content's width;
		*/
		self.init = function(){
			$content.css({ "width" : width * $list.size(), "position":"relative" });
			$item.click(function(e){
				$item.removeClass("cur");
				$(this).addClass("cur");
			});
		};

		/*
		* switch to specfic tab in the list
		*/
		self.moveTo = function(idx){
			var left = 0 - idx * width;
			$content.animate({"left":left});
		};
	};

	/*
	* build selector behavior
	*/
	var BuildSelect = function(options){

		var self = this,
			$buildselect = $(".buildselect"),
			$builditem = $(".buildselect li"),
			$current = $(".buildselect li.cur"),
			$arrowContainer = $(".buildselect ul"),
			//required to adjust the current tab indicator based on the size of the
			//indicator used. Build and price uses a different offset
			offset = (options && options.offset) ? options.offset : 144;

		//delegate eent interface.
		self.onChange;

		self.init = function(){
			//remember the index number;
			$builditem.each(function(idx){
				$(this).data({"idx": idx});
			});

			//bind clic event
			$builditem.click(function(e){
				e.preventDefault();
				$current = $(e.currentTarget);

				self.reset();
			});

			//reset the position of arrow immediately
			self.reset();
		};

		/*
		* reset the position of arrow
		*/
		self.reset = function(){
			var left = $current.offset().left - $buildselect.offset().left,
				width = $current.width(),
				pos = ((left + width / 2) >> 0) - offset,
				stypos = pos + "px 34px";

			$arrowContainer.animate({"background-position" : stypos}, "fast");
			$builditem.removeClass("cur");
			$current.addClass("cur");

			self.onChange && self.onChange($current.data("idx"));
		};

	};

	/*
	* initialization
	*/ 
	$(document).ready(function(){
		if($(".buildlist .row").size()){
			initBuildList();
		}
	});
	
	var initBuildList = function(options) {
		var buildList = new BuildList();
		buildList.init();

		var buildSelect = new BuildSelect(options);
		/*Bind event*/
		buildSelect.onChange = buildList.moveTo;
		/*Init*/		
		buildSelect.init();
	};
	
	return {
		create: function(){
			initBuildList({offset : 152});
		}
	}; 

})(window, document, jQuery);