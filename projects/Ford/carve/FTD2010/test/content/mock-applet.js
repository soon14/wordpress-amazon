document.TransferApplet = {
	
		/*
		 * Get overall status
		 */
		getSControlStatus: function() {
			return this._status;
		}

		/*
		 * Constants
		 */
		,getConstantControlStatusOK: function(){
			return 'CONTROL_STATUS_OK';
		}
		,getConstantControlStatusDownloadFailed: function(){
			return 'CONTROL_STATUS_DOWNLOAD_FAILED';
		}
		,getConstantControlStatusInvalidParameter: function(){
			return 'CONTROL_STATUS_INVALID_PARAMETER';
		}
		,getConstantControlStatusRefreshDrivesFailed: function(){
			return 'CONTROL_STATUS_REFRESH_DRIVES_FAILED';
		}
		,getConstantControlStatusRefreshLogFilesFailed: function(){
			return 'CONTROL_STATUS_REFRESH_LOGFILES_FAILED';
		}
		,getConstantControlStatusUnexpectedError: function(){
			return 'CONTROL_STATUS_UNEXPECTED_ERROR';
		}
		,getConstantControlStatusUnexpectedInitError: function(){
			return 'CONTROL_STATUS_UNEXPECTED_INIT_ERROR';
		}
		,getConstantControlStatusUploadFailed: function(){
			return 'CONTROL_STATUS_UPLOAD_FAILED';
		}
		

		/*
		 * Drive Manager
		 */
		,DMRefreshDrives: function() {
			this._status = this.getConstantControlStatusOK();
		}
		,DMLoadDrivesByStatusAndSyncFootprint: function( status, used ) {
			if( used ) {
				this._drives = [];
			} else {
				this._drives = [
					{_description: 'Drive C', _name: 'C', _status: this.DMGetConstantDriveStatusInsufficientSpace(), _isNew:false},
					{_description: 'Drive E', _name: 'E', _status: this.DMGetConstantDriveStatusOk(), _isNew:true}
				];
			}
			this._status = this.getConstantControlStatusOK();			
		}
		,DMLoadDrivesByNotStatus: function( status ) {
			this._drives = [
				{_description: 'Drive D', _name: 'D', _status: this.DMGetConstantDriveStatusNotWritable(), _isNew:false}
			];
			this._status = this.getConstantControlStatusOK();
		}
		,DMGetIDrives: function() {
			return this._drives.length;
		}		
		,DMGetSDriveDescription: function(index) {
			return this._drives[ index ]._description
		}
		,DMGetSDriveName: function(index) {
			return this._drives[ index ]._name
		}
		,DMGetSDriveStatus: function(index) {
			return this._drives[ index ]._status
		}
		,DMGetBNewDrive: function(index) {
			return this._drives[ index ]._isNew
		}
		,DMLoadDrivesByName: function( name ) {
			if( name === 'E' ) {
				this._drives = [
					{_description: 'Drive E', _name: 'E', _status: this.DMGetConstantDriveStatusOk(), _isNew:true}
				];
				this._status = this.getConstantControlStatusOK();
			} else {
				this._drives = [];
				this._status = this.DMGetConstantDriveStatusNotWritable();
			}
		}

		/*
		 * Drive Manager Constants
		 */
		,DMGetConstantDriveStatusInsufficientSpace: function(){
			return 'DRIVE_STATUS_INSUFFICIENT_SPACE';
		}
		,DMGetConstantDriveStatusNotReadable: function(){
			return 'DRIVE_STATUS_NOT_READABLE';
		}
		,DMGetConstantDriveStatusNotWritable: function(){
			return 'DRIVE_STATUS_NOT_WRITABLE';
		}
		,DMGetConstantDriveStatusOk: function(){
			return 'DRIVE_STATUS_OK';
		}
		
		/*
		 * Log Manager
		 */
		,LMRefreshLogFiles: function() {
			this._readyforUpload = [];
			this._logs = [{
				_filepath: 'E:\\syncfootpath\\logfile1.xml',
				_filename: 'logfile1.xml',
				_status: this.LMGetConstantLogFileStatusNotUploaded()
			},{
				_filepath: 'E:\\syncfootpath\\logfile2.xml',
				_filename: 'logfile2.xml',
				_status: this.LMGetConstantLogFileStatusNotUploaded()
			},{
				_filepath: 'G:\\syncfootpath\\logfile3.xml',
				_filename: 'logfile3.xml',
				_status: this.LMGetConstantLogFileStatusNotUploaded()
			}];
		}
		,LMGetILogFiles: function() {
			return this._logs.length;
		}
		,LMGetSLogFilePath: function(index) {
			return this._logs[ index ]._filepath;
		}
		,LMGetSLogFileName: function(index) {
			return this._logs[ index ]._filename;
		}
		,LMGetSLogFileStatus: function(index) {
			return this._logs[ index ]._status;
		}
		,LMSetBLogFileSelectedForUpload: function( upload ) {
			this._readyforUpload.push( upload );
		}
		
		/*
		 * Log Manager Constants
		 */
		,LMGetConstantLogFileStatusNotUploaded: function(){
			return 'LOGFILE_STATUS_NOT_UPLOADED';
		}
		,LMGetConstantLogFileStatusNotUploadedMaxFilesExceeded: function(){
			return 'LOGFILE_STATUS_NOT_UPLOADED_MAX_FILES_EXCEEDED';
		}
		,LMGetConstantLogFileStatusNotUploadedMaxLengthExceeded: function(){
			return 'LOGFILE_STATUS_NOT_UPLOADED_MAX_LENGTH_EXCEEDED';
		}
		,LMGetConstantLogFileStatusUploadFailed: function(){
			return 'LOGFILE_STATUS_UPLOAD_FAILED';
		}
		,LMGetConstantLogFileStatusUploadSuccessful: function(){
			return 'LOGFILE_STATUS_UPLOAD_SUCCESSFUL';
		}
		,LMGetConstantLogFileStatusUploadSuccessfulDeleted: function(){
			return 'LOGFILE_STATUS_UPLOAD_SUCCESSFUL_DELETED';
		}
		,LMGetConstantLogFileStatusUploadSuccessfulNotDeleted: function(){
			return 'LOGFILE_STATUS_UPLOAD_SUCCESSFUL_NOT_DELETED';
		}
		
	
		/* 
		 * Install Manager : Simulated download
		 */
		,IMIsBInstallDone: function() {
			this._downloaded++
			if( this._simulatedDownloadError === this._downloaded) {
				this._status = this.getConstantControlStatusDownloadFailed();
			}
			return this._downloaded > this._downloadedCap;
		}		
		,IMGetIDownloadSizeKiloBytes: function() {
			return this._downloadedCap;
		}	
		,IMGetITotalKiloBytesDownloaded: function() {
			return this._downloaded;
		}
		,IMStartDownload: function( drive ) {
			if( typeof drive != 'undefined' ) {
				this._downloaded = 0;
				this._downloadedCap = 10;
			}
		}
		,_simulateDownloadError: function() {
			this._simulatedDownloadError = 9;
		}
		


		/*
		 * Upload Manager : Simulated upload
		 */
		,UMIsBUploadDone: function() {
			this._uploaded++
			if( this._simulatedUploadError === this._uploaded) {
				this._status = this.getConstantControlStatusUploadFailed();
			}
			return this._uploaded > this._uploadedCap;
		}		
		,UMGetITotalUploadKiloBytes: function() {
			return this._uploadedCap;
		}		
		,UMGetITotalKiloBytesUploaded: function() {
			return this._uploaded;
		}
		,UMStartUpload: function() {
			if( this._readyforUpload.length ) {
				this._uploaded = 0;
				this._uploadedCap = this._readyforUpload.length * 10;
			}
		}
		,_simulateUploadError: function() {
			this._simulatedUploadError = 6;
		}
		
	}