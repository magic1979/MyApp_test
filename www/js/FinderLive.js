document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    document.addEventListener("resume", onResume, false);
    
    var hoverDelay = $.mobile.buttonMarkup.hoverDelay = 0;
    var landmark;
    
    var chip = localStorage.getItem("chip");
    if (chip == null || typeof(chip) == 'undefined') {
        $('#fiches').html('<img src="images/chipa.png" height="20px"> 0');
    }
    else{
        $('#fiches').html('<img src="images/chipa.png" height="20px"> ' + chip);
    }
    
    var giorni = localStorage.getItem("Day");
    var model = device.model;
    
        $(".spinner").show();
        
        var connectionStatus = false;
        connectionStatus = navigator.onLine ? 'online' : 'offline';
        
        if(connectionStatus=='online'){
            $('#noconn').hide();
            $('#verifica').hide();
            
			$('#social').show();
			$('#live').show();
            $('#online').show();
            $('#selezione').show();
            
            if (model.indexOf('iPad') >= 0) {
                $('#classifica').html('<br><img src="http://www.pokeranswer.it/www/img/live.png" width="600px" data-rel="external" class="banner">');
            }
            else{
                $('#classifica').html('<br><img src="http://www.pokeranswer.it/www/img/live.png" width="300px" data-rel="external" class="banner">');
            }
            
            var filtro = '<table id="filtroTB" width="310px" align="center"><tr><td width="33%"><select id="sala" data-theme="b"><option value="All" selected>Room</option><option value="PS">P.Stars</option><option value="LTM">P.Club</option><option value="PT">I.Poker</option><option value="GD">O.Game</option><option value="PP">M.Game</option></select></td><td width="33%"><select id="grt" data-theme="b"><option value="All" selected>GRT</option><option value="Small">50-300</option><option value="Med">500-2000</option><option value="Alto">>2000</option></select></td><td width="33%" align="center"><a id="search" href="javascript:cerca()"><div width="40px" class="home"></div></a></td></tr></table>';
            
            $('#selezione').html(filtro);
            
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
            
            if (parseInt(chip==0)){
                $("#search").attr("href", "javascript:token();");
                $("#inter").attr("href", "javascript:token();");
                $("#dalvivo").attr("href", "javascript:token();");
            }
            
            $(".spinner").hide();
            
        }
        else{
            $('#live').hide();
            $('#online').hide();
            $('#selezione').hide();
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

function onConfirm(button) {
    $(".spinner").hide();
    
    if (button==1){
        window.location.href = "Token.html";
    }
}

function dataok(deg) {
	var year=deg.slice(0,4);
	var day=deg.substr(6,2);
	var month=deg.substr(4,2);
	
	var d = day + "/" + month //+ "/" + year
	
    return d
}

function oraok(deg) {
	var hh=deg.slice(0,2);
	var min=deg.substr(2,2);
    
	var o = hh + ":" + min
	
    return o
}

function getorario() {
	var oggi = new Date();
    
	var O = oggi.getHours();
	var M = oggi.getMinutes();
	
	if(M< 10)M="0"+M;
	if(O< 10)O="0"+O;
	
	var ora = O + "" + M;
    
	return ora;
}

function answer(){
	var connectionStatus = false;
	connectionStatus = navigator.onLine ? 'online' : 'offline';
	
	if(connectionStatus=='online'){
		
		
		var chip = localStorage.getItem("chip");
		var giorni = localStorage.getItem("Day");
		var newora = "";
		
		
		$('#classifica').html('');
		$('#live').show();
		$('#online').show();
		$(".spinner").show();
		
		$('#social').hide();
		$('#filtroTB').hide();
		
		var landmark = '<table id="myTable" class="tablesorter"><thead><tr><th><font color="white" size="2">Nome</font><img src="images/giu2.png" height="10px"></th><th><font color="white" size="2">Giorno</font></th><th><font color="white" size="2">Ora</font></th><th><font color="white" size="2">Info</font></th></tr></thead><tbody id="classifica">';
		
		$.ajax({
			   type:"GET",
			   url:"http://www.pokeranswer.it/www/Check_Social.asp",
			   contentType: "application/json",
			   //data: {ID: "1", ID2: "4"},
			   timeout: 7000,
			   jsonp: 'callback',
			   crossDomain: true,
			   success:function(result){
			   
			   $.each(result, function(i,item){
					  if (item.Nome == 0){
						Nome = "Nessun Evento";
					  }
					  else{
					  var newdata = dataok(item.DataStart);
					  newora = oraok(item.Ora);
					  
					  }
					  
					if(item.Special==0){
					  landmark = landmark + '<tr><td><font size="2">'+ item.Nome +'</font><br>'+ item.Buy +', '+ item.Descrizione +'</br></td><td><font size="2">'+ item.Giorno +'</font></td><td><font size="2">'+ newora +'</font></td><td>'+ item.Info +'</td></tr>';
					}
					else{
					  var special = dataok(item.Special);
					  landmark = landmark + '<tr><td><font size="2" color="red">'+ item.Nome +'</font><br>'+ item.Buy +', '+ item.Descrizione +'</br></td><td><font size="2" color="red"><img src="logo3.png" width="16px"> '+ special +'</font></td><td><font size="2" color="red">'+ newora +'</font></td><td><font size="2">'+ item.Info +'</font></td></tr>';
					}
					  
					  });
			   
			   landmark = landmark + '</tbody></table>';
			   $('#classifica').html(landmark);
			   $('#bottone').html('<a href="#"> <img src="img/playfacebook.png" width="120px" data-rel="external" class="buttonFB"></a>');
			   
			   $('#fiches').html('<img src="images/chipa.png" height="20px"> ' + chip);
			   
			   //$("#myTable").tablesorter( {sortList: [[2,0]]} );
			   $(".spinner").hide();
			   
			   },
			   error: function(){
			   $(".spinner").hide();
			   
			   navigator.notification.alert(
					'Possibile errore di rete, riprova tra qualche minuto.',  // message
					alertDismissed,         // callback
					'Attenzione',            // title
					'OK'                  // buttonName
				);
			   
			   },
			   dataType:"jsonp"});
	}
	else{
		$('#social').hide();
		$('#live').hide();
		$('#online').hide();
		$('#selezione').hide();
		$('#noconn').show();
		//$('#verifica').show();
		
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


function live(){
    var connectionStatus = false;
    connectionStatus = navigator.onLine ? 'online' : 'offline';
	
    if(connectionStatus=='online'){

		
    var chip = localStorage.getItem("chip");
    var giorni = localStorage.getItem("Day");
		
    if (chip < 1) {
        navigator.notification.confirm(
        'Hai terminato le Chips, torna domani :)',  // message
         onConfirm,         // callback
         'Attenzione',            // title
         'Prendile Ora,Attendo'                  // buttonName
        );
		
        return;
    }

	$('#bottone').html('');
    $('#classifica').html('');
	$('#social').show();
	$('#online').show();
    $(".spinner").show();
		
	$('#live').hide();
	$('#filtroTB').hide();
	
	var landmark = '<table id="myTable" class="tablesorter"><thead><tr><th><font color="white" size="2">Nome</font><img src="images/giu2.png" height="10px"></th><th><font color="white" size="2">Location</font></th><th><font color="white" size="2">Data</font></th><th><font color="white" size="2">Info</font></th></tr></thead><tbody id="classifica">';
    
    $.ajax({
           type:"GET",
           url:"http://www.pokeranswer.it/www/Check_Live.asp",
           contentType: "application/json",
           //data: {ID: "1", ID2: "4"},
           timeout: 7000,
           jsonp: 'callback',
           crossDomain: true,
           success:function(result){
           
           $.each(result, function(i,item){
                  if (item.Nome == 0){
                  Nome = "Nessun Evento";
                  }
                  else{
                  var newdata = dataok(item.DataStart);
                  }
                  
                  landmark = landmark + '<tr><td><font size="2">'+ item.Nome +'</font><br> Euro '+ item.Buy +', '+ item.Descrizione +'</br></td><td><font size="2"><img src="images/pin.png" width="16px">'+ item.Luogo +'</font></td><td><font size="2">'+ newdata +'</font></td><td><a href="InfoLive.html?nome='+ item.Nome +'" rel="external"><div width="40px" class="home"></div></a></td></tr>';
                  
                  });
           
           landmark = landmark + '</tbody></table>';
           $('#classifica').html(landmark);
           
           chip = parseInt(chip)-1;
           localStorage.setItem("chip", chip);
           $('#fiches').html('<img src="images/chipa.png" height="20px"> ' + chip);
           
           if (parseInt(chip==0)){
           $("#inter").attr("href", "javascript:token();");
           $("#dalvivo").attr("href", "javascript:token();");
           }
           
           //$("#myTable").tablesorter( {sortList: [[2,0]]} );
           $(".spinner").hide();
           
           },
           error: function(){
                $(".spinner").hide();
           
                navigator.notification.alert(
                'Possibile errore di rete, riprova tra qualche minuto.',  // message
                alertDismissed,         // callback
                'Attenzione',            // title
                'OK'                  // buttonName
                 );
           
           },
           dataType:"jsonp"});
	}
    else{
		$('#social').hide();
		$('#live').hide();
        $('#online').hide();
        $('#selezione').hide();
        $('#noconn').show();
        //$('#verifica').show();
        
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

function online(){
    
    var connectionStatus = false;
    connectionStatus = navigator.onLine ? 'online' : 'offline';
    
    if(connectionStatus=='online'){
    
    var chip = localStorage.getItem("chip");
    var giorni = localStorage.getItem("Day");
    
    if (chip < 1) {
        navigator.notification.confirm(
        'Hai terminato le Chips, torna domani :)',  // message
         onConfirm,         // callback
        'Attenzione',            // title
        'Prendile Ora,Attendo'                  // buttonName
     );
    
    return;
    }
	
    $('#classifica').html('');
    $(".spinner").show();
    
	$('#bottone').html('');
	$('#social').show();
	$('#live').show();
    $('#online').hide();
    $('#filtroTB').show();
    var orario = getorario();
    var level="";
    var levelimg="";
    var special = "";
	
    var landmark = '<table id="myTable" class="tablesorter"><thead><tr><th><font color="white" size="2">Torneo</font><img src="images/giu2.png" height="10px"></th><th><font color="white" size="2">Room</font><img src="images/giu2.png" height="10px"></th><th><font color="white" size="2">Orario</font><img src="images/giu2.png" height="10px"></th></tr></thead><tbody id="classifica">';
    
		
	var filtro = '<table id="filtroTB" width="310px" align="center"><tr><td width="33%"><select id="sala" data-theme="b"><option value="All" selected>Room</option><option value="PS">P.Stars</option><option value="LTM">P.Club</option><option value="PT">I.Poker</option><option value="GD">O.Game</option><option value="PP">M.Game</option></select></td><td width="33%"><select id="grt" data-theme="b"><option value="All" selected>GRT</option><option value="Small">50-300</option><option value="Med">500-2000</option><option value="Alto">>2000</option></select></td><td width="33%" align="center"><a id="search" href="javascript:cerca()"><div width="40px" class="home"></div></a></td></tr></table>';
    
    $('#selezione').html(filtro);
    
    $.ajax({
           type:"GET",
           url:"http://www.pokeranswer.it/www/Check_OnLineV4.asp",
           contentType: "application/json",
           data: {sala: "All", grt: "All"},
           //data: {ID: $value},
           timeout: 7000,
           jsonp: 'callback',
           crossDomain: true,
           success:function(result){
           
           $.each(result, function(i,item){
                  if (item.Torneo == 0){
                  Torneo = "Nessun Torneo";
                  img = "";
                  newora = "";
                  Buy= "";
                  img="grey";
                  level="";
                  special="";
                  
                  }
                  else{
                  var sveglia = "sveglia";
                  var noimage;
                  Torneo = item.Torneo;
                  Buy = item.Buy;
                  var newora = oraok(item.Ora);
                  level = item.Level;
                  special = item.special;
                  
                  var img;
                  if (item.Room=="LTM"){
                  img = "verde";
                  }
                  else if (item.Room=="PS"){
                  img = "nero";
                  }
                  else if (item.Room=="GD"){
                  img = "giallo";
                  }
                  else if (item.Room=="PT"){
                  img = "rosso";
                  }
                  else if (item.Room=="PP"){
                  img = "blue";
                  }
                  else{
                  }
                  
                  if (parseInt(item.Ora) < parseInt(orario)){

                    sveglia = "svegliarossa";
                  
                    if (newora.slice(0,1) != "0") {
                        noimage = '<div id="pulsar"><font size="2"><img src="./images/'+ sveglia +'.png" width="10px">'+ newora +'</font></div>';
                  
                    }
                    else{
                        if(orario.slice(0,1) == "0"){

                            if((newora.slice(0,1) == "0") && (orario.slice(1,2) < 2)){
                                noimage = '<div id="pulsar"><font size="2"><img src="./images/'+ sveglia +'.png" width="10px">'+ newora +'</font></div>';
                            }
                            else{
                                noimage = '<font size="2">'+ newora +'</font>';
                            }
                        }
                        else{
                            noimage = '<font size="2">'+ newora +'</font>';
                        }
                    }
                  
                    pulse($('#pulsar'), 1000, 'swing', {opacity:0}, {opacity:1}, function() { return false; });
                  
                  }
                  else{
                    if((orario.slice(0,1) == "0") && (orario.slice(1,2) < 2) && (newora.slice(0,2)>21)){
                        sveglia = "svegliarossa";
                        noimage = '<div id="pulsar"><font size="2"><img src="./images/'+ sveglia +'.png" width="10px">'+ newora +'</font></div>';
                    }
                    else{
                        noimage = '<font size="2">'+ newora +'</font>';
                    }
                  }

                  if (level==1){
                  levelimg = '<img src="./images/status_green.png" width="10px">';
                  }
                  else if (level==2){
                  levelimg = '<img src="./images/status_red.png" width="10px">';
                  }
                  else {
                  levelimg = '<img src="./images/status_yellow.png" width="10px">';
                  }
                  
                  }
                  
                  if(special!=0){
                    landmark = landmark + '<tr><td><img src="./images/status_green.png" width="10px"><font color="red" size="2">'+ Torneo +'</font>&nbsp;<font size="1">('+ Buy +'&euro;)</font><br>GRT:<font color="red" size="2">'+ item.GRT +'</font>, DATA:<font color="red" size="2">'+ special +'</font> </br></td><td><img src="./room/'+ img +'.png" width="16px"><font size="2"> '+ item.Room +'</font></td><td><font size="2">21:00</font></td></tr>';
                  }
                  else{
                    landmark = landmark + '<tr><td>'+ levelimg +'<font size="2">'+ Torneo +'</font>&nbsp;<font size="1">('+ Buy +'&euro;)</font><br> GRT:'+ item.GRT +', Player: '+ item.Player +'</br></td><td><font size="2"><img src="./room/'+ img +'.png" width="16px"> '+ item.Room +'</font></td><td>'+ noimage +'</td></tr>';
                  }

                  
                  });
           
           landmark = landmark + '</tbody></table>';
           $('#classifica').html(landmark); 
           $("#myTable").tablesorter();
           
           chip = parseInt(chip)-1;
           localStorage.setItem("chip", chip);
           $('#fiches').html('<img src="images/chipa.png" height="20px"> ' + chip);
           
           if (parseInt(chip==0)){
           $("#search").attr("href", "javascript:token();");
           $("#inter").attr("href", "javascript:token();");
           $("#dalvivo").attr("href", "javascript:token();");
           }
           
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
           
           $(".spinner").hide();
           
           pulse($('#pulsar'), 1000, 'swing', {opacity:0}, {opacity:1}, function() { return false; });
           
           },
           error: function(){
           $(".spinner").hide();
           
           navigator.notification.alert(
           'Possibile errore di rete, riprova fra qualche minuto.',  // message
           alertDismissed,         // callback
           'Attenzione',            // title
            'OK'                  // buttonName
            );
           
           },
           dataType:"jsonp"});
    }
    else{
		$('#social').hide();
		$('#live').hide();
        $('#online').hide();
        $('#selezione').hide();
        $('#noconn').show();
        //$('#verifica').show();
        
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

function cerca() {
    
    var connectionStatus = false;
    connectionStatus = navigator.onLine ? 'online' : 'offline';
    
    if(connectionStatus=='online'){
    
    var chip = localStorage.getItem("chip");
    var giorni = localStorage.getItem("Day");
    
    if (chip < 2) {
        navigator.notification.confirm(
        'Ricerca disponibile con almeno 2 AChips, ritorna domani :)',  // message
         onConfirm,         // callback
         'Attenzione',            // title
         'Prendile Ora,Attendo'                  // buttonName
     );
        
    return;
    }
    
    var orario = getorario();
	$('#classifica').html('');
	$('#bottone').html('');
    var level="";
    var levelimg="";
    var special = "";
        
    $(".spinner").show();
    
	var landmark = '<table id="myTable" class="tablesorter"><thead><tr><th><font color="white" size="2">Torneo</font><img src="images/giu2.png" height="10px"></th><th><font color="white" size="2">Room</font><img src="images/giu2.png" height="10px"></th><th><font color="white" size="2">Orario</font><img src="images/giu2.png" height="10px"></th></tr></thead><tbody id="classifica">';
	
    $('#online').hide();
    
	$.ajax({
           type:"GET",
           url:"http://www.pokeranswer.it/www/Check_OnLineV4.asp",
           contentType: "application/json",
           data: {sala: self.document.formia.sala.value, grt: self.document.formia.grt.value},
           timeout: 7000,
           jsonp: 'callback',
           crossDomain: true,
           success:function(result){
           
           $.each(result, function(i,item){
                  if (item.Torneo == 0){
                  Torneo = "Nessun Torneo";
                  img = "";
                  newora = "";
                  Buy= "";
                  img="grey";
                  level = "";
                  }
                  else{
                  var sveglia = "sveglia";
                  var noimage;
                  Torneo = item.Torneo;
                  Buy = item.Buy;
                  var newora = oraok(item.Ora);
                  level = item.Level;
                  special = item.special;
                  
                  if (item.Room=="LTM"){
                  img = "verde";
                  }
                  else if (item.Room=="PS"){
                  img = "nero";
                  }
                  else if (item.Room=="GD"){
                  img = "giallo";
                  }
                  else if (item.Room=="PT"){
                  img = "rosso";
                  }
                  else if (item.Room=="PP"){
                  img = "blue";
                  }
                  else{
                  img="grey";
                  }
                  
                  if (parseInt(item.Ora) < parseInt(orario)){
                    sveglia = "svegliarossa";
                  
                    if (newora.slice(0,1) != "0") {
                  
                        noimage = '<div id="pulsar"><font size="2"><img src="./images/'+ sveglia +'.png" width="10px">'+ newora +'</font></div>';
                  
                    }
                    else{
                  
                        if(orario.slice(0,1) == "0"){
                            if((newora.slice(0,1) == "0") && (orario.slice(1,2) < 2)){
                                noimage = '<div id="pulsar"><font size="2"><img src="./images/'+ sveglia +'.png" width="10px">'+ newora +'</font></div>';
                            }
                            else{
                                noimage = '<font size="2">'+ newora +'</font>';
                            }
                        }
                        else{
                            noimage = '<font size="2">'+ newora +'</font>';
                        }
                    }
                  
                    pulse($('#pulsar'), 1000, 'swing', {opacity:0}, {opacity:1}, function() { return false; });
                  }
                  else{
                    if((orario.slice(0,1) == "0") && (orario.slice(1,2) < 2) && (newora.slice(0,2)>21)){
                        sveglia = "svegliarossa";
                        noimage = '<div id="pulsar"><font size="2"><img src="./images/'+ sveglia +'.png" width="10px">'+ newora +'</font></div>';
                    }
                    else{
                        noimage = '<font size="2">'+ newora +'</font>';
                    }
                  }
                  
                  if (level==1){
                  levelimg = '<img src="./images/status_green.png" width="10px">';
                  }
                  else if (level==2){
                  levelimg = '<img src="./images/status_red.png" width="10px">';
                  }
                  else {
                  levelimg = '<img src="./images/status_yellow.png" width="10px">';
                  }
                  
                  }
                  
                  if(special!=0){
                  landmark = landmark + '<tr><td><img src="./images/status_green.png" width="10px"><font color="red" size="2">'+ Torneo +'</font>&nbsp;<font size="1">('+ Buy +'&euro;)</font><br>GRT:<font color="red" size="2">'+ item.GRT +'</font>, DATA:<font color="red" size="2">'+ special +'</font> </br></td><td><img src="./room/'+ img +'.png" width="16px"><font size="2"> '+ item.Room +'</font></td><td><font size="2">21:00</font></td></tr>';
                  }
                  else{
                  landmark = landmark + '<tr><td>'+ levelimg +'<font size="2">'+ Torneo +'</font>&nbsp;<font size="1">('+ Buy +'&euro;)</font><br> GRT:'+ item.GRT +', Player: '+ item.Player +'</br></td><td><font size="2"><img src="./room/'+ img +'.png" width="16px"> '+ item.Room +'</font></td><td>'+ noimage +'</td></tr>';
                  }

                  
                  });
           
           landmark = landmark + '</tbody></table>';
           $('#classifica').html(landmark);
           
           $("#myTable").tablesorter();
           
           chip = parseInt(chip)-2;
           localStorage.setItem("chip", chip);
           $('#fiches').html('<img src="images/chipa.png" height="20px"> ' + chip);
           
           if (parseInt(chip==0)){
           $("#search").attr("href", "javascript:token();");
           $("#inter").attr("href", "javascript:token();");
           $("#dalvivo").attr("href", "javascript:token();");
           }
           
           pulse($('#pulsar'), 1000, 'swing', {opacity:0}, {opacity:1}, function() { return false; });
           
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
           
           $(".spinner").hide();
           
           },
           error: function(){
           $(".spinner").hide();
           
           navigator.notification.alert(
           'Possibile errore di rete, riprova fra qualche minuto',  // message
            alertDismissed,         // callback
           'Attenzione',            // title
            'OK'                  // buttonName
            );
           
           },
           dataType:"jsonp"});
    }
    else{
		$('#social').hide();
		$('#live').hide();
        $('#online').hide();
        $('#selezione').hide();
        $('#noconn').show();
        //$('#verifica').show();
        
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


function pulse(elem, duration, easing, props_to, props_from, until) {
    elem.animate( props_to, duration, easing,
                 function() {
                 if ( until() == false )
                 {
                 pulse(elem, duration, easing, props_from, props_to, until);
                 }
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

function onResume() {
    onDeviceReady();
}

function apriplay() {
	
	var ref = window.open('http://www.pokeranswer.it/login_game.html', '_system', 'location=no');
}
