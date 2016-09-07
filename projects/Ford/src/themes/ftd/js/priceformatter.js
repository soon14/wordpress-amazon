/**
 * 
 */
(function($,undefined) {	
	if (!ND) var ND = window.ND = window.ND || {};
	/***
	 * WARNING: SINGLETON ALERT!  SINGLETON ALERT!  CODE: BLACK!
	 */
	ND.PriceFormatter = {
		
		/**
		 * true,0 -> true means use delimiter or not. , means use comma as delimitor for prices, 0 means how many decimal places should be displayed
		 * 
		 * for example if we have true,0 
		 * 
		 * input 2000.00 -> output 2,000
		 *
		 * if we have false,2
		 * 
		 * input 2000 -> output 2000.00
		 * input 2000.999 -> output 2000.99
		 * 
		 * if we have true/2
		 * 
		 * input 2000 -> output 2/000.00
		 * input 2000.999 -> output 2/000.99
		 * 
		 * $ %1
		 * 
		 * 
		 * Internal methods for priceFormatter, shamelessly borrowed from jquery.priceformat.js version 1.7 <http://jquerypriceformat.com>
		 * Originally created By Eduardo Cuducos cuducos [at] gmail [dot] com, and maintained by Flavio Silveira flavio [at] gmail [dot] com
		 * 
		 * usage: var PF = new ND.PriceFormatter({"prefix": "$", thousandsSeparator: ", ", centsLimit: 2});
		 * PF.format("2000.00");
		 */
		initialise: function(options) {
			var defaults =
			{
				data: 'true,0',
				formatString: '',
				prefix: '',
	            suffix: '',
				centsSeparator: '.',
				thousandsSeparator: '',
				limit: false,
				centsLimit: 0,
				clearPrefix: false,
	            clearSufix: false,
				allowNegative: false,
				forceDecimal: false
			};
			
			ND.PriceFormatter.options = $.extend({},defaults, options);
			// Deals with parsing the data options passed to the constructor
			var s = ND.PriceFormatter.options.data.match(/\W+/g);
			var d = ND.PriceFormatter.options.data.split(s);
			if (d[0] === "true") {
				ND.PriceFormatter.options.thousandsSeparator = ND.PriceFormatter.options.thousandsSeparator;
			} else {
				ND.PriceFormatter.options.thousandsSeparator = defaults.thousandsSeparator;
			}
			if (parseInt(d[1]) > 0) {
				ND.PriceFormatter.options.forceDecimal = true;
				ND.PriceFormatter.options.centsLimit = parseInt(d[1]);
			} 
		},
			
			// pre defined options
		internalFormatter: function(value) {
				var obj = value;
				var is_number = /[0-9]/;
		
				// load the pluggings settings
				var prefix = ND.PriceFormatter.options.prefix;
		        var suffix = ND.PriceFormatter.options.suffix;
				var centsSeparator = ND.PriceFormatter.options.centsSeparator;
				var thousandsSeparator = ND.PriceFormatter.options.thousandsSeparator;
				var limit = ND.PriceFormatter.options.limit;
				var centsLimit = ND.PriceFormatter.options.centsLimit;
				var clearPrefix = ND.PriceFormatter.options.clearPrefix;
		        var clearSuffix = ND.PriceFormatter.options.clearSuffix;
				var allowNegative = ND.PriceFormatter.options.allowNegative;
		
				// skip everything that isn't a number
				// and also skip the left zeroes
				function to_numbers (str)
				{
					var formatted = '';
					for (var i=0;i<(str.length);i++)
					{
						char_ = str.charAt(i);
						if (formatted.length==0 && char_==0) char_ = false;
		
						if (char_ && char_.match(is_number))
						{
							if (limit)
							{
								if (formatted.length < limit) formatted = formatted+char_;
							}
							else
							{
								formatted = formatted+char_;
							}
						}
					}
		
					return formatted;
				}
		
				// format to fill with zeros to complete cents chars
				function fill_with_zeroes (str)
				{
					while (str.length<(centsLimit+1)) str = '0'+str;
					return str;
				}
		
				// format as price
				function price_format (str)
				{
					// formatting settings
					var formatted = fill_with_zeroes(to_numbers(str));
					var thousandsFormatted = '';
					var thousandsCount = 0;
		
					// split integer from cents
					var centsVal = formatted.substr(formatted.length-centsLimit,centsLimit);
					var integerVal = formatted.substr(0,formatted.length-centsLimit);
		
					// apply cents pontuation
					formatted = integerVal+centsSeparator+centsVal;
		
					// apply thousands pontuation
					if (thousandsSeparator)
					{
						for (var j=integerVal.length;j>0;j--)
						{
							char_ = integerVal.substr(j-1,1);
							thousandsCount++;
							if (thousandsCount%3==0) char_ = thousandsSeparator+char_;
							thousandsFormatted = char_+thousandsFormatted;
						}
						if (thousandsFormatted.substr(0,1)==thousandsSeparator) thousandsFormatted = thousandsFormatted.substring(1,thousandsFormatted.length);
						formatted = thousandsFormatted+centsSeparator+centsVal;
					}
		
					// if the string contains a dash, it is negative - add it to the begining (except for zero)
					if (allowNegative && str.indexOf('-') != -1 && (integerVal != 0 || centsVal != 0)) formatted = '-' + formatted;
		
					// apply the prefix
					if (prefix) formatted = prefix+formatted;
		            
		            // apply the suffix
					if (suffix) formatted = formatted+suffix;
		
					return formatted;
				}
		
				// filter what user type (only numbers and functional keys)
				function key_check (e)
				{
					var code = (e.keyCode ? e.keyCode : e.which);
					var typed = String.fromCharCode(code);
					var functional = false;
					var str = obj;
					var newValue = price_format(str+typed);
		
					// allow key numbers, 0 to 9
					if((code >= 48 && code <= 57) || (code >= 96 && code <= 105)) functional = true;
		
					// check Backspace, Tab, Enter, Delete, and left/right arrows
					if (code ==  8) functional = true;
					if (code ==  9) functional = true;
					if (code == 13) functional = true;
					if (code == 46) functional = true;
					if (code == 37) functional = true;
					if (code == 39) functional = true;
					if (allowNegative && (code == 189 || code == 109)) functional = true; // dash as well
		
					if (!functional)
					{
						e.preventDefault();
						e.stopPropagation();
						if (str!=newValue) obj = newValue;
					}
		
				}
		
				// inster formatted price as a value of an input field
				function price_it ()
				{
					var str = obj;
					var price = price_format(str);
					if (str != price) obj = price;
				}
		
				// Add prefix on focus
				function add_prefix()
				{
					var val = obj;
					obj = prefix + val;
				}
		        
		        function add_suffix()
				{
					var val = obj;
					obj = val + suffix;
				}
		
				// Clear prefix on blur if is set to true
				function clear_prefix()
				{
					if($.trim(prefix) != '' && clearPrefix)
					{
						var array = obj.split(prefix);
						obj = array[1];
					}
				}
		        
		        // Clear suffix on blur if is set to true
				function clear_suffix()
				{
					if($.trim(suffix) != '' && clearSuffix)
					{
						var array = obj.split(suffix);
						obj = array[0];
					}
				}
				
				price_it();
				return obj;
			},
			
			// Pad with leading zeros
			pad : function(num, size) {
			    var s = num+"";
			    while (s.length < size) s = "0" + s;
			    return s;
			},
		
			format: function(value) {
				var result = value = value.toString();
				try {
					if (ND.PriceFormatter.options === undefined) {
						throw 'Priceformatter not initialized';
					}
					
					//first replace the . coming from the server with centsSeperator
					value = value.replace('.', ND.PriceFormatter.options.centsSeparator);
					
//					console.log('value before : ' + value);
					
				    var length = 0;
				    var centsLimit = ND.PriceFormatter.options.centsLimit;
				    var decimalIdx = value.indexOf(ND.PriceFormatter.options.centsSeparator);
				    //if centsLimit is greater than zero but value has no decimal for instance if we have 500 but 
				    //centLimit = 3 then this line will convert 500 to 500.000
					if (centsLimit > 0 && decimalIdx === -1) {
						value += ND.PriceFormatter.options.centsSeparator + ND.PriceFormatter.pad("0", centsLimit);
						
//						console.log('value += ND.PriceFormatter.options.centsSeparator + ND.PriceFormatter.pad("0", centsLimit) : ' + value);
						
					} else if (decimalIdx > 0 && ((length = value.substring(decimalIdx + 1, value.length).length) < centsLimit)) {
						
//						console.log('value.substring(decimalIdx + 1, value.length): ' + value.substring(decimalIdx + 1, value.length));
						
						value += ND.PriceFormatter.pad("0", centsLimit - length);
						
//						console.log('value += ND.PriceFormatter.pad("0",  - length) : ' + value);
						
					} else if (length > centsLimit) { //value = 100.00000  but cent limit is 2 
						 value = value.substring(0, decimalIdx + 1 + centsLimit);
						 
//						 console.log('value = value.substring(0, decimalIdx + 1 + centsLimit): ' + value);
					}
					var output = ND.PriceFormatter.internalFormatter(value);
					if (!ND.PriceFormatter.options.forceDecimal) {
//						console.log('index of ' + ND.PriceFormatter.options.centsSeparator + ' in ' + output + ' is (output.indexOf(ND.PriceFormatter.options.centsSeparator)): ' + output.indexOf(ND.PriceFormatter.options.centsSeparator));
						output = output.substring(0,output.indexOf(ND.PriceFormatter.options.centsSeparator));
						
//						console.log('output = output.substring(0,output.indexOf(ND.PriceFormatter.options.centsSeparator)); ' + output);
					}
					result = ND.PriceFormatter.options.formatString.replace("%1", output);
					
//					console.log('result: ' + result);
					
				} catch(e) {
					throw e;
				}
				
				return result;
			}
	}; // End of Price Formatter singleton
	
})(jQuery);