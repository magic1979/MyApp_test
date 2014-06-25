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
                                      
            live();
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

function live(){
	
	$('#online').show();
	$('#live').hide();
	$('#filtroTB').hide();
	
	var landmark = '<table id="myTable" class="tablesorter"><thead><tr><th><font color="white" size="2">Nome</font></th><th><font color="white" size="2">Location</font></th><th><font color="white" size="2">Data</font></th><th>Info</th></tr></thead><tbody id="classifica">';
    
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
                  Nome = "Nessun Evento";
                  }
                  else{
                  var newdata = dataok(item.DataStart);
                  }
                  
                  landmark = landmark + '<tr><td><font size="2">'+ item.Nome +'</font><br> Euro '+ item.Buy +', '+ item.Descrizione +'</br></td><td><font size="2"><img src="images/mark.png" width="16px">'+ item.Luogo +'</font></td><td><font size="2">'+ newdata +'</font></td><td><a href="InfoLive.html?nome='+ item.Nome +'" rel="external"><img src="images/destra.png" width="20px"></a></td></tr>';
                  
                  });
           
           landmark = landmark + '</tbody></table>';
           $('#classifica').html(landmark); 
           $("#myTable").tablesorter( {sortList: [[2,0]]} );
           $(".spinner").hide();
           
           },
           error: function(){
		   alert('There was an error loading the data.');
           },
           dataType:"jsonp"});
	
}

function online(){
	
    $('#live').show();
    $('#online').hide();
    $('#filtroTB').show();
	
    var landmark = '<table id="myTable" class="tablesorter"><thead><tr><th><font color="white" size="2">Torneo</font></th><th><font color="white" size="2">Room</font></th><th><font color="white" size="2">Ora</font></th></tr></thead><tbody id="classifica">';
    
    var filtro = '<table id="filtroTB" width="310px" align="center"><tr><td width="33%"><select id="buin" data-theme="b"><option value="All" selected>Buy-In</option><option value="small">Piccolo</option><option value="medio">Medio</option><option value="Alto">Alto</option></select></td><td width="33%"><select id="grt" data-theme="b"><option value="All" selected>GRT</option><option value="small">50-300</option><option value="Med">500-2000</option><option value="Alto">>2000</option></select></td><td width="33%" align="center"><a href="javascript:cerca()"><img src="images/destra.png" width="24px"></a></td></tr></table>';
    
    $('#selezione').html(filtro);
    
    $.ajax({
           type:"GET",
           url:"http://www.pokeranswer.it/www/Check_OnLineV2.asp",
           contentType: "application/json",
           data: {buin: "All", grt: "All"},
           //data: {ID: $value},
           jsonp: 'callback',
           crossDomain: true,
           success:function(result){
           
           $.each(result, function(i,item){
                  if (item.Torneo == 0){
                  Torneo = "Nessun Torneo";
                  
                  }
                  else{
                  var newora = oraok(item.Ora);
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
                  else if (item.Room=="SIS"){
                  img = "rosso";
                  }
                  else{
                  }
                  }
                  
                  landmark = landmark + '<tr><td><font size="2">'+ item.Torneo +'</font>&nbsp;<font size="1">('+ item.Buy +'&euro;)</font><br> GRT:'+ item.GRT +', Player: '+ item.Player +'</br></td><td><font size="2"><img src="img/OnLine/'+ img +'.png" width="16px"> '+ item.Room +'</font></td><td><font size="2">'+ newora +'</font></td></tr>';
                  
                  });
           
           landmark = landmark + '</tbody></table>';
           $('#classifica').html(landmark); 
           $("#myTable").tablesorter( {sortList: [[2,0]]} );
           $(".spinner").hide();
           
           },
           error: function(){
           alert('There was an error loading the data.');
           },
           dataType:"jsonp"});
}

function cerca() {
	$('#classifica').html('');
	var landmark = '<table id="myTable" class="tablesorter"><thead><tr><th><font color="white" size="2">Torneo</font></th><th><font color="white" size="2">Room</font></th><th><font color="white" size="2">Ora</font></th></tr></thead><tbody id="classifica">';
	
	//alert(self.document.formia.buin.value);
	//alert(self.document.formia.grt.value);
    
	$.ajax({
           type:"GET",
           url:"http://www.pokeranswer.it/www/Check_OnLineV2.asp",
           contentType: "application/json",
           data: {buin: self.document.formia.buin.value, grt: self.document.formia.grt.value},
           //data: {ID: $value},
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
                  }
                  else{
                  Torneo = item.Torneo;
                  Buy = item.Buy;
                  var newora = oraok(item.Ora);
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
                  else if (item.Room=="SIS"){
                  img = "rosso";
                  }
                  else{
                  img="grey";
                  }
                  }
                  
                  landmark = landmark + '<tr><td><font size="2">'+ Torneo +'</font>&nbsp;<font size="1">('+ Buy +'&euro;)</font><br> GRT:'+ item.GRT +', Player: '+ item.Player +'</br></td><td><font size="2"><img src="img/OnLine/'+ img +'.png" width="16px"> '+ item.Room +'</font></td><td><font size="2">'+ newora +'</font></td></tr>';
                  
                  });
           
           landmark = landmark + '</tbody></table>';
           $('#classifica').html(landmark); 
           $("#myTable").tablesorter( {sortList: [[2,0]]} );
           $(".spinner").hide();
           
           },
           error: function(){
           alert('There was an error loading the data.');
           },
           dataType:"jsonp"});
}



