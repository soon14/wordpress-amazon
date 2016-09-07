/*
 * Author: Doris
 */

(function($) {

    var Video = {

        init: function () {

            if (!$('.video-carousel a').length || !$('.video-overlay').length) { return; }
            
            Video.preOpenOverlay();

            $('.video-carousel, .video-carousel ul.bxslider, .video-carousel ul.bxslider li').click(function (e) {
                e.preventDefault();
            });

            $('.video-carousel ul.bxslider li a').click(function (e) {
                e.preventDefault();
                Video.openOverlay($(this).attr('href'));
                return false;
            });

            if ($('body').is('.ie8')) {
                $('body').live('click', function (e) {
                    if ($('.video-overlay').is(':visible') && !$(e.target).parents().is($(".video-overlay"))) {
                        Video.unloadOverlay();
                    }
                });
                $(".video-overlay .close-reveal-modal").live("click", function (e) {
                    e.preventDefault();
                    Video.unloadOverlay();
                    return false;
                });
            }
            else if (Modernizr.touch) {
                $('body').on("touchstart", function (e) {                    
                    if ($('.video-overlay').is(':visible') && !$(e.target).parents().is($(".video-overlay"))) {
                        e.preventDefault();
                        Video.unloadOverlay();
                        return false;
                    }
                });
                $(".video-overlay .close-reveal-modal").live("click", function (e) {
                    e.preventDefault();
                    Video.unloadOverlay();
                    return false;
                });
            }
            else {
                $(".video-overlay .close-reveal-modal, .reveal-modal-bg").live("click", function (e) {
                    e.preventDefault();
                    Video.unloadOverlay();
                    return false;
                });
            }

        },

        preOpenOverlay: function () {
            if (window.location.toString().indexOf('overlay') > -1) {
                var location = window.location.toString();
                var videoId = location.substring(location.indexOf('overlay') + 'overlay'.length + 1);
                //console.log(videoId);
                Video.openOverlay(videoId);
            }
        },

        openOverlay: function (videoId) {
            if (videoId.length == 0) { return; }

            var videoOverlayTemplate = $('#video-overlay-content-template').html();
            $.template('video-overlay-content-template', videoOverlayTemplate);
            $('.video-overlay .content').html($.tmpl('video-overlay-content-template', { id: videoId }));

            if ($('body').is('.smobile')) {
                if ($(window).innerWidth() > $(window).innerHeight()) {
                    $('.video-overlay.reveal-modal').css('height', $(window).innerHeight() - $('.video-overlay.reveal-modal .close-reveal-modal').height() - 5);
                }
                else {
                    $('.video-overlay.reveal-modal').css('height', $(window).innerHeight() * 0.6);
                }
            }

            $(".video-overlay").foundation('reveal', 'open', {
                animationSpeed: 110
            });

            var location = window.location.toString().substring(0, window.location.toString().indexOf('#'));
            if (Modernizr.history) {
                history.pushState(null, "overlay", location);
                history.pushState(null, "overlay", location + "#overlay=" + videoId);
            }
            else {
                var state = {};
                state["overlay"] = videoId;
                $.bbq.pushState(state);
            }
            
        },

        unloadOverlay: function () {
            $('.video-overlay .content').empty();            
            if ($('body').is('.ie8')) {
                $('.video-overlay.reveal-modal').removeClass('open').hide();
                $('.reveal-modal-bg').hide();
            }
            else {
                $('.video-overlay').foundation('reveal', 'close');
            }
            $('.video-overlay.reveal-modal').css('height', '');

            var location = window.location.toString().substring(0, window.location.toString().indexOf('#'));
            if (Modernizr.history) {
                //history.replaceState(null, "overlay", "");
                //history.back();
                history.pushState(null, "overlay", location);
            }
            else {
                //window.location.hash = '';
                //$.bbq.removeState("overlay");
                var state = {};
                state["overlay"] = null;
                $.bbq.pushState(state);
            }

        }

    };

	$(function(){
	    Video.init();
	})

}(jQuery));