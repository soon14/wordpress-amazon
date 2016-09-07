(function($, window, undefined){

	//namespacing
	var ND = window.ND = window.ND || {};
	ND.API = ND.api || {};
	
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
				return this.get() != null ? (this.get().toString().length > 0) : false;
			},
			contains:function(value){
				return this.get().indexOf(value) > -1;
			}
		};
		
		//Quick (single callback) Deferred Implementation.
		ND.deferred = function() {

			var cb, 
				resolved,
				run = function() {
					cb && cb.call();						
				};
			
			return {
				resolve: function() {
					resolved = true;
					run();
				},
				done: function( fn ) {
					cb = fn;
					resolved && run()
				}
			};		
		};

			
	
	
	//Protect from missing LAB/loader script.
	if(window['$wait'] === undefined) {
		window['$wait'] = function(fn){
			fn();
		}
	}
	
})(jQuery, window);
