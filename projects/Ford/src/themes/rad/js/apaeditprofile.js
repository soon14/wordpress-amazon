/*
Author: Biao
Description: Edit profile

Modified By: Faris
Modified Date: 2013-11-20
Description: Add, update, delete vehicle
*/

(function($) {

	var editprofile = {
		init: function() {
			var delitem;
			$("#displaypwd").click(function(e) {							
				$('#password').hide();
				$('#passwordfake').show().val($('#password').val()).attr("class",$('#password').attr("class"));	
				$("#displaypwd").hide();
				$("#hidepwd").show();
			})
			$("#hidepwd").click(function(e) {				
				$('#passwordfake').hide();
				$('#password').show().val($('#passwordfake').val()).attr("class",$('#passwordfake').attr("class"));
				$("#displaypwd").show();
				$("#hidepwd").hide();
			})
			$('#passwordfake').change(function(e){
				$('#password').val($('#passwordfake').val()).attr("class",$('#passwordfake').attr("class"));	
			})
			$('#password').change(function(e){
				$('#passwordfake').val($('#password').val()).attr("class",$('#password').attr("class"));	
			})
			
			$(".user-vehicle .edit").click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				$(".user-vehicle .state-readonly").hide();
				$(".user-vehicle .state-edit").show();
				
				var vehicleId = $(this).parent().parent().children(":eq(0)").attr("for");
				delitem = $(".user-vehicle .state-edit").children();
				for (var i = 0; i < delitem.size(); i++) {
					if (delitem.eq(i).children(":eq(0)").children(":eq(0)").children(":eq(0)").attr("name") == vehicleId) {
						delitem.eq(i).show();
					} else {
						delitem.eq(i).hide();
					}
				}
			})
			
			$(".user-vehicle .icon-add").click(function(e) {
				e.preventDefault();
				var $flexFields = $(this).closest(".double").find(".flexfield");
				var doubleSize = $(".double").children().size();

				// rename the queue, skip the template, retain the flexfield group first
				$flexFields = $(this).closest(".double").find(".flexfield");
				for (var i = 1; i <= $flexFields.size(); i++) {
					$("input", $flexFields.eq(i)).each(function() {
						var $input = $(this);
						$input.attr({
							"name": $input.attr("name").replace(/\d+$/g, doubleSize - 2 + i),
							"id": $input.attr("id").replace(/\d+$/g, doubleSize - 2 + i)
						});
					});
					$("label", $flexFields.eq(i)).each(function() {
						var $input = $(this);
						$input.attr({
							"for": $input.attr("for").replace(/\d+$/g, doubleSize - 2 + i)
						});
					});
					$(".submitVehicleForm", $flexFields.eq(i)).each(function() {
						var $input = $(this);
						$input.attr({
							"data-index": doubleSize - 2 + i
						});
					});
					
				}
			})
			
			$(".user-vehicle .cancel").live('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				$(this).closest("form").get(0).reset();
				$(".user-vehicle .state-readonly").show();
				$(".user-vehicle .state-edit").hide();
			})
			
			$(".userdetail .edit").click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				$(".userdetail .state-readonly").hide();
				$(".userdetail .state-edit").show();
			})
			
			$(".userdetail .cancel").click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				$(this).closest("form").get(0).reset();
				$(".userdetail .state-readonly").show();
				$(".userdetail .state-edit").hide();
			})
			
			$(".user-vehicle .cancelAddVehicle").live('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				$(this).parent().parent().parent().remove();
			})
			
			$(".user-vehicle .icon-remove").click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				$("#deleteoverlay").show();
				$("body").addClass("noscroll");//fix issue #194303
				var delVehicle = $(this).attr("data-delete");
				$("#deleteoverlay #bg #content input[id=delVehicle]").attr("name",delVehicle);
				var textVal = $("#deleteoverlay #bg #content input[name=confirmDelVehicle]").val()
								.replace("%1", $("div fieldset div div.row label[for=firstname]").parent().find("h5").text())
								.replace("%2", $("div fieldset div div.row label[for=lastname]").parent().find("h5").text())
								.replace("%3", $(this).parent().parent().find("h5:first").text());
				//$("#deleteoverlay #bg #content input[name=confirmDelVehicleId]").val($(this).parent().parent().find("label:first").attr("for"));
			
				$("#deleteoverlay #bg #content h3").text(textVal);
				$("#deleteoverlay #bg #content img").attr("src", $(this).parent().parent().parent().find("div div div img").attr("src"));
			})
			$(".state-edit .passwords-match").live('keyup',function(){
				
				var inputpss=$(".state-edit .passwords-match"),
					totallen=0;
				$.each(inputpss,function(i){
					totallen+=inputpss.eq(i).val().length;
				})
				
				if(totallen>0){
					inputpss.attr("required","true");
				}else{
					inputpss.removeAttr("required");
				}
				inputpss.trigger("focusout");
			})
			$(".state-edit #password").live('keyup',function(){				
				var oldpwd = $(".state-edit #oldpassword");
				if($(this).val()!==""){
					oldpwd.attr("required","true");
				}else{
					oldpwd.removeAttr("required");
				}
				oldpwd.trigger("focusout");
				$(this).trigger("focusout");
			})
			$("#deleteoverlay .cancel").click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				$("#deleteoverlay #bg #content input[id=delVehicle]").attr("name","delVehicle");
				$("#deleteoverlay").hide();
				$("body").removeClass("noscroll");
			})
			
			$("#deleteoverlay .delete").click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				
				var delVehicleId = $("#deleteoverlay #bg #content input[id=delVehicle]").attr("name");
				$(".user-vehicle .state-edit input[name=" + delVehicleId + "]").parent().parent().parent().remove();
				$(".user-vehicle .state-readonly label[for=" + delVehicleId + "]").parent().parent().remove();
				
				$("#deleteoverlay").hide();
			})
			
			$(".double div[class~=flexfield] div[class~=radio] div").live('click', function(e) {
				$(this).children("input[type=radio]:eq(0)").val("Y");
				$(this).children("input[type=radio]:eq(1)").val("N");
			})
			
			$(".cancelPreference").live('click',(function(e) {
				e.preventDefault();
				e.stopPropagation();
				
				/*$(this).closest("form").get(0).reset();
				location.reload(true);*/
				editprofile.fillPreferenceVaules($(this));
				
				
			}))
			
			$(".submitForm").click(function(e) {				
				 var $form = $(this).closest("form");
				 if($form.checkValidity()){
					 var fieldsData = new Object();	
					 var inputs = $("input,select,textarea",$form);
					 jQuery.each(inputs, function(i, field){
						 var fieldValue = $(this).val();
						 if ($(this).attr("type") == 'radio' || $(this).attr("type") == 'checkbox'){
							 fieldValue = $(this).filter(':checked').val();
							 if(!fieldValue) fieldValue = "N";
						 }					 
						 if($(this).attr("type") !== 'password'||($(this).attr("type") == 'password' && fieldValue !=="" && fieldValue!==undefined)){
							 //for state&& city,cannot pass an empty string
							 if($.trim(fieldValue) == ""||fieldValue == undefined){fieldValue = "";$(this).val(fieldValue);}
							 fieldsData[$(this).attr("name")] = fieldValue;
						 }
					 });					 
					//console.log(fieldsData);				
					editprofile.sendFormData($(this),$form,fieldsData);
				}			
			})
			$(".delVehicleForm").click(function(e) {				
				var $form = $(this).closest("form");				
				var delVel = $("#deleteoverlay #bg #content input[id=delVehicle]");
				if (!delVel) return;
				var fieldsData = new Object();								
				fieldsData["user-profile-action"] = "update-partial-user";
				fieldsData[delVel.attr("name")] = delVel.val();
				editprofile.sendFormData($(this),$form,fieldsData);
			})
			
			$(".submitVehicleForm").live('click', function(e) {
				var $form = $(this).closest("form");				
				var fields = [{"name":"vehicle_vin_X"},{"name":"vehicle_nickname_X"},{"name":"primary_vehicle_id_X"}];
				var fieldsData = new Object();
				var index = $(this).attr("data-index");
				if (!index) return;
				fieldsData["user-profile-action"] = "update-partial-user";
				var inputParent = $(this).parent().parent();
				jQuery.each(fields, function(i, field){
					var fieldName = field.name.replace("X",index);
					if ($("input[name = "+ fieldName +"]",inputParent).checkValidity()){
						var fieldValue = $("input[name = "+ fieldName +"]",inputParent).val();
						if ($("input[name = "+ fieldName +"]",inputParent).attr("type") == 'radio'){
							fieldValue = $("input[name = "+ fieldName +"]",inputParent).filter(':checked').val();
						}
						fieldsData[fieldName] = fieldValue;
					}
				});					
				editprofile.sendFormData($(this),$form,fieldsData);				
			})			
		},checkData:{}
		,
		getPreferenceVaules:function(){
			if(!$(".preferences").size()){return;}
			var checkItem=$(".preferences .checkbox-image"),
				checkItemid="",
				checkItemvalue="N";
			
			$.each(checkItem,function(i){
				
				checkItemid=checkItem.eq(i).next().attr("id");
				if(checkItem.eq(i).hasClass("checked")){
					checkItemvalue="Y";
				}else{
					checkItemvalue="N";
				}
				
				editprofile.checkData[checkItemid]=checkItemvalue;
			})
			
		},
		trackpage:function(){
			
			if (window._da && window._da.om && ND && ND.omniture) {
				ND.analyticsTag.trackOmniturePage({
					pname: _da.pname+" completed",
					hier: _da.hier
				});
			}
		}
		,
		fillPreferenceVaules:function(curEl){
			var checkItem=$(".preferences .checkbox-image"),
				checkItemid="";
			if(curEl){
				var optGroup = curEl.closest(".preferences").find(".opt-inout-checkbox .option-group");
			}
			$.each(checkItem,function(i){
				checkItemid=checkItem.eq(i).next().attr("id");
				if(editprofile.checkData && editprofile.checkData[checkItemid]){
					if(editprofile.checkData[checkItemid]=="Y"){
						checkItem.eq(i).addClass("checked");
						checkItem.eq(i).siblings("input[type=checkbox]").prop("checked",true);//while remove the value as well
					}else{
						checkItem.eq(i).removeClass("checked");
						checkItem.eq(i).siblings("input[type=checkbox]").prop("checked",false);//while remove the value as well
					}
				}
			});
			//"component with class ".opt-inout-checkbox" has slide animation, will need to trigger slide manually after "cancel" btn clicked"
			if(optGroup&&optGroup.length>0){
				var parentChkBox = optGroup.siblings(".checkbox-image"),
					childChkBox = optGroup.find(".checkbox-image"),
					count = 0;
				if(childChkBox.length>0){
					childChkBox.each(function(){
						if($(this).hasClass("checked")){
							count++;
						}
					});
					
					if(parentChkBox.hasClass("checked")){
						optGroup.slideUp();//hide
						curEl.closest(".preferences").find(".opt-inout-checkbox").removeClass("showErr");
						optGroup.find("input[type=checkbox]").each(function(){
							$(this).prop("required",false);
						});
					}else{
						if(count>0&&optGroup.is(":hidden")){
							optGroup.slideDown();//show
						}
					}
				}
			}
		}
		,
		sendFormData:function(item,elem,json){
		    if ($(elem).find(".ws-invalid").length > 0) return;

		    //add primary vin info
		    var primaryVin = null;
		    $.each($('.state-readonly div div .columns-vehicle label[for^=primary_vehicle_id_]'), function (i, label) {
		        if ($(label).text() === 'true') {
		            primaryVin = $(label);
		        }
		    });
		    var vin = primaryVin.parent().find('label[for^=vehicle_vin_]');
		    var vin_name = primaryVin.parent().find('label[for^=vehicle_nickname_]');
		    if (vin.length > 0 && vin_name.length > 0 && !json[vin.attr('for')]) {
		        json[vin.attr('for')] = vin.next().text();
		        json[vin_name.attr('for')] = vin_name.next().text();
		    }

			var fieldset = $(elem).find(".state-readonly")[0];
			$(elem).find(".columns.error").empty();
			$.ajax({
				type: "post",
				url: $(elem).attr("action"),
				contentType:"application/json; charset=UTF-8",
				data: JSON.stringify(json),					
				dataType: "json",
				success: function(result) {					
					if (result.success ==="true"){		
						var editIndex = $("a.savechange").index($(item));
						if($(item).attr("data-index")){
							editIndex = $(item).attr("data-index");
						}
						$.cookie("postsuccess",editIndex);						
						editprofile.trackpage();
						location.reload(true);
					}else if(result.errors.length > 0){						
						var errorMsg = "";
						$.each(result.errors,function(idx,item){
							var label = $("[name="+item.field+"]").prev("label").text();
							if(!label){label = item.field;}
							if(item.translation){
								errorMsg += label +": " +item.translation +"<br/>";
							}else{
								errorMsg += label +": " +item.translationKey +"<br/>";
							}
						});							
						$(fieldset).before("<div class='large-10 large-centered columns error'><p style='color:#f00'>"+errorMsg+"</p></div>")
					}	
				}
			});	
		},getpostsuccessmeg:function(){
			if($.cookie("postsuccess")){
				var savedtextIndex = $.cookie("postsuccess");				
				$("p.successtips").show();
				
				if (savedtextIndex != -1){										
					$("h5.savedtext").eq(savedtextIndex).show();
				}
				$.cookie("postsuccess",null);
			}else{
				$("p.successtips").hide();
				$("h5.savedtext").hide();
			}
		}
	};
	$(window).load(function(){
		
		editprofile.getPreferenceVaules();
		
	})

	$(function() {
	
		editprofile.getpostsuccessmeg();
		editprofile.init();
	});
})(jQuery);
