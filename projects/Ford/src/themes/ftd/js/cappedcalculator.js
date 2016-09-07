$(function() {

    var cappedPriceCalc = function() {

    	//load configuration from template and get the urls ready
    	var urls = $('#capped-price-services').embeddedData();
    	var siteConfig = $('#common-config').embeddedData();
    	var selectTexts = $('#capped-price-text').embeddedData();
    	
    	var urlAllVehicles = urls['cps.allvehicles'],
    		urlModel = urls['cps.model'],
    		urlPdf = urls['cps.pdf'];
    		
    	var site = siteConfig.site;
    	urlAllVehicles = urlAllVehicles.replace('{site}', site);
    	urlModel = urlModel.replace('{site}', site);
    	urlPdf = urlPdf.replace('{site}', site);
    	
    	var selectStyle= selectTexts['select.style.text'] || "Select Style",
    	selectEngine = selectTexts['select.engine.text'] ||"Select Engine",
    	selectInterval = selectTexts['select.interval.text'] ||"Select Interval";
    	
    	// disable select boxes and labels
    	$('.capped-calculator select:not(select:first)').attr('disabled','disabled').css('opacity','.3');
    	$('.capped-calculator label:not(label:first)').css({opacity:'.3',cursor: 'default'});

        // hide brake fluid and coolant text
        $('#extra-costs').hide();

        var disableSelects = function(div) {
            // disable remaining select boxes and labels
            $(div).parent().nextAll().find('select').attr('disabled','disabled').css('opacity','.3');
            $(div).parent().nextAll().find('label').css({opacity:'.3',cursor: 'default'});
            if ($('#completed').is(':visible')) { 
                $('#completed').fadeOut(300);
                $('#extra-costs').fadeOut(300);
                $('#completed-buttons').fadeOut(300);
            }
        };

        // setup global ajax settings
        $.ajaxSetup({
            type: "GET",
            dataType: "json",
            cache: true,
            statusCode: {
                404: function() {
                    $('.capped-calculator').html('<p class="ajax-error">The capped price servicing calculator is currently offline.</p>');
                }
            }

        });

    	$.ajax({
            url: urlAllVehicles,
            success: function(data){
                
                $.each(data.vehicles, function(i,item){

                    var model = item.name;
                    $('select#model').append($('<option></option>').val(model).text(model));

                });

            }
           
        });

        $('select#model').bind('change',function() {

            disableSelects($(this));

            var model = $(this).val(),
                url = urlModel.replace('{model}', model);
            
            $('.capped-calculator select#style').attr('disabled',false).css('opacity','1');
            $('.capped-calculator select#style').prev('label').css({opacity:'1',cursor: 'pointer'});

            // reset 'Select your style' select box
            $('select#style option').remove();

            if (model != 'default') {
                $.ajax({
                    url: url,
                    success: function(data){

                        $('select#style').append($('<option value="default"></option>').text(selectStyle));
                        $('select#engine').val($('select#engine option:first').val());
                        $('select#interval').val($('select#interval option:first').val());

                        $.each(data.data.vehicle.style, function(i,value){
                           
                            var style = value['@id'];

                            // populate 'Select your style' select box
                            $('select#style').append($('<option></option>').val(i).text(style).attr('id',style));
                        });

                    }
                });
            } else {
                $('select#style').append($('<option value="default">'+selectStyle+'</option>'));
                $('select#engine option').remove();
                $('select#engine').append($('<option value="default">'+selectEngine+'</option>'));
                $('select#interval option').remove();
                $('select#interval').append($('<option value="default">'+selectInterval+'</option>'));
                disableSelects($(this));
            }

        });

        $('select#style').bind('change',function() {

            disableSelects($(this));
            
            var model = $('select#model option:selected').val(),
                url = urlModel.replace('{model}', model),
                currentStyle = $('select#style option:selected').val(),
                currentSelect = $(this).val();

            $('.capped-calculator select#engine').attr('disabled',false).css('opacity','1');
            $('.capped-calculator select#engine').prev('label').css({opacity:'1',cursor: 'pointer'});

            // reset 'Select your engine' select box
            $('select#engine option').remove();

            if (currentSelect != 'default') {
                $.ajax({
                    url: url,
                    success: function(data){    

                        $('select#engine').append($('<option value="default"></option>').text(selectEngine));
                        $('select#interval').val($('select#interval option:first').val());

                        var currentEngine = data.data.vehicle.style[currentStyle].engine;

                        $.each(currentEngine, function(i,value){

                            var engine = this['@id'];

                            // populate 'Select your engine' select box
                            $('select#engine').append($('<option></option>').val(i).text(engine).attr('id',engine));
                        });

                    }
                });
            } else {
                $('select#engine').append($('<option value="default">'+selectEngine+'</option>'));
                $('select#interval').append($('<option value="default">'+selectInterval+'</option>'));
                $('select#interval option').remove();
                $('select#interval').append($('<option value="default">'+selectInterval+'</option>'));
                disableSelects($(this));
            }

        });

        $('select#engine').bind('change',function() {

            disableSelects($(this));
            
            var model = $('select#model option:selected').val(),
                url = urlModel.replace('{model}', model),
                currentStyle = $('select#style option:selected').val(),
                currentEngine = $('select#engine option:selected').val(),
                currentSelect = $(this).val();

            $('.capped-calculator select#interval').attr('disabled',false).css('opacity','1');
            $('.capped-calculator select#interval').prev('label').css({opacity:'1',cursor: 'pointer'});

            // reset 'Select your interval' select box
            $('select#interval option').remove();

            if (currentSelect != 'default') {
                $.ajax({
                    url: url,
                    success: function(data){    

                        $('select#interval').append($('<option value="default" rel="default" id="default"></option>').text(selectInterval));

                        var engineObj =  data.data.vehicle.style[currentStyle].engine[currentEngine],
                            currentInterval = engineObj.summary_descriptions,
                            currentSummary = engineObj.summary,
                            currentBrake = engineObj.summary.brakefluid,
                            currentCoolant = engineObj.summary.coolant,
                            currentService = engineObj['@service_type'];
                            
                        (currentService === 'a') ? $('span.service-length').html('12') : $('span.service-length').html('6');

                        $('.brakefluid').html(currentBrake);
                        $('.coolant').html(currentCoolant);

                        $.each(currentInterval, function(i,value){

                            var interval = value;

                            if (value !== '') {
                                // populate 'Select your interval' select box
                                $('select#interval').append($('<option></option>').val(interval).text(interval).attr({'rel':currentSummary[i],'id':i}));
                            }


                        });


                        // sort Select Interval options numerically
                        var $dd = $('select#interval');
                        if ($dd.length > 0) { // make sure we found the select we were looking for

                            // save the selected value
                            var selectedVal = $dd.val();

                            // get the options and loop through them
                            var $options = $('option', $dd);
                            var arrVals = [];
                            $options.each(function(){

                                // push each option value and text into an array
                                arrVals.push({
                                    val: parseInt($(this).val(), 10),
                                    id: $(this).attr('id'),
                                    rel: $(this).attr('rel'),
                                    text: $(this).text()
                                });
                                    

                            });

                            // sort the array by the value (change val to text to sort by text instead)
                            arrVals.sort(function(a, b){
                                return a.val - b.val;
                            });

                            // loop through the sorted array and set the text/values to the options
                            for (var i = 0, l = arrVals.length; i < l; i++) {
                                $($options[i]).val(arrVals[i].val).text(arrVals[i].text).attr('id', arrVals[i].id).attr('rel', arrVals[i].rel);
                            }

                            // set the selected value back
                            $dd.val(selectedVal);
                        }


                    }
                });
            } else {
                $('select#interval').append($('<option value="default" rel="default" id="default">'+selectInterval+'</option>'));
                disableSelects($(this));
            }

        });

        $('select#interval').bind('change',function() {

            var model = $('select#model option:selected').val(), 
                encodedModel = encodeURIComponent(model),
                style = $('select#style option:selected').attr('id'),
                encodedStyle = encodeURIComponent(style),
                engine = $('select#engine option:selected').attr('id'),
                encodedEngine = encodeURIComponent(engine),
                interval = $('select#interval option:selected').text(),
                months = $('select#interval option:selected').attr('id'),
                
                
                url = urlPdf.replace('{model}', encodedModel);
            	url = url.replace('{style}', encodedStyle);
            	url = url.replace('{engine}', encodedEngine);
            	url = url.replace('{months}', months);
                
            	url = url.replace(/\s/g, "%20");

                if (months != 'default') {

                    // display quote valid date
                    $('span.valid-date').html(Date.today().addDays(30).toString('dd-MM-yyyy'));
                    // displayed capped price
                    $('span.capped-price').html($('select#interval option:selected').attr('rel'));
                    // add URL to PDF link
                    $('#print-pdf').attr('href', url);

                    // view extras - brake fluid and coolant charges
                    $('#extra-costs').fadeIn(300);

                    var intervalNoSpace = interval.replace(/\s/g, "");
                    //var intervalRemoveS = intervalNoSpace.replace(/[s]/g, "");
                    $('span.interval').html(intervalNoSpace);

                    $('#completed').fadeIn(300);
                    $('#completed-buttons').fadeIn(300);

                    // reload page when clicked
                    $('.btn-start').bind('click',function(e) {
                        e.preventDefault();

                        // disable select boxes and labels
                        $(this).parent().parent().find('.capped-calculator').children(':not(:first)').find('select').attr('disabled','disabled').css('opacity','.3');
                        $(this).parent().parent().find('.capped-calculator').children(':not(:first)').find('label').css({opacity:'.3',cursor: 'default'});
                        $('#completed').fadeOut(300);
                        $('#extra-costs').fadeOut(300);
                        $('#completed-buttons').fadeOut(300,function() {
                            $('html,body').animate({scrollTop:$('#content').offset().top}, 300);
                            $('select#model').val($('select#model option:first').val());
                            $('select#style').val($('select#style option:first').val());
                            $('select#engine').val($('select#engine option:first').val());
                            $('select#interval').val($('select#interval option:first').val());
                        });
                    });
                } else {
                    $('#completed').fadeOut(300);
                    $('#completed-buttons').fadeOut(300);
                }         
        });
    };

    if ($('.capped-calculator').length > 0) {
        cappedPriceCalc();
    }

});