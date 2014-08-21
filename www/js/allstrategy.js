document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    document.addEventListener("resume", onResume, false);
    
    var hoverDelay = $.mobile.buttonMarkup.hoverDelay = 0;
    var landmark;
    
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
        
        $(".spinner").show();
    
        //$('body').on('touchmove', function (e) {
            //e.preventDefault();
        //});
        
        var connectionStatus = false;
        connectionStatus = navigator.onLine ? 'online' : 'offline';
        
        if(connectionStatus=='online'){
            $('#noconn').hide();
            $('#classifica').html('');
            $('#classifica').listview('refresh');
            
            
            //QuaryString
            var tech = getParameterByName('nome');
            //alert(tech);
            var newdata;
            var informazioni;
            var nome;
            var IMG;
            var ID;
            
            $.ajax({
                   type:"GET",
                   url:"http://www.pokeranswer.it/www/Check_strategy.asp",
                   contentType: "application/json",
                   data: {ID: "All", page: "2"},
                   timeout: 7000,
                   jsonp: 'callback',
                   crossDomain: true,
                   success:function(result){
                   
                   $.each(result, function(i,item){
                          newdata = dataok(item.Data);
                          informazioni = item.News;
                          nome = item.Nome;
                          IMG = item.IMG;
                          ID = item.ID;
                          
                          var landmark = '<li><a href="Strategy.html?id='+ ID +'" rel="external"><font color="white" size="2"><b>'+ ID +'. '+ nome +'</b></font><br><font color="white" size="1">'+newdata+'</br></font></a></li>';
                          
                          $('#classifica').append(landmark);
                          
                          });

                   $('#classifica').listview('refresh');
                   
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
            tabella = tabella + '<tr><td align="center" width="50px"><img src="images/wire.png" width="32px"></td><td align="left"><font color="white" size="2">Nessuna connessione attiva</font></td><td></td></tr>';
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
