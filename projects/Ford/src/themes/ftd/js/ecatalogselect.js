(function($){

    var eCatalog = function(){

        // declare global variables for tool
        var ecatalog = this,
            toolContainer = $('.ecatalog-select'),
            urls = $('#product-search-data').embeddedData(),
            ajaxError = urls["xhr-product-search-feed-not-available"],
            resetTitle = urls["xhr-product-search-reset-title"],
            ctaTitle = urls["xhr-product-search-call-to-action-title"],
            ctaLink = urls["xhr-product-search-call-to-action-link"],
            selectDefault = urls["xhr-product-search-default-option"],
            dataAjax = function(){
                var dataJSON = urls["xhr-product-search-data"];

                return $.ajax({
                    url: dataJSON
                });
            };

        // setup global ajax settings
        $.ajaxSetup({
            type: "GET",
            cache: true,
            dataType: "json",
            statusCode: {
                404: function() {
                    $('.ajax-loader').remove();
                    $(toolContainer).html('<p class="ajax-error">' + ajaxError + '</p>');
                }
            }
        });

        // adds a new row with label and select elements
        ecatalog.addRow = function(id,value){
            $('.form-wrap', toolContainer).append('<div><label for="select' + id + '" id="label' + id + '">' + value + '</label><select id="select' + id + '"><option value="default">' + selectDefault + '</option></select></div>');
        };

        // reset options of all following select boxes
        ecatalog.resetOptions = function(selectBox){
            $(selectBox).parent().nextAll().find('select option:gt(0)').remove();
        };

        // populate the next select box
        ecatalog.addOptions = function(currentSelect){

            var selectedOptions = new Array(),
                rowCount = $('.form-wrap select', toolContainer).length,
                promise = dataAjax();

            // loop through select box values and create variables i.e. var = select1Val
            for(var i = 0; i < (rowCount); i++) {     
                selectedOptions.push($('select#select' + i + ' option:selected').val());
            }

            promise.success(function (data) {
                var pattern = /[0-9]+/g,
                    currentSelInt = currentSelect.match(pattern),
                    // takes current select id and returns only the integer + 1. i.e. id="select0" = 1, id="select1" = 2
                    currentSelIntPlusOne = parseInt(currentSelInt, 10) + 1;
                    
                $('.ajax-loader').remove();
                
                if (isNaN(currentSelIntPlusOne)) {
                    $.each(data, function(i,item){
                            $('select#select0').append($('<option></option>').val(i).text(i));
                    });
                } else {
                	
                	//find the nested data to show 
                	dataObj = data;
                	for(var i = 0; i < currentSelIntPlusOne; i++) {
                		dataObj = dataObj[selectedOptions[i]];
                	}

                    // if the last row is reached then the copy/text is displayed for that product
                    if (currentSelIntPlusOne === (rowCount)) {
                       
                        if ($('#completed').length === 0) {
                            $('.buttons', toolContainer).before('<div id="completed"></div>');
                        }                            

                        $.each(dataObj, function(i,item) {
                            $('#completed').append('<p>' + item + '</p>');
                        });
                        $('#completed').fadeIn(300);
                    } else {
                        
                        $.each(dataObj, function(i,item){
                            $('select#select' + currentSelIntPlusOne).append($('<option></option>').val(i).text(i));
                        });
                    }
                }
            });
        };

        // enable the next select and assosciated label
        ecatalog.enableNextSelect = function(dropdown) {
            $(dropdown).parent().next().find('select').attr('disabled',false).css('opacity','1');
            $(dropdown).parent().next().find('label').css({opacity:'1',cursor: 'pointer'});
        };

        // disable remaining selects and associated labels when selecting another option
        ecatalog.disableSelects = function(el){
            $(el).parent().next().nextAll().find('select').attr('disabled','disabled').css('opacity','.3');
            $(el).parent().next().nextAll().find('select option[value="default"]').attr('selected','selected');
            $(el).parent().next().nextAll().find('label').css({opacity:'.3',cursor: 'default'});
            if ($('#completed').is(':visible')) { 
                $('#completed').hide().html('');
            }
        };

        // disable remaining selects and associated labels when selecting the default option 'selecciona'
        ecatalog.disableSelects2 = function(el){
            $(el).parent().nextAll().find('select').attr('disabled','disabled').css('opacity','.3');
            $(el).parent().nextAll().find('select option[value="default"]').attr('selected','selected');
            $(el).parent().nextAll().find('label').css({opacity:'.3',cursor: 'default'});
            if ($('#completed').is(':visible')) { 
                $('#completed').hide().html('');
            }
        };

        // reset button function that disables all selects and associated labels (except the first select/label which is just reset)
        ecatalog.resetBtn = function(){
            toolContainer.on('click','.reset-btn',function() {
                var contentDiv = document.getElementById("content");
                function elementInViewport(el) {
                    var rect = el.getBoundingClientRect();
                    return (
                        rect.top >= 0 &&
                        rect.left >= 0 &&
                        rect.bottom <= window.innerHeight &&
                        rect.right <= window.innerWidth 
                        )
                }

                ecatalog.disableSelects2($('select#select0'));
                $('#select0 option[value="default"]').attr('selected','selected');
                if (!elementInViewport(contentDiv)) {
                    $('html,body').animate({scrollTop:$('#content').offset().top}, 300);
                }
            });
        };

        ecatalog.run = function(){

            ecatalog.disableSelects2('select#select0');

            var formWrap = '';
                formWrap += '<div class="form-wrap"></div>';
                productArray = [];
                buttonsDiv = '';
                buttonsDiv += '<div class="group buttons">';
                buttonsDiv += '<a href="' + ctaLink + '" class="buttonright" title="' + ctaTitle + '">' + ctaTitle + '</a>';
                buttonsDiv += '<input class="buttonleft reset-btn" type="reset" title="' + resetTitle + '" value="' + resetTitle + '" />';
                buttonsDiv += '</div>';

            // inject HTML from above declared formWrap variable to create the tool wrapper
            toolContainer.html(formWrap);

            var headersJSON = urls["xhr-product-search-config"],
                currentEl = $(this),
                currentOption = $('option:selected', this).val();
            
            // populate tool with labels and select boxes
            $.ajax({
                url: headersJSON,
                beforeSend: function(){
                    $('body').append('<div class="ajax-loader"></div>');
                },
                success: function(data){
                    $('.ajax-loader').remove();

                    $.each(data.names, function(index,value){
                        if (value != 'content') {
                            ecatalog.addRow(index,value);
                        }
                    });
                }
            });

            var promise = dataAjax();
        
            // populate the first select box with data
            promise.success(function (data) {
                ecatalog.resetOptions('select#select0');
                $.each(data, function(i,item){
                    $('select#select0').append($('<option></option>').val(i).text(i));
                });
                ecatalog.disableSelects2('select#select0');
            });

            // change event handler for all the select boxes
            toolContainer.on('change','select',function() {

                var currentEl = $(this),
                    currentOption = $('option:selected', this).val(),
                    currentSelect = currentEl.attr('id');
                
                    ecatalog.enableNextSelect($(this));

                    // add buttons to bottom of tool after first selection
                    if ($('.group.buttons').length === 0) {
                        toolContainer.append(buttonsDiv);
                        $('.buttons',toolContainer).fadeIn(300);
                    }

                    if (currentOption != 'default') {
                        productArray.push(currentOption);
                        ecatalog.resetOptions(currentEl);
                        ecatalog.disableSelects(currentEl);
                        ecatalog.addOptions(currentSelect);
                    } else {
                        ecatalog.disableSelects2(currentEl);
                    }
               
                ecatalog.resetBtn();
            });
        };

        // run the eCatalog tool
        ecatalog.init = function(){
            ecatalog.run();
        };

    };


    $(document).ready(function(){
        // initialise the eCatalog tool
        if ($('#product-search-data').length > 0) {
            var ecatalog = new eCatalog();
            ecatalog.init();
        }
    });

})(jQuery);