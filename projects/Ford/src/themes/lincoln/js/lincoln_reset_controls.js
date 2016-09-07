/**
 * @author biaoq
 */




ND.lincolnResetOl = (function($, undefined){



lincolnResetOl={
	

	
	init: function() {
	
	//console.log("run reset overlayer contols position");
	var oly=$("#overlay .controls>ul>li");
	//console.log(oly.eq(0));
	
	if(oly.eq(0).attr("class")=="pagination"){
		
		//console.log("yes");
		oly.eq(0).before(oly.eq(1));
	}
	
	
	
	
	
	}
	
};

return function( arg ) {
		var lcrol = Object.create( lincolnResetOl );
		lcrol.init.call( lcrol, arg );
		return lcrol;
	};

}(jQuery));