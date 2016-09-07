var FAP = (function(exports) {

	var // FAP.syncTransfer
		module = {},
		// FAP.syncTransfer.manager
		manager = {},
		// FAP.syncTransfer.tasks
		tasks = {},
		// FAP.syncTransfer.statusCodes
		statusCodes = {};
		
	// Build up module ready for export
	module.manager = manager;
	module.tasks = tasks;
	module.statusCodes = statusCodes;
	
	/*
	 * Build up the relevant error codes
	 */
	function buildStatusCodes() { 
		var c = tasks.base.c;
		//statusCodes.DOWNLOAD_FAIL = c.getConstantControlStatusDownloadFailed();
		//statusCodes.UPLOAD_FAIL = c.getConstantControlStatusUploadFailed();
		statusCodes.DOWNLOAD_FAIL = 'CONTROL_STATUS_DOWNLOAD_FAILED';
		statusCodes.UPLOAD_FAIL = 'CONTROL_STATUS_UPLOAD_FAILED';
		// Dev Note: Add more here as required. Not all will be required.
	}

	/*
	 * FAP.syncTransfer.tasks.base
	 */	 
	tasks.base = {
		isOk: function() {
			return this.c.getSControlStatus() == this.c.getConstantControlStatusOK()
		},
		
		status: function() {
			return this.c.getSControlStatus();
		}
		
		// c: document.TransferApplet
	};
		
	/*
	 * FAP.syncTransfer.tasks.drives
	 */	 
	tasks.drives = $.extend( 
		Object.create(tasks.base)
		,{
			driveConstStatus: function() {
				return this.c.DMGetConstantDriveStatusOk();
			},
			
			refreshDrives: function() {
				this.c.DMRefreshDrives(); 
			},
			
			/*
			 * Load drives that DO have the status DRIVE_STATUS_OK and DO have snycmyride folder on them
			 */
			getUsedDrives: function() {
				this.c.DMLoadDrivesByStatusAndSyncFootprint( this.driveConstStatus(), true );
				return this._getDrives( true );
			},
			
			/*
			 * Load drives that DO have the status DRIVE_STATUS_OK, but do NOT have snycmyride folder on them
			 */
			getWritableDrives: function() {
				this.c.DMLoadDrivesByStatusAndSyncFootprint( this.driveConstStatus(), false);
				return this._getDrives( true );
			},
			
			/*
			 * Load drives that do NOT have the status DRIVE_STATUS_OK
			 * Which I assume is all the drives that have DRIVE_STATUS_INSUFFICIENT_SPACE, DRIVE_STATUS_NOT_READABLE, DRIVE_STATUS_NOT_WRITABLE
			 *
			 */
			getReadonlyDrives: function() {
				this.c.DMLoadDrivesByNotStatus( this.driveConstStatus() );
				return this._getDrives();
			},

			/*
			 * Get drives array
			 */
			_getDrives: function( filterBadStatus ) {
				var drives = [],
					length = this.c.DMGetIDrives(),
					next;          
				 
				for (var i = 0; i < length; i++) {
					next = this._getDriveDetail(i);
					if( arguments.length === 0 || ( filterBadStatus && next.status === this.driveConstStatus() ) ) {
						drives.push( this._getDriveDetail(i) );
					}
				}
				
				return drives;
			},
			
			/*
			 * Return an individual drive detail based on index
			 * Drives must be preloaded.
			 */
			_getDriveDetail: function( index ) {
				var c = this.c;
				return {
					description: c.DMGetSDriveDescription( index ),
					name: c.DMGetSDriveName( index ),
					status: c.DMGetSDriveStatus( index ),
					isNew: c.DMGetBNewDrive( index )
				};
			}
			
		});

	/*
	 * FAP.syncTransfer.tasks.download
	 */	 
	tasks.download = $.extend( 
		Object.create(tasks.base)
		,{
			configure: function( driveName ) {
				this._driveName = driveName;
			},
			
			start: function(){
				this._started = +new Date();
				this.totalKiloBytesReads = 0;
				this.totalKiloBytesReadsCount = 0;
				this.c.DMRefreshDrives();
				this.c.DMLoadDrivesByName( this._driveName );
                this.c.IMStartDownload( this.c.DMGetSDriveName(0) );				
			},
			
			_getData: function() {
			
				var 
					// Is finished
					verified = this.c.IMIsBInstallDone(),
					
					// How many Kilo Bytes will be downloaded
					totalKiloBytes = this.c.IMGetIDownloadSizeKiloBytes(),
					
					// How many Kilo Bytes have been downloaded
					downloadedKiloBytes = this.c.IMGetITotalKiloBytesDownloaded(),
					
					// How many Kilo Bytes left to download
					remainingKiloBytes = totalKiloBytes - downloadedKiloBytes,
					
					// Ratio of downloaded to total
					downloadRatio = verified ? 1 : downloadedKiloBytes / totalKiloBytes,
					
					// Time taken so far
					secondsDuration = (+new Date() - this._started) / 1000,
					
					// How many kilo bytes a second
					kiloBytesPerSecond = downloadedKiloBytes / secondsDuration,
					
					// How many kilo bytes a second
					kiloBitPerSecond = kiloBytesPerSecond * 8,

					// Approx Time remaining
					secondsRemaining = remainingKiloBytes / kiloBytesPerSecond,
					
					// Is all the data downloaded
					isDownloaded = remainingKiloBytes <= 0;
				
				return {
					filesize: totalKiloBytes,
					downloaded: downloadedKiloBytes.toFixed(0),
					ratio: downloadRatio,
					speed: kiloBitPerSecond.toFixed(0),
					duration: secondsDuration,
					wait: secondsRemaining.toFixed(0),
					isDone: verified,
					isVerifing: isDownloaded && !verified
				}
			},
			
			getProgress: function() {
				return $.extend( this._getData(), {
					error: !this.isOk(),
					status: this.status(),
					started: this._started
				});
			}

		});

		
	/*
	 * FAP.syncTransfer.tasks.logfiles
	 */	 
	tasks.logfiles = $.extend( 
		Object.create(tasks.base)
		,{
			driveRegEx: /^([A-Za-z]:\\)/,
		
			refreshFiles: function() {
				this.c.DMRefreshDrives(); 
				this.c.LMRefreshLogFiles();
			},
			
			/*
			 * Get file array
			 */
			getList: function( options ) {
				var loglist = [],
					length = this.c.LMGetILogFiles();          
				 
				for (var i = 0; i < length; i++) {
					loglist.push( this._getLogDetail(i) );
				}
				
				return loglist;
			},
			
			/*
			 * Get drive based on grouped files
			 */
			getDriveList: function() {
				var loglist = this.getList(),
					length = typeof loglist !== 'undefined' ? loglist.length : 0,
					driveName,
					driveNames = {},
					driveNamesList = [];
				
				for (var i = 0; i < length; i++) {
					driveName = loglist[i].filepath.match( this.driveRegEx )[1];
					
					if( !driveNames[ driveName ] ) {
						driveNames[ driveName ] = true;
						driveNamesList.push( driveName );
					}
					
				}
				
				return driveNamesList;
			},
			
			/*
			 * Return an individual drive detail based on index
			 * Drives must be preloaded.
			 */
			_getLogDetail: function( index ) {
				var c = this.c;
				return {
					status: c.LMGetSLogFileStatus( index ),
					filepath: c.LMGetSLogFilePath( index ),
					filename: c.LMGetSLogFileName( index )
				};
			}		
			
		});
	
	/*
	 * FAP.syncTransfer.tasks.upload
	 */	 
	tasks.upload = $.extend( 
		Object.create(tasks.base)
		,{
			driveRegEx: /^([A-Za-z]:\\$)/,
		
			/*
			 * @param path 
			 * 		- string filepath eg. 'E:\\syncfootpath\\logfile1.xml' 
			 * 		- string drivename eg. 'E:\\' 
			 * 		- array string filepatheg. ['E:\\syncfootpath\\logfile1.xml', 'E:\\syncfootpath\\logfile2.xml']
			 */
			configure: function( path ) {			
				if( $.type( path ) === 'string' && this.driveRegEx.test( path ) ) {
					this._driveName = path;
				} else {
					this._filepath = $.type( path ) === 'array' ? path : [path];
				}
			},
			
			start: function(){
				this._started = +new Date();
			
				this.c.LMRefreshLogFiles();
				var ilength = this.c.LMGetILogFiles();
				
				                
				for (var i = 0; i < ilength; i++) {
				
					if( this._filepath ) {
				
						var jlength = this._filepath.length;
						for (var j = 0; j < jlength; j++) {
							if( this._filepath[j] == this.c.LMGetSLogFilePath(i) ) {
								this.c.LMSetBLogFileSelectedForUpload(i, true);
								break;
							}						
						}
						
					} else if( this._driveName ) {
						
						if( this.c.LMGetSLogFilePath(i).indexOf( this._driveName ) === 0 ) {
							this.c.LMSetBLogFileSelectedForUpload(i, true);
						}
						
					}
				}
				this.c.UMStartUpload();
			},
			
			_getData: function() {
			
				var 
					// Is finished
					verified = this.c.UMIsBUploadDone(),
					
					// How many Kilo Bytes will be downloaded
					totalKiloBytes = this.c.UMGetITotalUploadKiloBytes(),
					
					// How many Kilo Bytes have been downloaded
					uploadedKiloBytes = this.c.UMGetITotalKiloBytesUploaded(),
					
					// How many Kilo Bytes left to download
					remainingKiloBytes = totalKiloBytes - uploadedKiloBytes,
					
					// Ratio of downloaded to total
					uploadRatio = verified ? 1 : uploadedKiloBytes / totalKiloBytes,
					
					// Time taken so far
					secondsDuration = (+new Date() - this._started) / 1000,
					
					// How many kilo bytes a second
					kiloBytesPerSecond = uploadedKiloBytes / secondsDuration,
					
					// How many kilo bytes a second
					kiloBitPerSecond = kiloBytesPerSecond * 8,

					// Approx Time remaining
					secondsRemaining = remainingKiloBytes / kiloBytesPerSecond,
					
					// Is all the data downloaded
					isUploaded = remainingKiloBytes <= 0;
				
				return {
					filesize: totalKiloBytes,
					uploaded: uploadedKiloBytes.toFixed(0),
					ratio: uploadRatio,
					speed: kiloBitPerSecond.toFixed(0),
					duration: secondsDuration,
					wait: secondsRemaining.toFixed(0),
					isDone: verified,
					isVerifing: isUploaded && !verified
				}
			},
			
			getProgress: function() {
				return $.extend( this._getData(), {
					error: !this.isOk(),
					status: this.status(),
					started: this._started
				});
			}
		});

		
	/* 
	 * FAP.syncTransfer.tasks.Progress
	 * 
	 * Progress is an event emitter. Works for both download and upload
	 */	 
	tasks.Progress = function( type ) {
		
		// 'type' check, it's required.
		if( !arguments.length ) { return; }
		
		// Wrap on progress object in a jquery object, because we want the .on() and .off() and .trigger() functions
		var progess = $(this);
		
		// Polling function. Will trigger events on this progress object.
		function updateProgress() {
			var data = type.getProgress();
			if( data.done || data.isDone || data.error ) {
				progess.trigger('status', data );
				progess.trigger('end', data);
			} else {
				progess.trigger('status', data );
				setTimeout(updateProgress, 25);
			}
		};
		
		// Create a start function that will start the download.
		progess.start = function() {
			progess.trigger('start');
			type.start();
			updateProgress()
		}
		
		// Return the progress object, that is actually a jquery object, with a start function
		return progess;
	}

	/*
	 * FAP.syncTransfer.manager
	 */	 
	$.extend( manager, {
		
		/*
		 * Function getDriveList
		 * @returns object - {
		 * 		used: Array,
		 * 		writable: Array,
		 * 		readonly: Array,
		 * 		error: 0
		 * }
		 */
		getDriveList: function() {
			this.setApplet();
			
			var transferDrives = Object.create( tasks.drives ),
				drives = { error: false };
			
			transferDrives.refreshDrives();

			if( transferDrives.isOk() ) {
				drives.used		= transferDrives.getUsedDrives()
				drives.writable	= transferDrives.getWritableDrives()
				drives.readonly	= transferDrives.getReadonlyDrives()
			} else {
				drives.error = true;
			}

			drives.status = transferDrives.status();
			transferDrives = null;
			return drives;
		},
		
		/*
		 * Function downloadPackage
		 * @param string driveName - drive name
		 * @returns FAP.syncTransfer.tasks.Progress
		 */
		downloadPackage: function( driveName ) {
			this.setApplet();
			
			var downloadProgress,
			
				// Create a new sync download install object.
				download = Object.create( tasks.download );
			
			// Configure the drive to download to.
			download.configure( driveName );
			
			// Wrap download in a progress object.
			downloadProgress = new tasks.Progress( download );

			// Return the progress object.  The download is not started yet.. must call .start() on the progress;
			return downloadProgress;		
		},

		/*
		 * Function getLogFileList
		 * @returns object - {
		 *    logs: Array,
		 * 	  error: false
		 * }
		 */
		getLogFileList: function() {
			this.setApplet();
			
			var logfiler = Object.create( tasks.logfiles ),
				list = { error: false };
			
			logfiler.refreshFiles();
			if( logfiler.isOk() ) {
				list.logs = logfiler.getList();
				list.drives = logfiler.getDriveList();
			} else {
				list.error = true;
			}

			list.status = logfiler.status();
			logfiler = null;
			return list;
		},

		getLogFileStatus: function() {
			this.setApplet();
			var logfiler = Object.create( tasks.logfiles );
			var logs = logfiler.getList();
			return logs;
		},
		
		/*
		 * Function uploadLogFile
		 * @param string filepath - full path to log file including drive
		 * @returns FAP.syncTransfer.tasks.Progress
		 */
		uploadLogFile: function( filepath ) {
			this.setApplet();
			
			var uploadProgress,
			
				// Create a new sync upload install object.
				upload = Object.create( tasks.upload );
			
			// Configure the drive to upload from.
			upload.configure( filepath );
			
			// Wrap upload in a progress object.
			uploadProgress = new tasks.Progress( upload );

			// Return the progress object.  The upload is not started yet.. must call .start() on the progress;
			return uploadProgress;
		},
		
		/*
		 * Function set reference to applet in real time if it's undefined at time of script execution
		 */
		setApplet: function( byForce ) {
			if( byForce ) {
				tasks.base.c = byForce;
				buildStatusCodes(); 
			} else if( typeof tasks.base.c === 'undefined' ) {
				if( typeof document.TransferApplet === 'undefined'  ) {
					//throw TypeError('FAP: Missing sync transfer Applet');

				}
				tasks.base.c = document.TransferApplet;
				buildStatusCodes();
			}
		},
		
		/*
		 * Get important error codes
		 */
		getStatusCodes: function() {
			this.setApplet()
			return module.statusCodes;
		},
		
		/*
		 *  Get the status
		 */
		//TODO review the need
		getStatus: function() {
			this.setApplet();
			return {
				status: tasks.base.c.getSControlStatus(),
				debug: tasks.base.c.getSDebugInfo()
			}
		}
		
		
	});

	// Explicit Global exposure
	exports.syncTransfer = module;

	return exports;

}( window.FAP || {} ));