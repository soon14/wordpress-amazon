jQuery(window).bind('load', function(){

	ND.CalcPrice.conf();

	function testDecoy() {}
	
	var xhrdataurlObj = {
//			xhrdataurl:'../../GetPrices.js',
			formid:'#test-calc-price-user'
		},
		derivatives = ["1121223123", "1121223124", "1121223125", "1121223126"];
	
	function clearCookie() {
		//clear cookie
		$.cookie("sp.pc", null, {path:'/'});
		$.cookie("sp.us", null, {path:'/'});
		$.cookie("sp.us.l", null, {path:'/'});
		$.cookie("sp.rg", null, {path:'/'});
		$.cookie("sp.rg.l", null, {path:'/'});
	}
	clearCookie();
	
	module("Get Price XHR Calculate Price");
		
	test("PUBSUB events", function() {
		expect(7);
		
		//Setup
		var result = "", data;
		$.subscribe('get.calculateprice.dfy', function(event, text) {
			result = text;
		});
		$.subscribe('change.calculateprice.dfy', function(event, d) {
			data = d;
		});
		$.publish('userchange.calculateprice.dfy', $.extend(xhrdataurlObj,{"payload":{"postcode": "3000","usage": "p","derivatives":[1121223123, 1121223123]}}));
		
		//Test 
		stop();
		setTimeout(function() {
			
			//Test Subscribe (general)
			equal( result, "success", "Calculate Price fetch" );
			ok(data, "AJAX data results");
			ok(data && 'error' in data && !data.error, "Calculate Price service was success");
			ok(data && $.isArray(data.derivatives) && data.derivatives.length, "Derivatives is array" );
			
			//Test Subscribe Events first data
			var first = data && data.derivatives? data.derivatives[0] : {};
			equals(first.price, 1222222.0, "Derivatives price")
			equals(first.id, 1121223123, "Derivatives id")
			equals(first.displayPrice, "$122,222", "Derivatives price")
			
			start();  
		}, 200)
		clearCookie();
	});
	

	test("DOM Updated - Main", function() {
		expect(5);

		//Setup
		var priceUpdater, dList = [];
		function getNode() {
			return $('#der1121223123 .price');
		}
		priceUpdater = ND.CalcPrice.PriceUpdater;
		priceUpdater.init(); 
		dList = priceUpdater.list();
		
		//Assert Derivative List
		equal(dList.toString(), derivatives.toString(), "Extract Derivatives from HTML")
		
		//Assert there are no prices yet
		equals(getNode().text(), "", "Node has no price")
		
		//Update Price Again
		priceUpdater.update({
			"1121223123": {
			      "price": 1222222.0,
			      "displayPrice": "$171,415"
			 }	
		});
		
		//Assert Price was updated
		equals(getNode().html().toLowerCase(), "RRP From <strong>$171,415</strong>".toLowerCase(), "Node has new price");
		
		//Update Price Again
		priceUpdater.update({
			"1121223123": {
			      "displayPrice": "$99,995"			    	 	  
			 }
		});

		//Assert Price was updated
		equals(getNode().html().toLowerCase(), "RRP From <strong>$99,995</strong>".toLowerCase(), "Node has new price");
		
		//Fail Update
		priceUpdater.update({
			"1121223123": {}
		});
		
		//Assert Price was updated
		equals((getNode().html() || ""), "", "Node has same price");
		
		//teardown
		clearCookie();
	});
	

	
	test("DOM Updated - Grid", function() {
		expect(5);

		//Setup
		var priceUpdater, dList = [];
		priceUpdater = ND.CalcPrice.PriceUpdater;
		priceUpdater.init(); 
		dList = priceUpdater.list();
		
		//Assert Derivative List
		equal(dList.toString(), derivatives.toString(), "Extract Derivatives from HTML")
		
		//Assert there isn't a price yet.
		equals($('#der1121223124 .price').html(), null, "Node has no price")
		
		//Update the prices
		priceUpdater.update({
			"1121223124": {
			      "price": 1222222.0,
			      "displayPrice": "$151,415"
			 },
			"1121223125": {
			      "price": 1222222.0,
			      "displayPrice": "$161,415"
			 },
			"1121223126": {
			      "price": 1222222.0,
			      "displayPrice": "$181,415"
			 }	
		});
		
		//Assert The prices updated
		equals( ($('#der1121223124 .price').html() || "").toLowerCase(), "RRP From <strong>$151,415</strong>".toLowerCase(), "Node has new price");
		equals( ($('#der1121223125 .price').html() || "").toLowerCase(), "RRP From <strong>$161,415</strong>".toLowerCase(), "Node has new price");
		equals( ($('#der1121223126 .price').html() || "").toLowerCase(), "RRP From <strong>$181,415</strong>".toLowerCase(), "Node has new price");
		
		//Teardown
		clearCookie();

	});


	//Module Closure to re-use variables, setup and tearDown
	(function(){

		module("Get Price Want to see prices");

		var priceUserDataManager, userdata, cookieVal, dataHandler, dataSubscribed, shoppingPreferenceManager;
			
		var setup = function(options, cancelDerivatives) {
			shoppingPreferenceManager = ND.shoppingPreferenceManager();
			
			priceUserDataManager = ND.CalcPrice.userDataManager;
			priceUserDataManager.init(!!cancelDerivatives ? [] : derivatives, options);
			
			//Subscrive to userchange changes
			dataSubscribed = [];
			dataHandler = function(event, data) {
				data && data.payload && dataSubscribed.push(data.payload);			
			};
		}
	
		var teardown = function() {
			userdata = null;
			cookieVal = null;
			dataHandler = null;
			dataSubscribed = [];
			priceUserDataManager = null;
			clearCookie();
			
			shoppingPreferenceManager.destroy();

		}
		
		//clearCookie();

		test("User Data Manager - Passing Input", function() {
			expect(17);
			
			//console.log('Failing test')

			//Setup
			ND.CalcPrice.conf({"xhr-calcprice-data":"content/GetPrices.js"});
			setup(xhrdataurlObj);
			
			$.subscribe('userchange.calculateprice.dfy', dataHandler);
			
			ok(priceUserDataManager, "User data manager");
			ok(!priceUserDataManager.fromCookie(), "From cookie is false");
			
			userdata = priceUserDataManager.getData();
			
			ok(!userdata, "There is no cookie");
			
			//Simulate User Clicking they want price
			$('.need-price .get-postcode-usage:eq(0)').trigger('click');

			
			//Wait
			stop();
			setTimeout(function() {			

				ok($('#test-calc-price-user').size() !== 0, "Form is there");

				//Simulate User filling out the form
				var form = $('#test-calc-price-user');
				form.find('input[name=postcode]').val('3330');
				console.log( form.find('input[name=usage]').filter("[value=p]") )
				form.find('input[name=usage]').filter("[value=p]")[0].checked = true;
				form.submit();
				
			//Wait
			setTimeout(function() {
			
				start();
				
				//Check Prices Shown message
				equal($('.need-price .prices-shown').text(), "Prices shown for private buyer usage and postcode 3330.", "Message updated")
				equal($('.need-price .get-postcode-usage:eq(0)').text(), "Not correct? Do you want to change them.", "Call to action message updated")
			
				//Check Subscriber
				ok(dataSubscribed, "User data obtained");	
				ok(dataSubscribed[0], "User data obtained");
				equal(dataSubscribed[0].postcode,'3330', "Postcode");
				equal(dataSubscribed[0].usage, 'p', "Usage");
				equal(dataSubscribed[0].derivatives.length , 4, "Derivatives");
				
				//Check Manager
				userdata = priceUserDataManager.getData();
				ok(userdata, "User data obtained");
				
				equal(userdata.postcode,'3330', "Postcode stored");
				equal(userdata.usage, 'p', "Usage stored");
				
				//Check cookie
				equal( $.cookie('sp.pc') , '3330', "Postcode stored in cookie");
				equal( $.cookie('sp.us') , 'p', "Usage stored in cookie");
	
				ok(!priceUserDataManager.fromCookie(), "From cookie is false");
				
				//tear down
				$.unsubscribe('userchange.calculateprice.dfy', dataHandler);
				teardown();
					
			//Close Wait
			}, 500);}, 500);
			
		
		});
		
		test("User Data Manager - Page Load", function() {

			//Setup Mock Cookie
			/*
			var yearlyStore = Object.create(ND.cacheStore);
			yearlyStore.key = 'price.usage';
			yearlyStore.expires = 365;
			yearlyStore.set({"postcode":"5000","usage":"c","usageLabel":"commercial"});
			*/
			
			$.cookie("sp.pc", '5000', {path:'/'});
			$.cookie("sp.us", 'c', {path:'/'});
			$.cookie("sp.us.l", 'commercial', {path:'/'});
			
			var shoppingPreferenceManager = ND.shoppingPreferenceManager();
			
			//Setup
			ND.CalcPrice.conf({"xhr-calcprice-data":"content/GetPrices.js"});
			setup();
			
			//Check Manager
			userdata = priceUserDataManager.getData();
			ok(userdata, "User data obtained");
			
			equal(userdata.postcode,'5000', "Postcode read from cookie during init");
			equal(userdata.usage, 'c', "Usage read from cookie during init");
			
			equal( $.cookie('sp.pc') , '5000', "Postcode stored in cookie");
			equal( $.cookie('sp.us') , 'c', "Usage stored in cookie");
			
			teardown();
			
			shoppingPreferenceManager.destroy();
		
		});
			
		test("User Data Manager - Failing Input", function() {
			expect(5);

			
			//Setup
			ND.CalcPrice.conf({"xhr-calcprice-data":"content/GetPricesFail.js"});
			setup();
			
			$.subscribe('userchange.calculateprice.dfy', dataHandler);
			
			ok($('#test-calc-price-user').size() === 0, "No form already");
			
			//Simulate User
			$('.need-price .get-postcode-usage:eq(0)').trigger('click');
			
			//Wait
			stop();
			setTimeout(function() {			
				
				//Simulate User
				var form = $('#test-calc-price-user');
				form.find('input[name=postcode]').val('300');
				form.find('input[name=usage]').filter("[value=p]")[0].checked = true;
				form.submit();
				
				ok($('#test-calc-price-user').size() !== 0, "Form is there");

				
			//Wait
			setTimeout(function() {
			start();
			

				//Check Subscriber
				ok(!dataSubscribed[0], "User data not obtained");
	
				//Check Manager
				userdata = priceUserDataManager.getData();
				ok(!userdata || !userdata.postcode, "Postcode empty");
				ok(!userdata || !userdata.usage, "Usage empty");
				
				//tear down
				$.unsubscribe('userchange.calculateprice.dfy', dataHandler);
				teardown();
	
			//Close Wait
			}, 200); }, 200);
			
		});
		
		
		var queue = [];
		function dequeue() {
			queue.length && queue.shift().call();

			if(queue.length) {
				stop();
				setTimeout(dequeue, 2e2);
				
			}			
		}
		
		
		function delay( fn ) {
			
			if(!queue.length) {
				stop();
				setTimeout(dequeue, 5e2);				
			}
			
			queue.push( fn );
			
		}		
		
		function delayThenStart( fn ) {
			delay(function() {
				fn.call();
				start();
			})
		}
			
		
		
		test("ND.API", function() {
			
			expect(18);
			
			var msgType, msgStringObj;

			//Fake the Flash Object messaging API;
			document._getElementById = document.getElementById
			document.getElementById = function(id) {
				//If it's the id of the flash object
				if(id === 'myflashid' ) {
					var obj = document._getElementById(id);
					obj.message = function() {
						msgType = arguments[0];
						msgStringObj = arguments[1];
					};
					return obj;
				}				
				return document._getElementById(id)
			}			
			
			//Setup
			ND.CalcPrice.conf({"xhr-calcprice-data":"content/GetPrices.js"});
			setup({}, true);
			
			//Flash API (ND.API.asyncPriceUserData({flashid:'myid'});)
			//ND.API.requestChangePriceUserData({complete:});
			
			ND.API.requestChangePriceUserData('myflashid', true, function(data){
				userdata = data;
			});
			
			
			delay(function() {			
				
				//Simulate User filling out the form
				$('#overlay .close-button A').trigger('click');
			});
			
			//Wait
			delay(function() {
				ok(!userdata, "There isn't user data");	
				
				ok(!cookieVal, "There isn't a cookie");
				
				//Check the Flash Object was send the message
				equal(msgType, 'postcode', "Flash messaging");
				equal(msgStringObj, JSON.stringify( {} ), "Flash messaging Data Nothing");
		
			});
			
			//rest the test
			delay(function() {			
				
				//Start again
				userdata = null;
				
				//Flash API (ND.API.asyncPriceUserData({flashid:'myid'});)
				//ND.API.requestChangePriceUserData({complete:});
				
				ND.API.requestChangePriceUserData('myflashid', true, function(data){
					userdata = data;
				});
				
			});
			
			delay(function() {			
				//Simulate User filling out the form
				var form = $('#test-calc-price-user');
				form.find('input[name=postcode]').val('4567');
				form.find('input[name=usage]').filter("[value=c]")[0].checked = true;
				form.submit();
			});
			
			//Wait
			delay(function() {
				ok(userdata, "There is user data");	
				equal(userdata && userdata.postcode,'4567', "Postcode stored");
				equal(userdata && userdata.usage, 'c', "Usage stored");
				
				equal( $.cookie('sp.pc') , '4567', "Postcode stored in cookie");
				equal( $.cookie('sp.us') , 'c', "Usage stored in cookie");
				
				//Check the Flash Object was send the message
				equal(msgType, 'postcode', "Flash messaging");
				equal(msgStringObj, JSON.stringify( {'postcode':"4567", "usage":"c", "usageLabel":"commercial"} ), "Flash messaging Data");
		
				

			});
			
			//rest the test
			delay(function() {			
				
				//Start again
				userdata = null;
				
				//Flash API (ND.API.asyncPriceUserData({flashid:'myid'});)
				//ND.API.requestChangePriceUserData({complete:});
				
				ND.API.requestChangePriceUserData('myflashid', true, function(data){
					userdata = data;
				});
				
			});
			
			delay(function() {

				//Simulate User filling out the form
				$('#overlay .close-button A').trigger('click');
				
			});
			
			//Wait
			delayThenStart(function() {
				
				ok(userdata, "There is user data");
				if( userdata ) {
					equal(userdata.postcode,'4567', "Postcode stored");
					equal(userdata.usage, 'c', "Usage stored");
				}
				
				equal( $.cookie('sp.pc') , '4567', "Postcode stored in cookie");
				equal( $.cookie('sp.us') , 'c', "Usage stored in cookie");
				
				//Check the Flash Object was send the message
				equal(msgType, 'postcode', "Flash messaging");
				equal(msgStringObj, JSON.stringify( {'postcode':"4567", "usage":"c", "usageLabel":"commercial"} ), "Flash messaging Data");
				
				teardown();
				document.getElementById = document._getElementById;
				
			});
			
		});
	

	//End Module Closure
	}());
	
});
