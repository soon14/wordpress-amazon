
//create by biaoqu


ND.lincolnJS = (function($, undefined){



lincolnJS={
	

	
	init: function() {
	
	this.sumDiv();
	
	},
	
	sumDiv: function(){
	
	var self=this;
	
	var $ulli=$(".gallerylist > div")	
		
		var divlength=$ulli.length;
		for(var i=0;i<divlength;i++){
			
			
			self.eachUL($ulli.eq(i));
		}
	},
	eachUL: function(divs){
		
		
		
		var self=this;
		var lis=$("li",$(divs));
		
		
		var ullength=lis.size();
		var teamsli3=Math.ceil(ullength/3);
		
		
		
		for(var n=0;n<teamsli3;n++){
			
			self.maxLi(lis,n);
		}
		
	},
	maxLi: function(total,tIndex){
		
		var temph=0;
		for(var m=0;m<3;m++){
			
			var cindex=tIndex*3+m;
			if(total.eq(cindex).height()>temph){
			temph=total.eq(cindex).height();
			}
			
			
			if(total.eq(cindex)){
				total.eq(cindex).height(temph);
			
			}
			
			
		}
	}
	
};

return function( arg ) {
		var lcJS = Object.create( lincolnJS );
		lcJS.init.call( lcJS, arg );
		return lcJS;
	};

}(jQuery));