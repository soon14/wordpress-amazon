/**
 * 
 */
var BnP = BnP || {};

/*******************************START OF DATA LOADER*********************/
BnP.RestoreModule = function(dataLoader, viewManager, options) {
	
	var registerEvents = function() {
		
		
		return publicMethods;
	};
	
	
	var go = function() {
		Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
		//After restore finished, will change the url to summary page
		dataLoader.restoreAll(options.uuid,function(summaryURL){
			options.navigate(summaryURL,{trigger:false});
		});
		
	};
	
	var publicMethods = {
		registerEvents: registerEvents,
		go: go
	};
	
	return publicMethods;
	
};