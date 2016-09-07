/**
 * @author Sohrab Zabetian
 * @description Custom Backbone overwrites
 * @project Lincoln Build and Price
 */

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/gim,
    evaluate: /\{\(\{(.+?)\}\)\}/gim
};

//delete window.console;

Backbone.View.prototype.render = function() {
    $(this.el).html($(this.template(this.model.toJSON())));
    return this;
};

/**
 * Customize backbone view to include destroy View functionality
 */
Backbone.View.prototype.destroy = function() {
    this.off();
    this.remove();
    Backbone.off(null,this);
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
