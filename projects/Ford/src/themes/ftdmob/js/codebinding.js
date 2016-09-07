/*
 * Description: codebinding
 */
var d = document, w = window;

$(document).ready(function() {
	//Select Option
	var $cities = $('#cityDropdownData'), 
		cityList;
	if($cities.length > 0) {
		
		cityList = JSON.parse($cities[0].innerHTML);
		ND.selectOption.init(cityList);
	}
	

	//Menu Navigation
	var menuForm = $("#menuSubmition", d)[0];
	var menuOption = $("#navurl", d)[0];
	menuForm.onsubmit = function(e) {
		//exclude "#"
		if(menuForm.action.length < 2) {
			return false;
		}
	};
	menuOption.onchange = function(e) {
		var url = menuOption.options[menuOption.selectedIndex].value;
		menuForm.action = url;
	};

	//Color Picker
	var img = $("IMG", d.getElementById("imgnav"))[0];
	var colors = $("A", d.getElementById("colors"));
	if(img && colors) {
		colors.bind("click", function(e) {
			e.preventDefault();

			var anchor = $(e.target).closest("a")[0], title = $(".colortxt", $(anchor).closest(".color"))[0];

			if(anchor && title) {
				img.src = anchor.href;
				title.innerHTML = anchor.title;
			}
		});
	}

	//Full article
	var btnDiv = $("#fullarticle");
	var hideDiv = $(".hide");
	var btn = $("A", btnDiv[0]);
	btn.bind("click", function(e) {
		e.preventDefault();

		btnDiv.addClass("hide");
		hideDiv.removeClass("hide");

		if(hideDiv.hasClass("alert")) {
			$(".content").addClass("hide");
		}
	});

	//share buttons
	var $share = $("a", $("#share"));
	if($share.length) {
		ND.share.init($share, document.referrer);
	}
	/////bq update

	var selectBox = $("#phonelist");
	selectBox.bind("change", function(e) {
		var sltv = e.target.value;
		var otherName;
		if(sltv != "-1") {
			for( i = 0; i < e.target.length; i++) {

				otherName = "#" + e.target[i].value;
				$(otherName).addClass("bq_hide");
			}

			var currentdivname = "#" + sltv;
			var currentdiv = $(currentdivname);

			currentdiv.removeClass("bq_hide");
		}else{
			
			for( i = 0; i < e.target.length; i++) {

				otherName = "#" + e.target[i].value;
				$(otherName).removeClass("bq_hide");
			}
		}
	})
	var prebtn = $(".bq_prev");

	prebtn.bind("click", function(e) {

		var currentId = e.target.parentNode.parentNode.id;
		var currentI = Number(currentId.substring(1));
		var currentdivid = "#p" + currentI;
		var currentdiv = $(currentdivid);

		var nextid = Number(currentI - 1);
		var nextdivid = "#p" + nextid;
		var nextdiv = $(nextdivid);

		try {

			document.getElementById("p" + nextid).id
			currentdiv.removeClass("bq_show");
			currentdiv.addClass("bq_hide");
			nextdiv.removeClass("bq_hide");
			nextdiv.addClass("bq_show");

		} catch(e) {

		}

	})
	var nextbtn = $(".bq_next");

	nextbtn.bind("click", function(e) {

		var currentId = e.target.parentNode.parentNode.id;
		var currentI = Number(currentId.substring(1));
		var currentdivid = "#p" + currentI;
		var currentdiv = $(currentdivid);

		var nextid = Number(currentI + 1);
		var nextdivid = "#p" + nextid;
		var nextdiv = $(nextdivid);

		try {

			document.getElementById("p" + nextid).id
			currentdiv.removeClass("bq_show");
			currentdiv.addClass("bq_hide");
			nextdiv.removeClass("bq_hide");
			nextdiv.addClass("bq_show");

		} catch(e) {

		}

	})
	///end
});

