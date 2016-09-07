/**
 * Created by bjie on 11/17/2014.
 */
(function($){
    var formSalesController = {
        init: function(){
            this.type = $('#FormSales_Selected_Type');
            this.typeName = this.type.attr('name');
            this.companyName = $('#FormSales_Company_Name');
            this.type.parent().css('display','none');
            this.companyName.parent().css('display','none');
            this.selectionElem = $('#FormSales_Selection');
            this.modelElem = $('#FormSales_Model');
            this.stateElem = $('#FormSales_State');
            var compNameElem = $('#FormSales_Company_Name');
            this.compName = compNameElem.attr('name');
            this.observeElem = $('#FormSales_Observation');
			this.telElem = $('#FormSales_Tel');
			this.singleInputWithCheck = $('.fbform input[type=text][data-check]');
			this._switchable = false;
			this.ctrlCode = [108,112,113,114,115,116,117,118,119,120,121,122,123,8,9,12,13,16,17,18,20,27,32,33,34,35,36,37,38,39,40,45,46,144,175,174,179,173,172,180,170,171];
			this._formatConfig = {
				"CNPJ": {
					"pattern": new RegExp(/^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2}$/),
					"formatMap": {
						"2": ".",
						"6": ".",
						"10": "/",
						"15": "-",
						"last": "18"
					}
				},
				"CPF": {
					"pattern": new RegExp(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/),
					"formatMap": {
						"3": ".",
						"7": ".",
						"11": "-",
						"last": "14"
					}
				}
			};
            this.addEventListener();
        },
		
		dynmCheck: function($elem, fieldType, msg){
			var self = this;
			this._fieldType = fieldType;
			var maxlength = parseInt(this._formatConfig[this._fieldType].formatMap.last, 10);
			$elem.on('blur', function(){
				var inputValue = $(this).val();
				var isMatch = self._formatConfig[self._fieldType].pattern.test(inputValue);
				if(!isMatch){
					if (msg) {
				        msg.length && alert(msg);
				    } else {
				        alert(a_messages[self.typeName]['r']);
				    }
				}
			});
			$elem.on('keydown', function(event){
				var keyCode = event.keyCode;
				if(keyCode === 8){
					var inputValue = $(this).val();
					var inputLen = inputValue.length;
					if(self._switchable && self._fieldType === 'CNPJ' && inputLen === 15){
						inputValue = self.switchPattern(inputValue, 'CPF');
						inputLen = inputValue.length;
						$(this).val(inputValue);
					}
				}
							
				if($.inArray(keyCode, self.ctrlCode) === -1){
					var inputValue = $(this).val();
					var inputLen = inputValue.length;
					
					if(self._switchable && self._fieldType === 'CPF' && inputLen === 14){
						inputValue = self.switchPattern(inputValue, 'CNPJ');
						inputLen = inputValue.length;
						maxlength = parseInt(self._formatConfig[self._fieldType].formatMap.last, 10);
						$(this).val(inputValue);
					}
					
					if(inputLen >= maxlength){
						inputValue = inputValue.slice(0, maxlength-1);
						$(this).val(inputValue);
						return true;
					}
					
					var splitSymbol = self._formatConfig[self._fieldType].formatMap[''+inputLen];
					
					if(splitSymbol){
						inputValue = inputValue + splitSymbol;
						$(this).val(inputValue);
					}
				}
			});
		},
		switchPattern: function(inputValue, type){
			inputValue = inputValue.replace(/(\.)|(\-)|(\/)/g,'');
			this._fieldType = type;
			if(type === 'CNPJ'){
				inputValue = inputValue.replace(/^(.{2})(.{3})(.{3})(.{3})$/,'$1.$2.$3/$4');
			}else if(type === 'CPF'){
				inputValue = inputValue.replace(/^(.{3})(.{3})(.{3})(.{2})/,'$1.$2.$3-$4');
			}
			return inputValue;
		},
        addEventListener: function(){
            var self = this;
            this.selectionElem.change(function(){
                var selectedValue = $(this).val();
                self.type.val('');
				self.type.off();
                self.companyName.val('');
                var typeLabelElem = self.type.prev();
                switch(selectedValue){
                    case 'CNPJ':
                        self.type.attr({'placeholder':'__.___.___/____-__'}).removeAttr('maxlength');
                        typeLabelElem.html(selectedValue);
                        self.companyName.parent().css('display', 'none');
                        self.type.parent().css('display','block');
                        a_fields[self.compName]['r'] = false;
                        a_messages[self.typeName]['r'] = a_messages[self.typeName]['message_a'];
						self._switchable = false;
						self.dynmCheck(self.type, selectedValue);
                        break;
                    case 'CPF':
                        self.type.attr({'placeholder':'___.___.___-__'}).removeAttr('maxlength');
                        typeLabelElem.html(selectedValue);
                        self.companyName.parent().css('display', 'none');
                        self.type.parent().css('display','block');
                        a_fields[self.compName]['r'] = false;
                        a_messages[self.typeName]['r'] = a_messages[self.typeName]['message_b'];
						self._switchable = false;
						self.dynmCheck(self.type, selectedValue);
                        break;
                    case 'CPF/CNPJ':
						self.type.removeAttr('maxlength placeholder');
                        typeLabelElem.html(selectedValue);
                        self.companyName.parent().css('display', 'none');
                        self.type.parent().css('display','block');
                        a_fields[self.compName]['r'] = false;
                        a_messages[self.typeName]['r'] = a_messages[self.typeName]['message_c'];
						self._switchable = true;
						self.dynmCheck(self.type, 'CPF');
                        break;
                    case 'CPFB':
                        self.type.attr({'placeholder':'___.___.___-__'}).removeAttr('maxlength');
                        typeLabelElem.html('CPF');
                        self.type.parent().css('display', 'block');
                        self.companyName.parent().css('display', 'block');
                        a_fields[self.compName]['r'] = true;
                        a_messages[self.typeName]['r'] = a_messages[self.typeName]['message_d'];
						self._switchable = false;
						self.dynmCheck(self.type, 'CPF');
                        break;
                    default:
                        self.type.parent().css('display', 'none');
                        self.companyName.parent().css('display', 'none');
                        a_fields[self.compName]['r'] = false;
                        break;
                }
            });
            $('#FormSales_Observation').keydown(function(e){
                var keyCode = e.keyCode;
                
                if($.inArray(keyCode, self.ctrlCode) === -1){
                    var maxlength = self.observeElem.attr('maxlength');
                    if(self.observeElem.val().length >= maxlength){
                        var name = self.observeElem.attr('name');
                        alert(a_messages[name]['r']);
                    }
                }
            });
            $('.fbform input[type="reset"]').click(function(){
                self.selectionElem.find('option[value=""]').prop('selected', true);
                self.selectionElem.trigger("change");
                self.modelElem.find('option[value=""]').prop('selected', true);
                self.modelElem.trigger('change');
                self.stateElem.find('option[value=""]').prop('selected', true);
                self.stateElem.trigger('change');
            });
			if (self.singleInputWithCheck && self.singleInputWithCheck.length > 0) {
                self.singleInputWithCheck.each(function () {
                    var ftype = $(this).attr('data-check');
                    ftype = ftype ? ftype.toUpperCase() : '';
                    var msg = (a_messages[$(this).attr('name')] && a_messages[$(this).attr('name')]['r']) ? a_messages[$(this).attr('name')]['r'] : '';
                    switch (ftype) {
                        case 'CNPJ':
                            $(this).attr({ 'placeholder': '__.___.___/____-__' }).removeAttr('maxlength');
                            self.dynmCheck($(this), ftype, msg);
                            break;
                        case 'CPF':
                            $(this).attr({ 'placeholder': '___.___.___-__' }).removeAttr('maxlength');
                            self.dynmCheck($(this), ftype, msg);
                            break;
                    }
                });
            }
			
			this.telElem.on('keydown', function(event){
				var keyCode = event.keyCode;
				var inputVal = $(this).val();
				var inputLen = inputVal.length;
				if(keyCode === 8){
					if(inputLen === 5){
						inputVal = inputVal.replace(/\(([0-9]{2})\)/, '$1');
						$(this).val(inputVal);
					}else if(inputLen === 10){
						inputVal = inputVal.slice(0, 9);
						$(this).val(inputVal);
					}
				}
				if($.inArray(keyCode, self.ctrlCode) === -1){
					if(inputLen === 2){
						inputVal = '('+inputVal+')';
						$(this).val(inputVal);
					}else if(inputLen === 8){
						inputVal = inputVal + '-';
						$(this).val(inputVal);
					}
				}
			});
        }
    };
    $(function(){
        formSalesController.init();
    });
})(jQuery);