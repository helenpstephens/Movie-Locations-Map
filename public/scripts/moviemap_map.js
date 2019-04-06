var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 53.409292, lng: -2.991247},
        zoom: 8
    });

    function bindInfoWindow(marker, map, infowindow, html) {
    marker.addListener('click', function() {
        infowindow.setContent(html);
        infowindow.open(map, this);
    });
} 
   
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let coords = JSON.parse(this.responseText);
           
            // console.log(coords);

            // console.log(coords)    
            var marker, i;
             
  
            for (var i = 0; i < coords.length; i++) {
                console.log(coords[i]);
                marker = new google.maps.Marker({
                    position: {lat: parseFloat(coords[i]["lat"]), lng: parseFloat(coords[i]["lng"])}, 
                    map: map
                });
                infowindow = new google.maps.InfoWindow({
		    content: "<h4>Film/TV:</h4>" + coords[i]["film"] +  "<h4>Info:</h4>" + coords[i]["info"] + "<h4>Visited: </h4>" + coords[i]["visited"]});  
                bindInfoWindow(marker, map, infowindow, i);
            }
         }
    };
   
                
    xhttp.open("GET", "/coords", true);
    xhttp.send();
}

 
