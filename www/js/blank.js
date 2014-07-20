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
            
            $('#classifica').html(tabella);
            
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

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


