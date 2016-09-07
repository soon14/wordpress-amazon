/*
 Author: jbao, gdelmundo
 File name: moduleModalWalk.js
 Description:
 control the first page of modal walk, use moduleModalCompare.js to render the second page.

 Useful Functions:
    guxApp.ModelWalk.resetVehicleSelection()
     - This will reset all the vehicle selection and unbind all the ModelWalk Events.
    guxApp.ModelWalk.registerListeners()
     - This will bind all the event listeners used in modelwalk.
    
 */

var guxApp = guxApp || {};

(function($){
    $(function(){
        var configInfo = guxApp.tools.commonConfigData(),
            modelWalkConfig = guxApp.tools.getEmbeddedData('#modelwalk-config'),
            site = (configInfo != null && configInfo.site) ? configInfo.site : null,
            formattedDate = (modelWalkConfig != null && modelWalkConfig.formattedDate) ? modelWalkConfig.formattedDate : null,
            modelData = (modelWalkConfig != null && modelWalkConfig.modelData) ? modelWalkConfig.modelData : null,
            imageUrl = (modelWalkConfig != null && modelWalkConfig.imageUrl)? modelWalkConfig.imageUrl : null,
            selectMsg = (modelWalkConfig != null && modelWalkConfig.selectMsg)? modelWalkConfig.selectMsg : null,
            compareMsg = (modelWalkConfig != null && modelWalkConfig.compareMsg)? modelWalkConfig.compareMsg : null,
            derivativeUrl = (modelWalkConfig != null && modelWalkConfig.derivativeUrl)? modelWalkConfig.derivativeUrl : null,
            overlayUrl = (modelWalkConfig != null && modelWalkConfig.overlayUrl)? modelWalkConfig.overlayUrl : null;

        var getFormattedDate = function(){
            var today = new Date(),
                yyyy = today.getFullYear(),
                mm = ('0' + (today.getMonth() + 1)).slice(-2),
                dd = ('0' + today.getDate()).slice(-2);
            return yyyy + mm + dd;
        };

        guxApp.ModelWalk = {
            init: function(){
                var container = $(".model-walk");
                if (!container.length) {return;}

                this.equalizeModelHeight();
                this.initConfig();
                this.initDetails(container);
                this.modifySize();
                this.fetchDate();
                this.preSelectModel();
                this.resizeModelHandler();
                this.showCheckbox();
                this.initState();
                this.setAllowModelMsg();
                this.initPriceFormat();
            },
            initState: function(){
                if($('section.model-walk').length > 0 && $('section.model-walk.model-enhance').length === 0){
                    window.onpopstate = undefined;
                    $.bbq.pushState({
                        "step": 1
                    })
                }
            },
            initPriceFormat: function(){
                if ($('#mpz-config').length && modelWalkConfig){
                    var priceFormatOptions = $('#mpz-config').embeddedData();

                    guxApp.priceFormatter.initialise({
                        data: priceFormatOptions.priceFormat,
                        formatString: modelWalkConfig.formattedPrice,
                        centsSeparator: priceFormatOptions.monetaryDecimalSeparator,
                        thousandsSeparator: priceFormatOptions.groupingSeparator
                    });
                }
            },
            preSelectModel: function(){
				var parameters=window.location.search.substr(1).match(/(^|&)itemid=([^&]*)(&|$)/i);
                var itemId = !!parameters&&parameters.length>2?parameters[2]:'';
                var $checkBox = $('.model-walk .model-select input[data-modelnum="'+itemId+'"]');
                $checkBox.click();
            },
            modifySize: function(){
                var width = $(window).width();
                if(width >= 768){
                    this.config.allowedModels = 3;
                } else{
                    this.config.allowedModels = 2;
                }
            },
            fetchDate: function(){
                if(formattedDate != null) {
                    formattedDate = formattedDate.replace('{site}', guxApp.tools.encode(site));
                    formattedDate = formattedDate.replace('{yyyyMMdd}', getFormattedDate());
                    var self = this;
                    $.ajax({
                        url: formattedDate,
                        type: "GET",
                        dataType: "json"
                    }).done(function (data) {
                        self.config.formattedDate = data['formatted-date'];
                        $('.priceDate').html(self.config.formattedDate);
                    }).fail(function(xhr, textStatus){
                        if(textStatus == "timeout"){
                            throw new Error(textStatus, "Fetch Date timeout");
                        } else if (xhr.status == 500){
                            throw new Error(xhr.status, "Server error when fetching Date");
                        }
                    });
                }
            },
            initConfig: function(){
                var totalModelNum = $('.model-walk .uniform .model-container').length;
                this.config = {
                    site: site,
                    formattedDate: formattedDate,
                    derivativeUrl: derivativeUrl,
                    modelData: modelData,
                    imageUrl: imageUrl,
                    selectedModels: [],
                    allowedModels: 3,
                    selectMsg: selectMsg,
                    totalModelNum: totalModelNum,
                    overlayUrl: overlayUrl
                };
            },
            registerListeners: function(){
                var self = this,
                    eventHandler = guxApp.tools.isIOS()?'click tap':'click';
                    
                $(window).resize(function(){
                    self.modifySize.call(self);
                });


                $(window).unbind('hashchange').bind('hashchange', function(){
                    var step = $.bbq.getState("step");
                    if(step === '1'){
                        guxApp.ModelCompare.clearModel();
                        guxApp.ModelWalk.resetVehicleSelection();
                        //Reattach Events after Pressing Back
                        self.registerListeners();
                    }else if(step === '2'){
                        $('.model-walk').hide();
                        guxApp.ModelCompare.init(self.config);
                    }
                });
                $('#modalModel .model-data,.model-walk .model-data').on(eventHandler,function(event){
                    if($(this).hasClass('selected') && $(this).closest('#modalModel').length > 0){
                        return false;
                    }else if(!$(event.target).data('disclosure') && ($(event.target).closest('.inner-popup.active').length === 0) ){
                        $(this).find('input[type="checkbox"]').click();
                    }

                });
                $('.select-models button').click(function(){
                    $('.model-walk').hide();

                    $.bbq.pushState({
                        "step": 2
                    });
                });
                $('.model-select input').on('click.modelwalk',function(event){
                    event.stopPropagation();
                    var $modelModalElem = $(this).closest('#modalModel');
                    var $modelContainer = $(this).closest('.model-container .model-data');
                    if($(this).prop('checked') === true){
                        $modelContainer.addClass('selected');
                    }else{
                        $modelContainer.removeClass('selected');
                    }
                    


                    var model = $(this).data('modelnum');
                    if($modelModalElem.length > 0 && $modelModalElem.hasClass('change')){
                        var originId = $modelModalElem.data('originid');
                        self.changeModel(originId, model);
                    }else if (self.config.selectedModels.indexOf(model) != -1){
                        self.removeModel($(this), model);
                    } else {
                        if (self.config.selectedModels.indexOf(model) != -1 && self.config.selectedModels.length > self.config.allowedModels){
                            self.removeModel($(this), model);
                        } else {
                            if (self.config.selectedModels.length < self.config.allowedModels){
                                self.addModel(model);
                            }
                        }
                    }

                    //Override !important Styling for Select Models
                    if(self.config.selectedModels.length == 0){
                        $('.allowed-models').addClass('ready');
                    } else {
                        $('.allowed-models').removeClass('ready');
                    }
                });

            },
            resetVehicleSelection: function(){
                var self = this;

                guxApp.ModelCompare.clearModel();
                $('.model-walk').show();
                $('.compareContent').children().remove();
                $(window).unbind('scroll', guxApp.ModelCompare.compareStickyHeader);
                $(window).unbind('scroll', guxApp.ModelCompare.stickyHeaderListener);  
                $(window).unbind('resize', guxApp.ModelCompare.resizeModelHandler);
                
                var selectedModels = self.config.selectedModels.slice(0);
                self.config.selectedModels = [];
                var checkbox = $('.model-walk form.uniform .model-select input');
                checkbox.prop('checked', false);
                checkbox.removeAttr('disabled');
                checkbox.closest('.model-select').removeClass('disabled');
                $('.model-walk .model-container .model-data').removeClass('selected');
                $(".model-walk .model-container .model-data span[class='checked']").removeClass('checked');
                $('.model-walk form.uniform .model-container').show();

                for(var index = 0; index < selectedModels.length; index++){
                    var model_id = selectedModels[index];
                    $('.model-walk .model-container .model-select input[data-modelnum="'+model_id+'"]').click();
                }
                //Retriggering fix for IOS devices; This will retrigger click for the first index of selectedModels
                if(guxApp.tools.isIOS()){
                    $('.model-walk .model-container .model-select input[data-modelnum="'+selectedModels[0]+'"]').click();
                }

                //Remove Event Listeners
                // $(window).unbind('hashchange');
                $('#modalModel .model-data,.model-walk .model-data').off('click tap');
                $('.select-models button').off('click');
                $('.model-select input').off('click.modelwalk');
            },
            changeModel: function(originId, newId){
                var index = this.config.selectedModels.indexOf(originId);
                this.config.selectedModels.splice(index, 1, newId);
                guxApp.ModelCompare.updateCompareModels(this.config.selectedModels);
            },
            removeModel: function($elem, model){
                var index = this.config.selectedModels.indexOf(model);
                this.config.selectedModels.splice(index, 1);
                this.setAllowModelMsg();
                guxApp.ModelCompare.updateCompareModels(this.config.selectedModels);

                var selectedModels = $elem.closest('.model-data');
                for(var i = 0; i < selectedModels.length; i++){
                    var modelContainer = $(selectedModels[i]);
                    modelContainer.removeClass('selected');
                    modelContainer.find("span[class='checked']").removeClass('checked');
                }
                if(this.config.selectedModels.length < 2){
                    $('.select-models button').removeClass('ready').attr("disabled","disabled");
                    $('.select-models .mobile-button .ui-btn').addClass('ui-disabled');
                }
                if(this.config.selectedModels.length === (this.config.allowedModels - 1)){
                    var uncheckedItem = $('form.uniform .model-select input:not(:checked)');
                    uncheckedItem.removeAttr('disabled');
                    uncheckedItem.removeData("disabled");
                    uncheckedItem.closest('.model-select').removeClass('disabled');
                }
            },
            addModel: function(model){
                this.config.selectedModels.push(model);
                guxApp.ModelCompare.updateCompareModels(this.config.selectedModels);
                this.setAllowModelMsg();
                if(this.config.selectedModels.length >= 2){
                    $('.select-models button').addClass('ready').removeAttr('disabled').removeData("disabled");
                    $('.select-models .mobile-button .ui-btn').removeClass('ui-disabled');
                }
                if(this.config.selectedModels.length === this.config.allowedModels){
                    var uncheckedItem = $('form.uniform .model-select input:not(:checked)');
                    uncheckedItem.attr('disabled','disabled');
                    uncheckedItem.closest('.model-select').addClass('disabled');
                }
            },
            setAllowModelMsg: function(){
               // if (!selectMsg.length) return;

                var $allowMsgElem = $('.allowed-models');
                var $pluralMsgElem = $('.pluralize-models');
                var $compBtnLabel = $('.select-models .mw-compare-sticky h3');
                var msg = '';
                
                if(this.config.selectedModels.length === 0){
                    msg = this.config.allowedModels;
                    if(this.config.totalModelNum < this.config.allowedModels){
                        msg = this.config.totalModelNum;
                    }
                    $pluralMsgElem.hide();
                    $allowMsgElem.show().find('span').html(msg);
                    msg = selectMsg["other"].replace(/{}/, msg);
                    $compBtnLabel.html($allowMsgElem.html());
                }else{
                    var numToSelect = this.config.allowedModels - this.config.selectedModels.length;
                    if(this.config.totalModelNum < this.config.allowedModels){
                        numToSelect = this.config.totalModelNum - this.config.selectedModels.length;
                    }
                    switch(numToSelect){
                        case 0:
                            msg = selectMsg["zero"];
                            break;
                        case 1:
                            msg = selectMsg["one"];
                            break;
                        default:
                            msg = selectMsg["other"];
                            msg = msg.replace(/{}/, numToSelect);
                            break;
                    }
                    $allowMsgElem.hide();
                    $pluralMsgElem.html(msg).show();
                    $compBtnLabel.html(msg);
                }
                if(guxApp.viewport.view === "mobile"){
                    if($('.mw-compare-sticky .hide-for-large-up .ui-btn-text').length > 0){
                        $('.mw-compare-sticky .hide-for-large-up .ui-btn-text').html(msg);
                    }else{
                        $('.mw-compare-sticky .hide-for-large-up button').html(msg);
                    }
                }
            },
            showCheckbox: function(){
                $('input[type="checkbox"]').css('visibility','visible');
            },
            equalizeModelHeight: function(){
                var addedRow = $('.model-walk .added-row');

                if($(addedRow)){
                    addedRow.contents().unwrap();
                }

                var width = $(window).width(),
                    modelElem = $('.model-walk .mw-content .select-models .model-container');

                if(width >= 980){
                    guxApp.ModelWalk.addRowPerGroup(modelElem,4);
                } else if(width >= 750) {
                    guxApp.ModelWalk.addRowPerGroup(modelElem,3);
                }
            },
            addRowPerGroup: function(elem,numOfDivs){
                for(var i = 0; i < elem.length; i+=numOfDivs) {
                  elem.slice(i, i+numOfDivs).wrapAll("<div class='row added-row'></div>");
                }
            },
            resizeModelHandler: function(){
                $(window).on('resize',this.equalizeModelHeight);
                
            },
            //Initialize Model Details Function in the Model Walk if the 'alt' is published
            initDetails: function(container){
                //Cache the mostly used elements
                var self = this,
                    ready = true,
                    smobCompare = $('.mw-wrapper .smob-compare-init',container),
                    smobCancel = $('.mw-wrapper .smob-compare-cancel',container),
                    compareInit = $('.mw-wrapper .compare-init',container),
                    allowedModelsElem = $('.mw-wrapper .allowed-models',container);

                //Register Button Events if 'alt' class is published. If not, skip the unecessary events.
                if(container.hasClass('alt')){
                    container.find('.model-data').addClass('ready');
                    $('.mw-wrapper .compare-init,.mw-wrapper .smob-compare-init',container).click(function(e){
                        var elem = this;
                        
                        allowedModelsElem.toggleClass('ready');
                        // Toggle Ready and Selection State; 
                        if(ready){
                            self.toggleModelDetails(container,elem);
                            self.registerListeners();
                            // Change state of mobile controls
                            smobCancel.show();
                            smobCompare.hide();
                        } else {
                            self.resetVehicleSelection();
                            self.resetVehicleSelection();
                            self.resetVehicleSelection();
                            self.toggleModelDetails(container,elem);
                            $('.select-models button').removeClass('ready').attr("disabled","disabled");
                            $('.select-models .mobile-button .ui-btn').addClass('ui-disabled');                            
                            // Change state of mobile controls
                            smobCompare.show();
                            smobCancel.hide();
                            // Hide Allowed Model Message
                            $('.allowed-models').hide().removeClass('ready');
                            $('.pluralize-models').hide();
                        }

                        ready = !ready;
                    });

                    //Added an event that prevents the clicking to transfer in model detail page
                    $('.select-models .model-select a, .select-models .model-placeholder a',container).click(function(e){
                        if(!ready){
                            e.preventDefault();
                        }
                    });

                    //Added Event Listeners to mobile buttons
                    smobCompare.click(function(){
                        $(this).hide();
                        $('.mw-wrapper .smob-compare-cancel',container).show();
                        //Change State of LargeUp Compare Button
                        compareInit.toggleClass('alt');
                        $('span',compareInit).toggle();
                    });

                    smobCancel.click(function(e){
                        $(this).hide();
                        $('.smob-compare-init',container).show();
                        self.resetVehicleSelection();
                        self.resetVehicleSelection();
                        self.resetVehicleSelection();
                        self.toggleModelDetails(container);
                        $('.select-models button').removeClass('ready').attr("disabled","disabled");
                        $('.select-models .mobile-button .ui-btn').addClass('ui-disabled');
                        //Change State of LargeUp Compare Button
                        compareInit.toggleClass('alt');
                        $('span',compareInit).toggle();

                        // Hide Allowed Model Message
                        $('.allowed-models').hide().removeClass('ready');
                        $('.pluralize-models').hide();

                        ready = !ready;
                    });

                } else {
                    $('.smob-compare-init, .smob-compare-cancel, .compare-init').attr('style', 'display: none !important');
                    this.registerListeners();
                }

                

            },
            //Toggle the elements to Ready|Selection state
            toggleModelDetails: function(container,elem){
                 var vehicleSelection = container.find('.model-data');
                        
                    vehicleSelection.toggleClass('ready');
                    //Hide the standard features and paragraphs for every model tile
                    vehicleSelection.find('.model-content p:not(".price"),.standard-features').slideToggle();
                    if(guxApp.viewport.view == "tablet"){
                        $(elem).toggleClass('alt');
                        $('span',elem).toggle();
                    }

                    $('.mw-wrapper .mw-compare-sticky',container).toggle();
            }
        }
        guxApp.ModelWalk.init();
    });

})(jQuery);