/**
 * @author Ivy
 * @project formbuilder
 * @description 
 * if there is a valid fbdata parameter, then set the value for hidden inputs, text, textarea, select, radio and checkbox.
 * Every  field which is needed to set default value has a class "prepopulate".
 * valid fbdata as below:
 * fbdata=title_ff=5.0^^^Dr||firstname_ff=Ma''ciej||lastname_ff=Kunc||ff_Personal=asd'asd
   fbdata=title_ff=5.0^^^Dr;;firstname_ff=Ma''ciej;;lastname_ff=Kunc;;ff_Personal=asd'asd
   Each field is separated by "||" or ";;"
 * 
 */
(function($){
	var prepopulate = {
			
			data :{},
			type:{
				"hidden":"input",
				"text":"input",
				"textarea":"input",
				"tel":"input",
				"email":"input",
				"text":"input",
				"select":"select",
				"radio":"check",
				"checkbox":"check"
			},
			parseData:function(fbdata){
				var array = fbdata.split(/\|\||;;/);
				//parse fbdata to store in data,data ={name1:[value1,value2..],name2:[]...}
				for(i=0;i<array.length;i++){
					var item =array[i];					
					var index = item.indexOf("=");
					if (index != -1) {           	
						var key = item.substring(0, index);						
						var value = item.substring(index+1);				
						if(prepopulate.data && prepopulate.data[key]){
							prepopulate.data[key].push(value);
						}else{
							var dataValue = [];
							dataValue.push(value);
							prepopulate.data[key] = dataValue;
						}
					}
				}
				
			},
			setInput:function(elem,elemName){
				$(elem).attr("value",prepopulate.data[elemName][0]);							
			},
			setCheck:function(elem,elemName){
				for(x in prepopulate.data[elemName]){					
					var value = $(elem).attr("value");
					if(value === prepopulate.data[elemName][x]){
						if($(elem).prev(".checkbox-image")){
							$(elem).prev(".checkbox-image").addClass("checked");
						}
						$(elem).attr("checked",true);
						break;
					}
				}				
			},
			setSelect:function(elem,elemName){														
				for(x in prepopulate.data[elemName]){										
					if ($(elem).find("option[value="+prepopulate.data[elemName][x]+"]")){
						$(elem).find("option[value="+prepopulate.data[elemName][x]+"]").attr("selected", true);
					}											
				}		
			},
			setValue:function(){
				$(".prepopulate").each(function(){
					var $elem = $(this);
					var elemName = $elem.attr("name");
					//text,hidden,radio,checkbox,tel,email
					var inputType = $elem.attr("type");
					//select,texteare
					var tagname = $elem.get(0).tagName;
					var populateType = prepopulate.type[inputType] || prepopulate.type[tagname.toLowerCase()];
					if(populateType  && prepopulate.data[elemName] && prepopulate.data[elemName][0]){						
						switch(populateType){
							case "input":
								prepopulate.setInput(this,elemName);
								break;
							case "check":
								prepopulate.setCheck(this,elemName);
								break;
							case "select":
								prepopulate.setSelect(this,elemName);
								break;
						}
					}
				});
				
			},
			queryString : function(val){
				//"http://foa.ndprod.corp.nextdigital.com/rad/quote-request/1248854622187?sitetype=web&site=FOA&fbdata=rad=two||First_Name_PP=Maciej||Opt_InOut=1||Opt_InOut=2||Cust_Title_PP=Ms";		         		        
		        //add decodeURIComponent
				 var uri = decodeURIComponent(window.location.search);
		         var re = new RegExp("" +val+ "=([^&?]*)", "ig");
		         return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);			  
			},
			init:function(){
				var fbdata = prepopulate.queryString("fbdata");
				if (!fbdata) return;
				prepopulate.parseData(fbdata);
				if (!prepopulate.data) return;
				prepopulate.setValue();
			}
		};
	$(document).ready(function(){		
		prepopulate.init();		
	});
})(jQuery);