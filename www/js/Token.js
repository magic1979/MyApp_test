document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    
    var hoverDelay = $.mobile.buttonMarkup.hoverDelay = 0;
    var landmark;
    var newdata;
    var informazioni;
        
        $(".spinner").show();

    
        document.addEventListener("showkeyboard", function(){ $("[data-role=footer]").hide();}, false);
        document.addEventListener("hidekeyboard", function(){ $("[data-role=footer]").show();}, false);
    
        // Workaround for buggy header/footer fixed position when virtual keyboard is on/off
        $('input, textarea')
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
        
        var connectionStatus = false;
        connectionStatus = navigator.onLine ? 'online' : 'offline';
        
        if(connectionStatus=='online'){
            $('#noconn').hide();
            $('#negozio').show();
            
            //localStorage.setItem("Day", 1);
            //localStorage.setItem("chip", 200);
            //localStorage.setItem("Token", "NO");
            
            //verificastore();
            
            $('#torneo').html('<table align="center" width="310px"><tr><td align="center" width="150px"><img src="images/ticket.png" width="64px"></td><td width="160px"><font color="white" size="2">Con un Token puoi avere, per 30 giorni, molte AnswerChips in +</font><br></td></tr></table>');
            $(".spinner").hide();
            
        }
        else{
            
            $('#noconn').show();
            $('#negozio').hide();
            
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

            $("#bottone").attr("href", "#");
            
            $(".spinner").hide();

        }

    }

function vai() {

    var indirizzo = self.document.formia.email.value;
    var pin = self.document.formia.password.value;
    
    if (indirizzo == "") {
        navigator.notification.alert(
          'email non completa',  // message
           alertDismissed,         // callback
           'Attenzione',            // title
           'OK'                  // buttonName
         );
        return;
    }
    if (pin == "") {
        navigator.notification.alert(
        'password non completa',  // message
         alertDismissed,         // callback
         'Attenzione',            // title
         'OK'                  // buttonName
         );
        return;
    }
    
    EmailAddr = self.document.formia.email.value;
    Filtro = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-]{2,})+\.)+([a-zA-Z0-9]{2,})+$/;
    if (Filtro.test(EmailAddr)) {
        
    }
    else {
        navigator.notification.alert(
        'email non corretta',  // message
         alertDismissed,         // callback
        'Attenzione',            // title
        'OK'                  // buttonName
        );
        return;
    }
    
    var connectionStatus = false;
    connectionStatus = navigator.onLine ? 'online' : 'offline';
    
    if(connectionStatus=='online'){
    
    $(".spinner").show();
    
    $.ajax({
           type:"GET",
           url:"http://www.pokeranswer.it/www/token.asp",
           contentType: "application/json",
           data: {email: indirizzo, token: pin},
           jsonp: 'callback',
           crossDomain: true,
           success:function(result){
           
           $.each(result, function(i,item){
            newdata = item.Day;
            informazioni = item.Token;
                  
            });
           
           if (newdata==0){
           $('#torneo').html('<table align="center" width="310px"><tr><td align="center" width="150px"><img src="images/error.png" width="64px"></td><td width="160px"><font color="white" size="2">Credenziali non corrette</font><br></td></tr></table>');
           
           navigator.notification.alert(
           'Nessun Token associato a questi dati. Consulta le info per sapere come avere un pin valido.',  // message
           alertDismissed,         // callback
           'Attenzione',            // title
           'OK'                  // buttonName
           );
           
           setTimeout(function() {
             $('#torneo').html('<table align="center" width="310px"><tr><td align="center" width="150px"><img src="images/ticket.png" width="64px"></td><td width="160px"><font color="white" size="2">Con un Token puoi avere, per 30 giorni, molte AnswerChips in +</font><br></td></tr></table>');
           }, 9000);

           }
           else{
           localStorage.setItem("Token", "SI");
           localStorage.setItem("Day", 30);
           localStorage.setItem("chip", 500);
           
           $('#torneo').html('<table align="center" width="310px"><tr><td align="center" width="150px"><img src="images/ticketverde128.png" width="64px"></td><td width="160px"><font color="white" size="2">Token accreditato.</font><br></td></tr></table>');
           
           navigator.notification.alert(
           'Il tuo Tocket è valido: ' + newdata + 'giorni.',  // message
            alertDismissed,         // callback
            'Attenzione',            // title
            'OK'                  // buttonName
            );
           
           setTimeout(function() {
              window.location.href = "index.html";
            }, 6000);
           
           }
           
           
           $(".spinner").hide();

           
           },
           error: function(){
           
            navigator.notification.alert(
             'Dati non presenti al momento.',  // message
             alertDismissed,         // callback
             'Attenzione',            // title
             'OK'                  // buttonName
            );
           
            $(".spinner").hide();
           
           },
    dataType:"jsonp"});
        
  }
    else{
        
        $('#noconn').show();
        $('#negozio').hide();
        
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
        
        $("#bottone").attr("href", "#");
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
                          
function getKey(key){
  if ( key == null ) {
     keycode = event.keyCode;

     } else {
     keycode = key.keyCode;
  }

  if (keycode ==13){

      vai();

      return false;
  }

}
                          
function verificastore(){
         window.storekit.init({
                                               
               debug: true, /* Because we like to see logs on the console */
                                               
                purchase: function (transactionId, productId) {

                                               
                if (productId === 'it.pokeranswer.answer.coins1000') {
                              
                   localStorage.setItem("chip", 1000);
                   localStorage.setItem("Day", 360);
                   localStorage.setItem("Token", "NO");
                   $('#torneo').html('<table align="center" width="310px"><tr><td align="center" width="150px"><img src="images/coins.png" width="64px"></td><td width="160px"><font color="white" size="2">1000 AnswerChips Accreditate</font><br></td></tr></table>');

                }

                console.log('purchased: ' + productId);
                },
                                               
                restore: function (transactionId, productId) {
                    console.log('restored: ' + productId);
                },
                                               
                restoreCompleted: function () {
                   console.log('all restore complete');
                },
                                               
                restoreFailed: function (errCode) {
                   console.log('restore failed: ' + errCode);
                },
                                               
                error: function (errno, errtext) {
                    console.log('error failed:');
                    
                    $('#torneo').html('<table align="center" width="310px"><tr><td align="center" width="150px"><img src="images/error.png" width="64px"></td><td width="160px"><font color="white" size="2">Riprova tra qualche instante.</font><br></td></tr></table>');
                              
                    
                },
                                               
                ready: function () {
                      var productIds = "it.pokeranswer.answer.coins1000";
                                               
                       window.storekit.load(productIds, function(validProducts, invalidProductIds) {
                              $.each(validProducts, function (i, val) {
                                    console.log("id: " + val.id + " title: " + val.title + " val: " + val.description + " price: " + val.price);
                              });
                                                                    
                              if(invalidProductIds.length) {
                                    console.log("Invalid Product IDs: " + JSON.stringify(invalidProductIds));
                               }
                       });
                              
                }
      });
}

function store(){
  window.storekit.purchase("it.pokeranswer.answer.coins1000", 1);

  $('#torneo').html('<table align="center" width="310px"><tr><td align="center" width="150px"><img src="images/waiting.png" width="64px"></td><td width="160px"><font color="white" size="2">Waiting...</font><br></td></tr></table>');
}
                          

function verificawifi(){
  $("#verifica").click();
}

