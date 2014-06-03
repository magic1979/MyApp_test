document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    // When map page opens get location and display map
    $('.page-map').live("pagecreate", function() {
    if(navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position){
       initialize(position.coords.latitude,position.coords.longitude);
     });
}
 });
    
    function initialize(lat,lng) {
        var latlng = new google.maps.LatLng(lat, lng);
        var myOptions = {
        zoom: 8,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
    }

}







