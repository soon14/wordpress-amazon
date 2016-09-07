/*
* Project: B515
* Description: B515 Experience layer
* Reading: http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
* Author: York Zhang
*/

/*globals jQuery, ND, window */
var ND = (function(ND, $) {
	
	//The create function creates the module object; It does no initialise the object
	ND.tileTransform = function () {
	
		/*
		 * Write private variables and functions here in this closure.
		 * They don't need to be just utility functions, they can refer to the private instance variables 
		 */
		var element,
			hasA;
		
		/*
		 * returns a new object that is the functionality of the module
		 * It has access to the private variables and functions declared in this closure.
		 */
		return {

			/*
			 * init Function. Needs to be called to initialise the new module object
			 * 
			 * eg. var myModule = ND.myModuleName()
			 *     myModule.init(); 
			 */
			init: function( elem ) { 
				
				/* Cache the jQuery instance of the element(s) this belongs too.
				 * Bake in default selectors. 
				 */
				element = $(elem || ".staging-wrap");
					
				/* Check this module needs to be initalised for this page */
				if( !element || !element.size() ) { return this; }

				var stagingHidden = $("div.staging-hidden", element);

				var hiddenContent = $("div.current.staging",element).find("div.center div.hidden-content").html();
				var textStaging = element.find("div.displayed-content");
				var isIE8 = $.browser.msie && $.browser.version < 9;
				var is_iPad = function(){
					var ua = navigator.userAgent.toLowerCase();
					if(ua.match(/iPad/i)=="ipad") {
						return true;
				 	} else {
						return false;
					}
				}();
				var is_webkit = $.browser.webkit;
				if(is_webkit){
					$("body").addClass("is-webkit");
				}

				if(is_iPad){
					$("body").addClass("is-ipad");
				}else{
					$("body").addClass("not-ipad");
				}

				var mapData = $.parseJSON($("#content-map").html());
				var contentMap = mapData.map;
				var defaultTileIndex = mapData.defaultTileIndex;
				var imageSlider = {};
				/* get content map's row sum and column sum, start from 0 */
				var rowMax = 0;
				var colMax = 0;
				$.each(contentMap,function(i,value){
					var rowValue = parseInt(value.row); 
					var colValue = parseInt(value.col);
					rowMax = (rowValue > rowMax) ? rowValue : rowMax;
					colMax = (colValue > colMax) ? colValue : colMax;
				});

				var easingEffect = "easeInOutQuart";
				var tileMovingDuration = 1500;
				// var easingEffect = "linear";
				// var tileMovingDuration = 800;

				//console.log(rowMax, colMax);
				//$("#slider").slider();
				
				textStaging.html(hiddenContent);
				if($("div.current.staging",element).find("div.center div.hidden-content").size()<1){
					textStaging.hide();
				}

	            var trackTile = function(tile) {
	            	//console.log("click tracking");
	                ND.analyticsTag.trackOmniturePage({
	                	pname: tile.attr('data-pname'),
	                	hier: tile.attr('data-hier')
	                });
	            };

	            var trackInitialTile = function(tile) {
	            	//console.log("init tracking");
	            	var tile_pname = tile.attr('data-pname'),
	            		tile_pnameArr,
	            		tile_pnameArrLength,
	            		intcmpValue;
	            	if(tile_pname != undefined){
		            	tile_pnameArr = tile_pname.split(":");
		            	tile_pnameArrLength = tile_pnameArr.length;
		            	s.eVar13 = s.prop13 = "exp-" + tile_pnameArr[tile_pnameArrLength - 1] + "-" + _da.nameplate.name;
		            }


	                ND.analyticsTag.trackOmniturePage({
	                	pname: tile.attr('data-pname'),
	                	hier: tile.attr('data-hier'),
	                	tool: tile.attr('data-tool'),
	                	tooldesc: tile.attr('data-tooldesc')
	                });
	            };

				var tilesRotate = function(option){
					//var clickedTile = is_webkit ? option.selector.find("div.border-hack") : option.selector;
					var clickedTile =  option.selector;
					clickedTile.live("click",function(){
						//var $thisTile = is_webkit ? $(this).parents("div.item-wrap") : $(this);
						var $thisTile = $(this);
						//trackTile($thisTile);
						$thisTile.trigger("mouseleave");
						//console.log($("div.current.staging",element).find("div.center div.item ul.image-slider").size());
						//imageSlider.destroySlider();
						if($("div.current.staging",element).find("div.center div.item ul.image-slider").size()>0){
							//console.log("destroy");
							imageSlider.stopAuto();
							$("div.current.staging",element).find("div.center div.item div.image-slider-wrap").hide();
							imageSlider.destroySlider();
							imageSlider = {};
						}
						textStaging.fadeOut();

						$("div.staging-wrap div.loading-cover").addClass("trans").show();

						/* make the tile in the center tile dark slowly */
						$("div.current.staging",element).find("div.center div.item").css({"background-color":"#000"});
						$("div.current.staging",element).find("div.center div.item > img").animate({"opacity":0.3},500,function(){
							$("div.staging-wrap div.loading-cover").removeClass("trans");
						});
						
						/* change the hash according to the tile's name */
						var hashString = "tile=" + $thisTile.attr("tilename"); 
						var hashStringPlus = "#" + hashString;
						location.hash = hashString;

						$("div.map-nav").find("div.link > a.active").addClass("visited").removeClass("active");
						$("div.map-nav div.link > a").each(function(){
							var $this = $(this);
							if($this.attr("href") == hashStringPlus){
								$this.addClass("active");
							}
						});

						var rowa = parseInt($thisTile.attr("tilerow_a")),
							rowb = parseInt($thisTile.attr("tilerow_b")),
							col = parseInt($thisTile.attr("tilecol")),
							tileIndex = parseInt($thisTile.attr("tileindex"));

						getTileData(option,rowa,rowb,col,tileIndex);

					});
				};

				var getTileData = function(option,rowa,rowb,col,tileIndex){
					var stagingNewest = stagingHidden.clone();
					var prevRow = (rowa-1 >= 0) ? rowa-1 : rowMax,
						nextRow = (rowb+1 <= rowMax) ? rowb+1 : 0,
						prevCol = (col-1 >= 0) ? col-1 : colMax,
						nextCol = (col+1 <= colMax) ? col+1 : 0;

					var tilesIndex = {};

					$.each(contentMap,function(i,tile){
						
						if(parseInt(tile.row) == rowa && parseInt(tile.col) == prevCol){ //try to get the left-top tile's index
							if(tile.tileIndex != "-1"){

								tilesIndex.leftTop = tile.tileIndex;
							}else{
								$.each(contentMap,function(i,tile){
									
									if(parseInt(tile.row) == rowMax && parseInt(tile.col) == prevCol ){
										tilesIndex.leftTop = tile.tileIndex;
									}
								});
							}
						}else if(parseInt(tile.row) == rowb && parseInt(tile.col) == prevCol){ //try to get the left-bottom tile's index
							
							if(tile.tileIndex != "-1"){
								
								tilesIndex.leftBottom = tile.tileIndex;
							}else{
								$.each(contentMap,function(i,tile){
									
									if(parseInt(tile.row) == 0 && parseInt(tile.col) == prevCol ){
										tilesIndex.leftBottom = tile.tileIndex;
									}
								});
							}
						}else if(parseInt(tile.row) == rowa && parseInt(tile.col) == nextCol){ //try to get the right-top tile's index
							
							if(tile.tileIndex != "-1"){
								
								tilesIndex.rightTop = tile.tileIndex;
							}else{
								$.each(contentMap,function(i,tile){
									
									if(parseInt(tile.row) == rowMax && parseInt(tile.col) == nextCol ){
										tilesIndex.rightTop = tile.tileIndex;
									}
								});
							}
						}else if(parseInt(tile.row) == rowb && parseInt(tile.col) == nextCol){ //try to get the right-bottom tile's index
							
							if(tile.tileIndex != "-1"){
								
								tilesIndex.rightBottom = tile.tileIndex;
							}else{
								$.each(contentMap,function(i,tile){
									
									if(parseInt(tile.row) == 0 && parseInt(tile.col) == nextCol ){
										tilesIndex.rightBottom = tile.tileIndex;
									}
								});
							}
						}else if(parseInt(tile.row) == prevRow && parseInt(tile.col) == col){ //try to get the Top tile's index
							
							if(tile.tileIndex != "-1"){
								
								tilesIndex.top = tile.tileIndex;
							}else{
								$.each(contentMap,function(i,tile){
									
									if(parseInt(tile.row) == rowMax-1 && parseInt(tile.col) == col ){
										tilesIndex.top = tile.tileIndex;
									}
								});
							}
						}else if(parseInt(tile.row) == nextRow && parseInt(tile.col) == col){ //try to get the bottom tile's index
							
							if(tile.tileIndex != "-1"){
								
								tilesIndex.bottom = tile.tileIndex;
							}else{
								$.each(contentMap,function(i,tile){
									
									if(parseInt(tile.row) == 1 && parseInt(tile.col) == col ){
										tilesIndex.bottom = tile.tileIndex;
									}
								});
							}
						}
					});

					var leftTopData = $.grep(contentMap,function(value,i){
						return(parseInt(value.tileIndex) == tilesIndex.leftTop);
					});
					
					var leftBottomData = $.grep(contentMap,function(value,i){
						return(parseInt(value.tileIndex) == tilesIndex.leftBottom);
					});

					var rightTopData = $.grep(contentMap,function(value,i){
						return(parseInt(value.tileIndex) == tilesIndex.rightTop);
					});
					
					var rightBottomData = $.grep(contentMap,function(value,i){
						return(parseInt(value.tileIndex) == tilesIndex.rightBottom);
					});

					var topData = $.grep(contentMap,function(value,i){
						return(parseInt(value.tileIndex) == tilesIndex.top);
					});
					
					var bottomData = $.grep(contentMap,function(value,i){
						return(parseInt(value.tileIndex) == tilesIndex.bottom);
					});

					var centerData = $.grep(contentMap,function(value,i){
						return(parseInt(value.tileIndex) == tileIndex);
					});

					$.when(
						/* get center tile's content */
						$.ajax({
							type:"GET",
							url:centerData[0].url,
							success:function(data){
								var newContent = $(data).addClass("center active").attr("tilerow_a",centerData[0].row).attr("tilerow_b",centerData[1].row).attr("tilecol",centerData[0].col).attr("tileindex",centerData[0].tileIndex).attr("tilename",centerData[0].tileName);
								stagingNewest.append(newContent);

/*								stagingNewest.find("div.center.active div.item > img").load(function(){
									$(this).parent("div.item").css({"background-color":"#fff"});
								});*/
							}
						}),

						/* get left-top tile's content */
						$.ajax({
							type:"GET",
							url:leftTopData[0].minorUrl,
							success:function(data){
								var newContent = $(data).addClass("left-top").attr("tilerow_a",leftTopData[0].row).attr("tilerow_b",leftTopData[1].row).attr("tilecol",leftTopData[0].col).attr("tileindex",leftTopData[0].tileIndex).attr("tilename",leftTopData[0].tileName);
								stagingNewest.append(newContent);
							}
						}),

						/* get left-bottom tile's content */
						$.ajax({
							type:"GET",
							url:leftBottomData[0].minorUrl,
							success:function(data){
								var newContent = $(data).addClass("left-bottom").attr("tilerow_a",leftBottomData[0].row).attr("tilerow_b",leftBottomData[1].row).attr("tilecol",leftBottomData[0].col).attr("tileindex",leftBottomData[0].tileIndex).attr("tilename",leftBottomData[0].tileName);
								stagingNewest.append(newContent);
							}
						}),

						/* get right-top tile's content */
						$.ajax({
							type:"GET",
							url:rightTopData[0].minorUrl,
							success:function(data){
								var newContent = $(data).addClass("right-top").attr("tilerow_a",rightTopData[0].row).attr("tilerow_b",rightTopData[1].row).attr("tilecol",rightTopData[0].col).attr("tileindex",rightTopData[0].tileIndex).attr("tilename",rightTopData[0].tileName);
								stagingNewest.append(newContent);
							}
						}),

						/* get right-bottom tile's content */
						$.ajax({
							type:"GET",
							url:rightBottomData[0].minorUrl,
							success:function(data){
								var newContent = $(data).addClass("right-bottom").attr("tilerow_a",rightBottomData[0].row).attr("tilerow_b",rightBottomData[1].row).attr("tilecol",rightBottomData[0].col).attr("tileindex",rightBottomData[0].tileIndex).attr("tilename",rightBottomData[0].tileName);
								stagingNewest.append(newContent);
							}
						}),

						/* get top tile's content */
						$.ajax({
							type:"GET",
							url:topData[0].minorUrl,
							success:function(data){
								var newContent = $(data).addClass("top").attr("tilerow_a",topData[0].row).attr("tilerow_b",topData[1].row).attr("tilecol",topData[0].col).attr("tileindex",topData[0].tileIndex).attr("tilename",topData[0].tileName);
								stagingNewest.append(newContent);
							}
						}),

						/* get bottom tile's content */
						$.ajax({
							type:"GET",
							url:bottomData[0].minorUrl,
							success:function(data){
								var newContent = $(data).addClass("bottom").attr("tilerow_a",bottomData[0].row).attr("tilerow_b",bottomData[1].row).attr("tilecol",bottomData[0].col).attr("tileindex",bottomData[0].tileIndex).attr("tilename",bottomData[0].tileName);
								stagingNewest.append(newContent);
							}
						})

					).then(function(){
						
						stagingNewest.find("div.item").each(function(){
							//$(this).append("<div class='border-hack'></div>");
							$(this).append("<div class='top-cover'></div><div class='bottom-cover'></div><div class='left-cover'></div><div class='right-cover'></div>");
						});
						
						if(is_iPad){
							var i = 0;
							
							stagingNewest.find("div.item > img").each(function(index,element){
								if(element.complete){
									i++;
									
									if(i == 7){//image already complete
										
										if(!option.initialLoading){
											setTimeout(function(){
												rotateCallback(option,stagingNewest);
											},500);
										}else{
											
											rotateCallback(option,stagingNewest);
										}
									}
								}else{
									element.onload = function(){
										i++;
										
										if(i == 7){//when image complete
											
											if(!option.initialLoading){
												setTimeout(function(){
													rotateCallback(option,stagingNewest);
												},500);
											}else{
												
												rotateCallback(option,stagingNewest);
											}
										}
									}
								}

							});
						}else{
							if(!option.initialLoading){
								setTimeout(function(){
									rotateCallback(option,stagingNewest);
								},500);
							}else{
								
								rotateCallback(option,stagingNewest);
								// var $centerTile = stagingNewest.find("div.center.item-wrap");
								// trackTile($centerTile);
							}
						}
						
					});
				}

				var rotateCallback = function(option,stagingNewest){
					$("div.staging-wrap div.loading-cover").hide();

					if(option.initialLoading){
						var $centerTile = stagingNewest.find("div.center.item-wrap");
						trackInitialTile($centerTile);
					}else{
						var $centerTile = stagingNewest.find("div.center.item-wrap");
						trackTile($centerTile);
					}
					
					if(isIE8){
						stagingNewest.css({
							"-webkit-transform":"rotate(5deg)",
							"-moz-transform":"rotate(5deg)",
							"-ms-transform":"rotate(5deg)",
							zIndex:9,
							"top":option.stagingTopPositionIE8,
							"left":option.stagingLeftPositionIE8
						});
					}else{
						stagingNewest.css({
							"-webkit-transform":"rotate(5deg)",
							"-moz-transform":"rotate(5deg)",
							"-ms-transform":"rotate(5deg)",
							zIndex:9,
							"top":option.stagingTopPosition,
							"left":option.stagingLeftPosition
						});
					}


					/* make the tile in the center tile dark slowly */

					//easingEffect = $(".easing-option").val();
					stagingNewest.appendTo(element).show();

					if(option.tileShiftingA){
						stagingNewest.find("div.left-bottom").css({"top":300-490}).animate({"top":300},tileMovingDuration,easingEffect);
						stagingNewest.find("div.left-top").css({"top":-190-490}).animate({"top":-190},tileMovingDuration,easingEffect);
						stagingNewest.find("div.right-bottom").css({"top":300+490}).animate({"top":300},tileMovingDuration,easingEffect);
						stagingNewest.find("div.right-top").css({"top":-190+490}).animate({"top":-190},tileMovingDuration,easingEffect);
						if(option.tileShiftingAleft){
							$("div.current.staging",element).find("div.center").animate({"top":55-490},tileMovingDuration,easingEffect);
							$("div.current.staging",element).find("div.top").animate({"top":-535-490},tileMovingDuration,easingEffect);

							var tempImg = $("div.current.staging",element).find("div.bottom > div.item > img").clone();
							var realImg = stagingNewest.find("div.right-top > div.item > img");
							realImg.css({"opacity":0});
							stagingNewest.find("div.right-top > div.item").append(tempImg);
							realImg.animate({"opacity":0.3},tileMovingDuration,easingEffect);
							tempImg.animate({"opacity":0},tileMovingDuration,easingEffect,function(){
								tempImg.remove();
							});
						}else if(option.tileShiftingAright){
							$("div.current.staging",element).find("div.center").animate({"top":55+490},tileMovingDuration,easingEffect);
							$("div.current.staging",element).find("div.bottom").animate({"top":545+490},tileMovingDuration,easingEffect);

							var tempImg = $("div.current.staging",element).find("div.top > div.item > img").clone();
							var realImg = stagingNewest.find("div.left-bottom > div.item > img");
							realImg.css({"opacity":0});
							stagingNewest.find("div.left-bottom > div.item").append(tempImg);
							realImg.animate({"opacity":0.3},tileMovingDuration,easingEffect);
							tempImg.animate({"opacity":0},tileMovingDuration,easingEffect,function(){
								tempImg.remove();
							});
						}
					}else if(option.tileShiftingB){
						stagingNewest.find("div.left-bottom").css({"top":300+490}).animate({"top":300},tileMovingDuration,easingEffect);
						stagingNewest.find("div.left-top").css({"top":-190+490}).animate({"top":-190},tileMovingDuration,easingEffect);
						stagingNewest.find("div.right-bottom").css({"top":300-490}).animate({"top":300},tileMovingDuration,easingEffect);
						stagingNewest.find("div.right-top").css({"top":-190-490}).animate({"top":-190},tileMovingDuration,easingEffect);
						if(option.tileShiftingBleft){
							$("div.current.staging",element).find("div.center").animate({"top":55+490},tileMovingDuration,easingEffect);
							$("div.current.staging",element).find("div.bottom").animate({"top":545+490},tileMovingDuration,easingEffect);
							
							var tempImg = $("div.current.staging",element).find("div.top > div.item > img").clone();
							var realImg = stagingNewest.find("div.right-bottom > div.item > img");
							realImg.css({"opacity":0});
							stagingNewest.find("div.right-bottom > div.item").append(tempImg);
							realImg.animate({"opacity":0.3},tileMovingDuration,easingEffect);
							tempImg.animate({"opacity":0},tileMovingDuration,easingEffect,function(){
								tempImg.remove();
							});
						}else if(option.tileShiftingBright){
							$("div.current.staging",element).find("div.center").animate({"top":55-490},tileMovingDuration,easingEffect);
							$("div.current.staging",element).find("div.top").animate({"top":-435-490},tileMovingDuration,easingEffect);

							var tempImg = $("div.current.staging",element).find("div.bottom > div.item > img").clone();
							var realImg = stagingNewest.find("div.left-top > div.item > img");
							realImg.css({"opacity":0});
							stagingNewest.find("div.left-top > div.item").append(tempImg);
							realImg.animate({"opacity":0.3},tileMovingDuration,easingEffect);
							tempImg.animate({"opacity":0},tileMovingDuration,easingEffect,function(){
								tempImg.remove();
							});
						}
					}else if(option.tileShiftingC){
						stagingNewest.find("div.left-bottom").css({"top":300-490}).animate({"top":300},tileMovingDuration,easingEffect);
						stagingNewest.find("div.left-top").css({"top":-190-490}).animate({"top":-190},tileMovingDuration,easingEffect);
						stagingNewest.find("div.right-bottom").css({"top":300-490}).animate({"top":300},tileMovingDuration,easingEffect);
						stagingNewest.find("div.right-top").css({"top":-190-490}).animate({"top":-190},tileMovingDuration,easingEffect);

						$("div.current.staging",element).find("div.left-bottom").animate({"top":300+490},tileMovingDuration,easingEffect);
						$("div.current.staging",element).find("div.left-top").animate({"top":-190+490},tileMovingDuration,easingEffect);
						$("div.current.staging",element).find("div.right-bottom").animate({"top":300+490},tileMovingDuration,easingEffect);
						$("div.current.staging",element).find("div.right-top").animate({"top":-190+490},tileMovingDuration,easingEffect);

					}else if(option.tileShiftingD){
						stagingNewest.find("div.left-bottom").css({"top":300+490}).animate({"top":300},tileMovingDuration,easingEffect);
						stagingNewest.find("div.left-top").css({"top":-190+490}).animate({"top":-190},tileMovingDuration,easingEffect);
						stagingNewest.find("div.right-bottom").css({"top":300+490}).animate({"top":300},tileMovingDuration,easingEffect);
						stagingNewest.find("div.right-top").css({"top":-190+490}).animate({"top":-190},tileMovingDuration,easingEffect);

						$("div.current.staging",element).find("div.left-bottom").animate({"top":300-490},tileMovingDuration,easingEffect);
						$("div.current.staging",element).find("div.left-top").animate({"top":-190-490},tileMovingDuration,easingEffect);
						$("div.current.staging",element).find("div.right-bottom").animate({"top":300-490},tileMovingDuration,easingEffect);
						$("div.current.staging",element).find("div.right-top").animate({"top":-190-490},tileMovingDuration,easingEffect);

					}

					/* make the tile in the center tile dark immediately */
					
					if(option.initialLoading){
						if(option.navClicked){
							$("div.global-nav",element).animate({"top":-600},500);
							$("div.current.staging",element).remove();
						}

						stagingNewest.addClass("current");

						if($("div.current.staging",element).find("div.center div.hidden-content").size()>0){
							var hiddenContent = $("div.current.staging",element).find("div.center div.hidden-content").html();

							textStaging.html(hiddenContent);
							stagingNewest.find("div.center.active div.item > img").css({"opacity":1});
							if(textStaging.find("a.auto-run").size()>0){
								//console.log("auto");
								var isManual = textStaging.find("a.auto-run").hasClass("manual") ? true : false;
								var required_url = textStaging.find("a.auto-run").attr("href");
								$("div.loading-cover",element).addClass("darker").show();

								autoImageCarousel(required_url,isManual);
							}else{
								textStaging.fadeIn();
							}
						}
					}else{

						if(isIE8 && option.middleColumn){
							$("div.current.staging",element).animate({
								"left":-option.stagingLeftPositionIE8,
								"top":-option.stagingTopPositionIE8
							},tileMovingDuration,easingEffect);
						}else{
							$("div.current.staging",element).animate({
								"left":-option.stagingLeftPosition,
								"top":-option.stagingTopPosition
							},tileMovingDuration,easingEffect);
						}

						stagingNewest.find("div.center.active div.item > img").animate({"opacity":1},1200);

						stagingNewest.animate({"left":"0px","top":"0px"},tileMovingDuration,easingEffect,function(){

							$("div.current.staging",element).remove();
							stagingNewest.addClass("current");

							if($("div.current.staging",element).find("div.center div.hidden-content").size()>0){
								var hiddenContent = $("div.current.staging",element).find("div.center div.hidden-content").html();

								textStaging.html(hiddenContent);
								if(textStaging.find("a.auto-run").size()>0){
									var isManual = textStaging.find("a.auto-run").hasClass("manual") ? true : false;
									var required_url = textStaging.find("a.auto-run").attr("href");
									$("div.loading-cover",element).addClass("darker").show();

									autoImageCarousel(required_url,isManual);
								}else{
									textStaging.fadeIn();
								}
								
							}

						});
					}
				}

				/* click and drag (view 360) */
				var pad = function(num, size) {
				    var s = num+"";
				    while (s.length < size) s = "0" + s;
				    return s;
				}

				var clickAndDrag = function(required_url){
					$.ajax({
						type:"GET",
						url:required_url,
						success:function(data){
							$("div.current.staging",element).find("div.center.active > div.item").append(data);
						},
						complete:function(){
							var centerTileItem = $("div.current.staging div.center.active > div.item");
							// centerTileItem.find("div.border-hack").remove();
							// centerTileItem.append("<div class='top-cover'></div><div class='bottom-cover'></div><div class='left-cover'></div><div class='right-cover'></div>");
							var sliderData = centerTileItem.find(".view360-data").embeddedData();
							//$("div.loading-cover",element).fadeOut().removeClass("darker");//
							var imagesArr = [];
							
							var imgCount = 0;

							for (var i = sliderData.start; i <= sliderData.end; i++) {
								imagesArr.push(sliderData.imagesLocation + sliderData.imageName + pad(i, sliderData.counterFormat.length) + "." + sliderData.extension);
								var imageObj = new Image();
								imageObj.src = sliderData.imagesLocation + sliderData.imageName + pad(i, sliderData.counterFormat.length) + "." + sliderData.extension;
								if(imageObj.complete){
									imgCount++;
									if(imgCount == (sliderData.end - sliderData.start +1)){
										
										$("div.loading-cover",element).fadeOut().removeClass("darker");
										var imgStaging = centerTileItem.find("div.view360-wrap img.view360-staging");
										var dragSlider = $("div.current.staging",element).find("div.center.active > div.item div.view360-wrap");
										dragSlider.find("div.view360-slider").slider({
											min:0,
											max:imagesArr.length - 1,
											create:function(){
												imgStaging.attr("src",imagesArr[0]);
												centerTileItem.find("div.view360-wrap").show();
												centerTileItem.children("img").hide();
												var sliderHandle = dragSlider.find("a.ui-slider-handle");
												sliderHandle.append("<span class='left-arrow'></span><span class='right-arrow'></span>");
												if(!!sliderData.showText){
													var showText = $("<img class='show-text'>");
													showText.attr("src",sliderData.showText).appendTo(dragSlider.find("div.view360-slider-wrap"));
													showText.load(function(){
														var imgWidth = $(this).width();
														var leftPosition = 26 - Math.floor(imgWidth/2);
														$(this).css({"left":leftPosition});
													});
												}

											},
											slide:function(event,ui){
												imgStaging.attr("src",imagesArr[ui.value]);
											},
											start:function(){
												dragSlider.find("div.view360-slider").addClass("move-active");
												dragSlider.find("img.show-text").hide();
												dragSlider.find("span.left-arrow, span.right-arrow").hide();
											},
											stop:function(){
												dragSlider.find("div.view360-slider").removeClass("move-active");
											}
										});
									}
								}else{
									$(imageObj).load(function(){
										imgCount++;
										
										if(imgCount == (sliderData.end - sliderData.start +1)){
											
											$("div.loading-cover",element).fadeOut().removeClass("darker");
											var imgStaging = centerTileItem.find("div.view360-wrap img.view360-staging");
											var dragSlider = $("div.current.staging",element).find("div.center.active > div.item div.view360-wrap");
											dragSlider.find("div.view360-slider").slider({
												min:0,
												max:imagesArr.length - 1,
												create:function(){
													imgStaging.attr("src",imagesArr[0]);
													centerTileItem.find("div.view360-wrap").show();
													centerTileItem.children("img").hide();
													var sliderHandle = dragSlider.find("a.ui-slider-handle");
													sliderHandle.append("<span class='left-arrow'></span><span class='right-arrow'></span>");
													if(!!sliderData.showText){
														var showText = $("<img class='show-text'>");
														showText.attr("src",sliderData.showText).appendTo(dragSlider.find("div.view360-slider-wrap"));
														showText.load(function(){
															var imgWidth = $(this).width();
															var leftPosition = 26 - Math.floor(imgWidth/2);
															$(this).css({"left":leftPosition});
														});
													}
												},
												slide:function(event,ui){
													imgStaging.attr("src",imagesArr[ui.value]);
												},
												start:function(){
													dragSlider.find("div.view360-slider").addClass("move-active");
													dragSlider.find("img.show-text").hide();
													dragSlider.find("span.left-arrow, span.right-arrow").hide();
												},
												stop:function(){
													dragSlider.find("div.view360-slider").removeClass("move-active");
												}

											});
										}
									});
								}

							};

							var imgStore = centerTileItem.find("div.image-store");
							$.each(imagesArr,function(index,value){
								$("<img>").attr("src",value).appendTo(imgStore);
							});

						}
					});
				}

				/* image carousel including auto and manual */
				var autoImageCarousel = function(required_url,isManual){
					//var overlayContent = $("div.lightbox-content",element);

					$.ajax({
						type:"GET",
						url:required_url,
						success:function(data){
							$("div.current.staging",element).find("div.center.active > div.item").append(data);
							//console.log(data);
						},
						complete:function(){
							if(isManual){
								/* special code for idad begin */
								var centerTileItem = $("div.current.staging div.center.active > div.item");
								// centerTileItem.find("div.border-hack").remove();
								// centerTileItem.append("<div class='top-cover'></div><div class='bottom-cover'></div><div class='left-cover'></div><div class='right-cover'></div>");
								/* special code for idad end */
								imageSlider = $("div.current.staging div.center.active > div.item ul.image-slider").bxSlider({
									mode:"fade",
									controls:true,
									onSliderLoad:function(){
										//$("div.current.staging",element).find("div.center.active > div.item > img").hide();
										$("div.current.staging",element).find("div.center.active div.image-slider-wrap").css({"visibility":"visible"});
										$("div.loading-cover",element).fadeOut(350,function(){
											textStaging.fadeIn();
											$("div.loading-cover",element).removeClass("darker");
										});
	/*									var currentSliderIndex = imageSlider.getCurrentSlide();
										var currentSlider = $("div.current.staging",element).find("div.center.active div.image-slider-wrap ul.image-slider > li > div.image").eq(currentSliderIndex);
										trackTile(currentSlider);*/
									},
									onSlideAfter:function(){
										var currentSliderIndex = imageSlider.getCurrentSlide();
										var currentSlider = $("div.current.staging",element).find("div.center.active div.image-slider-wrap ul.image-slider > li > div.image").eq(currentSliderIndex);
										trackTile(currentSlider);
									}
								});
							}else{
								imageSlider = $("div.current.staging div.center.active > div.item ul.image-slider").bxSlider({
									mode:"fade",
									controls:false,
									auto:true,
									autoStart:true,
									pause:4000,
									autoDelay:1500,
									pager:false,
									speed:1000,
									easing:"easeInOutBounce",
									onSliderLoad:function(){
										//$("div.current.staging",element).find("div.center.active > div.item > img").hide();
										$("div.current.staging",element).find("div.center.active div.image-slider-wrap").css({"visibility":"visible"});
										$("div.loading-cover",element).fadeOut(350,function(){
											textStaging.fadeIn();
											$("div.loading-cover",element).removeClass("darker");
										});
										setTimeout(function(){
											imageSlider.goToSlide(1);	
										},1500);
									}
								});
							}
						}
					});
				}
				
				/* initial loading option */
				var initialOption = {
					initialLoading:true,
					navClicked:false,
					hasHash:false
				};

				/* left-top area clicked */
				var leftTopOption = {
					leftTopLoading:true,
					selector:$("div.left-top"),
					stagingTopPosition:-313,
					stagingLeftPosition:-764,
					stagingTopPositionIE8:-245,
					stagingLeftPositionIE8:-788,
					tileShiftingB:true,
					tileShiftingBleft:true
				};

				tilesRotate(leftTopOption);

				/* left bottom area clicked */
				var leftBottomOption = {
					leftBottomLoading:true,
					selector:$("div.left-bottom"),
					stagingTopPosition:175,
					stagingLeftPosition:-806,
					stagingTopPositionIE8:245,
					stagingLeftPositionIE8:-788,
					tileShiftingA:true,
					tileShiftingAleft:true
				};

				tilesRotate(leftBottomOption);

				/* right bottom area clicked */
				var rightBottomOption = {
					rightBottomLoading:true,
					selector:$("div.right-bottom"),
					stagingTopPosition:313,
					stagingLeftPosition:764,
					stagingTopPositionIE8:245,
					stagingLeftPositionIE8:788,
					tileShiftingB:true,
					tileShiftingBright:true
				};

				tilesRotate(rightBottomOption);

				/* right top area clicked */
				var rightTopOption = {
					rightTopLoading:true,
					selector:$("div.right-top"),
					stagingTopPosition:-175,
					stagingLeftPosition:806,
					stagingTopPositionIE8:-245,
					stagingLeftPositionIE8:788,
					tileShiftingA:true,
					tileShiftingAright:true
				};

				tilesRotate(rightTopOption);

				/* top area clicked */
				var topOption = {
					topLoading:true,
					selector:$("div.top"),
					stagingTopPosition:-488,
					stagingLeftPosition:43,
					stagingTopPositionIE8:-490,
					stagingLeftPositionIE8:0,
					middleColumn:true,
					tileShiftingC:true
				};

				tilesRotate(topOption);
				
				/* bottom area clicked */
				var bottomOption = {
					bottomLoading:true,
					selector:$("div.bottom"),
					stagingTopPosition:488,
					stagingLeftPosition:-43,
					stagingTopPositionIE8:490,
					stagingLeftPositionIE8:0,
					middleColumn:true,
					tileShiftingD:true
				};

				tilesRotate(bottomOption);

				/* hover state setting */
				var hoverDistance = 15,
					tileHoverDuration = 270;
				var leftTopTile = {
						topValue:-190
					},
					leftBottomTile = {
						topValue:300
					},
					rightTopTile = {
						topValue:-190
					},
					rightBottomTile = {
						topValue:300
					},
					topTile = {
						topValue:-435
					},
					centerTile = {
						topValue:55
					},
					bottomTile = {
						topValue:545
					};

				/* left-top area hover */
				if(!is_iPad){
					$("div.left-top").live("mouseover",function(){
						var $this = $(this);
						$this.stop().animate({
							"top":leftTopTile.topValue + hoverDistance
						},tileHoverDuration);

						if(isIE8){
							$this.parent("div.staging").find("div.left-bottom.item-wrap").stop().animate({
								"top":leftBottomTile.topValue + hoverDistance
							},tileHoverDuration);
						}else{
							$this.siblings("div.left-bottom").stop().animate({
								"top":leftBottomTile.topValue + hoverDistance
							},tileHoverDuration);
						}
					});

					$("div.left-top").live("mouseleave",function(){
						var $this = $(this);
						$this.stop().animate({
							"top":leftTopTile.topValue
						},tileHoverDuration);

						if(isIE8){
							$this.parent("div.staging").find("div.left-bottom.item-wrap").stop().animate({
								"top":leftBottomTile.topValue
							},tileHoverDuration);
						}else{
							$this.siblings("div.left-bottom").stop().animate({
								"top":leftBottomTile.topValue
							},tileHoverDuration);
						}

					});

					/* left-bottom area hover */
					$("div.left-bottom").live("mouseover",function(){
						var $this = $(this);
						$this.stop().animate({
							"top":leftBottomTile.topValue - hoverDistance
						},tileHoverDuration);

						if(isIE8){
// console.log($this.parent("div.staging").find("div.left-top.item-wrap").size());
							$this.parent("div.staging").find("div.left-top.item-wrap").stop().animate({
								"top":leftTopTile.topValue - hoverDistance
							},tileHoverDuration);
						}else{
							$this.siblings("div.left-top").stop().animate({
								"top":leftTopTile.topValue - hoverDistance
							},tileHoverDuration);
						}
					});

					$("div.left-bottom").live("mouseleave",function(){
						var $this = $(this);
						$this.stop().animate({
							"top":leftBottomTile.topValue
						},tileHoverDuration);

						if(isIE8){
							$this.parent("div.staging").find("div.left-top.item-wrap").stop().animate({
								"top":leftTopTile.topValue
							},tileHoverDuration);
						}else{
							$this.siblings("div.left-top").stop().animate({
								"top":leftTopTile.topValue
							},tileHoverDuration);
						}
					});

					/* right-bottom area hover */
					$("div.right-bottom").live("mouseover",function(){
						var $this = $(this);
						$this.stop().animate({
							"top":rightBottomTile.topValue - hoverDistance
						},tileHoverDuration);

						if(isIE8){
							$this.parent("div.staging").find("div.right-top.item-wrap").stop().animate({
								"top":rightTopTile.topValue - hoverDistance
							},tileHoverDuration);
						}else{
							$this.siblings("div.right-top").stop().animate({
								"top":rightTopTile.topValue - hoverDistance
							},tileHoverDuration);
						}

					});

					$("div.right-bottom").live("mouseleave",function(){
						var $this = $(this);
						$this.stop().animate({
							"top":rightBottomTile.topValue
						},tileHoverDuration);

						if(isIE8){
							$this.parent("div.staging").find("div.right-top.item-wrap").stop().animate({
								"top":rightTopTile.topValue
							},tileHoverDuration);
						}else{
							$this.siblings("div.right-top").stop().animate({
								"top":rightTopTile.topValue
							},tileHoverDuration);
						}
					});

					/* right-top area hover */
					$("div.right-top").live("mouseover",function(){
						var $this = $(this);
						$this.stop().animate({
							"top":rightTopTile.topValue + hoverDistance
						},tileHoverDuration);

						if(isIE8){
							$this.parent("div.staging").find("div.right-bottom.item-wrap").stop().animate({
								"top":rightBottomTile.topValue + hoverDistance
							},tileHoverDuration);
						}else{
							$this.siblings("div.right-bottom").stop().animate({
								"top":rightBottomTile.topValue + hoverDistance
							},tileHoverDuration);
						}

					});

					$("div.right-top").live("mouseleave",function(){
						var $this = $(this);
						$this.stop().animate({
							"top":rightTopTile.topValue
						},tileHoverDuration);

						if(isIE8){
							$this.parent("div.staging").find("div.right-bottom.item-wrap").stop().animate({
								"top":rightBottomTile.topValue
							},tileHoverDuration);
						}else{
							$this.siblings("div.right-bottom").stop().animate({
								"top":rightBottomTile.topValue
							},tileHoverDuration);
						}

					});

					/* top area hover */
					$("div.top").live("mouseover",function(){
						var $this = $(this);
						$this.stop().animate({
							"top":topTile.topValue + hoverDistance
						},tileHoverDuration);

						if(isIE8){
							$this.parent("div.staging").find("div.center.item-wrap").stop().animate({
								"top":centerTile.topValue + hoverDistance
							},tileHoverDuration);
							
							$this.parent("div.staging").find("div.bottom.item-wrap").stop().animate({
								"top":bottomTile.topValue + hoverDistance
							},tileHoverDuration);
						}else{
							$this.siblings("div.center").stop().animate({
								"top":centerTile.topValue + hoverDistance
							},tileHoverDuration);
							
							$this.siblings("div.bottom").stop().animate({
								"top":bottomTile.topValue + hoverDistance
							},tileHoverDuration);
						}

					});

					$("div.top").live("mouseleave",function(){
						var $this = $(this);
						$this.stop().animate({
							"top":topTile.topValue
						},tileHoverDuration);

						if(isIE8){
							$this.parent("div.staging").find("div.center.item-wrap").stop().animate({
								"top":centerTile.topValue
							},tileHoverDuration);

							$this.parent("div.staging").find("div.bottom.item-wrap").stop().animate({
								"top":bottomTile.topValue
							},tileHoverDuration);
						}else{
							$this.siblings("div.center").stop().animate({
								"top":centerTile.topValue
							},tileHoverDuration);

							$this.siblings("div.bottom").stop().animate({
								"top":bottomTile.topValue
							},tileHoverDuration);
						}
					});

					/* bottom area hover */
					$("div.bottom").live("mouseover",function(){
						var $this = $(this);
						$this.stop().animate({
							"top":bottomTile.topValue - hoverDistance
						},tileHoverDuration);

						if(isIE8){
							$this.parent("div.staging").find("div.center.item-wrap").stop().animate({
								"top":centerTile.topValue - hoverDistance
							},tileHoverDuration);

							$this.parent("div.staging").find("div.top.item-wrap").stop().animate({
								"top":topTile.topValue - hoverDistance
							},tileHoverDuration);
						}else{
							$this.siblings("div.center").stop().animate({
								"top":centerTile.topValue - hoverDistance
							},tileHoverDuration);

							$this.siblings("div.top").stop().animate({
								"top":topTile.topValue - hoverDistance
							},tileHoverDuration);
						}
					});

					$("div.bottom").live("mouseleave",function(){
						var $this = $(this);
						$this.stop().animate({
							"top":bottomTile.topValue
						},tileHoverDuration);

						if(isIE8){
							$this.parent("div.staging").find("div.center.item-wrap").stop().animate({
								"top":centerTile.topValue
							},tileHoverDuration);

							$this.parent("div.staging").find("div.top.item-wrap").stop().animate({
								"top":topTile.topValue
							},tileHoverDuration);
						}else{
							$this.siblings("div.center").stop().animate({
								"top":centerTile.topValue
							},tileHoverDuration);

							$this.siblings("div.top").stop().animate({
								"top":topTile.topValue
							},tileHoverDuration);
						}
					});
				}

				/* tile's image get dark */
				if(!is_iPad){
/*					if(is_webkit){
						$("div.staging-wrap div.item div.border-hack").live("mouseover",function(){
							var $this = $(this);
							if(!$this.parents("div.item-wrap").hasClass("center")){
								$this.siblings("img").css({"opacity":0.3}).stop().animate({"opacity":1},500);
							}
						});
						$("div.staging-wrap div.item div.border-hack").live("mouseleave",function(){
							var $this = $(this);
							if(!$this.parents("div.item-wrap").hasClass("center")){
								$this.siblings("img").stop().animate({"opacity":0.3},500);
							}
						});
					}else{*/
						$("div.staging-wrap div.item > img").live("mouseover",function(){
							var $this = $(this);
							if(!$this.parents("div.item-wrap").hasClass("center")){
								$this.css({"opacity":0.3}).stop().animate({"opacity":1},500,function(){
									$this.parent("div.item").css({"background-color":"#ffffff"});
								});
							}
						});
						$("div.staging-wrap div.item > img").live("mouseleave",function(){
							var $this = $(this);
							if(!$this.parents("div.item-wrap").hasClass("center")){
								$this.parent("div.item").css({"background-color":"#000000"});
								$this.stop().animate({"opacity":0.3},500);
							}
						});
					// }
				}

				/* show prompt */
				var showPrompt = function(){
					
					$("div.staging-wrap div.prompt-cover").show();
					
					$.cookie("b515guide",1,{expires:10});
					setTimeout(function(){
						
						$("div.staging-wrap div.welcome-text").animate({top:0},500,function(){
							setTimeout(function(){
								$("div.staging-wrap div.prompt-cover").hide();
								$("div.staging-wrap div.welcome-text").animate({top:-150},500);
								
							},13000);
						});
						
					},1500);
					

					$("div.staging-wrap div.prompt-cover, div.staging-wrap div.welcome-text span.close-btn").click(function(){
						$("div.staging-wrap div.prompt-cover").hide();
						$("div.staging-wrap div.welcome-text").animate({top:-150},500);
						
					});
					
				}
				//when page loading check cookie then decide whether show the prompt;
				if(!$.cookie("b515guide")){
					
					showPrompt();

				}
				/* when page loading check hash and get the relative tile */
				var pageHash = location.hash;
				var tileName = pageHash.split("=")[1];
				var tileData ={};
				
				if(typeof(tileName) != "undefined"){
					


					var rowa = 2,
						rowb = 3,
						col = 1,
						tileIndex = defaultTileIndex;

					var hashStringPlus = "#tile=" + tileName;
					
					$("div.map-nav div.link > a").each(function(){
						var $this = $(this);
						if($this.attr("href") == hashStringPlus){
							$this.addClass("active");
						}
					});
					
					tileData = $.grep(contentMap,function(value,i){
						return(value.tileName == tileName);
					});

					//console.log(tileData);
					if(tileData.length != 0){
						rowa = parseInt(tileData[0].row);
						rowb = parseInt(tileData[1].row);
						col = parseInt(tileData[1].col);
						tileIndex = parseInt(tileData[0].tileIndex);
					}

					var hasHash = {hasHash:true};
					var initialWithHashOption =	$.extend({},initialOption,hasHash);

					getTileData(initialWithHashOption,rowa,rowb,col,tileIndex);
					//alert("has hash");
				}else{
					$.cookie("b515guide",1,{expires:10});
					//console.log("cookie");

					var rowa = 2,
						rowb = 3,
						col = 1,
						tileIndex = defaultTileIndex;
					var defaultHash = "#tile=";

					tileData = $.grep(contentMap,function(value,i){
						return(value.tileIndex == defaultTileIndex);
					});

					if(tileData.length != 0){
						rowa = parseInt(tileData[0].row);
						rowb = parseInt(tileData[1].row);
						col = parseInt(tileData[1].col);
						defaultHash = defaultHash + tileData[0].tileName;
					}

					$("div.map-nav div.link a").each(function(){
						var $this = $(this);
						if($this.attr("href") == defaultHash){
							$this.addClass("active");
						}
					});
					getTileData(initialOption,rowa,rowb,col,tileIndex);
				}

				/* global nav control */
				$("DIV.staging-wrap SPAN.expand-btn").click(function(){
					$("DIV.staging-wrap DIV.global-nav").animate({"top":0},1000,"easeOutQuart");
					return false;
				});

				$("DIV.staging-wrap SPAN.collapse-btn").click(function(){
					$("DIV.staging-wrap DIV.global-nav").animate({"top":-600},1000,"easeOutQuart");
					return false;
				});

				/* map nav style setting */

				var columnCount = $("div.map-nav > div.row:first-child").find("div.link").size();
				var rowCount = $("div.map-nav > div.row").size();
				var columnWidth = Math.floor(840/columnCount);
				var rowHeight = Math.floor(420/rowCount);
				var bottomSep = $("div.map-nav-wrap div.last img");
				var topSep = $("div.map-nav-wrap div.first img");
				var leftSep = $("div.map-nav-wrap div.middle div.left img");
				var rightSep = $("div.map-nav-wrap div.middle div.right img");
				$("div.map-nav > div.row > div.link").width(columnWidth-1);
				$("div.map-nav > div.row > div.link").height(rowHeight-1);
				$("div.map-nav > div.row > div.link a").width(columnWidth-1-16);
				$("div.map-nav > div.row > div.link a").height(rowHeight-1-16);

				for(i=1;i<=columnCount;i++){
					var sepPosition = columnWidth * i + 59;
					bottomSep.clone().css({"left":sepPosition}).appendTo("div.map-nav-wrap div.last");
					topSep.clone().css({"left":sepPosition}).appendTo("div.map-nav-wrap div.first");
				}

				for(i=1;i<=rowCount;i++){
					var sepPosition = rowHeight * i;
					leftSep.clone().css({"top":sepPosition}).appendTo("div.map-nav-wrap div.middle div.left");
					rightSep.clone().css({"top":sepPosition}).appendTo("div.map-nav-wrap div.middle div.right");
				}

				/* content map switch */
				$("div.map-nav div.link > a").click(function(){
					var $this = $(this);

					if(!$this.hasClass("active")){
						$("div.map-nav").find("div.link > a.active").addClass("visited").removeClass("active");
						$this.addClass("active");

						if($("div.current.staging",element).find("div.center div.item ul.image-slider").size()>0){
							//console.log("destroy2");
							imageSlider.stopAuto();
							$("div.current.staging",element).find("div.center div.item div.image-slider-wrap").hide();
							imageSlider.destroySlider();
							imageSlider = {};
						}

						textStaging.hide();
						$("div.staging-wrap div.loading-cover").show();

						var pageHash = $this.attr("href");
						var tileName = pageHash.split("=")[1];
						var tileData ={};

						tileData = $.grep(contentMap,function(value,i){
							return(value.tileName == tileName);
						});

						if(tileData.length != 0){
							rowa = parseInt(tileData[0].row);
							rowb = parseInt(tileData[1].row);
							col = parseInt(tileData[1].col);
							tileIndex = parseInt(tileData[0].tileIndex);
						}

						var fromNavOption = {navClicked:true};
						initialOption =	$.extend({},initialOption,fromNavOption);

						getTileData(initialOption,rowa,rowb,col,tileIndex);

					}else{
						return false;
					}

				});

				/* load video overlay */
				$("div.staging-wrap .overlay-link").live("click",function(){
					
					var $this = $(this);
					var required_url = $(this).attr("href");

					if($this.hasClass("in-tile")){
						textStaging.hide();
						$("div.loading-cover",element).addClass("darker").show();
						clickAndDrag(required_url);
					}else{

					
						element.append("<div class='lightbox-overlay'></div>");
						element.append("<div class='lightbox-content'><span class='close-btn'></span></div>");
						$("div.lightbox-overlay",element).css({opacity:0.8}).fadeIn();


						var overlayContent = $("div.lightbox-content",element);

						$.ajax({
							type:"GET",
							url:required_url,
							success:function(data){
								overlayContent.append(data);
							},
							complete:function(a,b,c){

								if(overlayContent.find(".multiple-video-wrap").size()>0){
									/* load click and switch (video player in overlay) */
									
									//$("div.lightbox-loading").hide();
									overlayContent.width(720).height(405).css({"top":-700}).show().animate({"top":60},1000,"easeOutQuart",function(){

										var firstVideoSetting = overlayContent.find("ul.clip-list li:first-child .video-config").embeddedData();
										//console.log(defaultVideoSetting);
										var defaultVideoOps = {
											width:720,
											height:405,
											controlbar: "none"
										};

										var initVideoSetting = $.extend({},defaultVideoOps,firstVideoSetting);
										initVideoSetting.play = true;
										//console.log(initVideoSetting);
										ND.video.init(initVideoSetting);
										//jwplayer("video-staging").setup(defaultOps);
										
										overlayContent.find("ul.clip-list > li > a").click(function(){
											var $this = $(this);
											overlayContent.find("ul.clip-list > li").removeClass("active");
											$this.parent("li").addClass("active");
											jwplayer("video-inner").remove();
											var videoSetting = $this.next(".video-config").embeddedData();
											// var videoSetting = $.parseJSON($(this).next(".video-config").html());
											var videoOps = $.extend({},defaultVideoOps,videoSetting);
											videoOps.play = true;
											//console.log(videoOps);
											ND.video.init(videoOps);
											// jwplayer("video-staging").play();
											return false;
										});
									});

								}else if(overlayContent.find(".single-video-wrap").size()>0){
									//$("div.lightbox-loading").hide();
									overlayContent.width(720).height(405).css({"top":-500}).show().animate({"top":90},1000,"easeOutQuart",function(){
										var videoConfig = overlayContent.find("#video-config").embeddedData();
										var defaultVideoOps = {
											width:720,
											height:405
										};
										videoConfig = $.extend({},defaultVideoOps,videoConfig);
										//console.log(videoConfig);
										ND.video.init(videoConfig);
									});
								}


							}
						});
					}

					return false;
				});

				
				
				//var popFlag = false;
				var popHide = function(){
					if($("div.lightbox-content").size() < 1){ return; }
					
					var overlayContent = $("div.lightbox-content");
					// var box_height = overlayContent.outerHeight();

					overlayContent.animate({"top":-600},400,"easeOutQuart",function(){
						$("div.lightbox-loading").remove();
						$("div.lightbox-overlay").fadeOut(250,function(){
							$(this).remove();
						});
						$("div.lightbox-content").fadeOut(250,function(){
							$(this).remove();
							
						});
					});
				}

/*				$("div.lightbox-content").live("mouseover",function(){
					popFlag = true;
					
				});
				$("div.lightbox-content").live("mouseleave",function(){
					popFlag = false;
				});*/

				$("div.lightbox-content span.close-btn",element).live("click",function(){
					popHide();
				})

				

/*				$("body").live("click",function(){
					if(!popFlag){
						popHide();
					}
				})*/

				/* Return this so it can be chained / assigned
				 * eg. var myModule = ND.myModuleName().init();
				 */
				return this;
			
			},
			
			/* Write Public Methods
			 * These will exist as methods on the new module object
			 * 
			 */
			setHasA: function( obj ) {
				hasA = obj;
			},
			
			getHasA: function( ) {
				return hasA;
			}
		
		
		};	
	};
	
	/* Return ND after it's been augmented */ 
	return ND;	

}(window.ND || {}, jQuery));
/* End File */
