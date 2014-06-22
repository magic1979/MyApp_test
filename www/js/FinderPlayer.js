document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    if (window.device && parseFloat(window.device.version) >= 7.0) {
        $('body').addClass('iOS7');
    }
    
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
            
            $('#informazioni').html('&nbsp;*Tutte le info considerano solo gli ultimi mesi di attivita e sono per valore assoluto, se risulta un solo torneo vincente ma con mesi di perdite, il ROI considerera questo parametro');
            $('#informazioni').show();
            
           	imgaply = '<table broder="2" align="center"><tr><td align="center" width="310px";><img src="img/full3.png" width="100px" border="2" class="circolare"></td></tr></table>'
            $('#imgplayer').html(imgaply);
            $(".spinner").hide();
            
            $('#mySelect').on('change', function(){
                if (self.document.formia.Player.value != "")
                  {
                              if(self.document.formia.Player.value.length<3){
                              alert('Almeno 3 caratteri');
                              $("#mySelect").val("01");
                              $("#mySelect").selectmenu("refresh");
                              return;
                              }
                    else{
                     $('#btn').show();
                    }
                  }
                  else{
                              alert('inserisci un nickname');
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
                                          imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="img/Player/Ghost.png" width="80px"></td></tr></table>'
                                          freccia = 'grey.png';
                                          Roi = '0';
                                          $('#descrizione').html('&nbsp;Nessuna informazione trovata');
                                          $('#descrizione').show();
                                          $('#informazioni').hide();
                                          }
                                          else{
                                          if (parseInt(item.ROI)>0){
                                          freccia = 'green.png';
                                          Roi = parseInt(item.ROI);
                                          //alert(parseInt(item.ROI));
                                          }
                                          else if(parseInt(item.ROI)<0){
                                          freccia = 'red.png';
                                          Roi = parseInt(item.ROI);
                                          //alert(parseInt(item.ROI));
                                          }
                                          else{
                                          imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="img/Player/Ghost.png" width="80px"></td></tr></table>'
                                          freccia = 'grey.png';
                                          Roi = '0';
                                          //alert(Roi);
                                          $('#descrizione').html('&nbsp;Nessuna informazione trovata');
                                          $('#descrizione').show();
                                          $('#informazioni').hide();
                                          }
                                          
                                          imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="img/Player/tiger.png" width="80px"></td></tr></table>'
                                          }
                                          });
                                   
                                   landmark = landmark + '<tr><td><font size="2">'+ self.document.formia.Player.value +'</font></td><td><font size="2">'+ Roi +'</font></td><td><font size="2"><img src="images/'+ freccia +'" height="18"></font></td></tr>';
                                   
                                   landmark = landmark + '</tbody></table>';
                                   
                                   $('#imgplayer').html(imgaply);
                                   
                                   $('#classifica').html(landmark);
                                   $("#myTable").tablesorter( {sortList: [[1,0]]} );
                                   
                                   },
                                   error: function(){
                                   alert('There was an error loading the data.');
                                   },
                                   dataType:"jsonp"});
                            
                            }
                            else
                            {
                            //alert(self.document.formia.mySelect.value);
                            //alert(self.document.formia.Player.value);
                            
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
                                          imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="img/Player/Ghost.png" width="80px"></td></tr></table>'
                                          freccia = 'grey.png';
                                          Roi = 'Nessun Dato';
                                          }
                                          else{
                                          
                                          if (parseInt(item.Roi)>0){
                                          freccia = 'green.png';
                                          Roi = parseInt(item.Roi);
                                          //alert(parseInt(item.Roi));
                                          }
                                          else if(parseInt(item.Roi)<0){
                                          freccia = 'red.png';
                                          Roi = parseInt(item.Roi);
                                          //alert(parseInt(item.Roi));
                                          }
                                          else{
                                          imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="img/Player/Ghost.png" width="80px"></td></tr></table>'
                                          freccia = 'grey.png';
                                          Roi = '0';
                                          //alert(Roi);
                                          }
                                          
                                          imgaply = '<table align="center"><tr><td align="center" width="310px";><img src="img/Player/shark.png" width="80px"></td></tr></table>'
                                          
                                          }	
                                          });
                                   
                                   landmark = landmark + '<tr><td><font size="2">'+ self.document.formia.Player.value +'</font></td><td><font size="2">'+ Roi +'</font></td><td><img src="images/'+ freccia +'" height="18"></td></tr>';
                                   
                                   landmark = landmark + '</tbody></table>';
                                   
                                   $('#imgplayer').html(imgaply);
                                   
                                   $('#classifica').html(landmark); 
                                   $("#myTable").tablesorter( {sortList: [[1,0]]} );
                                   
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


