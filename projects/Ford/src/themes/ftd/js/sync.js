/*
 * SYNC.js
 * Author:gbaker 11/05/2011 
 */

/*globals window, document, jQuery, ND, SiteConf */
ND.syncVersionManager = (function($, undefined){
	
		/*
		 * Store the templates
		 */
	var HTML = {
			series: '<option class="syncinj" value="%INDEX%">%MAKENAME% %MODELNAME%</option>',
			year: '<option class="syncinj" value="%INDEX%">%YEAR%</option>',
			interior: ['<div class="syncinj row">',
							'<input type="radio" name="SteeringWheel" id="SteeringWheel%INDEX%" value="%INDEX%"/>', 
							'<label for="SteeringWheel%INDEX%">',
								'<span class="iconshow"><img src="%IMAGE%" alt="SteeringWheel%INDEX%" width="130" height="68" /></span>', 
								'<span class="info">%DESCRIPTION%</span>',
							'</label>',
						'</div>'].join('')
				
		},
	
		
		/*
		 * Simple Template Helper Function
		 */
		simpleTemplate = function( name, data ) {
			return HTML[name].replace( /%([A-Z]*?)%/g, function(m, g) {
			    return data[g.toLowerCase()];
			});
		},

		/*
		 * Object: syncVersionManager
		 * 
		 * SYNC Version Manager.
		 * Adds all logic to click events of A.overlay-sync
		 */
		syncVersionManager = {
			
			/*
			 * Startup
			 */
			
			init: function( elements, prefix ) {

				var self = this;
				
				

				//Required links for page
				
				self.elementsSelector = elements || '.overlay-sync, .force-overlay-sync';
				self.elements = $(elements || '.overlay-sync, .force-overlay-sync');
		
		        $wait(function(){
				
				if($("A.overlay-sync").length > 0){
					
					
					$("A.overlay-sync").css({ "visibility": "visible" });
				}
				
				self.addsyncbackground();
				
				
				self.chooseSiteVersion();
					
				})
				
			},
			chooseSiteVersion:function(){
				
				var self = this,
					syncData = $("#sync-data").embeddedData();
					
				
				if( syncData['xhr-sync-flag']=="sync5" ) {
					
				
				self.savecookie();
				self.synclinksguide();
				self.forceoverlaysync();
				
					
				}else{
					
					//Readyness
				self.createStores();
				self.bindLinks();				
				self.readyVehicleChanges();
				
				//Check for vehicle (onload)
				self.checkForVehicle();
					
				}
			}
			,
			addsyncbackground:function(){
				
				$("body.sync_generic").parent().addClass("sync_generic");
			}
			,
			setsync5versionCookie: function(value){
				////SYNC5
				$.cookie("sync5version",value);
				
			}
			,
			getsync5versionCookie:function(){
				////SYNC5
				return $.cookie("sync5version");
			},
			savecookie:function(){
				////SYNC5
				var self = this;
				
				var params = $.deparam.querystring( window.location.href );
				var vs= params.v;
				
				if(vs !==undefined){
				self.setsync5versionCookie(vs);
				}
				
			}
			,
			forceoverlaysync:function(){
				////SYNC5
				var self = this;
				$("A.force-overlay-sync").bind("click",function(e){
					 e.preventDefault();
					 self.popoverlay();	
				})
			}
			,
			synclinksguide:function(){
				////SYNC5
				var self = this;
				
				
				
				$(".overlay-sync").click(function( e ){
					
					
					var currentahref=$(this).attr("href");
					var params = $.deparam.querystring(currentahref);
				    var vsi= params.v;
				  
				    if($(this).hasClass("sync4")){
				    	
				    	e.preventDefault();	
				    	self.obtainVersion( this );
				    }else{
				    
				    if(vsi===undefined){
				    
				   
				    	
				    if(self.getsync5versionCookie() !=null){
					
					    
					    var currenthref;
					    
					    if(currentahref.indexOf("?") === -1){
					    
					    currenthref=currentahref+"?v="+	self.getsync5versionCookie();
					    
					    }else{
					    	
					     currenthref=currentahref+"&v="+	self.getsync5versionCookie();
					    }
					   
					    e.preventDefault();	
					    e.stopPropagation();
					    window.location.href = currenthref;
					    
					    
				     }else{
				    
					//Lanch overlay
					e.preventDefault();	
					e.stopPropagation();
				    self.popoverlay();
					//track sync5
				    if(!$(this).hasClass("trackable")){
				    	self.track(this);	
				    	}
				     }
				    	
				    	
				    }
				    }
				    
				})
			},
			track:function(){
				//sync5 omniture
			     $.publish('/analytics/link/', { 
						title: "sync:change sync version",
						link: this,
						type: "o",
						onclicks: "change sync version"
					});
				 // 
			},
			popoverlay: function( ) {

				var self = this,
			
				
					syncData = $("#sync-data").embeddedData();
					
				
				if( syncData['xhr-sync-overlay'] ) {
					
					//Launch overlay
					
					$.publish('overlay.launch', {
						url: syncData['xhr-sync-overlay'],
						type:"syncoverlay5",
						positionType:'window'
						
						
					});					
					
					
				}
				
				
		
			}
			
			/*
			 * Create cookie stores
			 */
			,
			createStores: function() {
				
				var props = {};
				//Cookies
				$.each( ['Version', 'Vehicle'], function(i, name) {

					var store = Object.create(ND.cacheStore);
						store.key = "dfy.sync." + name;
						store.expires = 365;
					
					//Getter
					props[ 'get' + name ] = function ( ){
						return store.get();				
					};
					
					//Setter
					props[ 'set' + name ] = function ( value ){
						store.set( value );
					};

				});
				$.extend( this, props );				
			},
			
			/*
			 * Action taken if there is a valid version
			 */
			handleVersion: function( elem, version, canCancelForward,stopIT) {
				
				var forward = true;
				
				//Check existing version if allowed
				if( canCancelForward ) {
					//Possible cancel the forwarding
					//if they hit the back button, their cookie and their current page will not match. So must check current page.
					
					forward = this.getHrefVersion() !== version;
				}
				if(stopIT){
					
					forward=false;
					
				}
				//Save Result
				this.setVersion( version );

				//Forward URL
				if( forward ) {
					var href = elem.href;
					if(/.+[?&]v=.+/.test(href)){
						href = href.replace(/v=[^&#]+/g, "v=" + version );
					}else{
						href = href + (href.indexOf( "?" ) === -1 ?  "?" : "&") + "v=" + version;
					}
					window.location = href;
				}
			},
			
			/*
			 * Do Nothing other than Broadcast vehicle change
			 */
			handleVehicle: function( vehicle ) {
				//Save Result
				this.setVehicle( vehicle );
				//Broadcast
				$.publish("sync-applicable-vehicle", { vehicle: vehicle });
			},
			
			/*
			 * highlight the vehicle
			 */
			readyVehicleChanges: function( elem, vehicle ) { 
			
				var list = $("#sync-changevehicle li");
				var imagesList = $("#vehicleImags img");
				if( list.size() ) {				
					$.subscribe("sync-applicable-vehicle", function(event, data) {
						list
							.removeClass('current')
							.filter( function() {
								return this.id === data.vehicle;
							})
							.addClass('current')
							.prependTo("#sync-changevehicle");
						
						imagesList
							.filter(function() {
								return this.title == data.vehicle;	
							})
							.show()
							.siblings().hide();
					});
				}
			},
			
			/*
			 * Check for Vehicle now.
			 */
			checkForVehicle: function() {
				
				var vehicle = this.getVehicle();
				if( vehicle )	{
					this.handleVehicle( vehicle );
				}
			},
			
			/*
			 * Test href for v parameter
			 * Function depends on jquery.bbq
			 */
			testHref: function( href ) {
				return !!this.getHrefVersion( href );				
			},
			
			/*
			 * Get parameter from href
			 * Function depends on jquery.bbq
			 */
			getHrefVersion: function( href ) {
				var params = $.deparam.querystring( href );
				return params.v;				
			},
			
			/*
			 * Bind click events to A.overlay-sync 
			 */
			bindLinks: function() {
				var self = this;
				
				self.elements.click(function( e ){
					
					var ignoreCookie = $(this).hasClass('force-overlay-sync');
					var ischangev=$(this).hasClass('changevehicle');

						//Possibly ignore the cookie. //change here
					if( ignoreCookie ) {

						e.preventDefault();
						self.obtainVersion( this, true );
						
						
						//Test if V is already in the URL and ignore A.overlay-sync if such is the case.
					} else if( !self.testHref( this.href ) ) { 
						e.preventDefault();
						var version = self.getVersion( this );

						if( version ) {
							
							if(ischangev){
								
								self.handleVersion( this, version,false,true);
								
							}else{
								
								self.handleVersion( this, version);
								
							}
							
						} else {
							self.obtainVersion( this );
							//track sync4
							if(!$(this).hasClass("trackable")){
							self.track( this );
							}
						}
					}				
				});				
			},
			
			
			/*
			 * There was no version in cookie, 
			 * So let's ask the user to select from IOP.
			 */
			obtainVersion: function( elem, checkFowarding ) {
				var self = this;
				
				self.obtainer = Object.create(versionObtainer);
				self.obtainer.init( function( version, vehicle ) {
					
					//Handle Result
					self.handleVersion( elem, version, checkFowarding );
					self.handleVehicle( vehicle );
					
					//Delete Obtainer
					self.obtainer.destroy();
					delete self.obtainer;
					
				});
			}
			
			
			
		},
	
		/*
		 * Object: versionObtainer
		 * 
		 * Version Obtainer. Takes it to the next level, launching the overlay and 
		 * Rendering the FORM of IOP data. 
		 */
		versionObtainer = {
		
			/*
			 * Object Startup. Launches the overlay
			 */
			init: function( success ) {
		
				var self = this,
					syncData = $("#sync-data").embeddedData();
				
				if( syncData['xhr-sync-overlay'] ) {
					
					//Launch overlay
					$.publish('overlay.launch', {
						
						url: syncData['xhr-sync-overlay'],
						positionType:'window',
						name: "Sync Select Vehicle",
						type: 'overlay-sync',
						success: function() {
							self.form = $("#selectVehicle");
							if( self.form.size() ) {
								self.getData( syncData );
							} else {
								self.error();
							}
						}
					});					
					
				}
				
				self.success = success;
		
			},
			
			/*
			 * Destroy
			 */
			destroy: function() {
				this.interior.undelegate('INPUT', 'change'); 
			},
			
			/*
			 * Submit event button
			 */
			bindSubmit: function() {
				
				
				var self = this;
				self.submit.click(function( e ) {

					e.preventDefault();
					
					//Broadcast change on click.
					$.publish("sync.versionchange", {
						version: self.targetVersion
						
					});
					
					//Hide overlay.
					$.publish("overlay.hide");
					
					
					if( self.success ) {
						self.success( self.targetVersion, self.vehicleGuid );
					}
					
				});
			},
			
			/*
			 * Store cache ref to all the required elements
			 */
			cacheElements: function() {
				var self = this,
					form = self.form;
				
				//The Form Elements
				self.series = form.find('#sync-model');
				self.year = form.find('#sync-vehicle-year');
				self.interior = form.find('#sync-interior');
				
				//The Form Element Rows
				self.seriesRow = self.series.closest('.row');
				self.yearRow = self.year.closest('.row');
				self.interiorRow = self.interior.closest('.row');
				
				//All rows
				self.rows = $(self.seriesRow).add(self.yearRow).add(self.interiorRow).hide(0);
				
				//Submit
				self.buttons = form.find(".buttons").hide(0);
				self.submit = self.buttons.find(".vehicle-select");
				
			},
			
			/*
			 * Shows the button
			 */
			enableSubmit: function( sync ) {
				this.targetVersion = sync.dragonflySyncId;
				this.vehicleGuid = sync.guid;
				this.buttons.show(0);
			},
			
			/*
			 * Hides the button
			 */
			disableSubmit: function( version) {
				delete this.targetVersion;
				delete this.vehicleGuid;
				this.buttons.hide(0);
			},

			/*
			 * Get the data required for finding the SYNC version
			 */
			getData: function( syncData ) {
				
				var self = this;
				
				$.ajax({
					type: "get",
					dataType: "json",
					async: true,
					cache: false,
					url: syncData['xhr-sync-overlay-data'],
					success:function(data){
						self.cacheElements();
						self.bindFields();
						if (data && data.list && data.list.length > 0) {
							self.processMakesRenderSeries( data.list );
						} else {
							self.error();
						}
					},
					error:function (request, error) {
						self.error();
					}
				});
				
			},
			
			/*
			 * Clear field values
			 */
			resetValues: function( arr ) {
				var self = this;
				
				self.disableSubmit();
				
				$.each( arr, function( index, value ) {
					self[value].find('.syncinj').remove();
					self[value+'Row'].hide(0);
				});
			},
			
			/*
			 * Bind Events, once I might add.
			 */
			bindFields: function() {
				var self = this;
				
				self.series.change(function() {
					self.processSeriesRenderYears( );
				});

				self.year.change(function() {
					self.processYearRenderInterior();
				});

				self.interior.delegate('INPUT', 'change' ,function() {
					self.processInterior();
				});
				
				self.bindSubmit();				
			},
			
			/*
			 * Make Children Values = Series
			 */
			processMakesRenderSeries: function( makes ) {
				
				var self = this;
				
				if( !makes && !makes.length ) { 
					return self.error();
				}
				
				self.makes = makes;
				
				$.each( makes, function(i, make){
				
					var many = make.vehicleModels.length >= 1;
					if( many ) {
	
						self.series.find('.syncinj').remove();
						
						$.each( make.vehicleModels, function(index, vehicleModel){
							
							var seriesDom = $( simpleTemplate('series', {
												index: index,
												makename: make.name,
												modelname: vehicleModel.name
											}));
							
							
							
							seriesDom.data('vehicleModel', vehicleModel);

							self.series.append(seriesDom)
							
						});
						
						self.seriesRow.show(0);
						if (make.vehicleModels.length == 1){
							self.series.find('option').get(1).selected=true;
						}
						self.series.trigger('change');
					
					} else {
						//Skip years and interiors
						self.enableSubmit( make.vehicleModels[0].availableSyncYears[0].syncConnectionSystems[0] );
						
					}
					
				});				
				
			},
			
			/*
			 * Series Children Values === Years
			 */
			processSeriesRenderYears: function() {
				
				var self = this,
					seriesOption = self.series.find(":selected"),
					vehicleModel = seriesOption ? seriesOption.data('vehicleModel') : 0,
					many;
					
				self.resetValues( ['year', 'interior'] );

				if( !vehicleModel ) { return; }
				
				many = vehicleModel.availableSyncYears.length >= 1;

				if( many ) {
					$.each( vehicleModel.availableSyncYears, function(index, year) {
						
						var yearOptionElement = $( simpleTemplate('year', {
													index:index,
													year:year.year
												}));
						
						yearOptionElement.data('year', year);

						self.year.append(yearOptionElement)
						
					});
					
					self.yearRow.show(0);
					if (vehicleModel.availableSyncYears.length == 1){
						self.year.find('option').get(1).selected=true;
					}
					self.year.trigger('change');
				
				} else {
					//Skip interiors
					self.enableSubmit( series.availableSyncYears[0].syncConnectionSystems[0] );
				}
				
				
			},
			
			/*
			 * Year Children Values === Sync Interiors
			 */
			processYearRenderInterior: function() {
				
				var self = this,
					yearOption = self.year.find(":selected"),
					year = yearOption ? yearOption.data('year') : 0,
					many;
					
				self.resetValues( ['interior'] );

				if( !year ) { return; }
				
				many = year.syncConnectionSystems.length >= 1;
				
				if( many ) {
					
					$.each( year.syncConnectionSystems, function(index, sync) {
						
						var syncOptionElement =  $( simpleTemplate('interior', {
														index:index,
														description: sync.syncDescription,
														image:sync.image
													})); 
							
						syncOptionElement.find('INPUT').eq(0).data('sync', sync);

						self.interior.append(syncOptionElement)
						
					});
					
					self.interiorRow.show(0);
					if (year.syncConnectionSystems.length == 1){
						self.interior.find('input').get(0).checked=true;
						self.enableSubmit( year.syncConnectionSystems[0] );
					}
					self.interior.trigger('change');
				
				} else {
					
					self.enableSubmit( year.syncConnectionSystems[0] );

				}
	
				
			},
			
			/*
			 * Interior Values
			 */
			processInterior: function( ) {
				
				var self = this,
					syncOption = self.interior.find("INPUT:checked"),
					sync = syncOption ? syncOption.data('sync') : 0;
					
				if( !sync ) { return; }
				
				self.enableSubmit( sync );
				
			},
			
			/*
			 * Overlay Error
			 */
			error: function() {
				this.form.find('.error').show(0);
			}
			
		};
	
	/*
	 * Expose function that creates new syncVersionManager
	 * - ND.syncVersionManager 
	 */
	return function( arg ) {
		var manager = Object.create( syncVersionManager );
		manager.init.call( manager, arg );
		return manager;
	};
	
}(jQuery));