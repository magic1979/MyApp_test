document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    
    navigator.geolocation.clearWatch(watchID);
	
	$(".spinner").show();
    var connectionStatus = false;
    connectionStatus = navigator.onLine ? 'online' : 'offline';
    
    if(connectionStatus=='online'){
    
    //var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { maximumAge: 18000000, timeout: 20000, enableHighAccuracy:true });
	var watchID = navigator.geolocation.watchPosition(onSuccess, onError3, { maximumAge:600000, timeout:30000, enableHighAccuracy: true });
	
	function onSuccess(position) {
            var ciao = position.coords.latitude;
            var ciao1 = position.coords.longitude;
            
            localStorage.setItem("lat", ciao)

            localStorage.setItem("lng", ciao1)
			
			localStorage.setItem("geoloc", "SI")
        }
        
        
        function onError3(error) {
			if (error.code == error.TIMEOUT)
    		{
				var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { maximumAge:600000, timeout:30000, enableHighAccuracy: false });
        		return;
			}
			else
			{
				 if (error.code == 1){
        			$('#classifica').html('Permesso negato');
				}
    			else if (error.code == 2){
        			$('#classifica').html('posizione non trovata');
				}
				else{
        			$('#classifica').html('Errore Generico');
				}
				
				localStorage.setItem("geoloc", "NO")
			}
        }
		
		function onError(error) {
				if (error.code == 1){
        			$('#classifica').html('Permesso negato');
				}
    			else if (error.code == 2){
        			$('#classifica').html('posizione non trovata');
				}
				else if (error.code == 3){
        			$('#classifica').html('Time Out');
				}
				else{
        			$('#classifica').html('Errore Generico');
				}
				
				localStorage.setItem("geoloc", "NO")
		}
        


		  var lat = localStorage.getItem("lat");

		  var lng = localStorage.getItem("lng");

                                              

          var destIcon = new google.maps.MarkerImage("images/mark.png", null, null, null, new google.maps.Size(28,40));

                                              

		  var beaches = [];

		  var posizione = 1;

		  

		  beaches.push(['Tua Posizione',lat,lng,1])

		  

		  $.ajax({

				 type:"GET",

				 url:"http://www.pokeranswer.it/www/Check_Room.asp",

				 contentType: "application/json",

				 //data: {ID: "1", ID2: "4"},

				 data: {ID: "all"},

				 jsonp: 'callback',

				 crossDomain: true,

				 success:function(result){

				 

				 $.each(result, function(i,item){

						

						posizione = (posizione+1);

						

						beaches.push([item.Room,item.lat,item.lng,posizione])



				  });

				 

				 for (var i = 0; i < beaches.length; i++) {

					var beach = beaches[i];

					//alert(beach[0]);

				 }	

				 

				 },

				 error: function(){

				 alert('There was an error loading the data.');

				 },

				 dataType:"jsonp"});

		  

		  

	//	  var image = {
//
//		  url: 'http://google-maps-utility-library-v3.googlecode.com/svn/trunk/geolocationmarker/images/gpsloc.png',
//
//		  // This marker is 20 pixels wide by 32 pixels tall.
//
//		  size: new google.maps.Size(20, 32),
//
//		  // The origin for this image is 0,0.
//
//		  origin: new google.maps.Point(0,0),
//
//		  // The anchor for this image is the base of the flagpole at 0,32.
//
//		  anchor: new google.maps.Point(0, 32)
//
//		  };

		  
		  var shape = {

		  coord: [1, 1, 1, 20, 18, 20, 18 , 1],

		  type: 'poly'

		  };

		  

		  var img = new google.maps.MarkerImage("images/gps.png", null, null, null, new google.maps.Size(22,22));


		  //var distanza = getDistanceFromLatLonInKm(lat,lng,41.913010,12.442009).toFixed(1);

		  codeLatLng(lat,lng);

		  

		  //var dist = distanza;

		  

		  var latlng = new google.maps.LatLng (lat, lng);

		  var options = {

		  zoom : 10,

		  center : latlng,

		  mapTypeId : google.maps.MapTypeId.ROADMAP

		  

		  };

		  

		  //$(".spinner").hide();

		  

		  $("#btn").bind ("click", function (event)

						  {

						  var $content = $("#win2 div:jqmData(role=content)");

						  $content.height (getRealContentHeight());

						  

						  $(".spinner").show();

						  

						  var options = {

						  zoom : 10,

						  center : latlng,

						  mapTypeId : google.maps.MapTypeId.ROADMAP

						  

						  };

						  var map = new google.maps.Map($content[0], options);

						  

						  

						  $.mobile.changePage ($("#win2"));

						  setTimeout(function() {

							 google.maps.event.trigger(map, "resize");

							 map.setCenter(latlng);

						  }, 1000);

						  

						  var contentString1 =

						  '<div class="popup">'+

						  '<h2> My Pub</h2>'+

						  '<p>Example Strasse n.1</b>'+

						  //'<small><b>Lat.</b> 52.520196, <b>Lon.</b> 13.406067</small></p>'+

						  //'<a target="_blank" href="http://www.marchettidesign.net">'+

						  //'Visit Web Site &#187;</a> '+

						  '</div>';

						  

						  var infowindow = new google.maps.InfoWindow({

							  //content: contentString1,

							  maxWidth: 200,

							  maxHeight: 150,

						  });

						  

						  for (var i = 0; i < beaches.length; i++) {

						  

						  var beach = beaches[i];

						  //var k = i+1;

						  

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

								  content:'<div class="infowindow">'+ beach[0] +'</div>',

								  shape: shape,

								  title: beach[0],

								  zIndex: beach[3]

							});

						  

						  google.maps.event.addListener(marker, 'click', function() {

							 infowindow.setContent(this.content);

							 infowindow.open(map, this);

						  });

						  

							//if (i==0) {

								//new google.maps.event.trigger(marker, 'click' );

							//}

						  }

						  

						  $(".spinner").hide();

                                                              

                  });
    
}
    
    else{
        
        navigator.notification.alert(
               'Stato Connessione: ' + connectionStatus,  // message
                alertDismissed,         // callback
                'Attenzione',            // title
                'Done'                  // buttonName
        );
        
        var tabella = '<table align="center" border="0" width="310px" height="60px">';
        tabella = tabella + '<tr><td align="center" width="50px"><img src="images/noconn.png" width="32px"></td><td align="left"><font color="white" size="2">Per leggere le news hai bisogno di una connessione attiva</font></td></tr>';
        tabella = tabella + '</table>';
        
        $('#classifica').html(tabella);
        $(".spinner").hide();
        
    }
    
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

function codeLatLng(lati,lngi) {
    var geocoder;
    geocoder = new google.maps.Geocoder();
    //var input = "41.875094, 12.478151";
    //var latlngStr = input.split(',', 2);
    var lat = parseFloat(lati);
    var lng = parseFloat(lngi);
    var latlng = new google.maps.LatLng(lat, lng);
    
    geocoder.geocode({'latLng': latlng}, function(results, status) {
                     if (status == google.maps.GeocoderStatus.OK) {
                     if (results[1]) {
                     
                        var tabella = '<table align="center" border="0" width="310px" height="60px">';
                        tabella = tabella + '<tr><td align="center" width="50px"><a href="maps:daddr=41.913010,12.442009&saddr=41.875094,12.478151"><img src="images/marketer.png" width="32px"></a></td><td align="left"><font color="white" size="2">'+ results[1].formatted_address +'</font></td></tr>';
                        tabella = tabella + '</table>';
                     
                        var viadotto = results[1].formatted_address;
                     
                        localStorage.setItem("Via", viadotto)
                     
                        $('#classifica').html(tabella);
                        $(".spinner").hide();
                     
                     } else {
						 var string = "<a href='javascript:again()'>geolocation</a>";
                        $('#classifica').html(string);
                        $(".spinner").hide();
                     }
                     } else {
                        $('#classifica').html('Geocoder failed due to: ' + status);
                        $(".spinner").hide();
                     }
                     });
}


function getRealContentHeight() {
	var header = $.mobile.activePage.find("div[data-role='header']:visible");
	var footer = $.mobile.activePage.find("div[data-role='footer']:visible");
	var content = $.mobile.activePage.find("div[data-role='content']:visible:visible");
	var viewport_height = $(window).height();
    
	var content_height = viewport_height - header.outerHeight() - footer.outerHeight();
	if((content.outerHeight() - header.outerHeight() - footer.outerHeight()) <= viewport_height) {
		content_height -= (content.outerHeight() - content.height());
	}
	return content_height;
}

function again() {
	navigator.geolocation.getCurrentPosition(onSuccess1, onError1, { maximumAge:600000, timeout:30000, enableHighAccuracy: true });
	
	function onSuccess1(pos) {
		var ciao2 = pos.coords.latitude;
        var ciao3 = pos.coords.longitude;
		
		$('#classifica').html(ciao2);
	}
	
	function onError1(err) {
		navigator.geolocation.getCurrentPosition(onSuccess10, onError10, { maximumAge:600000, timeout:30000, enableHighAccuracy: false });
	}
	
	function onSuccess10(pos) {
		var ciao2 = pos.coords.latitude;
        var ciao3 = pos.coords.longitude;
		
		$('#classifica').html(ciao2);
	}
	
	function onError10(err) {
		$('#classifica').html('Non ci riesco');
	}
	
}


