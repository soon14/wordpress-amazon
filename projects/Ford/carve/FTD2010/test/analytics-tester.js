
var help = "Usage:\tcasperjs analytics-tester.js <test_definition.js> --type=<om|wt>\n" +
	"\tom - Omniture\n" +
	"\twt - WebTrends\n";

var testDefinitions = {};


var casper = require('casper').create({
	
//	
//  uncomment these lines to enable more detailed output
//	
//	logLevel: "debug",
//	verbose: true,
	
	onResourceRequested: function(self, request) {
//		this.log("REQUESTED [" + request.url + "]", "debug");
	},
	
    onResourceReceived: function(self, request) {

//		this.log("RECEIVED [" + request.status + "] [" + request.stage + "] [" + request.url + "]", "debug");
	
		//filter out non-analytis requests, like images, css, js downloads.
		if ((type == 'wt' 
				&& request.url.indexOf("webtrends") != -1
				&& request.url.indexOf("dcs.gif") != -1)
			|| type == 'om'
				&& request.url.indexOf("fordapa") != -1) {	//this condition might change
			
//			console.log("@@@@1");
			
			//ignore all redirection requests - they should come as 200 at some point
			if (request.status != 302				//ignore the redirection requests
					&& request.status != 301
					&& request.status != 303
					&& request.stage == 'end') {	//only finished requests 
			
//				console.log("@@@@2");
				
				//this.test.assertTrue(request.status, 200, "Response OK");

				//test counter (index in the JSON passed as argument)
				
				//all analytics stuff will be in the query string
				var queryString = request.url.split("?")[1];
				this.test.assertEquals(queryString != undefined, true, "Expected not empty query string tracking call");
				
				//remember the number of failed tests - will be used to verify the current step
				var currentFailures = this.test.testResults.failed;
				
				if (queryString != undefined) { 
				
//					console.log("@@@@3");
					
					//tokenize the query string into a map
					var tokens = queryString.split("&");
					var parametersMap = {}
					for (i = 0; i < tokens.length; i++) {
						var param = tokens[i].split("=");
						if (param.length == 2) {
							parametersMap[param[0]] = param[1];
						}
					}
					
					//get the test definition for the currnt url
					//this.test.assertEquals(testDefinitions[this.getCurrentUrl()] != undefined, true, "Test definition found [" + this.getCurrentUrl() + "]");
					if (testDefinitions[this.getCurrentUrl()] != undefined) {
					
						this.testUrl = this.getCurrentUrl();
						var selectorDefined = testDefinitions[this.testUrl].clickSelector != undefined
						var recordClick = testDefinitions[this.testUrl].recordClick
						//console.log("@@@@ selector ["+ selectorDefined +"] click ["+ recordClick +"]");
						
						
						
						this.log("PROCESSING " + request.url, "debug");
						this.counter = this.counter + 1;
						this.actualCalls.push(request.url);
						 
						
						console.log(">>> Verifying request #" + this.counter);
					
						//check whether expected values match the query strings
						var expectedValuesArray = testDefinitions[this.testUrl].expectedValues
//							console.log("expectedValues for " + this.getCurrentUrl() + ": " + expectedValuesArray);
						if (expectedValuesArray) {
							var expectedValues = expectedValuesArray[this.counter-1];
//								console.log("expectedValues for request " + (this.counter-1) + ": " + expectedValues);
							if (expectedValues) {
								for (var key in expectedValues) {
									if (expectedValues[key] === 0) {
										this.test.assertEquals(parametersMap[key], undefined, "Expected variable value [" + key + "] should not be passed");
									} else {
										this.test.assertEquals(parametersMap[key], encodeURIComponent(expectedValues[key]), "Expected variable value [" + key + "][" + expectedValues[key] + "] in analytics call.");
									}
									
								}					
							}
						}
						
					} else {
						this.log("No test definition found for [" + this.getCurrentUrl() + "]", "debug");
					}
					
				} else {
					this.log("No query string in the tracking request [" + request.url + "]", "debug");
				}
				
				//check number of failures
				if (currentFailures != this.test.testResults.failed) {
					console.log("\n>>>>>>>> Details of failed analytics call >>>>>>>>");
					for (var key in parametersMap) {
						console.log([key, parametersMap[key]].join("\t"));
					}
				}
				
			}
		}
	}
});

//
//
//
casper.verifyTestResults = function() {
	
//	console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXX");
	
	if (testDefinitions[this.testUrl] != undefined) {
		
		var expectedCalls = testDefinitions[this.testUrl].expectedCalls
		this.test.assertEquals(testDefinitions[this.testUrl].expectedCalls, this.counter
				,"Expected number of analytics calls ["+expectedCalls+"], calls has been made ["+this.counter+"]");
		this.test.assertEquals(this.test.testResults.failed, 0, "All tests are OK for " + this.testUrl);
		
		if (testDefinitions[this.testUrl].expectedCalls != this.counter) {
			console.log("\n>>>>>>>> Intercepted analytics calls >>>>>>>>");
			for (i = 0; i < this.actualCalls.length; i++) {
				console.log(">> " + this.actualCalls[i]);
			}
		}
		console.log("END ##############################################################");
		console.log("");
		
		//reset the counters for this test
		this.counter = 0;
		this.actualCalls = [];
		
	} else {
		console.log("Cannot find a definition for: " + this.testUrl);
	}
}

casper.logLevel = "debug"


var analyticsTracker = Object.create(casper);




//check script arguments
var wrongArgs = undefined; 
if (analyticsTracker.cli.args.length != 1) {
	wrongArgs = "Invalid number of parameters ("+analyticsTracker.cli.args.length+")";
} else {
	
	if (analyticsTracker.cli.has("type")) {
		var type = analyticsTracker.cli.get("type");
		
		if (type != 'wt' && type != 'om') {
			wrongArgs = "Invalid type '"+type+"'";
		} else {
			analyticsTracker.type = type;
		}
		
	} else {
		wrongArgs = "'type' not passed.";
	}
	
    try {
    	console.log("Reading test definition from: " + analyticsTracker.cli.get(0));
        var fileContent = require('fs').read(analyticsTracker.cli.get(0));
        testDefinitions = JSON.parse(fileContent);
    } catch (e) {
    	console.log("Cannot read file content.");
    	console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    	console.log(fileContent);
    	console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    	wrongArgs = "Cannot read test definition content.";
    }	
}

if (wrongArgs) {
	console.log("Wrong arguments: " + wrongArgs);
	console.log(help);
	analyticsTracker.exit();
}


//start
analyticsTracker.start();


//add all tests
Object.keys(testDefinitions).forEach(function (testDefinition) {
	
	
	
	//add a step for our test
	analyticsTracker.then(function() {

		console.log("START ############################################################");

		//restet test data 
		analyticsTracker.counter = 0;
		analyticsTracker.actualCalls = [];
		testDefinitions[testDefinition].recordClick = false;
		this.test.testResults.failed = 0;
		
		// open a url
		analyticsTracker.open(testDefinition);

		
		analyticsTracker.wait(5000);
		
		//add the next step which is either verification or a click if selector is defined
		analyticsTracker.then(function() {
			
			if (testDefinitions[testDefinition].clickSelector != undefined) {
				
				var selector = testDefinitions[testDefinition].clickSelector;
				
				analyticsTracker.then(function() {
					
					analyticsTracker.waitForSelector(selector, function() {
						//this.test.assertExists(selector, 'found element using ' + selector);
						this.log("About to click the element selected using selector: " + selector + ". Url: " + this.getCurrentUrl(), "debug");
						testDefinitions[testDefinition].recordClick = true;
						this.testUrl = this.getCurrentUrl()
					    var success = this.mouseEvent('click', selector);
						analyticsTracker.wait(5000, function() {
						    this.log("Click complete with success status: " + success, "debug");
						    analyticsTracker.verifyTestResults();
						});
					});
					
				});
				
			} else {
				analyticsTracker.verifyTestResults();
			}
		});
	});
});

//run
analyticsTracker.run(function() {
	console.log("Done.");
	casper.exit();
});
