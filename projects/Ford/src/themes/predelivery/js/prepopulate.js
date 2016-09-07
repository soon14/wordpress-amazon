/*
 * Author: 		Biao Qu
 * Description: populate predelivery data from session
 */

ND.prepopulate=(function($){
	var prepopulate={
		init:function(elmetsname){
			
			this.populateVehicle(elmetsname);
		},
		populateForm:function(){
			if(!$("#predel-model-translation").size()){
				return;
			}
			var predelModel = $("#predel-model-translation").embeddedData();
			var defaultVals = $("#personalisation-default").embeddedData();
			for (prop in defaultVals) {
				if(predelModel.preferences[prop] === undefined){
					predelModel.preferences[prop] = defaultVals[prop];
				}
			}
			
			$.each(predelModel,function(i,val){
				
				$.each(predelModel[i],function(n,val){
					
					var inputelment=$("input[name="+n+"]"),
						slecetelm=$("select[name="+n+"]"),
						textareaelm=$("textarea[name="+n+"]"),
						aelm=(n === "wt_lighting_1" ? $("a:contains('"+val+"')") : "");
					
					if(inputelment.size()){
						
						if(inputelment.attr("type")=="radio" || inputelment.attr("type")=="checkbox" ){
							
							inputelment.val(predelModel[i][n]);
						}else{
							inputelment.val(predelModel[i][n]);
						}
						
					}
					if(slecetelm.size()){
						slecetelm.val(predelModel[i][n]);
					}
					if(textareaelm.size()){
						textareaelm.val(predelModel[i][n]);
					}
					if(aelm && aelm.size()){
						aelm.addClass("active");
						
						$("input#ambient-colour").val($.trim(aelm.text()));

						$(".colorizer .color-name").html(aelm.text());
					}
				});
			});
			
			$.uniform.update();
		},
		populateVehicle:function(elmetsname){
			
			if(!$("#predel-model-vehicle").size()){
				return;
			}
			var predelVechile=$("#predel-model-vehicle").embeddedData();
			
			$.each(predelVechile,function(v){
				
				
				if(elmetsname==v && elmetsname != "Dealership"){
					
					$("select[name="+v+"]").val(predelVechile[v]);
					$("#"+elmetsname).trigger('change');
					
				}else if(elmetsname==v && elmetsname == "Dealership"){
					var myselect=$("#"+elmetsname+" option");
					$.each(myselect,function(i){
						if(myselect.eq(i).attr("data-dcode")==(predelVechile["Dealership"])){
							myselect.eq(i).attr("selected",true);
						}
					});
				}
				
			});
		}
	};
	$(function(){
		
		prepopulate.populateForm();
		
	});
	return function(arg){
        var prepop = Object.create(prepopulate);
        prepop.init.call(prepop, arg);
        return prepop;
    };
})(jQuery);