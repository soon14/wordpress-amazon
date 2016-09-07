/*
Doris
*/

(function ($) {
    var widgets = {

        values:{brakefluid:null,collant:null,isComplete:false},

        cappedPriceInit: function () {            

            var urlAllVehicles = instance.serviceLocator('capped.pricevehicles'),
                urlModel = instance.serviceLocator('capped.pricemodel'),
                urlPDF = instance.serviceLocator('capped.pricepdf');

            if (!urlAllVehicles || !urlModel) { return; }

            var markup = $("#cappedprice-template").html();
            $.template("cappedpriceTemplate", markup);
            $.tmpl("cappedpriceTemplate").appendTo($(".widget-cappedPrice .content-inside"));

            $('.widget-cappedPrice .completed').hide();
            $('.widget-cappedPrice .selection').show();
            
            //disable select boxes
            $('.widget-cappedPrice select:not(select:first)').attr('disabled', 'disabled').css('opacity', '.3');

            //get all vehicles
            $('select#yourModel').append("<option class='loading'></option>");
            $.ajax({
                type:"GET",
                url: urlAllVehicles,
                dataType:"json",
                success: function (data) {
                    $('select#yourModel').find('option.loading').remove();
                    $.each(data.vehicles, function (i, item) {
                        var model = item.name;
                        $('select#yourModel').append($('<option></option>').val(model).text(model));
                    });
                }
            });

            //select change event
            $('select#yourModel').bind('change', function () {
                widgets.disableSelects($(this));

                var model = $(this).val(),
                    modelUrl = urlModel.replace('{model}', model);

                //reset 'Style'
                $('select#yourStyle').attr('disabled', false).css('opacity', '1');
                $('select#yourStyle option:not(option:first)').remove();
                $('select#yourStyle').append("<option class='loading'></option>");
                if (model != '') {
                    $.ajax({
                        type: "GET",
                        url: modelUrl,
                        dataType: "json",
                        success: function (data) {
                            $('select#yourStyle').find('option.loading').remove();
                            $.each(data.data.vehicle.style, function (i, item) {
                                var style = item['@id'];
                                $('select#yourStyle').append($('<option></option>').val(i).text(style).attr('id', style));
                            });
                        }
                    });
                }
                else {
                    $('select#yourEngine option:not(option:first)').remove();
                    $('select#yourInterval option:not(option:first)').remove();
                    widgets.disableSelects($(this));
                }
            });

            $('select#yourStyle').bind('change', function () {
                widgets.disableSelects($(this));

                var model = $('select#yourModel option:selected').val(),
                    modelUrl = urlModel.replace('{model}', model),
                    style = $(this).val();

                //reset engine
                $('select#yourEngine').attr('disabled', false).css('opacity', '1');
                $('select#yourEngine option:not(option:first)').remove();
                $('select#yourEngine').append("<option class='loading'></option>");
                if (style != '') {
                    $.ajax({
                        type: "GET",
                        url: modelUrl,
                        dataType: "json",
                        success: function (data) {
                            $('select#yourEngine').find('option.loading').remove();
                            var engines = data.data.vehicle.style[style].engine;
                            $.each(engines, function (i, item) {
                                var en = item['@id'];
                                $('select#yourEngine').append($('<option></option>').val(i).text(en).attr('id', en));
                            });
                        }
                    });
                }
                else {
                    $('select#yourInterval option:not(option:first)').remove();
                    widgets.disableSelects($(this));
                }
            });

            $('select#yourEngine').bind('change', function () {
                widgets.disableSelects($(this));

                var model = $('select#yourModel option:selected').val(),
                    modelUrl = urlModel.replace('{model}', model),
                    style = $('select#yourStyle option:selected').val(),
                    engine = $(this).val();

                //reset interval
                $('select#yourInterval').attr('disabled', false).css('opacity', '1');
                $('select#yourInterval option:not(option:first)').remove();
                $('select#yourInterval').append("<option class='loading'></option>");
                if (engine != '') {
                    $.ajax({
                        type: "GET",
                        url: modelUrl,
                        dataType: "json",
                        success: function (data) {
                            $('select#yourInterval').find('option.loading').remove();
                            var engineObj = data.data.vehicle.style[style].engine[engine],
                                curInterval = engineObj.summary_descriptions,
                                curSummary = engineObj.summary,
                                curBrake = engineObj.summary.brakefluid,
                                curCoolant = engineObj.summary.coolant,
                                curService = engineObj['@service_type'];
                            var options = [];

                            (curService === 'a') ? $('span.service-length').html('12') : $('span.service-length').html('6');

                            $.each(curInterval, function (i, item) {
                                if (item != '') {
                                    options.push({
                                        val: item,
                                        parseVal: parseInt(item, 10),
                                        id: i,
                                        rel: curSummary[i],
                                        text: item
                                    });
                                }
                            });
                            options.sort(function (a, b) {
                                return a.parseVal - b.parseVal;
                            });
                            $.each(options, function (k, opt) {
                                $('select#yourInterval').append($('<option></option>').val(opt.val).text(opt.text).attr({'rel':opt.rel,'id':opt.id}));
                            });

                            //$.each(curInterval, function (i, item) {
                            //    var interval = item;
                            //    if (interval != '') {
                            //        $('select#yourInterval').append($('<option></option>').val(interval).text(interval).attr({ 'rel': curSummary[i], 'id': i }));
                            //    }
                            //});

                            widgets.values.brakefluid = curBrake;
                            widgets.values.collant = curCoolant;

                        }
                    });
                }
                else {
                    widgets.disableSelects($(this));
                }
            });

            $('select#yourInterval').bind('change', function () {
                var model = $('select#yourModel option:selected').val(),
                    encodedModel = encodeURIComponent(model),
                    style = $('select#yourStyle option:selected').attr('id'),
                    encodedStyle = encodeURIComponent(style),
                    engine = $('select#yourEngine option:selected').attr('id'),
                    encodedEngine = encodeURIComponent(engine),
                    interval = $(this).val(),
                    months = $('select#yourInterval option:selected').attr('id'),
                    pdfurl = urlPDF.replace('{model}', encodedModel).replace('{style}', encodedStyle).replace('{engine}', encodedEngine).replace('{months}', months).replace(/\s/g, "%20");

                if (months != '') {
                    $('span.valid-date').html(Date.today().addDays(30).toString('dd-MM-yyyy'));
                    $('span.capped-price span').html($('select#yourInterval option:selected').attr('rel'));
                    $('a.print-pdf-btn').attr('href', pdfurl);
                    var intervalNoSpace = interval.replace(/\s/g, "");
                    $('span.interval').html(intervalNoSpace);
                    //$('.widget-cappedPrice .completed').fadeIn(300);
                    //$('.widget-cappedPrice .selection').fadeOut(300);
                    $('.widget-cappedPrice .completed').show();
                    $('.widget-cappedPrice .selection').hide();
                    widgets.values.isComplete = true;
                    if (!instance.isMobile()) {
                        instance.widgetsInit();
                    }
                }
                else {
                    //$('.widget-cappedPrice .completed').fadeOut(300);
                    $('.widget-cappedPrice .completed').hide();
                }
            });

            $('.btn.start-over-btn').bind('click', function (e) {
                e.preventDefault();
                widgets.disableSelects($('select#yourModel'));
                $('select#yourModel').val('');
                $('select#yourStyle').val('');
                $('select#yourEngine').val('');
                $('select#yourInterval').val('');
            });

            //$('.btn.open-popup').bind('click', function (e) {
            //    e.preventDefault();
            //    $("#terms-conditions-content").foundation('reveal', 'open', {
            //        animationSpeed: 110
            //    });
            //});

            //$("#terms-conditions-content .close-reveal-modal, .reveal-modal-bg").live("click", function (e) {
            //    e.preventDefault();
            //    $('#terms-conditions-content').foundation('reveal', 'close');
            //});
            
        },

        disableSelects: function (div) {
            //disable remaining selects
            $(div).parent().parent().nextAll().find('select').attr('disabled', 'disabled').css('opacity', '.3');
            if ($('.widget-cappedPrice .selection').is(':hidden')) {
                //$('.widget-cappedPrice .selection').fadeIn(300);
                $('.widget-cappedPrice .selection').show();
            }
            if ($('.widget-cappedPrice .completed').is(':visible')) {
                //$('.widget-cappedPrice .completed').fadeOut(300, function () {
                //    if (!instance.isMobile()) {
                //        instance.widgetsInit();
                //    }
                //});
                $('.widget-cappedPrice .completed').hide();
                if (!instance.isMobile()) {
                    instance.widgetsInit();
                }
            }
            widgets.values.isComplete = false;
        },

        updateDealerOverlay: function () {
            $('.cappedPrice-overlay #extra-costs').hide();
            if (widgets.values.isComplete) {
                $('.cappedPrice-overlay span.brakefluid').html(widgets.values.brakefluid);
                $('.cappedPrice-overlay span.coolant').html(widgets.values.collant);
                $('.cappedPrice-overlay #extra-costs').show();
            }
        }

    };

    $(function () {

        if (!$(".cappedPrice.content-inside").size()) { return; }
        
        widgets.cappedPriceInit();

        $(".widget-cappedPrice .fullscreen-overlay").fullScreenOverlay({
            complete: function () {
                widgets.updateDealerOverlay();                
            }
        });
       
    });
})(jQuery);