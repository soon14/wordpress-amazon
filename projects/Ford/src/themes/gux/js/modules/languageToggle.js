var guxApp = guxApp || {};

(function($){
	
	guxApp.lang = {
		init:function(){
			if($("#lang-toggle")){
				$("#lang-toggle").change(function(){
					window.location.href = $("#lang-toggle option:selected").val();
				});
			}
		}
	};

	$(function(){
		guxApp.lang.init();
	});
		
})(jQuery);