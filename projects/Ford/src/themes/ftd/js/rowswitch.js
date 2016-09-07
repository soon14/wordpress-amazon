//switch rows for pts
(function(){
	var RowSwitch = function(){
		var rowSwitch = this;

		rowSwitch.init = function(){
			var brandIndex = -1,
				$models = $(".ptslist .models ul"),
				brands = [];
				brandClass = "brand0";

			// Is video player table?
			var $isVideo = $(".ptslist.player");

			$(".ptslist tbody tr").each(function(idx){
				var $this = $(this),
					$brand, brand;
				
				if ($isVideo.size()) {
					$brand = $($(".alleft", $this)[0]);
				} else {
					$brand = $(".carr", $this);
				}

				if ($brand.size() && brands.join().indexOf(brand = $brand.text()) < 0) {
					brandIndex++;
					brandClass = "brand" + brandIndex;
					
					$("<li><a href='#' class='" + brandClass + "' title='" + brand + "' >" + brand + "</a></li>").appendTo($models);
					
					brands.push(brand);
				}

				$this.addClass(brandClass);
			});
		};

		rowSwitch.bind = function(){
			$(".ptslist li a").click(function(e){
				e.preventDefault();
				var $this = $(this);

				$.bbq.pushState({
					"brand" : $this.attr("class"),
					"brandname" : $this.text()
				});

			});

			$(window).bind("hashchange", function(){
				var brand = $.bbq.getState("brand");
				var split = $.bbq.getState("splittable");

				if (brand) {
					//reset rows
					rowSwitch.reset(brand);

					//reset text of select models
					$(".ptslist .model-select span").text($.bbq.getState("brandname"));

					//reset deep link of print view
					var $printview = $(".ptslist .printview");
					$printview.attr({
						"href": $.param.fragment(
									$printview.attr("href"),
									$.deparam.fragment()
								)
					});
				}

				if(split == "1"){
					rowSwitch.split();
				}
			});
		};

		rowSwitch.reset = function(className){
			$(".ptslist tbody tr").each(function(){
				var $this = $(this);

				if (className == "brandall" || $this.hasClass(className)) {
					$this.show();
				}else{
					$this.hide();
				}
			});
		};

		//remove cells: including the colgroup, th and td
		rowSwitch.removeCell = function($table, begin, end){
			$("colgroup col", $table).each(function(idx){
				if(idx >= begin && idx <= end ){
					$(this).remove();
				}
			});

			$("tr th", $table).each(function(idx){
				if(idx >= begin && idx <= end ){
					$(this).remove();
				}
			});

			$("tr", $table).each(function(){
				$("td", $(this)).each(function(idx){
					if(idx >= begin && idx <= end ){
						$(this).remove();
					}
				});
			});
		};

		rowSwitch.split = function(options){
			//prepare to split the table
			$(".ptslist h1").before($("#header #badge"));

			if (!options) {
				options = {
					start: 4, /* start index, 0~n */
					split: 0  /* split index, it should be bigger than start index */
				};
			}

			var $table1 = $(".ptslist");
			var $table2 = $table1.clone().insertAfter($(".ptslist"));

			//caclue the mid-value of table coloumns
			options.split =  Math.round(($("col", $table1).size() + options.start) / 2);

			rowSwitch.removeCell($table1, options.split, 1000);
			rowSwitch.removeCell($table2, options.start, options.split - 1);

			$table1.after($table2);
		};
	};

	$(function(){
		var rowSwitch = new RowSwitch();
		rowSwitch.init();
		
	    $(window).load(function(){
             rowSwitch.bind();
		});

		//trigger the hashchange event on page load
		$(window).trigger("hashchange");
	});

})(jQuery);
