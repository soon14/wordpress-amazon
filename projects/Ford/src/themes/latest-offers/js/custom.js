$(document).ready(function(){
	$('.flexslider').flexslider();
	
	$(document).foundation();
	
	$( "#range-slider" ).slider({
		range:true,
		min: 0,
		max: 100000,
		values: [ 16000, 60000 ],
		slide: function( event, ui ) {
			$( "#price" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
		}
	});
	$( "#price" ).val( "$" + $( "#range-slider" ).slider( "values", 0 ) + " - $" + $( "#range-slider" )
	.slider( "values", 1 ) );
	$( "#range-slider" ).draggable();
	
	$(".menu-button").on("click", function(){
		$(".menu-button").toggleClass("bg-white");
		$("#nav").toggleClass("show");
	});
	
	function customCheckbox(checkboxName){
		var checkBox = $('input[name="'+ checkboxName +'"]');
		$(checkBox).each(function(){
			$(this).wrap( "<span class='custom-checkbox'></span>" );
			if($(this).is(':checked')){
				$(this).parent().addClass("selected");
			}
		});
		$(checkBox).click(function(){
			$(this).parent().toggleClass("selected");
		});
	}
	
	customCheckbox("alloffers[]");
	customCheckbox("offers[]");
	customCheckbox("bodytype[]");
	customCheckbox("fueltype[]");
	customCheckbox("toying[]");
	customCheckbox("models[]");
	
	$(".filter-options").on("click", function(){
		$(".search-filter").show();
		$(".results-area").hide();
	});
	
	$(".close-update").on("click", function(){
		$(".search-filter").hide();
		$(".results-area").show();
	});
});

