document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    //$('#map').html("info.level");
    
    //window.addEventListener("batterycritical", onBatteryCritical, false);
    
    //function onBatteryCritical(info) {
    // Handle the battery critical event
    //alert("Battery Level Critical " + info.level + "%\nRecharge Soon!");
    //}
    
    //checkConnection();
    //geo2();
    
    
    navigator.geolocation.getCurrentPosition (function (pos)
    {
                                              
         var lat = pos.coords.latitude;
         var lng = pos.coords.longitude;
         
         var originIcon = 'images/Chart.png';
         var destIcon = 'img/marketer34.png';
         $('#classifica').html("distanza");
        
                                              var beaches = [
                                                             ['MiaP', lat, lng, 1],
                                                             ['Cotton', 41.913010, 12.442009, 2],
                                                             ['Liegi', 41.914332, 12.523114, 3]
                                                             ];
                                              
                                              var image = {
                                              url: 'http://google-maps-utility-library-v3.googlecode.com/svn/trunk/geolocationmarker/images/gpsloc.png',
                                              // This marker is 20 pixels wide by 32 pixels tall.
                                              size: new google.maps.Size(20, 32),
                                              // The origin for this image is 0,0.
                                              origin: new google.maps.Point(0,0),
                                              // The anchor for this image is the base of the flagpole at 0,32.
                                              anchor: new google.maps.Point(0, 32)
                                              };
                                              
                                              var shape = {
                                              coord: [1, 1, 1, 20, 18, 20, 18 , 1],
                                              type: 'poly'
                                              };
                                              
                                              var img = 'img/gps24.png'
                                              
        
                                            var distanza = getDistanceFromLatLonInKm(lat,lng,41.913010,12.442009).toFixed(1);
                                            codeLatLng();
                                              
        alert(distanza);
        var dist = distanza;
        $('#classifica').html(dist);
        //alert(getDistanceFromLatLonInKm(lat,lng,41.913010,12.442009).toFixed(1));
                                           
                                              
         var latlng = new google.maps.LatLng (lat, lng);
         var options = {
         zoom : 11,
         center : latlng,
         mapTypeId : google.maps.MapTypeId.ROADMAP
                                              
    };

                                              $("#btn").bind ("click", function (event)
                                              {
                                              var $content = $("#win2 div:jqmData(role=content)");
                                              $content.height (screen.height - 50);
                                              
                                              var infowindow = new google.maps.InfoWindow();
                                              
                                              var options = {
                                              zoom : 11,
                                              center : latlng,
                                              mapTypeId : google.maps.MapTypeId.ROADMAP
                                              
                                              };
                                              var map = new google.maps.Map($content[0], options);
                                                              
                                              
                                              $.mobile.changePage ($("#win2"));
                                               setTimeout(function() {
                                                   google.maps.event.trigger(map, "resize");
                                                   map.setCenter(latlng);
                                                }, 1000);
                                              
                                              for (var i = 0; i < beaches.length; i++) {
                                              
                                              var beach = beaches[i];
                                              
                                              var myLatLng = new google.maps.LatLng(beach[1], beach[2], beach[3]);
                                              
                                              
                                              if (i==0) {
                                                icon = img;
                                              }
                                                else {
                                                icon = destIcon;
                                              }
                                              
                                              marker = new google.maps.Marker (
                                               {
                                                   map : map,
                                                   icon: icon,
                                                   animation : google.maps.Animation.DROP,
                                                   position : myLatLng,
                                                   content:'<div class="infowindow">Liegi</div>',
                                                   //shape: shape,
                                                   title: beach[0],
                                                   zIndex: beach[3]
                                               });
                                                              
                                                //if (i==0) {
                                                //infowindow.setContent('Poker');
                                                //infowindow.open(map, marker);
                                                //}
                                                              
                                               google.maps.event.addListener(marker, 'click', function() {
                                                  infowindow.setContent(this.content);
                                                  infowindow.open(map, this);
                                               });

                                              }
                                              
                                                              
                                              });
                                              
  });
    
var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
    
}

function cambiap() {

    var latlng = new google.maps.LatLng ("", "");
    var myLatLng = new google.maps.LatLng("", "");
    $.mobile.changePage ($("#home"));
    window.location.href = "index.html";

}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

function codeLatLng() {
    var geocoder;
    geocoder = new google.maps.Geocoder();
    var input = "41.875094, 12.478151";
    var latlngStr = input.split(',', 2);
    var lat = parseFloat(latlngStr[0]);
    var lng = parseFloat(latlngStr[1]);
    var latlng = new google.maps.LatLng(lat, lng);
    
    geocoder.geocode({'latLng': latlng}, function(results, status) {
                     if (status == google.maps.GeocoderStatus.OK) {
                     if (results[1]) {
                     alert(results[1].formatted_address);
                     
                     } else {
                     alert('No results found');
                     }
                     } else {
                     alert('Geocoder failed due to: ' + status);
                     }
                     });
}


