document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    var numero=(parseInt(localStorage.myname)+12);
    
    $('#classifica').html(numero);
    $('#esempio').html(localStorage.getItem("example"));
    
    var connectionStatus = false;
    //setInterval(function () {
        connectionStatus = navigator.onLine ? 'online' : 'offline';
        alert(connectionStatus);
    //}, 100);

}


function agg(){
    $('#classifica').html(numero);
    $('#esempio').html(localStorage.getItem("example"));
}




