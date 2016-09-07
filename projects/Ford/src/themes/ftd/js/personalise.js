(function($) {
	
	var ND = window.ND = window.ND || {};
	
	var personaliser = ND.personaliser = {

		userId: undefined,
		
		getUserId: function() {
			
			if (typeof this.userId !== 'undefined') {
				//do nothing return cached user id (this.userId) 
			} else {
				//check if user id cookie exist
				var store = Object.create(ND.cacheStore);
				store.key = "dfy.uuid";
				if (store.is()) {
					this.userId = store.get();
				} else {
					//user id cookie is not there - create
					this.userId = uuid.v1();
					store.expires = 365;
					store.set(this.userId);
				} 
			}
			
			return this.userId;
		}

	};	

	
})(jQuery);