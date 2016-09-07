jQuery(window).bind('load', function(){
	
	module("Price formatter tests", {
		setup: function() {
			this.priceformatter = ND.PriceFormatter;
			this.priceformatter.initialise({data: "true,0", formatString: "$ %1", forceDecimal: false});
		},
		teardown: function() {
			this.priceFormatter = null;
		}
	});

	test("format with decimal test", function() {
		expect(2);
		var value = "10000";
		var expectedvalue = "$ 10,000";
		var withDecimal = this.priceformatter.format(value+".50");
		var withoutDecimal = this.priceformatter.format(value);
		equal(withDecimal, expectedvalue+".50");
		equal(withoutDecimal, expectedvalue);
		//equal(withDecimal, withoutDecimal, "Both inputted values, 10000 and 10000.00 returned a value of "+expectedvalue);
	});
	
});
