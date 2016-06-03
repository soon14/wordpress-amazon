var ND = (function(ND, $) {
	
	ND.vignettePlayer = function () {
		var element;
		return {

			init: function( elem, options ) { 
				element = $(elem || "#vignetteWrapper");
				if( !element || !element.size() ) { return this; }
				var defaults = {
					imgCount:			175,
					videoCount:			9,
					currentVideo:		0,
					videoImgWidth:		1440,
					videoImgHeight:		758,
					windowMinHeight:	484,
					shortcutMinHeight:	50,
					skipMinHeight:		56,
					speed:				4,
					statementHeightRatio:2.24,
					statementTextWidth:	650,
					statementTextHeight:500,
					videoContainer:		'.vignette',
					videos:				'.vignette > img',
					statements:			'.statements',
					bracket:			'.bracket',
					openStatement:		'.open-statement',
					closeStatement:		'.close-statement',
					shortcut:			'.shortcut',
					mailto:				'.mail',
					loading:			'#loading',
					loadingBar:			'.loading-bar DIV',
					path:				'media/vignettes/{currentVideo}/',
					openStatementPath: 	'open-statement.png',
					closeStatementPath: 'close-statement.png',
					vignettePath:		'preview{index}.jpg',
					mp3Path:			'sound-track.mp3',
					oggPath:			'sound-track.ogg'
				};
				var o =  $.extend(defaults,options);
				var windowHeight, windowWidth,
					scrollHeight, fullHeight, videoWidth, videoHeight,
					statementWidth, statementRatioLH = o.statementTextWidth / o.statementTextHeight,
					currentPosition = -1/5000, targetPosition = 0,
					currentSrc, currentVideo = o.currentVideo,
					transferstart = true, transfering = false;
				
				var $win = $(window), container = $("#page");
				var $videoContainer = $(o.videoContainer),
					$videos = $(o.videos, element),
					audio = $("AUDIO", element)[0];
				
				var statements = $(o.statements,element);
				var openStatement= $(o.openStatement,statements),
					openStatementText = $("IMG",openStatement ),
					closeStatement = $(o.closeStatement,statements),
					closeStatementText = $("IMG",closeStatement),
					mailto = $(o.mailto, element);
				var bracket = $(o.bracket,statements);
				var bracketHeight = bracket.height(),
					bracketWidth = bracket.width();

					
				var loading = $(o.loading),
					loadingBar = loading.find(o.loadingBar);
					
				var shortcut = $(o.shortcut,element),
					skip = shortcut.prev();
				var shortcutWidth = shortcut.width(), shortcutHeight = shortcut.height(),
					shortcutRatioWH = shortcutWidth / shortcutHeight * ( o.videoCount - 1 ),
					skipHeight = skip.height(), skipWidth = skip.width(),
					skipOuterHeight = skip.outerHeight(true),
					skipMarginsVertical = skipOuterHeight - skipHeight,
					skipRatioWH = skipWidth / skipHeight;
					
				var myCanvas = document.getElementById("myCanvas");
				var ctx = myCanvas.getContext("2d");
				
				
				function calculateDimensions() {
					windowWidth = $win.width();
					windowHeight = $win.height();
					container.width( windowWidth ).height( windowHeight );
					var fullHeight = windowHeight + o.imgCount*10;
					scrollHeight = fullHeight - windowHeight;
					element.height( fullHeight );
					
					var scale = Math.max( windowHeight/o.videoImgHeight , windowWidth/o.videoImgWidth );
					videoHeight = scale * o.videoImgHeight;
					videoWidth = scale * o.videoImgWidth;
					$videoContainer
							 .width(videoWidth).height(videoHeight)
							 .css('left',(windowWidth-videoWidth)/2+'px')
							 .css('top',(windowHeight-videoHeight)/2+'px');
					myCanvas.width = videoWidth;
					myCanvas.height = videoHeight;
					ctx.fillRect(0,0,myCanvas.width,myCanvas.height);

					//Resize the navigation
					var skipNewHeight = windowHeight < o.windowMinHeight ? o.skipMinHeight :  windowHeight / ( skipOuterHeight + shortcutHeight ) * skipOuterHeight - skipMarginsVertical;
					var shortcutNewHeight = windowHeight - skipNewHeight - skipMarginsVertical;
					var showShortcutCount = Math.min( Math.floor( shortcutNewHeight / o.shortcutMinHeight ), o.videoCount - 1);
					var shortcutNewHeightEach = shortcutNewHeight / showShortcutCount;
					var shortcutNewWidth = shortcutRatioWH * shortcutNewHeightEach ;
					skip.css({
						height: skipNewHeight,
						width: skipRatioWH * skipNewHeight
					});
					shortcut.find("A").animate({
						width: shortcutNewWidth,
						height: shortcutNewHeightEach
					});
					shortcut.parent().width( shortcutNewWidth );
					
					//Resize the bracket elements
					bracket.height( windowHeight );
					bracket.width( Math.ceil( bracketWidth / bracketHeight * windowHeight ));
					
					statementWidth = windowWidth - shortcutNewWidth;
					statementTextHeight = windowHeight / ( windowHeight < o.windowMinHeight ? 1 : o.statementHeightRatio);
					statementTextWidth =  statementRatioLH * statementTextHeight;
					statementOffsetHorizental = (statementWidth - statementTextWidth)/2; 
					statementOffsetVertical = (windowHeight - statementTextHeight)/2;
					openStatementText.css({
						width:	statementTextWidth,
						height:	statementTextHeight,
						left:	statementOffsetHorizental,
						top:	statementOffsetVertical
					});
					closeStatementText.css({
						width:	statementTextWidth,
						height:	statementTextHeight,
						right:	statementOffsetHorizental,
						top:	statementOffsetVertical
					});
					
					//Resize the loading bar
					
					//Resize the mailto logo

				}
				
				function handleResize() {
					calculateDimensions();
					container.scrollTop( targetPosition * scrollHeight );
					render( currentPosition );
				}
				
				function handleScroll() {
					targetPosition = container.scrollTop() / scrollHeight;
					$videos.hide();
					animloop();
				}
				
				window.requestAnimFrame = (function(){
				  return  window.requestAnimationFrame       ||
						  window.webkitRequestAnimationFrame ||
						  window.mozRequestAnimationFrame    ||
						  window.oRequestAnimationFrame      ||
						  window.msRequestAnimationFrame     ||
						  function(/* function */ callback, /* DOMElement */ element){
							window.setTimeout(callback, 1000 / 60);
						  };
				})();


				function animloop(){
					var startPosition = Math.floor( getStartPosition() * 5000 );
					if ( Math.floor(currentPosition*5000) != Math.floor(targetPosition*5000) ) {
						currentPosition += (targetPosition - currentPosition) / 20;
						render( currentPosition );
						requestAnimFrame(animloop);
					}
					else{
						//Goto the prev vignette
						// console.log( Math.floor(currentPosition*5000) + "\t" + Math.floor(targetPosition*5000) );
						if ( Math.floor(currentPosition*5000) < startPosition - 10 ) {
							gotoVideo( currentVideo - 1 );
						}
						//Show the mailto logo
					}
					mailto.hide();
					if( currentVideo == o.videoCount - 1 && Math.floor(currentPosition*5000)>=4990 ){
						mailto.show();
					}
				}

				
				function render(position){
					var transferLeft = renderBracket(position);
					if( transfering && transferLeft < 10 ){
						//Transfer completed
						reset( currentVideo + 1 );
					}
					if( transfering ){
						var prevVideoLeft =  transferLeft + ( videoWidth - windowWidth ) / 2;
						if( preloadImgsNext.length == 0){
							loadImages( currentVideo + 1, preloadImgsNext);
						}
						//Render the next video
						renderVideo( position + getStartPosition( currentVideo + 1 ) - 1 , prevVideoLeft, videoWidth - prevVideoLeft, currentVideo + 1  );
						//Render the current video
						renderVideo( position, 0, prevVideoLeft );
					}
					else{
						renderVideo(position);
					}
					
				}
				
				function renderBracket(position) {
					var totalPhrase = currentVideo == 0 || currentVideo == o.videoCount - 1 ? 4 : 5,
						currentPhrase = Math.max( Math.floor( position * totalPhrase ), 0 );
					var	bracketPosition = position * totalPhrase - currentPhrase,
						openPosition = bracketPosition , closePosition = 1- bracketPosition;
					if( currentVideo == 0 ) { currentPhrase++; }
					switch( currentPhrase ){
						case 1: openStatementText.show(); closeStatementText.hide(); break;
						case 2: closeStatementText.show(); openStatementText.show(); break;
						case 3: openStatementText.hide(); closeStatementText.show();
								if( transfering ){ transfering = false;}
								break;
						case 4: if( closeStatementText.is(":visible") ){ transfering = true; }	
								closeStatementText.hide();
								break;
					}
					if( currentPhrase % 2 == 0){
						openPosition = closePosition;
						closePosition = bracketPosition;
					}
					var openWidth = openPosition * (statementWidth - bracketWidth),
						closeWidth = closePosition * (statementWidth - bracketWidth);
					openStatement.width( openWidth );
					closeStatement.width( closeWidth );
					return openWidth;
				}
				
				function renderVideo(position, left, width, videoIndex) {
					var myVideo = !videoIndex ? currentVideo : videoIndex;
					var imgs = !videoIndex ?  preloadImgs : preloadImgsNext;
					var canvasLeft = !left ? 0 : left;
					var canvasWidth = !width ? myCanvas.width : width;
					var nearestIndex;
					
					getNearest( Math.round( position * (o.imgCount-1) ), myVideo );
					nearestIndex = myImgs[myVideo].nearest;
					if ( nearestIndex < 0 ) myImgs[myVideo].nearest = nearestIndex = 0;
					if ( myImgs[myVideo].current != nearestIndex ) {
						loadImages(myVideo, imgs);
						var preloadIndex = preloadCount/2;
						if( imgs[preloadIndex].complete){
							if( !!videoIndex ) console.log(nearestIndex+","+imgs[preloadIndex].src);
							// console.log((canvasLeft/videoWidth * o.videoImgWidth)+"\t"+ (canvasWidth / videoWidth * o.videoImgWidth)+"\t"+canvasWidth+"\t"+canvasLeft);
							ctx.drawImage(imgs[preloadIndex], Math.floor(canvasLeft/videoWidth * o.videoImgWidth), 0, Math.floor(canvasWidth / videoWidth * o.videoImgWidth), o.videoImgHeight, Math.floor(canvasLeft), 0, Math.floor(canvasWidth), Math.floor(myCanvas.height) );
							myImgs[myVideo].current = nearestIndex;
						}
					}
				}

				function gotoVideo( videoIndex ){
					if( videoIndex >= 0 && videoIndex < o.videoCount ){
						$(myCanvas).stop(true,true);
						$(myCanvas).animate({
							opacity:0
						},function(){
							reset(videoIndex);
							render( getStartPosition() );
							$(this).animate({
								opacity:1
							});
						});
					}
				}
				
				function getNearest( imgIndex, videoIndex ){
					var myVideo = !videoIndex ? currentVideo : videoIndex;
					var imgs = !videoIndex ? preloadImgs : preloadImgsNext;
					var diff = 0, i;
					imgIndex = Math.floor(imgIndex);
					
					for ( diff = 0; diff < preloadCount/2 ; diff++ ) {
						i = imgIndex+diff;
						if ( i>=0 && i < o.imgCount && preloadImgs[preloadCount/2+diff] ) {
							myImgs[myVideo].nearest = i;
							// return getSrcAt(i, myVideo);
						}
						i = imgIndex-diff;
						if ( i>=0 && i < o.imgCount && preloadImgs[preloadCount/2-diff]) {
							myImgs[myVideo].nearest = i;
							// return getSrcAt(i,myVideo);
						}
					}
					// return null;
				};
				
				function getSrcAt( imgIndex, videoIndex ) {
					var myVideo = currentVideo;
					if( !!videoIndex ){ myVideo = videoIndex; }
					var str = (imgIndex+1+Math.pow(10,3)).toString(10).substr(1);
					return getPath( o.vignettePath, myVideo ).replace( '{index}' , str );
				}
				
				function getPath( path, videoIndex ){
					myVideo = currentVideo;
					if( !!videoIndex ){ myVideo = videoIndex; }
					return o.path.replace('{currentVideo}', myVideo + 1 ) + path;
				}
				
				function getStartPosition( videoIndex ){
					var myVideo = currentVideo;
					var startPosition = 0.2;
					if( !!videoIndex ){ myVideo = videoIndex; }
					if( myVideo == o.videoCount - 1 ){ startPosition = 0.25;}
					if( myVideo == 0 ){ startPosition = 0; }
					return startPosition;
				}
				
				function reset( videoIndex ){
					currentVideo = videoIndex;
					var startPosition = getStartPosition();
					transferstart = true;
					transfering = false;
					myImgs[currentVideo].current = -1;
					currentPosition = startPosition - 1/5000;
					targetPosition = startPosition;
					container.scrollTop( scrollHeight * startPosition );
					preloadImgsNext = [];
					
					openStatementText.attr("src",myImgs[videoIndex].openStatement.src);
					closeStatementText.attr("src",myImgs[videoIndex].closeStatement.src);
					
					audio.src = Modernizr.audio.ogg ? getPath( o.oggPath ) :
								Modernizr.audio.mp3 ? getPath( o.mp3Path ) : null;
					$(audio).find("EMBED").attr("src", getPath( o.mp3Path ));
					audio.load;
					audio.play();
				}
				
				//Preload
				var myImgs = [];
				for( var i = 0; i < o.videoCount; i++ ){
					myImgs.push({
						openStatement: 	new Image(),
						closeStatement:	new Image(),
						firstSequence:	new Image(),
						current:		0,
						nearest:		0
					});
					myImgs[i].openStatement.src = getPath( o.openStatementPath, i );
					myImgs[i].closeStatement.src = getPath( o.closeStatementPath, i );
					myImgs[i].firstSequence.src = getSrcAt( 0, i );
				}
				
				var preloadImgs = [], preloadImgsNext = [];
				var preloadCount = 20, loadedNum = 0, loadstart = false;
				function loadImages( videoIndex, imgloader){
					var myVideo = !videoIndex ? currentVideo : videoIndex;
					// console.log(myVideo+"\t"+currentVideo+"\t"+!videoIndex);
					var startIndex = myImgs[myVideo].nearest;
					// if(!!videoIndex) console.log(startIndex);
					var imgs = !imgloader ? preloadImgs : imgloader;
					var diff;
					if( imgs.length == 0 ){
						loading.removeClass("comlete");
						loadingBar.width(0);
						loadedNum = 0;
						for( var i = 0; i < preloadCount + 1; i++ ){
							imgs.push( new Image() );
							if( imgs < preloadCount/2 + 1 ){
								imgs[i].src = getSrcAt( i, myVideo );
							}
						}
						handleLoad();
					} else{
						var i;
						imgs[preloadCount/2] = new Image();
						imgs[preloadCount/2].src = getSrcAt( startIndex, myVideo );
						for( diff = 1; diff < preloadCount/2; diff++ ){
							var i = startIndex - diff;
							if( !(i< 0) ){
								imgs[preloadCount/2 - diff] = new Image();
								if(i< 0) imgs[preloadCount/2 - diff].src = getSrcAt(i,myVideo);
							}
							var i = startIndex + diff;
							imgs[preloadCount/2 - diff] = new Image();
							if(i > o.imgCount - 1) imgs[preloadCount/2 + diff].src = getSrcAt(i,myVideo);
						}
					}
				}
				
				function handleLoad( ){
					// if( loadedNum == preloadCount / 2 + 1 ){
						// loading.addClass("complete");
						// element.css("visibility","visible");
						// return;
					// }
					// if( preloadImgs[loadedNum].complete ){
						// var progress = ++loadedNum / (preloadCount/2 + 1) *100;
						// loadingBar.width( progress + "%" );
					// }
					
					if( loadedNum == preloadCount / 2 + 1 ){
						loading.addClass("complete");
						element.css("visibility","visible");
						return;
					}
					loadingBar.width( ++loadedNum / (preloadCount/2 + 1) *100 + "%" );
					setTimeout(handleLoad,100);
				}
				
				$win.resize( handleResize );
				container.scroll( handleScroll );
				
				//var calScale, touch, drifting = false;
				// $win.on("touchstart",function(e){
					// touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
					// touchTop = touch.pageY - touch.clientY;
					// calScale = touchTop == 0 ? 0 : $win.scrollTop() / touchTop;
				// }).on("touchmove",function(e){
					// targetPosition = ( touch.pageY - touch.clientY ) * calScale / scrollHeight ;
					// animloop();
				// });
				
				skip.on("click",function(e){
					gotoVideo( o.videoCount - 1 );
					e.preventDefault();
				}).find("IMG").on("mouseenter",function(){
					this.src = this.src.replace('logo.png',"logo-glow.png");
				}).on("mouseleave",function(){
					this.src = this.src.replace('logo-glow.png',"logo.png");
				});
				
				shortcut.on("mouseenter","A",function(){
					$("IMG",$(this)).fadeIn();
				}).on("mouseleave","A",function(){
					$("IMG",$(this)).fadeOut();
				}).on("click","A",function(e){
					var targetVideo = shortcut.find("A").index( $(this) );
					gotoVideo( targetVideo );
					e.preventDefault();
				});
				
				
				container.scrollTop(0);
				calculateDimensions();
				loadImages( );
				container.overscroll({
					persistThumbs: 	true,
					showThumbs: 	false,
					wheelDelta: 	o.speed * 20,
					scrollDelta:	o.speed * 5,
					direction:		"vertical"
				}).on('overscroll:drifting overscroll:dragging oversroll:dragstart overscroll:dragend overscroll:driftstart overscroll:driftend', function(e){
					console.log( e.type);
					if (e.type == "overscroll:drifting" || e.type == "overscroll:dragging") {
						handleScroll();
					}
				});
				
				return this;		
			}
		};	
	};
	
	return ND;	

}(window.ND || {}, jQuery));