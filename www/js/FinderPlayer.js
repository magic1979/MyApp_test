document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    
    var hoverDelay = $.mobile.buttonMarkup.hoverDelay = 0;
    var landmark;
    
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
        
        $(".spinner").show();
        $('body').on('touchmove', function (e) {
            e.preventDefault();
        });
        
        var connectionStatus = false;
        connectionStatus = navigator.onLine ? 'online' : 'offline';
        
        if(connectionStatus=='online'){
            
            $('#informazioni').html('&nbsp;*Vengono considerati solo gli ultimi mesi di gioco.');
            $('#informazioni').show();
            $(".spinner").hide();
            
            $('#mySelect').on('change', function(){
                if (self.document.formia.Player.value != "")
                  {
                     if(self.document.formia.Player.value.length<3){
                          navigator.notification.alert(
                          'Devi inserire un nickname corretto',  // message
                            alertDismissed,         // callback
                            'Attenzione',            // title
                            'OK'                  // buttonName
                            );
                            $("#mySelect").val("01");
                            $("#mySelect").selectmenu("refresh");
                            return;
                    }
                    else{
                     //$('#btn').show();
                        $('#imgplayer').fadeOut();
                        $("#btn").click();
                    }
                }
                else{
                    navigator.notification.alert(
                    'Devi inserire un nickname corretto',  // message
                    alertDismissed,         // callback
                    'Attenzione',            // title
                    'OK'                  // buttonName
                    );

                    $("#mySelect").val("01");
                    $("#mySelect").selectmenu("refresh");
                    return;
               }
            });
            
            $("#btn").bind ("click", function (event)
                            {
                            var imgaply;
                            var freccia;
                            var Roi;
                            
                            if (self.document.formia.mySelect.value=="01") {
                                navigator.notification.alert(
                                'Seleziona una Poker Room',  // message
                                alertDismissed,         // callback
                                'Attenzione',            // title
                                'Done'                  // buttonName
                            );
                            return;
                            }
                            
                            $(".spinner").show();
                            
                            if (self.document.formia.mySelect.value=="PokerClub") {
                            
                            var landmark = '<table id="myTable" class="tablesorter"><thead><tr><th><font color="white" size="2">Player</font></th><th><font color="white" size="2">R.O.I.</font></th><th><font color="white" size="2">And.</font></th></tr></thead><tbody id="classifica">';
                            
                            $.ajax({
                                   type:"GET",
                                   url:"http://www.pokeranswer.it/www/Check_Player.asp",
                                   contentType: "application/json",
                                   data: {Player: self.document.formia.Player.value, Room: "pc"},
                                   //data: {ID: $value},
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
                                          imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="./player/Ghost.png" alt="fanfasma" width="70px"></td></tr></table>'
                                          }
                                          else{
                                          if (parseInt(item.ROI)>0){
                                          $('#descrizione').show();
                                          $('#informazioni').hide();
                                          
                                          freccia = 'green.png';
                                          Roi = parseInt(item.ROI);
                                          
                                          if (parseInt(item.ROI)>30){
                                          $('#descrizione').html('Top Player');
                                          imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="./player/shark.png" alt="squalo" width="70px"></td></tr></table>'
                                          }
                                          else{
                                          $('#descrizione').html('Buon Giocatore');
                                          imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="./player/tiger.png" alt="tigre" width="70px"></td></tr></table>'
                                          }
                                          }
                                          else if(parseInt(item.ROI)<0){
                                          $('#descrizione').show();
                                          $('#informazioni').hide();
                                          
                                          freccia = 'red.png';
                                          Roi = parseInt(item.ROI);
                                          
                                          var confronto = 15;
                                          var roitter = (Roi*-1);
                                          
                                          //alert(confronto + "," + roitter);
                                          
                                          if (roitter > confronto){
                                          $('#descrizione').html('Deve studiare molto, Tilt');
                                          imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="./player/fish.png" alt="pesciolino" width="70px"></td></tr></table>'
                                          }
                                          else{
                                          $('#descrizione').html('Potrebbe Migliorare, periodo non favorevole');
                                          imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="./player/donkey.png" alt="asinello" width="70px"></td></tr></table>'
                                          }
                                          }
                                          else{
                                          imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="./player/Ghost.png" alt="fantasma" width="70px"></td></tr></table>'
                                          freccia = 'grey.png';
                                          Roi = '0';
                                          $('#descrizione').html('Nessuna informazione trovata');
                                          $('#descrizione').show();
                                          $('#informazioni').hide();
                                          }
                                          
                                          }
                                          });
                                   
                                   landmark = landmark + '<tr><td><font size="2">'+ self.document.formia.Player.value +'</font></td><td><font size="2">'+ Roi +'</font></td><td><font size="2"><img src="images/'+ freccia +'" height="18"></font></td></tr>';
                                   
                                   landmark = landmark + '</tbody></table>';
                                   
                                   $('#imgplayer').html(imgaply);
                                   $('#imgplayer').show();
                                   
                                   $('#classifica').html(landmark); 
                                   $("#myTable").tablesorter( {sortList: [[1,0]]} );
                                   
                                   $("#mySelect").val("01");
                                   $("#mySelect").selectmenu("refresh");
                                   
                                   $(".spinner").hide();
                                   
                                   },
                                   error: function(){
                                   alert('There was an error loading the data.');
                                   },
                                   dataType:"jsonp"});
                            }
                            else
                            {
                            var landmark = '<table id="myTable" class="tablesorter"><thead><tr><th><font color="white" size="2">Player</font></th><th><font color="white" size="2">R.O.I.</font></th><th><font color="white" size="2">And.</font></th></tr></thead><tbody id="classifica">';
                            
                            $.ajax({
                                   type:"GET",
                                   url:"http://www.pokeranswer.it/www/Player.asp",
                                   contentType: "application/json",
                                   data: {playerName: self.document.formia.Player.value, room: self.document.formia.mySelect.value},
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
                                          
                                          if (parseInt(item.Roi)>0){
                                          $('#descrizione').show();
                                          $('#informazioni').hide();
                                          
                                          freccia = 'green.png';
                                          Roi = parseInt(item.Roi);
                                          
                                          if (parseInt(item.ROI)>30){
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
                                          
                                          //alert(confronto + "," + roitter);
                                          
                                          if (roitter > confronto){
                                          $('#descrizione').html('Deve studiare molto, Tilt');
                                          imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="./player/fish.png" width="70px"></td></tr></table>'
                                          }
                                          else{
                                          //alert(parseInt(item.Roi));
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
                                   
                                   landmark = landmark + '<tr><td><font size="2">'+ self.document.formia.Player.value +'</font></td><td><font size="2">'+ Roi +'</font></td><td><img src="images/'+ freccia +'" height="18"></td></tr>';
                                   
                                   landmark = landmark + '</tbody></table>';
                                   
                                   $('#imgplayer').html(imgaply);
                                   $('#imgplayer').show();
                                   
                                   $('#classifica').html(landmark); 
                                   $("#myTable").tablesorter( {sortList: [[1,0]]} );
                                   
                                   $("#mySelect").val("01");
                                   $("#mySelect").selectmenu("refresh");
                                   
                                   $(".spinner").hide();
                                   
                                   },
                                   error: function(){
                                   alert('There was an error loading the data.');
                                   },
                                   dataType:"jsonp"});
                            }
                            
                            });
            
        }
        else{
            
            navigator.notification.alert(
                'Hai bisogno di una connessione ad internet',  // message
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


