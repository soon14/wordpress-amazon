/*
Author: 		George Ejr
File name: 		modelList.js
Description: 	Model Enhance List
Dependencies: 	jQuery
*/

var guxApp = guxApp || {};

(function($){ 

	$(function(){
		 
		guxApp.ModelList = {
			init: function() {
				var container = $(".model-enhance");
                if (!container.length) {return;}
			},
            fetchModelList: function(){
            	if(modelData!=null){ 
              		var request = $.ajax({
					url: modelData,
					method: "GET", 
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					async : false
					});
					request.done(function(data){
						$.each(data.derivatives, function(index, md) {
						 		$('#modelDataTemplate').tmpl(md).appendTo('.mw-content');
						});
					});
					request.fail(function(xhr, textStatus){
						console.log(textStatus);
					});
            	}
            },
            openMobileModal: function(){

            	$('#modalWrap').addClass('model-details-mobile').modal({
				});

 
            }
		}
		guxApp.ModelList.init();


	});
})(jQuery);