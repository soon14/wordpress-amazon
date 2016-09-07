/*
 * Author: Doris
 *
 <a class="loan-calculator-overlay" href="/servlet/Satellite/doris/loan-calc">Loan Calculator</a>
 $('.loan-calculator-overlay').on('click',function(){
    $(this).loanCalculatorOverlay({...});
 });
 *
 */

(function($) {
	
	$.fn.loanCalculatorOverlay = function(options){
	    var defaults = {
	        price: 0,
	        symbol: '',
	        url: '',
	        priceformatter: null,
	        customClass: 'loan-calc',
	        location: '',
			complete: null //callback function
	    };

	    
		var options = $.extend(defaults, options);
		
		var loanOverlay = function(element){
		    var loanOverlay = this,
				url,
                total_price = 0,
				interest_rate = 0,
                loan_duration = 0,
                down_payment=0,
                results = 0;

			loanOverlay.init = function () {
			    total_price = Math.round(options.price);
			    results = total_price;
			    url = options.url.length > 0 ? options.url : element.attr("href");
			    $.publish('overlay.launch', {
			        url: url,
			        positionType: 'window',
			        customClass: options.customClass,
			        name: "Loan Calculator",
			        success: function () {
			            loanOverlay.calculate();
			            loanOverlay.updateContent();
			            loanOverlay.registerEvent();
			        },
			        error: function (e) {
			            console.log(e);
			        }
			    });
			};
			
			loanOverlay.calculate = function (isInvalid) {
			    if (!isInvalid && total_price > 0 && interest_rate > 0 && loan_duration > 0 && down_payment > 0 && down_payment < total_price) {
			        var total_rate_payable = (total_price - down_payment) * (interest_rate/100) * loan_duration;
			        results = (total_rate_payable + (total_price - down_payment)) / (loan_duration * 12);
			    }
			    else {
			        results = 0;
			    }
			};

			loanOverlay.updateContent = function () {
			    if (options.priceformatter) {
			        $('.loan-calc-overlay .title span.price').html(options.priceformatter.format(total_price));
			        $('.loan-calc-overlay .result span.price').html(options.priceformatter.format(results));
			    }
			    else {
			        $('.loan-calc-overlay .title span.price').html(total_price);
			        $('.loan-calc-overlay .result span.price').html(results);
			    }
			    $('.loan-calc-overlay span.symbol').html(options.symbol);
			    if (options.location.length) {
			        $('.loan-calc-overlay span.location').html(options.location);
			    }
			    else {
			        $('.loan-calc-overlay p.loc').hide();
			    }
			};

			loanOverlay.registerEvent = function () {
			    $('#duration').on('change propertychange input', function () {
			        loan_duration = parseFloat($(this).val());
			        doCalculate($(this));
			    });
			    $('#rate').on('change propertychange input', function () {
			        interest_rate = parseFloat($(this).val());
			        doCalculate($(this));
			    });
			    $('#payment').on('change propertychange input', function () {
			        down_payment = parseFloat($(this).val());
			        doCalculate($(this));
			    });

			    function doCalculate($ele) {
			        if (isNaN($ele.val())) {
			            $ele.parent().addClass('invalid');
			            loanOverlay.calculate(true);
			        }
			        else {
			            $ele.parent().removeClass('invalid');
			            loanOverlay.calculate(false);
			        }
			        loanOverlay.updateContent();
			    }

			    $('#overlay .close-button a').on('click', function (e) {
			        $('#overlay').removeClass(options.customClass);
			    })

			    // callback 
			    if ($.isFunction(options.complete)) {
			        options.complete.call(this);
			    }
			};
						
		};
		
		var appendOverlay = function(element){
		    var overlay = new loanOverlay(element);
		    overlay.init();
		};
		
		appendOverlay($(this));
		

	};
	

}(jQuery));
