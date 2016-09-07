jQuery(window).bind('load', function(){

	function clear() {
		//clear cookies
		$.cookie("sp.pc", null, {path:'/'});
		$.cookie("sp.us", null, {path:'/'});
		$.cookie("sp.us.l", null, {path:'/'});
		$.cookie("sp.rg", null, {path:'/'});
		$.cookie("sp.rg.l", null, {path:'/'});
		$.cookie('price.usage', null, {path:'/'});
	}
	clear();
	
	module("Shopping Preferences Cookie", {
		setup: function() {
			this.shoppingPreferenceManager = ND.shoppingPreferenceManager();
		},
		teardown: function() {
			clear();
			this.shoppingPreferenceManager.destroy();
			this.shoppingPreferenceManager = null;
		}	
	});
	
	test("Simple usage", function() {

		//1
		ok( this.shoppingPreferenceManager, "Returned this.shoppingPreferenceManager");
		
		//2
		var data = this.shoppingPreferenceManager.getStoreData();
		deepEqual( data, {}, "No data" );
		
		//3
		this.shoppingPreferenceManager.setStoreData({
			region: 'melb',
			regionLabel: 'Melbourne'
		});
		var data = this.shoppingPreferenceManager.getStoreData();
		deepEqual( data, { region: 'melb', regionLabel: 'Melbourne' }, "Set data" );

		//4
		this.shoppingPreferenceManager.setStoreData({
			postcode: '3000',
			usage: 'p',
			usageLabel: 'Personal',
			dummyData: 'asdasd'
		});
		var data = this.shoppingPreferenceManager.getStoreData();
		deepEqual( data, { postcode: '3000',usage: 'p', usageLabel: 'Personal', region: 'melb', regionLabel: 'Melbourne' }, "Set more data" );
		
		//5
		this.shoppingPreferenceManager.setStoreData({
			postcode: 4000,
			usage: 'c',
			usageLabel: 'Commercial'
		});
		var data = this.shoppingPreferenceManager.getStoreData();
		deepEqual( data, { postcode: 4000 ,usage: 'c', usageLabel: 'Commercial', region: 'melb', regionLabel: 'Melbourne' }, "Set more data" );

		//6
		this.shoppingPreferenceManager.setStoreData({
			region: '',
			regionLabel: '',
			postcode: '',
			usage: '',
			usageLabel: ''
		});		
		var data = this.shoppingPreferenceManager.getStoreData();
		deepEqual( data, {}, "Clear data" );

		//7
		this.shoppingPreferenceManager.setStoreData({
			postcode: '3000',
			usage: 'p',
			usageLabel: 'Personal',
			dummyData: 'asdasd'
		});		
		this.shoppingPreferenceManager.clearStoreData();
		var data = this.shoppingPreferenceManager.getStoreData();
		deepEqual( data, {}, "Clear data" );
		
		
	});
	
	test("Usage with defaults", function() {
		
		//1
		var data = this.shoppingPreferenceManager.getStoreData();
		deepEqual( data, {}, "No data" );
		
		//2
		this.shoppingPreferenceManager.setStoreData({
			postcode: '4000',
		});
		var data = this.shoppingPreferenceManager.getStoreData();
		deepEqual( data, { postcode: '4000',usage: 'p', usageLabel: 'Personal'}, "Set postcode, gain usage defaults" );

	});
	

	
	test("PUBSUB usage", function() {

		//Setup	
		var data;		

		//1
		$.publish( "shopping.pref.retrieve", function(e, retrieveData) {
			data = retrieveData;
		});
		deepEqual( data, {}, "No data" );
		
		//2
		$.publish( "shopping.pref.save", {
			region: 'melb',
			regionLabel: 'Melbourne'
		});
		$.publish( "shopping.pref.retrieve", function(e, retrieveData) {
			data = retrieveData;
		});
		deepEqual( data, { region: 'melb', regionLabel: 'Melbourne' }, "Set data" );

		//3
		$.publish( "shopping.pref.save", {
			postcode: '3000',
			usage: 'p',
			usageLabel: 'Personal'
		});
		$.publish( "shopping.pref.retrieve", function(e, retrieveData) {
			data = retrieveData;
		});		
		deepEqual( data, { postcode: '3000',usage: 'p', usageLabel: 'Personal', region: 'melb', regionLabel: 'Melbourne' }, "Set more data" );
		
		//4
		$.publish( "shopping.pref.save", {
			region: '',
			regionLabel: '',
			postcode: '',
			usage: '',
			usageLabel: ''
		});		
		$.publish( "shopping.pref.retrieve", function(e, retrieveData) {
			data = retrieveData;
		});	
		deepEqual( data, {}, "Clear data" );
		
		//5
		$.publish( "shopping.pref.save", {
			postcode: '3000',
			usage: 'p',
			usageLabel: 'Personal'
		});	
		$.publish( "shopping.pref.clear" );
		$.publish( "shopping.pref.retrieve", function(e, retrieveData) {
			data = retrieveData;
		});	
		deepEqual( data, {}, "Clear data" );
	
	});
	
	test("PUBSUB usage - change channel", function() {

		//Setup
		var data;		
		$.subscribe( "shopping.pref.change", function(e, retrieveData) {
			data = retrieveData;
		});	
		
		//1
		$.publish( "shopping.pref.save", {
			region: 'melb',
			regionLabel: 'Melbourne'
		});
		deepEqual( data, { region: 'melb', regionLabel: 'Melbourne' }, "Set data" );

		//2
		$.publish( "shopping.pref.save", {
			postcode: '3000',
			usage: 'p',
			usageLabel: 'Personal'
		});		
		deepEqual( data, { postcode: '3000',usage: 'p', usageLabel: 'Personal', region: 'melb', regionLabel: 'Melbourne' }, "Set more data" );

		//3
		$.publish( "shopping.pref.save", {
			region: '',
			regionLabel: '',
			postcode: '',
			usage: '',
			usageLabel: ''
		});		
		deepEqual( data, {}, "Clear data" );
		
		//4
		$.publish( "shopping.pref.save", {
			postcode: '3000',
			usage: 'p',
			usageLabel: 'Personal'
		});	
		$.publish( "shopping.pref.clear" );
		deepEqual( data, {}, "Clear data" );


	});
	
	module("Shopping Preferences  / POLK", {
		setup: function() {
			this.polkData = {'postcode':'6543', 'usage':'c', 'usageLabel':'commercial'};
	
			// Setup a POLK cookie
			var store = Object.create(ND.cacheStore);
			store.key = 'price.usage';
			store.set(this.polkData);
		},
		teardown: function() {
			clear();
		}	
	});

	test("upgrade POLK cookie", function() {
		
		equal( $.cookie('price.usage'), JSON.stringify(this.polkData) , "Polk Cookie present");
		equal( $.cookie('sp.pc') , null, "NOT: Postcode stored in cookie");
		equal( $.cookie('sp.us') , null, "NOT: Usage stored in cookie");
		equal( $.cookie('sp.us.l') , null, "NOT: Usage stored in cookie");

		// Page Load!!
		this.shoppingPreferenceManager = ND.shoppingPreferenceManager();
		
		equal( $.cookie('price.usage'), null , "Polk Cookie removed");
		equal( $.cookie('sp.pc') , '6543', "Postcode stored in cookie");
		equal( $.cookie('sp.us') , 'c', "Usage stored in cookie");
		equal( $.cookie('sp.us.l') , 'commercial', "Usage stored in cookie");
		
		this.shoppingPreferenceManager.destroy();
		
	});
	
});