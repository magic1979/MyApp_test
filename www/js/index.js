/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
        $(".spinner").show();
        $('body').on('touchmove', function (e) {
            e.preventDefault();
        });
        
        var connectionStatus = false;
        connectionStatus = navigator.onLine ? 'online' : 'offline';
        
        if(connectionStatus=='online'){
        
            var landmark = '<table align="center" border="0" width="310px" height="80px">';
            
            $.ajax({
                   type:"GET",
                   url:"http://www.pokeranswer.it/www/Check_News.asp",
                   contentType: "application/json",
                   //data: {ID: "1", ID2: "4"},
                   //data: {ID: $value},
                   jsonp: 'callback',
                   crossDomain: true,
                   success:function(result){
                   
                   $.each(result, function(i,item){
                          var newdata = dataok(item.Data);
                          
                          landmark = landmark + '<tr><td align="left" width="100px"><img src="img/News/'+ item.IMG +'.png" class="circolare"></td><td align="left" width="180px"><table align="center" border="0" width="180px"><tr><td align="left"><font size="2" color="gold" class="scritta">'+ newdata +'</font></td></tr><tr><td align="left"><font color="white" size="2">'+ item.Nome +'</font></td></tr></table></td><td align="left" width="30px"><a href="FindNews.html" rel="external" ><img src="images/finger.png" width="30px"></a></td></tr>';
                          
                          });
                   
                   landmark = landmark + '</table>';
                   $('#classifica').html(landmark);
                   
                   
                   $(".spinner").hide();
                   
                   },
                   error: function(){
                        navigator.notification.alert(
                            'Dati non presenti al momento, riprova tra qualche momento.',  // message
                             alertDismissed,         // callback
                            'Attenzione',           // title
                            'Done'                  // buttonName
                        );
                        $(".spinner").hide();
                   },
            dataType:"jsonp"});
            
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
        
        setTimeout(function() {
            navigator.splashscreen.hide();
        }, 2000);
        
        
    }
    
    navigator.notification.confirm(
        'Ci Sono',  // message
        onConfirm,              // callback to invoke with index of button pressed
        'Ci Sono',            // title
        'Accetto,Rifiuto'          // buttonLabels
     );
};




function cambiap() {
    
    navigator.notification.confirm(
        'Per usare la funzione Radar e Mappa devi autorizzare ad usare la tua posizione',  // message
        onConfirm,              // callback to invoke with index of button pressed
        'Tua Posizione',            // title
        'Accetto,Rifiuto'          // buttonLabels
     );
    
}

function checkConnection() {
    var networkState = navigator.connection.type;
    
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    
    //alert('Connection type: ' + states[networkState]);
    
    navigator.notification.alert(
        'Connection type: ' + states[networkState],  // message
         alertDismissed,         // callback
         'Connessione',            // title
         'Done'                  // buttonName
    );
    
    
    //$('#connessione').html(states[networkState] + '\n');
}

function alertDismissed() {
    // do something
}

function dataok(deg) {
	var year=deg.slice(0,4);
	var day=deg.substr(6,2);
	var month=deg.substr(4,2);
	
	var d = day + "/" + month + "/" + year
	
    return d
}

function codeLatLng(vir1) {
    var geocoder;
    geocoder = new google.maps.Geocoder();
    var input = vir1;
    //alert(input);
    
    var latlngStr = input.split(',', 2);
    var lat = parseFloat(latlngStr[0]);
    var lng = parseFloat(latlngStr[1]);
    var latlng = new google.maps.LatLng(lat, lng);
    
    geocoder.geocode({'latLng': latlng}, function(results, status) {
                     if (status == google.maps.GeocoderStatus.OK) {
                     if (results[1]) {
                     alert(results[1].formatted_address);
                     $('#posizione').html(results[1].formatted_address);
                     
                     } else {
                     alert('No results found');
                     $('#posizione').html('Nessuna Posizione');
                     }
                     } else {
                     alert('Geocoder failed due to: ' + status);
                     $('#posizione').html('Geocoder failed due to: ' + status);
                     }
                     });
}

function onConfirm(button) {
    if (button==1){
        window.location.href = "pull.html";
    }
}


