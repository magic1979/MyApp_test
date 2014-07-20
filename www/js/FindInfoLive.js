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
            
            $('#noconn').hide();
            var tech = getParameterByName('nome');
            var informazioni;
            
            $.ajax({
                   type:"GET",
                   url:"http://www.pokeranswer.it/www/Check_InfoLive.asp",
                   contentType: "application/json",
                   data: {ID: tech},
                   //data: {ID: $value},
                   jsonp: 'callback',
                   crossDomain: true,
                   success:function(result){
                   
                   $.each(result, function(i,item){
                          if (item.Nome == 0){
                          Informazioni = "Nessuna Informazione";
                          }
                          else{
                          informazioni = item.Luogo + ', Casino: ' + item.Casino + '<br><br><br> <b>DATE: </b>' + dataok(item.DataStart) + ' - ' + dataok(item.DataFine) + '<br><br><b> MAIN EVENT(buy-in): </b>' + item.Buy + ' &euro;<br><br><b>DESCRIZIONE: </b>' + item.Descrizione +'<br><br><b>SATELLITI: </b>' + item.Sat;
                          }
                          
                          });
                   
                   $('#torneo').html('<h1>' + tech + '</h1><p>' + informazioni + '</p>');
                   
                   },
                   error: function(){
                   
                    navigator.notification.alert(
                     'Dati non presenti al momento, riprova tra qualche instante',  // message
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
                          
function verificawifi(){
    $("#verifica").click();
}


