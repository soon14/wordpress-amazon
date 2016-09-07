/*
Description: Change select vehicle
*/
/*
Description: Change select vehicle
*/
(function(document){
  ND.selectList = {
    init: function(selector){
      $(document).on("click", ".selectlist li", function(e){
        e.preventDefault();
        var $this = $(this);
        if(!$this.hasClass("cur") && !$this.hasClass("selected")){
          $("li", $this.parent()).removeClass("selected");
          $this.addClass("selected");
          $(selector).val($this.children().attr("data"));
                 
        }
      });
    }
  };
})(document);