document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    document.addEventListener("resume", onResume, false);
    
    var hoverDelay = $.mobile.buttonMarkup.hoverDelay = 0;
    var landmark;
    var model = device.model;
    
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
    
    var chip = localStorage.getItem("chip");
    if (chip == null || typeof(chip) == 'undefined') {
        $('#fiches').html('<img src="images/chipa.png" height="20px"> 0');
    }
    else{
        $('#fiches').html('<img src="images/chipa.png" height="20px"> ' + chip);
    }
    
        $(".spinner").show();
        
        var connectionStatus = false;
        connectionStatus = navigator.onLine ? 'online' : 'offline';
        
        if(connectionStatus=='online'){
            $('#noconn').hide();
            var landmark1 = '<table align="center" width="310px">';
            
            //QuaryString
            var tech = getParameterByName('id');
            
            var newdata;
            var informazioni;
            var nome;
            var IMG;
            var pagina;
            var video;
            var link;
            
            if (tech==""){
                tech = "All";
                pagina = "0";
            }
            else{
                pagina = "1";
            }
            
            if (chip < 5) {
                navigator.notification.alert(
                'Hai terminato le Chips, torna domani :)',  // message
                 alertDismissed,         // callback
                'Attenzione',            // title
                'Ok'                  // buttonName
             );
                window.location.href = "index.html";
                return;
            }

            
            $.ajax({
                   type:"GET",
                   url:"http://www.pokeranswer.it/www/Check_strategy.asp",
                   contentType: "application/json",
                   data: {ID: tech, page: pagina},
                   timeout: 7000,
                   jsonp: 'callback',
                   crossDomain: true,
                   success:function(result){
                   
                   $.each(result, function(i,item){
                          newdata = dataok(item.Data) + " - " + oraok(item.Ora);
                          informazioni = item.News;
                          nome = item.Nome;
                          IMG = item.IMG;
                          video = item.Video;
                          link = item.Link;;
                          
                          if (pagina=="0"){
                            if (nome != localStorage.getItem("StoreStrat")){
                                chip = parseInt(chip)-5;
                                localStorage.setItem("chip", chip);
                                $('#fiches').html('<img src="images/chipa.png" height="20px"> ' + chip);
                          
                                localStorage.setItem("StoreStrat", item.Nome);
                            }
                            else{
								chip = parseInt(chip)-1;
								localStorage.setItem("chip", chip);
								$('#fiches').html('<img src="images/chipa.png" height="20px"> ' + chip);
						  
                                localStorage.setItem("StoreStrat", item.Nome);
                            }
                          }
						  else{
							chip = parseInt(chip)-1;
							localStorage.setItem("chip", chip);
							$('#fiches').html('<img src="images/chipa.png" height="20px"> ' + chip);
						  }

						  
                   });
                   
                   if (model.indexOf('iPad') >= 0) {
                        landmark1 = landmark1 + '<tr><td><font color="white" size="2">'+ newdata +'</font></td></tr><tr><td align="center"><img src="http://www.pokeranswer.it/www/img/News/'+ IMG +'.png" data-rel="external" width="600px"></td></tr>';
                   
                        $('#torneo').html('<table width="600px"><tr><td class="note"><h1>' + nome + '</h1><p>'+ informazioni +'</p></td></tr></table><br>');
                   }
                   else{
                        landmark1 = landmark1 + '<tr><td><font color="white" size="2">'+ newdata +'</font></td></tr><tr><td align="center"><img src="http://www.pokeranswer.it/www/img/News/'+ IMG +'.png" data-rel="external" width="300px"></td></tr>';
                   
                        $('#torneo').html('<table width="310px"><tr><td class="note"><h1>' + nome + '</h1><p>'+ informazioni +'</p></td></tr></table><br>');
                   }
                   
                   if (video == 1) {
                        //$('#video').html('<table width="310px" align="center"><tr><td align="center"><a href="javascript:apri('+ link +')"><img src="images/play.png" width="80px"></a></td></tr></table>');
                            $('#video').html('<iframe width="300" height="180" src="http://www.youtube.com/embed/'+ link +'?feature=player_embedded" frameborder="0" allowfullscreen></iframe>');
                   }
				   else if (video == 2){
						$('#video').html('<iframe width="320" height="180" src="http://www.pokertube.com/embed/'+ link +'?feature=player_embedded" frameborder="0" allowfullscreen></iframe>');
                   }
                   else{
                        $('#video').html('');
                   }
                   

                        landmark1 = landmark1 + '</table>';
                        $('#descrizione').html(landmark1);
                   
                        $(".spinner").hide();
                   
                   },
                   error: function(){
                   $(".spinner").hide();
                   
                   navigator.notification.alert(
                   'Possibile errore di rete, riprova tra qualche minuto.',  // message
                    alertDismissed,         // callback
                    'Attenzione',            // title
                    'Done'                  // buttonName
                    );
                   
                   },
                   dataType:"jsonp"});
            
                   $(".spinner").hide();
            
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
    $(".spinner").hide();
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

function verificawifi(){
   $("#verifica").click();
}
                          
function onResume() {
   onDeviceReady();
}

function apri(mess) {
    var ref = window.open(mess, '_blank', 'location=no');
}

function onConfirm(button) {
    $(".spinner").hide();
                          
    if (button==1){
       window.location.href = "Token.html";
    }
    else{
       window.location.href = "index.html";
    }
                          
}