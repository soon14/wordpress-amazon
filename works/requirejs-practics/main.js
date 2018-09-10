require(['sum'],function(sum){

	var values=[1,2,3,4,5,6];
	var result=sum.sum(values);
	document.getElementById('result').innerHTML=result;
})
// (function(){
// 	document.getElementById('result').innerHTML=16;
// })();
