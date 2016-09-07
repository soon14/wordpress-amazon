/*
 * Author: Doris
 * Description: for phone compatibility table
 * 
 */

(function($) {

    var SYNCSupport = {
        init: function () {
            SYNCSupport.adjustLayout();
            SYNCSupport.tipPopup();
            SYNCSupport.headerFloat();
            SYNCSupport.dropdownRedirect();
        },

        adjustLayout: function () {
            $('.features-grid .table .thead .tr .th:first-child, .features-grid .table .tbody .tr .th').css('height', 'auto');
            $('.features-grid .table').each(function () {
                var maxHeight = 0;
                $('.tbody .tr .th', $(this)).each(function () {
                    if ($(this).outerHeight() > maxHeight) {
                        maxHeight = $(this).outerHeight();
                    }
                });
                $('.thead .tr .th:first-child, .tbody .tr .th', $(this)).css('height', maxHeight);
            });
        },

        dropdownRedirect: function () {
            if (!$('form#compatibility select').length) { return; }

            $('form#compatibility select').change(function (e) {
                var value = this.value;
                var href = '';
                if (value.length > 0) {
                    $('option', this).each(function () {
                        if (value === this.value) {
                            href = $(this).attr('href');
                        }
                    });
                }
                if (href.length > 0) {
                    location.href = href;
                }
            });
        },

        headerFloat: function () {

            if (!$('.package-info').length && !$('.package-titles').length) { return; }

            var headerInfo = $('.package-info');
            var headerTitle = $('.package-titles');
            var headerTop = $('.package-info').offset().top;
            var phoneContent = $('.phone-content');
            $(window).scroll(function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > headerTop) {
                    headerInfo.addClass('fixed');
                    headerTitle.addClass('fixed');
                    headerTitle.css('top', headerInfo.outerHeight());
                    var topMargin = headerInfo.outerHeight();
                    if (headerTitle.is(':visible')) {
                        topMargin += headerTitle.outerHeight();
                    }
                    $('.features-grid').parent().css('margin-top', topMargin);
                    headerInfo.css('visibility', 'visible');
                    headerTitle.css('visibility', 'visible');
                    if (scrollTop > (phoneContent.offset().top + phoneContent.outerHeight())) {
                        headerInfo.css('visibility', 'hidden');
                        headerTitle.css('visibility', 'hidden');
                    }
                }
                else {
                    headerInfo.removeClass('fixed');
                    headerTitle.removeClass('fixed');
                    headerTitle.css('top', 'auto');
                    $('.features-grid').parent().css('margin-top', 'auto');
                    headerInfo.css('visibility', 'visible');
                    headerTitle.css('visibility', 'visible');
                }
            });

        },

        tipPopup: function () {

            if (!$('.features-grid .has-tip').length) { return; }

            var popupHTML = "<div style='display:none;' class ='optional-popup'><div class='top'></div><div class='middle'></div><div class='bottom'></div></div>"
            var popupHTMLMirror = "<div style='display:none;' class ='optional-popup-adjust'><div class='top'></div><div class='middle'></div><div class='bottom'></div></div>"
            $('body').append(popupHTML + popupHTMLMirror);

            
            if (Modernizr.touch) {
                $('body').on('touchstart swipe', function () {
                    if ($('div.optional-popup, div.optional-popup-adjust').is(':visible')) {
                        $('div.optional-popup, div.optional-popup-adjust').hide();
                        $('div.optional-popup div.middle, div.optional-popup-adjust div.middle').html('');
                    }
                });
                $('.features-grid .has-tip span').on('click', function (e) {
                    e.stopPropagation(); e.preventDefault();
                    openTip($(this));
                    return false;
                });
            }
            else {
                $('.features-grid .has-tip span').on('mouseover', function (e) {
                    e.stopPropagation(); e.preventDefault();
                    openTip($(this));
                    return false;
                });
                $('.features-grid .has-tip span').on('mouseleave', function () {
                    if ($(this).parent().find('div.tips').length < 1) { return; }
                    $('div.optional-popup, div.optional-popup-adjust').hide();
                    $('div.optional-popup div.middle, div.optional-popup-adjust div.middle').html('');
                });
            }
            
            function openTip($ele) {
                if ($ele.parent().find('div.tips').length < 1) { return; }

                var thisIcon = $ele.parent().find('span')[0];
                var leftPosition = getElementLeft(thisIcon);
                var topPosition = getElementTop(thisIcon);
                var browserWidth = $(window).width();
                var rightPosition = browserWidth - leftPosition;
                var popContent = $ele.parent().find('div.tips').html();
                var dValue = 32;

                if (rightPosition < 220 && $("body").hasClass("ltr")) {
                    dValue = 205;
                    $("div.optional-popup-adjust div.middle").html(popContent);
                    var popHeight = $("div.optional-popup-adjust").height();
                    var newTopPosition = topPosition - popHeight;
                    var newLeftPosition = leftPosition - dValue;
                    var popHeight = $("div.optional-popup-adjust").css({ 'left': newLeftPosition + 'px', 'top': newTopPosition + 'px' }).show();
                }
                else {
                    $("div.optional-popup div.middle").html(popContent);
                    var popHeight = $("div.optional-popup").height();
                    var newTopPosition = topPosition - popHeight;
                    var newLeftPosition = leftPosition - dValue;
                    var popHeight = $("div.optional-popup").css({ 'left': newLeftPosition + 'px', 'top': newTopPosition + 'px' }).show();
                }
            }

            function getElementLeft(element) {
                var actualLeft = element.offsetLeft;
                if ($('body').is('.smobile')) {
                    actualLeft = $(element).offset().left;
                }
                var current = element.offsetParent;
                while (current !== null) {
                    actualLeft += current.offsetLeft;
                    current = current.offsetParent;
                }
                return actualLeft;
            }

            function getElementTop(element) {
                var actualTop = element.offsetTop;
                var current = element.offsetParent;
                while (current !== null) {
                    actualTop += current.offsetTop;
                    current = current.offsetParent;
                }
                return actualTop;
            }

        }
    };

	$(function(){
	    SYNCSupport.init();
	})

}(jQuery));