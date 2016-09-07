/*
 Author: jbao
 File name: moduleModalCompare.js
 Description:
 This is the second view of model walk page, controlled by moduleModalWalk.js
 */
var guxApp = guxApp || {};



(function($){

    guxApp.ModelCompare = {
        init: function(config){
            this._initial = true;
            this._isDifferencesChecked = false;
            this.initModel(config);
            this.fetchModel();
            this.registerListeners();
            this.recalcSticky();
            this.equalizeModelHeight();
            this.resizeModelHandler();
        },
        registerListeners: function(){
            this.compareByDiffListener();
            this.popupDlgListener();
            this.closeOverlayListener();
            this.stickyHeaderListener();
            this.accordionTabListener();
            this.removeModelListener();
            this.addBackBtnListener();
        },
        addBackBtnListener: function(){
            var self = this;

            $('.model-back').live('click',function(){
                $('.need-price').html('');
                guxApp.polk.launched = false;
                $.bbq.pushState({"step": 1});
                guxApp.ModelWalk.fetchDate();
            });
        },
        clearModel: function(){
            this.config = undefined;
        },
        removeModelListener: function(){
            var self = this;
            $('.model-hero .icon-remove').live('click',function(){
                self._initial = false;
                var model = $(this).data("derivativeid");
                var index = self.config.selectedModels.indexOf(model);
                if(index > -1){
                    self.config.selectedModels.splice(index, 1);    
                }
                self.fetchModel();
            });
        },
        updateCompareModels: function(selectedModels){
            $('#modalModel .cancelDlg').click();
            if(this.config){
                this.config.selectedModels = selectedModels;
                this.fetchModel();
            }
        },
        renderHtml: function(){
            var $elem = $('.compareContent');
            var compareHtml = $('#compareTmpl');
            var template = _.template(compareHtml.html());
            var compiledHtml = template({
                site: this.config.site,
                selectedModels: this.config.selectedModels,
                formattedDate: this.config.formattedDate,
                compareModels: this.config.compareModels,
                imageUrl: this.config.imageUrl,
                derivativeUrl: this.config.derivativeUrl,
                groups: this.config.groups,
                allowedModels: this.config.allowedModels,
                totalModelNum: this.config.totalModelNum,
                displayFeature: this.displayFeature,
                overlayUrl: this.config.overlayUrl
            });
            $elem.html(compiledHtml);
            Foundation.libs.equalizer.init();
            
            // re-initiate polk pricing
            ND.CalcPrice.init();
            guxApp.mediaOverlay.init();

            //this._equalizeElemHeight($('.model-compare .mw-content .model-hero .model-container .model-data .model-content ul li').filter(':eq(2), :eq(5), :eq(8)'));
            this._equalizeElemHeight($('.model-compare .mw-content .model-hero .model-container .model-data .model-content ul li'));
            this._equalizeElemHeight($('.model-compare .mw-content .model-hero .model-container .model-data .model-content ul'));
            this._equalizeElemHeight($('.model-compare section.model-hero .model-container h2'));
            this._equalizeElemHeight($('.model-compare section.model-hero .model-container .kba-buttons'));
            this._equalizeElemHeight($('.model-hero .model-container h2'),$('.selected-sticky .model-hero .model-container h2'));

            if(guxApp.viewport.view === "mobile"){
                this._equalizeElemWidth($('.model-compare .selected-sticky h2'));
                this._alignMiddle($('.model-compare .smob-back'), $('.model-compare .mw-header'));
            }
            // remove sticky title temporarily for performance
           if(guxApp.viewport.view !== "mobile"){
               guxApp.accordion.stickyTitle();
           }
           this.zebraStyling();
           guxApp.ModelWalk.fetchDate();
        },
        _alignMiddle: function(elem, parent){
           var parentHeight = parent.height();
           var elemHeight = elem.height();
           var topHeight = (parentHeight - elemHeight)/2 + 'px';
           elem.css('top', topHeight);
        },
        _equalizeElemHeight: function(equalHeightElems, assignHeight){
            var maxHeight = 0;
            assignHeight = typeof assignHeight !== 'undefined' ? assignHeight : equalHeightElems;

            $(equalHeightElems).each(function(){
                maxHeight = ($(this).height() > maxHeight)?$(this).height():maxHeight;
            });
            $(assignHeight).height(maxHeight);
        },
        _equalizeElemWidth: function(equalWidthElems){
            var minWidth = equalWidthElems.width();
            $(equalWidthElems).each(function(){
                minWidth = ($(this).width() < minWidth)?$(this).width():minWidth;
            });
            $(equalWidthElems).width(minWidth);
        },
        initModel: function(config){
            this.config = {
                groups : {},
                compareModels: undefined,
                selectedModels: config.selectedModels,
                formattedDate: config.formattedDate,
                imageUrl: config.imageUrl,
                modelData: config.modelData,
                site: config.site,
                allowedModels: config.allowedModels,
                selectMsg: config.selectMsg,
                totalModelNum: config.totalModelNum,
                overlayUrl: config.overlayUrl
            }
        },
        setDifferencesRecord: function(){
            var $differenceCheckboxElem = $('.uniform .tab-item input:first');
            this._isDifferencesChecked  = ($differenceCheckboxElem.length > 0)?$differenceCheckboxElem.prop('checked'):false;
        },
        restoreDifferencesSetting: function(){
            if(this._isDifferencesChecked){
                $('.uniform .tab-item input:first').click();
            }
        },
        fetchModel: function(){
            if(this.config.modelData != null) {

                var compareModels = [];

                // Build the REST URL for Model Walk Derivatives
                var modelData = this.config.modelData;

                modelData = modelData.replace('{site}', guxApp.tools.encode(this.config.site));
                modelData = modelData.replace('{modelIds}', this.config.selectedModels.toString());

                var self = this;

                $('html,body').animate({scrollTop: 0},200);
                $('.loading').show();
                $('.model-compare').hide();

                this.setDifferencesRecord();

                $.ajax({
                    url: modelData,
                    type: "GET",
                    dataType: "json"
                })
                .done(function(data){

                     _.forEach(self.config.selectedModels, function(selected) {

                        // Loop to Derivatives
                        _.forEach(data.derivatives, function(derivative) {
                            // Push Only Derivative Id's that Matched Selected Item Id's
                            if(derivative.derivativeId == selected) {

                                compareModels.push(derivative);

                            }

                        });

                     // Base for Group & Category name/title
                     self.config.groups = compareModels[0].groups;

                     // Order by selection sequence
                     compareModels.slice().reverse();
                     self.config.compareModels = compareModels;
                    });
                    self.renderHtml();
                    $('.loading').hide();
                    $('.errorPadding').hide();
                    $('.model-compare').show();
                    // omniture: initial  to fire the tag
                    if(self._initial){
                    	if (window._da && window._da.om && ND && ND.omniture) {
						_da.pname = 'vehicle:models:compare';	
						ND.analyticsTag.trackOmniturePage();
                    	}
                    }
                    self.restoreDifferencesSetting();
                }).fail(function(xhr, textStatus){
                    $('.loading').hide();
                    $('.errorPadding').show();
                });;

            };
        },
        populateDlgHeader: function($header, isAdd){
            var headerText = '';
            if(isAdd){
                var numToSelect = this.config.allowedModels - this.config.selectedModels.length;
                switch(numToSelect){
                    case 0:
                        headerText = this.config.selectMsg['zero'];
                        break;
                    case 1:
                        headerText = this.config.selectMsg['one'];
                        break;
                    default:
                        headerText = this.config.selectMsg['other'];
                        headerText = headerText.replace(/{}/, numToSelect);
                        break;
                }
            }else{
                headerText = this.config.selectMsg['one'];
            }
            $header.find('span').html(headerText);
        },
        popupDlgListener: function(){
            var self = this;
            var modal = $("#modalModel");

            $('.model-hero a.button, .selected-sticky .model-hero a').live('click',function(event){
                $('.model-hero').hide();
                $(".title-holder").trigger("sticky_kit:detach");
                self._initial = false;
                var isAdd = $(this).hasClass('addmodel');
                var isChange = $(this).hasClass('changemodel');
                if(isAdd){
                    $('#modalModel .model-container').removeAttr('style').addClass('block').removeClass('none end');
                    modal.removeClass('change').addClass('add');
                    modal.removeData('originid');
                }else if(isChange){
                    var originId = '';
                    $('#modalModel .model-container').removeAttr('style').addClass('block').removeClass('none end');
                    if(guxApp.viewport.view !== "mobile") {
                        originId = $(this).closest('.model-data').find('.icon-remove').data('derivativeid');
                    }else{
                        originId = $(this).data('derivativeid');
                    }
                    modal.removeClass('add').addClass('change');
                    modal.data('originid', originId);
                }
                $('.model-data', modal).removeClass('selected');
                var modelAction = $(this).data('revealfix');
                var $modalHeader = undefined;
                if(self.config.allowedModels === 3){
                    $('#select-two-models').hide();
                    $modalHeader = $('#select-three-models');
                    $modalHeader.show();
                }else if(self.config.allowedModels === 2){
                    $('#select-three-models').hide();
                    $modalHeader = $('#select-two-models');
                    $modalHeader.show();
                }

                self.populateDlgHeader($modalHeader, isAdd);

                // Disable Checkbox When you Select Items > Allowed Items
                // if(self.config.selectedModels.length >= self.config.allowedModels && modelAction !== 'change') {
                //     $(".model-data").find('input[type="checkbox"]:not(:checked)').attr('disabled', 'disabled');
                // } else {
                    $(".model-data").find('input[type="checkbox"]:not(:checked)').removeAttr('disabled').closest('.model-select').removeClass('disabled');
                //}



                // Add .selected class on selectedModels
                for (var i = self.config.selectedModels.length - 1; i >= 0; i--) {
                    var selectedModel = $('[data-modelnum="' + self.config.selectedModels[i] + '"]').closest('.model-data');
                    selectedModel.addClass('selected');
                    // Change visibility of all selectedModels
                    if(isChange){
                        selectedModel.closest('.model-container').css('display','none');
                    }
                };

                

                if(isChange){
                    $('[data-modelnum="' + originId + '"]').closest('.model-container').removeAttr('style').addClass('block').removeClass('none');
                }

                 $(".title-holder").trigger("sticky_kit:detach");

                if(modal){
                    if(event.preventDefault) { event.preventDefault(); }
                    modal.foundation('reveal', 'open');
                    $('.vehicle-modal').find('.model-content').addClass('body derivative-price');

                    ND.CalcPrice.init();
                }

                self.equalizeModelHeight();
            });
        },
        closeOverlayListener: function(){
            var modal = $("#modalModel"),
                vModel = $('.vehicle-modal .added-row');
            modal.find('.cancelDlg').live('click', function() {
                modal.find('.checked').removeClass();
                modal.foundation('reveal', 'close');
                $('.vehicle-modal').find('.model-content').removeClass('body derivative-price');

                if(guxApp.viewport.view !== "mobile"){
                   guxApp.accordion.stickyTitle();
               }
               $('.model-hero').show();
               
               ND.CalcPrice.init();
               vModel.contents().unwrap();
            });

           $(document).on('click', '.reveal-modal-bg', function() {
                ND.CalcPrice.init();
               vModel.contents().unwrap();
            });

            $(document).on('close.fndtn.reveal', '[data-reveal]', function () {
              var modal = $(this);
              $('.model-hero').show();
              vModel.contents().unwrap();
            });
        },
        compareByDiffListener: function(){
            $('form.uniform .tab-data input[type="checkbox"]').live('click',function(){
                var tabItems = $('form.uniform .tab-item');
                var $diffCheckbox = tabItems.find('.tab-data input[type="checkbox"]')
                var isChecked = $(this).prop('checked');
                $diffCheckbox.prop('checked', isChecked);
                if(isChecked){
                    $diffCheckbox.parent().addClass('custom-checked');
                    $diffCheckbox.closest('.checker').addClass('checker-selected');
                    $(document.body).trigger("sticky_kit:recalc");
                }else{
                    $diffCheckbox.parent().removeClass('custom-checked');
                    $diffCheckbox.closest('.checker').removeClass('checker-selected');
                    $(document.body).trigger("sticky_kit:recalc");
                }

                for(var itemIndex = 0; itemIndex < tabItems.length; itemIndex++){
                    var categories = $(tabItems[itemIndex]).find('.tab-contents .title-waypoint');
                    for(var idx = 0; idx < categories.length; idx++){
                        var features = $(categories[idx]).find('tr');
                        for(var jdx = 0; jdx < features.length; jdx++){
                            if(isChecked){
                                var featureArr = [];
                                var featureColumns = $(features[jdx]).find('td');
                                for(var kdx = 0; kdx < featureColumns.length; kdx++){
                                    var featureName = $(featureColumns[kdx]).find('p').html();
                                    if($.inArray(featureName, featureArr) === -1) {
                                        featureArr.push(featureName);
                                    }
                                }
                                if(featureArr.length === 1){
                                    $(features[jdx]).hide();
                                }
                            }else{
                                $(features[jdx]).show();
                            }
                        }
                    }
                }
            });
        },
        compareStickyHeader: function(){

            var startPointSecondNav = 70;

            if(guxApp.viewport.view !== "mobile") {
                var startPointModelHeader = 140;
            }else{
                var startPointModelHeader = 290;
            }

            var $stickyHeaderElem = $('.selected-sticky');
            var $stickyHeaderElem = $stickyHeaderElem?$stickyHeaderElem:$('.selected-sticky');
            var $sNav = $('.secondarynav');
            var scroll = $(window).scrollTop();

            if(guxApp.tools.isIE(8)) {
                if ($(window).width() < 1440){
                    $sNav.removeClass('aligned');
                }
            }

            if(scroll < startPointSecondNav){
                $sNav.removeClass('fullwidth');
            } else {
                $sNav.addClass('fullwidth');     
            }

            if (scroll <= startPointModelHeader) {
                $stickyHeaderElem.removeClass('fixed');
            } else if(scroll >= startPointModelHeader) {
                $stickyHeaderElem.addClass('fixed');
            }
        },
        stickyHeaderListener: function(){
            var self = this;

            $(window).on('scroll', self.compareStickyHeader);
            
            var debouncedScroll = _.debounce(function() {
                var elem = $('.selected-sticky.fixed .model-hero .model-container h2');
                elem.height('auto');
                self._equalizeElemHeight(elem);
            },500);
            
            $(window).on('scroll',debouncedScroll);
            $(window).on('resize',debouncedScroll);
        },
        accordionTabListener: function(){
            $('.accordion-block .tab-nav').die().live('click', function(){
                $(".title-holder").trigger("sticky_kit:detach");
                var self = $(this);
                $('.title-text').removeClass('fixed-title absolute-title').css({'top':'auto','width':'auto'});
                if(!self.hasClass('open')) {
                    guxApp.accordion.toggleAnimate($('.tab-nav.open').removeClass('open'));
                    self.toggleClass('open');
                    guxApp.accordion.toggleAnimate(self);

                    //Fix for accordion scrolling bottom.
                    $(":animated").promise().done(function() {
                        $('.selected-sticky').addClass('fixed');
                        var offsetTop = $('.tab-nav.open').offset().top - $('.selected-sticky').outerHeight() - 50;
                        $('html,body').animate({scrollTop: offsetTop},200);
                        if(guxApp.viewport.view !== "mobile"){
                           guxApp.accordion.stickyTitle();
                           //reflow Foundation Equalizer
                           $(document).foundation('equalizer', 'reflow');
                       }
                    });

                } else {
                    guxApp.accordion.toggleAnimate(self.removeClass('open'));
                }
            });
        },
        displayFeature: function(featureValue, featureName){
            var displayValue = '';
            if(featureValue === '' || !featureValue){
                return featureName;
            }
            switch(featureValue){
                case "S":
                case "X":
                    displayValue = featureName;
                    break;
                case "-":
                    displayValue = '-';
                    break;
                default:
                    displayValue = featureName + ' ' + '<b>'+featureValue+'</b>';
                    break;
            }
            return displayValue;
        },
        recalcSticky: function(){
            var debouncedCalc = _.debounce(function() {
                $(".title-holder").trigger("sticky_kit:detach");
                if(guxApp.viewport.view !== "mobile"){
                    guxApp.accordion.stickyTitle();
                }
            },300);

            $(window).on('resize', debouncedCalc);            
        },
        zebraStyling: function(){
            //this is for accordion table styling for ie8
            var accordion = $('.accordion-block');
            
            if (!$(accordion).length) {return;}
            
            if(guxApp.tools.isIE(8)) {
                $('.accordion-block .table-holder > table tr:odd').addClass('odd');
            }
        },
        equalizeModelHeight: function(modelElem){
            var addedRow = $('.vehicle-modal .added-row'),
                elemHolder;

            if($(addedRow).length){
                addedRow.contents().unwrap();
            }


            var width = $(window).width();

            modelElem = typeof modelElem !== 'undefined' ? modelElem :$('.modal-content .select-models .model-container').filter(function() { return $(this).css("display") == "block" });

            if(width >= 980){
                guxApp.ModelWalk.addRowPerGroup(modelElem,4);
            } else if(width >= 750) {
                guxApp.ModelWalk.addRowPerGroup(modelElem,3);
            }

            $('.added-row .model-container:last-child').addClass('end');
        },
        addRowPerGroup: function(elem,numOfDivs){
           for(var i = 0; i < elem.length; i+=numOfDivs) {
              elem.slice(i, i+numOfDivs).wrapAll("<div class='row added-row'></div>");
            }
        },
        resizeModelHandler: function(){
            $(window).on('resize',this.equalizeModelHeight);
            
        }
    }
})(jQuery);
