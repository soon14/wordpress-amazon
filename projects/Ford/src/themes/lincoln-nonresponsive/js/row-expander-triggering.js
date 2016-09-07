/*
author: Ray
by click on specific item, open row expander
*/

(function($){	
	$(function(){
		var list = $("#c-vehicles-to-compare > ul > li").click(function(e){
			e.preventDefault();
			if($(this).hasClass("checked")){
				$(this).removeClass("checked");
			}else{
				$(this).addClass("checked");
			}
			$(this).parents("#c-comparison-chart:eq(0)").find("#tables .row-content-wrapper .expanddiv:eq("+ $(this).index() +") .head").trigger("click");
		})
	});
})(jQuery);


