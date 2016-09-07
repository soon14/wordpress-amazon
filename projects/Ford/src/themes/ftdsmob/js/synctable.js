/* sync the height of the table rows*/
(function($) {
	window.SyncTable = function(syncContainer) {
		var syncTable = this;

		syncTable.sync = function() {
			var tables = $(syncContainer).children("table");

			if (tables.size() == 2) {
				var list1 = $(tables[0]).find("tbody>tr");
				var list2 = $(tables[1]).find("tbody>tr");
				
				
             
             
				//only need to sync up with the smaller one
				var len = list1.length > list2.length ? list2.length : list1.length;

				for(var idx = 0;idx<len;idx++){
					var height1 = $(list1[idx]).height();
					var height2 = $(list2[idx]).height();

					if(height1 != height2){
						if(height1>height2){
							$(list2[idx]).css({height:height1});
							
						}else{
							$(list1[idx]).css({height:height2});
							
						}
					}
				}
			}
		};
	};


})(jQuery);