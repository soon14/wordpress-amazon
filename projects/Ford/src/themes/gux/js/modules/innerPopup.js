/*
Author: 		Ray Huang
File name: 		innerPopup.js
Description: 	open as tooltip
Dependencies: 	jQuery

html, strcuture:
	<a class="citation">
		<sup data-disclosure="1">1</sup>
		<sup data-disclosure="6">6</sup>
	</a>

	other

	<a class="citation">
		<span data-disclosure="1">1</span>
	</a>
	
JS template: 
	<script id="inner-popup" type="text/template">
		<div class="inner-popup">
			<a class="close-popup" href="#"></a>
				<div class="header">
					<h5>Disclosure</h5>
				</div>
			<div class="content"></div>
		</div>
	</script>

JS, Call innerPopup:
	$(function(){
		guxApp.innerPopup.init({
			container : ".my-example",
			triggerEvent : "hover",
			fillByDisclosure : false,
			hideOnLeave : false
		});
	});
	
*/

var guxApp = guxApp || {};

(function($){
	guxApp.innerPopup = {
		
		init: function(option) {
			
			var self = this;
				var defaultOpt = {
					container : "#page-wrapper",//wrapper contains inner popUp elements
					ngView	:  ".ng-scope",//for ng-view container
					triggerBy : ".citation",//bind trigger event to this element
					triggerEvent : "click",//event will be used to bind
					popup : ".inner-popup",//popUp container
					popupClose : ".close-popup",//close button in the popUp container
					hideOnLeave : true,//true to bind "mouseleave" event to popUp. This will hide the popUp when lose mouse focus on it.
					sectionContainer : "section" 
				};

				
			self.setting = $.extend({},defaultOpt,option);
			
			self.container = $(self.setting.container);
			self.ngView = $(self.setting.ndView);
			self.sectionContainer = $(self.setting.sectionContainer);
			self.triggerBy = $(self.setting.triggerBy,self.container);
			self.closBtn = $(self.setting.popupClose,self.container);
			
			self.appendPopupTmpl();
			if(self.popUp.length == 0){return;}
			self.open();
			self.close();
		},
		/*
		 * if inner popup not exist
		 * add inner popup from template
		 */
		appendPopupTmpl: function() {
			var self = this,
				innerPopup = $('#inner-popup'),
				showroomPopup = $('#showroom-popup');
			if(self.container.find(self.setting.popup).length  == 0 && innerPopup.length > 0){
				self.container.append(_.template(innerPopup.html()));
			}

			if(self.container.find(self.setting.popup).length  == 0 && showroomPopup.length > 0){
				self.container.append(_.template(showroomPopup.html()));
			}
			//re-define self.popup
			self.popUp = $(self.setting.popup,self.container);
			//self.title = self.popUp.find(".header h5").text();
		},
		/*
		 *	open inner popup,
		 *	inner popup opens with related "disclosure" filled in
		 */
		open: function() {
			var self = this;
			
			if(self.triggerBy.length==0){return;}
			
			self.sectionContainer.on(self.setting.triggerEvent,self.setting.triggerBy,function(e){
				e.preventDefault();
				var citation = $(this),
					curPopup = citation.closest(self.setting.container).children(self.setting.popup);
				
				self.fillContent(this,curPopup);
				$.publish('popup-opened');
			});
			
			//if(self.setting.hideOnLeave){self.hover();}
		},
		/*
		 *	close inner popup
		 */
		close: function() {
			var self = this;
			$(document).on("click",self.setting.popupClose,function(e){
				e.preventDefault();
				//"this" - close-popup button
				var parentInnerPopup = $(this).closest(self.setting.popup);
				if(parentInnerPopup.hasClass("clone")){
					//remove body class only when no other full overlay opened
					if(parentInnerPopup.siblings(".vehicle-container.clone").length == 0){
						$("body").removeClass("no-scroll has-scroll");
					}
					parentInnerPopup.remove();
				}else{
					parentInnerPopup.removeClass("active");
				}
			});
		},
		/*
		 *	set hideOnLeave : true, to enable the function.
		 * 	popUp will be hided when lose mouse focus
		 */
		hover: function(){
			var self = this;
			
			if(self.popUp.length==0){return;}
			
			self.popUp.on("mouseleave",function(){
				$(this).removeClass("active");
			});
			
			//remove "vehicle-container" hover state in showroom
			self.popUp.hover(function(){
				var vechileCon = $(".vehicle-container");
				if (vechileCon.length > 0){
					vechileCon.addClass("no-hover");
				}
			},function(){
				$(this).removeClass("active");
				var vechileCon = $(".vehicle-container");
				if (vechileCon.length > 0){
					vechileCon.removeClass("no-hover");
				}
			});
			
			//simulate hover state for touch device
			$(document).on("touchstart",function(){
				self.popUp.removeClass("active");
			});
			self.popUp.on("touchstart",function(e){
				e.stopPropagation();
			});
			self.closBtn.on("touchstart",function(e){
				$(this).closest(self.setting.popup).removeClass("active");
			});
		},
		/**
		 * 	fill the content of popup by related disclosure list.
		 * 	@param curEl, the "citation" user clicked
		 *  @param curPopup, "citation" related innerPopup
		 **/
		fillContent: function(curEl,curPopup) {
			var	self = this,
				citation = $(curEl),
				title = citation.attr("data-title");
				data = "",
				targetDataList = $(".disclaimer .disclaimer-text li"),
				curDataList = citation.find("sup, span"),
				insertTo = citation.closest(self.setting.sectionContainer),
				clonedInnerPopup = insertTo.children(self.setting.popup);
			
			//fill title
			if(!title || title.length == 0){
				title = self.title;
			}

			curPopup.find(".header h5").text(title);
			//fill content
			if(citation.hasClass("fill-by-text")){//fill by paragrah
				data = citation.find(".text").html();
				curPopup.find(".content").html(data);
				//display inner popup
				curPopup.addClass("active");
			}else{//fill by disclosure
				if(targetDataList.length == 0 || curDataList.length == 0){return;}			
				//preFill discliaimer to inner-popUp	
				curDataList.each(function(){
					var curDataKey = $(this).attr("data-disclosure");
					targetDataList.each(function(){
						var thisTargetData = $(this),
							targetDataKey = thisTargetData.attr("data-disclosure");
						if(curDataKey == targetDataKey){
							data = data + '<li>'+thisTargetData.html()+'</li>';
							return false;
						}
					});
				});
				if(data.length > 0){
					curPopup.find(".content").html('<ul>'+data+'</ul>');
				}
			}
			
			//remove all other "displayed" inner-popUp before show the current one
			self.popUp.removeClass("active");
			clonedInnerPopup.remove();
			$("body").removeClass("no-scroll has-scroll");
			
			if($(window).width() > 751){
				setTimeout(function(){
					var curElPos = citation.offset();
					var top;//1px top, to cover the citation
									

					// if the citation is inside the reveal modal
					if(citation.parents(".reveal-modal").length){
						var revealDistance = $(".reveal-modal").offset().left;
						top = (curElPos.top - citation.parents(".reveal-modal").offset().top - 10);
						if(citation.closest('.right').length){
							//var left = citation.offset().left - revealDistance;
							var left = ($(".reveal-modal").outerWidth() / 2) + 10;
						}else{
							var left = ($(".reveal-modal").outerWidth() / 2) - (curPopup.outerWidth() + 10);
							//var left = (citation.offset().left - revealDistance) - curPopup.outerWidth() + citation.outerWidth();
						}
						curPopup.css({
							"top" : top,
							"left" : left
						});
					}else{
						top = curElPos.top-1;
						//with "align-to-container" class, citation popup will align with it's parent container
						if(citation.hasClass("align-to-container")){
							var alignTo = citation.closest("div");
							curElPos.left = alignTo.offset().left+alignTo.width()/2; //get center of container
						}
		
						var left = curElPos.left-curPopup.outerWidth()/2;
						curPopup.css({
							"top" : top,
							"left" : left
						});
					}
					
					curPopup.addClass("active");					
					
				},500);

			} else {
				//show "inner-popUp" as fullScreen overlay on mobile view
				$("body").addClass("no-scroll has-scroll");
				curPopup.clone().addClass("clone hide-for-large-up").css({"top":0,"left":0}).appendTo(insertTo);
			}
		}
	}

})(jQuery);

$(function(){
	guxApp.innerPopup.init();
});
