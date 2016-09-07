jQuery(window).bind('load', function(){
	
	module("Sync Transfer Functions", {
		setup: function() {
			this.priceformatter = new ND.PriceFormatter({"prefix": "$", "thousandsSeparator": ", ", "centsLimit": 2, "forceDecimal": true});
		},
		teardown: function() {
			this.priceFormatter = null;
		}
	});

	test("getDriveList", function() {
		expect(3);
		var value = "2000";
		var expectedvalue = "$2, 000.00";
		var withDecimal = this.priceformatter.format(value+".00");
		var withoutDecimal = this.priceformatter.format(value);
		equal(withDecimal, expectedvalue);
		equal(withoutDecimal, expectedvalue);
		equal(withDecimal, withoutDecimal, "Both inputted values, 2000 and 2000.00 returned a value of "+expectedvalue);
	});
	
});
