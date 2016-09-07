jQuery(window).bind('load', function(){
	
	module("Core");
	
	test("Init", function() {
		expect(4);
		ok( jQuery, "jQuery");
		ok( window.ND, "ND" );
		ok( window.ND.API, "ND.API" );
		equals( $ , jQuery, "$ === jQuery (noConflict not invoked)" );		
	});
	
	test("Overlay API", function() {
		expect(3);
		ok( ND.API.launchOverlay, "ND.API.launchOverlay" );
		ok( ND.API.getOverlay(),  "I got me an Overlay Object" );
		ok( ND.launchOverlay, " ND.launchOverlay (Depreciated, use ND.API.launchOverlay)" );
	});

	test("PUBSUB", function() {
		expect(4);
		ok( jQuery.publish, "jQuery.publish" );
		ok( jQuery.subscribe, "jQuery.subscribe" );
		
		var text, fn = function(event, t) {
			text = t;
		};
		$.subscribe('null.feed', fn);
		$.publish('null.feed', "my string")
		equal( text , "my string", "Subscribe Publish" );
		$.unsubscribe('null.feed', fn);
		$.publish('null.feed', "other string")
		equal( text , "my string", "Unsubscribe Publish" );
	});
	
	

	
});
