define([],function(){
	reduce=function(vals,impl){
		var tmp=vals[0];
		for (var i=1;i<vals.length;i++) {
			tmp=impl(tmp,vals[i]);
		}
		return tmp;
	}
	return reduce
})