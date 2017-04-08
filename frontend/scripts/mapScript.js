
        
function addManyMarkers(latArray, longArray, map) {
    numberLocations = locationArray.length;
    for (var i = 0; i < numberLocations; i++){
        addMarker(latArraY[i], longArray[i], map, detailArray[i])
    }            
}



  function initMap() {
    console.log("Hello");
    var homeLocation = {lat: 7.9465, lng: -1};
    var Ghana2 = {lat: 7.9465, lng: -3};
          
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: homeLocation
      });
          
    mDetail1 = "School 1"
    mDetail2 = "School 2"
        addMarker(10, -2, map, mDetail1 );
        addMarker(8, 0, map, mDetail2);
  }
 
// Adds 1 marker
 function addMarker(latitude, longitude, map, data) {
    "use strict";
    var pos = {lat: latitude, lng: longitude};
    var marker = new google.maps.Marker({
        position: pos,
        map: map
    })
    var infowindow = new google.maps.InfoWindow({
        content: data
    })
    marker.addListener('click', function(){
        infowindow.open(map,marker);
    });


}
