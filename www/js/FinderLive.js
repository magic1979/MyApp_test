document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    if (window.device && parseFloat(window.device.version) >= 7.0) {
        $('body').addClass('iOS7');
    }
    
    var hoverDelay = $.mobile.buttonMarkup.hoverDelay = 0;
    var landmark;
    
        
        $(".spinner").show();
        
        var connectionStatus = false;
        connectionStatus = navigator.onLine ? 'online' : 'offline';
        
        if(connectionStatus=='online'){
                                      
            online();
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

function live(){
	
	
    $('#classifica').html('');$('#online').show();
    $(".spinner").show();
    
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
                  
                  landmark = landmark + '<tr><td><font size="2">'+ item.Nome +'</font><br> Euro '+ item.Buy +', '+ item.Descrizione +'</br></td><td><font size="2"><img src="images/pin.png" width="16px">'+ item.Luogo +'</font></td><td><font size="2">'+ newdata +'</font></td><td><a href="InfoLive.html?nome='+ item.Nome +'" rel="external"><img src="images/destra.png" width="30px"></a></td></tr>';
                  
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
	
    $('#classifica').html('');
    $(".spinner").show();
    
    $('#live').show();
    $('#online').hide();
    $('#filtroTB').show();
    var orario = getorario();
    //alert(orario);
	
    var landmark = '<table id="myTable" class="tablesorter"><thead><tr><th><font color="white" size="2">Torneo</font></th><th><font color="white" size="2">Room</font></th><th><font color="white" size="2">Orario</font></th></tr></thead><tbody id="classifica">';
    
    var filtro = '<table id="filtroTB" width="310px" align="center"><tr><td width="33%"><select id="buin" data-theme="b"><option value="All" selected>Buy-In</option><option value="small">Piccolo</option><option value="medio">Medio</option><option value="Alto">Alto</option></select></td><td width="33%"><select id="grt" data-theme="b"><option value="All" selected>GRT</option><option value="small">50-300</option><option value="Med">500-2000</option><option value="Alto">>2000</option></select></td><td width="33%" align="center"><a href="javascript:cerca()"><img src="images/destra.png" width="40px"></a></td></tr></table>';
    
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
                  img = "";
                  newora = "";
                  Buy= "";
                  img="grey";
                  
                  }
                  else{
                  var sveglia = "sveglia";
                  var noimage;
                  Torneo = item.Torneo;
                  Buy = item.Buy;
                  var newora = oraok(item.Ora);
                  //alert(orario + "," + newora);
                  
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
                  else if (item.Room=="PYT"){
                  img = "rosso";
                  }
                  else{
                  }
                  
                  if (parseInt(item.Ora) < parseInt(orario)){
                    sveglia = "svegliarossa";
                    noimage = '<div id="pulsar"><font size="2"><img src="images/'+ sveglia +'.png" width="10px">'+ newora +'</font></div>';
                  
                    pulse($('#pulsar'), 1000, 'swing', {opacity:0}, {opacity:1}, function() { return false; });
                  
                  }
                  else{
                    noimage = '<font size="2">'+ newora +'</font>';
                  }

                  
                  
                  }
                  
                  landmark = landmark + '<tr><td><font size="2">'+ Torneo +'</font>&nbsp;<font size="1">('+ Buy +'&euro;)</font><br> GRT:'+ item.GRT +', Player: '+ item.Player +'</br></td><td><font size="2"><img src="img/OnLine/'+ img +'.png" width="16px"> '+ item.Room +'</font></td><td>'+ noimage +'</td></tr>';
                  
                  });
           
           landmark = landmark + '</tbody></table>';
           $('#classifica').html(landmark); 
           $("#myTable").tablesorter( {sortList: [[2,0]]} );
           $(".spinner").hide();
           
           pulse($('#pulsar'), 1000, 'swing', {opacity:0}, {opacity:1}, function() { return false; });
           
           },
           error: function(){
           alert('There was an error loading the data.');
           },
           dataType:"jsonp"});
}

function cerca() {
	$('#classifica').html('');
    $(".spinner").show();
    
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
                  else if (item.Room=="PYT"){
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


function pulse(elem, duration, easing, props_to, props_from, until) {
    elem.animate( props_to, duration, easing,
                 function() {
                 if ( until() == false )
                 {
                 pulse(elem, duration, easing, props_from, props_to, until);
                 }
                 });
}



