document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    var hoverDelay = $.mobile.buttonMarkup.hoverDelay = 0;
    var landmark;
    
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
        
        $(".spinner").show();
        
        var connectionStatus = false;
        connectionStatus = navigator.onLine ? 'online' : 'offline';
        
        if(connectionStatus=='online'){
            $('#noconn').hide();
            var landmark1 = '<table align="center" width="310px">';
            
            var tech = getParameterByName('nome');

            var newdata;
            var informazioni;
            var IMG;
            
            $.ajax({
                   type:"GET",
                   url:"http://www.pokeranswer.it/www/Check_News.asp",
                   contentType: "application/json",
                   //data: {ID: "1", ID2: "4"},
                   jsonp: 'callback',
                   crossDomain: true,
                   success:function(result){
                   
                   $.each(result, function(i,item){
                          newdata = dataok(item.Data);
                          informazioni = item.News;
                          IMG = item.IMG;
                          localStorage.setItem("StoreNews", item.Nome);
                   });
                   
                        landmark1 = landmark1 + '<tr><td><font color="white" size="2">'+ newdata +'</font></td></tr><tr><td align="center"><img src="http://www.pokeranswer.it/www/img/News/'+ IMG +'.png" data-rel="external" width="300px"></td></tr>';
                   
                   $('#torneo').html('<table width="310px" class="note"><tr><td><h1>' + tech + '</h1><p>'+ informazioni +'</p></td></tr></table>');
                   
                        landmark1 = landmark1 + '</table>';
                        $('#descrizione').html(landmark1);
                   
                        $(".spinner").hide();
                   
                   },
                   error: function(){
                   
                   navigator.notification.alert(
                   'Dati non presenti al momento.',  // message
                    alertDismissed,         // callback
                    'Attenzione',            // title
                    'Done'                  
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
