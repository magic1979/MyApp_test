$(document).ready(function(){
	
	var data = getdata();
	localStorage.setItem("Data", data)
	//alert(data);
		
	var ora = getora();
		
	//var ora = new Time();
    //alert(data);

    function getdata() {
        var oggi = new Date();

        var G = oggi.getDate();
        var M = (oggi.getMonth() + 1);
		
		//alert(G);
		//alert(M);

        if (G < 10) {
            var gg = "0" + oggi.getDate();
        }
        else {
            var gg = oggi.getDate();
        }

        if (M < 10) {
            var mm = "0" + (oggi.getMonth() + 1);
        }
        else {
            var mm = (oggi.getMonth() + 1);
        }

        var aa = oggi.getFullYear();

        var data = aa + "" + mm + "" + gg;

        return data;
    }
	

    function getora() {
        var oggi = new Date();

        var O = oggi.getHours();
        var M = oggi.getMinutes();
		
		if(M< 10)M="0"+M;
		if(O< 10)O="0"+O;
		
        var ora = O + ":" + M;

        return ora;
    }
	
	
    $('#mySelect').on('change', function(){
        var $this = $(this),
            $value = $this.val();
        
        alert($value);
		var distanza;
		
		var landmark = '<table id="myTable" class="tablesorter"><thead><tr><th><font color="white" size="2">Poker Room</font></th><th><font color="white" size="2">km <img src="img/giu.png" width="16px"></font></th></tr></thead><tbody id="classifica">';
		
     $.ajax({
	 type:"GET",
	 url:"http://pokeranswer.it/www/Check_Regioni.asp",
	 contentType: "application/json",
     //data: {ID: "1", ID2: "4"},
	 //data: {ID: "1"},
	 jsonp: 'callback',
     crossDomain: true,
        success:function(result){
						
				$.each(result, function(i,item){
				distanza = getDistanceFromLatLonInKm();
				landmark = landmark + '<tr><th><font size="2">'+ item.Nome +'</font><br>'+ item.Ind +'</br></th><th><font size="2">'+ distanza +'</font></th></tr>';
				
				//$('#classifica').append(landmark);
			});
			
			landmark = landmark + '</tbody></table>';
			$('#classifica').html(landmark); 
			landmark = "";
			
          },
		error: function(){
		   alert('There was an error loading the data.');
		},
		dataType:"jsonp"});

	
	//landmark = landmark + '<tr><th><font size="2">Liegi</font><br>Via Stamira, 7</br></th><th><font size="2">10</font></th></tr>';
	
	//distanza = getDistanceFromLatLonInKm();
	//landmark = landmark + '<tr><th><font size="2">Cotton</font><br>Via Marziale, 43</br></th><th><font size="2">'+ distanza +'</font></th></tr>';
	

	$("#myTable").tablesorter( {sortList: [[1,0]]} );
		
   });
	
	//$("#myTable").tablesorter(); 
	//$("#myTable").tablesorter( {sortList: [[2,0]]} ); 
   
	
	var points = [40, 100, 1, 5, 25, 10];
	points.sort(function(a, b){return a-b});
	
	//var landmark = '<li><font color="white" size="2"><b>1. '+points+'</b><br><img src="images/fiches.png"></br></font></li>';
	//$('#classifica').append(landmark);
	//$('#classifica').listview('refresh');
	
	var num = 15;
	var n = num.toString();
	
});

function getDistanceFromLatLonInKm() {
    var d = 5.4; // Distance in km
    return d;
}