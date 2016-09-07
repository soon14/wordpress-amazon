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