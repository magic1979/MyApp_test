document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    document.addEventListener("resume", onResume, false);
	
	//openFB.init({appId: '280486968769228'});
	
	$.mobile.defaultPageTransition = 'none';
	$.mobile.defaultDialogTransition = 'none';
	
	$(document).keydown(function (eventObj){
		getKey(eventObj);
	});
	
	$('body').on('touchmove', function (e) {
		e.preventDefault();
	});
	
	prendiimg();
	$(".spinner").hide();
}

function aprilogin(){
	
	facebookConnectPlugin.login(["email"], function(response) {
		if (response.authResponse) {
			facebookConnectPlugin.api('/me', null,
				function(response) {
					LoginFB(response.email);
				});
								
			}
	});
	
	/*openFB.login(
				 function(response) {
				 if(response.status === 'connected') {
				 getInfo();
				 } else {
				 navigator.notification.alert(
											  'Al momento non puoi collegarti a Facebook',  // message
											  alertDismissed,         // callback
											  'Attenzione',            // title
											  'OK'                  // buttonName
											  );
				 }
				 }, {scope: 'email'});*/
	
}

function getInfo() {
	openFB.api({
			   path: '/me',
			   success: function(data) {
			   console.log(JSON.stringify(data));
			   LoginFB(data.email);
			   //localStorage.setItem("loginfacebook", "SI")
			   //location.reload();
			   
			   },
			   error: errorHandler});
}


function logout(){
	
				  localStorage.setItem("email", "")
				  localStorage.setItem("emailFB", "")
				  localStorage.setItem("loginfacebook", "NO")
				  location.reload();
	
	/*openFB.logout(
				  function() {
				  localStorage.setItem("email", "")
				  localStorage.setItem("emailFB", "")
				  localStorage.setItem("loginfacebook", "NO")
				  location.reload();
				  },
				  errorHandler);*/
}

function errorHandler(error) {
	navigator.notification.alert(
								 'Possibile errore di rete, riprova tra qualche minuto',  // message
								 alertDismissed,         // callback
								 'Attenzione',            // title
								 'Done'                  // buttonName
								 );
}

function LoginFB(email){
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.pokeranswer.it/www/Check_Newsletter.asp",
		   contentType: "application/json",
		   data: {ID:email},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
			   localStorage.setItem("emailFB", email)
			   localStorage.setItem("loginfacebook", "SI")
				  window.location.href = "index.html";
				  });
		   
		   $(".spinner").hide();
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto',  // message
										alertDismissed,         // callback
										'Attenzione',            // title
										'Done'                  // buttonName
										);
		   
		   },
		   dataType:"jsonp"});
}

function Login(){
	$('#spinner').show();
	var email = self.document.formia.email.value;
	
	if (email == "") {
		navigator.notification.alert(
									 'inserire un Email valida',  // message
									 alertDismissed,         // callback
									 'Email',            // title
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
									 'Caratteri email non consentiti',  // message
									 alertDismissed,         // callback
									 'Email',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.pokeranswer.it/www/Check_Newsletter.asp",
		   contentType: "application/json",
		   data: {ID:email},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
			   localStorage.setItem("emailFB", email)
			   localStorage.setItem("loginfacebook", "SI")
				window.location.href = "index.html";
			});
		   
		   $(".spinner").hide();
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto',  // message
										alertDismissed,         // callback
										'Attenzione',            // title
										'Done'                  // buttonName
										);
		   
		   },
		   dataType:"jsonp"});
}

function prendiimg() {
	
	
	var connectionStatus = false;
	connectionStatus = navigator.onLine ? 'online' : 'offline';
	
	$(".spinner").show();
	if(connectionStatus=='online'){
		$('#accFB').html("<a href='javascript:aprilogin();' class='zocial facebook'>Accedi con Facebook</a>");
		$(".spinner").show();
		$.ajax({
			   type:"GET",
			   url:"http://www.pokeranswer.it/www/Check_InfoImg.asp",
			   contentType: "application/json",
			   //data: {ID: tech},
			   timeout: 7000,
			   jsonp: 'callback',
			   crossDomain: true,
			   success:function(result){
			   
			   $.each(result, function(i,item){
					  
					  $('#Start').html("<img src='http://www.pokeranswer.it/img/"+ item.starter +".png' height='65px' data-rel='external' class='bannerreg'>");
					  $(".spinner").hide();
					  });
			   },
			   error: function(){
			   $(".spinner").hide();
			   
			   navigator.notification.alert(
											'Possibile errore di rete, riprova tra qualche minuto',  // message
											alertDismissed,         // callback
											'Attenzione',            // title
											'Done'                  // buttonName
											);
			   
			   },
			   dataType:"jsonp"});
		
		
	}
	else{
		$('#Start').html("<font color='red' size='2'>Controlla la connessione ad internet</font>");
		$('#accFB').html("<font color='red' size='2'>Controlla la connessione ad internet</font> <a href='javascript:verificawifi()'><div width='40px' class='home'></div></a><br>");
		
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
		
		
	}
	
	
}

function getKey(key){
	if ( key == null ) {
		keycode = event.keyCode;
		
	} else {
		keycode = key.keyCode;
	}
	
	if (keycode ==13){
		
		Login()
		return false;
	}
	
}

function verificawifi(){
	$("#verifica").click();
}

function relpul(){
	localStorage.setItem("emailFB", "no@email.it")
	localStorage.setItem("loginfacebook", "SI")
	window.location.href = "index.html";
}

function onResume() {
	onDeviceReady();
}

function alertDismissed() {
	$(".spinner").hide();
}



