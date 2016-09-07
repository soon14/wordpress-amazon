ND.LFC.financialCalculator.factory('FCrevealModal',function(){
	var revealModal={
		init:function(){

			revealModal.modalSuccess();
			revealModal.modalClose();

			

		},
		modalSuccess:function(){
			$(".reveal-content-modal").on('click',function(e){
				e.preventDefault();
				$(".reveal-modal-bg").show();
				$("#content-modal").show();
				$("#content-modal .content").html($(".disclaimer").html());
				$("body").addClass("no-scroll");

			});
		},
		modalClose:function(){
			$("#content-modal .close-reveal-modal").on('click',function(e){
				e.preventDefault();
				$("body").removeClass("no-scroll");
				$("#content-modal .content").html("");
				$("#content-modal").hide();
				$(".reveal-modal-bg").hide();

			});
		}




	};
	return revealModal;
});