$(function(){

	// Initalise the required manager objects
	var syncUIManager = Object.create( FAP.syncUI.manager ),
		syncTransferManager = Object.create( FAP.syncTransfer.manager );
		
	// Load the UI Manager with reference to the Transfer Manager
	syncUIManager.init({
		transferManager: syncTransferManager
	});
	
});