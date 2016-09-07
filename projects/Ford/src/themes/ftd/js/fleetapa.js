ND.fleetApA = ( function($, undefined) {
	
	fleetApA = {
    
        init: function(){
        	
        },
        initItems:function(){
        	if($("#benefits-data").size()>0){
	        	var data = $("#benefits-data").embeddedData(),
	        		benefits=$("#benefits");
	        	$("#benefits-template").tmpl(data).appendTo(benefits);
	        	this.rowsameHeight();
	        	this.initservice();
	        	this.initexpand();
        	}
        },
        rowsameHeight:function(){
        	var rowItem=$("#group #item");
        	$.each(rowItem,function(i){
        		var itemDiv=$(">div",rowItem.eq(i));
        		$.each(itemDiv,function(i){
        			var rheight=itemDiv.eq(0).height()+6;
        			if(i>0){
        			itemDiv.eq(i).height(rheight);
        			}
        		})
        	})
        },
        initservice:function(){
        	var serviceDiv=$("#service");
        	var rheight=$("#disclaimer",serviceDiv).height();
        	$("#phoneinfo",serviceDiv).css({"line-height":rheight+"px"});
	        $("#phoneinfo",serviceDiv).height(rheight);
        	
        },initexpand:function(){
        	var slef=this,
        		elmoreitem=$("#benefits #item");
        	
        	$.each(elmoreitem,function(i){
        		
        		$(".fleetexpand",elmoreitem.eq(i)).click(function(){
        			$this=$(this);
            		$("p.moreinfo",$this.parent()).toggle(1,function(){
            		slef.rowsameHeight();
            		$("span.more",$this).toggle();
            		$("span.less",$this).toggle();
            		});
            	})
        	})
        	
        },
        /*
         * @param, rowtag, identify each row in the page
         * @param, elmtag, columns under each row needs to be resized
         * @param, imgtag, img in each col if exist
         * @param, coltag, columns without imgtag
         * @param, htag
         * @param, emswidth, element width
         */
        resizeColunm:function(rowtag,elmtag,imgtag,coltag,htag,emswidth){
        	var row = $(rowtag);
        	if(row.length>0){//row exist
        		$(row).each(function(index){
        			var	imgmaxHeight=0,//initialize
		        		pmaxHeight=0,
		        		hmaxHeight=0,
		        		imgitem,
		        		pitem,
		        		hitem,
		        		totalwid=0;
        			var col = $(this).find(elmtag);
        			if(col.size()>0){
			        	$.each(col,function(i){
			        		imgitem=$(imgtag,col.eq(i));
			        		pitem=$(coltag,col.eq(i));
			        		hitem=$(htag,col.eq(i));
			        		
			        		if(imgitem.height()>imgmaxHeight){
			        			imgmaxHeight=imgitem.height();
			        		}
			        		if(pitem.height()>pmaxHeight){
			        			pmaxHeight=pitem.height();
			        		}
			        		if(hitem.height()>hmaxHeight){
			        			hmaxHeight=hitem.height();
			        		}
			        		totalwid+=col.eq(i).outerWidth(true);
			        	})
			        	
			        	$(imgtag,col).height(imgmaxHeight);
			        	$(coltag,col).height(pmaxHeight);
			        	$(htag,col).height(hmaxHeight);
			        	
			        	//to resize each width of col
			        	if(rowtag=="#columns"&&elmtag=="#column"){//only apply to columns tag
			        		var _noCol = 0;
							var _totalWidth = $(rowtag).width();
							
							_ColArr=$(rowtag).find(elmtag);
							_noCol=_ColArr.length;
							
							if(_noCol>0){
								_ColArr.each(function(index){
									var oldColWidth = $(this).width();
									var newColWidth = _totalWidth/_noCol-($(this).outerWidth()-oldColWidth)-12;// minus padding+border and 16px of marginLeft
									
									$(this).css({
										"width":newColWidth
									})
								})
							}
			        	}else{
			        		col.eq(0).css({"margin-left":(emswidth-totalwid)/2+"px"});
			        	}
		        	}
        		});
        	}
        },
        //dynamically change col size of each table row base on contents
        resizeBenefitsTable:function(){
        	var _benefitsGroup = $("#benefits");
        	var _groupWidth = _benefitsGroup.width();
        	var _row = _benefitsGroup.find("#group").children("#item")
        	var _header = _benefitsGroup.find("#head");
        	var _service = _benefitsGroup.find("#service");
        	var _availableHeaderWidth = _groupWidth-_header.width();
        	var _availableServiceWidth = _groupWidth-_service.width();
        	var _increaseHeaderWidth = _availableHeaderWidth/_header.children("div").length;//current items in header
        	var _increaseRowWidth = _availableHeaderWidth/_row.eq(0).children("div").length;//current items in row
        	
        	var _firstHeaderCol = _header.children("div:eq(0)");
        	var _firstHeaderColOuterWidth = _firstHeaderCol.outerWidth()-_firstHeaderCol.width();//cal padding border etc
        	var _firstRowCol = _row.eq(0).children("div:eq(0)");
        	var _firstRowOuterWidth = _firstRowCol.outerWidth()-_firstRowCol.width();//cal padding border etc
        	
        	if(_benefitsGroup){
        		if(_header.length>0){//if exist ,set width of header
        			_header.children("div").each(function(index){
        				if(_row.eq(0).children("div").length<=2){
    						if(index==0){
    							$(this).css({
			        				width:420-_firstHeaderColOuterWidth
			        			})
    						}else{
    							$(this).css({
			        				width:_groupWidth-420-($(this).outerWidth()-$(this).width())
			        			})
    						}
    					}else{
    						$(this).css({
		        				width:$(this).width()+_increaseHeaderWidth
		        			})
    					}
	        		});
        		}
        		if(_row.length>0){//if exist ,set width of row
        			_row.each(function(){//each row
        				$(this).children("div").each(function(index){//each col
        					if(_row.eq(0).children("div").length<=2){
        						if(index==0){
        							$(this).css({
				        				width:420-_firstRowOuterWidth
				        			})
        						}else{
        							$(this).css({
				        				width:_groupWidth-420
				        			})
        						}
        					}else{
        						$(this).css({
			        				width:$(this).width()+_increaseRowWidth
			        			})
        					}
        				})
        			});
        		}
        		if(_service.length>0){//if exist , set width of service
        			var _firstColWidth = _row.eq(0).children("div:eq(0)").outerWidth();//include padding
        			var _restAvailableColWidth = _groupWidth-_firstColWidth;
        			var _noPhoneItem = _service.children("#phoneinfo").length;
        			var _increaseServiceWidth = _restAvailableColWidth/_noPhoneItem;//current phone items in service
        			_service.children("#disclaimer").each(function(){
	        			$(this).css({
	        				width:_firstColWidth
	        			})
	        		});
	        		if(_noPhoneItem==1){//if only 1 phone item, remove border right which set from css
	        			_service.children("#phoneinfo").eq(0).css({
	        				"border-right":0
	        			})
	        		}
        			_service.children("#phoneinfo").each(function(){
	        			$(this).css({
	        				width:_increaseServiceWidth-($(this).outerWidth()-$(this).width())//for those item has border ,padding and margin
	        			})
	        		});
        		}
        	}
        },
        resizeServiceWid:function(){
        	var sitem=$("#servicedetail #colservice");
        	if(sitem.size()>1){
        		sitem.css({"width":"50%"})
        	}else{
        		sitem.css({"width":"100%"})
        	}
        },
        expandvechilelist:function(){
        	var $carinfo = $("#availablelist #caritem #carinfo"),
        		$carinfoHeader = $carinfo.siblings("a");
        	if($carinfo.length>0){
        		$carinfo.hide();
        		$carinfoHeader.hover(function(){
        			var $header = $(this);
        			if($header.siblings("#carinfo").is(":hidden")){//if collapsed, add/remove active on hover
						$header.addClass("active");
					}else{
						$header.removeClass("active");
					}
        		},function(){
        			var $header = $(this);
        			if($header.siblings("#carinfo").is(":hidden")){//if collapsed, add/remove active on hover
						$header.removeClass("active");
					}else{
						$header.addClass("active");
					}
        		});
    		}
        	$("#availablelist #caritem>a").click(function(e){
        		var curelmt=$(this);
        		var curCarinfo=curelmt.parent("#caritem").children("#carinfo:eq(0)");
        		if(curCarinfo.length!=0){//if has details
        			e.preventDefault();	
			    	e.stopPropagation();
        		}
        		if(curCarinfo.is(":hidden")){
        			$("#availablelist #caritem>a").removeClass("active");//reset all cols
        			$("#availablelist #carinfo").hide();
        			curelmt.addClass("active");
        			$("#carinfo",curelmt.parent()).show();
        		}else{
        			$("#availablelist #caritem>a").removeClass("active");//reset all cols
        			$("#availablelist #carinfo").hide();
        		}
        	})
        }
		
		
    };
    
	$(function(){
		fleetApA.resizeColunm("#availableitem #carinfo","#carinfoitem","#img","#detail","h5",870);
		fleetApA.initItems();
		fleetApA.resizeBenefitsTable();
		fleetApA.resizeServiceWid();
		fleetApA.expandvechilelist();
	});
}(jQuery)); 