/* nativemap.js */
/**
 * @author Sohrab Zabetian
 * @project smob dealer locator
 * @description: based on lat/lng, generates a map link recognizable by mobile devices
 * so that when the user clicks on the link, the native map app opens. 
 */

(function($) {
    ND.getMobileDevice = function(){
        var ua = navigator.userAgent,
            plt = navigator.platform,
            device,
            deviceChecker = {
                iphone: function() {
                    return ua.match(/(iPhone|iPod|iPad)/i) || plt.match(/(iPhone|iPod|iPad)/i) ;
                },
//                blackberry : function() {
//                    return ua.match(/BB/i) || plt.indexOf('blackberry');
//                },
                android:  function() {
                    return ua.match(/Android/) 
                    || ua.match(/Dalvik/)
                    || ua.match(/GINGERBREAD/)
                    || ua.match(/Linux;.*Mobile Safari/)
                    || ua.match(/Linux 1\..*AppleWebKit/) || plt.indexOf('android') > 0 ;
                }
//                ,
//                opera:  function() {
//                    return ua.match(/Opera Mini/i) || plt.match(/Opera Mini/i);
//                },
//                windows:  function() {
//                    return ua.match(/IEMobile/i) || plt.indexOf('win');
//                }
            }; 


        for (device in deviceChecker) {
            if (deviceChecker[device].call()) {
                return device;
            }
        }
        return null;
    };
    
    var convert = function(mobileDevice, lat,lng) {

        switch (mobileDevice) {

            case 'iphone' :
                // return 'http://maps.apple.com/?saddr=Current%20Location&daddr=' + lat + ',' + lng;
                return 'http://maps.apple.com/?ll=' + lat + ',' + lng;
            case 'android':
                // return 'https://maps.google.com/maps?f=d&daddr=' + lat + ',' + lng;
                return 'http://maps.apple.com/?ll=' + lat + ',' + lng;
        }
        return null;

    };

    var nativeMapURLGenerator = function() {

        var mobileDevice = ND.getMobileDevice(),
            $linksToConvert = $('.dl-convertToNativeMapUrl'),
            $link, lat, lng;

        if (mobileDevice != null && $linksToConvert.length > 0) {

            $linksToConvert.each(function() {
                $link = $(this);
                lat = $link.data('lat');
                lng = $link.data('lng');
                if (typeof lat !== 'undefined' && typeof lng !== 'undefined' &&
                    lat != null && lng != null && lat !== '' && lng !== '') {

                    var url = convert(mobileDevice, lat, lng);
                    // window.alert(mobileDevice + ' :' +  url);
                    if (url != null) {
                        $link.attr('href', url);
                    } else {
                        $link.removeClass('dl-convertToNativeMapUrl');
                        $link.addClass('dl-showDealerOnMap');
                    }
                }
            });
        }
    };
    
    $(document).on("pagechange", function() {
    	nativeMapURLGenerator();
    });
})(jQuery);