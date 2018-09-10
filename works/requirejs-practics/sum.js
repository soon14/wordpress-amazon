define('sum',['add','reduce'],function(add,reduce){

	function sum(vals){
		return reduce(vals,add);
	}
	return {sum:sum};
});
