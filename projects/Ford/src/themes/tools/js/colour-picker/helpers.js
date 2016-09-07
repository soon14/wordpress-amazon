/**
 * 
 */

ND.CP.Helpers = {
	
	buildURL : function(orig, vals, userPref) {
		var url =  orig
			.replace(':derivativeId', vals.derativeId);

		return url;
	}

};