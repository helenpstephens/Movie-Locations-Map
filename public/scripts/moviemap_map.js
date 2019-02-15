var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 53.409292, lng: -2.991247},
        zoom: 8
    });
  
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let coords = JSON.parse(this.responseText);
            
            // console.log(coords);

            // console.log(coords)    
        
            for (var i = 0; i < coords.length; i++) {
                console.log(coords[i]);
                new google.maps.Marker({position: {lat: parseFloat(coords[i]["lat"]), lng: parseFloat(coords[i]["lng"])}, map: map});
            }
        }
    };
        
    xhttp.open("GET", "/coords", true);
    xhttp.send();
}
