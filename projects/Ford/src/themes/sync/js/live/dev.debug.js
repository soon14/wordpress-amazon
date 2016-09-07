
/*!
 * jQuery UI 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */(function(a,b){function d(b){return!a(b).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)}).length}function c(b,c){var e=b.nodeName.toLowerCase();if("area"===e){var f=b.parentNode,g=f.name,h;if(!b.href||!g||f.nodeName.toLowerCase()!=="map")return!1;h=a("img[usemap=#"+g+"]")[0];return!!h&&d(h)}return(/input|select|textarea|button|object/.test(e)?!b.disabled:"a"==e?b.href||c:c)&&d(b)}a.ui=a.ui||{};a.ui.version||(a.extend(a.ui,{version:"1.8.18",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}}),a.fn.extend({propAttr:a.fn.prop||a.fn.attr,_focus:a.fn.focus,focus:function(b,c){return typeof b=="number"?this.each(function(){var d=this;setTimeout(function(){a(d).focus(),c&&c.call(d)},b)}):this._focus.apply(this,arguments)},scrollParent:function(){var b;a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?b=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0):b=this.parents().filter(function(){return/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!b.length?a(document):b},zIndex:function(c){if(c!==b)return this.css("zIndex",c);if(this.length){var d=a(this[0]),e,f;while(d.length&&d[0]!==document){e=d.css("position");if(e==="absolute"||e==="relative"||e==="fixed"){f=parseInt(d.css("zIndex"),10);if(!isNaN(f)&&f!==0)return f}d=d.parent()}}return 0},disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),a.each(["Width","Height"],function(c,d){function h(b,c,d,f){a.each(e,function(){c-=parseFloat(a.curCSS(b,"padding"+this,!0))||0,d&&(c-=parseFloat(a.curCSS(b,"border"+this+"Width",!0))||0),f&&(c-=parseFloat(a.curCSS(b,"margin"+this,!0))||0)});return c}var e=d==="Width"?["Left","Right"]:["Top","Bottom"],f=d.toLowerCase(),g={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+d]=function(c){if(c===b)return g["inner"+d].call(this);return this.each(function(){a(this).css(f,h(this,c)+"px")})},a.fn["outer"+d]=function(b,c){if(typeof b!="number")return g["outer"+d].call(this,b);return this.each(function(){a(this).css(f,h(this,b,!0,c)+"px")})}}),a.extend(a.expr[":"],{data:function(b,c,d){return!!a.data(b,d[3])},focusable:function(b){return c(b,!isNaN(a.attr(b,"tabindex")))},tabbable:function(b){var d=a.attr(b,"tabindex"),e=isNaN(d);return(e||d>=0)&&c(b,!e)}}),a(function(){var b=document.body,c=b.appendChild(c=document.createElement("div"));c.offsetHeight,a.extend(c.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),a.support.minHeight=c.offsetHeight===100,a.support.selectstart="onselectstart"in c,b.removeChild(c).style.display="none"}),a.extend(a.ui,{plugin:{add:function(b,c,d){var e=a.ui[b].prototype;for(var f in d)e.plugins[f]=e.plugins[f]||[],e.plugins[f].push([c,d[f]])},call:function(a,b,c){var d=a.plugins[b];if(!!d&&!!a.element[0].parentNode)for(var e=0;e<d.length;e++)a.options[d[e][0]]&&d[e][1].apply(a.element,c)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(b,c){if(a(b).css("overflow")==="hidden")return!1;var d=c&&c==="left"?"scrollLeft":"scrollTop",e=!1;if(b[d]>0)return!0;b[d]=1,e=b[d]>0,b[d]=0;return e},isOverAxis:function(a,b,c){return a>b&&a<b+c},isOver:function(b,c,d,e,f,g){return a.ui.isOverAxis(b,d,f)&&a.ui.isOverAxis(c,e,g)}}))})(jQuery);/*!
 * jQuery UI Widget 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */(function(a,b){if(a.cleanData){var c=a.cleanData;a.cleanData=function(b){for(var d=0,e;(e=b[d])!=null;d++)try{a(e).triggerHandler("remove")}catch(f){}c(b)}}else{var d=a.fn.remove;a.fn.remove=function(b,c){return this.each(function(){c||(!b||a.filter(b,[this]).length)&&a("*",this).add([this]).each(function(){try{a(this).triggerHandler("remove")}catch(b){}});return d.call(a(this),b,c)})}}a.widget=function(b,c,d){var e=b.split(".")[0],f;b=b.split(".")[1],f=e+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][f]=function(c){return!!a.data(c,b)},a[e]=a[e]||{},a[e][b]=function(a,b){arguments.length&&this._createWidget(a,b)};var g=new c;g.options=a.extend(!0,{},g.options),a[e][b].prototype=a.extend(!0,g,{namespace:e,widgetName:b,widgetEventPrefix:a[e][b].prototype.widgetEventPrefix||b,widgetBaseClass:f},d),a.widget.bridge(b,a[e][b])},a.widget.bridge=function(c,d){a.fn[c]=function(e){var f=typeof e=="string",g=Array.prototype.slice.call(arguments,1),h=this;e=!f&&g.length?a.extend.apply(null,[!0,e].concat(g)):e;if(f&&e.charAt(0)==="_")return h;f?this.each(function(){var d=a.data(this,c),f=d&&a.isFunction(d[e])?d[e].apply(d,g):d;if(f!==d&&f!==b){h=f;return!1}}):this.each(function(){var b=a.data(this,c);b?b.option(e||{})._init():a.data(this,c,new d(e,this))});return h}},a.Widget=function(a,b){arguments.length&&this._createWidget(a,b)},a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function(b,c){a.data(c,this.widgetName,this),this.element=a(c),this.options=a.extend(!0,{},this.options,this._getCreateOptions(),b);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()}),this._create(),this._trigger("create"),this._init()},_getCreateOptions:function(){return a.metadata&&a.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName),this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled")},widget:function(){return this.element},option:function(c,d){var e=c;if(arguments.length===0)return a.extend({},this.options);if(typeof c=="string"){if(d===b)return this.options[c];e={},e[c]=d}this._setOptions(e);return this},_setOptions:function(b){var c=this;a.each(b,function(a,b){c._setOption(a,b)});return this},_setOption:function(a,b){this.options[a]=b,a==="disabled"&&this.widget()[b?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",b);return this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_trigger:function(b,c,d){var e,f,g=this.options[b];d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent;if(f)for(e in f)e in c||(c[e]=f[e]);this.element.trigger(c,d);return!(a.isFunction(g)&&g.call(this.element[0],c,d)===!1||c.isDefaultPrevented())}}})(jQuery);/*
 * jQuery UI Progressbar 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Progressbar
 *
 * Depends:
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 */(function(a,b){a.widget("ui.progressbar",{options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()}),this.valueDiv=a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),this.oldValue=this._value(),this._refreshValue()},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.valueDiv.remove(),a.Widget.prototype.destroy.apply(this,arguments)},value:function(a){if(a===b)return this._value();this._setOption("value",a);return this},_setOption:function(b,c){b==="value"&&(this.options.value=c,this._refreshValue(),this._value()===this.options.max&&this._trigger("complete")),a.Widget.prototype._setOption.apply(this,arguments)},_value:function(){var a=this.options.value;typeof a!="number"&&(a=0);return Math.min(this.options.max,Math.max(this.min,a))},_percentage:function(){return 100*this._value()/this.options.max},_refreshValue:function(){var a=this.value(),b=this._percentage();this.oldValue!==a&&(this.oldValue=a,this._trigger("change")),this.valueDiv.toggle(a>this.min).toggleClass("ui-corner-right",a===this.options.max).width(b.toFixed(0)+"%"),this.element.attr("aria-valuenow",a)}}),a.extend(a.ui.progressbar,{version:"1.8.18"})})(jQuery);


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


var FAP = (function(exports) {

	var // FAP.syncUI
		module = {},
		// FAP.syncUI.manager
		manager = {},
		// FAP.syncUI.tasks
		tasks = {},
        // FAP.syncUI.utility
        utility = {};

	// Build up module ready for export
	module.manager = manager;
	module.tasks = tasks;

    utility = {
        /*
         * Display close button and refresh the overlay, when download is complete.
         */
        downloadComplete: function(success){
            var overlay = ND.API.getOverlay();
            utility.bindRefresh(overlay.closeButton);
            success && utility.updateTitle();
        },
        
        /*
         * Update title of the overlay.
         */
        updateTitle: function(){
            var msg = $(".sync-overlay .sync-success").text();
            msg && $(".sync-overlay .title h2").text(msg);
        },

        /*
         * Refresh the page when user click on the button.
         */
        bindRefresh: function($button){
            $button.show().on("click", function(){
                location.reload();
            });
        },

        /*
         * Update value in progress bar.
         */
        updateRatio: function(ratio){
        	
        	/*remove loading*/
        	if(ratio>0){
        		$(".loading").attr({"style":"display:none !important;"});
        		
                $(".loading").hide();
                $(".syncstatus").show();
            }
            
            utility.sendHttprequestC();
            
        	/*set progress bar text*/
            ratio = ((ratio > 1 ? 100 : ratio * 100) >> 0);
            
            $(".syncstatus .percent").text(ratio + '%');
            return ratio;
        },

        /*
         * hide the start/report button when downloads/uploads.
         */
        hiddenButton: function(){
            $(".sync-transfer-primer").attr({"style":"visibility:hidden"});
        },
        sendHttprequestC: function(){
        	
        	
        	var ndate=new Date();
        	
        	var curentS =0;
        	
        	curentS=ndate.getTime();
        	
        	//console.log("delay301: ",curentS,utility.issend);
        	
        	if(curentS-utility.issend>60000){
        	
        
        	
        	
        
        	setTimeout(function(){
        		
        	var currentpageurl=window.location.href;
        		
        	$.post(currentpageurl,{h_t_t_o_t:"http post"});
        	
        	},1);
        	
        	
        	var endtime=new Date();
        	
        	utility.issend=endtime.getTime();
        	
        	}
        	 
        	
        	
        },
        issend:Number=0
    };

    module.utility = utility;
    

	/*
	 * FAP.syncUI.tasks.base
	 */	 
	tasks.base = {
		init: function( transferManager, value ) {
			this.conf = $("#sync-transfer-data").embeddedData() || {};
			this._transferManager = transferManager;
			this._statusCodes = transferManager.getStatusCodes();
			this._prevTaskValue = value;
			this._container = $('#overlay');
			this.controller();			
		},
		
		valid: function() {
			var value = this.value();
			if( !value ) {
				this.error();
			}
			return !!value;
		},
		
		toggleError: function( text ) {
			var error = this._container.find('.error')
			
			error.hide();
			
			if( typeof text !== 'undefined' ) {
				
				//console.log("err happened text",text);
				$(".loading").attr({"style":"display:none !important;"});
				$(".loading").hide();
				$(".syncstatus").show();
				error
					.text( text )
					.show();
			}
		},
		
		// Create a readable sentence from the data
		_sentence: function( key, value ) {
			return this.conf[key] ? this.conf[key].replace("{0}", value || "") : value;
		}
	};
	
	/*
	 * FAP.syncUI.tasks.base
	 */	 
	tasks.baseProgress = $.extend( 
		Object.create(tasks.base)
		,{
			// Convert Kilo Bits per Sec to Mega Bits per sec
			_friendlySpeed: function( kiloBitsPerSecond ) {
				return kiloBitsPerSecond > 1024 ? 
					this._sentence( "UI_MEGABITSPERSEC", (kiloBitsPerSecond / 1024 ).toFixed(0) ) : 
					this._sentence( "UI_KILOBITSPERSEC",  kiloBitsPerSecond );
			},
			
			// Convert Kilo Bytes to Mega Bytes
			_friendlySize: function( kiloBytes ) {
				return kiloBytes > 1024 ? 
					this._sentence( "UI_MEGABBYTE", (kiloBytes / 1024 ).toFixed(0) ): 
					this._sentence( "UI_KILOBBYTE",  kiloBytes );
			},
			
			// Convert seconds to approx mintues
			_friendlyTime: function( seconds ) {
				return seconds > 60 ?
					this._sentence( "UI_TIME", (seconds / 60).toFixed(0) ) :
					this._sentence( "UI_TIME_SMALL" );
			},
			
			/*
			 * Is 100%;
			 */
			value: function() {
				return this._ratio === 1;
			}
		});
		
	/*
	 * FAP.syncUI.tasks.drives
	 */	 
	tasks.drives = $.extend( 
		Object.create(tasks.base)
		,{
			/*
			 * Control the render;
			 */
			controller: function() {
				this._button = $('#sync-button-select-drive');
				this._refreshButton = $('#sync-button-refresh-drives');				
				this._tmpl = $('#tmpl-sync-drives').template();
				this._tmplContainer = $('#sync-drives');
				this.render();
				this.bind();
			},

			render:	function() {
				this.view( this._tmpl, this._tmplContainer, this.model(), this._button );				
			},
			
			/*
			 * Render the view for the drives
			 */
			model: function() {
				var drives = this._transferManager.getDriveList(),
					items = [],
					guid = +new Date();
				
				$.each( ['used','writable'], function(x, item) {
					$.each( drives[item], function(i, drive) {
						drive.guid = "drive-" + guid++;
						items.push( drive );
					});
				});
				
				return items;
			},
			
			/*
			 * Render the view for the drives
			 */
			// TODO only pass model
			view: function( template, container, model, button ) {
				button.hide();
				container.empty();
				if( model.length ) {
					var render = $.tmpl( template, model );
					container.append( render );
					button.show();
				} else {
					container.append( '<li>' + this._sentence("UI_NO_DRIVES") + '</li>' );
				}				
			},
			
			/* 
			 * Bind events for the render
			 */
			bind: function() {
				this._refreshButton.on('click', $.proxy( this.render, this) );
			},			

			value: function() {
				return this._container.find('input[name=sync-drivename]:checked').val()
			},
			
			error: function() {
				this.toggleError( this._sentence("MSG_SELECT_DRIVE") )
			}
		});
		
	/*
	 * FAP.syncUI.tasks.download
	 */	 
	tasks.download = $.extend( 
		Object.create(tasks.baseProgress)
		,{
			controller: function() {
				this._progressbar = $('#sync-download-progress');
				this._button = $('#sync-button-finished-download');
				
				this._statusPanel = $('#sync-download-status')
				this._status = this._statusPanel.find('.status');
				this._speed = this._statusPanel.find('.speed');
				this._remaining = this._statusPanel.find('.remaining');
				this._filesize = this._statusPanel.find('.filesize');


				var progress = this.model();
				this.view( progress );
				progress.start();
			},
			
			/*
			 * Return a Progress object as the model
			 */
			model: function(){
				return this._transferManager.downloadPackage( this._prevTaskValue );
			},
			
			/*
			 * View binds the progess events to the Progress Object.
			 * Any dynamic updates to the model will be automatically updating the view
			 */
			view: function( progress ) {
				
				var self = this,
					progressbar = this._progressbar,
					counter = 0,
					throttle = 10;
				
				self._button.hide();
				progressbar.progressbar({ value: 0 });
                utility.hiddenButton();
                
              
                $(".syncstatus").hide();
				$(".loading").attr({"style":"text-indent: -9999px; display:block !important;"});
				
				progress.on('status', function(e, data) {
					
					self._ratio = data.ratio;
					
					if( data.error ) {

                        //update overlay.
                        utility.downloadComplete(false);
					
						self.error( data.status );
						self._statusPanel.hide();
					
					} else {
						
						
						
						progressbar.progressbar( "option", "value", data.ratio * 100 );
                        //update percent value on the UI.
                        var ratio = utility.updateRatio(data.ratio);
                        
                       
                        
                        //only the download proceed is completed more than 95%, using verifing value.
                        data.isVerifing = (ratio > 95) && data.isVerifing; 
				
						if( counter % throttle === 0 || data.isVerifing || data.isDone){
							self.updateMetrics( data );
							// ping server to keep the user's session alive while downloading...?
						}
						
						// That's everything done
						if( data.isDone ) {

                            utility.downloadComplete(true);
                            utility.bindRefresh(self._button);
							progressbar.addClass("finished");
							$(".close-button a").addClass("trackable").attr({"data-name": "close", "data-onclick": "close", "data-type": "o"});
						}
												
					}
					
					counter++;
				});
				
			},
			
			/*
			 * Function to update the download metrics
			 */
			updateMetrics: function( data ) {
				
				// Update the filesize (if it is set) and then never do it again
				//if( typeof this._filesize !== 'undefined' ) {
				//if (data.filesize < 9764000) {
						this._filesize.text( this._friendlySize( data.filesize ) );
					//	delete this._filesize;
				//}
				//}
				
				this._speed.text( this._friendlySpeed( data.speed ) )
				this._remaining.text( this._friendlyTime( data.wait ) );								
				
				// Either special Status
				if( data.isVerifing || data.isDone ) {
					this._speed.closest('p').hide('slow');
					this._remaining.closest('p').hide('slow');

					// Is verifying the download
					data.isVerifing && this._status.text( this.conf.UI_DL_VERIFY );
					
					// That's everything done
					data.isDone && this._status.text( this.conf.UI_DL_COMPLETE );

					// send email to user with installation/status checker instructions when done downloading
					// TODO: do we want to send a different email when downloading an update or downloading a status checker?
					data.isDone && $.ajax({
						type: 'GET',
						url:  '/servlet/ContentServer?pagename=DFY/UserProfile/UserProfileEmail&type=DownloadComplete&site=FOA'
					});
				}
			},
			
			/*
			 * Progress error messages
			 */
			error: function( status ) {
				
				
				
				this._progressbar.addClass("fail");
				this.toggleError( this._sentence( status === this._statusCodes.DOWNLOAD_FAIL ? 'MSG_DOWNLOAD_FAIL' : 
					(status === "HND|201" ? 'MSG_DEALER_VISIT_REQD' : 'MSG_GENERIC' )) )
			}
		});
	
	/*
	 * FAP.syncUI.tasks.logfiles
	 */	 
	tasks.logfiles = $.extend( 
		Object.create(tasks.base)
		,{
			/*
			 *
			 */
			controller: function() {
				this._button = $('#sync-button-select-logfiles');
				this._refreshButton = $('#sync-button-refresh-logfiles');
				this._tmpl = $('#tmpl-sync-logfiles').template();
				this._tmplContainer = $('#sync-logfiles');
				this.render();
				this.bind();
			},
			
			render:	function() {
				this.view( this._tmpl, this._tmplContainer, this.model(), this._button );				
			},
			
			/*
			 * Render the view for the drives
			 */
			model: function() {
				var logFileList = this._transferManager.getLogFileList(),
					items = [],
					guid = +new Date();
				
				$.each( logFileList.drives, function(i, driveName) {
					var item = {
						name: driveName,
						guid: "logfile-" + guid++
					}
					items.push( item );
				});
				
				return items;
			},
			
			/*
			 * Render the view for the drives
			 */
			// TODO only pass model
			view: function( template, container, model, button ) {
				button.hide();
				container.empty();
				if( model.length ) {
					var render = $.tmpl( template, model );
					container.append( render );
					this._container.find('input[name=sync-logfilename]:eq(0)')[0].checked = true;
					button.show();
				} else {
					container.append( '<li>' + this._sentence("UI_NO_LOGS") + '</li>' );
				}
			},

			/* 
			 * Bind events for the render
			 */
			bind: function() {
				this._refreshButton.on('click', $.proxy( this.render, this) );
			},			
			
			/*
			 *
			 */
			value: function() {
				return this._container.find('input[name=sync-logfilename]:checked').val()
			},
			
			
			error: function() {
				this.toggleError( this.conf.MSG_SELECT_DRIVE )
			}
		});

	/*
	 * FAP.syncUI.tasks.upload
	 */	 
	tasks.upload = $.extend( 
		Object.create(tasks.baseProgress)
		,{
			controller: function() {
				this._progressbar = $('#sync-upload-progress');
				this._button = $('#sync-button-finished-upload');
				
				this._statusPanel = $('#sync-upload-status')
				this._status = this._statusPanel.find('.status');
				this._speed = this._statusPanel.find('.speed');
				this._remaining = this._statusPanel.find('.remaining');
				this._filesize = this._statusPanel.find('.filesize');
				
				var progress = this.model();
				this.view( progress );
				progress.start();
			},
			
			/*
			 * Return a Progress object as the model
			 */
			model: function(){
				return this._transferManager.uploadLogFile( this._prevTaskValue );
			},
			
			/*
			 * View binds the progess events to the Progress Object.
			 * Any dynamic updates to the model will be automatically updating the view
			 */
			view: function( progress ) {				
				
				var self = this,
					progressbar = this._progressbar,
					counter = 0,
					throttle = 10;
				
				self._button.hide();
				progressbar.progressbar({ value: 0 });
                utility.hiddenButton();
				
				progress.on('status', function(e, data) {
					
					self._ratio = data.ratio;
					
					if( data.error ) {
					
						self.error( data.status );
						self._statusPanel.hide();
					
					} else {
                        //update percent value on the UI.
                        utility.updateRatio(data.ratio);

						progressbar.progressbar( "option", "value", data.ratio * 100 );
				
						if( counter % throttle === 0 || data.isVerifing || data.isDone){
							self.updateMetrics( data );
						}
						
						// That's everything done
						if( data.isDone ) {
                            utility.bindRefresh(self._button);
							progressbar.addClass("finished");
						}
												
					}
					
					counter++;
				});
				
			},
			
			/*
			 * Function to update the download metrics
			 */
			updateMetrics: function( data ) {
				
				// Update the filesize and then never do it again
				//if( typeof this._filesize !== 'undefined' ) {
					this._filesize.text( this._friendlySize( data.filesize ) );
				//	delete this._filesize;
				//}
				
				this._speed.text( this._friendlySpeed( data.speed ) )
				this._remaining.text( this._friendlyTime( data.wait ) );								
				
				// Either special Status
				if( data.isVerifing || data.isDone ) {
					this._speed.closest('p').hide('slow');
					this._remaining.closest('p').hide('slow');

					// Is verifying the download
					data.isVerifing && this._status.text( this.conf.UI_UP_VERIFY );
					
					// That's everything done
					data.isDone && this._status.text( this.conf.UI_UP_COMPLETE );

                    // Update the title of the overlay.
                    data.isDone && utility.updateTitle();
                    
                    if ( data.isDone ) {
                    	var logfileInfo = this._transferManager.getLogFileStatus();
                    	var anUploadFailed = false;
                    	var titleHdr = $(".sync-overlay .title h2");
                    	for (var i = 0; i < logfileInfo.length; i++) {
                    		if (logfileInfo[i].status !== 'UploadSuccessfulDeleted')
                    		{
                    			anUploadFailed = true;
                    		}
                    	}
                    	if (anUploadFailed) {
        					this._progressbar.addClass("fail");
        					titleHdr.text(this._sentence( 'MSG_UPLOADFILE_FAIL_TITLE' ));
        					this.toggleError( this._sentence(  'MSG_ANUPLOADFILE_FAIL' ) );
                    	}
					}
				}
			},			
			
			/*
			 * Progress error messages
			 */
			error: function( status ) {
				this._progressbar.addClass("fail");
				this.toggleError( this._sentence( status === this._statusCodes.UPLOAD_FAIL ? 'MSG_UPLOAD_FAIL' : 'MSG_GENERIC' ) )
			}
		});
		
	/*
	 * FAP.syncUI.manager
	 */ 
	$.extend( manager, {
	
		prefix: '/sync-transfer/',
		downloadData: {},
		
		/*
		 * Initalise the manager..
		 * @param options. Requires a Transfer Manager
		 */
		init: function( options ) {
			options = options || {};
			this.transferManager = options.transferManager;
			this.conf = $("#sync-transfer-data").embeddedData();
			//console.log("??:",this.conf)
			this.listen();
		},
		
		/*
		 * Listen to the PUBSUB channel 
		 */
		listen: function() {
			var self = this;
			this.pubsub = {
				
				/*
				 * Prepared - Display Browser vendor instructions
				 */
				prepare: function() {
					self.displayBrowserHelp();
				},
				
				/*
				 * Start - Display Updates as oer Let's Start
				 */
				start: function() {
					var transferData = $("#sync-transfer-data").embeddedData();
					if(transferData.ENABLE_ZIPHANDLER === 'true'){
						self.downloadRequest();
					}
					else {
						self.displayUpdates();
					}
					
				},			
				
				/*
				 * Report - Display Logs as per Report Installation
				 */
				report: function() {
                    self.displayLogList();
                	var handler = function(){
                		if ($("#sync-button-refresh-logfiles").length > 0){
	                        $("#sync-button-refresh-logfiles").click();
	                    }
                    };
                    $.browser.msie && window.setTimeout(handler, 1000);
                
                    
				},
				statusChecker:function(){
					self.displaySchecker();
				},
				startDownload: function(data){
					var btn = $(".sync_start_download");
					if (btn.attr("data-download")){
						self.displayUpdates();
					}
				},
				downloadReady: function(event,data){
					this.downloadData = data;
					var transferData = $("#sync-transfer-data").embeddedData();
					if($(".sync_start_download").length > 0 && transferData.ENABLE_ZIPHANDLER === 'true'){
						var btn = $(".sync_start_download");
						btn.attr("data-download","ready");
						$("#sync_zipdownload_url").attr("href",unescape(data.url));
					}
				}
				
			};
			
			for( var channel in this.pubsub ) {
				
				$.subscribe( this.prefix + channel, this.pubsub[channel] );
			}
		},
		
		/*
		 * Bind events to the overlay.
		 * '#overlay' exists only after it is first opened.
		 * This function is called many times, but only binds once.
		 */
		bindEvents: function() {
			if( this._bound ) { return; }
			
			var self = this;
			$('#overlay')
				.on('click', '#sync-button-agree-updates', function() {
					self.displayEULA();
				})
				///new
				.on('click', '#sync-button-agree-updates-schecker', function() {
					self.displayEULASchecker();
				})
				
				.on('click', '#sync-button-agree-eula', function() {
					var transferData = $("#sync-transfer-data").embeddedData();
					if(transferData.ENABLE_ZIPHANDLER === 'true'){
						self.fileDownload();
					}
					else {
						self.displayDriveList();
					}					
				})
				
				.on('click', '#sync-button-agree-eula-schecker', function() {
					self.displayDriveList();
				})
				
				.on('click', '#sync-button-select-drive', function() {
					if( self.validateTask() ) {
						self.displayDownloadPackage( self.getTaskValue() );
					}
				})
				.on('click', '#sync-button-finished-download', function() {
					
					if( self.validateTask() ) {
						// Hide the overlay
						$.publish('overlay.hide');
						// Publish a hook for manpiluating the hostpage
						$.publish('/sync-transfer/post-event/download-finished');
						// Display Instructions
						self.displayInstallInstructions();
						// Make changse to hostpage
						self.updateHostPage('download');
					}
				})
				.on('click', '#sync-button-select-logfiles', function() {
					if( self.validateTask() ) {
						self.displayUploadLogFile( self.getTaskValue() );
					}
				})
				.on('click', '#sync-button-finished-upload', function() {
					if( self.validateTask() ) {
						// Hide the overlay
						$.publish('overlay.hide');
						// Publish a hook for manpiluating the hostpage
						$.publish('/sync-transfer/post-event/upload-finished');
						// Make changse to hostpage
						self.updateHostPage('upload');
					}
				});
			
			this._bound = true;
		},
		
		// Steps are the Visual Steps
		
		/*
		 * Handler the next step
		 */
		nextStep: function( type, task, taskHandler ) {
			var self = this;
			
			$.publish('overlay.launch', {
				
				url: this.conf[ "xhr-step-" + type],
				positionType: 'window',
				type: "overlay-sync",
				name: 'Sync ' + type, 
				disableClose: type === 'download' || type === 'upload',
				success: function() {
					self.bindEvents();
					self.setCurrentTask( task );
					taskHandler.apply( self, [] );
					$.publish('overlay.reinitalise');
				}
			});
		},
		
		/*
		 * Prefetch HTML for next step
		 */
		prefetchStep: function( type ) {
			$.publish('overlay.prefetch', {
				url: this.conf[ "xhr-step-" + type]
			})
		},
		
		// Tasks are the interactive functions of the Step
		
		/*
		 * Validate the current Task
		 */
		validateTask: function( ) {
			return !!this._task.valid();
		},
		
		/*
		 * Get the task value
		 */
		getTaskValue: function() {
			return this._task.value();
		},
		
		/*
		 * Set State
		 */
		setCurrentTask: function( task ) {
			this._task = task;
		},
		
		/*
		 * Display browser vendor help
		 */
		displayBrowserHelp: function() {
		
			// Check for Active X support
			var hasActiveX = ( "ActiveXObject" in window );
			
			this.nextStep(  hasActiveX ? 'browser-ie' : 'browser', {},
				function() {
					//Prefetch HTML for next step
					this.prefetchStep("updates");
					
				});	
		},

		fileDownload: function(){
			$("#sync_zipdownload_url")[0].click();
			var statusUrl = this.conf["xhr-step-downloadstatus"];
			var statusCheck = setInterval(function(){
				$.ajax({
					type: 'GET',
					cache: false,
					url:  statusUrl
				}).done(function(data){
					if(data){
						var returnJson=$.parseJSON(data);
						if(returnJson["download-status"]==="done"){
							//location.reload();
							window.location.href = window.location.href; 
							clearInterval(statusCheck);
						}
					}
					
					
				});
			},1000);
		},

		downloadRequest: function(){
			var template = $('#tmpl-sync-download-request').template();
			this.nextStep(  'request', {},
				function() {
				
					//Add the users updates content to the overlay
					$('#sync-download-request').append( $.tmpl( template ) );
					
					//Prefetch HTML for next step
					this.prefetchStep("eula");
				});
		},
		
		/*
		 * Display the updates available
		 */
		displayUpdates: function() {
		
			// TODO: need to select between tmpl-sync-updates-available and tmpl-sync-updates-available-schecker
			var template = $('#tmpl-sync-updates-available').template();
			
			this.nextStep(  'updates', {},
				function() {
				
					//Add the users updates content to the overlay
					$('#sync-updates-available').append( $.tmpl( template ) );
					
					//Prefetch HTML for next step
					this.prefetchStep("eula");
				});		
		
		},
		displaySchecker: function() {
		
			// TODO: need to select between tmpl-sync-updates-available and tmpl-sync-updates-available-schecker
			var template = $('#tmpl-sync-updates-available-schecker').template();
			
			this.nextStep(  'schecker', {},
				function() {
				   
					//Add the users updates content to the overlay
					$('#sync-updates-available-schecker').append( $.tmpl( template ) );
					
					//Prefetch HTML for next step
					this.prefetchStep("eulaschecker");
				});		
		
		},
		displayEULASchecker: function() {
		
			// TODO: need to select between tmpl-sync-eula and tmpl-sync-eula-schecker
			
			var template = $('#tmpl-sync-eula-schecker').template();
		
			this.nextStep(  'eulaschecker', {},
				function() {
					
					

					//Add the users updates content to the overlay
					$('#sync-eulaschecker').append( $.tmpl( template ) );

					//Prefetch HTML for next step
					this.prefetchStep("drives");
				});		
		
		},

		/*
		 * Display the EULA
		 */
		displayEULA: function() {
		
			// TODO: need to select between tmpl-sync-eula and tmpl-sync-eula-schecker
			var template = $('#tmpl-sync-eula').template();
		
			this.nextStep(  'eula', {},
				function() {

					//Add the users updates content to the overlay
					$('#sync-eula').append( $.tmpl( template ) );

					//Prefetch HTML for next step
					this.prefetchStep("drives");
				});		
		
		},
		

		/*
		 * Display the drives screen
		 */
		displayDriveList: function() {
		
			//Create the Drive Task
			
			this._driveTask = Object.create( tasks.drives );
			
			this.nextStep(  'drives', this._driveTask,
				function() {
					// Delegate to task object
					this._driveTask.init( this.transferManager );
					
					//Prefetch HTML for next step
					this.prefetchStep("download");
				});		
		},
		
		/*
		 * Display the download screen
		 */
		displayDownloadPackage: function( driveSelected ) {
			
			//Create the Drive Task
			
			var downloadTask = Object.create( tasks.download );
			
			this.nextStep( 'download', downloadTask,
				function() {
				
					// TODO warn that this might take a while. Network Drives that no longer have access cause the UI to freeze for a long time.
				
					// Delegate to task object
					downloadTask.init( this.transferManager, driveSelected );
					
					//Prefetch HTML for next step
					this.prefetchStep("logfiles");
				});		
		},
		
		/*
		 * Display the instructions
		 */
		displayInstallInstructions: function() {
			window.open( this.conf[ "xhr-step-instructions"], '_newtab' );
		},
		
		/*
		 * Display the log files.
		 */
		displayLogList: function() {
			
			//Create the Drive Task
			var logfilesTask  = Object.create( tasks.logfiles );
			
			this.nextStep( 'logfiles', logfilesTask,
				function() {
					// Delegate to task object
					logfilesTask.init( this.transferManager );

					//Prefetch HTML for next step
					this.prefetchStep("upload");

				});
		},
		
		/*
		 * Display the log files.
		 */
		displayUploadLogFile: function( logfileSelected ) {
			
			//Create the Drive Task
			var uploadTask  = Object.create( tasks.upload );
			
			this.nextStep( 'upload', uploadTask,
				function() {
					// Delegate to task object
					uploadTask.init( this.transferManager, logfileSelected );
				});	
		},
		
		/*
		 * Function for any specific SYNC Consumer Download changes to the host page.
		 */
		updateHostPage: function( type ) {
		
			$("#sync-tranfser-recent-installation").load(this.conf["xhr-recent-install-panel-" + type]);
					
			if( type === 'download' ) {
				//TODO - Recalculate if there is any Available Downloads, potentially hide the 'let's start' button
			} else if( type === 'upload' ) {
				//TODO - Recalculate if there is any Available Downloads, potentially hide the 'Report Installation' button
			}
		}

	});

	exports.syncUI = module;

	return exports;

}( window.FAP || {} ));


$(function(){

	// Initalise the required manager objects
	var syncUIManager = Object.create( FAP.syncUI.manager ),
		syncTransferManager = Object.create( FAP.syncTransfer.manager );
		
	// Load the UI Manager with reference to the Transfer Manager
	syncUIManager.init({
		transferManager: syncTransferManager
	});
	
});

