jQuery(window).bind('load', function(){

	module("Cookies");
	
	test("via ND.cacheStore", function() {
		expect(8);
		
		//clear cookie
		$.cookie("jsunitcookie.dfy", null, {path:'/'});
		
		//Setup
		var sessionStore = Object.create(ND.cacheStore);
		sessionStore.key = "jsunitcookie.dfy";
		
		//Empty Cookie
		var data = sessionStore.get();
		ok( !data, "New cookie");
		
		//Set Cookie
		sessionStore.set("xyz")
		data = sessionStore.get();		
		equals(data, "xyz", "Set cookie")
		
		//Clear Cookie
		sessionStore.set()
		data = sessionStore.get();		
		equals(data, "", "Clear cookie")
		notEqual(data, "xyz", "Set cookie")
		
		//Set Cookie
		sessionStore.set({xyz:'abc'})
		data = sessionStore.get();		
		deepEqual(data, {xyz:'abc'}, "Set cookie")
		notDeepEqual(data, {xyz:'ac'}, "Set cookie")
		notEqual(data, "xyz", "Set cookie")

		//Clear Cookie
		sessionStore.set()
		data = sessionStore.get();		
		equals(data, "", "Clear cookie")
		
	});
	
	test("via ND.yearlyStore", function() {
		//clear cookie
		$.cookie("jsunitcookie.dfyYearlyStore", null, {path:'/'});
		
		//Setup
		var yearlyStore = Object.create(ND.cacheStore);
		yearlyStore.key = "jsunitcookie.dfyYearlyStore";
		yearlyStore.expires = 365;
	    var data=	 {
				"postcode":3169,
				"usage":"p",
				"usageLabel":"l"
			};
	    
		//Empty Cookie
		var data = yearlyStore.get();
		ok( !data, "yearlyStore Empty cookie");

		//Set Cookie
	 	yearlyStore.set(data);	
		dataReturn = yearlyStore.get();		
		equals(dataReturn, data, "Set cookie");
			
		//Clear Cookie
		yearlyStore.set();
		dataReturn = yearlyStore.get();		
		equals(dataReturn, "", "Clear cookie");
		notEqual(dataReturn, "abc", "Set cookie");
	
		
		
	});
	
});
