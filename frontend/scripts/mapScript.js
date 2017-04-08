function schoolDataStruct(lat, long, name, phone, adminname, imagearray){
    var schoolData = {latitude: lat, longitude: long, 
                      school: name, phonenum: phone, 
                      admin: adminname, images: imagearray};
    return schoolData;
}
        
function addManyMarkers(latArray, longArray, map) {
    numberLocations = locationArray.length;
    for (var i = 0; i < numberLocations; i++){
        addMarker(latArraY[i], longArray[i], map, detailArray[i])
        console.log("Hi");
    }            
}



  function initMap() {
    console.log("Hello");
    schoolData = dumpData();
      console.log(schoolData);
      console.log("printed schoolData");
    var homeLocation = {lat: 7.9465, lng: -1};
          
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
    var school = loadData
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
        marker.addListener('click', function(){
            markerInfo();
        });
    });


}

// opens info on left bar
function markerInfo(){
    document.getElementById("displayschool").innerHTML = "School Name: Longitude: ";
    
}

function loadData(schoolName){
    var responseJSON = $.getJson("localhost:3000", schoolName);
    var schoolData = JSON.parse(responseJSON);
    return schoolData;
}

//$('#dump').on('click', function(){

function dumpData(){
    console.log("requesting dump");
    $.ajax({
        url: 'http://localhost:3000/database/',
        type: 'GET',
        dataType: "text",
        success: function(data){
            var schools = [];
            while(data.length != 0){
                var parsed = data.substring(0,data.indexOf("}")+1);
                data = data.substring(data.indexOf("}") + 2);
                schools.push(JSON.parse(parsed));
            }
            console.log(schools);
            return schools;
        }
    });  
}



