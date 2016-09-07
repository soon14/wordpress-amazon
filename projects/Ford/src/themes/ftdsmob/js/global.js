/**
 * 
 */

//Cookie Object abstraction

ND.cacheStore = {
	get:function(){
		var value = $.trim($.cookie(this.key));
		try {
			return value ? JSON.parse(value) : "";
		} catch (e) {
			return value || "";
		}			
	},
	set:function(value){
		value = $.isPlainObject(value) ? JSON.stringify(value) : value;
		if(this.get() !== value) {
			//Session cookie
			var options = {path:'/'};
			if( this.expires ) {
				options.expires = this.expires; 
			}	
			if(this.domain){
				options.domain=this.domain;
			}			
			$.cookie(this.key, value || null, options);
		}
	},
	is:function(){
		return this.get().length > 0;
	},
	contains:function(value){
		return this.get().indexOf(value) > -1;
	}
};
