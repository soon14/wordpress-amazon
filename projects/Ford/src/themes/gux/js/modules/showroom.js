/*
 * functionalities of showroom
 * author : Ray
 * dependencies: jquery, underscorejs
 */
(function($) {

	var showroom = {
		
		init : function (){
			var self = this;
			self.container = $(".showroom-container");
			
			if(self.container.length === 0){return;}
			
			self.vehicleCard = $(".vehicle-list .vehicle-container",self.container);

			//hide price option in dropdown on page load for GUX Polk
			if ($('.body.derivative-price')[0]) {
				$(".sort-dropdown",self.container).find("[data-cat='price']").hide();

				$.subscribe('userchangesuccess.calculateprice.dfy', function(event, data) {
					$(".sort-dropdown",self.container).find("[data-cat='price']").show();
				});
			}

			$(".sort-dropdown",self.container).on("click",function(e){
				e.preventDefault();
				$(this).toggleClass("active");
			});
			//add foundation "end" to dom element as JSP is not easy to do
			$(".section-cars",self.container).children("div:last-child").addClass("end");
			
			self.floatHeader();

			//No enlarge vehicle card in mini showroom
			if(!(self.container.hasClass('mini-showroom'))){
				self.enlargeVehicleCard();
			}
			self.VehicleSorting();
		},
		/*
		 * change the position of header to float the header element
		 */
		floatHeader : function () {
			var self = this,
				header = $(".sort-area",self.container),
				sortField = header.children(".sort-dropdown");
			
			if(header.length === 0) {return;}
			
			//detect scroll position on page load
			var posDetection = function () {
				var scrollTop = $(window).scrollTop(),
					headerTop = header.offset().top;
				if(scrollTop > headerTop) {
					sortField.addClass("fixedPos");
				} else {
					sortField.removeClass("fixedPos");
				}
			};
			posDetection();
			
			//detect scroll position on user triggered scroll event
			$(window).scroll(function (){
				posDetection();
			});
		},
		/*
		 * on mobile view, enlarge "vehicle card" by click.
		 */
		enlargeVehicleCard : function () {
			var self = this,
				cloneAfter = self.container.children(".row");
			
			if(self.vehicleCard.length === 0) {return;}
			//enlarge vehicle card
			$(".vehicle > a", self.vehicleCard).on("click",function(e){
				var clonedVehicleCard = cloneAfter.siblings(".vehicle-container");
				//only if trigger on mobile view, 751 is more close to "@media #{$large-up}"
				if($(window).width() < 751 && clonedVehicleCard.length === 0){
					e.preventDefault();
					var curVehicleCard = $(this).closest(".vehicle-container");
					$("body").addClass("no-scroll has-scroll");
					curVehicleCard.clone().addClass("clone").insertAfter(cloneAfter).fadeIn(function(){
						//"hide-for-large-up" is a foundation visibility setting class, to hide the element above your query setting "@media #{$large-up}"
						$(this).addClass("hide-for-large-up");
					});
				}
			});
			//close vehicle card
			self.container.on("click",".close-vehicle",function(e){
				e.preventDefault();
				//"this" - close-vehicle button
				$(this).closest(".vehicle-container").fadeOut(function(){
					$("body").removeClass("no-scroll has-scroll");
					//"this" - vehicle-container
					$(this).remove();
				});
			});
		},
		/*
		 * sort the vehicle nameplate:
		 * by: 
		 * 1, data-bodytype : categorize vehicles , sort by price low-high within each category
		 * 2, data-price : join all vehicles , sort by price low-high
		 * 3, data-fuel : join all vehicles , sort by fuel low-high
		 */
		VehicleSorting : function() {
			var self = this;
			
			if(self.vehicleCard.length === 0) {return;}
			
			var vehicleData = self.vehicleCard.children(".vehicle-data"),
				vehicleTitle = $(".section-cars header", self.container),
				VehicleSection = $(".section-cars",self.container);
			
			//inital "data-index" for bodyType sorting use	
			vehicleData.each(function(idx){
				$(this).attr("data-index",idx);
				//"data-sort-index" use for ominture
				$(this).attr("data-sort-index",idx+1);
			});
			//"data-sort-total" use for ominture
			VehicleSection.attr("data-sort-total",VehicleSection.children(".vehicle-container:visible").length);
			
			var sorting = function (compareVal){
				//initialize all vehicles , all of them should be displayed
				VehicleSection.children(".vehicle-container").removeClass("inactive");
				//for "bodytype" sorting
				if(compareVal == "data-bodytype"){
					vehicleTitle.each(function(){
						var header = $(this),
							groupData = [];
						vehicleData.each(function(){
							var vehicle = $(this);
							if(vehicle.attr(compareVal) == header.attr(compareVal)){
								groupData.push(this);
							}
						});
						//sorting
						groupData.sort(function(a,b){
							return parseInt($(b).attr("data-index")) - parseInt($(a).attr("data-index"));
						});
						//dom manipulate
						$(groupData).each(function(){
							$(this).closest(".vehicle-container").insertAfter(header);
						});
					});
				//for all other sorting
				} else {
					var filteredVehicleData = [];
					//filter none "data-price" or "data-fuel" vehicles before sorting
					vehicleData.each(function(){
						if($(this).attr(compareVal)){
							filteredVehicleData.push(this);
						} else {//hide those none "data-price" "data-fuel" vehicle as it should not be displayed when sorting
							$(this).closest(".vehicle-container").addClass("inactive");
						}
					});
					//sorting
					filteredVehicleData.sort(function(a,b){
						return parseFloat($(a).attr(compareVal)) - parseFloat($(b).attr(compareVal));
					});
					//dom manipulate
					$(filteredVehicleData).each(function(){
						$(this).closest(".vehicle-container").appendTo($(this).closest(".section-cars"));
					});
				}
			};
			$(".sort-dropdown li",self.container).on("click",function(){
				var sortType = $(this).attr("data-cat"),
					compareVal = "data-bodytype";
				//active current option
				$(".sort-dropdown li",self.container).removeClass("active");
				$(this).addClass("active");
				
				switch (sortType)
				{
					case "body" :
						vehicleTitle.removeClass("inactive");
						break;
					case "price" :
						compareVal = "data-price";
						vehicleTitle.addClass("inactive");
						break;
					case "fuel" :
						compareVal = "data-fuel";
						vehicleTitle.addClass("inactive");
						break;
				}
				sorting(compareVal);
				self.vehicleCard.removeClass("end");
				VehicleSection.children("div:last-child").addClass("end");
				
				//ominture, reset "data-sort-index"
				var sortedVehicles = VehicleSection.children(".vehicle-container:visible");
				sortedVehicles.each(function(idx){
					$(this).children(".vehicle-data").attr("data-sort-index",idx+1);
				});
				//ominture, add total number of sorted vehicle to container for tracking
				sortedVehicles.parent(".section-cars").attr("data-sort-total",sortedVehicles.length);
			});
		}
	};

	$(function(){
		showroom.init();
	});
	
	//jQuery mobile will add "ui-link" to "a" tag which cause style issue.
	$(document).on("pageinit", function(){
		$(".showroom-container .ui-link").removeClass('ui-link');
	});

}(jQuery));
