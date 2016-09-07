/* 
 Author: Biao 
 Description: Gifts Radio 
*/

(function($){
	var giftsRadio = {
		init: function(){
				
		giftsRadio.evtControl();
		},
		evtControl:function(){
		 $(".giftsradio #giftsImage").click(function(){
			$(this).next("label").trigger("click");
		 })
		 $(".giftsradio .gift label").click(function(){
			$(".giftsradio #gifttag").removeClass("checked");
			$(".giftsradio #giftsImage").removeClass("checked");
			$(".giftsradio .gift").removeClass("ws-invalid");
			$(this).siblings("#gifttag").addClass("checked");
			$(this).siblings("#giftsImage").addClass("checked");
		 })
		}
	}
	
	$(function(){		
		giftsRadio.init();		
	});
})(jQuery);
