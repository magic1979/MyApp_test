document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    
    var hoverDelay = $.mobile.buttonMarkup.hoverDelay = 0;
    var landmark;
    
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
        
        $(".spinner").show();
        
        var connectionStatus = false;
        connectionStatus = navigator.onLine ? 'online' : 'offline';
    
        // Workaround for buggy header/footer fixed position when virtual keyboard is on/off
        $('input, select')
        .on('focus', function (e) {
        $('header, footer').css('position', 'absolute');
        })
        .on('blur', function (e) {
        $('header, footer').css('position', 'fixed');
        //force page redraw to fix incorrectly positioned fixed elements
        setTimeout( function() {
        window.scrollTo( $.mobile.window.scrollLeft(), $.mobile.window.scrollTop() );
        }, 20 );
        });
    
        $(document).keydown(function (eventObj){
            getKey(eventObj);
        });
    
        var chip = localStorage.getItem("chip");
        if (chip == null || typeof(chip) == 'undefined') {
            $('#fiches').html('<img src="images/chipa.png" height="20px"> 0');
        }
        else{
            $('#fiches').html('<img src="images/chipa.png" height="20px"> ' + chip);
        }
    
        $('#fiches').show();
        var giorni = localStorage.getItem("Day");
    
        if(connectionStatus=='online'){
            
            $('#descrizione').html('♠&nbsp;Vengono considerati solo gli ultimi mesi di gioco.');
            $('#descrizione').show();
            
            $('#informazioni').html('♥&nbsp;I dati sono da considerarsi puramente indicativi. Ogni ricerca costa 5Ac');
            $('#informazioni').show();
            
            imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="./player/rooster.png" width="70px"></td></tr></table>'
            $('#imgplayer').html(imgaply);
            $('#imgplayer').fadeIn();
            
            $('#noconn').hide();
            $(".spinner").hide();
            
            
            $('#mySelect').on('change', function(){
                if (self.document.formia.Player.value != "")
                {
                     if(self.document.formia.Player.value.length<3){
                        $("#mySelect").val("01");
                        $("#mySelect").selectmenu("refresh");
                              
                          navigator.notification.alert(
                          'Devi inserire un nickname corretto',  // message
                            alertDismissed,         // callback
                            'Attenzione',            // title
                            'OK'                  // buttonName
                            );

                            return;
                    }
                    else{
                     //$('#btn').show();
                        $('#imgplayer').fadeOut();
                        $("#btn").click();
                    }
                }
                else{
                    $("#mySelect").val("01");
                    $("#mySelect").selectmenu("refresh");
                              
                    navigator.notification.alert(
                    'Devi inserire un nickname corretto',  // message
                    alertDismissed,         // callback
                    'Attenzione',            // title
                    'OK'                  // buttonName
                    );

                    return;
               }
            });
            
            $("#btn").bind ("click", function (event)
                            {
                            var imgaply;
                            var freccia;
                            var Roi;
                            
                            if (self.document.formia.mySelect.value=="01") {
                                $("#mySelect").val("01");
                                $("#mySelect").selectmenu("refresh");
                            
                                navigator.notification.alert(
                                'Seleziona una Poker Room',  // message
                                alertDismissed,         // callback
                                'Attenzione',            // title
                                'OK'                  // buttonName
                                );
                            return;
                            }
                            
                            if (chip < 5) {
                                $("#mySelect").val("01");
                                $("#mySelect").selectmenu("refresh");
                            
                                 navigator.notification.alert(
                                 'Hai terminato le Chips, torna domani :)',  // message
                                 alertDismissed,         // callback
                                 'Attenzione',            // title
                                 'OK'                  // buttonName
                                 );
                            
                                $('#classifica').hide();
                                $('#descrizione').hide();
                                $('#imgplayer').hide();
                            return;
                            }
                            
                            $('#informazioni').hide();
                            $('#classifica').show();
                            
                            $(".spinner").show();
                            
                            if (self.document.formia.mySelect.value=="PokerClub") {
                            
                            
                            $.ajax({
                                   type:"GET",
                                   url:"http://www.pokeranswer.it/www/Check_Player.asp",
                                   contentType: "application/json",
                                   data: {Player: self.document.formia.Player.value, Room: "pc"},
                                   timeout: 7000,
                                   jsonp: 'callback',
                                   crossDomain: true,
                                   success:function(result){
                                   
                                   $.each(result, function(i,item){
                                          
                                          if(!item.ROI){
                                            freccia = 'grey.png';
                                            Roi = '0';
                                            $('#descrizione').html('Nessuna informazione trovata');
                                            $('#descrizione').show();
                                            $('#informazioni').hide();
                                            imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="./player/Ghost.png" width="70px"></td></tr></table>'
                                          }
                                          else{
                                          
                                          grafico(item.ROI,item.evticket,item.Twins);
                                          
                                          if (parseInt(item.ROI)>0){
                                                $('#descrizione').show();
                                                $('#informazioni').hide();
                                          
                                                freccia = 'green.png';
                                                Roi = parseInt(item.ROI);
                                          
                                          
                                                if (Roi>30){
                                                    $('#descrizione').html('Top Player');
                                                    imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="./player/shark.png" width="70px"></td></tr></table>'
                                                }
                                                else{
                                                    $('#descrizione').html('Buon Giocatore');
                                                    imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="./player/tiger.png" width="70px"></td></tr></table>'
                                                }
                                          }
                                          else if(parseInt(item.ROI)<0){
                                            $('#descrizione').show();
                                            $('#informazioni').hide();
                                          
                                            freccia = 'red.png';
                                            Roi = parseInt(item.ROI);
                                          
                                            var confronto = 15;
                                            var roitter = (Roi*-1);
                                          
                                            if (roitter > confronto){
                                                $('#descrizione').html('Tilt, Deve studiare molto :)');
                                                imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="./player/fish.png" width="70px"></td></tr></table>'
                                            }
                                            else{
                                                $('#descrizione').html('Potrebbe Migliorare, periodo non favorevole');
                                                imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="./player/donkey.png" width="70px"></td></tr></table>'
                                            }
                                          }
                                          else{
                                            imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="./player/Ghost.png" width="70px"></td></tr></table>'
                                            freccia = 'grey.png';
                                            Roi = '0';
                                            $('#descrizione').html('Nessuna informazione trovata');
                                            $('#descrizione').show();
                                            $('#informazioni').hide();
                                          }
                                          
                                       }
                                   });
                                   
                                   
                                   chip = parseInt(chip)-5;
                                   localStorage.setItem("chip", chip);
                                   $('#fiches').html('<img src="images/chipa.png" height="20px"> ' + chip);
                                   
                                   if (parseInt(chip==0)){
                                     $('#mySelect').hide();
                                     token();
                                   }
                                   
                                   $('#imgplayer').html(imgaply);
                                   $('#imgplayer').fadeIn();
                                   
                                   $("#mySelect").val("01");
                                   $("#mySelect").selectmenu("refresh");
                                   
                                   $(".spinner").hide();
                                   
                                   },
                                   error: function(){
                                        $(".spinner").hide();
                                   
                                        navigator.notification.alert(
                                        'Possibile errore di rete, riprova tra qualche minuto',  // message
                                         alertDismissed,         // callback
                                        'Attenzione',            // title
                                        'OK'                  // buttonName
                                         );
                                   
                                   },
                                   dataType:"jsonp"});
                            }
                            else
                            {
                            
                            $.ajax({
                                   type:"GET",
                                   url:"http://www.pokeranswer.it/www/Player.asp",
                                   contentType: "application/json",
                                   data: {playerName: self.document.formia.Player.value, room: self.document.formia.mySelect.value},
                                   timeout: 7000,
                                   jsonp: 'callback',
                                   crossDomain: true,
                                   success:function(result){
                                   
                                   $.each(result, function(i,item){
                                          
                                          if(!item.Roi){
                                            $('#descrizione').html('Nessuna informazione trovata');
                                            $('#descrizione').show();
                                            $('#informazioni').hide();
                                          
                                            freccia = 'grey.png';
                                            Roi = 'Nessun Dato';
                                            $("#avatar").attr("src", "img/player/Ghost.png");
                                          
                                            imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="./player/Ghost.png" width="70px"></td></tr></table>'
                                          }
                                          else{
                                          
                                            grafico(item.Roi,item.AvStake,item.Twins);
                                          
                                          if (parseInt(item.Roi)>0){
                                                $('#descrizione').show();
                                                $('#informazioni').hide();
                                          
                                                freccia = 'green.png';
                                                Roi = parseInt(item.Roi);
                                          
                                          
                                            if (Roi>30){
                                                $('#descrizione').html('Top Player');
                                                imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="./player/shark.png" width="70px"></td></tr></table>'
                                            }
                                            else{
                                                $('#descrizione').html('Buon Giocatore');
                                                imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="./player/tiger.png" width="70px"></td></tr></table>'
                                            }
                                          }
                                          else if(parseInt(item.Roi)<0){
                                            $('#descrizione').show();
                                            $('#informazioni').hide();
                                          
                                            freccia = 'red.png';
                                            Roi = parseInt(item.Roi);
                                          
                                            var confronto = 15;
                                            var roitter = (Roi*-1);
                                          
                                            if (roitter > confronto){
                                                $('#descrizione').html('Deve studiare molto, Tilt');
                                                imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="./player/fish.png" width="70px"></td></tr></table>'
                                            }
                                            else{
                                                $('#descrizione').html('Potrebbe Migliorare, periodo non favorevole');
                                                imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="./player/donkey.png" width="70px"></td></tr></table>'
                                            }
                                          }
                                          else{
                                            imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="./player/Ghost.png" width="70px"></td></tr></table>'
                                            freccia = 'grey.png';
                                            Roi = '0';
                                            $('#descrizione').html('Nessuna informazione trovata');
                                            $('#descrizione').show();
                                            $('#informazioni').hide();
                                          }
                                          
                                       }
                                    });
                                   
                                   chip = parseInt(chip)-5;
                                   localStorage.setItem("chip", chip);
                                   $('#fiches').html('<img src="images/chipa.png" height="20px"> ' + chip);
                                   
                                   $('#imgplayer').html(imgaply);
                                   $('#imgplayer').fadeIn();
                                   
                                   $("#mySelect").val("01");
                                   $("#mySelect").selectmenu("refresh");
                                   
                                   if (parseInt(chip==0)){
                                     $('#mySelect').hide();
                                     token();
                                   }
                                   
                                   $(".spinner").hide();
                                   
                                   },
                                   error: function(){
                                   $(".spinner").hide();
                                   
                                   navigator.notification.alert(
                                   'Possibile errore di rete, riprova tra qualche minuto',  // message
                                    alertDismissed,         // callback
                                    'Attenzione',            // title
                                    'OK'                  // buttonName
                                    );
                                   
                                   },
                                   dataType:"jsonp"});
                            }
                            
             });
            
        }
        else{
            $('#noconn').show();
            
            var tabella = '<table align="center" border="0" width="310px" height="60px" class="conn">';
            tabella = tabella + '<tr><td align="center" width="50px"><img src="images/wire.png" width="32px"></td><td align="left"><font color="white" size="2">Nessuna connessione attiva</font></td><td><a href="javascript:verificawifi()"><div width="40px" class="home"></div></a></td></tr>';
            tabella = tabella + '</table>';
            
            $('#noconn').html(tabella);
            
            $("#verifica").bind ("click", function (event)
                                 {
                                 var connectionStatus = false;
                                 connectionStatus = navigator.onLine ? 'online' : 'offline';
                                 
                                 if(connectionStatus=='online'){
                                 onDeviceReady();
                                 }
                                 else{
                                   $(".spinner").hide();
                                   navigator.notification.alert(
                                   'Nessuna connessione ad internet rilevata',  // message
                                   alertDismissed,         // callback
                                   'Attenzione',            // title
                                   'OK'                  // buttonName
                                                              );
                                 }
                                 
                                 
                                 });

            
            $(".spinner").hide();

        }

    }


function alertDismissed() {
    $("#mySelect").val("01");
    $("#mySelect").selectmenu("refresh");
}

function dataok(deg) {
	var year=deg.slice(0,4);
	var day=deg.substr(6,2);
	var month=deg.substr(4,2);
	
	var d = day + "/" + month + "/" + year
	
    return d
}

function oraok(deg) {
	var hh=deg.slice(0,2);
	var min=deg.substr(2,2);
    
	var o = hh + ":" + min
	
    return o
}

function getParameterByName(name) {
    
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
                          
function getKey(key){
         if ( key == null ) {
             keycode = event.keyCode;

         } else {
             keycode = key.keyCode;
         }

         if (keycode ==13){

            $("#btn").click();
            $("#mySelect").val("01");
            $("#mySelect").selectmenu("refresh");
            $('#imgplayer').fadeOut();
         return false;
         }

}
                          
                          
         function grafico(roi,avstacke,Twins){
                          
                          var roi = parseFloat(roi);
                          var avstake = parseFloat(avstacke);
                          var vittorie = parseFloat(Twins);
                          
                          var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
                          
                          var lineChartData = lineChartData = {
                          labels : ["Tornei Vinti (" + Twins + ")","R.O.I ("+ roi +"%)","Avg.BuyIn (" + avstacke + ")"],
                          datasets : [
                                      {
                                      label: "My First dataset",
                                      fillColor : "rgba(220,220,220,0.2)",
                                      strokeColor : "rgba(220,220,220,1)",
                                      pointColor : "rgba(220,220,220,1)",
                                      pointStrokeColor : "#fff",
                                      pointHighlightFill : "#fff",
                                      pointHighlightStroke : "rgba(220,220,220,1)",
                                      data : [vittorie,roi,avstake]
                                      },
                                      //{
                                      //label: "My Second dataset",
                                      //fillColor : "rgba(151,187,205,0.2)",
                                      //strokeColor : "rgba(151,187,205,1)",
                                      //pointColor : "rgba(151,187,205,1)",
                                      //pointStrokeColor : "#fff",
                                      //pointHighlightFill : "#fff",
                                      //pointHighlightStroke : "rgba(151,187,205,1)",
                                      //data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
                                      //}
                                      ]
                          
                          }
                          
                          var ctx = document.getElementById("canvas").getContext("2d");
                          window.myLine = new Chart(ctx).Line(lineChartData, {
                          responsive: true
                });
           }
                          
function token(){
   navigator.notification.alert(
   'buttone disattivato',  // message
    alertDismissed,         // callback
    'Attenzione',            // title
    'OK'                  // buttonName
    );
}
                          
function verificawifi(){
    $("#verifica").click();
}

