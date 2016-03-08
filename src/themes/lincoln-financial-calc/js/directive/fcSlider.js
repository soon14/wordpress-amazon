financialCalculator.directive('lfcSlider',[function(){
	return {
		template: function() {
			return $('#lfc-slider-template').html();
		},
		link: function(scope) {
			$('#slider').slider({
				orientation:"horizontal",
				range:"min",
				min:0,
				max:0,
				step:1,
				value:0,
				slide: function(event, ui) {
					if (ui.value>=0) {
						$('.ui-slider-handle', $('#slider')).html(scope.appValue.gmfv.products[0]['sub-products'][0]['term-rates'][ui.value].term);

					}
				},
				create: function(event, ui) {
					$('.ui-slider-handle', $('#slider')).html('0');
				}
			});


		}
	}
}]);
financialCalculator.directive('sliderOnFinishRender',['$timeout',function($timeout){
	return {
		link: function(scope,element) {
			if(scope.$last===true) {
				element.on('click',function(event){
					$('#slider').slider("value",scope.$index);
					$('.ui-slider-handle', $('#slider')).html(scope.appValue.gmfv.products[0]['sub-products'][0]['term-rates'][scope.$index].term);
				});
				$timeout(function(){
					var sliderMax = $('.block').length-1;
					$('#slider').slider("option","max",sliderMax).css("width",(sliderMax*11.1).toString()+'%');
					$('.ui-slider-handle').css("width",(100/sliderMax).toString()+'%');
				});
			}
		}
	}
}])