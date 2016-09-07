
//create by biaoqu

ND.lincolnExpand = (function($, undefined){



lincolnExpand={
	

	
	init: function() {
	
	
	this.expandinit();
	this.expandall();
	this.collapseall();
	
	},
	expandinit: function(){
	  var self=this;
	  $(".expandtable").bind("click",function(e){
	  	
	  	
	  	
	  	var $this=$(this);
	  	var expandObj=$("tbody",$this);
	  	var expandicon=$("span",$this);
	  	
	  	//console.log(expandicon);
	  	
	  	if(expandObj.is(":hidden")){
	  		
	  		expandObj.show();
	  		expandicon.removeClass("arrowr-icon");
	  		expandicon.addClass("arrowr-icon-down");
	  		
	  	}else{
	  		
	  		expandObj.hide();
	  		
	  		expandicon.removeClass("arrowr-icon-down");
	  		expandicon.addClass("arrowr-icon");
	  		
	  	}
	  	
	  })
	},
	expandall :function(){
		
		
		
		$(".expandall").bind("click",function(e){
			
			var expandicon=$(".expandtable span");
			$(".expandtable tbody").show();
			expandicon.removeClass("arrowr-icon");
			expandicon.addClass("arrowr-icon-down");
		})
	},
	collapseall :function(){
		
		
		$(".collapseall").bind("click",function(e){
			
			var expandicon=$(".expandtable span");
			$(".expandtable tbody").hide();
			expandicon.removeClass("arrowr-icon-down");
	  		expandicon.addClass("arrowr-icon");
		})
		
	}
	
	
};

return function( arg ) {
		var lcExpand = Object.create( lincolnExpand );
		lcExpand.init.call( lcExpand, arg );
		return lcExpand;
	};

}(jQuery));