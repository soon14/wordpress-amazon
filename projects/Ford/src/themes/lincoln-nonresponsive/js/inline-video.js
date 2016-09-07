/*

Author:Doris

*/

(function ($) {
	
    var InlineVideo = {

        init: function () {
            if (!$('a.inline-video') || $('a.inline-video').length === 0) { return; }
            InlineVideo.registerEvents();
        },

        registerEvents: function () {
            $('a.inline-video').on('click', function (e) {
                e.preventDefault();
                var $this = $(this),
                    $outerContainer = $this.parent(),
                    thisWidth = $outerContainer.width(),
                    thisHeight = $outerContainer.height();

                if ($this.attr('href')) {
                    if (!$('#video-inner', $outerContainer) || $('#video-inner', $outerContainer).length === 0) {
                        $outerContainer.append("<div class='video-container'><div id='video-inner'></div></div>");
                    }                    
                    $('.video-container', $outerContainer).width(thisWidth-10).height(thisHeight-10);
                    ND.video.init(new Object({
                        "file": $this.attr('href'),
                        "play": true,
                        "width": thisWidth-10,
                        "height": thisHeight-10
                    }));
                    $this.hide();
                }
            });
        }
        

    };
	
    $(function () {

        InlineVideo.init();

	});
	
})(jQuery);