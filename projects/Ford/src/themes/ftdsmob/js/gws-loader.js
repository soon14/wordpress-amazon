/* This loads the S550 Widget scripts.js code */

var s550eventmap = {};

function flagEventFired(event) {
    s550eventmap[event] = true;
}

function hasEventFired(event) {
    var hasfired = !((s550eventmap[event] === undefined) || (s550eventmap[event] === false));
    return hasfired;
}

function showShareThisLink(socialId, url) {
    $.publish('/analytics/link/', { title : 'share this', nameplate : 'none', link : true, type : 'e', onclicks : 'share this:' + socialId });
    window.open(url);
}

function showFollowLink(socialId, url) {
    $.publish('/analytics/link/', { title : 'social:follow', nameplate : 'none', link : true, type : 'e', onclicks : 'social:follow:' + socialId, events : 'event4' });
    window.open(url);
}

function publishS550Link(title, linktype, onclicks, throttleKey) {
    if (throttleKey === undefined) {
        $.publish('/analytics/link/', { title : title, link : true, type : linktype, onclicks : onclicks });
    } else {
        if (!hasEventFired(throttleKey)) {
            flagEventFired(throttleKey);
            $.publish('/analytics/link/', { title : title, link : true, type : linktype, onclicks : onclicks });
        }
    }
}

$(document).bind('mobileinit', function(){
    $(document).bind('pagechange', function() {
        
        // Run GWS.init manually if the auto-init.js script is not included
        GWS.init();

        // Subscribe to events in the S550 widgets
        GWS.listen('features-button', function(data) {
            var onclicks = '', eventKey = '';
            if (data.featuresId) {
                if (data.featuresId === 'performance') {
                    onclicks = eventKey = 'reveal:performance:read more:ford mustang';
                    publishS550Link('reveal:performance:read more', 'o', onclicks, eventKey);
                } else if (data.featuresId === 'tech') {
                    onclicks = eventKey = 'reveal:tech:read more:ford mustang';
                    publishS550Link('reveal:tech:read more', 'o', onclicks, eventKey); 
                }
            }
        });

        GWS.listen('gallery-slider-image', function(data) {
            publishS550Link('reveal:gallery:image', 'o', 'reveal:gallery:image:ford mustang', 'gallery-slider-image');
        });

        GWS.listen('gallery-slider-arrow', function(data) {
            publishS550Link('reveal:gallery:scroll', 'o', 'reveal:gallery:scroll:ford mustang', 'gallery-slider-arrow');
        });

        GWS.listen('360-view-rotate', function(data) {
            publishS550Link('reveal:360:spin', 'o', 'reveal:360:spin:ford mustang', '360-view-rotate');
        });

        GWS.listen('360-view-color', function(data) {
            publishS550Link('reveal:360:colorizor', 'o', 'reveal:360:colorizor:ford mustang', '360-view-color');
        });

        GWS.listen('360-view-wheel', function(data) {
            publishS550Link('reveal:360:select rim', 'o', 'reveal:360:select rim:ford mustang', '360-view-wheel');
        });

        GWS.listen('zoom-fullscreen-save', function(data) {
            publishS550Link('reveal:gallery:image:download', 'd', 'reveal:gallery:image:download:ford mustang', 'zoom-fullscreen-save');
        });

        GWS.listen('reveal-slider-scroll-mousemove', function(data) {
            publishS550Link('reveal:convertible', 'o', 'reveal:convertible:ford mustang', 'reveal-slider-scroll-mousemove');
        });

        // Page initialization settings
        if ($('#s550-billboard').length > 0) {

            // Attach click event handlers for the social media sites in the gallery
            var socialMediaSites = ['facebook', 'twitter', 'googleplus', 'weibo'];
            $.each(socialMediaSites, function(index, socialMediaSite) {
                $("a[data-id='" + socialMediaSite + "']").each(function(index, value) {
                    var anchor = value;
                    $(anchor).unbind();
                    var url = $(anchor).data("url");
                    if (index === 0) {
                        $(anchor).click(function(event) {
                            showShareThisLink(socialMediaSite, url);
                            return false;
                        });
                    } else {
                        $(anchor).click(function(event) {
                            showFollowLink(socialMediaSite, url);
                            return false;
                        });
                    }
                });
            });
            
            // Override email handling
            $("a.share-by-email").each(function(index, value) {
                var emailLink = $(this);
                var pev2 = (index === 0) ? "share this" : "social:follow";
                var c5 = (index === 0) ? "share this:email" : "social:follow:email";
                emailLink.unbind();
                emailLink.on('click', function(event) {
                    $.publish('/analytics/link/', { title : pev2, nameplate : 'none', link : true, type : 'e', onclicks : c5, events : 'event4' });
                    window.location.href = 'mailto:' + emailLink.data('email');
                });
            });
            
            // Attach tracking to the subnav items (do not use IE8-unsupported methods)
            var s550SubnavItems = ['gallery', 'features'];
            $("ul.nav-content").find("li > a").each(function() {
                var link = $(this);
                var linkHref = $(this).attr("href");
                $.each(s550SubnavItems, function(key, value) {
                    if (linkHref === '#s550-'+value) {
                        $(link).on('click', function(event) {
                            publishS550Link('reveal:' + value, 'o', 'reveal:' + value + ':ford mustang', 'subnav:' + value);
                        });
                        return false;
                    }
                });
            });
            
            // Attach event handlers for the get-updates links
            var getUpdates  = document.querySelectorAll('.get-updates-link');
            if (getUpdates.length >= 2) {
                if (typeof getUpdates[0] !== 'undefined') {
                    var getUpdatesLink1 = getUpdates[0].getAttribute("href");
                    getUpdates[0].onclick = function() {
                        window.location = getUpdatesLink1;
                    }; 
                }
                if (typeof getUpdates[1] !== 'undefined') {
                    var getUpdatesLink2 = getUpdates[1].getAttribute("href");
                    getUpdates[1].onclick = function() {
                        window.location = getUpdatesLink2;
                    };
                }
            }
        };
    });
});
