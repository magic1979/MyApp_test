document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    var numero=(parseInt(localStorage.myname)+12);
    
    $('#classifica').html(numero);
    $('#esempio').html(localStorage.getItem("example"));
}



function agg(){
    //localStorage.myname = "Salvatore";
    var numero=(parseInt(localStorage.myname)+22);
    $('#classifica').html(numero);
    $('#esempio').html(localStorage.getItem("example"));
    
    //localStorage.clear();
}