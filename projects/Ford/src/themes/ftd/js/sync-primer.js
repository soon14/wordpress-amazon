var FAP = (function(exports) {

	exports.syncPrimer = function( script ) {

		// Store promises for further clicks attempts.
		var scriptPromise, appletPromise;

		$(document).ready(function(){
			var transferData = $('#sync-transfer-data').embeddedData();
			if(transferData.ENABLE_ZIPHANDLER === 'true' && transferData.ZIPHANDLER_STATUS.length > 0){
				var btn = $('.sync_download');
				btn.attr('data-status','requested');
				if (transferData.ZIPHANDLER_STATUS.toLowerCase() === 'available'){
					btn.parents('.col').prev().children('div').html(transferData.DOWNLOAD_REQUESTED_COPY);
					
					$.ajax({
						type: 'GET',
						cache: false,
						url:  '/servlet/mgmsynchandler/selectinstallhandler?type=all'
					}).done(function(data){
						$.ajax({
						type: 'GET',
						cache: false,
						url:  transferData["xhr-step-downloadstatus"]+"&isReady=Y"
						}).done(function(data){
							if(data){
								
								 var returnJson=$.parseJSON(data);
								 if(returnJson["download-status"]==="ready"){
									$('.sync_start_download').attr("data-download","ready");
									$("#sync_zipdownload_url").attr("href",unescape(transferData.ZIPHANDLER_DOWNLOAD_URL));
								}
							}
						});
					
					});
					
					
				}
			}
			
		});

		
		// Click 'Let's Start'
		$(document).on('click', '.sync-transfer-primer', function(e) {

			// Vars
			var hasActiveX, x64,
				report = $(this).hasClass('sync-report-installation') ,
				statusChecker = $(this).hasClass('sync-lets-start-status-checker'),
				downloadAll = $(this).hasClass('sync-lets-start'),
				startDownload = $(this).hasClass('sync_start_download'),
				transferData = $('#sync-transfer-data').embeddedData();

			if ( statusChecker ) {
				
					$.ajax({
						type: 'GET',
						cache: false,
						url:  '/servlet/mgmsynchandler/selectinstallhandler?type=schecker'
					});
				
				// select the tmpl-sync-updates-available-statusChecker content to be displayed in overlay
			}
		
			if ( downloadAll ) {
				
				
				// select the tmpl-sync-updates-available content to be displayed in overlay
				
					$.ajax({
						type: 'GET',
						cache: false,
						url:  '/servlet/mgmsynchandler/selectinstallhandler?type=all'
					});
					
					if(transferData.ENABLE_ZIPHANDLER === 'true'){
						$(this).text(transferData.DOWNLOAD_REQUESTED_TXT);
						$(this).parents('.col').prev().children('div').html(transferData.DOWNLOAD_REQUESTED_COPY);
						$(this).attr('data-status','requested');
					}
			}
			
			// Cancel default event
			e.preventDefault();
			
			// Previous attempts
			if( scriptPromise && scriptPromise.isResolved()) {
			
				if( report ) {
					$.publish('/sync-transfer/report');
				}else if(statusChecker){
					$.publish('/sync-transfer/statusChecker');
				} else  if(downloadAll){
					$.publish('/sync-transfer/start');
				}else if(startDownload){
					
					$.publish('/sync-transfer/startDownload');
				}
			
			// First Attempt to load the control
			} else if (transferData.ENABLE_ZIPHANDLER === 'true'){
				// Require the script for this
				scriptPromise = $.getScript( script );

				// Check that the script and the applet a ready, then move ahead
				$.when( scriptPromise )
					.done(function() {
						// Open Overlay with Start
						if( report ) {
							$.publish('/sync-transfer/report');
						}else if(statusChecker){
					      $.publish('/sync-transfer/statusChecker');
				        } else if(downloadAll){
							$.publish('/sync-transfer/start');
						}else if(startDownload){
							$.publish('/sync-transfer/startDownload');
						}
					})
					.fail(function() {
						$.publish('/sync-transfer/fail');
					});
			}

			else {
			
				// Check for Active X support
				hasActiveX = ( "ActiveXObject" in window );
				
				// Check for 64bit IE user agent (http://blogs.msdn.com/b/ie/archive/2009/01/09/the-internet-explorer-8-user-agent-string-updated-edition.aspx)
				x64 = navigator.userAgent.indexOf("x64") > 0;
				
				// Remove any injected code if this is the second or third try
				$('#sync-transfer-applet').remove();
				
				// Inject the Applet or ActiveX control
				$('<div id="sync-transfer-applet" />').append($(
					$( '#sync-tranfser-config' + (hasActiveX ? ( x64 ? '-ie64' : '-ie' ) : '') ).html()
				)).appendTo('body');
				// PLG testing $("#TransferApplet").attr('CLASSID', 'CLSID:90EA49B3-039A-4F02-A34E-3EBA417BE44C');
				
				// Require the script for this
				scriptPromise = $.getScript( script );
				//alert("scriptPromise:"+scriptPromise);
				// Create a crude Deferred that will check for the existence of the Applet
				appletPromise = (function() {
					
					var def = $.Deferred();
					
					// Function to check if the Applet is avaliable
					function checkReadyApplet() {
						try {
						
							// Try to call the applet (throws excpetion if not loaded) 
							document.TransferApplet.getSControlStatus();
							
							// Exception not throw, then resolve the Deferred
							def.resolve();
							
						} catch(e) {
							
							//Check again
							setTimeout(checkReadyApplet, 100);
						}
					}
					
					// Start checking now
					checkReadyApplet();
					
					// Return the promise (Deferred is encapsulated so that nothing else can resolve it)
					return def.promise();
				}());
				
				// Open Overlay with Prepare content
				$.when( scriptPromise )
					.done(function(){
						$.publish('/sync-transfer/prepare');
					});
				
				// Check that the script and the applet a ready, then move ahead
				$.when( scriptPromise )
					.done(function() {
						// Open Overlay with Start
						if( report ) {
							$.publish('/sync-transfer/report');
						}else if(statusChecker){
					      $.publish('/sync-transfer/statusChecker');
				        } else if(downloadAll){
							$.publish('/sync-transfer/start');
						}else if(startDownload){
							$.publish('/sync-transfer/startDownload');
						}
					})
					.fail(function() {
						$.publish('/sync-transfer/fail');
					});
			
			}

				
		});
	};
	
	return exports;

}( window.FAP || {} ));