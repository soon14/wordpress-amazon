/*
 * jQuery Image Reveal - A Simple Before/After Image Viewer
 *
 * Version: Master
 * Homepage: http://github.com/lemoncreative/jquery-image-reveal
 * Licence: MIT
 * Copyright: (c) 2013 Lemon Creative;
 *
 * IMPORTANT:   This plugin has been specifically modified for Ford GUX.
 *              - Removed captions.
 *              - Removed extra width touchbar. The width is now changed in the CSS.
 *              - Changed full width draggable area so now it's dynamic. With of draggable slider can be changed in the HTML
 *                i.e. <div class="imageReveal" data-slider-width="50"> 50 equals 50% of the image/component width.
 */

(function($) {
    $.fn.extend({
        imageReveal: function(options) {
            var $el = {};

            // Merge passed in options with defaults
            options = $.extend({}, {
                barWidth: 30,
                touchBarWidth: 40,
                startPosition: 0.15,
                paddingLeft: 0,
                paddingRight: 0,
                width: 500,
                height: 500,
                ids: [],
                sliderPadding: 0.15
            }, options);

            options.ids = [];

            // Ensure startPosition is valid.
            if (options.startPosition > 1) options.startPosition = 1;
            else if (options.startPosition < 0) options.startPosition = 0;

            // Update - Moves the overlay and drag bar to the new location and displays the correct caption.
            function update(width, id) {

                // The width cannot be set lower than 0 or higher than options.width
                var dragPadding = options.sliderPadding * options.width;
                var dragBaseWidth = width;

                if (width < dragPadding) {
                    width = dragPadding;
                    dragBaseWidth = dragPadding;
                }
                if (width > (options.width - dragPadding)) {
                    width = options.width;
                    dragBaseWidth = options.width - dragPadding;
                }

                // The width must not go outside any specified padding
                if (width < options.paddingLeft) {
                    width = options.paddingLeft;
                    dragBaseWidth = options.paddingLeft;
                }
                if (width > (options.width - options.paddingRight)) {
                    width = options.width - options.paddingRight;
                    dragBaseWidth = options.width - options.paddingRight;
                }

                // Apply new width
                $el[id].overlay.width(width);

                // The drag bar 'left' position should be set to (width - barWidth/2) so we always drag from the center.
                var dragBarPosition = dragBaseWidth - (options.barWidth / 2);

                if (dragBarPosition < 0) dragBarPosition = 0;
                if (dragBarPosition > options.width - options.barWidth) dragBarPosition = options.width - options.barWidth;
                $el[id].drag.css({
                    left: dragBarPosition
                });

            }

            // handleEvent - Calls 'update' if the event is valid
            function handleEvent(e) {
                var id = $(this).data('imageRevealID');

                if (!$el[id].dragging && e.type !== 'click') return false;
                var position;

                // If it was a touch event
                if (e.originalEvent && e.originalEvent.changedTouches) {
                    // Get position from touch event
                    position = e.originalEvent.changedTouches[0].pageX;
                }
                // Otherwise get position from mouse event
                else {
                    position = e.pageX;
                }

                // Call update with new width
                update(position - $el[id].overlay.offset().left, id);
                return false;
            }

            return this.each(function(i) {
                $el[i] = {};
                options.ids.push(i);

                // Container
                $el[i].container = $(this).addClass('imageReveal').data('imageRevealID', i);

                // Get Slider Width
                $el[i].sliderWidth = $el[i].container.data('slider-width');
                options.sliderPadding = ((100 - $el[i].sliderWidth) / 2) / 100;

                // Left Scroller Icon
                var halfSliderWidth=((($el[i].sliderWidth / 100) * options.width) / 2);
                $el[i].scrollerLeft = $el[i].container.children('.scroller-left')
                    .css({
                        'display': 'block',
                        'margin-left': (halfSliderWidth + 128) * 2 > options.width ? (-options.width/2) : (-halfSliderWidth - 128)
                    });

                // Right Scroller Icon
                $el[i].scrollerRight = $el[i].container.children('.scroller-right')
                    .css({
                        'display': 'block',
                        'margin-right': (halfSliderWidth + 132) * 2 > options.width ? (-options.width / 2) : (-halfSliderWidth - 132)
                    });

                // Before Image
                $el[i].before = $el[i].container.children('img').first()
                    .width(options.width)
                    .height(options.height)
                    .hide();

                // After Image
                $el[i].after = $el[i].before.next()
                    .width(options.width)
                    .height(options.height)
                    .hide();

                // Set up container
                $el[i].container
                    .width(options.width)
                    .height(options.height)
                    .css({
                        overflow: 'hidden',
                        position: 'relative'
                    })
                    .append('<div class="imageReveal-overlay"></div>')
                    .append('<div class="imageReveal-background"></div>')
                    .append('<div class="imageReveal-drag-bar"></div>')
                    .append('<div class="imageReveal-drag"></div>');

                // Slider bar
                $el[i].bar = $el[i].container.children('.imageReveal-drag-bar')
                    .width(($el[i].sliderWidth / 100) * options.width)
                    .css({
                        'margin-left': -(($el[i].sliderWidth / 100) * options.width) / 2
                    });

                // Background
                $el[i].bg = $el[i].container.children('.imageReveal-background')
                    .width(options.width)
                    .height(options.height)
                    .css({
                        'background-image': 'url(' + $el[i].after.attr('src') + ')',
                        'background-size': options.width + 'px ' + options.height + 'px'
                    });

                // Overlay
                $el[i].overlay = $el[i].container.children('.imageReveal-overlay')
                    .width(options.width)
                    .height(options.height)
                    .css({
                        'background-image': 'url(' + $el[i].before.attr('src') + ')',
                        'background-size': options.width + 'px ' + options.height + 'px'
                    });
                    //.animate({
                    //    width: options.width - (options.width * options.startPosition)
                    //});

                // Drag Bar
                $el[i].drag = $el[i].container.children('.imageReveal-drag')
                    .css({ right: (options.sliderPadding * options.width) - (options.barWidth / 2)})
                    .on('mousedown touchstart', function() {
                        $el[i].dragging = true;
                        $el[i].drag.addClass('dragging');
                        return false;
                    })
                    .on('mouseup touchend touchcancel', function() {
                        $el[i].dragging = false;
                        $el[i].drag.removeClass('dragging');
                        return false;
                    });

                // Catch mouseup on document for when the user
                // releases the mouse button outside the container.
                $(document).on('mouseup touchend touchcancel', function() {
                    if (!$el[i].dragging) return;
                    $el[i].dragging = false;
                    $el[i].drag.removeClass('dragging');
                });

                // When the bar is dragged outside the container, immediately
                // move it to the min or max position. This avoids the bar
                // getting stuck when the mouse is moved too fast
                $el[i].container.on('mouseout', function(e) {
                    if (!$el[i].dragging) return;
                    update(e.pageX - $el[i].overlay.offset().left, i);
                });

            }).on('mousemove click touchmove', handleEvent);
        }
    });
})(jQuery);