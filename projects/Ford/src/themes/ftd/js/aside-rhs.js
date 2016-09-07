(function($) {
	ND.asideRHS={
		init:function(){
			
		},sumHeight:function(){
			if(!$(".aside-rhs").size()){return};
			var childHieght=$(".aside-rhs").find("#rhs").outerHeight()+20;
			$(".aside-rhs").height(childHieght);
			
		}
		
	};
	$(window).load(function(){
		
		ND.asideRHS.sumHeight();
	});
	$(function(){
		
		ND.asideRHS.sumHeight();
	})
})(jQuery);