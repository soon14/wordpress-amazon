jQuery(window).bind('load', function(){

	module("Analytics");
	
	var _tag, ndWT, globals;
	_tag = {
		dcsMultiTrack: function() {
			this.args = Array.prototype.slice.apply( arguments, [0, arguments.length] );
			
			$('meta[name^=WT]').each(function() {
				var $this = $(this)
				_tag.args.push( $this.attr('name') )
				_tag.args.push( $this.attr('content') )
			})
		},
		reset: function() {
			delete this.args;
		}
	};
	ndWT = ND.analytics.create( 'webtrends', _tag );
	ND.analytics.register( ndWT );
	
	// The Meta Tags that are real and rendered by JSP   (Req 2.2.1)
	globals = ["WT.cg_n","Lebanon","WT.cg_s","Lebanon EN"];
	
	//Funnel Stuff, dynamic meta tags  (Req 2.4)
	ndWT.preCollection( _da );
	$.merge( globals, ["WT.si_p", "funnelstepname", "WT.si_n", "funnelname"] )
	
	
	test("Simple page track", function() {
	
		expect(8);
		
		_tag.reset();
		ndWT.trackPageView( { title: 'Page Title' } );
		deepEqual( _tag.args, $.merge(["WT.ti", "Page Title"], globals), "trackpage Title" );		
				
		_tag.reset();
		ndWT.trackPageView( { title: '' } );
		deepEqual( _tag.args, $.merge(["WT.ti", ""], globals), "trackpage empty Title" );		

		_tag.reset();
		ndWT.trackPageView( { title: 'Really really long title that contains @$%@#$%!#$%' } );
		deepEqual( _tag.args, $.merge(["WT.ti", 'Really really long title that contains @$%@#$%!#$%'], globals), "trackpage empty Long" );		

		_tag.reset();
		ndWT.trackPageView();
		deepEqual( _tag.args, globals, "No Arguments, this is ok because the real Multitrack works this way" );		
		
		/*  Same again but with PUBSUB */
		
		_tag.reset();
		$.publish('/analytics/pageview/', { title: 'Page Title' } );
		deepEqual( _tag.args, $.merge( ["WT.ti", "Page Title"], globals), "PUBSUB trackpage Title" );		
				
		_tag.reset();
		$.publish('/analytics/pageview/', { title: '' } );
		deepEqual( _tag.args, $.merge(["WT.ti", ""], globals), "PUBSUB trackpage empty Title, it's empty so we can override it.. clear it" );		

		_tag.reset();
		$.publish('/analytics/pageview/', { title: 'Really really long title that contains @$%@#$%!#$%' } );
		deepEqual( _tag.args, $.merge(["WT.ti", 'Really really long title that contains @$%@#$%!#$%'], globals), "PUBSUB trackpage empty Long" );		

		_tag.reset();
		$.publish('/analytics/pageview/');
		deepEqual( _tag.args, globals, "PUBSUB No Arguments, this is ok because the real Multitrack works this way" );				
	
	});
	
	
	test("Event track", function() {
	
		expect(6);
		
		_tag.reset();
		ndWT.trackEvent( { title: 'The All-New Ranger -360 View', uri: '/all-new-ranger/360view' } );
		deepEqual( _tag.args, $.merge(["WT.dl", "99", "WT.ti", "The All-New Ranger -360 View", "DCS.dcsuri", "/all-new-ranger/360view",], globals), "Tracking an Event" );	

		_tag.reset();
		ndWT.trackEvent( { title: '', uri: '' } );
		deepEqual( _tag.args, $.merge(["WT.dl", "99", "WT.ti", "", "DCS.dcsuri", ""], globals), "Tracking an Event, empty" );	

		_tag.reset();
		ndWT.trackEvent();
		deepEqual( _tag.args, $.merge(["WT.dl", "99"], globals), "Tracking an Event, nothing" );	

		/*  Same again but with PUBSUB */
		
		_tag.reset();
		$.publish('/analytics/event/',  { title: 'The All-New Ranger -360 View', uri: '/all-new-ranger/360view' } );
		deepEqual( _tag.args, $.merge(["WT.dl", "99", "WT.ti", "The All-New Ranger -360 View", "DCS.dcsuri", "/all-new-ranger/360view",], globals), "PUBSUB Tracking an Event" );	

		_tag.reset();
		$.publish('/analytics/event/', { title: '', uri: '' } );
		deepEqual( _tag.args, $.merge(["WT.dl", "99", "WT.ti", "", "DCS.dcsuri", ""], globals), "PUBSUB Tracking an Event, empty" );	

		_tag.reset();
		$.publish('/analytics/event/');
		deepEqual( _tag.args, $.merge(["WT.dl", "99"], globals), "PUBSUB Tracking an Event, nothing" );	
	
	});
	
	test("Field Event track", function() {
	
		expect(4);
		
		_tag.reset();
		ndWT.trackField( { field: { name: 'firstname', value: 'John Doe' } } );
		deepEqual( _tag.args, $.merge(["WT.dl", "99","DCSext.firstname", "John Doe"], globals), "Tracking an Field Event" );	

		_tag.reset();
		ndWT.trackField( { field: { name: 'firstname', value: '' } } );
		deepEqual( _tag.args, $.merge(["WT.dl", "99","DCSext.firstname", ""], globals), "Tracking an Field Event with no value" );	

		/*  Same again but with PUBSUB */

		_tag.reset();
		$.publish('/analytics/field/', { field: { name: 'firstname', value: 'John Doe' } } );
		deepEqual( _tag.args, $.merge(["WT.dl", "99","DCSext.firstname", "John Doe"], globals), "Tracking an Field Event" );	

		_tag.reset();
		$.publish('/analytics/field/', { field: { name: 'firstname', value: '' } } );
		deepEqual( _tag.args, $.merge(["WT.dl", "99","DCSext.firstname", ""], globals), "Tracking an Field Event with no value" );	
		
	
	});


	test("Social event track", function() {
	
		expect(2);
		
		_tag.reset();
		ndWT.trackSocial( { title: 'Send to LinkedIn', uri: '/share/linkedin', socialId: 'LinkedIn' } );
		deepEqual( _tag.args, $.merge(["WT.dl", "99", "WT.ti", "Send to LinkedIn", "DCS.dcsuri", "/share/linkedin", "WT.z_share", "LinkedIn"], globals), "Tracking a Share Event" );	
		
		/*  Same again but with PUBSUB */

		_tag.reset();
		$.publish('/analytics/social/', { title: 'Send to LinkedIn', uri: '/share/linkedin', socialId: 'LinkedIn' } );
		deepEqual( _tag.args, $.merge(["WT.dl", "99", "WT.ti", "Send to LinkedIn", "DCS.dcsuri", "/share/linkedin", "WT.z_share", "LinkedIn"], globals), "PUBSUB Tracking a Share Event" );	
		
	});
	
	
	test("Content Value Grabber", function() {
	
		expect(8);
		
		var grabber = ND.analytics.grabber();
		
		//Assertions
		deepEqual( grabber( { link: $('<a href="#">Wanted to take the pain</a>') })
				, { value: "Wanted to take the pain", url:"wanted-to-take-the-pain" }
				, "Normal Link" );	
		
		deepEqual( grabber( { link: $('<a href="#" title="Wanted to take the pain">Something Else</a>') } )
				, { value: "Wanted to take the pain", url:"wanted-to-take-the-pain" }
				, "Normal Link with Title" );	

		deepEqual( grabber( { link: $('<a href="#" title="Wanted to take the pain"><img src="#" alt="Something Else" /></a>') } )
				, { value: "Wanted to take the pain", url:"wanted-to-take-the-pain" }
				, "Normal Link with IMG" );	

		deepEqual( grabber( { link: $('<a href="#" data-tracking-value="Wanted to take the pain" title="Something Else"><img src="#" alt="Something Else" /></a>') } )
				, { value: "Wanted to take the pain", url:"wanted-to-take-the-pain" }
				, "Normal Link with data-tracking-value attribute" );	

		deepEqual( grabber( { link:  $('<a href="#">(Wa#nt[][];:\'",.<>/?\\e$d to tak%e& the p^ai*n)-_=+-</a>') } )
				, { value: '(Wa#nt[][];:\'",.<>/?\\e$d to tak%e& the p^ai*n)-_=+-', url:"wa-nt-e-d-to-tak-e-the-p-ai-n" }
				, "Normal Link with special chars" );		
		
		//Assertions Meta
		deepEqual( grabber( { meta:  $('<meta name="dfy.title" content="Focus" />') } )
				, { value: 'Focus', url:"focus" }
				, "meta" );	


		//Assertions Heading
		deepEqual( grabber( { inner:  $('<h1>We are, on our own</h1>') } )
				, { value: 'We are, on our own', url:"we-are-on-our-own" }
				, "Heading" );	

				
		//Assertions Named
		deepEqual( grabber( { name:  'We are, on our own' } )
				, { value: 'We are, on our own', url:"we-are-on-our-own" }
				, "Named" );	

				
	});
	
	module("Tracking");
	
	test("Social Links", function() {	

		_tag.reset();
		$('.socialmedia-wrapper .socialmedia li:eq(0) a').trigger('click');
		deepEqual( _tag.args, $.merge(["WT.dl", "99", "WT.ti", "Follow Focus on Facebook", "DCS.dcsuri", "/follow/facebook"], globals), "Real click of social link" );
		
		_tag.reset();
		$('.socialmedia-wrapper .socialmedia li:eq(1) a').trigger('click');
		deepEqual( _tag.args, $.merge(["WT.dl", "99", "WT.ti", "Follow Focus on Twitter", "DCS.dcsuri", "/follow/twitter"], globals), "Real click of social link with  data-tracking-value attribute" );

		_tag.reset();
		$('.socialmedia-wrapper .socialmedia li:eq(2) a').trigger('click');
		deepEqual( _tag.args, $.merge(["WT.dl", "99", "WT.ti", "Follow Focus on ", "DCS.dcsuri", "/follow/"], globals), "Real click of social link with missing value" );

	});

	test("View 360", function() {	

		_tag.reset();
		$('.view360-button:eq(0) a').trigger('click');
		deepEqual( _tag.args, $.merge(["WT.dl", "99", "WT.ti", "Focus | See the 360 View", "DCS.dcsuri", "/focus/see-the-360-view"], globals), "Real click of 360" );

		_tag.reset();
		$('.view360-button:eq(1) a').trigger('click');
		deepEqual( _tag.args, $.merge(["WT.dl", "99", "WT.ti", "Focus | 360 View", "DCS.dcsuri", "/focus/360-view"], globals), "Real click of 360 with  data-tracking-value attribute" );
		
	});
	
	test("Overlay, different variations of configuration", function() {	
	
		_tag.reset();
		$.publish( "overlay.done", { contents: $('#overlay-content'), assetid: '11111111111111', anchor: $('<a class="overlay asset-11111111111111" href="#" title="See the Benefits">See the Benefits</a>') } );
		deepEqual( _tag.args, $.merge(["WT.dl", "99", "WT.ti", "Focus | Benefits of EcoBoost", "DCS.dcsuri", "/focus/overlay/benefits-of-ecoboost"], globals), "When an Overlay is done loading and is now open" );

		_tag.reset();
		$.publish( "overlay.done", { contents: $('#overlay-content-nothing'), assetid: '2222222222222222', anchor: $('<a class="overlay asset-2222222222222222" href="#" title="See the Benefits">See the Benefits</a>')  } );
		deepEqual( _tag.args, $.merge(["WT.dl", "99", "WT.ti", "Focus | See the Benefits", "DCS.dcsuri", "/focus/overlay/see-the-benefits"], globals), "When an Overlay is done loading but missing a heading and is now open" );

		_tag.reset();
		$.publish( "overlay.done", { contents: $('#overlay-content-nothing'), assetid: '2222222222222222' } );
		deepEqual( _tag.args, $.merge(["WT.dl", "99", "WT.ti", "Focus | 2222222222222222", "DCS.dcsuri", "/focus/overlay/2222222222222222"], globals), "When an Overlay is done loading but missing a heading and is now open" );
		
		_tag.reset();
		$.publish( "overlay.done", { contents: $('#overlay-content-nothing') } );
		deepEqual( _tag.args, $.merge(["WT.dl", "99", "WT.ti", "Focus | Overlay", "DCS.dcsuri", "/focus/overlay"], globals), "When an Overlay is done with limited data" );

		_tag.reset();
		$.publish( "overlay.done", {  } );
		deepEqual( _tag.args, $.merge(["WT.dl", "99", "WT.ti", "Focus | Overlay", "DCS.dcsuri", "/focus/overlay"], globals), "When an Overlay is done with no data" );

		_tag.reset();
		$.publish( "overlay.done", { contents: $('#overlay-content-nothing'), name: "POLK Calculate Price" } );
		deepEqual( _tag.args, $.merge(["WT.dl", "99", "WT.ti", "Focus | POLK Calculate Price", "DCS.dcsuri", "/focus/overlay/polk-calculate-price"], globals), "When an Overlay is launched with an explict name" );
		
		
	});
	
	test("Form Field Drop Off", function() {	
		
		//Expect At least 2
		expect(2) 

		_tag.reset();
		$('.ff1').trigger('focusout')
		deepEqual( _tag.args, $.merge(["WT.dl", "99","DCSext.firstname", "John"], globals), "Focusout event on the field" );
		
		_tag.reset();
		$('.ff2').trigger('focusout')
		deepEqual( _tag.args, $.merge(["WT.dl", "99","DCSext.lastname", "Smith"], globals), "Focusout event on the field" );

	
	});

	test("Nameplate Switcher", function() {	

		//Expect At least 2
		expect(2) 

		_tag.reset();
		$("#car-swapper a:eq(0)").trigger("click");
		deepEqual( _tag.args, $.merge(["WT.dl", "99", "WT.ti", "Focus | Switch to Double Cab", "DCS.dcsuri", "/focus/switch-to-double-cab"], globals), "When one Nameplace switcher link is clicked" );

		_tag.reset();
		$("#car-swapper a:eq(1)").trigger("click");
		deepEqual( _tag.args, $.merge(["WT.dl", "99", "WT.ti", "Focus | Switch to Super Cab", "DCS.dcsuri", "/focus/switch-to-super-cab"], globals), "When the other Nameplace switcher link is clicked" );

	});

	/*
	test("RSS", function() {	
		
		//Expect At least 2
		expect(2) 
		
		//TODO
	
	});

	test("Add This", function() {	
		
		//Expect At least 2
		expect(2) 
		
		//TODO
	
	});
	
	test("Like Button", function() {	
		
		//Expect At least 2
		expect(2) 
		
		//TODO
	
	});
	
	test("Google Plus Button", function() {	
		
		//Expect At least 2
		expect(2) 
		
		//TODO
	
	});
	
	
	
	test("VOI", function() {	
		
		//Expect At least 2
		expect(2) 

		//TODO
	
	});
	
	*/
	
});
