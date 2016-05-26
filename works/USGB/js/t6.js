/*
Author: Joel Wang
Description:
Dependencies: jQuery
*/
(function($){
	docListTable = {
		init: function(){
			if(!$(".content").length) return;
			this.searchData();

		},
		searchData:function(){
			var searchContainer = $(".search-box");
			var form = $("form", searchContainer);
			form.submit(function(e){
				e.preventDefault();
				docListTable.formSubmit();
			});
		},
		formSubmit: function(){
			var searchContainer = $(".search-box"),
				searchText = $(".text-search", searchContainer).val();
			docListTable.runSearch(searchText);
		},
		runSearch:function(keywords){
			var restURL = "json/test.json";
			docListTable.fetchData(restURL,
				function(data){
					console.log("success");
				},
				function(url,e,extStatus){
					console.log("fail");
				});
		},
		fetchData: function(url,onSuccess, onError){
			$.ajax({
				url:url,
				async:true,
				dataType:"json",
				success:function(data){
					if(data.length >0 ) {
						onSuccess(data);
					} else {

					}
				},
				error: function(e, extStatus) {
					onError(url, e, extStatus);
				}
			});
		}
	};
	$(function(){
		docListTable.init();
	});

})(jQuery);