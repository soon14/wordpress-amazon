/**
 * @author Sohrab Zabetian 
 */

/**
 * Backbone customized Collection functions
 */
Backbone.Collection.prototype.selectable = function() {
	//by default all collection have selection capability.
	//it allows the collection to mark which model is currently visible,
	//selected by the user
	return true;
};

Backbone.Collection.prototype.clickable = function() {
	//by default all collection have selection capability.
	//it allows the collection to mark which model is currently visible,
	//selected by the user
	return false;
};

Backbone.Collection.prototype.supportsMultiSelect = function() {
	//by default all collection have single selection capability.
	return false;
};

/**
 * it allows the collection to mark which model is currently visible
 * @param model
 * @returns whether object was previously selected
 */
Backbone.Collection.prototype.select = function(model) {
	if (this.selectable()) {
		if (!this.supportsMultiSelect()) {
			var selectedObjts = this.where({selected : true});
			if(selectedObjts != null) {
				_.each(selectedObjts, function(obj){
					if (obj.id !== model.id) {
						obj.set('selected', false);
					}
				});
			}
		}
		
		model.set('selected', true);
		if (this.clickable()) {
			model.set('clicked', false);
		}
		return true;
	}
	return false;
};

Backbone.Collection.prototype.deselectAll = function() {
	if (this.selectable()) {
		
		var selectedObjts = this.where({selected : true});
		if(selectedObjts != null) {
			isClickable = this.clickable();
			_.each(selectedObjts, function(obj){
				obj.set('selected', false);
				if (isClickable) {
					obj.set('clicked', false);
				}
			});
		}
	}
};

Backbone.Collection.prototype.click = function(model) {
	if (this.clickable()) {
		var clickedObjects = this.where({clicked : true});
		if(clickedObjects != null) {
			_.each(clickedObjects, function(obj){
				if (obj.id != model.id) {
					obj.set('clicked', false);
				}
			});
		}
		//Util.log('model ' + model.get('id') + ' was clicked');
		model.set('clicked', true);
	}
};

/**
 * Allows the collection to mark which model is currently visible/selected
 * @param id of the model
 * @returns selected model
 */
Backbone.Collection.prototype.selectById = function(id) {
	var model = null;
	if (this.selectable()) {
		var models = this.where({id: id});
		if (models && models.length > 0) {
			 this.select(model = models[0]);
		}
	}
	
	return model;
};

/**
 * Allows the collection to mark which model is currently visible/selected
 * @param id of the model
 * @returns selected model
 */
Backbone.Collection.prototype.clickById = function(id) {
	var model = null;
	if (this.clickable()) {
		var models = this.where({id: id});
		if (models && models.length > 0) {
			 this.click(model = models[0]);
		}
	}
	
	return model;
};

/**
 * it allows the collection to mark which model is currently visible
 */
Backbone.Collection.prototype.getSelected = function() {
	if (this.selectable()) {
		var selectedObjects = this.where({
			selected : true
		});
		if (selectedObjects && selectedObjects != null &&
			 selectedObjects.length > 0) {
			if (this.supportsMultiSelect()) {
				return selectedObjects;
			} else {
				return selectedObjects[0];
			}
		}
	}
	// console.log('could not find any selected objects');
	return null;
};


Backbone.Collection.prototype.getClicked = function() {
	if (this.clickable()) {
		var clickedObjects = this.where({clicked : true});
		if (clickedObjects && clickedObjects != null
				&& clickedObjects.length > 0) {
			return clickedObjects[0];
		}
	}
	return null;
};

Backbone.Collection.prototype.unclick = function(model) {
	if (this.clickable()) {
		var clickedObjects = this.where({clicked : true, id : model.get('id')});
		if (clickedObjects && clickedObjects != null) {
			clickedObjects[0].set('clicked', false);
			return true;
		}
	}
	return false;
}

/**
 * Backbone Customized View functions
 */

/**
 * Changes jQuery template tags to {{ }} instead of <% %> to avoid java tag clash
 * 
 */
_.templateSettings = {
	interpolate : /\{\{(.+?)\}\}/g,
	evaulate : /\{\[(.+?)\]\}/g
 };

 
/**
 * Customize backbone view to include destroy View functionality
 */
Backbone.View.prototype.destroy = function() {
  this.remove();
  this.unbind();
  Events.unbind(null,this);
  /**
   * if view has children, close the children as well
   */
  if (this.children) {
	  _.each(this.children, function(child) {
		 child.destroy(); 
	  });
	  this.children = [];  
  }
};

/**
 * default render method
 * @param id
 * @returns {Backbone.View}
 */
Backbone.View.prototype.render = function() {
	 var html = $(this.template(this.model.toJSON()));
	//TODO: change this to minimize reflow
	 this.translate(html);
	 $(this.el).html(html);
	 return this;
};

Backbone.View.prototype.translate = function(selector) {
	if (!selector) {
		selector = $(this.el);
	}
	Views.Helper.translateTextOnView(selector);
};

Backbone.View.prototype.lazyload = function(selector) {
	$(selector ? selector : 'div.thumb-lazy').each(function() {
	    var $div = $(this);
	    var src = $div.data('src');
	    var img = new Image();
		
		// call this function after it's loaded
		img.onload = function() {
			// make wrapper fully visible
			$div.html(img);
			img.alt = $div.data('alt');
		};
		// begin loading the image from www.flickr.com
		img.src = src;
		
	});
	
};


