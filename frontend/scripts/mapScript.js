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

var map;

function initMap() {
    console.log("Hello");
    dumpData();
    var homeLocation = {lat: 7.9465, lng: -1}; 
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
            if(data == "database empty"){
                console.log("empty");
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 3,
                    center: {lat: 0, lng: 0}
                });  
                return;
            }
            while(data.length != 0){
                var parsed = data.substring(0,data.indexOf("}")+1);
                data = data.substring(data.indexOf("}") + 2);
                schools.push(JSON.parse(parsed));
            }
            console.log("recieved data dump");
            console.log(schools);
            map = new google.maps.Map(document.getElementById('map'), {
                //center: {lat: -34.397, lng: 150.644}
            });
            centerOnMarker(schools[0].lat, schools[0].lon, 8); 
            populateSchools(schools);
            postDump(schools);
        }
    });  
}

function centerOnMarker(latitude, longitude, zoom){
    newPosition = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
    map.setZoom(zoom);
    map.setCenter(newPosition);
}

function postDump(schools){
    console.log("Dumping");
    var element = '';
    for(var i = 0; i < schools.length; i++){
        element += "<p>" +schools[i].name+ "<br>Longitude: " + schools[i].lon + "; Latitude: " + schools[i].lat + "<br>";    
        element += "Contact Name: " + schools[i].contactName + "; Contact Number: " + schools[i].contactNumber + "</p><br>";        
        console.log(element);
        
    }
    $('.dump').html(element);
}

function populateSchools(schoolArray) {
    console.log("populating");
    numberLocations = schoolArray.length;
    for (var i = 0; i < numberLocations; i++){
        console.log(schoolArray[i].lat);
        console.log(schoolArray[i].lon);
        addMarker(parseFloat(schoolArray[i].lat), parseFloat(schoolArray[i].lon), map, schoolArray[i].name)
        //addMarker(0, 0, map, "test")
        console.log(i);
    }
}

$('#searchButton').on('click', function(){
    console.log("processing search");
    var formData = new FormData();
    formData.append("name", $('#search').val());
    console.log($('#search').val());
    console.log(formData);

    
    $.ajax({
        url: 'http://localhost:3000/search/',
        data: {'name' : $('#search').val()},
        type: 'GET',
        dataType: "json",
        success: function(data){
            console.log("search complete");
            console.log(data);
            printResults(data);
        }
    }); 
})

function printResults(data){
    if(data == null){
        console.log("printing not found");
        $("#results").html("School Not Found");
    }else{
        var output = "Name: " + data.name + "<br>";
        output += "Longitude: " + data.lon + "<br>";
        output += "Latitude: " + data.lat + "<br>";
        output += "Contact Name: " + data.contactName + "<br>";
        output += "Contact Number: " + data.contactNumber + "<br>";
        output += "<image src='http://localhost:3000/uploads/" + data.name + "_1.jpg' width='400px'>";
        $("#results").html(output);  
        centerOnMarker(data.lat, data.lon, 12);
        
    }
}


