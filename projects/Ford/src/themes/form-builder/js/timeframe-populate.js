/* 
 Author: Doris Zhang
 Description: Populate next 12 months based on current time in form
*/

(function($){
	var timePopulation = {
		init: function(){
			var monthNames = $("#InMarketDateMonthName").embeddedData();		
			var dateList=timePopulation.getDate();
			//console.log(monthNames);
			//console.log(dateList);
			$.each(dateList,function(i,item){	
				var id=item[0]+""+item[1];
				var value=monthNames[item[0]]+" "+item[1];
				$("#InMarketDate").append("<option value='"+id+"'>"+value+"</option>");
			});
			if (monthNames["unknown"] != '' && monthNames["unknown"] != undefined) {
			    $("#InMarketDate").append("<option value='unknown'>" + monthNames["unknown"] + "</option>");
			}
		},
		getDate: function(){
			var curDate=new Date();
			var month_count=12;
			var curMonth=curDate.getMonth();
			var curYear=curDate.getFullYear();
			var results=new Array();
			for(var i=0;i<month_count;i++)
			{
				curMonth+=1;
				if(curMonth>12){curMonth=1;curYear+=1;}				
				results[i]=new Array(curMonth,curYear);
			}						
			return results;
		}
	}
	
	$(function(){		
		timePopulation.init();		
	});
})(jQuery);


