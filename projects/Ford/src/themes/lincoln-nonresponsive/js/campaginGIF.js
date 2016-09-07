/*

Author:Doris

*/

(function ($) {
	
    var CampaginGIF = {


        init: function () {
            if (!$('.feature-row .column.gif') || $('.feature-row .column.gif').length===0) { return; }

            CampaginGIF.campaginImages = [];

            $('.feature-row .column.gif').each(function () {
                var images = $('img', $(this));
                if (images && images.length) {
                    var targetImg = new Image();
                    targetImg.src = $(images[0]).data('target');
                    //var staticImg = new Image();
                    //staticImg.src = images[0].src;
                    CampaginGIF.campaginImages.push(new Object({
                        item: $(this),
                        //staticImg: $(staticImg),
                        staticImgSrc:images[0].src,
                        //gifImg: $(targetImg),
                        gifImgSrc: $(images[0]).data('target')
                    }));
                    images.attr('src', images[0].src);
                }
            });
            CampaginGIF.checkPosition();
            $(window).on('scroll', CampaginGIF.checkPosition);
            //console.log(CampaginGIF.campaginImages);
        },

        checkPosition: function () {
            var top = $(window).height() + $(window).scrollTop();
            $.each(CampaginGIF.campaginImages, function (i, camItem) {
                var isInSights = camItem.item.offset().top < top && camItem.item.offset().top + camItem.item.height() > $(window).scrollTop();
                if (isInSights && $('img', camItem.item).attr('src') == camItem.staticImgSrc) {
                    //$('img', camItem.item).remove();
                    //$(camItem.item).append(camItem.gifImg);
                    $('img', camItem.item).attr('src', camItem.gifImgSrc);
                }
                else if (!isInSights && $('img', camItem.item).attr('src') == camItem.gifImgSrc) {
                    //$('img', camItem.item).remove();
                    //$(camItem.item).append(camItem.staticImg);
                    $('img', camItem.item).attr('src', camItem.staticImgSrc);
                }
            });
        }

        

    };
	
    $(function () {

        CampaginGIF.init();

	});
	
})(jQuery);