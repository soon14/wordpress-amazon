/*
 * hotdeals.js
 * Author: Glenn Baker
 */

/*globals window, document, jQuery, ND, SiteConf */
ND.hotDeals = (function($, undefined){
	
	var /* Generic Error string */
		genericError = "Oops! There was an internal problem",
		
		/* 
		 * Error codes for the JSON service
		 */
		errorCodes = {
			MISSING_POSTCODE: "MISSING_POSTCODE",
			INVALID_POSTCODE: "INVALID_POSTCODE",
			INCORRECT_POSTCODE: "INCORRECT_POSTCODE",
			SUCCESS: "SUCCESS"
		},
		
		/*
		 * Object: hotDeals
		 * 
		 * The Hot Deals manager, takes care of links and cookie considerations
		 */
		hotDeals = {

			/*
			 * Constructor of sorts
			 */
			init: function( options ) {
				// console.log('hotdeal.init()');
				options || ( options = {} );
			
				var self = this;
				self.enabledRedirect = true;
				
				//Required links for page
				self.elementsSelector = options.links || '.overlay-hotdeals, .force-overlay-hotdeals';
				self.elementPanelSelector = options.panel || '#hotdeals-panel';
				
				self.bindLinks();
				self.initPubsub();				
				self.render();
			},
			
			/*
			 * Listen to the PUBSUB channel for Shopping Prefenences
			 */
			initPubsub: function() {
				var self = this;
				
				this.pubsub = {
					change:function( event, data ) {
						data = data || {};
						self.postcode = data.postcode;
						self.region = data.region;
					}
				};
				
				// Get the current postcode right now.
				$.publish( "shopping.pref.retrieve", this.pubsub.change );

				// Register for the changes in the future
				$.subscribe( "shopping.pref.change", this.pubsub.change );
				
				$.subscribe( "shopping.pref.destroy", this.destroy );
			},
			
			/*
			 * Renders the tmpl
			 */
			render: function() {
				var hdPanel = needPostcodeTemplate( this.elementPanelSelector );
				if( hdPanel != null ) {
					this._template = Object.create( postcodeTemplate );
					this._template.conf = self.conf;
					this._template.init( hdPanel , this.getPostcode(), this.getRegion() );					
				}
				return this._template;
			},
			
			/*
			 * Function for getting the postcode
			 */
			getPostcode: function() {
				return this.postcode;
			},
			
			/*
			 * Function for getting the region
			 */
			getRegion: function() {
				return this.region;
			},
			
			/*
			 * Function for getting the Obtainer
			 */
			getObtainer: function() {
				return this._obtainer;
			},			
			
			/*
			 * Binds the overlay links
			 */
			bindLinks: function() {
				var self = this;
				
				$(document).on( "click", self.elementsSelector, function(e) {
					
					var region, postcode, 
						ignoreCookie = $(this).hasClass('force-overlay-hotdeals');

					//Possibly ignore the cookie.
					if( ignoreCookie ) {

						e.preventDefault();
						self.obtainRegion( this );
					
					//	Otherwise
					} else {
					
						e.preventDefault();
	
						region = self.getRegion();
						postcode = self.getPostcode();
	
						if( region || postcode ) {
							self.handleRegion( this, region, postcode );
						} else {
							self.obtainRegion( this );
						}
					}
				});
			},
			
			/*
			 * There is region in cookie, 
			 * But we still need to go and get the destination URL
			 */
			handleRegion: function( elem, region, postcode ) {
				var self = this,
					//"el.href" will return different result when href="", IE return location.host, FF return location.href;
					regionURL = this.ajaxRegionURL($(elem).attr("href") || location.href, region, postcode );

				$.when( regionURL )
					.done( function( data ) {
						
						/*
						 * Success
						 * { "region": "Region1", "regionName": "Melbourne", "regionId": "1248851195750", "url": "http://master2.ndprod.corp.nextdigital.com/en/hot-deals/victoria?sitetype=web&site=Master2", "cid": "1248851260705" } 
						 * Error
						 * { "errorCode": "INVALID_POSTCODE", "error": "There is no region for your postcode" }
						 */

						if( data ) {
						
							//Default value is success if there was no error.
							data.errorCode || ( data.errorCode = errorCodes.SUCCESS);

							if( data.errorCode === errorCodes.SUCCESS && data.region && data.url ) {
						
								// UC-01 7.1.5.	MAP POSTCODE TO REGION: Dragonfly maps the postcode value to obtain the corresponding region. The JavaScript-enabled browser will cache the postcode and set in cookie.
								
								// Confirmed Postcode and region gets set in cookie
								$.publish( "shopping.pref.save", {
									postcode: postcode,
									region: data.region,
									regionLabel: data.regionName
								});
							
								// Send user to region page
								self.doneRedirect( data.url || elem.href );
							
							} else if( data.errorCode === errorCodes.INVALID_POSTCODE )  {
								
								// UC-01 - 8.4 2. DISPLAY ERROR MESSAGE: Dragonfly displays error message advising end user that postcode chosen does not exist. End user stays on the current page being loaded.
								if (typeof self._template === 'undefined') { 
									//On home page, there is no template, hence if an invalid postcode is entered the code will break as
									//tries to find an element to display an error message on the page.
									//as a remedy, just redirect the user to national page and let them see the error message there.
									self.doneNational( elem );
								} else {
									self.doneCasualError(data.error );	
								}
								// Invalid postcode, let's remove it.
								$.publish( "shopping.pref.save", {
									postcode: undefined,
									region: undefined,
									regionLabel: undefined
								});
							
							} else {
								
								self.doneObtainerError( data.error || genericError );
							}

						} else {
							
							// Serious issue
							self.doneObtainerError( genericError );

						}
					
					})
					.fail( function() {
						self._obtainer.loadingStatus( false );					
						self.doneNational( elem );
					});
				
				//Return the promise
				return regionURL;
			},

			/* 
			 * Function to create the Region URL XHR object.
			 */
			ajaxRegionURL: function( destination, region, postcode ) {
				this.conf || ( this.conf = $("#hotdeals-data").embeddedData() );
				
				var params = {
					url: destination
				};
				
				if( postcode ) {
					params.postcode = postcode;
				}

				if( region ) {
					params.region = region;
				}
				
				var promise = $.ajax({
					url: this.conf['xhr-hotdeals-data'],
					dataType: 'json',
					cache: true,
					data: params
				});
								
				return promise;
			},
			
			/*
			 * Do what the link would normally do, but we already prevented the default behaviour.
			 */
			doneRedirect: function( href ) {
				//console.log('doneRedirect');
				if( window.location.href.indexOf( href ) < 0 ) {
					$.publish('hotdeals.redirect', {url: href});
					if( this.enabledRedirect ) {
						window.location.href = href;
					}
				} else {
					this.doneNoRedirect();
				}
			},	
			
			/*
			 *	There was a problem so error message.
			 */
			doneObtainerError: function( msg ) {
				$.publish('hotdeals.noredirect');
				if( this._obtainer ) {
					this._obtainer.loadingStatus( false );
					this._obtainer.formError( msg );
				}
			},
			
			doneNational: function(elem) {
				window.location.href =  $(elem).attr('href');
			},

			/*
			 *	There was a problem so error message.
			 */
			doneCasualError: function( msg ) {
				this.doneNoRedirect();
				this._template.setError( msg );
			},

			
			/*
			 * Function to cleanup if we are not redirecting
			 */
			doneNoRedirect: function() {
				//console.log('doneNoRedirect');
				$.publish('hotdeals.noredirect');
				if( this._obtainer ) {
					this._obtainer.destroy();
					delete this._obtainer;
				}
			},

			/*
			 * There was no region in cookie, 
			 * So let's ask the user to select from overlay
			 */
			obtainRegion: function( elem ) {
				
				var obtainer, self = this;
				
				/*
				if( self._obtainer ) {
					self._obtainer.destroy();					
				}
				*/

				obtainer = Object.create(regionObtainer);
				obtainer.conf = self.conf;
				obtainer.init( { 
					
					/*
					 * Successful form submit. That is all.
					 * Please note the overlay must still be open.
					 */
					formSubmit: function( postcode ) {
						
						//Handle the Result of the Overlay Form
						self.handleRegion( elem, false, postcode );
														
					},
					
					/*
					 * Overlay was cancelled
					 * 
					 */
					cancel: function() {
						if( $(elem).hasClass('force-overlay-hotdeals') ) {
							self.doneNoRedirect();
						} else {
							//UC-01 8.5.2: DISPLAY NATIONAL PAGE
							self.doneRedirect( elem.href );
						}
					}
					
				});				
				self._obtainer = obtainer;
			},
		
			/*
			 * Cleanup method
			 */
			destroy: function() {
				//console.log('ND.hotDeal.destroy');
				if( this._obtainer ) {
					this._obtainer.destroy();
					delete this._obtainer;
				}
				if( this._template ) {
					this._template.destroy();
					delete this._template;
				}
				
				$(document).off("click", this.elementsSelector);
				for( channel in this.pubsub ) {
					$.unsubscribe( "shopping.pref." + channel, this.pubsub[channel] );
				}
				this.pubsub = this.conf = this._template = this._obtainer = null;
			}
			
		},
		
		
		/*
		 * Object: regionObtainer
		 * 
		 * Region Obtainer. Takes it to the next level, launching the overlay and 
		 * Rendering the form
		 */
		regionObtainer = {

			/*
			 * Constructor of sorts
			 */
			init: function( options ) {
				var self = this;
				
				this._guid = +new Date();
				
				this.options = options;
				this.formSelector = options.formSelector || '#hotDeals-form';
				this.conf || ( this.conf = $("#hotdeals-data").embeddedData() );
				
				if( this.conf['xhr-hotdeals-form'] ) {
					
					//Launch overlay
					$.publish('overlay.launch', {
						url: this.conf['xhr-hotdeals-form'],
						positionType: 'window',
						name: "Hot Deals Select Region",
						//type: 'overlay-hotdeals',
						success: function() {
							self._form = $(self.formSelector);
							if( self._form.size() ) {
								self.ready();
							} else {
								self.error();
							}
						}
					});					
				}
			},
			
			/*
			 * Ready to take postcode orders!
			 * I.e the Overlay is readu
			 */
			ready: function() {
				this.bindError();
				this.bindSubmit();
				this.bindAdditionalListeners.call(this);
				this.bindCancel();
				this.loadingStatus( false );
				this.setFocus();
				$.publish('hotdeals.obtainerReady');
			},
			
			/*
			 * Obtainer to go away quietly.
			 */
			done: function() {
				// Check if the overlay is still open based on the form exist.
				if( $( this.formSelector ).length ) {
					$.publish('overlay.hide');
				}
			},
			
			setFocus: function() {
				this._form.find('input[type="text"]').first().select();
			},
			
			/*
			 *	Bind to the overlay hotdeals form submit
			 */
			bindSubmit: function() {
				var self = this;
				//console.log('hotdeals.bindSubmit()');
				
				
				$(document).off('submit', '#hotDeals-form').on('submit', '#hotDeals-form', function( e ) {
					
					e.preventDefault();					
					//console.log('hotdeal->submit');
					var form = self._form;
					
				 	//grab local 
					var $postcodeField = form.find('[name=postcode]');
					var postcode = $postcodeField.val();
					
					//Validate Form
					if( $.trim( postcode ).length === 4 && !isNaN(postcode) ) {
						//prevent multi submission
						
						self.loadingStatus( true );
						self.formSuccess( postcode );
						//clear the fields for next round
						$postcodeField.val('');
					} else {
						self.formError();
					}
					return false;
				});
				
				
				$(document).on('keydown', '#hotDeals-form #postcode', function( e ) {
					
					self._errorMsg.slideUp('fast');
				});
				
			},
			
			bindAdditionalListeners: ND.platformDependentHotDeal.regionObtainer.bindAdditionalListeners,
			
			/*
			 *	Bind to the cancel of the overlay
			 */			
			bindCancel: function() {
				this.loadingStatus( false );		
				if( this.options.cancel ) {
					$.subscribeOnce('overlay.usercancel', this.options.cancel );
				}
			},
			
			/*
			 * Bind for error
			 */
			bindError: function() {
				
				var self = this;
				self.loadingStatus( false );		
				this._errorMsg =  this._form.find('.error');
				this.standardError =  this._form.find('#standard-error').text();

				$(document).on('keydown', '#hotDeals-form #postcode', function( e ) {
					self._errorMsg.slideUp('fast');
				});
			},
			
			/*
			 * Function helper for the loading status
			 */
			loadingStatus: ND.platformDependentHotDeal.regionObtainer.loadingStatus,
			
			/*
			 * Form success
			 * - Overlay does not get closed.
			 */
			formSuccess: function( postcode ) {
				this.loadingStatus( false );		
				this.options.formSubmit.call( null, postcode );
			},
			
			/*
			 * Form error
			 */
			formError: function( msg ) {
				this.loadingStatus( false );		
				this._errorMsg
					.text( msg || this.standardError )
					.slideDown('fast');
			},
			
			/*
			 * An error
			 */
			error: function() {
				//console.log("Error: regionObtainer");
			},
			
			/*
			 * Cleanup method
			 */
			destroy: function() {
				this.done();
				$(document)
					.off('submit', '#hotDeals-form')
					.off('click', '#hotDeals-form .hotDeals-form-currentLocation')
					.off('keydown', '#hotDeals-form #postcode');				
				$.unsubscribe('overlay.usercancel', this.options.cancel );
				this._form = this.conf = null;
			}
		},
		
		
		/*
		 * Helper function to see if the postcodeTemplate object is neccessary
		 */
		needPostcodeTemplate = ND.platformDependentHotDeal.hotDeal.needPostcodeTemplate,		
		
		/*
		 * Object: postcodeTemplate
		 * 
		 * The HTML view for the postcode
		 */
		//TODO..   $.extends( Object.create( hotDealsAbstract ), {
		postcodeTemplate = {
			
			/*
			 * Constructor of sorts
			 */
			init: function( panel, postcode, region) {
				this._panel = panel;
				this._postcode = postcode;
				this._region = region;				
				
				this.conf || ( this.conf = $("#hotdeals-data").embeddedData() );
				
				//Compile main template
				this.tmpl = $('#tmpl-hotdeals-links').template();
				
				this.updatePostCode();
				
				this.subscribing();
				
				this.controller();
			},
			
			/*
			 * Listen to the PUBSUB channel for Shopping Prefenences
			 */
			subscribing: function() {
				var self = this;
				
				this.pubsub = {
					change:function( event, data ) {
						data = data || {};
						self._postcode = data.postcode;
						self._region = data.region;
						self.controller();
					}
				};

				// Register for the changes in the future
				$.subscribe( "shopping.pref.change", this.pubsub.change );
			},
			
			/*
			* Update postcode in the contents
			*/
			updatePostCode: function() {
				if(this._postcode){
					$(".user-selected-postcode").text(" " + this._postcode);
				}else{
					$(".user-selected-postcode-msg").hide();
				}
			},
			
			/*
			 * Control the render;
			 */
			controller: function() {
				
				this.view( 
					this.model( 
						this.useError()
					) 
				);
				
			},	
			
			/*
			 * The data for the tmpl
			 */
			model: function( error ) {
				var model =  {};
				
				// Current postcode
				model.postcode = this._postcode;
				
				// Is page region is different to the region in cookie
				model.wrongPostcode = ( this._postcode && this.getPageRegion() && this._region !== this.getPageRegion() );
				
				// The error (is a string or false)
				model.error = error;
				
				return model;
			},
			
			/*
			 * Render the view
			 */
			view: ND.platformDependentHotDeal.regionObtainer.view,
			
			/*
			 * Returns the region for the current page
			 */
			getPageRegion: function() {
				return this.conf["page-region"];
			},
			
			/*
			 *  Set's the error for templating
			 */
			setError: function( error ) {
				this._error = error;
			},
			
			/*
			 * Use the error once
			 */
			useError: function() {
				var err = $.type( this._error ) === 'string' ? this._error : false;
					
				//reset the error once used
				delete this._error; 

				return err;
			},
			
			/*
			 * Cleanup method
			 */
			destroy: function() {
				$.unsubscribe( "shopping.pref.change", this.pubsub.change );
			}			
		};
		 
	/*
	 * Expose function that creates new hotDeals
	 * - ND.hotDeals 
	 */
	return function( arg ) {
		var manager = Object.create( hotDeals );
		manager.init.call( manager, arg );
		return manager;
	};
	
}(jQuery));