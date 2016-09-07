/**
 * @author ? /updated by Sohrab Zabetian
 * @project smob dealer locator/
 * @description: manages/init map for smob dealer locator
 * Requires the following json somewhere in DOM body:
 * 
 * <script id="dealerLocatorBingMapConfig" type="text/x-json">
 *	{
 *		"zoom" : "${dealerLocatorBean.map_default_zoom *2}",
 *		"mapContainer" : "#dealerLocatorMap",
 *		"mapCloseMapButton" : "#mapCloseMapButton",
 *		"credentials" : "${dealerLocatorBean.mapKey}"
 *	}
 *	</script>
 *
 * as well as at least one div with lat, lng data
 * 
 * <div class="dealerMapData" data-lng="-25" data-lat="-140"></div>
 *
 * if no div exists centers the map to center of Australia. 
 *
 * REMEMBER that MAP IS ENABLED/DISABLED by DFYTranslation "DealerLocator/EnableMapForDealer"						
 */
(function($){

    var bingMap = {
	    map : null,
        defaultCenter : {lat : -25.610111, lng : 134.354806},
        defaultZoom: 12,

        init : function($mapConfig){

            var mapConfig;

            if ($mapConfig.length) {
            	//incase microsoft is not available right away, try again in 300 ms
                if (typeof Microsoft === 'undefined' || 
                	typeof  Microsoft.Maps === 'undefined' || 
                	typeof Microsoft.Maps.Location === 'undefined')  {
                    setTimeout(function() {
                    	bingMap.parseMapConfig($mapConfig) ;
                    }, 500);
                }  else {
                	bingMap.parseMapConfig($mapConfig);
                }
            }
        },

        parseMapConfig: function($mapConfig) {
            mapConfig = JSON.parse($mapConfig.html());
            var locations = [], mapPoint, lat, lng, i, dealerLocation;
            $('div.dealerMapData').filter(':visible').each(function() {
                mapPoint = $(this);
                lat = mapPoint.data('lat');
                lng = mapPoint.data('lng');
                if (typeof lat !== 'undefined' && typeof lng !== 'undefined' &&
                    lat != null && lng != null && lat !== '' && lng !== '') {
                    dealerLocation = new Microsoft.Maps.Location(lat,lng) ;
                    locations.push(dealerLocation);
                    bingMap.attachPanToPinEventHandler(mapPoint.parent().find('.dl-showDealerOnMap'), dealerLocation);
                }
            });

            bingMap.attachHeroMapEventHandler($('.dl-viewFullScreen'), $(mapConfig.mapCloseMapButton));

            if (locations.length === 0) {
                locations.push(new Microsoft.Maps.Location(bingMap.defaultCenter.lat, bingMap.defaultCenter.lng));
            }
            mapConfig.dealers = locations;
            bingMap.create(mapConfig);
            for (i = 0; i < locations.length; i++) {
                bingMap.addPin(locations[i]);
            }
        },

        //Create map
        create : function(config){
        	bingMap.map = new Microsoft.Maps.Map($(config.mapContainer)[0], {
                credentials: config.credentials,
                enableSearchLogo: false,
                enableClickableLogo: false,
                mapTypeId: Microsoft.Maps.MapTypeId.road,
                zoom: Number(config.zoom),
                showDashboard: false
            });
        	bingMap.defaultZoom = Number(config.zoom);
        	bingMap.map.setView({bounds: Microsoft.Maps.LocationRect.fromLocations(config.dealers)});
        },

        //Add a pin to the center of the map
        addPin: function(point){
            var pin = new Microsoft.Maps.Pushpin(point);
            bingMap.map.entities.push(pin);
        },


        attachPanToPinEventHandler: function($btn, dlLocation) {
            $btn.on('click', function(e) {
                e.preventDefault();
                bingMap.map.setView({center: dlLocation, zoom: bingMap.defaultZoom});
                $('html, body').animate({ scrollTop: 0 }, 'slow');
            });
        },

        //Larger map handler
        attachHeroMapEventHandler: function($enterBtns, $exitBtns){
            if ($enterBtns.length && $exitBtns.length) {
                var $window = $(window), 
					$body,
                	$currentPage;

                var enter = function(e){
                	e.preventDefault();
                	e.stopPropagation();
                	
                	$body = $(document.body);
                	$currentPage = $body.find("div[data-role='page']");
                	
                	var winHeight = $currentPage.css("min-height");
                	
                	$currentPage.css("height",winHeight);
                	$body.addClass("hero");

                    $window.on("resize", resize);
                    $window.trigger("resize");
                };

                var exit = function(e){
                	e.preventDefault();
                	e.stopPropagation();
                	$currentPage.css("height","");

                    $body.removeClass("hero");

                    $window.off("resize", resize);
                };

                var resize = function(){
                    $window.scrollTop($window.height());
                };

                $enterBtns.on("click", enter);
                $exitBtns.on("click", exit);
            }
        }
    };
    
    $(document).on("pagechange", function() {
    	
		var $mapConfig = $('#dealerLocatorBingMapConfig');
		if ($mapConfig.length > 0) {
			var mgr = Object.create(bingMap);
			mgr.init.call(mgr, $mapConfig);
	    }
    });

})(jQuery);