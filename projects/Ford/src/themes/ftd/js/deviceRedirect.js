/***************************************
add the redirection disable flag to all the urls under the page
****************************************/
$( document ).ready(function(){
	var current = window.location.href;
	var str = "uar=false"
	
	if(current.indexOf("?" + str) > 0 || current.indexOf("&" + str) > 0){
		$("a").each(function (){
			if($( this ).hasClass('external-disclaimer') == false){
				var url = $( this ).attr("href")
				if(url.indexOf("http") == 0){
					if(url.indexOf("?") > 0){
						url += "&" + str;
					}else{
						url += "?" + str;
					}
					$(this).attr("href",url);
				}
			}
		});
	}
});