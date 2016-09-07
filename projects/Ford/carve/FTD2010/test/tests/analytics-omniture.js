var s;

jQuery(window).bind('load', function(){

	module("Omniture Analytics");
	
	var ndOm, globals;
	
	s = {
		t: function() {
			alert("in t()");
		},
		reset: function() {
			delete this.args;
		}
	};
	
	
//	_omtag = {
//	};
	ndOm = ND.analytics.create( 'omniture', s );
	ND.analytics.register( ndOm );
//	
//	// The Meta Tags that are real and rendered by JSP   (Req 2.2.1)
//	globals = ["WT.cg_n","Lebanon","WT.cg_s","Lebanon EN"];
//	
//	//Funnel Stuff, dynamic meta tags  (Req 2.4)
//	ndOm.preCollection( _da );
//	$.merge( globals, ["WT.si_p", "funnelstepname", "WT.si_n", "funnelname"] )
	
	
	test("Simple page track", function() {
	
		expect(1);
		
		s.reset();
		ndOm.trackPageView( { title: 'Page Title' } );
		equal( s.pageName, 'Page Title', "trackpage Title" );
				
//		_omtag.reset();
//		ndOm.trackPageView( { title: '' } );
//		deepEqual( _omtag.args, $.merge(["WT.ti", ""], globals), "trackpage empty Title" );		
//
//		_omtag.reset();
//		ndOm.trackPageView( { title: 'Really really long title that contains @$%@#$%!#$%' } );
//		deepEqual( _omtag.args, $.merge(["WT.ti", 'Really really long title that contains @$%@#$%!#$%'], globals), "trackpage empty Long" );		
//
//		_omtag.reset();
//		ndOm.trackPageView();
//		deepEqual( _omtag.args, globals, "No Arguments, this is ok because the real Multitrack works this way" );		
//		
//		/*  Same again but with PUBSUB */
//		
//		_omtag.reset();
//		$.publish('/analytics/pageview/', { title: 'Page Title' } );
//		deepEqual( _omtag.args, $.merge( ["WT.ti", "Page Title"], globals), "PUBSUB trackpage Title" );		
//				
//		_omtag.reset();
//		$.publish('/analytics/pageview/', { title: '' } );
//		deepEqual( _omtag.args, $.merge(["WT.ti", ""], globals), "PUBSUB trackpage empty Title, it's empty so we can override it.. clear it" );		
//
//		_omtag.reset();
//		$.publish('/analytics/pageview/', { title: 'Really really long title that contains @$%@#$%!#$%' } );
//		deepEqual( _omtag.args, $.merge(["WT.ti", 'Really really long title that contains @$%@#$%!#$%'], globals), "PUBSUB trackpage empty Long" );		
//
//		_omtag.reset();
//		$.publish('/analytics/pageview/');
//		deepEqual( _omtag.args, globals, "PUBSUB No Arguments, this is ok because the real Multitrack works this way" );				
	
	});

});
