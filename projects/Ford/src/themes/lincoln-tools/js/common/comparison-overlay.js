/*
 * @description: Comparison overlay for Lincoln BnP
 * @author: York Zhang
 *
 */

ND.LBP.ComparisonOverlay = function(data) {

    $.radOverlay.open($(data),{
        additionalClass: "comparison_overlay",

        afterContentLoad: function(){
            
            $(".comparison-wrap table tr").each(function(){
                var $this = $(this);
                $this.find("td").eq(0).addClass("always-appear");
                $this.find("td").eq(1).addClass("appear");
            });

            var tableWidth = $(".comparison-wrap .details table").eq(0).width();
            //console.log(tableWidth);
            var containerWidth = $(".comparison-wrap .details").width();
            var scrollbarWidth = containerWidth - tableWidth;
            
            $(".comparison-wrap .header").css({"padding-right":scrollbarWidth});
            

            var $dropdown = $(".comparison-wrap .series-dropdown");
            
            $(".comparison-wrap .header table td").each(function(i,item){
                var $this = $(this);
                $(this).on("click", function(){
                    if(i!=0){
                        if($dropdown.hasClass("active")){
                            $dropdown.removeClass("active");
                        }else{
                            $dropdown.addClass("active");
                        }
                    }
                })
            })
            //console.log($(".comparison-wrap"));
            $dropdown.find("li").each(function(index,item){
                var $this = $(this);
                $this.on("click", function(){
                    var column_index = index + 1;
                    $(".comparison-wrap table td.appear").removeClass("appear");
                    $(".comparison-wrap table tr").each(function(){
                        $(this).find("td").eq(column_index).addClass("appear");
                    });

                    $dropdown.removeClass("active");
                });
                
            });
        }
    });
};

