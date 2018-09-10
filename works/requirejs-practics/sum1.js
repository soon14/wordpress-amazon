define1('sum1',['add1','reduce1'],function(add1,reduce1){
	sum1=function(vals){
		return reduce1(vals,add1);
	};
	return sum1;
});