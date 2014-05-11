$( function() {
    data(1);
});

function data(ID){
		//alert('work');
		
		$.ajax({
		type: "GET",
		url: "Check_Out.asp",
		data: "ID=" + ID,
		cache: false,
		dataType: "html",
		success: function (responseText) {
			var esito = responseText.replace(/^\s+|\s+$/g, "");
			$('#classifica').html(esito);
			$('#classifica').listview('refresh');
		},
		error: function (resposeText) {
			alert(resposeText);
		}
	});
}