document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    
    //checkConnection();


}



function checkConnection() {
    var networkState = navigator.connection.type;
    
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    
    alert('Connection type: ' + states[networkState]);
    $('#map').html('Connection type: ' + states[networkState]);
}


function suona(testo) {
    
    var txt = testo;
    if(txt){
        var baseUrl = "http://translate.google.com/translate_tts?ie=utf-8&tl=it&q=";
        var sound = baseUrl+encodeURIComponent(txt);
        
        window.setTimeout(function () {
                          play_sound(sound);
                          }, 1000);
    }
}

function html5_audio(){
    var a = document.createElement('audio');
    return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
}

var play_html5_audio = false;
if(html5_audio()) play_html5_audio = true;

function play_sound(url){
    if(play_html5_audio){
        var snd = new Audio(url);
        snd.load();
        snd.play();
    }else{
        $('body').prepend("<embed src='"+url+"'  style='position:absolute' hidden='true' autostart='true' loop='false' class='playSound'>");
    }
}



