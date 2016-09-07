
var map= null;
var BingMapsKey = "AneS6_OFtD0WZ43Xzp3kTumQpZGNxlycZiFErrnU6cmNmwqKFU3wRBZ7f80Q7MT6";


function loadingPageHide(){
	$('#loading').hide();
}

function loadingPageShow(){
	$('#loading').show(); 
}

function getCurrentPostalCode(){
	document.getElementById('postcodeElementId').value = "";

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			function (position) {
				loadingPageShow();
				//TODO Center the map around 
				GetPostalCodeByCoordinates(position.coords.latitude, position.coords.longitude);
			},
			function (error) {
				//TODO Handle errors
				alert("System Error! "+error);
				document.getElementById('postcodeElementId').value = "2000";
			},
			{maximumAge:120000, timeout:60000}
			
		);

	}else{
		alert("Cannot get the current address.");
		document.getElementById('postcodeElementId').value = "2000";
	}
}

function GetPostalCodeByCoordinates(latitudeVal, longitudeVal){
	var urlString = "http://dev.virtualearth.net/REST/v1/Locations/"+latitudeVal +", " + longitudeVal;
	$.ajax({
	  url: urlString,
	  dataType: "jsonp",
	  jsonp: "jsonp",
	  data: {
		 key: BingMapsKey
	  },
	  complete: function(){
		 loadingPageHide();
	  },

	  success: function (data) {
		var result = data.resourceSets[0];
		if (result) {
			if (result.estimatedTotal > 0) {
				$.each(result.resources, function(i,item) {
					document.getElementById('postcodeElementId').value = item.address.postalCode;
				});
			}
		}

	  },
	  error: function(jqXHR, textStatus, errorThrown){
		//Process the error
		alert("System Error!"+jqXHR + ":" + errorThrown);
		document.getElementById('postcodeElementId').value = "2000";
	  }
	});
}

function getLocation(){
	$("#postcodeElementId").attr("disabled", false);
	var url_val = "http://dev.virtualearth.net/REST/v1/Locations?countryRegion=AU";
	var postalCode = document.getElementById('postcodeElementId').value.trim();
	
	if(postalCode != ""){
		url_val += "&postalCode=" + postalCode;
	}else{
		alert("No input value detected. Will default to 2000");
		url_val += "&postalCode=2000"; //Default to Sydney
		document.getElementById('postcodeElementId').value = "2000";
	}

	$.ajax({
      url: url_val,
      dataType: "jsonp",
      jsonp: "jsonp",
	  timeout:60000, 
	  data: {
         key: BingMapsKey
      },
	  success: function (data) {
		var result = data.resourceSets[0]; 
		if (result) {
			if (result.estimatedTotal > 0) {
				var coordinatesVal = result.resources[0].point.coordinates;
				GetLocationByCoordinates(coordinatesVal[0], coordinatesVal[1]);
			}else{
				alert("Location cannot be found.");
			}
		}else{alert("Location cannot be found.");}
	  },
	  error: function(jqXHR, textStatus, errorThrown){
        //Process the error
		alert("System Error!"+jqXHR + ":" + errorThrown);
      }
   });

}


var pinInfobox = null;
//Get Specific Position
function GetLocationByCoordinates(latitudeVal, longitudeVal){
	var map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), 
	   {credentials:BingMapsKey,
		center: new Microsoft.Maps.Location(latitudeVal, longitudeVal),
		mapTypeId: Microsoft.Maps.MapTypeId.road,
		showCopyright: false,
		zoom: 15
	});
	 // Add handler for the map click event - add a pin to the click location.
	 //Microsoft.Maps.Events.addHandler(map, 'click', addPin);

	var center = map.getCenter();
	// Add a pin to the center of the map
	var pin = new Microsoft.Maps.Pushpin(center, {text: '0'}, {draggable: true}); 
	// Create the info box for the pushpin
	pinInfobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(0,0), {title: 'My Pushpin', visible: true});

	// Add a handler for the pushpin click event.
	Microsoft.Maps.Events.addHandler(pin, 'click', displayInfobox);

	// Hide the info box when the map is moved.
	Microsoft.Maps.Events.addHandler(map, 'viewchange', hideInfobox);

	// Add the pushpin and info box to the map
	map.entities.push(pin);
	map.entities.push(pinInfobox);
	
	$('#mapDiv').show();
}

function displayInfobox(e){
	pinInfobox.setOptions({ visible:true });
}
function hideInfobox(e){
	pinInfobox.setOptions({ visible: false });
}