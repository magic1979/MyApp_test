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
 
 function initPushwoosh()
{
    //get pushwoosh plugin
    var pushNotification = window.plugins.pushNotification;
    //notify plugin that device is ready, this is VERY important as it will dispatch on start push notification
    pushNotification.onDeviceReady();
 
    //register for push notifications
    pushNotification.registerDevice({ projectid: "103551733757", appid : "5370F-D83D1" },
        function(status) {
            //this is push token
            var pushToken = status;
            console.warn('push token: ' + pushToken);
        },
        function(status) {
            console.warn(JSON.stringify(['failed to register ', status]));
            
        navigator.notification.alert(
          'Al momento non puoi ricevere alcuna notifiche',  // message
           alertDismissed,         // callback
           'Notifica',            // title
           'Done'                  // buttonName
       );

        }
    );
 
    //this function gets called when push notifications has been received
    document.addEventListener('push-notification', function(event) {
        var title = event.notification.title;
        var userData = event.notification.userdata;
        var msg = event.notification.message;
                                 
        if(typeof(msg) != "undefined") {
            console.warn('user data: ' + JSON.stringify(userData));
        }
        
        navigator.notification.alert(
           msg,  		  	   // message
           alertpush,    // callback
           'Notifica',             // title
           'Done'            // buttonName
        );
        
       //var notification = event.notification;
       //navigator.notification.alert(
          //'News: ' + notification.aps.alert,  // message
         //alertDismissed,         // callback
         //'Notifica',            // title
         //  'Done'                  // buttonName
        //);
        
        //Next Test
    });
}

function init() {
    document.addEventListener("deviceready", initPushwoosh, true);

}
 
 
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
		document.addEventListener("resume", onResume, false);
		
		var orario1;
		
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		
        var hoverDelay = $.mobile.buttonMarkup.hoverDelay = 0;
		var ciao;
        var ciao1;
        var dataoggi;
        var storedata;
        var chip = 0;
        var giorni;
        var NomeNews;
        var NomeStrat;
		var ImgLogo;
		
		$.mobile.defaultPageTransition = 'none';
        $.mobile.defaultDialogTransition = 'none';
        
        $('body').on('touchmove', function (e) {
            e.preventDefault();
        });
		
		checkData();
		
		var inizio = '<table align="center" border="0" width="310px" height="100px">';
            inizio = inizio + '<tr><td align="center" width="100px"><img src="logo3.png" width="80px"></td><td align="left" width="180px"><table align="center" border="0" width="180px"><tr><td align="left"><font size="2" color="gold" class="scritta">PokerAnswer ♥</font></td></tr><tr><td align="left"><font color="white" size="2">Ogni Giorno Ricevi AnswerChips Gratis.</font></td></tr></table></td><td><a href="#" rel="external"><img src="images/glass4.png" width="40px"></a></td></tr>';
        inizio = inizio + '</table>';
        $('#classifica').html(inizio);
        $('#fiches').html('<img src="images/chipa.png" height="20px">');
		
        var connectionStatus = false;
        connectionStatus = navigator.onLine ? 'online' : 'offline';
        
        if(connectionStatus=='online'){
        	//var connessione = checkConnection();
			checkPos();
            
            $('#noconn').hide();
            
            $(".spinner").show();
            
            var landmark = '<table align="center" border="0" width="310px" height="100px">';
            
            $.ajax({
                   type:"GET",
                   url:"http://www.pokeranswer.it/www/Check_News.asp",
                   contentType: "application/json",
                   //data: {ID: "1", ID2: "4"},
				   timeout: 7000,
                   jsonp: 'callback',
                   crossDomain: true,
                   success:function(result){
                   
                   $.each(result, function(i,item){
                          
                          if(item.Nome != '0'){
                            var newdata = orario1 + " - " + dataok(item.Data);
                            NomeNews = item.Nome;
                            NomeStrat = item.NomeStrat;
							ImgLogo = item.ImgLogo;
                          
                          dataoggi = item.dataoggi;
                          storedata = localStorage.getItem("storedata");
                          giorni = localStorage.getItem("Day");
                          
                          if (parseInt(dataoggi) != parseInt(storedata)){
                          giorni = parseInt(giorni)-1;
                          localStorage.setItem("Day", giorni);
                          
                            if (parseInt(giorni)>0){
                                if(localStorage.getItem("Token")=="SI"){
                                    chip = 500;
                                }
                                else{
                                    chip = localStorage.getItem("chip");
                                }
                            }
                            else{
                                chip = parseInt(item.Chip);
								localStorage.setItem("Token", "NO");
                            }
                          
                          localStorage.setItem("chip", chip);
                          
                          storedata = dataoggi;
                          localStorage.setItem("storedata", dataoggi);
                          }
                          else{
                          chip = localStorage.getItem("chip");
                          storedata = localStorage.getItem("storedata");
                          }
                          
                            landmark = landmark + '<tr><td align="center" width="100px"><img src="http://www.pokeranswer.it/img/'+ ImgLogo +'.png" data-rel="external" width="80px"></td><td align="left" width="180px"><table align="center" border="0" width="180px"><tr><td align="left"><a id="badde" class="badge1" data-badge="1"><font size="2" color="gold" class="scritta">'+ newdata +' ♠</font></a></td></tr><tr><td align="left"><font color="white" size="2">'+ item.Nome +'</font></td></tr></table></td><td><a href="FindNews.html?nome='+ item.Nome +'" rel="external" ><div width="40px" class="home"></div></a></td></tr>';
                          
                          }
                          else{
                          
                            var newdata = orario1 + " - PokerAnswer";
                            dataoggi = item.dataoggi;
                            NomeNews = "";
                            NomeStrat = item.NomeStrat;
							ImgLogo = item.ImgLogo;
                          
                          dataoggi = item.dataoggi;
                          storedata = localStorage.getItem("storedata");
                          giorni = localStorage.getItem("Day");
                          
                          if (parseInt(dataoggi) != parseInt(storedata)){
                          giorni = parseInt(giorni)-1;
                          localStorage.setItem("Day", giorni);
                          
                            if (parseInt(giorni)>0){
                                if(localStorage.getItem("Token")=="SI"){
                                    chip = 500;
                                }
                                else{
                                    chip = localStorage.getItem("chip");
                                }
                            }
                            else{
                                chip = parseInt(item.Chip);
                                localStorage.setItem("Token", "NO");
                            }
                          
                          localStorage.setItem("chip", chip);
                          
                          storedata = dataoggi;
                          localStorage.setItem("storedata", dataoggi);
                          }
                          else{
                          chip = localStorage.getItem("chip");
                          storedata = localStorage.getItem("storedata");
                          }
                          
                          
                            landmark = landmark + '<tr><td align="center" width="100px"><img src="http://www.pokeranswer.it/img/'+ ImgLogo +'.png" data-rel="external" width="80px"></td><td align="left" width="180px"><table align="center" border="0" width="180px"><tr><td align="left"><font size="2" color="gold" class="scritta">'+ newdata +' ♥</font></td></tr><tr><td align="left"><font color="white" size="2">Ogni Giorno Ricevi AnswerChips Gratis.</font></td></tr></table></td><td><a href="#" rel="external"><img src="images/glass4.png" width="40px"></a></td></tr>';
                          }
                          
                          });
                   
                   landmark = landmark + '</table>';
                   $('#classifica').html(landmark);
                   
                   
                   if (localStorage.getItem("Token")=="SI"){
                      $('#fiches').html('<font color="white" size="1">-' + giorni + 'day</font> <img src="images/ticket.png" height="20px"><img src="images/chipa.png" height="20px"> ' + chip);
                   }
                   else{
                     $('#fiches').html('<img src="images/chipa.png" height="20px"> ' + chip);
                   }
                   
                   if (NomeNews == localStorage.getItem("StoreNews")){
                      $('#badde').removeClass('badge1').addClass('badge2');
                   }
				   else{
                      navigator.notification.beep();
                   }
                   
                   if (NomeStrat == localStorage.getItem("StoreStrat")){
                      $('#badde2').removeClass('badge1').addClass('badge2');
                   }
                   else{
                      $('#badde2').removeClass('badge2').addClass('badge1');
                   }

                   
                   
                   },
                   error: function(){
                    if (localStorage.getItem("chip") == null || typeof(localStorage.getItem("chip")) == 'undefined') {
                        $('#fiches').html('<img src="images/chipa.png" height="20px"> ' + chip);
                   }
                   else{
                        $('#fiches').html('<img src="images/chipa.png" height="20px"> ' + localStorage.getItem("chip"));
                   }
					
					navigator.notification.alert(
                    'Possibile errore di rete, riprova tra qualche instante.',  // message
                    alertDismissed,         // callback
                    'Notifiche',            // title
                    'OK'                  // buttonName
                    );
                   },
                   dataType:"jsonp"});
            
            $(".spinner").hide();
            
        }
        else{
            
           $(".spinner").hide();

            $('#noconn').show();
			
			if (localStorage.getItem("chip") == null || typeof(localStorage.getItem("chip")) == 'undefined') {
                $('#fiches').html('<img src="images/chipa.png" height="20px"> ' + chip);
            }
            else{
                $('#fiches').html('<img src="images/chipa.png" height="20px"> ' + localStorage.getItem("chip"));
            }
            
            var newdata = "PokerAnswer";
			
            var landmark = '<table align="center" border="0" width="310px" height="100px">';
            landmark = landmark + '<tr><td align="center" width="100px"><img src="logo3.png" width="80px"></td><td align="left" width="180px"><table align="center" border="0" width="180px"><tr><td align="left"><font size="2" color="gold" class="scritta">'+ newdata +'</font></td></tr><tr><td align="left"><font color="white" size="2">Ogni Giorno Ricevi Gratuitamente Search Chips.</font></td></tr></table></td><td><a href="#" rel="external"><img src="images/noconn.png" width="40px"></a></td></tr>';
            landmark = landmark + '</table>';
            $('#classifica').html(landmark);
            
            var tabella = '<table align="center" border="0" width="310px" height="60px" class="conn">';
            tabella = tabella + '<tr><td align="center" width="50px"><img src="images/wire.png" width="32px"></td><td align="left">Per leggere le news e ricevere le notifiche push, hai bisogno di una connessione attiva</td></tr>';
            tabella = tabella + '</table>';

            $('#noconn').html(tabella);

        }
        
        setTimeout(function() {
            navigator.splashscreen.hide();
        }, 2000);
        
    }

};

function checkData() {
    navigator.globalization.dateToString(
    new Date(),
    function (date) { convertTo24Hour(date.value); },
    function () { alert('Error getting dateString\n'); },
    { selector: 'time' }

);

}


function convertTo24Hour(time) {
    
    var hours = parseInt(time.substr(0, 2));
    
    if(time.indexOf('AM') != -1 && hours < 12) {
        time = time.replace(hours, '0' + "" + hours); //time.replace('12', '00');
    }
    
    if(time.indexOf('PM')  != -1 && hours < 12) {
        time = time.replace(hours, (hours + 12));
    }
    
    orario1 = time.replace(/(AM|PM)/, '');

}



function cambiap() {
	 var permessogeo = localStorage.getItem("permessogeo");
	
 	if (permessogeo == "SI")
    {
        window.location.href = "map.html";
    }
    else{
        navigator.notification.confirm(
        'Per usare la funzione Radar e Mappa Poker Answer vuole usare la tua posizione',  // message
         onConfirm,              // callback to invoke with index of button pressed
         'Tua Posizione',            // title
         'Accetto,Rifiuto'          // buttonLabels
        );
    }

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
    $(".spinner").hide();
}

function alertpush() {
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
        localStorage.setItem("permessogeo", "SI")
		window.location.href = "map.html";
    }
}

function apri() {
    
    var ref = window.open('http://www.aams.gov.it/site.php?id=13982', '_blank', 'location=si');
}

function apripanel() {
    $('#transp').removeClass('div2').addClass('div1');
}

function chiudipanel() {
    $('#transp').removeClass('div1').addClass('div2');
}

function checkPos() {
    
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge:600000, timeout:80000, enableHighAccuracy: true });
    
    function onSuccess(position) {

        var ciao = position.coords.latitude;

        var ciao1 = position.coords.longitude;

        localStorage.setItem("lat", ciao);

        localStorage.setItem("lng", ciao1);

        localStorage.setItem("geostory", "SI");
		
		 //alert(ciao + "--" + ciao1 + "One");
    }

    function onError(error) {
        
        localStorage.setItem("geostory", "NO");
    }
    
}

function send() {
    window.plugin.email.open({
    to:      ['info@pokeranswer.it'],
    subject: 'Contatto',
    body:    'Scrivici pure, risponderemo alle tue domande nel piu breve tempo possibile...<br><br>TeamPokerAnswer<br><img src="http://www.pokeranswer.it/img/logo256.png" width="80px">',
    isHtml:  true
});
}

function friend() {
    window.plugin.email.open({
    to:      [''],
    subject: 'Nuova Applicazione sul Poker',
    body:    'Scopri la nuova applicazione PokerAnswer, tante funzioni pensate per tutti giocatori.<br><br><img src="http://www.pokeranswer.it/img/logo256.png" width="80px">',
    isHtml:  true
    });

}

function onResume() {
    app.initialize();
}

function compraFB() {
    window.plugins.socialsharing.shareViaFacebook('PokerAnswer, Il poker nelle tue mani!', 'http://www.pokeranswer.it/img/logo256.png', 'http://www.pokeranswer.it', function() {notifiche('Condivisione Riuscita')}, function(errormsg){notifiche('Nessuna Condivisione')});
    
    //alert('compra chips');
}