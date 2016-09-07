/*
 To get the heightest col of the table, and set the height to all the cols
 * */
(function($,undefined){
	$(document).ready(function(){
		var _height=[];
		var max_height=[];
		if($(".owners-table").length>0){
				$(".owners-table .element-wrap").each(function(index) {//find table
				var row = $(this).find(".row");
				row.each(function(index){//find row
					var column = $(this).find(".columns");
					column.each(function(index){//find column
						_height.push($(this).outerHeight());
					});
					var max_height = Math.max.apply(Math,_height);
					column.each(function(index){
						$(this).css({
							height:max_height+"px"
						});//set max height to the column;
					});
					_height = []; //reset _height to empty array
				});
			});
		}
	});
})(jQuery);