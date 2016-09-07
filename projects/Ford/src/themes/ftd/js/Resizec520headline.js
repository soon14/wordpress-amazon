/**
 * @author biaoq
 */




ND.ResizeHeadline = (function($, undefined){



ResizeHeadline={
	

	
	init: function() {
	
	var myhdline=$(".leftpanel");
	
	for(var i=0;i<myhdline.length;i++){
		
		var myhead=$("h3",$(myhdline[i]))
		//console.log(myhead.height());
		if(myhead.height()>39){
		
		myhead.parent().addClass("c520featuretwoline");
	}
	}
	
	
	
	}
	
};

return function( arg ) {
		var rehd = Object.create( ResizeHeadline );
		rehd.init.call( rehd, arg );
		return rehd;
	};

}(jQuery));