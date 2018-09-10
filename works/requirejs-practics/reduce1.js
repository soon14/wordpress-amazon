define1('reduce1',[],function(){
	reduce1=function(vals,impl){
		var tmp=vals[0];
		for (var i=1;i<vals.length;i++) {
			tmp=impl(tmp,vals[i]);
		}
		return tmp;
	}
	return reduce1
})