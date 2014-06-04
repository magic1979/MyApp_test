document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    
    $('body').on('touchmove', function (e) {
      e.preventDefault();
    });
    
    
    $(".spinner").show();
    var connectionStatus = false;
    connectionStatus = navigator.onLine ? 'online' : 'offline';
    
    if(connectionStatus=='online'){
    
    
    var mialat;
    var mialng;
    var via;
    
    mialat = localStorage.getItem("lat");
	mialng = localStorage.getItem("lng");
    via = localStorage.getItem("Via");
    
    if (!via) {
        via = "Non posso determinare il tuo indirizzo";
    }
        
    var test;
	test = 1
        
        var tabella = '<table align="center" border="0" width="310px" height="60px">';
        tabella = tabella + '<tr><td align="center" width="50px"><img src="images/marketer.png" width="32px"></td><td align="left"><font color="white" size="2">'+ via +'</font></td></tr>';
        tabella = tabella + '</table>';
        
        $('#tabella').html(tabella);
    
    $(".spinner").hide();
    
    $('#mySelect').on('change', function(){
        $(".spinner").show();
        var $this = $(this),
        $value = $this.val();
                      
        //alert($value);
                      
        var distanza;
                      
        var landmark = '<table id="myTable" class="tablesorter"><thead><tr><th><font color="white" size="2">Poker Room</font></th><th><font color="white" size="2"><img src="images/giu.png" width="16px">(Km)</font></th></tr></thead><tbody id="classifica">';
                      
                      $.ajax({
                             type:"GET",
                             url:"http://www.pokeranswer.it/www/Check_Room.asp",
                             contentType: "application/json",
                             //data: {ID: "1", ID2: "4"},
                             data: {ID: $value},
                             jsonp: 'callback',
                             crossDomain: true,
                             success:function(result){
                             
                             $.each(result, function(i,item){
                                    if (item.lat == 0){
                                    distanza = "0";
                                    }
                                    else{
                                        distanza = getDistance(mialat,mialng,item.lat,item.lng).toFixed(1);
                                        test = (parseInt(test)+1)
                                    }
                                    
                                    landmark = landmark + '<tr><td><font size="2"><img src="images/marketer.png" width="16px">'+ item.Room +'</font><br> ('+ item.Indirizzo +')</br></td><td><font size="2">'+ distanza +' <a href="http://maps.google.com/maps?saddr='+ via +'&daddr='+ item.Indirizzo +','+ item.Citta +'"><img src="images/mappa.png" width="16px"></a></font></td></tr>';
                                    
                                    });
                             
                             landmark = landmark + '</tbody></table>';
                             $('#classifica').html(landmark); 
                             $("#myTable").tablesorter( {sortList: [[1,0]]} );
                             
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
                      });
        
    }
    
    else{
        
        navigator.notification.alert(
           'Stato Connessione: ' + connectionStatus,  // message
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

function cambiap() {

    window.location.href = "index.html";

}

function getDistance(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}


