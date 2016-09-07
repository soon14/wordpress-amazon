jQuery(window).bind('load', function(){

	// Global Mockup
	
	var conf = {"page-region":"national"};
	
	var oldEmbeddedData = jQuery.fn.embeddedData;

	function normaliseDomString( value ) {
		return $.trim( value.replace(/[\n\t]/g, "").replace(/\s/g, "") );
	}

	//Global Ajax settings	
	var ajaxSettings;
	$('#qunit-header').ajaxSend(function(e, jqxhr, settings) {
		ajaxSettings = settings;
	});
	
	// ## Start Modules

	module("Hot Deals", {
		setup: function() {
			var module = this;
			this.data = {};
			ajaxSettings = null;
			
			this.handler = function(e, data) {
				if( e.namespace === "clear.pref" ) {
					$.publish( 'shopping.pref.change', {} )
				} else if( e.namespace === "pref.save") {
					$.publish( 'shopping.pref.change', data || module.data )
				} else {
					data && data( e, module.data );
				}
			};
			
			$.subscribe('shopping.pref.save', this.handler);
			$.subscribe('shopping.pref.retrieve', this.handler);
			$.subscribe('shopping.pref.clear', this.handler);
			
			this.customSetup = function( newData ) {
				module.data = newData || {};
				module.hotDeals = ND.hotDeals();
				module.hotDeals.enabledRedirect = false;
			}
			
			$('#hotdeals-panel-clone').clone().attr('id', 'hotdeals-panel').appendTo( 'body' )//.hide();
			
			
			jQuery.fn.embeddedData = function() {
				return conf;
			};
			
		},
		teardown: function() {
			$.unsubscribe('shopping.pref.save', this.handler);
			$.unsubscribe('shopping.pref.retrieve', this.handler);
			$.unsubscribe('shopping.pref.clear', this.handler);

			this.hotDeals.destroy();
			this.hotDeals = null;
			
			$('#hotdeals-panel').empty().remove();
			
			jQuery.fn.embeddedData = oldEmbeddedData;
			
			$.publish('overlay.hide');
		}
	});
	
	
	test("Sync to Shoping Pref", function() {
		
		this.customSetup();
		
		ok( this.hotDeals, "Creation");
				
		equal( this.hotDeals.getPostcode(), null, "Postcode" );
		equal( this.hotDeals.getRegion(), null, "Region" );
		
		$.publish('shopping.pref.save',  { postcode: 4000, region: 'syd' } );
		
		equal( this.hotDeals.getPostcode(), 4000, "Postcode" );
		equal( this.hotDeals.getRegion(), 'syd' , "Region" );

		$.publish('shopping.pref.clear');
		
		equal( this.hotDeals.getPostcode(), null, "Postcode" );
		equal( this.hotDeals.getRegion(), null, "Region" );
		
	});
	
	test("Sync to Shoping Pref - onload", function() {
		
		this.customSetup( { postcode: 3000, region: 'melb' } );
		
		ok( this.hotDeals, "Creation");
				
		equal( this.hotDeals.getPostcode(), 3000, "Postcode" );
		equal( this.hotDeals.getRegion(), 'melb', "Region" );
		
		$.publish('shopping.pref.save',  { postcode: 4000, region: 'syd' } );
		
		equal( this.hotDeals.getPostcode(), 4000, "Postcode" );
		equal( this.hotDeals.getRegion(), 'syd' , "Region" );

		$.publish('shopping.pref.clear');
		
		equal( this.hotDeals.getPostcode(), null, "Postcode" );
		equal( this.hotDeals.getRegion(), null, "Region" );
		
	});
	
	test("Render - vehiclematrix panel", function() {
		
		conf = {
			"page-region":"melb"
		};
	
		this.customSetup();
		
		ok( this.hotDeals, "Creation");

		var expected = "Offers shown for region Melbourne Want to see offers in your local region? Click to find out how.";
		equal( normaliseDomString( $('#hotdeals-panel').text() ), expected.replace(/\s/g, "") , "Page load")		

		$.publish('shopping.pref.save',  { postcode: 4000, region: 'syd' } );

		var expected = "Offers shown for region Melbourne Your chosen postcode is outside of this region. Not you postcode? Click to change you postcode. Click to see your region.";
		equal( normaliseDomString( $('#hotdeals-panel').text() ), expected.replace(/\s/g, "") , "Postcode and region outside")		

		$.publish('shopping.pref.save',  { postcode: 3000, region: 'melb' } );

		var expected = "Offers shown for region Melbourne Your chosen postcode is 3000. Not you postcode? Click to change you postcode.";
		equal( normaliseDomString( $('#hotdeals-panel').text() ), expected.replace(/\s/g, "") , "Postcode within")		

		$.publish('shopping.pref.clear');

		var expected = "Offers shown for region Melbourne Want to see offers in your local region? Click to find out how.";
		equal( normaliseDomString( $('#hotdeals-panel').text() ), expected.replace(/\s/g, "") , "Clear cookie")		
		
	});
	
	asyncTest("Handle postcode", 3 , function() {

		conf = {
			"xhr-hotdeals-data":"content/hotDealsJSON.js",
			"page-region":"melb"
		};		
		this.customSetup();	
				
		var promise = this.hotDeals.handleRegion( $('<a href="/hot-deals">Link</a>') , false, 3000 );
		
		promise.done( function( data, status, xhr  ) {
			equal( ajaxSettings && ajaxSettings.url.split("?")[1], "postcode=3000", "Postcode in the url" );			
			equal( data.url, "/hot-deals/victoria", "new url" );
			equal( data.region, "melb", "region" );
			start();
		});
		
	});
	
	asyncTest("Handle no region for postcode", 3 , function() {

		conf = {
			"xhr-hotdeals-data":"content/hotDealsJSONFail.js",
			"page-region":"melb"
		};		
		this.customSetup();	
				
		var promise = this.hotDeals.handleRegion( $('<a href="/hot-deals">Link</a>') , false, 9999 );
		
		promise.done( function( data, status, xhr  ) {
			equal( ajaxSettings && ajaxSettings.url.split("?")[1], "postcode=9999", "Postcode in the url" );			
			ok( !data.url, "no url" );
			ok( !data.region, "no region" );			
			start();
		});
		
	});
	
	asyncTest("Click test - has cookie, page must change", 1 , function() {

		conf = {
			"xhr-hotdeals-data":"content/hotDealsJSON.js",
			"xhr-hotdeals-form":"content/overlay-hot-deals-form.html",
		};		
		this.customSetup( { postcode: 3000, region: 'melb' }  );	

		$.subscribeOnce('hotdeals.redirect', function(e, data) {
			equal( data.url , "/hot-deals/victoria", "new url" );
			start();
		});

		$('#hotdeals-link1').trigger('click');
		
	});
	
	asyncTest("Click test - has cookie same url returned, page will not change", 1 , function() {

		conf = {
			"xhr-hotdeals-data":"content/hotDealsJSONSame.js",
			"xhr-hotdeals-form":"content/overlay-hot-deals-form.html",
			"page-region":"melb"
		};		
		this.customSetup( { postcode: 3000, region: 'melb' }  );	
		
		$.subscribeOnce('hotdeals.noredirect', function(e, data) {
			ok( !data ||!data.url, "no redirect" );
			start();
		});

		$('#hotdeals-link1').trigger('click');
		
	});
	
	asyncTest("Click test - no cookie, page must change", 3 , function() {
		
		conf = {
			"xhr-hotdeals-data":"content/hotDealsJSON.js",
			"xhr-hotdeals-form":"content/overlay-hot-deals-form.html"
		};		
		this.customSetup();

		//Step 1
		$.subscribeOnce('hotdeals.obtainerReady', function(e, data) {
			equal( $('.hot-deals-overlay [name=postcode]').val() , "", "Empty Field ready to fill out" );
			equal( $('.hot-deals-overlay [type=submit]').length , 1, "There is a submit button" );
			$('.hot-deals-overlay [name=postcode]').val( 3350 );
			$('#hotDeals-form').trigger('submit');
		});

		//Step 2
		$.subscribeOnce('hotdeals.redirect', function(e, data) {
			equal( data.url , "/hot-deals/victoria", "new url" );
			start();
		})

		$('#hotdeals-link1').trigger('click');
		
	});
	
	asyncTest("Click test - no cookie, close overlay, page will normal target", 3 , function() {

		conf = {
			"xhr-hotdeals-data":"content/hotDealsJSON.js",
			"xhr-hotdeals-form":"content/overlay-hot-deals-form.html"
		};		
		this.customSetup();

		//Step 1
		$.subscribeOnce('hotdeals.obtainerReady', function(e, data) {
			equal( $('.hot-deals-overlay [name=postcode]').val() , "", "Empty Field ready to fill out" );
			equal( $('.hot-deals-overlay [type=submit]').length , 1, "There is a submit button" );
			$('#overlay .close-button A').trigger('click');
		});

		//Step 2
		$.subscribeOnce('hotdeals.redirect', function(e, data) {
			equal( data.url , $('#hotdeals-link1b')[0].href, "same url" );
			start();
		});

		$('#hotdeals-link1b').trigger('click');
		
	});
	
	asyncTest("Force Click test - no cookie, close overlay, page will not change", 3 , function() {
		
		conf = {
			"xhr-hotdeals-data":"content/hotDealsJSON.js",
			"xhr-hotdeals-form":"content/overlay-hot-deals-form.html"
		};		
		this.customSetup();

		//Step 1
		$.subscribeOnce('hotdeals.obtainerReady', function(e, data) {
			equal( $('.hot-deals-overlay [name=postcode]').val() , "", "Empty Field ready to fill out" );
			equal( $('.hot-deals-overlay [type=submit]').length , 1, "There is a submit button" );
			$('#overlay .close-button A').trigger('click');
		});

		//Step 2
		$.subscribeOnce('hotdeals.noredirect', function(e, data) {
			ok( !data || !data.url, "no redirect" );
			start();
		});
		$.subscribeOnce('hotdeals.redirect', function(e, data) {
			ok( false, "These was a rediect.. oops" );
			start();
		});

		$('#hotdeals-link2').trigger('click');
		
	});
	
});