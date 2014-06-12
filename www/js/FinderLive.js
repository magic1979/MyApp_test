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
            
                              
            landmark = '<table id="myTable" class="tablesorter"><thead><tr><th><font color="white" size="2">Nome</font></th><th><font color="white" size="2">Location</font></th><th><font color="white" size="2">Data</font></th></tr></thead><tbody id="classifica">';
            
            $.ajax({
                   type:"GET",
                   url:"http://www.pokeranswer.it/www/Check_Live.asp",
                   contentType: "application/json",
                   //data: {ID: "1", ID2: "4"},
                   //data: {ID: $value},
                   jsonp: 'callback',
                   crossDomain: true,
                   success:function(result){
                   
                   $.each(result, function(i,item){
                          if (item.Nome == 0){
                          Nome = "0";
                          }
                          else{
                            var newdata = dataok(item.DataStart);
                          }
                          
                          landmark = landmark + '<tr><td><font size="2">'+ item.Nome +'</font><br> &euro; '+ item.Buy +', '+ item.Descrizione +'</br></td><td><font size="2"><img src="images/marketer.png" width="16px">'+ item.Luogo +'</font></td><td><font size="2">'+ newdata +'</font></td></tr>';
                          
                          });
                   
                    landmark = landmark + '</tbody></table>';
                    $('#classifica').html(landmark);
                    $("#myTable").tablesorter( {sortList: [[2,0]]} );
                   
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
    
        $('#flip-2').on('change', function(){
                    $(".spinner").show();
                    $('#classifica').html('');
                    
                    var $this = $(this),
                    $value = $this.val();
                    
                    if ($value=="live"){
                    
                    landmark = '<table id="myTable" class="tablesorter"><thead><tr><th><font color="white" size="2">Nome</font></th><th><font color="white" size="2">Location</font></th><th><font color="white" size="2">Data</font></th></tr></thead><tbody id="classifica">';
                    
                    $.ajax({
                           type:"GET",
                           url:"http://www.pokeranswer.it/www/Check_Live.asp",
                           contentType: "application/json",
                           //data: {ID: "1", ID2: "4"},
                           //data: {ID: $value},
                           jsonp: 'callback',
                           crossDomain: true,
                           success:function(result){
                           
                           $.each(result, function(i,item){
                                  if (item.Nome == 0){
                                  Nome = "0";
                                  }
                                  else{
                                  var newdata = dataok(item.DataStart);
                                  }
                                  
                                  landmark = landmark + '<tr><td><font size="2">'+ item.Nome +'</font><br> &euro; '+ item.Buy +', '+ item.Descrizione +'</br></td><td><font size="2"><img src="images/marketer.png" width="16px">'+ item.Luogo +'</font></td><td><font size="2">'+ newdata +'</font></td></tr>';
                                  
                                  });
                           
                           landmark = landmark + '</tbody></table>';
                           $('#classifica').html(landmark);
                           $("#myTable").tablesorter( {sortList: [[2,0]]} );
                           
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
                    
                    landmark = '<table id="myTable" class="tablesorter"><thead><tr><th><font color="white" size="2">Torneo</font></th><th><font color="white" size="2">Room</font></th><th><font color="white" size="2">Ora</font></th></tr></thead><tbody id="classifica">';
                    
                    $.ajax({
                           type:"GET",
                           url:"http://www.pokeranswer.it/www/Check_OnLine.asp",
                           contentType: "application/json",
                           //data: {ID: "1", ID2: "4"},
                           //data: {ID: $value},
                           jsonp: 'callback',
                           crossDomain: true,
                           success:function(result){
                           
                           $.each(result, function(i,item){
                                  if (item.Torneo == 0){
                                    Torneo = "0";
                                    img = "rosso";
                                  }
                                  else{
                                    var newora = oraok(item.Ora);
                                    var img;
                                    if (item.Room=="LTM"){
                                        img = "Verde";
                                    }
                                    else if (item.Room=="PS"){
                                        img = "nero";
                                    }
                                    else if (item.Room=="GD"){
                                        img = "giallo";
                                    }
                                    else if (item.Room=="SIS"){
                                        img = "rosso";
                                    }
                                    else{
                                        img = "rosso";
                                    }
                                  }
                                  
                                  landmark = landmark + '<tr><td><font size="2">'+ item.Torneo +'</font><br> GRT:'+ item.GRT +', Player: '+ item.Player +'</br></td><td><font size="2"><img src="img/OnLine/'+ img +'.png" width="16px"> '+ item.Room +'</font></td><td><font size="2">'+ newora +'</font></td></tr>';
                                  
                                  });
                           
                           landmark = landmark + '</tbody></table>';
                           $('#classifica').html(landmark); 
                           $("#myTable").tablesorter( {sortList: [[2,0]]} );
                           
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
                    
             });

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


