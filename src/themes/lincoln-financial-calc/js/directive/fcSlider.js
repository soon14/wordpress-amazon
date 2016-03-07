financialCalculator.directive('lfcSlider',[function(){
	return {
		template: function() {
			return $('#lfc-slider-template').html();
		},
		link: function() {
			$('#slider').slider({
				orientation:"horizontal",
				range:"min",
				min:0,
				max:0,
				step:1,
				value:0,
				slide: function(event, ui) {
					if (ui.value>=0) {

					}
				},
				create: function(event, ui) {
					$('.ui-slider-handle', $('#slider')).html('0');
				}
			});


		}
	}
}])