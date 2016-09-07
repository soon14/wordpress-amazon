/*globals jQuery */
(function($){
	$(function(){
		$("#comparingModels").doOnce(function(){
			
			
			
			var comparer = $(this),
				tables = $(".specification-table"),
				checkboxes = comparer.find("input"),
				cacheStore,
				transformInputs,
				updateCookie,
				toggleColEach,
				toggleColEvent,
				toggleCol,
				createCol,
				injectWarningMsg,
				checkExistingCookie,
				warningMessage = $([]),
				cols = {},
				max = 4,
				min = 1;
			


			//Cookie Object abstraction
			cacheStore = {
				key:"specChecks",
				get:function(){
					return $.cookie(this.key) || "";
				},
				set:function(value){
					if(this.get() !== value) {
						//Session cookie
						$.cookie(this.key, value, {path:'/', expires:-1});
					}
				},
				is:function(){
					return this.get().length > 0;
				},
				contains:function(value){
					return this.get().indexOf(value) > -1;
				}
			};
			
			transformInputs = function () {
				checkboxes.each(function () {
					var $this = $(this),
						$parent = $this.parent(),
						attributes = {
							'id': this.id,
							'name': $this.attr("name"),
							'class': this.className,
							'value': this.value,
							'type': 'checkbox'
						};
					$this.remove();
					
					$parent.prepend(function () {
						return $("<input/>").attr(attributes).get(0);
					});
				});
				checkboxes = $("input", comparer);
			};
			
			//Associations
			createCol = function(){
				//assumes checkboxes and cols are same order and count.
				checkboxes.each(function(index){
					var col = {};
					col.checkbox = $(this);
					col.cells = tables.find('td:nth-child(' + (index+2) + ')');
					cols[this.id] = col;
				});
				
			};
			
			checkExistingCookie = function(){
				if(!cacheStore.is()) { return; }
				
				var matches = $(this).filter(function(){
					return cacheStore.contains(this.id);
				}).size();
				
				if(matches <= 0) {
					cacheStore.set("");	
				}
			};
			
			//On Load first time
			toggleColEach = function(index, element){
				//this is checkbox
				toggleCol.apply(this, [(cacheStore.is() && cacheStore.contains(this.id)) || (!cacheStore.is() && index < 4)])
			};
			
			//Per checkbox click
			toggleColEvent = function() {
				//this is checkbox
				var current = checkboxes.filter(':checked'),
					length = current.size();
				
				//If we are within the number of allowed checked items. then go ahead
				if(length <= max && length >= min ) {
					warningMessage.hide();
					toggleCol.apply(this, [$(this).is(":checked")]);
					updateCookie(current);
				} else {
					//We have hit a boundary so allow or disallow the check action.
					if(length > max) {
						$(this).removeAttr("checked");
						warningMessage.show();
					}else{
						$(this).attr("checked", "checked");
					}
				}
				
			};
			
			//Shows or hides the column.
			toggleCol = function(action){
				//this is checkbox
				var $this = $(this),
					cells = cols[this.id].cells;

				if(action) {
					$this.attr("checked", "checked");
					cells.show();
				} else {
					$this.removeAttr("checked");
					cells.hide();
				}
			};
			
			//Sets the checkboxes passed into the cookie
			updateCookie = function(current){
				var cookieValue = [];
				current = current || checkboxes.filter(':checked');
				current.each(function(){
					cookieValue.push(this.id);
				});
				cacheStore.set(cookieValue.join());
			};
			
			injectWarningMsg = function () {
				var warning = $("INPUT#limitReached");
				var markup = {
					messageContainer: function (message) {
						return '<p class="warning">' + message + '</p>';
					}
				};
				if ($(warning).size() > 0) {
					var message = $(warning).val();
					warningMessage = $(markup.messageContainer(message));
					$(comparer).prepend(warningMessage);
					$(warningMessage).hide();
					$(warning).remove();
				}
			};
			
			//Init effectively
			transformInputs();
			createCol();
			injectWarningMsg();
			checkboxes.doOnce(checkExistingCookie).each(toggleColEach);
			checkboxes.bind('click.sd', toggleColEvent);
			
		});		
	});
})(jQuery);
