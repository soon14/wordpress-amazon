/**
 * @author: Sohrab Zabetian
 * @project Lincoln Build and price
 * @description Saves Lincoln B&P configurations to user's profile
 */

(function ($) {

    var module = {

        config: {},
        newConfigToSaveData: {},
        existingConfigData: {},
        tmpls: {
            savedConfig: {
                id: '#ml-saved-config-tmpl',
                $cache: null
            },

            saveSuccessCancel: {
                id: '#ml-save-success-cancel-dialog-tmpl',
                $cache: null
            },

            saveNewConfig: {
                id: '#ml-save-config-dialog-tmpl',
                $cache: null
            },

            errorDialog: {
                id: '#ml-save-error-dialog-tmpl',
                $cache: null
            },

            invalidVehicleDialog: {
                id: '#ml-invalid-vehicle-dialog-tmpl',
                $cache: null
            }
        },

        $loader: null,

        block: function () {
            $('body').append(module.$loader);
        },

        unblock: function () {
            $('#ml-lincoln-loader').remove();
        },

        validateForm: function (saveInput, previouslySavedConfigKey) {
            $('.error').each(function () {
                $(this).addClass('hide');
            });
            var isFormValid = true;
            if (saveInput == null || saveInput.trim().length === 0) {
                $('#ml-save-input-error').removeClass('hide');
                isFormValid = false;
            }

            if (typeof previouslySavedConfigKey === 'undefined' ||
                previouslySavedConfigKey == null ||
                previouslySavedConfigKey.trim().length === 0) {
                $('#ml-select-a-config-error').removeClass('hide');
                isFormValid = false;
            }
            return isFormValid;
        },

        attachListeners: function () {
            $('.ml-reload-saved-config-wrapper').on('click', function () {
                var reloadUrl = $(this).parent().data('href');
                if (typeof reloadUrl !== 'undefined' && reloadUrl != null) {
                    module.block();
                    location.href = reloadUrl;
                }
            });

            module.registerClickOldModelConfigEvent();
        },

        openOverlay: function (html, callback) {
            module.closeOverlay();
            $('body').append(module.$overlayWrapper);
            $('#ml-overlay').html(html);
            ND.lincolnForm().elements();

            if (typeof callback === 'function') {
                callback();
            }
        },

        closeOverlay: function () {
            var $overlayWrapper = $('#ml-overlay');
            if ($overlayWrapper.length > 0) {
                $overlayWrapper.remove();
            }
        },

        registerClickOldModelConfigEvent: function() {

            var $savedVehicleContainer = $('#ml-save-container');
            var $items = $savedVehicleContainer.find('.item-wrap');
            var $invalidVehicles = $items.find('.invalid').parent();

            $invalidVehicles.find('a').on('click', showInvalidVehiclePopup);

            function showInvalidVehiclePopup(e) {
                e.preventDefault();

                if (module.tmpls.invalidVehicleDialog.$cache == null) {
                    module.tmpls.invalidVehicleDialog.$cache = $(module.tmpls.invalidVehicleDialog.id).template();
                }

                var modelId = $(e.currentTarget).data('model-id');
                var invalidVehicleDialogTemplate = $.tmpl(module.tmpls.invalidVehicleDialog.$cache, {
                    modelId: modelId
                });

                module.openOverlay(invalidVehicleDialogTemplate, function() {
                    $('#ml-dismiss-btn').one('click', function (e) {
                        e.preventDefault();
                        module.closeOverlay();
                    });
                });

            }

        },

        registerRedirectToBuildAndPriceEvent: function () {
            var btn = $('.ml-save-redirect-btn');
            btn.on('click', function (e) {
                e.preventDefault();
                module.block();

                //delete the cookies, we don't need them.$.cookie("name", null, { path: '/' });
                $.cookie('dfy.lbp.save.state', null, { path: '/' });
                $.cookie('dfy.lbp.save.name', null, { path: '/' });
                location.href = btn.data('href');
            });
        },

        handleError: function (data, textStatus, jqXHR) {
            if (module.tmpls.errorDialog.$cache == null) {
                module.tmpls.errorDialog.$cache = $(module.tmpls.errorDialog.id).template();
            }

            var $tmplHtml = $.tmpl(module.tmpls.errorDialog.$cache, {});

            module.openOverlay($tmplHtml, function () {

                module.registerRedirectToBuildAndPriceEvent();

                $('#ml-dismiss-btn').on('click', function (e) {
                    e.preventDefault();
                    module.closeOverlay();
                });
            });
        },

        /**
         * Show simple dialog (just an dialog with input) if slotsRemaining === true
         * or option to select previously saved vehicles
         * @param slotsRemaining true for simple, false for complicated
         */
        promptUser: function (callback) {
            //console.log('module.tmpls.saveNewConfig.id: ' + module.tmpls.saveNewConfig.id);
            // console.log('$(module.tmpls.saveNewConfig.id)' + $(module.tmpls.saveNewConfig.id).length);
            if (module.tmpls.saveNewConfig.$cache == null) {
                module.tmpls.saveNewConfig.$cache = $(module.tmpls.saveNewConfig.id).template();
            }

            module.newConfigToSaveData.derivativeName = $.cookie('dfy.lbp.save.name') || '';
            var $tmplHtml = $.tmpl(module.tmpls.saveNewConfig.$cache, {
                existingConfig: module.existingConfigData,
                newConfig: module.newConfigToSaveData
            });

            module.openOverlay($tmplHtml, function () {

                var $input = $('#ml-save-input');
                $input.focus();
                $('.ml-save-cancel-btn').on('click', function (e) {
                    e.preventDefault();
                    module.saveOrCancelDialog(false, null);
                });

                $('#ml-save-save-btn').on('click', function (e) {
                    e.preventDefault();
                    var saveInput = $input.val();
                    //just pass a for key to pass validation since we don't have a key

                    if (module.validateForm(saveInput, 'a')) {
                        callback(saveInput);
                    }
                });

                $('#ml-save-overwrite-btn').on('click', function (e) {
                    e.preventDefault();
                    var saveInput = $input.val(),
                        saveKey = $('input[name="ml-save-key"]:checked').val();

                    if (module.validateForm(saveInput, saveKey)) {
                        callback(saveInput, saveKey);
                    }
                });
            });
        },

        /**
         * After a successful save, the server returns a key, which we need to reload a config on b&p
         * @param wasSuccessful
         * @param savedConfigKey
         */
        saveOrCancelDialog: function (wasSuccessful, savedConfigKey) {

            if (module.tmpls.saveSuccessCancel.$cache == null) {
                module.tmpls.saveSuccessCancel.$cache = $(module.tmpls.saveSuccessCancel.id).template();
            }

            var $tmplHtml = $.tmpl(module.tmpls.saveSuccessCancel.$cache, {
                saveSuccessful: wasSuccessful,
                savedConfigKey: savedConfigKey || null,
                state: $.cookie('dfy.lbp.save.state') || null
            });

            module.openOverlay($tmplHtml, module.registerRedirectToBuildAndPriceEvent);
        },

        services: {
            domToJSON: function ($json) {
                if ($json.length > 0) {
                    return JSON.parse($json.html());
                }
                return {};
            },

            loadConfiguration: function (successCallbackHandler) {

                if (typeof module.config.loadExisitngConfigsURL !== 'undefined') {
                    var url = module.config.loadExisitngConfigsURL + '?v=' + new Date().getTime();
                    module.block();

                    $.ajax({
                        url: url,
                        type: 'GET',
                        dataType: 'json',
                        success: function (data, textStatus, jqXHR) {

                            module.existingConfigData = data;

//                            if (module.existingConfigData != null &&
//                                typeof module.existingConfigData.configurations !== 'undefined' &&
////                                module.existingConfigData.configurations.length > 0) {
//                                //configs with larger keys should come first
////                                module.existingConfigData.configurations.sort(function(configA, configB){
////                                    return (configA.key === configB.key) ? 0 : ((configA.key > configB.key) ? 1: -1);
////                                });
//                            }

                            var navigatorModelsId = module.newConfigToSaveData.navigatorModels.split(',');

                            for (var i = 0; i < data.configurations.length; i++) {
                                var config = data.configurations[i];

                                if (config.features.length > 0 && config.sfeatures.length === 0) {
                                    config.imageUrl =  config.imageUrl.replace('//', '/' + config.features.join('%2C') + '/');
                                }

                                // Check validity of navigator coming from PS
                                config.isModelNavigator = navigatorModelsId.indexOf(config.modelId) > -1;

                                if (config.isModelNavigator) {
                                    config.isValid = true;
                                }

                            }



                            if (module.tmpls.savedConfig.$cache == null) {
                                module.tmpls.savedConfig.$cache = $(module.tmpls.savedConfig.id).template();
                            }

                            $.tmpl(module.tmpls.savedConfig.$cache, data).appendTo($('#ml-save-container'));

                            module.unblock();

                            if (typeof successCallbackHandler === 'function') {
                                successCallbackHandler();
                            }
                        },

                        error: function (data, textStatus, jqXHR) {
                            module.unblock();
                            module.handleError(data, textStatus, jqXHR);
                        }
                    });
                }
            },

            callSaveAjaxService: function () {
                module.block();
                $.ajax({
                    url: module.config.saveConfigsURL,
                    type: 'POST',
                    contentType: 'application/json; charset=UTF-8',
                    data: JSON.stringify(module.newConfigToSaveData),
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        module.unblock();
                        module.saveOrCancelDialog(true, data.id);
                    },
                    error: function (data, textStatus, jqXHR) {
                        module.unblock();
                        module.handleError(data, textStatus, jqXHR);
                    }
                });
            },

            saveConfiguration: function () {
                if (module.newConfigToSaveData.modelId != null &&
                    module.newConfigToSaveData.modelId !== '' &&
                    typeof module.config.saveConfigsURL !== 'undefined') {

                    module.promptUser(function (newName, previouslySavedConfigKey) {
                        if (!module.services.isEmptySlotAvailable() && typeof previouslySavedConfigKey !== 'undefined') {
                            module.newConfigToSaveData.key = previouslySavedConfigKey;
                        }
                        module.newConfigToSaveData.name = newName;
                        module.newConfigToSaveData.features = module.newConfigToSaveData.features.split(',');
                        module.newConfigToSaveData.sfeatures = module.newConfigToSaveData.sfeatures.split(',');
                        module.services.callSaveAjaxService();
                    });
                } else {
                    module.attachListeners();
                }
            },

            isEmptySlotAvailable: function () {
                return !!module.existingConfigData.slotsRemaining;
            }

        },

        init: function () {
            module.config = module.services.domToJSON($('#ml-save-services-config'));
            module.newConfigToSaveData = module.services.domToJSON($('#ml-save-data'));
            module.$overlayWrapper = $('<div id="ml-overlay" class="rad-overlay-bg"></div>');
            module.$loader = $('<div id="ml-lincoln-loader" class="loading-bkground"><span class="loading-gif"></span></div>');
            module.services.loadConfiguration(module.services.saveConfiguration);
        }
    };

    $(document).ready(function () {
        setTimeout(function() {
            module.init();
        }, 400);
    });

})(jQuery);
