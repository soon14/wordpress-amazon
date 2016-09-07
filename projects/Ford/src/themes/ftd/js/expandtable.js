//create by biaoqu

ND.expandTable = ( function($, undefined) {

		expandTable = {

			init : function() {

				//this.repositionlinks();
				var self=this;
				$wait(function(){
				self.expandinit();
				self.expanddivinit();
				self.splitedivcolor();
				self.divexpandall();
				self.collapseall();
				self.initreset();
				self.syncdropdown();
				self.spliterow();
				self.reHeightsublogo();
				})
				
				

			},
			
			reHeightsublogo : function() {
				var sublogoTd = $("td.align-bottom");
				var slheight = 0;
				var sublogo;
				for(var i = 0; i < sublogoTd.size(); i++) {

					
					
					sublogo = $("span.sub-logo", sublogoTd.eq(i));

					if(sublogo.length > 0) {
						
						
						if(sublogo.height() > slheight) {

							slheight = sublogo.height();
						}

					} else {
						$("span.logo", sublogoTd.eq(i)).after("<span class=\"sub-logo\"></span>");
						
					}
				}
				
				$("td.align-bottom .sub-logo").height(slheight);

			},
			repositionlinks : function() {
				var self = this;
				var allbtns = $("#allfeatures .links").children('div');
				var totalRow = Math.ceil(allbtns.size() / 3);
				var divheight=0;
				console.log("number of links: " + allbtns.size());
				for(var i = 0; i < allbtns.size(); i++) {

					var $divs = allbtns.eq(i);
					var diva = $("a", $divs);
					var divspan = $("span", $divs);
					var divArrowSpan = $("span.link-arrow", $divs);
					var divaspan = $("span", diva);
						console.log($divs.height());
					
					if($divs.height()>divheight){
						divheight=$divs.height();
					}

					if($("body").hasClass("ltr")) {
						divArrowSpan.css({
							"left" : divaspan.width() + 48
						});
					} else if($("body").hasClass("rtl")) {
						divArrowSpan.css({
							"right" : divaspan.width() + 58
						});
					}
				}
				allbtns.height(divheight);

				allbtns.children("a").height(divheight);

				for (var n = 0; n < allbtns.size(); n++) {
					
					var $divs = allbtns.eq(n);
					var diva = $("a", $divs);
					var divspan = $("span", $divs);
					var divArrowSpan = $("span.link-arrow", $divs);
					var divaspan = $("span", diva);
					
					var mtop = Number(diva.height() - divspan.height()) / 2+1;
					divspan.css({
						"margin-top" : mtop
					});
				}
				self.addsyncdropdownwidth();

			},
			addsyncdropdownwidth:function(){
				var allbtns = $("#allfeatures .links").children('div');
				for (var n = 0; n < allbtns.size(); n++) {
				
					if(n%3!==2){
						if ($("body").hasClass("ltr")) {
							allbtns.eq(n).css({
								"margin-right": 52.5
							})
						}else if ($("body").hasClass("rtl")) {
							allbtns.eq(n).css({
								"margin-left": 52.5
							})
						}
					}
				
				}
			},
			spliterow : function() {
				var self = this;
				var cols2row = $(".cols2>div");
				for(var i = 0; i < cols2row.size(); i++) {

					self.reHeightCols(cols2row.eq(i), 2, 10);

				}

				var cols3row = $(".cols3>div");

				for(var n = 0; n < cols3row.size(); n++) {

					self.reHeightCols(cols3row.eq(n), 3, 0);

				}
			},
			reHeightCols : function(divs, cols, space) {

				var self = this;
				var allclos = $(".top", divs);
				var totalcolsrow = Math.ceil(allclos.size() / cols);

				for(var n = 0; n < totalcolsrow; n++) {

					self.reheightdivs(n, cols, allclos, space);
				}

			},
			reheightdivs : function(rowindex, cols, allbtns, space) {

				var divsheight = 0;
				var tempcols = cols;
				if((rowindex + 1) * cols > allbtns.size()) {
					tempcols = allbtns.size() - rowindex * cols;
				}

				for(var i = 0; i < tempcols; i++) {
					var $divindex = i + i * rowindex;
					var $div = allbtns.eq($divindex);
					if($div.height() > divsheight) {
						divsheight = $div.height();
					}

				}
				divsheight = divsheight + space;

				for(var m = 0; m < tempcols; m++) {
					var $divindex = m + m * rowindex;
					var $div = allbtns.eq($divindex);

					$div.height(divsheight);
					$div.children("a").height(divsheight);
				}
			},
			syncdropdown : function() {
				var self = this;
				$("#allfeatures").bind("click", function(e) {

					if($("#allfeatures .links").is(":hidden")) {

						$("#allfeatures .links").show();
						$("#allfeatures .header>span").removeClass("closed");
						$("#allfeatures .header>span").addClass("expand");
						self.repositionlinks();

					} else {

						$("#allfeatures .links").hide();
						$("#allfeatures .header>span").removeClass("expand");
						$("#allfeatures .header>span").addClass("closed");
					}

				})
			},
			nIntervId : Number,
			initreset : function() {

				var self = this;

				self.spliteswitch();
			},
			spliteswitch : function() {
				var self = this;
				var $switch = $(".sync_generic .switch");
				for(var i = 0; i < $switch.size(); i++) {

					self.resetswitchPosition($switch.eq(i));
				}
			},
			resetswitchPosition : function($switch) {

				

				var self = this;
				//var $switch=$(".sync_generic .switch");
				var nubs =$("li", $switch).size(); 
				
				var lis = $("li", $switch);
				var totalwid = 0;

				for(var n = 0; n < nubs; n++) {

					totalwid += Number($(lis).eq(n).width());

				}
				

				if(totalwid > 0) {

					

					var pading = Math.round((960 - totalwid) / (nubs - 1));

					for(var m = 0; m < nubs - 1; m++) {

						lis.eq(m).attr("style", "margin-right:" + pading + "px");

					}

				}

			},
			divexpandall : function() {

				var self = this;
				$("#divexpandall").bind("click", function(e) {

					var expandObj = $(".comparator_content");
					var expandicon = $(".expanddiv .head.c-table-title");

					expandObj.show();
					expandicon.removeClass("comparator_icon_right");
					expandicon.addClass("comparator_icon_down");

				})
			},
			collapseall : function() {

				var self = this;
				$("#divcollapseall").bind("click", function(e) {

					var expandObj = $(".comparator_content");
					var expandicon = $(".expanddiv .head.c-table-title");

					//console.log(expandicon);

					expandObj.hide();
					expandicon.removeClass("comparator_icon_down");
					expandicon.addClass("comparator_icon_right");

				})
			},
			splitedivcolor : function() {

				/*var $colordiv=$(".comparator_content .derivative");
				 for(var i=0;i<$colordiv.length;i++){

				 $curcs=$colordiv.eq(i);

				 var $colorsdiv= $("*",$curcs);

				 for(var n=0;n<$colorsdiv.length; n++){
				 if(n%2==1){

				 $colorsdiv.eq(n).addClass("comparator2bgcolor");
				 }

				 }

				 }*/

			},
			expandinit : function() {
				var self = this;
				$(".expandtable>thead").bind("click", function(e) {

					var $this = $(this).parent();
					var $head = $(this);
					var expandObj = $("tbody", $this);
					var expandicon = $("th", $head);

					//console.log(expandicon);

					if(expandObj.is(":hidden")) {

						expandObj.show();
						expandicon.removeClass("comparator_icon_right");
						expandicon.addClass("comparator_icon_down");

					} else {

						expandObj.hide();

						expandicon.removeClass("comparator_icon_down");
						expandicon.addClass("comparator_icon_right");

					}

				})
			},

			expanddivinit : function() {
				var self = this;
				$(".expanddiv .head.c-table-title").bind("click", function(e) {

					var $this = $(this).parent();

					var expandObj = $(this).next("div");
					var expandicon = $(this);

					if(expandObj.is(":hidden") == true) {

						expandObj.show();
						expandicon.removeClass("comparator_icon_right");
						expandicon.addClass("comparator_icon_down");

					} else {

						expandObj.hide();

						expandicon.removeClass("comparator_icon_down");
						expandicon.addClass("comparator_icon_right");

					}

				})
			}
		};

		return function(arg) {
			var expand = Object.create(expandTable);
			expand.init.call(expand, arg);
			return expand;
		};

	}(jQuery)); 