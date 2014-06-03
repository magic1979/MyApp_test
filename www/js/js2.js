$(document).ready(function(){
	
	//$(document).bind('deviceready', function(){
		//Phonegap ready
		//onDeviceReady();
	//});
                  
    //$.mobile.loading('show');
    $(".spinner").show();
	var output = $('#output');

     $.ajax({
	 type:"GET",
	 url:"http://www.pokeranswer.it/www/check_home.asp",
	 contentType: "application/json",
     //data: {ID: "1", ID2: "4"},
	 jsonp: 'callback',
     crossDomain: true,
        success:function(result){
                //$('#output').html('Hello ' + result[0].Giocatore + ' ' + result[0].Chip);
						
				$.each(result, function(i,item){ 
				var landmark = '<li><font color="white" size="2"><b>1. '+item.id+'</b><br><img src="images/fiches.png"></br></font></li>';
				
				//'<li><font color="white" size="2"><b>1. '+item.Giocatore+'</b><br>'+item.Chip+' <img src="images/fiches.png"></br></font></li>'

				$('#classifica').append(landmark);
			});
				
				$('#classifica').listview('refresh');
                $(".spinner").hide();
          },
		error: function(){
		   alert('There was an error loading the data.');
		},
		dataType:"jsonp"});
	
});