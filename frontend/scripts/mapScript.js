<script>
    function addMarker(latitude, longitude, map) {
        var pos = {lat: latitude, lng: longitude}
        var marker = new google.maps.Marker({
            position:pos,
            map: map
        })
    }
        
    function addManyMarkers(locationArray, map){
        
                
    }

      function initMap() {
        var homeLocation = {lat: 7.9465, lng: -1};
        var Ghana2 = {lat: 7.9465, lng: -3};
          
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
          center: homeLocation
        });
          
    
          addMarker(10, -2, map);
          addMarker(4, 80, map);
      }
    </script>