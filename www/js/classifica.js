document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    
    var hoverDelay = $.mobile.buttonMarkup.hoverDelay = 0;
    var landmark;
    
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
	
        
        var connectionStatus = false;
        connectionStatus = navigator.onLine ? 'online' : 'offline';
        
        if(connectionStatus=='online'){
            
            var informazioni;
            var model = device.model;
            $('#noconn').hide();
			$(".spinner").hide();
			
			$('#immagine').html('<img src="http://www.pokeranswer.it/img/any_device.png" width="300px" data-rel="external" class="banner">');
			$('#torneo').html('<font color="white" size="2"><h2>Gioca Gratis su Facebook</h2>Accedi su </font><font color="gold" size="2">https://apps.facebook.com/pokeranswer </font><font color="white" size="2">e scopri i nostri tornei settimanali e a sorpresa dove ti potrai misurare con gli altri pokeristi del gruppo.<br><br>Puoi giocare su pokeranswer solo su Facebook e per sport, infatti i nostri tornei e sit sono gratuiti per permetterti di migliorare il tuo gioco e cercare di scalare le classifiche per ricevere</font> <font color="gold" size="2">AnswerChips. </font>');

			
			$('#mySelect').on('change', function(){
				var $this = $(this),
				$value = $this.val();
							  
				    connectionStatus = navigator.onLine ? 'online' : 'offline';
							  
					if(connectionStatus!='online'){
						return;
					}
							  
					$('#immagine').html('');
					$('#torneo').html('');
					$(".spinner").show();
							  
					if($value=="tot"){
						classtot();
					}
					else if($value=="mese"){
						classmese();
					}
					else if($value=="week"){
						classweek();
					}
					else{
						alert("niente");
						$(".spinner").hide();
					}
							  
			});

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
						  
function friend() {
	window.plugin.email.open({
	to:      [''],
	subject: 'Gioca anche tu Gratis',
	body:    'Scopri la nuova applicazione PokerAnswer, tante funzioni pensate per tutti i giocatori.<br><br>Puoi giocare solo su Facebook, in modo gratuito, ci sono tanti regali ed inviti per eventi live per i migliori delle classifiche e per i partecipanti ai nostri tornei settimanali.<br><br><img src="http://www.pokeranswer.it/img/logo256.png" width="80px">',
	isHtml:  true
	});
}

						  
function classmia() {

}
						  
						  
function classweek() {
		$('#immagine').html('<img src="http://www.pokeranswer.it/img/classweek.png" width="300px" data-rel="external" class="banner">');
						  
		landmark = '<table id="myTable" class="tablesorter"><thead><tr><th><font color="white" size="2">Nome</font></th><th><font color="white" size="2">Punti</font></th></tr></thead><tbody id="classifica">';
						  
			$.ajax({
				   type:"GET",
					url:"https://csplb1.cubeia.com/operator-api/rest/operator/leaderboard/top_winnings_xcc_weekly?apiKey=4a12ddd2-2d04-44ad-bb01-34719608835d",
					contentType: "application/json; charset=utf-8",
					json: 'callback',
					crossDomain: true,
					success:function(result){
								 
								 $.each(result.entries, function(i,item){
										landmark = landmark + '<tr><td><font size="2">'+ item.screenName +'</font></td><td><font size="2">&nbsp;'+ Number(item.value).toFixed(2); +'</font></td></tr>';
										});
								 
								 landmark = landmark + '</tbody></table>';
								 $('#torneo').html(landmark);
								 $("#myTable").tablesorter();
								 
								 $(".spinner").hide();
								 
								 },
								 error: function(){
								 $(".spinner").hide();
								 $('#torneo').html('<font color="white" size="2">Nessuna classifica presente</font>');
								 
								 navigator.notification.alert(
															  'Possibile errore di rete, riprova tra qualche minuto',  // message
															  alertDismissed,         // callback
															  'Attenzione',            // title
															  'Done'                  // buttonName
															  );
								 
								 },
								 dataType:"json"});


}
						  
function classmese() {
		$('#immagine').html('<img src="http://www.pokeranswer.it/img/classmese.png" width="300px" data-rel="external" class="banner">');
						  
		landmark = '<table id="myTable" class="tablesorter"><thead><tr><th><font color="white" size="2">Nome</font></th><th><font color="white" size="2">Punti</font></th></tr></thead><tbody id="classifica">';
						  
		$.ajax({
			type:"GET",
			url:"https://csplb1.cubeia.com/operator-api/rest/operator/leaderboard/top_winnings_xcc_monthly?apiKey=4a12ddd2-2d04-44ad-bb01-34719608835d",
			contentType: "application/json; charset=utf-8",
			json: 'callback',
			crossDomain: true,
			success:function(result){
								 
				$.each(result.entries, function(i,item){
					   landmark = landmark + '<tr><td><font size="2">'+ item.screenName +'</font></td><td><font size="2">&nbsp;'+ Number(item.value).toFixed(2); +'</font></td></tr>';
				});
								 
								 landmark = landmark + '</tbody></table>';
								 $('#torneo').html(landmark);
								 $("#myTable").tablesorter();
								 
								 $(".spinner").hide();
								 
								 },
								 error: function(){
								 $(".spinner").hide();
								 $('#torneo').html('<font color="white" size="2">Nessuna classifica presente</font>');
								 
								 navigator.notification.alert(
															  'Possibile errore di rete, riprova tra qualche minuto',  // message
															  alertDismissed,         // callback
															  'Attenzione',            // title
															  'Done'                  // buttonName
									 );
								 
								 },
		dataType:"json"});

}
						  
function classtot() {
	$('#immagine').html('<img src="http://www.pokeranswer.it/img/classtot.png" width="300px" data-rel="external" class="banner">');
						  
	landmark = '<table id="myTable" class="tablesorter"><thead><tr><th><font color="white" size="2">Nome</font></th><th><font color="white" size="2">Punti</font></th></tr></thead><tbody id="classifica">';
						  
	$.ajax({
			type:"GET",
			url:"https://csplb1.cubeia.com/operator-api/rest/operator/leaderboard/top_winnings_xcc_yearly?apiKey=4a12ddd2-2d04-44ad-bb01-34719608835d",
			contentType: "application/json; charset=utf-8",
			json: 'callback',
			crossDomain: true,
			success:function(result){
								 
			$.each(result.entries, function(i,item){
				landmark = landmark + '<tr><td><font size="2">'+ item.screenName +'</font></td><td><font size="2">&nbsp;'+ Number(item.value).toFixed(2); +'</font></td></tr>';
			});
								 
			landmark = landmark + '</tbody></table>';
			$('#torneo').html(landmark);
			$("#myTable").tablesorter();
								 
			$(".spinner").hide();
								 
			},
			error: function(){
				$(".spinner").hide();
				$('#torneo').html('<font color="white" size="2">Nessuna classifica presente</font>');
								 
				 navigator.notification.alert(
						'Possibile errore di rete, riprova tra qualche minuto',  // message
						alertDismissed,         // callback
						'Attenzione',            // title
						'Done'                  // buttonName
				);
								 
			},
	dataType:"json"});
}
