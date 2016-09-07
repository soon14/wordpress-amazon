
//create by biaoqu

ND.lincolnRowSameHeight = (function($, undefined){



lincolnRowSameHeight={
	

	
	init: function() {
	
	
	this.reSizeHight();
	
	},
	reSizeHight :function(){
		
		var self=this;
		var $dv= $(".feature-sections .row");
		
		for(var i=0;i<$dv.length;i++){
			
			
			self.resizeNow($dv[i]);
		}
	},
	resizeNow: function(divs){
		
		var $row=$(".feature-content>div",$(divs));
		var $row_wid=$(".feature-content",$(divs));
		
		if($row_wid.length==2 && $row_wid.hasClass("twocolumnwidth")==false){
			
			
			$row_wid.eq(1).addClass("sfeature-contentnomarl");
		}
		
		var mheight=0;
		for(var i=0;i<$row.length;i++){
			
			
			if($row.eq(i).height()>mheight){
				
				mheight=$row.eq(i).height();
			}
			
			
		}
		
		//console.log(mheight);
		for(var n=0;n<$row.length;n++){
			
			if($row.eq(n)){
			$row.eq(n).height(mheight);
			}
		}
	}
	
	
};

return function( arg ) {
		var lcrsh = Object.create(lincolnRowSameHeight);
		lcrsh.init.call( lcrsh, arg );
		return lcrsh;
	};

}(jQuery));