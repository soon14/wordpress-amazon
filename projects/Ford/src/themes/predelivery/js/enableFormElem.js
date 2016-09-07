/*
 * Author: Jessie Biros
 * Description: Pre-delivery steps - enable other form elements on click of radio button etc.

 example use:

if the one that will enable will come from the SELECT
<div class="panel-content">
	<div class="row">
		<div class="medium-6 medium-centered columns">
			<label for="Frequency1">FAVOURITE COLOUR</label>
			<select id="favoritecolor" name="favoritecolor">
				<option selected="selected">Select Your Religion</option>
				<option value="god1">GOD 1</option>
				<option value="god1">GOD 1</option>
				<option value="Others" data-enable="can_enable">Others</option> //this will enable the disabled element
			</select>
		</div>
	</div>

	<div class="row has_disabled"> //add has disabled class to the parent of the element
		<div class="medium-6 medium-centered columns">
			<label for="Frequency1">OTHER</label>
			<input type="text" id="other_perfume" disabled name="other_perfume" class="trackable disabled_item" /> 
			//class disabled item and property disabled
		</div>
	</div>
</div>

if the one that will enable is from radio button or other elements
<div class="panel-content">
	<div class="row">
		<div class="medium-3 medium-offset-4 columns radio-wrap">
			<input type="radio" name="Time" id="veh_dec_yes" value="Twentyfour_hour" class="radio round trackable can_enable"/> //this can enable
			<label for="veh_dec_yes" class="trackable can_enable">Yes</label> //this can enable
		</div>
		<div class="medium-3 end columns radio-wrap">
			<input type="radio" name="Time" id="veh_dec_no" value="Twelve_hour" class="radio round trackable"/>
			<label for="veh_dec_no" class="trackable">No</label>
		</div>
	</div>

	<div class="row has_disabled"> //add class has disabled
		<div class="medium-6 medium-centered columns">
			<label for="Frequency1">FAVOURITE COLOUR</label>
			//disabled item class and disabled attr.
			<select id="favoritecolor" name="favoritecolor" class="disabled_item" disabled> 
				<option value="color1">Color 1</option>
				<option value="color1">Color 1</option>
				<option value="color1">Color 1</option>
				<option value="color1">Color 1</option>
				<option value="color1">Color 1</option>
			</select>
		</div>
	</div>
</div>
 */

(function($){
	var enableFormElem = {
		init: function(){
			// this will check if the element doesnt exist then it wont run the function
			if (!$(".can_enable", ".uniform").length) {return;}

			// bind enableEvent function to radio buttons
			$("input:radio").on('click', this.enableEvent.bind(this));
			// bind enableEvent function to labels
			$("label").on('click', this.enableEvent.bind(this));

			var canEnableElems = $(".can_enable",".uniform");

			// this will check if by default the option being set is the one that can enable
			enableFormElem.checkDefaultEnable(canEnableElems);

			enableFormElem.checkDefaultEnableSelect($('select', ".uniform"));

			$("select").change(function(){
				var self = $(this);
				// this will check if the select tag is not the disabled item
				if(!self.hasClass('disabled_item')){
					// if it can enable, then it will set the "disabled" property to false to the ".disabled_item"
					var parent = self.parents('.panel-content').find('.has_disabled');

					// this will check if the selected value is can_enable
					if(self.find(':selected').data('enable') == "can_enable"){
						$('.disabled_item', parent).prop("disabled", false);
					} else {
						$('.disabled_item', parent).prop("disabled", true);
					}
				}
			});
		},

		enableEvent: function(e){
			var el = e.target;
			var parent = $(el).parents('.panel-content').find('.has_disabled');

			//this will check if the clicked 'label' is sibling(before) a 'dropdown'
			if($(el).next().hasClass('dropdown')){
				return false;
			}

			if($(el).hasClass("can_enable")){
				$('.disabled_item', parent).prop("disabled", false);
			} else {
				$('.disabled_item', parent).prop("disabled", true);
			}
		},

		checkDefaultEnable: function(arr){
			arr.each(function(){
				var self = $(this);
				if(self.parent().hasClass("checked")){
					var parent = self.parents('.panel-content').find('.has_disabled');
					$('.disabled_item', parent).prop("disabled", false);
				}
			});
		}, 

		checkDefaultEnableSelect: function(arr){
			arr.each(function(){
				var self = $(this);
				if(self.find(':selected').data('enable') == "can_enable"){
					var parent = self.parents('.panel-content').find('.has_disabled');
					$('.disabled_item', parent).prop("disabled", false);
				}
			})
		}
		
	}

	$(document).ready(function(){
		enableFormElem.init();
	});
}(jQuery));