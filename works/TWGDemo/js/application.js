$.cookie.json = true;
function getShortUrl(long_url, func) {
    $.getJSON(
        "http://api.bitly.com/v3/shorten?callback=?",
        {
            "format": "json",
            "apiKey": 'R_aa87ea8fbbd64551982344f0f13f6660',
            "login": 'o_3dos0gsad',
            "longUrl": long_url
        },
        function(response) {
            func(response.data.url)
        }
        );
}

$(function() {
    $.smartbanner()

    // select2
    // $('.select2').select2({minimumResultsForSearch: -1})
    // $('.select3').select2();
    // Add selection a country
    // var option = $("#contact-country option");
    // $(option).each(function(i,val){
    //     if(i==0){
    //         $(this).html("Select a country");
    //     }
    // })

$('.check-all').each(function() {
    var me = $(this)
    var data = me.data()
    var $checkboxes = $(data.container? data.container : document.body).find(data.target)

    me.click(function() {
        var checked = this.checked
        $checkboxes.prop('checked', checked)
    })

    $checkboxes.on('change', function() {
        me.prop('checked', $checkboxes.filter(':checked').length == $checkboxes.length)
    })
})

$('.check-all').click(function () {
  if ($('.check-all + .custom-check').hasClass('checked')) { //if already checked
    $('.product-checkbox + .custom-check').removeClass('checked'); //remove all class
  } else { //if already checked
    $('.product-checkbox + .custom-check').addClass('checked'); //add class checked to all products
  }
});

$('.product-checkbox').click(function () {
  if ($('.check-all + .custom-check').hasClass('checked')) { //if check all is checked
    $('.check-all + .custom-check').removeClass('checked'); //remove check all class
  }
});


var $subNav = $('.sub-nav')

$subNav.on('mouseover', function() {
    $(this).stop(true).slideDown(200)
})

$subNav.on('mouseleave', function() {
    $(this).stop().slideUp(200)
})

$('.sub-nav-toggle').each(function() {
    var me = $(this)
    var $target = $(me.data('target'))

    me.on('mouseover', function() {
        $target.stop().slideDown(200)
    })

    me.on('mouseleave', function() {
        $target.stop().delay(200).slideUp(200)
    })
});

var defaultResponsiveSetting = [
{
    breakpoint: 991,
    settings: {
        slidesToShow: 3,
        slidesToScroll: 3
    }
},{
    breakpoint: 767,
    settings: {
        slidesToShow: 2,
        slidesToScroll: 2
    }
}
]

    // carousel
    $('.carousel').each(function() {
        var me = $(this)
        var data = me.data()
        var responsive = data.responsive

        if (responsive) {
            if (responsive === true) {
                responsive = defaultResponsiveSetting
            } else {
                responsive = [{
                    breakpoint: 991,
                    settings: {
                        slidesToShow: responsive[0],
                        slidesToScroll: responsive[0]
                    }
                },{
                    breakpoint: 767,
                    settings: {
                        slidesToShow: responsive[1],
                        slidesToScroll: responsive[1]
                    }
                }]
            }
        }

        var settings = {
            dots: !!data.dots,
            arrows: !!data.arrows,
            infinite: true,
            speed: 500,
            autoplaySpeed:4000,
            slidesToShow: data.slidesToShow,
            slidesToScroll: data.slidesToScroll,
            fade: !!data.fade,
            slide: '.slide',
            autoplay: !data.autoPlay,
            responsive: responsive,
            variableWidth: data.variableWidth,
            centerMode: data.centerMode
        }
        me.slick(settings)
    })
    $('.checkboxConse').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe:false
    });
    //non carousel
    $('.noncarousel').each(function() {
        var me = $(this)
        var data = me.data()
        var responsive = data.responsive

        if (responsive) {
            if (responsive === true) {
                responsive = defaultResponsiveSetting
            } else {
                responsive = [{
                    breakpoint: 991,
                    settings: {
                        slidesToShow: responsive[0],
                        slidesToScroll: responsive[0]
                    }
                },{
                    breakpoint: 767,
                    settings: {
                        slidesToShow: responsive[1],
                        slidesToScroll: responsive[1]
                    }
                }]
            }
        }

        var settings = {
            dots: !!data.dots,
            arrows: !!data.arrows,
            infinite: true,
            speed: 500,
            slidesToShow: data.slidesToShow,
            slidesToScroll: data.slidesToScroll,
            fade: !!data.fade,
            slide: '.slide',
            autoplay: !!data.autoPlay,
            responsive: responsive,
            variableWidth: data.variableWidth,
            centerMode: data.centerMode
        }
        me.slick(settings)
    })

var $mobileMenu = $('.site-container .header-xs .menu')
$mobileMenu.on('click', '.toggle-button', function(e) {
    e.preventDefault()
    var isOpen = $mobileMenu.hasClass('open')
    if (isOpen) {
        $mobileMenu.animate({left: -256}, 200)
    } else {
        $mobileMenu.animate({left: 0}, 200)
    }

    $mobileMenu.toggleClass('open', !isOpen)
})

    // back to top
    $('.back-to-top').click(function(e) {
        e.preventDefault()

        $('html, body').animate({scrollTop: 0}, 500);
    })

    // custom scrollbar
    $('.x-scroll').each(function() {
        var me = $(this)
        var data = me.data()

        me.perfectScrollbar({
            suppressScrollX: data.scrollX === false
        })
    })

    // image zoom
    var zoomWindowWidth = $('#zoom-window-width').width()
    var isXs = $('.visible-xs').is(':visible')
    if (!isXs) {
        var zoomOptions = {borderSize: 0, zoomWindowWidth: zoomWindowWidth, zoomWindowOffetx: 27, responsive: true}

        $('.zoomable').each(function() {
            var me = $(this)


            me.on('mouseenter', function() {
                if (me.data().elevateZoom) {
                    $(me.data().elevateZoom.zoomContainer).show()
                    return
                }


                me.elevateZoom(zoomOptions)

                setTimeout(function() {
                    var $zoomContainer = $(me.data().elevateZoom.zoomContainer)

                    $zoomContainer.on('mouseleave', function() {
                        $zoomContainer.hide()
                    })
                }, 300)

            })
        })
    }

    // location world map
    var mapBaseWidth = 1200,
    mapBaseHeight = 568
    /**
     *
     * United States of America - 231, 174
     United Kingdom - 535, 139
     United Arab Emirates - 738, 228
     China - 870, 194
     Japan - 989, 179
     Korea - 957, 198
     Taiwan - 948, 234
     Hong Kong - 923, 253
     Thailand - 875, 259
     Cambodia - 913, 286
     Philippines - 959, 281
     Malaysia - 895, 311
     Singapore - 902, 333
     Indonesia - 906, 363
     */
     var map = {
        US: {name: 'United States Of America', spotText: 'United States<br>Of America', pos: [230, 173], alignment: 'top'},
        GB: {name: 'United Kingdom', spotText: 'United<br>Kingdom', pos: [532, 138], alignment: 'right'},
        AE: {name: 'United Arab Emirates', spotText: 'United Arab<br>Emirates', pos: [738, 228], alignment: 'bottom'},
        //QA: {name: 'Quatar', spotText: 'Quatar', pos: [713, 239]},
        CN: {name: 'China', spotText: 'China', pos: [868, 193], alignment: 'bottom'},
        TH: {name: 'Thailand', spotText: 'Thailand', pos: [874, 259], alignment: 'bottom'},
        KH: {name: 'Cambodia', spotText: 'Cambodia', pos: [912, 285], alignment: 'right'},
        VN: {name: 'Vietnam', spotText: 'Vietnam', pos: [888, 270], alignment: 'right'},
        SG: {name: 'Singapore', spotText: 'Singapore', pos: [900, 332], alignment: 'right'},
        ID: {name: 'Indonesia', spotText: 'Indonesia', pos: [905, 363], alignment: 'top'},
        MY: {name: 'Malaysia', spotText: 'Malaysia', pos: [893, 310], alignment: 'left'},
        JP: {name: 'Japan', spotText: 'Japan', pos: [987, 178], alignment: 'left'},
        KP: {name: 'Korea', spotText: 'Korea', pos: [955, 197], alignment: 'left'},
        TW: {name: 'Taiwan', spotText: 'Taiwan', pos: [947, 232], alignment: 'left'},
        HK: {name: 'Hong Kong', spotText: 'Hong Kong', pos: [922, 253], alignment: 'left'},
        MO: {name: 'Macau', spotText: 'Macau', pos: [920, 253], alignment: 'top'},
        PH: {name: 'Philippines', spotText: 'Philippines', pos: [958, 280], alignment: 'left'},
        AU: {name: 'Australia', spotText: 'Australia', pos: [984, 430], alignment: 'left'},
        CA: {name: 'Canada', spotText: 'Canada', pos: [255, 167], alignment: 'left'},
        DE: {name: 'Germany', spotText: 'Germany', pos: [571, 154], alignment: 'left'},
        PT: {name: 'Portugal', spotText: 'Portugal', pos: [532, 183], alignment: 'left'},
        RU: {name: 'Russian Federation', spotText: 'Russian<br>Federation', pos: [795, 160], alignment: 'bottom'},
        MA: {name: 'Morocco' , spotText: 'Morocco', pos: [532, 215], alignment: 'right'}

    }

    var $mapWrapper = $('#world-map')
    var $mapImg = $mapWrapper.children('img.map')
    var $positionContainer = $mapWrapper.children('.position-container')
    var $marker = $mapWrapper.children('.marker')
    var items = {}

    var rePositionItem = function(code, mapWidth, mapHeight) {
        var item = items[code]
        var baseX = item.position[0]
        var baseY = item.position[1]
        var width = item.$el.outerWidth()
        var height = item.$el.outerHeight()


        var x = mapWidth * baseX / mapBaseWidth
        var y = mapHeight * baseY / mapBaseHeight

        switch (map[code].alignment) {
            case 'top':
            x = x - width / 2
            y = y - 4
            break;

            case 'right':
            x = x - width + 4
            y = y - height / 2
            break;

            case 'bottom':
            x = x - width / 2
            y = y - height + 4
            break;

            case 'left':
            x = x - 4
            y = y - height / 2
            break;
        }

        item.$el.css({
            left: x,
            top: y
        })
    }

    var rePositionMap = function() {
        var mapWidth = $mapImg.width()
        var mapHeight = $mapImg.height()

        var code
        for (code in items) {
            rePositionItem(code, mapWidth, mapHeight)
        }

        $positionContainer.removeClass('hide')
    }

    $mapImg.on('load', function() {
        var name

        $.each(map, function(code, data) {
            var id = 'location-stores-' + code

            if(code == "HK")
            {
                var $el = $('<a href="http://www.teawg.com/" style="cursor:pointer" class="item text-highlight dot-' + data.alignment + '" data-toggle="popover" data-title="' + data.name + '" tabindex=1>' + data.spotText + '</a>')
            }
            else{
                var $el = $('<a class="item text-highlight dot-' + data.alignment + '" data-toggle="popover" data-title="' + data.name + '" tabindex=1>' + data.spotText + '</a>')
                .popover({
                    trigger: 'focus',
                    template: '<div class="popover location-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title text-upper"></h3><div class="popover-content"></div></div>',
                    content: $('<div id="' + id + '"><h3 class="text-center"><i class="fa fa-spinner fa-spin"></i></h3></div>'),
                    html: true,
                    viewport: $mapWrapper,
                    placement: 'left auto',
                    container: $mapWrapper
                })
            }

            $el.on('shown.bs.popover', function() {
                var me = $(this)

                if (!me.data('store-loaded')) {
                    me.data('store-loaded', true)
                    $('#' + id).load(baseUrl + '/location/stores?country=' + code)
                }

                var pos = me.position()

                //$marker.css({
                //    top: -500,
                //    left: pos.left - 27
                //}).show()
                //
                //$marker.animate({top: pos.top - 70})
            })

            $el.appendTo($positionContainer)

            items[code] = {
                position: data.pos,
                $el: $el
            }
        })

if ($mapWrapper.hasClass('in')) {
    rePositionMap()
}
}).each(function() {
    if(this.complete) $(this).load()
})

    // $mapWrapper.on('hide.bs.collapse', function() {
    //    $marker.hide()
    // })

$mapWrapper.on('shown.bs.collapse', function() {
    rePositionMap()
        rePositionMap() // ???
    })

var $window = $(window)
var $doc = $(document)

$window.on('resize', function() {
    rePositionMap()
})

    // progressive-load
    $('.progressive-load').each(function() {
        var me = $(this)

        var data = me.data()
        var loadUrl = data.loadUrl || window.location
        var childrenSelector = data.childrenSelector || 'li'

        var eventName = 'scroll.progressive-load-' + (new Date()).getTime()
        var $loadingIndicator = $(data.loadingIndicator || '.preloader')

        var footerHeight = $('.footer').outerHeight()

        $window.on(eventName, function() {
            if($window.scrollTop() + $window.height() + footerHeight >= $doc.height()) {
                if (me.data('load-state') != 'loading') {
                    me.data('load-state', 'loading')

                    $loadingIndicator.removeClass('hidden')

                    $.get(loadUrl, {offset: me.children(childrenSelector).length}, function(html) {
                        $loadingIndicator.addClass('hidden')

                        if (!html.trim()) {
                            $window.off(eventName)
                            return
                        }

                        me.data('load-state', 'loaded')
                        me.append(html)
                    })
                }

            }
        })
    })

    // print
    $('[data-print]').click(function() {
        var $target = $($(this).data('print'))
        var title = $target.data('print-title')

        $target.printThis({
            //pageTitle: false,
            header: '<div class="text-center">' + title + '</div><br><br>'
        })
    })

    // sharer
    $('.shares').on('click', '[data-service]', function(e) {
        e.preventDefault()

        var me = $(this)
        var data = me.data()
        var url = data.url || window.location
        var title = data.title || $('title').text()

        switch (data.service) {
            case 'facebook':
            var sharerUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url/* + '&v=1'*/)
            window.open(sharerUrl, 'Share on Facebook', 'width=626,height=436')
            break

            case 'twitter':
            getShortUrl(url, function(shorterUrl) {
                var sharerUrl = 'http://twitter.com/share?url=' + encodeURIComponent(shorterUrl) + '&text=Check out ' + title + '. Find out more at '
                window.open(sharerUrl, 'Share on Twitter', 'width=626,height=436')
            })

            break

            case 'email':
            window.location.href = 'mailto:?subject=' + data.subject + '&body=' + data.body
            break
        }
    })

    // product details availablein hover color

    $('.availablein-carousel').on('mouseenter', '.slide', function() {
        $('.availablein-active-color').text($(this).data('color'))
    })

    $('.availablein-carousel').on('mouseleave', '.slide', function() {
        $('.availablein-active-color').text('')
    })

    // copy child (shipping address)
    $('.copy-child-handle').click(function(e) {
        e.preventDefault()

        var me = $(this)
        var data = me.data()
        var $listContainer = $(data.listContainer)
        var $template = data.templateElement? $(data.templateElement) : $listContainer.children('.item')

        //$template.find('.select2').select2('destroy')

        var $el = $template.clone()
        //$template.find('.select2').select2({minimumResultsForSearch: -1})

        $listContainer.append($el)

        //$el.find('.select2').select2({minimumResultsForSearch: -1})
        $el.find('input[type=text]').val('')
        $el.find('input[type=checkbox]').prop('checked', false)
    })

    // add to bag
    var $cartCounter = $('.cart-indicator .count')
    var $addToBagNotifier = $('.cart-indicator .add-to-bag-notifier')

    $('.add-to-bag-form').submit(function(e) {
        e.preventDefault()

        var me = $(this)
        var $submit = me.find(':submit')

        $submit.button('loading')

        $.get(me.attr('action'), me.serialize()).done(function(totalItem) {
            $submit.text($submit.data('message'))

            $cartCounter.text(totalItem)

            $addToBagNotifier.animate({bottom: -50}, 500).delay(3000).animate({bottom: 200}, 500)
        })
    })

    // add to bag list
    $(document).on('click', '.add-to-bag', function(e) {
        e.preventDefault()
        $('.add-to-bag-notifier').stop()
        var item = $(this).data()
        $.ajax({
            url : shoppingUrl,
            data : { code : item.productCode},
            type: 'post',
            success: function(data){
                //alert(data)
                $('.add-to-bag-notifier').animate({
                    bottom: "-50px",
                },500,function(){
                    setTimeout(function(){ $('span.count').text(data) },200)
                    setTimeout(function(){
                        $('.add-to-bag-notifier').animate({
                            bottom: "150px"
                        },500)
                    },2000)
                })
            },
            error: function(){
              //  alert('not')
            }
        });
        $(this).attr('disabled', 'disabled').addClass('disabled').find('.text').text('ADDED!')
    })

    // add to favourites
    var favouriteCookieName = '__twg_favourites'

    if (window.needsRemoveFavouritesCookie) {
        $.removeCookie(favouriteCookieName, {path: '/'})
        $.removeCookie(bagCookieName, {path: '/'})
    }

    $(document).on('click', '.add-to-favourites', function(e) {
        e.preventDefault()

        var favourites = $.cookie(escape(favouriteCookieName)) || {}
        var me = $(this)
        var data = me.data()
        favourites[data.productCode] = data.productCode
        $.cookie(favouriteCookieName, favourites, {path: '/', expires: 30})

        me.attr('disabled', 'disabled').addClass('disabled').find('.text').text('ADDED!')
    })

    // product details accordion
    // when collapsed, the next one expanded by it self
    var $productDetailsAccordion = $('#product-details-accordion')

    $productDetailsAccordion.on('click', '.collapse-control', function(e) {
        var $target = $(this)

        if (!$target.hasClass('collapsed')) {
            var $nextPanel = $target.closest('.panel').next('.panel')

            if (!$nextPanel.length) {
                $nextPanel = $productDetailsAccordion.children('.panel:first')
            }


            setTimeout(function() {
                $nextPanel.find('.collapse-control').click()
            }, 10)
        }
    })

    // form validation
    var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    var numberRegex = /^\d+$/
    var postalRegex = /^\S[a-zA-Z0-9\s-*]+\S$/
    $('form').each(function() {
        var $form = $(this)
        $form.find(':input').attr('autocomplete', 'off')

        var $requiredInputs = $form.find(':input[required]')
        var $emailInputs = $form.find('[type=email]')
        var $numberInputs = $form.find('[type=number]')
        var $errorMessage = $form.find('.form-error-message')
        var $postalInputs = $form.find('[type=postal]')
        var $countrycode = $form.find('[type=countrycode]')
        $requiredInputs.removeAttr('required').attr('data-required', true)
        $emailInputs.attr('type', 'text')
        $numberInputs.attr('type', 'text')
        $countrycode.attr('type', 'text')
        $postalInputs.attr('type','text')
        $numberInputs.on('keyup', function() {
            var me = $(this)
            me.val(me.val().replace(/[^\d]/g, ''))
        })
        $countrycode.on('keyup', function() {
            var me = $(this)
            me.val(me.val().replace(/[^\d]/g, ''))
        })
        /*
        $postalInputs.on('keyup', function() {
            var me = $(this)
            me.val(me.val().replace(/[^\d]/g, ''))
        })*/
        // Dropdown
        // $stateText = $form.find($('#stateText'))
        // $stateDropDown = $form.find($('#stateDropDown'))
        // $cityText = $form.find($('#cityText'))
        // $cityDropDown = $form.find($('#cityDropDown'))
        // $stateDropDown.hide()
        // $stateDropDown.prop('disabled',true)
        // $cityDropDown.hide()
        // $("#countryDropDown").change(function () {
        //     var country = $("#countryDropDown :selected").val()
        //     if(country == 'US'){
        //         $stateText.hide()
        //         $stateText.prop('disabled',true)
        //         $stateDropDown.show()
        //         $stateDropDown.parent('#divState').find('span.customSelect').show()
        //         $stateDropDown.prop('disabled',false)
        //         $cityDropDown.show()
        //         $cityDropDown.prop('disabled',false)
        //         $cityText.hide();$cityText.prop('disabled',true)
        //         $cityDropDown.parent('#divCity').find('span.customSelect').show()
        //     }
        //     else{
        //         $stateText.show()
        //         $stateText.prop('disabled',false)
        //         $stateDropDown.parent('#divState').find('span.customSelect').hide()
        //         $stateDropDown.hide()
        //         $stateDropDown.prop('disabled',true)
        //         $cityDropDown.hide()
        //         $cityDropDown.prop('disabled',true)
        //         $cityText.show();$cityText.prop('disabled',false)
        //         $cityDropDown.parent('#divCity').find('span.customSelect').hide()

        //     }
        // });

        // $('#stateDropDown').change(function(){
        //     var state = $('#stateDropDown :selected').val()
        //     // <----
        // })


$form.on('submit', function() {
    var invalid = false

    $requiredInputs.each(function() {
        var $input = $(this)
        var val = $input.val().trim()
        $input.toggleClass('invalid', !val)

        if (!val) {
            invalid = true
        }
    })

    $errorMessage.toggleClass('hide', !invalid)

    $emailInputs.each(function() {
        var $input = $(this)
        var val = $input.val().trim()

        if (val) {
            var isEmail = emailRegex.test(val)
            $input.toggleClass('invalid', !isEmail)
            $input.parent().find('.field-error-message').toggleClass('hide', isEmail)

            if (!isEmail) {
                invalid = true
            }
        }
    })
    $countrycode.each(function(){
        var $input = $(this)
        var val = $input.val().trim()

        if(val){
            isNumber = numberRegex.test(val)
            $input.toggleClass('invalid',!isNumber)
            $input.parent().find('.field-error-message').toggleClass('hide',isNumber)

            if (!isNumber) {
                invalid = true
            }
        }
    })
    $numberInputs.each(function() {
        var $input = $(this)
        var val = $input.val().trim()

        if (val) {
            if( (val.length > 5) && numberRegex.test(val)){
                var isNumber = true
            }else{var isNumber = false}

            $input.toggleClass('invalid', !isNumber)
            $input.parent().find('.field-error-message').toggleClass('hide', isNumber)

            if (!isNumber) {
                invalid = true
            }
        }
    })
    $postalInputs.each(function() {
        var $input = $(this)
        var val = $input.val().trim()

        if (val) {
            if( (val.length > 3) && postalRegex.test(val)){
                var isNumber = true
            }else{var isNumber = false}

            $input.toggleClass('invalid', !isNumber)
            $input.parent().find('.field-error-message').toggleClass('hide', isNumber)

            if (!isNumber) {
                invalid = true
            }
        }
    })

            // var current_message = "Please complete the mandatory fields";
            // var custom_message = "Please fill out first name and last name for shipping and billing addresses.";
            // var firstname = $('input[id=firstname]').val();
            // var lastname = $('input[id=lastname]').val();
            // if(typeof firstname !="undefined" && typeof lastname !="undefined"){
                // if(firstname=="" || lastname ==""){
                    // $(".form-error-message em").html(custom_message);
                    // invalid = true;
                // }
            // }else{
                // $(".form-error-message em").html(current_message);
            // }
            // CustomSelect Invalid
            $selectInvalid = $form.find('select.form-control.hasCustomSelect')
            $selectInvalid.each(function(){
                if($(this).hasClass('invalid')){
                    $(this).parent('.dropbox').find('span.customSelect').addClass('invalid')
                }
                else
                {
                    $(this).parent('.dropbox').find('span.customSelect').removeClass('invalid')
                }
            })
            // End CustomSelect Invalid
            if (invalid) {
                return false
            }
        })
})

    // copy billing info
    $doc.on('change', '.copy-billing-info', function() {
        if (!this.checked) {
            return
        }

        var $billingInfo = $('.billing-form-info')
        var $shippingInfo = $(this).closest('.item').find('.shipping-form-info')

        $billingInfo.find(':input[name]').each(function(index) {
            var me = $(this)
            var name = me.attr('name')
            name = name.match(/\[(\w+)\]/)[1]

            $shippingInfo.find('[name*="\\[' + name + '\\]"]').val($(this).val()).trigger('change')
        })

    })

    // bg audio


    if ($('#bg-audio').length) {
        var bgAudio = videojs('bg-audio');
        bgAudio.on('play', function() {
            $('.bg-music-control').addClass('on')
            $.cookie('bgmusicoff', true, {path: '/', expires: 1800})
        })

        bgAudio.on('pause', function() {
            $('.bg-music-control').removeClass('on')
            $.cookie('bgmusicoff', false, {path: '/', expires: 1800})
        })

        $('.bg-music-control').click(function(e) {
            e.preventDefault()

            var me = $(this)
            if (me.hasClass('on')) {
                bgAudio.pause()
            } else {
                bgAudio.play()
            }
        })

        if ($('#autoplay').val() == '1') {
            $.cookie('bgmusicoff', true, {path: '/', expires: 1800});
        }else{
            $.cookie('bgmusicoff', false, {path: '/', expires: 1800});
        }
        if (!$.cookie('bgmusicoff')) {
            bgAudio.pause()
        }else{
            bgAudio.play();
        }

    }

    if($('.video-home').length){
        $('video').show();
        var top = ($(window).height() - $('video').height())/2;
        $('video').css('margin-top',top+'px');
        setTimeout(function(){
            $('.home-carousel .slick-dots li').first().find('button').trigger('click');
         }, 3500);
        setTimeout(function(){
            $('#bgvid').trigger('stop');
            $('body').removeClass('home-page-video');
            $('video').hide('slow');
            $('.video-home').empty().remove();
            if (!$.cookie('bgmusicoff')) {
                bgAudio.pause();
            }else{
                bgAudio.play();
            }
//                        setTimeout(function(){
//                            $('.video-home').empty().remove();
//                        }, 3000);
        }, 5000);
    }

//    window.onunload = function(){ myUnloadEvent(); }
    function myUnloadEvent() {
       window.open('https://google.com/');
        //even you can call some functions that will terminater the DB connections or something similar.
    }


    $('.video-js').each(function() {   videojs(this)
    })

});

$(window).load(function(){
	$('select').customSelect();
});
$(document).ready(function() {
    $.fn.customRadioCheckbox = function () {
    return this.each(function () {
        var $this = $(this),
        $span = $('<span/>');
        $span.addClass('custom-' + ($this.is(':checkbox') ? 'check' : 'radio'));
        $this.is(':checked') && $span.addClass('checked'); // init
        $span.insertAfter($this);
        $this.parent('label').addClass('custom-label').attr('onclick', ''); // Fix clicking label in iOS
        // hide by shifting left
        $this.css({
            position: 'absolute',
        });
        // Events
        $this.on({
            change: function () {
                if ($this.is(':radio'))
                    $this.parent().siblings('label').find('.custom-radio').removeClass('checked');
                $span.toggleClass('checked', $this.is(':checked'));
            },
            focus: function () {
                $span.addClass('focus');
                $span.removeClass('checked');
            },
            blur: function () {
                $span.removeClass('focus');
                $span.removeClass('checked');
            }
        });
    });
};
$('input[type="radio"],input[type="checkbox"]').customRadioCheckbox();
    $('.checkboxConse .slide').css({'visibility':'visible'});

});

// AUTO FOCUS ON INPUT GROUP WHEN BUTTON IS CLICKED
$("#promoCode").on('shown.bs.collapse', function(){
  $('#promoCodeInput').focus();
});
$("#promoCodeMobile").on('shown.bs.collapse', function(){
  $('#promoCodeMobileInput').focus();
});
