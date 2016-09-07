
/*
		<!-- Configuration, must come from site wide configuration -->
		<script type="text/javascript">
		var _da = {}, _tag = _da.wt = {};
		// Web Trends ID, same ID for whole publication.
		_tag.dcsid="dcs3e9phnudz5bdfu8tzlamfrh_8n7o";
		// The hostname of the website.. Notice the DOT..  -> ".ford.com.au"
		_tag.fpcdom=".hostnamegoeshere.com";
		// The Time Zone
		_tag.timezone=10;
		</script>
*/

 (function(globals, $){

  /**
   * Private functions
   */
	var _isAnalyticsConfigured = function() {
		// Minimum variables required
		if( !globals._da ||
			!globals.ND ||
			!globals.ND.analytics ) {
			return false;
		}
		return true;
	};
	
	var _isWebTrendsConfigured = function() {
		if( globals._tag && 
				globals._da.wt && 
				globals._tag === globals._da.wt &&
				globals.WebTrends ) {
			return true;
		}
		return false;
	};
	
	/**
	 * Do not track single page applications(such as build and price)/mobile applications.The flag is set 
	 * in the view of the single page application.
	 */
	var _isNonSpecialWebAppOmnitureConfigured = function() {
		if(globals._da.om && 
		  (typeof globals._da.om.singlePageApp === 'undefined' || 
		   globals._da.om.singlePageApp === false) &&
		   (globals._da.om.mobileApp === undefined ||
		   globals._da.om.mobileApp === false)) {
			return true;
		}
		return false;
	};
	
	/**
	 * Tracks single page applications only as they need to set omniture variables manually (such as build and price).
	 * The flag is set in the view of the single page application.
	 */
	var _isSinglePageAppOmnitureConfigured = function() {
		if(!_isAnalyticsConfigured()) {
			return false;
		}
		if(globals._da.om && 
		   globals._da.om.singlePageApp === true) {
			return true;
		}
		return false;
	};
	
	/**
	 * Tracks mobile applications using jquery mobile.
	 * The flag is set in the view of the mobile application.
	 */
	var _isMobileAppOmnitureConfigured = function() {
		if(!_isAnalyticsConfigured()) {
			return false;
		}
		if(globals._da.om && 
		   globals._da.om.mobileApp === true) {
			return true;
		}
		return false;
	};
	
	

	//
	// TODO added new trackFps function here, something along these lines:
	//
	
	//var _trackFps = function(_tag, options, wtTracker, params) {
	var _trackFps = function(params) {
		

		//TODO not sure about this if - but likely we also need it here 
		if (_da.skipTracking == undefined || globals._da.skipTracking === false) {
			
			//Create Dragonfly FPS Tracking implementation
			var fpsTracker = ND.analytics.create( 'fps', s );
			
			//Register the DFY tracker implementation for custom activities
			ND.analytics.register( fpsTracker );
			
			//TODO Not sure what parameters are needed in these 2 calls ...
			
			//Give dragonfly a chance to inject meta tags dynamically
			fpsTracker.preCollection(_da, params);
			
			//Execute the normal default page load tracking function.
			//fpsTracker.trackPageView( _da, params);
			fpsTracker.trackPageView( params);
		}		
	};
	
	
	
	var _trackWebTrends = function(_tag, options, wtTracker) {
		//Initalise
		_tag = new WebTrends();

		//Extend.. Similiar as $.extend
		$.extend( _tag, options );
		
		//Further Initalise
		_tag.dcsGetId();
		
		//Create Dragonfly Tracking implementation
		wtTracker = ND.analytics.create( 'webtrends', _tag );
		
		//Register the DFY tracker implementation for custom activities
		ND.analytics.register( wtTracker );
		
		//Copy object
		var choice = $.extend( {}, _da );
		delete choice.wt;
	
		//Give dragonfly a chance to inject meta tags dynamically
		wtTracker.preCollection( choice );
		
		//Execute the normal default page load tracking function.			
		_tag.dcsCollect();
		
		//Expose the parameter
		ND.analytics._tag = _tag;
	};
	
	var _trackOmniture = function(params) {
		
		if (_da.skipTracking == undefined || globals._da.skipTracking === false) {
			//Create Dragonfly Tracking implementation
			var omTracker = ND.analytics.create( 'omniture', s );
			
			//Register the DFY tracker implementation for custom activities
			ND.analytics.register( omTracker );
			
			var _counterField = $('.searchresults-list .no-of-results');// for lincoln result page only. need send out the total No of results
			if(_counterField.length>0){
				_da.pname = _da.pname +':' + $.trim(_counterField.html());
			}
			//Give dragonfly a chance to inject meta tags dynamically
			//module page will need profile is ready
			if (typeof _da.module!=='undefined' && typeof _da.module.page!=='undefined' && typeof _da.module.template=='undefined'){
				var cookieUser = null,cookieUUID = null,moduleTemplate=null;
				if($.cookie('dfy.u')) {
					cookieUser = $.parseJSON($.cookie('dfy.u'));
				}
				if($.cookie('dfy.uuid')) {
					cookieUUID = $.parseJSON($.cookie('dfy.uuid'));
				}
				// set values depending on cookie
				if (cookieUser !== null) {
					moduleTemplate = "owner";					
				} else if (cookieUUID === null) {
					moduleTemplate = "new";
				} else if (cookieUUID != null && cookieUser === null) {
					moduleTemplate = "return";
				}				
				if (moduleTemplate!=null){
					_da.module.template = moduleTemplate;
					$("section.personalisation a[href*='intcmp='],section.smartnextsteps a[href*='intcmp='],section.personalisation form[action*='intcmp=']").each(function(idx){
						var attrName="",attrValue="";
						var attrHref = $(this).attr("href");
						var attrAction = $(this).attr("action");
						if(attrHref!= null && typeof attrHref!=='undefined'){
							attrName = "href";
							attrValue = attrHref;
						}else if(attrAction!= null && typeof attrAction!=='undefined'){
							attrName = "action";
							attrValue = attrAction;
						}
						var temp = "STATUS";
						if(attrValue.indexOf(temp)!=-1){	
							$(this).attr(attrName,attrValue.replace(temp,moduleTemplate));
						}	
					});
				}
				omTracker.preCollection( _da, params);
				//Execute the normal default page load tracking function.
				s.t();	
			}else{
				omTracker.preCollection( _da, params);
				//Execute the normal default page load tracking function.
				s.t();
			}
			
		}
	};
	 
	
	var _track = function() {
		// Minimum variables required
		if(!_isAnalyticsConfigured()) {
			return;
		}
	
	
		/* WEBTRENDS ONLY
	     * This if block represnets the integration of Webtrends only
		 */
		if(_isWebTrendsConfigured()) {
				
				//Create the real Tag
			var _tag,
				//The _tag configuration
				options = globals._tag,
				//Other
				wtTracker;
			
			//When the DOM is ready.
			$(document).ready(function() {
				_trackWebTrends(_tag, options, wtTracker);
				ND.analyticsBinder.bind();
			});
	
			
			//Export the _tag into the global space so that it looks like a normal webtrends tag in the DOM inspector
			globals._tag = globals._da.wt = _tag;
			
		}
	
		/* 
		 * The following is an example of how another implementation might work
		 * Google Analytics
		 * /
		if( globals._gaq && 
			globals._da.ga && 
			globals._gaq === globals._da.ga ) {
				
			//Create Dragonfly Tracking implementation
			var gaTracker = ND.analytics.create( 'google', _gaq );
			
			//Register the DFY tracker implementation for custom activities
			ND.analytics.register( gaTracker );
	
			// When the DOM is ready and analytics is ready.
			$(document).ready(function() {
				//Give dragonfly a chance to inject meta tags dynamically
				gaTracker.preCollection( _da );
				
				//Execute the normal default page load tracking function.
				_gaq.push(['_trackPageview']);
			});		
		}
		 */
	
			
		/* 
		 * Omniture implmentation
		 */
		if(_isNonSpecialWebAppOmnitureConfigured()) {
	 
			// When the DOM is ready and analytics is ready.
			$(document).ready(function() {
				if(_isNonSpecialWebAppOmnitureConfigured()) {

					_trackOmniture();
					_trackFps(); // added
					ND.analyticsBinder.bind();
				}
			});
			
			//TODO add similar code for FPS here
			globals._tag_om = globals._da.om;
			
		}  if(_isMobileAppOmnitureConfigured()) {
			
			/* 
			 * Omniture mobile implmentation
			 */
			
			/**
			 * if this method gets called we are on a mobile device that's using jquery mobile
			 */
			$(document).bind("mobileinit", function(){
				$(document).bind('pagechange', function() {
					
					_trackOmniture();
					//TODO wherever we have _trackOmniture() called, we also have to add trackFps();
					_trackFps();
					ND.analyticsBinder.bind();
				});
				//TODO add similar code for FPS here
				globals._tag_om = globals._da.om;
			});
		}
	}
	
	_track();
	
	/**
	 * WARNING: must be called explicitly every time page changes in single page app
	 */
	ND.analyticsTag = ND.analyticsTag || {
		
		trackOmnitureSinglePageApp : function() {
			if(_isSinglePageAppOmnitureConfigured()) {
				_trackOmniture();
				_trackFps(); // added by remjo
				//DO NOT bind more than once (ND.analyticsBinder.bind()), it's called in _setOnce
				//we want to set globals._da.om only once so remove the method after it's set.
				if (ND.analyticsTag._setOnce !== undefined) {
					ND.analyticsTag._setOnce();
					delete ND.analyticsTag._setOnce;
				}
			}
		},

		trackOmniturePage : function(params) {

			_trackOmniture(params);
			_trackFps(params); // added by remjo
		},
		
		_setOnce : function() {
			globals._tag_om = globals._da.om;
			ND.analyticsBinder.bind();
		},
		
		isSinglePageAppOmnitureConfigured: _isSinglePageAppOmnitureConfigured
	};
	
	
	
}(window, jQuery));

// Now that this code is executed  ->  _tag instanceof WebTrends


