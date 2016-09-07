(function(){
	var ND = window.ND = window.ND || {};
			
	var fps = ND.fps = {
					
		_init: function( _fpstag ) {
			this._fpstag = _fpstag;			

		},
		
		// store links
		pageClicks : {},
		
		
		/*
		 * Track Page Views. 
		 */			
		trackPageView: function( params ) {			
			// if function is to be implemented, it will be the same as trackLink, so
			// console.log('Tracking FPS trackPageView');
			fps.trackFps(params);
		},
		
		trackLink: function( params ) {
			// console.log('Tracking FPS trackLink');
			//TODO
			//function executed when a trackable link is clicked
			// this function should track information to FPS The code should
			// call trackFps function (as links and pages are to be tracked in
			// the same way). What might differ might be a parameter format
			fps.trackFps(params);
		},
		
		

		trackFps:  function(params) {	
			// console.log('Tracking FPS');
			var kbaEvents = '';
			var setViewedVehicle = {};
			var setDelear = {};
			var setKBA = {};
			var setTool = {};
			var setAnonymous = {};
			var setOwner = {};
			var setKBARTDC = {};
			var setKBABRQC = {};
			var setKBABAPC = {};
			var setKBARAQC = {};
						
						
			var derivativeName = '';
			var derivativeID = '';
			var nameplateBrand = '';
			var nameplateYear = '';
			var nameplateName = '';
			var nameplateID = '';
			
			var bolSetFPS = false;
			
			
			// console.log('params = ' + params );
			if(typeof params !== 'undefined') {
				// console.log('params.nameplate = ' + params.nameplate );
			}
			
			if (typeof params !== 'undefined' && typeof params.nameplate !== 'undefined' ) {//'params contains nameplate information or other information relevant for FPS') {
	
				if(typeof _da !== 'undefined' && typeof _da.nameplate !== 'undefined') {
					
					
					if(params.nameplate == _da.nameplate.name) {												
						
						if(typeof _da.om.site !== 'undefined' ) {
							nameplateBrand =  _da.om.site;
						}
						
						if(typeof _da.nameplate !== 'undefined') {
							
							if(typeof _da.nameplate.name !== 'undefined') {
								nameplateName = _da.nameplate.name;
							}
							
							if(typeof _da.nameplate.id !== 'undefined') {
								nameplateID = _da.nameplate.id;
							}
							
							if(typeof _da.nameplate.year !== 'undefined' ) {
								nameplateYear =  _da.nameplate.year;
							}

						}
						
						if(typeof _da.der !== 'undefined') {
							
							if(typeof _da.der.name !== 'undefined') {
								derivativeName = _da.der.name;
							}
							
							if(typeof _da.der.id !== 'undefined') {
								derivativeID = _da.der.id;
							}

						}
						
											
						if(nameplateName != '') {
							   // console.log('FPS Set ViewedVehicle via Params');
							   setViewedVehicle = { 'ViewedVehicle': { _year: nameplateYear, _brand: nameplateBrand , _nameplate: nameplateID + ':' + nameplateName, _trim: derivativeID + ':' + derivativeName, _interior: '' , _exterior: '' }, metadata: { active: 'true' } }
							   bolSetFPS = true;
						}
					
					}
				}
	
			} else {
					
				if(typeof _da !== 'undefined') {
													
					if(typeof _da.om.site !== 'undefined' ) {
						nameplateBrand =  _da.om.site;
					}
					
					if(typeof _da.nameplate !== 'undefined') {
						
						if(typeof _da.nameplate.name !== 'undefined') {
							nameplateName = _da.nameplate.name;
						}
						
						if(typeof _da.nameplate.id !== 'undefined') {
							nameplateID = _da.nameplate.id;
						}
						
						if(typeof _da.nameplate.year !== 'undefined' ) {
							nameplateYear =  _da.nameplate.year;
						}

					}
					
					if(typeof _da.der !== 'undefined') {
						
						if(typeof _da.der.name !== 'undefined') {
							derivativeName = _da.der.name;
						}
						
						if(typeof _da.der.id !== 'undefined') {
							derivativeID = _da.der.id;
						}

					}
					
					// console.log('Nameplate = ' + nameplateName );
										
					if(nameplateName != '') {
						   // console.log('FPS Set ViewedVehicle via _da');
						   setViewedVehicle = { 'ViewedVehicle': { _year: nameplateYear, _brand: nameplateBrand , _nameplate: nameplateID + ':' + nameplateName, _trim: derivativeID + ':' + derivativeName, _interior: '' , _exterior: '' }, metadata: { active: 'true'} }
						   bolSetFPS = true;
					}

				}
			}

		
		
			if (typeof _da.events !== 'undefined') {				
				var currentEvent;
							
				
				if(typeof guxPersonalisation !== 'undefined' ) {
					
					if(typeof guxPersonalisation.psn.profile.kba !== 'undefined') {
						kbaEvents = guxPersonalisation.psn.profile.kba;
					}
				}

				
				for (var i = 0; i < _da.events.length; i++) {
				
					currentEvent = _da.events[i];
					
					if(currentEvent == 'event2') {
						
						if(kbaEvents.search('BAPC') == -1) {
						     // console.log('FPS Set KBAEvent BAPC');
							setKBABAPC = {'KBAEvent': {_KBA: 'BAPC'}, metadata: { active: 'true' } };
							bolSetFPS = true;
						}
					}

					if(currentEvent == 'event3') {
						
						if(kbaEvents.search('RAQC') == -1) {
						     // console.log('FPS Set KBAEvent RAQC');
							setKBARAQC = {'KBAEvent': {_KBA: 'RAQC'}, metadata: { active: 'true' } };
							bolSetFPS = true;
						}
					}
					
					if(currentEvent == 'event15') {
						if(kbaEvents.search('BRQC') == -1) {
							// console.log('FPS Set KBAEvent BRQC');
							setKBABRQC = {'KBAEvent': {_KBA: 'BRQC'}, metadata: { active: 'true' } };
							bolSetFPS = true;
						}
					}

					if(currentEvent == 'event20') {
						if(kbaEvents.search('RTDC') == -1) {
							// console.log('FPS Set KBAEvent RTDC');
							setKBARTDC = {'KBAEvent': {_KBA: 'RTDC'}, metadata: { active: 'true' } };
							bolSetFPS = true;
						}
					}					
					
				}
				

			}			

			
			if(typeof guxPersonalisation !== 'undefined' ) {
				
				
				if(typeof guxPersonalisation.psn.profile.authid !== 'undefined') {
					
					setOwner = {'ExternalRef': {_type: 'DFL', _id: guxPersonalisation.psn.profile.authid}, metadata: { active: 'true' } };
					bolSetFPS = true;
				}
				
				if(typeof guxPersonalisation.psn.profile.id !== 'undefined') {

					setAnonymous = {'ExternalRef': {_type: 'DFLA', _id: guxPersonalisation.psn.profile.id}, metadata: { active: 'true' } };
					bolSetFPS = true;
				}
				
				
			}			
			
			if(typeof FPS !== 'undefined') {
				
				if(bolSetFPS) {
					// Set all at once to minimized network connection
					FPS.set([ setViewedVehicle, setKBABAPC, setKBABRQC, setKBARTDC, setKBARAQC, setOwner, setAnonymous  ]);
				}

			
			}

		},
		
		trackEvent: function( params ) {
			// console.log('FPS Tracking Event');
			//TODO track favouriting dealer here and other 
			if (params.type == 'fav-dealer') {
				if(typeof FPS !== 'undefined') {
					FPS.set([ { 'PreferredDealer': { _paCode: params.code }, metadata: { active: 'true' } }]);
				}
			} else if (params.type == 'specified postcode') {
				//FPS.set( ... );
			} //else if {
				//TODO add all types here
			//}
		},
		trackSocial: function( params ) {
			// empty not needed at the current state, left here for
			// compatibility and future extensions reasons
		},			
		trackField: function( params ) {
			// empty not needed at the current state, left here for
			// compatibility and future extensions reasons
		},
		preCollection: function( options, params) {
			//this functional is called before tracking call is made.
			//TODO place here any code which has to happen before page track is made. like reading cookies or DOM metadata

		}

	};

})();