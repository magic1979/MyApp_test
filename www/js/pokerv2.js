    
    //17.03.2014

    function punta_asso_Pre(id_giocatore,puntata) {
        $("#suafoto").effect("highlight",{}, 500);
        //show('counter_2');
        //Time();
        window.setTimeout(function () {
            pcgbar_tempo(0);
        }, 1000);

        var b1 = parseInt(puntata);
        var b2;
        var miostack = parseInt(self.document.formia.miostack.value);
        var suostack = parseInt(self.document.formia.suostack.value);
        var somma1 = parseInt(self.document.formia.somma.value);
        var somma2 = parseInt(self.document.formia.somma2.value);
        var somma3 = parseInt(self.document.formia.somma3.value);
        var id_player = id_giocatore;
        var allin;
        var raise;
        var importo = suostack - puntata;
        document.getElementById("stack").value = miostack - puntata;
        document.getElementById("stackPC").value = suostack - 10;

    if (suostack>miostack){
        if((parseInt(miostack-puntata))<0){

        $( "#slider" ).slider("option","value",0);
		$( "#slider" ).slider("option","max",0);
		$( "#b" ).val(0);

       }
       else{
		 $( "#slider" ).slider("option","max",miostack);
       }
    }
    else if (suostack<miostack){
        if((parseInt(suostack-puntata))<0){
       $( "#slider" ).slider("option","max",0);
       }
       else{
       $( "#slider" ).slider("option","max",suostack-puntata);
       }
    }
    else{
       $( "#slider" ).slider("option","max",suostack-puntata);
    }

        if (puntata >= miostack) {
            b2 = puntata;
            b1 = miostack;
            allin = 1;
        }
        else if (puntata >= suostack) {
            b2=suostack ;
            allin = 1;
        }
        else {
            b2 = puntata;
        }

        //raise = controllapunto(); Punto totale
        raise = parseInt(self.document.formia.contapuntoPre.value);

        var piatto;


        if (allin == 1) {
            
            window.setTimeout(function () {
               document.getElementById("stackPC").value = suostack - b2;
               document.getElementById("stack").value = miostack - b2;
               suostack = suostack - b2;
               miostack = miostack - b2;

               hide('counter_2');
               $('#counter_2').empty();

               $('#betting').fadeIn('slow');
               $('#betting').html('<font class="bettin">ALL-IN: $'+b2+'</font>');

                document.getElementById("punteggio").value = 'pot: $';
                $('#punteggio').fadeIn('slow');

                hide('somma2');
                hide('somma3');
                piatto = b2*2;
                document.getElementById("somma").value = piatto;

               $(".card2").trigger('click');
               stop_opponent();
               suona2();
               muovichipAsso();

                alert(miostack);
                alert(suostack);
                alert(piatto);

                window.setTimeout("fineM_A(0," + id_player + "," + piatto + ", " + miostack + ", " + suostack + ")", 8000);

             }, 2000);

             window.setTimeout("All_In_P();", 3000);
        }

        else {
            window.setTimeout(function () {
            $('#counter_2').empty();
            hide('counter_2');

            $('#betting').fadeIn('slow');

            if ((raise==1) || (raise==2))
            {
              alert('Raise')
              b2 = parseInt(b2)*2.5;
              alert(b2);

              if ((suostack<=b2)||(suostack<80)){
                $( "#slider" ).slider("option","max",0);
                $('#betting').html('<font class="bettin">ALL IN: $' + suostack + '</font>');
                b2 = suostack;
                allin=1;
              }
              else if (miostack<=b2){
                $( "#slider" ).slider("option","max",0);
                $('#betting').html('<font class="bettin">Raise: $' + miostack + '</font>');
                b2 = miostack;
                allin=1;
              }
              else{
                    if (miostack>suostack){
                        $( "#slider" ).slider("option","max",suostack);

                        if(miostack<b2*2){
                            $( "#slider" ).slider("option","value",miostack);
                            $( "#slider" ).slider("option","min",miostack);
		                    $( "#b" ).val(miostack);
                        }
                        else if(suostack<b2*2){
                            $( "#slider" ).slider("option","value",suostack);
                            $( "#slider" ).slider("option","min",((b2*2)-somma3));
		                    $( "#b" ).val(((b2*2)-somma3));
                        }
                        else{
                            $( "#slider" ).slider("option","value",suostack);
                            $( "#slider" ).slider("option","min",(b2*2)-somma3);
		                    $( "#b" ).val(20);
                        }
                    }
                    else if(miostack<suostack){
                        
                        if(miostack>b2*2){
                            $( "#slider" ).slider("option","max",miostack-somma3);
                            $( "#slider" ).slider("option","min",((b2*2)-somma3));
		                    $( "#b" ).val(((b2*2)-somma3));
                        }
                        else{
                            $( "#slider" ).slider("option","max",miostack-somma3);
                            $( "#slider" ).slider("option","min",miostack-somma3);
		                    $( "#b" ).val(miostack-somma3);
                        }
                    }
                    else{
                        $( "#slider" ).slider("option","max",miostack-somma3);
                        $( "#slider" ).slider("option","min",(b2*2)-somma3);
                        $( "#b" ).val((b2*2)-somma3);
                    }

                    $('#betting').html('<font class="bettin">RAISE: $' + b2 + '</font>');

               }
            }
            else if (raise==3)
            {
                alert('fold')
                $('#betting').html('<font class="bettin">FOLD</font>');
                stop_opponent();
                foldAsso(id_player);
                //return;
            }
            else
            {
              alert('Call')
              $('#betting').html('<font class="bettin">CALL: $'+b2+'</font>');

              if (miostack>suostack){
                    $( "#slider" ).slider("option","max",suostack);
                    if(suostack<b2*2){
                        $( "#slider" ).slider("option","value",suostack);
                        $( "#slider" ).slider("option","min",suostack);
		                $( "#b" ).val(suostack);
                    }
               }
               else if(miostack<suostack){
                    $( "#slider" ).slider("option","max",miostack-somma3);
                    if(miostack<b2*2){
                        $( "#slider" ).slider("option","max",miostack-somma3);
                        $( "#slider" ).slider("option","min",miostack-somma3);
		                $( "#b" ).val(miostack-somma3);
                    }
                    else{
                        $( "#slider" ).slider("option","max",miostack-somma3);
                        $( "#slider" ).slider("option","min",20);
                    }
               }
               else{
                  $( "#slider" ).slider("option","max",miostack-somma3);
                  $( "#slider" ).slider("option","min",20);
               }
            }

            window.setTimeout("$('#betting').fadeOut('slow')", 1000);

            if (raise==3){
            document.getElementById("stackPC").value = suostack - 10;  
            }
            else{
            document.getElementById("stackPC").value = suostack - b2;  
            }
            
             setTimeout(function () {
                 $('#somma').fadeIn('slow');
                 document.getElementById("somma").value = puntata + b2;
             
                 document.getElementById("somma2").value = b2 ;
                 document.getElementById("punteggio").value = 'pot: $';
                 $('#punteggio').fadeIn('slow');
                 var piatto = puntata + b2;
                 suostack = suostack - b2;

                 stop_opponent();
              }, 1000);

            $("#miafoto").effect("highlight",{}, 1000);
            setTimeout(function () {
                if (raise==0){
                    $('#punta').fadeIn('slow');
                    $('#fold').fadeIn('slow');
                    $('#check0').fadeIn('slow');
                    pcgbar_tempo2(0);
                }
                else if(allin==1){
                    $('#fold').fadeIn('slow');
                    $('#call').fadeIn('slow');
                    pcgbar_tempo2(0);
                }
                else if(raise==3){

                }
                else{
                    $('#raise').fadeIn('slow');
                    //$('#punta').fadeIn('slow');
                    $('#fold').fadeIn('slow');
                    $('#call').fadeIn('slow');
                    pcgbar_tempo2(0);
                }

                 show('counter_2');
            }, 2500);

             }, 5000);

            window.setTimeout("suona2();", 4000);

            return;
        }

        // x criptare = miostack = btoa(miostack);
        // x decriptare = miostack = atob(miostack);

        //window.setTimeout("check()", 5000);
    }

    function foldAsso(id_player) {
            giroimg ();
            mescola2();

            var b1 = parseInt(self.document.formia.b.value);

            var miostack = parseInt(self.document.formia.miostack.value);
            var suostack = parseInt(self.document.formia.suostack.value);
            var somma2 = parseInt(self.document.formia.somma2.value);
            var somma3 = parseInt(self.document.formia.somma3.value);
            var piatto = somma2+somma3;

            $( "#slider" ).slider("option","value",20);
		    $( "#b" ).val(20);

            document.getElementById("stack").value = miostack + piatto ;
            miostack = miostack + piatto ;

            //scrivi(miostack, id_player);
            aggpunti(miostack,suostack);

            pulisci();
            refreshing();
            document.getElementById("somma").value = "";
        
            window.setTimeout("NuovaMano()", 2000);
            hide('holecard');
            hide('holecard2');
            hide('actionbet');
            document.getElementById("punteggio").value = '';
            stop_opponent();

            //return;
    }

    function call(id_player) {
        var b1 = parseInt(self.document.formia.somma2.value);
        var piatto = parseInt(self.document.formia.somma.value);
        var somma2 = parseInt(self.document.formia.somma2.value);
        var somma3 = parseInt(self.document.formia.somma3.value);
        var miostack = parseInt(self.document.formia.miostack.value);
        var suostack = parseInt(self.document.formia.suostack.value);
        var puntata = somma2+suostack;
        var allin = 0;

        if (somma2 >= (miostack+somma3)) {
            document.getElementById("stack").value = 0;
            document.getElementById("somma3").value = miostack+somma3;
            somma3 = miostack+somma3;
            document.getElementById("somma").value = somma3+somma2;
            document.getElementById("stackPC").value = suostack + (somma2-somma3) ;
            piatto = somma3*2;
            suostack = suostack + (somma2-somma3) ;
            miostack = 0;

            alert('allin');
            allin = 1;
        }
        else if (suostack==0) {
            document.getElementById("stack").value = miostack - (somma2-somma3);
            miostack = miostack - (somma2-somma3);

            document.getElementById("somma3").value = somma2;
            document.getElementById("somma").value = piatto+(somma2-somma3);
            piatto = piatto+(somma2-somma3);

            alert('allin');
            allin = 1;
        }
        else {
            document.getElementById("stack").value = miostack - (somma2-somma3);
            miostack = miostack - (somma2-somma3);

            document.getElementById("somma3").value = somma2;
            document.getElementById("somma").value = piatto+(somma2-somma3);
            piatto = piatto+(somma2-somma3);

            b2 = puntata;
        }

        //scrivi(miostack, id_player);
        aggpunti(miostack,suostack);


        if (allin==1){

           $(".card2").trigger('click');
           suona2();
           stop_opponent2();

           window.setTimeout("All_In_P();", 3000);

            //$('#actionbet3').animate({ left: 0, top: '-=25' }, 1000);
            //$('#actionbet').animate({ left: -200, top: '+=40' }, 1000);

            window.setTimeout("fineM_A(0," + id_player + "," + piatto + ", " + miostack + ", " + suostack + ")", 8000);

        }
        else{
            if (miostack>suostack){
                //$( "#slider" ).slider("option","max",suostack);
                //if(suostack<b2*2){
                    //$( "#slider" ).slider("option","value",suostack);
                    //$( "#slider" ).slider("option","min",suostack);
		            //$( "#b" ).val(suostack);
                //}
                $( "#slider" ).slider("option","max",suostack);
                $( "#slider" ).slider("option","min",20);
                $( "#slider" ).slider("option","value",20);
                $( "#b" ).val(20);
            }
            else if(miostack<suostack){
                //$( "#slider" ).slider("option","max",miostack-somma3);
                //if(miostack<b2*2){
                   // $( "#slider" ).slider("option","value",miostack-somma3);
                   // $( "#slider" ).slider("option","min",miostack-somma3);
		           // $( "#b" ).val(miostack-somma3);
               // }
                $( "#slider" ).slider("option","max",miostack);
                $( "#slider" ).slider("option","min",20);
                $( "#slider" ).slider("option","value",20);
                $( "#b" ).val(20);
            }
            else{
                $( "#slider" ).slider("option","max",miostack);
                $( "#slider" ).slider("option","min",20);
                $( "#slider" ).slider("option","value",20);
                $( "#b" ).val(20);
            }

        window.setTimeout(function () {
            suona2();
            stop_opponent2();

            $('#actionbet').fadeIn('slow');
            $('#betting').fadeOut('slow');
            moveObject('flop1');

            hide('call');
            hide('punta');
            hide('raise');
            hide('fold');

            $('#punta2').fadeIn('slow');
            $('#fold2').fadeIn('slow');
            $('#check').fadeIn('slow');

        }, 500);

         window.setTimeout(function () {
            pcgbar_tempo2(0);
        }, 1000);
    }

}

    function controllapunto() {

       alert(parseInt(self.document.formia.contapunto.value));
       
       if(parseInt(self.document.formia.contapunto.value)<310)
       {
           return 1;
       }
       else
       {
           return 0;
       }
       //return parseInt(self.document.formia.contapunto.value);
}
    
    function punta(id_giocatore) {
         hide('counter_2');
         hide('call');
         $('#betting').fadeIn('slow');
         $('#counter_2').empty();

        var miostack = parseInt(self.document.formia.miostack.value);
        var suostack = parseInt(self.document.formia.suostack.value);
        var somma1 = parseInt(self.document.formia.somma.value);
        var somma2 = parseInt(self.document.formia.somma2.value);
        var somma3 = parseInt(self.document.formia.somma3.value);
        var new_somma2 = parseInt(self.document.formia.somma3.value);
        var b1 = parseInt(self.document.formia.b.value);
        var id_player = id_giocatore;
        var allin;
        miostack = miostack + somma3;
        suostack = suostack + somma2;

        if ((b1+somma3) >= miostack) {
            b2 = miostack;
            allin = 1;
        }
        else if (b1 >= suostack) {
            b2=suostack ;
            allin = 1;
        }
        else {
            b2 = b1;
        }

        if (allin == 1) {
            suona2();
            muovichip();
            document.getElementById("stack").value = miostack-b2;
            document.getElementById("somma").value = b2+somma2;
            document.getElementById("somma3").value = b2;

            window.setTimeout("$('#betting').fadeOut('slow')", 1500);

            $('#betting').html('<font class="bettin">ALL-IN: $' + b2 + '</font>');

            stop_opponent2();
            window.setTimeout("puntaAsso("+id_player+","+b1+");", 3000);

        }
        else {
          document.getElementById("stack").value = (miostack-somma3)-b1;
          document.getElementById("somma").value = b1+somma1;
          var bet = b1 + new_somma2;
          document.getElementById("somma3").value = bet;

            $('#betting').html('<font class="bettin">BET: $'+ bet +'</font>');
            window.setTimeout("$('#betting').fadeOut('slow')", 1500);

            window.setTimeout(function () {
                suona2();
                muovichip();
                stop_opponent2();
             }, 500);
             
            window.setTimeout("puntaAsso("+id_player+","+b1+");", 3000);

            return;
        }

        // x criptare = miostack = btoa(miostack);
        // x decriptare = miostack = atob(miostack);

    }

    function puntaAsso(id_giocatore,puntata) {
        $("#suafoto").effect("highlight",{}, 1000);
        hide('betting');
        show('counter_2');

        //Time();
        window.setTimeout(function () {
            pcgbar_tempo(0);
        }, 500);

        var b2;
        var miostack = parseInt(self.document.formia.miostack.value);
        var suostack = parseInt(self.document.formia.suostack.value);
        var somma1 = parseInt(self.document.formia.somma.value);
        var somma2 = parseInt(self.document.formia.somma2.value);
        var somma3 = parseInt(self.document.formia.somma3.value);
        var b1 = parseInt(somma3);
        var puntata = b1;
        var id_player = id_giocatore;
        var allin;

        suostack = suostack + somma2;

        //alert(puntata + ',' + miostack + ',' + suostack + ',' + somma2 + ',' + somma3);
 
        if(miostack==0){
            alert(miostack);
            b2 = puntata;
            b1 = miostack;
            allin = 1;
        }
        
        if ((puntata >= miostack)&&(miostack<20)) {
            b2 = puntata;
            b1 = miostack;
            allin = 1;
        }
        else if (puntata >= suostack) {
            b2=suostack ;
            allin = 1;
        }
        else {
            b2 = b1;
            $( "#slider" ).slider("option","min",20);
            $( "#slider" ).slider("option","value",20);
            $( "#b" ).val(20);
            //alert('b2c:' + b2);
        }

        var piatto = b2 + (somma3-somma2)+somma2;
        //suostack = suostack - b2;

        raise = controllapunto();

        if (allin == 1) {
            
            window.setTimeout(function () {
               document.getElementById("stackPC").value = suostack;
               document.getElementById("somma2").value = b2 ;
               hide('counter_2');
               $('#counter_2').empty();

               $('#betting').fadeIn('slow');
               $('#betting').html('<font class="bettin">CALL: $'+b2+'</font>');

                document.getElementById("punteggio").value = 'pot: $';
                $('#punteggio').fadeIn('slow');

                hide('somma2');
                hide('somma3');
                document.getElementById("somma").value = piatto;

               $(".card2").trigger('click');
               suona2();
               muovichipAsso();
               stop_opponent();
             }, 2000);

            window.setTimeout("All_In_P();", 3000);

            alert(miostack + ',' + suostack + ',' + piatto);
            window.setTimeout("fineM_A(0," + id_player + "," + piatto + ", " + miostack + ", " + suostack + ")", 8000);
        }

        else {
            window.setTimeout(function () {
            document.getElementById("somma2").value = b2 ;
            $('#counter_2').empty();
            hide('counter_2');

            if (raise==1)
            {
              b2 = parseInt(b2)*2.5;
              alert('Raise:' + b2);

              if ((suostack<=b2)||(suostack-b2<=100))
              {
                $( "#slider" ).slider("option","max",0);
                $('#betting').fadeIn('slow');
                $('#betting').html('<font class="bettin">ALL IN: $' + (suostack) + '</font>');
                b2 = suostack;
                allin=1;

                document.getElementById("somma").value = somma3+b2;
                document.getElementById("somma2").value = suostack;
                document.getElementById("stackPC").value = 0;
                stop_opponent();

                $('#fold').fadeIn('slow');
                $('#call').fadeIn('slow');
                pcgbar_tempo2(0);

              }
              else
              {
                $('#betting').fadeIn('slow');
                $('#betting').html('<font class="bettin">Raise: $' + b2 + '</font>');
                
                document.getElementById("somma").value = b2+somma3;
                document.getElementById("somma2").value = b2;
                document.getElementById("stackPC").value = suostack-b2;

                stop_opponent();

                $('#raise').fadeIn('slow');
                //$('#punta').fadeIn('slow');
                $('#fold').fadeIn('slow');
                $('#call').fadeIn('slow');
                pcgbar_tempo2(0);

                 if (suostack>miostack){
                     if((parseInt(miostack-b2))<=0){
                        $( "#slider" ).slider("option","max",miostack);
                     }
                     else{
                        if(miostack>((b2*2)-somma3)){
                           $( "#slider" ).slider("option","max",miostack);
                           $( "#slider" ).slider("option","min",((b2*2)-somma3));
                           $( "#b" ).val(miostack);
                        }
                        else{
                            $( "#slider" ).slider("option","max",miostack);
                            $( "#slider" ).slider("option","min",miostack);
                            $( "#b" ).val(miostack);
                        }
                     }
                 }
                 else if (suostack<miostack){
                     if((parseInt(suostack-b2))<0){
                        $( "#slider" ).slider("option","max",suostack);
                     }
                     else{
                        if(suostack>((b2*2)-somma3)){
                           $( "#slider" ).slider("option","max",suostack);
                           $( "#slider" ).slider("option","min",((b2*2)-somma3));
                           $( "#b" ).val(suostack);
                        }
                        else{
                            $( "#slider" ).slider("option","max",suostack);
                            $( "#slider" ).slider("option","min",suostack);
                            $( "#b" ).val(suostack);
                        }
                     }
                 }
                 else{
                     if((parseInt(miostack-b2))<0){
                        $( "#slider" ).slider("option","max",miostack);
                     }
                     else{
                        if(miostack>((b2*2)-somma3)){
                           $( "#slider" ).slider("option","max",miostack);
                           $( "#slider" ).slider("option","min",((b2*2)-somma3));
                           $( "#b" ).val(miostack);
                        }
                        else{
                            $( "#slider" ).slider("option","max",miostack);
                            $( "#slider" ).slider("option","min",miostack);
                            $( "#b" ).val(miostack);
                        }
                     }
                 }

              }

            }
            else if (raise==3)
            {
              alert('fold')
              $('#betting').fadeIn('slow');
              $('#betting').html('<font class="bettin">FOLD</font>');
              stop_opponent();
              foldAsso(id_player);
            }
            else
            {
              alert('call')
              $('#betting').fadeIn('slow');
              $('#betting').html('<font class="bettin">CALL: $'+b2+'</font>');

               stop_opponent();
               hide('somma2');
               hide('somma3');
               document.getElementById("somma").value = piatto;

               document.getElementById("stackPC").value = suostack;

               pcgbar_tempo2(0);

               if (suostack>miostack){
                    if((parseInt(miostack-b2))<0){
                        $( "#slider" ).slider("option","max",miostack);
                        $( "#slider" ).slider("option","min",20);
                        $( "#b" ).val(20);
                    }
                    else{
                        $( "#slider" ).slider("option","max",miostack);
                        $( "#slider" ).slider("option","min",20);
                        $( "#b" ).val(20);
                    }
                }
                else if (suostack<miostack){
                    if((parseInt(suostack-b2))<0){
                        $( "#slider" ).slider("option","max",suostack);
                        $( "#slider" ).slider("option","min",20);
                        $( "#b" ).val(20);
                    }
                    else{
                        $( "#slider" ).slider("option","max",suostack);
                        $( "#slider" ).slider("option","min",20);
                        $( "#b" ).val(20);
                    }
                }
                else{
                    if((parseInt(miostack-b2))<0){
                        $( "#slider" ).slider("option","max",miostack);
                        $( "#slider" ).slider("option","min",20);
                        $( "#b" ).val(20);
                    }
                    else{
                        $( "#slider" ).slider("option","max",miostack);
                        $( "#slider" ).slider("option","min",20);
                        $( "#b" ).val(20);
                    }
                }
            }

        }, 3000);

        if (raise==0){
            window.setTimeout("suona2();", 3000);
            window.setTimeout("muovichipAsso();", 3000);
            window.setTimeout("moveObject('flop1')", 4500);
            setTimeout(function () {
            }, 2500);
         }

            return;
        }

        // x criptare = miostack = btoa(miostack);
        // x decriptare = miostack = atob(miostack);

        //window.setTimeout("check()", 5000);
    }

    function check0() {
      busso();
      stop_opponent2();

      $('#counter_2').empty();
      hide('counter_2');
      hide('punta');
      hide('raise');
      hide('check0');
      hide('fold'); 
      $('#betting').fadeIn('slow');
      $('#betting').html('<font class="bettin">CHECK</font>');

       setTimeout(function () {
            $('#flop1').fadeIn('slow');
            suona2();
            muovichipAsso();
            moveObject('flop1');
            pcgbar_tempo2(0);
        }, 1000);

         //show('counter_2');
    }

    function check() {
      $('#counter_2').empty();
      hide('counter_2');
      busso();
      stop_opponent2();
      hide('punta2');
      hide('check');
      hide('fold2');
      $('#betting').fadeIn('slow');
      $('#betting').html('<font class="bettin">CHECK</font>');

       setTimeout(function () {
            checkAssoFlop();
            //$('#turn').fadeIn('slow');
        }, 4000);

        window.setTimeout(function () {
            pcgbar_tempo(0);
            $('#betting').fadeOut('slow');
        }, 1000);

    }

    function checkAssoFlop() {
      busso();
      stop_opponent();
      $('#betting').fadeIn('slow');
      $('#betting').html('<font class="bettin">CHECK</font>');

       setTimeout(function () {
           $('#turn').fadeIn('slow');
           show('punta3');
           show('check2');
           show('fold2');
        }, 500);

         window.setTimeout(function () {
            pcgbar_tempo2(0);
            $('#betting').fadeOut('slow');
        }, 1000);

    }

    function check2() {
        $('#counter_2').empty();
        stop_opponent2();
        hide('punta3');
        hide('check2');
        hide('fold2');
        $('#betting').fadeIn('slow');
        $('#betting').html('<font class="bettin">CHECK</font>');

        hide('counter_2');
        busso();

       setTimeout(function () {
            checkAssoTurn();
            //$('#turn').fadeIn('slow');
        }, 4000);

        window.setTimeout(function () {
            pcgbar_tempo(0);
            $('#betting').fadeOut('slow');
        }, 1000);

         $(function () {
            $('#counter_2').empty();
            timer = setTimeout(esegui2, 10000);
            $('#counter_2').countdown({
                image: 'img/digits2A.png',
                startTime: '10',
                //startTime: '01:12:12:00'
                digitWidth: 13,
                digitHeight: 18,
                //timerEnd: function(){ alert('end!'); },
                format: 'mm:ss'
            });
        });

        function esegui2() {
            //alert('ciao');
        }
    }

    function checkAssoTurn() {
      busso();
      stop_opponent();
      $('#betting').fadeIn('slow');
      $('#betting').html('<font class="bettin">CHECK</font>');

       setTimeout(function () {
          $('#river').fadeIn('slow');
           show('punta4');
           show('fold2');
        }, 500);

         window.setTimeout(function () {
            pcgbar_tempo2(0);
            $('#betting').fadeOut('slow');
        }, 1000);

    }

    function punta2(id_giocatore) {
         //busso();
         hide('counter_2');
         $('#betting').fadeIn('slow');
         $('#counter_2').empty();

        var b1 = parseInt(self.document.formia.b.value);
        var miostack = parseInt(self.document.formia.miostack.value);
        var suostack = parseInt(self.document.formia.suostack.value);
        var somma1 = parseInt(self.document.formia.somma.value);
        var id_player = id_giocatore;
        var allin;

        $('#betting').html('<font class="bettin">BET: $'+b1+'</font>');
        window.setTimeout("$('#betting').fadeOut('slow')", 1500);

        if ((b1 == "") || (b1 == "0")) {
            alert("puntata mancante");
            return;
        }
        if (b1 >= miostack) {
            b1 = miostack;
            //alert('all in');
            allin = 1;
        }
        if (b1 >= suostack) {
            //alert('all in');
            allin = 1;
        }

        //document.getElementById("somma").value = (b1 * 2) + somma1;
        //document.getElementById("stackPC").value = suostack - b1;
        document.getElementById("somma3").value = b1 ;
        document.getElementById("stack").value = miostack - b1;

        var piatto = (b1 * 2) + somma1
        miostack = miostack - b1;
        //suostack = suostack - b1;

        //scrivi(miostack, id_player);
        aggpunti(miostack,suostack);

        if (allin == 1) {
            suona2();
            muoviturn();
            //window.setTimeout("All_In_T();", 1000);

            $('#betting').html('<font class="bettin">ALL-IN: $'+b1+'</font>');

            stop_opponent2();

            window.setTimeout("puntaAssoTurn("+id_player+","+b1+");", 3000);
            //window.setTimeout("fineM_A(0," + id_player + "," + piatto + ", " + miostack + ", " + suostack + ")", 2000);
        }
        else {
            window.setTimeout(function () {
                suona2();
                muoviturn();
             }, 500);

             stop_opponent2();
             window.setTimeout("puntaAssoTurn("+id_player+","+b1+");", 3000);
            
            return;
        }
    }

    function puntaAssoTurn(id_giocatore,puntata) {
        $("#suafoto").effect("highlight",{}, 1000);
        show('counter_2');
        window.setTimeout(function () {
            pcgbar_tempo(0);
        }, 500);
        //Time();

        var b1 = parseInt(puntata);
        var miostack = parseInt(self.document.formia.miostack.value);
        var suostack = parseInt(self.document.formia.suostack.value);
        var somma1 = parseInt(self.document.formia.somma.value);
        var id_player = id_giocatore;
        var allin;

    if (suostack>miostack){
        if((parseInt(miostack-puntata))<0){
            $( "#slider" ).slider("option","max",0);
       }
       else{
            $( "#slider" ).slider("option","max",miostack);
       }
    }
    else if (suostack<miostack){
        if((parseInt(suostack-puntata))<0){
            $( "#slider" ).slider("option","max",0);
       }
       else{
            $( "#slider" ).slider("option","max",suostack-puntata);
       }
    }
  
		if(miostack==0){
            alert(miostack);
            b2 = puntata;
            b1 = miostack;
            allin = 1;
        }
        
        if (puntata >= miostack) {
            suostack = suostack - puntata;
            //alert('all in');
            //allin = 1;
        }
        else if (puntata >= suostack) {
            suostack = 0;
            //alert('all in');
            allin = 1;
        }
        else {
            //alert('diverso suo stack turn');
            suostack = suostack - puntata;
        }

        var piatto = (puntata * 2) + somma1;

        if (allin == 1) {

            window.setTimeout(function () {
               $('#counter_2').empty();
               hide('counter_2');
                document.getElementById("stackPC").value = suostack;
                $('#betting').fadeIn('slow');
                $('#betting').html('<font class="bettin">CALL: $'+puntata+'</font>');
                $(".card2").trigger('click');
                document.getElementById("somma").value = (puntata * 2) + somma1;
                document.getElementById("somma2").value = puntata ;
                
                suona2();
                muovichipAssoTurn();
                stop_opponent();
             }, 3000);

            window.setTimeout("All_In_T();", 3000);

            window.setTimeout("fineM_A(0," + id_player + "," + piatto + ", " + miostack + ", " + suostack + ")", 8000);
        }

        else {
            window.setTimeout(function () {
            $('#betting').fadeIn('slow');
            $('#betting').html('<font class="bettin">CALL: $'+b1+'</font>');
            document.getElementById("stackPC").value = suostack;

            document.getElementById("somma").value = (puntata * 2) + somma1;
            document.getElementById("somma2").value = puntata ;

             }, 3000);

            window.setTimeout("suona2();", 3000);
            window.setTimeout("muovichipAssoTurn();", 3000);
            window.setTimeout("moveObjectTurn('turn')", 4500);
            setTimeout(function () {
               $('#counter_2').empty();
               hide('counter_2');

               stop_opponent();
               pcgbar_tempo2(0);
            }, 2500);

            return;
        }

        // x criptare = miostack = btoa(miostack);
        // x decriptare = miostack = atob(miostack);

        //window.setTimeout("check()", 5000);
    }

    function punta3(id_giocatore) {
         //busso();
         hide('counter_2');
         $('#betting').fadeIn('slow');
         $('#counter_2').empty();

        var b1 = parseInt(self.document.formia.b.value);
        var miostack = parseInt(self.document.formia.miostack.value);
        var suostack = parseInt(self.document.formia.suostack.value);
        var somma1 = parseInt(self.document.formia.somma.value);
        var id_player = id_giocatore;
        var allin;

        $('#betting').html('<font class="bettin">BET: $'+b1+'</font>');
        window.setTimeout("$('#betting').fadeOut('slow')", 1500);

        if ((b1 == "") || (b1 == "0")) {
            alert("puntata mancante");
            return;
        }
        if (b1 >= miostack) {
            b1 = miostack;
            //alert('all in');
            allin = 1;
        }
        if (b1 >= suostack) {
            //alert('all in');
            allin = 1;
        }

        //document.getElementById("somma").value = (b1 * 2) + somma1;
        //document.getElementById("stackPC").value = suostack - b1;
        document.getElementById("stack").value = miostack - b1;
        document.getElementById("somma3").value = b1 ;

        var piatto = (b1 * 2) + somma1
        miostack = miostack - b1;
        suostack = suostack - b1;

        //scrivi(miostack, id_player);
        aggpunti(miostack,suostack);

        if (allin == 1) {
            suona2();
            muoviriver();
            //window.setTimeout("All_In_T();", 1000);

            $('#betting').html('<font class="bettin">ALL-IN: $'+b1+'</font>');

            stop_opponent2();

            window.setTimeout("puntaAssoRiver("+id_player+","+b1+");", 3000);
            //window.setTimeout("fineM_A(0," + id_player + "," + piatto + ", " + miostack + ", " + suostack + ")", 2000);
        }
        else {
            window.setTimeout(function () {
                suona2();
                muoviriver();
             }, 500);

              stop_opponent2();
             window.setTimeout("puntaAssoRiver("+id_player+","+b1+");", 3000);
            
            return;
        }

    }

    function puntaAssoRiver(id_giocatore,puntata) {
        $("#suafoto").effect("highlight",{}, 1000);
        show('counter_2');
        window.setTimeout(function () {
            pcgbar_tempo(0);
        }, 500);
        //Time();

        var b1 = parseInt(self.document.formia.b.value);
        var miostack = parseInt(self.document.formia.miostack.value);
        var suostack = parseInt(self.document.formia.suostack.value);
        var somma1 = parseInt(self.document.formia.somma.value);
        var id_player = id_giocatore;
        var allin;

    if (suostack>miostack){
        if((parseInt(miostack-puntata))<0){
            $( "#slider" ).slider("option","max",0);
       }
       else{
            $( "#slider" ).slider("option","max",miostack);
       }
    }
    else if (suostack<miostack){
        if((parseInt(suostack-puntata))<0){
            $( "#slider" ).slider("option","max",0);
       }
       else{
            $( "#slider" ).slider("option","max",suostack-puntata);
       }
    }

		if(miostack==0){
            alert(miostack);
            b2 = puntata;
            b1 = miostack;
            allin = 1;
        }
        
        if (puntata >= miostack) {
            suostack = suostack - puntata;
            //alert('all in');
            //allin = 1;
        }
        else if (puntata >= suostack) {
            suostack = 0;
            //alert('all in');
            allin = 1;
        }
        else {
            suostack = suostack - puntata;
        }


        if (allin == 1) {
                document.getElementById("somma").value = (puntata * 2) + somma1;
                document.getElementById("somma2").value = puntata ;
                var piatto = (puntata * 2) + somma1;

               window.setTimeout(function () {
               $('#counter_2').empty();
               hide('counter_2');
                document.getElementById("stackPC").value = suostack;
                $('#betting').fadeIn('slow');
                $('#betting').html('<font class="bettin">CALL: $'+puntata+'</font>');
                $(".card2").trigger('click');
                suona2();
                muovichipAssoRiver();
                stop_opponent();
             }, 3000);

            window.setTimeout("All_In_R();", 3000);
            
            window.setTimeout("fineM_A(0," + id_player + "," + piatto + ", " + miostack + ", " + suostack + ")", 8000);
        }

        else {
            document.getElementById("somma").value = (puntata * 2) + somma1;
            document.getElementById("somma2").value = puntata ;
            var piatto = (puntata * 2) + somma1;

            window.setTimeout(function () {
            $('#betting').fadeIn('slow');
            $('#betting').html('<font class="bettin">CALL: $'+b1+'</font>');
            document.getElementById("stackPC").value = suostack;

            document.getElementById("somma").value = (b1 * 2) + somma1;
            document.getElementById("somma2").value = b1 ;
             }, 3000);

            window.setTimeout("suona2();", 3000);
            window.setTimeout("muovichipAssoRiver();", 3000);
            window.setTimeout("moveObjectRiver('river')", 4500);

            window.setTimeout(function () {
               $('#counter_2').empty();
               hide('counter_2');

            stop_opponent();
            pcgbar_tempo2(0);
            }, 2500);

            return;
        }

}


    function fineM(win, id_giocatore) {
        busso();
        var piatt = parseInt(self.document.formia.somma.value);
        var miostack = parseInt(self.document.formia.miostack.value);
        var suostack = parseInt(self.document.formia.suostack.value);
        var id_player = id_giocatore;

         $(".card2").trigger('click');
         Aggiorna();

         window.setTimeout("punta4(" + win + "," + id_player + "," + piatt + ", " + miostack + ", " + suostack + ")", 2000);
    }

    function punta4(win, id_giocatore, piatt, miostac, suostac) {
        var won2 = self.document.formia.won.value;
        var id_player = id_giocatore;

        var miostack = miostac;
        var suostack = suostac;
        var piatto = parseInt(self.document.formia.somma.value);

        alert(miostack);
        alert(suostack);
        alert('piatto da assegnare:' + piatto);;

        if (won2 == 1) {
            $("#holecard2").css({ opacity: 0.5 });
            //$('#punteggio').fadeIn('slow');
            //document.getElementById("punteggio").value = "Vince Asso";
            document.getElementById("somma2").value = suostack + piatto;

            $('#betting').fadeIn('slow');
            $('#betting').html('<font class="bettin">Vince Asso</font>');

            window.setTimeout(function () {
                $('#perc_mia').html('<font class="percentuali_R">0%</font>');
                $('#perc_sua').html('<font class="percentuali_G">100%</font>');
             }, 1000);

            $('#puntopokerAsso').fadeIn('slow');
            leggipunteggio(1);

            document.getElementById("stackPC").value = suostack + piatto;
            suostack = suostack + piatto;

            suona2();

            $('#piatto1').animate({ left: '0', top: '+=20' }, 1000);
            $('#piatto2').animate({ left: '0', top: '+=20' }, 1000);


            //scrivi(miostack, id_player);
            aggpunti(miostack,suostack);

            stop_opponent();
            stop_opponent2();

             window.setTimeout(function () {
                 //giroimg ();
                 //$('#holecard').fadeOut('slow');
                 //$('#holecard2').fadeOut('slow');
                 //mescola();
                 AssegnaSueFiches();
             }, 2500);
                 

        }
        if (won2 == 2) {
            $("#holecard").css({ opacity: 0.5 });
            document.getElementById("somma3").value = miostack + piatto;
            $('#betting').fadeIn('slow');
            $('#betting').html('<font class="bettin">Vinco Io</font>');

            window.setTimeout(function () {
                $('#perc_mia').html('<font class="percentuali_G">100%</font>');
                $('#perc_sua').html('<font class="percentuali_R">0%</font>');
            }, 1000);
            
            $('#puntopoker').fadeIn('slow');
            leggipunteggio(2);

            document.getElementById("stack").value = miostack + piatto;

            suona2();

            $('#piatto1').animate({ left: '0', top: '+=20' }, 1000);
            $('#piatto2').animate({ left: '0', top: '+=20' }, 1000);

            window.setTimeout(function () {
                 //giroimg ();
                 //$('#holecard').fadeOut('slow');
                 //$('#holecard2').fadeOut('slow');
                 //mescola2();
                 AssegnaMieFiches();
             }, 2500);

            stop_opponent();
            stop_opponent2();

            miostack = miostack + piatto;

            //scrivi(miostack, id_player);
            aggpunti(miostack,suostack);
        }

        $( "#slider" ).slider("option","value",20);
		$( "#b" ).val(20);

        //document.getElementById("somma").value = "";
        //document.getElementById("punteggio").value = "";

        //window.setTimeout("pulisci()", 4000);
        //window.setTimeout("refreshing()", 4000);
        //window.setTimeout("NuovaMano()", 4500);

        $('#shuffle').fadeIn('slow');
        hide('punta4');
    }

    function daicarte(){
        giroimg ();

        window.setTimeout(function () {
        hide('holecard');
        hide('holecard2');
        hide('fold');
        hide('fold2');
        hide('counter_2');
        hide('raise');
        }, 500);

        $('#shuffle').fadeOut('slow');

         window.setTimeout(function () {
            mescola();
         }, 1000);

       document.getElementById("somma").value = "";
       document.getElementById("punteggio").value = "";

       window.setTimeout("pulisci()", 2000);
       window.setTimeout("refreshing()", 2000);
       window.setTimeout("NuovaMano()", 2500);
    }


    function fineM_A(win, id_giocatore, piatt, miostac, suostac) {
        var id_player = id_giocatore;

        Aggiorna();

        window.setTimeout("punta4_A(" + win + "," + id_player + "," + piatt + ", " + miostac + ", " + suostac + ")", 2000);
    }

    function punta4_A(win, id_giocatore, piatt, miostac, suostac) {
        var won2 = self.document.formia.won.value;
        var id_player = id_giocatore;

        var miostack = miostac;
        var suostack = suostac;
        var piatto = parseInt(piatt);

        //alert(miostack);
        //alert(suostack);
        //alert('piatto da assegnare:' + piatto);

        if (won2 == 1) {
            $("#holecard2").css({ opacity: 0.5 });
            //$('#punteggio').fadeIn('slow');
            //document.getElementById("punteggio").value = "Vince Asso";
            document.getElementById("somma2").value = suostack + piatto;

            $('#betting').fadeIn('slow');
            $('#betting').html('<font class="bettin">Vince Asso</font>');

            window.setTimeout(function () {
                $('#perc_mia').html('<font class="percentuali_R">0%</font>');
                $('#perc_sua').html('<font class="percentuali_G">100%</font>');
             }, 1000);

            $('#puntopokerAsso').fadeIn('slow');
            leggipunteggio(1);

            document.getElementById("stackPC").value = suostack + piatto;
            suostack = suostack + piatto;


            suona2();
            $('#actionbet3').animate({ left: 0, top: '-=25' }, 1000);
            $('#actionbet').animate({ left: -200, top: '+=40' }, 1000);

            $('#actionbet3Turn').animate({ left: 0, top: '-=25' }, 1000);
            $('#actionbetTurn').animate({ left: -200, top: '+=40' }, 1000);

            $('#actionbet3River').animate({ left: 0, top: '-=25' }, 1000);
            $('#actionbetRiver').animate({ left: -200, top: '+=40' }, 1000);

            $('#piatto1').animate({ left: '0', top: '+=20' }, 1000);
            $('#piatto2').animate({ left: '0', top: '+=20' }, 1000);


            //scrivi(miostack, id_player);
            aggpunti(miostack,suostack);

             window.setTimeout(function () {
                 //giroimg ();
                 //$('#holecard').fadeOut('slow');
                 //$('#holecard2').fadeOut('slow');
                 AssegnaSueFiches();
                 //mescola();
             }, 2500);
                 

        }
        if (won2 == 2) {
            $("#holecard").css({ opacity: 0.5 });
            document.getElementById("somma3").value = miostack + piatto;
            $('#betting').fadeIn('slow');
            $('#betting').html('<font class="bettin">Vinco Io</font>');

            window.setTimeout(function () {
                $('#perc_mia').html('<font class="percentuali_G">100%</font>');
                $('#perc_sua').html('<font class="percentuali_R">0%</font>');
            }, 1000);
            
            $('#puntopoker').fadeIn('slow');
            leggipunteggio(2);

            document.getElementById("stack").value = miostack + piatto;
            miostack = miostack + piatto;

            suona2();
            $('#actionbet3').animate({ left: 0, top: '-=25' }, 1000);
            $('#actionbet').animate({ left: -200, top: '+=40' }, 1000);

            $('#actionbet3Turn').animate({ left: 0, top: '-=25' }, 1000);
            $('#actionbetTurn').animate({ left: -200, top: '+=40' }, 1000);

            $('#actionbet3River').animate({ left: 0, top: '-=25' }, 1000);
            $('#actionbetRiver').animate({ left: -200, top: '+=40' }, 1000);

            $('#piatto1').animate({ left: '0', top: '+=20' }, 1000);
            $('#piatto2').animate({ left: '0', top: '+=20' }, 1000);

            window.setTimeout(function () {
                 //giroimg ();
                 //$('#holecard').fadeOut('slow');
                 //$('#holecard2').fadeOut('slow');
                 AssegnaMieFiches();
                 //mescola2();
             }, 2500);

            //scrivi(miostack, id_player);
            aggpunti(miostack,suostack);
        }
        
           $( "#slider" ).slider("option","value",20);
		   $( "#b" ).val(20);

        //document.getElementById("somma").value = "";
        //document.getElementById("punteggio").value = "";

        //window.setTimeout("pulisci()", 4000);
        //window.setTimeout("refreshing()", 4000);
        //window.setTimeout("NuovaMano()", 4500);

        $('#shuffle').fadeIn('slow');
    }


    function nuovaM2(win, id_giocatore) {
        busso();
        giroimg ();

        //alert("NuovaM2");
        var c1 = parseInt(self.document.formia.somma.value);
        var id_player = id_giocatore;
        document.getElementById("somma2").value = c1;

        $('#counter_2').empty();
        hide('counter_2');
        $('#betting').fadeIn('slow');
        $('#betting').html('<font class="bettin">Vince Asso</font>');

        passa();

        window.setTimeout("fold2(" + win + "," + id_player + ")", 1000);
    }

    function fold2(win, id_giocatore) {
        mescola();

        var b1 = parseInt(self.document.formia.b.value);
        var id_player = id_giocatore;

        var miostack = parseInt(self.document.formia.miostack.value);
        var suostack = parseInt(self.document.formia.suostack.value);
        var piatto = parseInt(self.document.formia.somma.value);

        $( "#slider" ).slider("option","value",20);
		$( "#b" ).val(20);

        document.getElementById("stackPC").value = suostack + piatto;
        suostack = suostack + piatto;

        stop_opponent2();
        //scrivi(miostack, id_player);
        aggpunti(miostack,suostack);

        window.setTimeout("pulisci()", 2000);
        refreshing();
        document.getElementById("somma").value = "";
        
        window.setTimeout("NuovaMano()", 2000);

    }
	
	function Richiesta() {
        XMLHTTP = RicavaBrowser(CambioStato);
        XMLHTTP.open("GET", "vincitore_HU.asp", true);
        XMLHTTP.send(null);
    }

    function CambioStato() {
        if (XMLHTTP.readyState == 4) {
            //var R = document.getElementById("won");
            //R.innerHTML = XMLHTTP.responseText;
            document.getElementById("won").value = XMLHTTP.responseText.replace(/^\s+|\s+$/g, "");
            alert(XMLHTTP.responseText);
            //window.setTimeout("fold(" + document.getElementById("won").value + ")", 2000);
        }
    }

    function RicavaBrowser(QualeBrowser) {
        if (navigator.userAgent.indexOf("MSIE") != (-1)) {
            var Classe = "Msxml2.XMLHTTP";
            if (navigator.appVersion.indexOf("MSIE 5.5") != (-1));
            {
                Classe = "Microsoft.XMLHTTP";
            }
            try {
                OggettoXMLHTTP = new ActiveXObject(Classe);
                OggettoXMLHTTP.onreadystatechange = QualeBrowser;
                return OggettoXMLHTTP;
            }
            catch (e) {
                alert("Errore: l'ActiveX non verrà eseguito!");
            }
        }
        else if (navigator.userAgent.indexOf("Mozilla") != (-1)) {
            OggettoXMLHTTP = new XMLHttpRequest();
            OggettoXMLHTTP.onload = QualeBrowser;
            OggettoXMLHTTP.onerror = QualeBrowser;
            return OggettoXMLHTTP;
        }
        else {
            alert("L'esempio non funziona con altri browser!");
        }
    }

    function Aggiorna() {
        //return Richiesta();

        var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
        var vincitore;

        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM Poker', [], function (tx, results) {
                var len = results.rows.length, i;

                for (i = 0; i < len; i++) {
                    vincitore = results.rows.item(i).HandWin;
                    document.getElementById("won").value = vincitore;
                    //alert(vincitore);
                }
            }, null);
        });
    }

    function leggipunteggio(won) {
        //return Richiesta();

        var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
        var segnapunto;
        var win = won;

        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM Poker', [], function (tx, results) {
                var len = results.rows.length, i;

                for (i = 0; i < len; i++) {
                    if (win == 1){
                        segnapunto = results.rows.item(i).descP1;
                        $('#puntopokerAsso').html('<font class="bettin">'+ segnapunto +'</font>');
                    }
                    if (win == 2){
                        segnapunto = results.rows.item(i).descP2;
                        $('#puntopoker').html('<font class="bettin">'+ segnapunto +'</font>');
                    }

                }
            }, null);
        });
    }

    function suona(){

soundManager.setup({

  url: 'swf/',
  
  // good to go: the onready() callback

  onready: function() {

    // SM2 has started - now you can create and play sounds!

    var mySound = soundManager.createSound({
      id: 'aSound',
      url: 'suoni/daicarte.mp3'
      // onload: function() { console.log('sound loaded!', this); }
      // other options here..
    });

    mySound.play();

  },

  // optional: ontimeout() callback for handling start-up failure, flash required but blocked, etc.

  ontimeout: function() {
    // Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
    // See the flashblock demo when you want to start getting fancy.
  }

});

}

    function suona2(){

soundManager.setup({

  url: 'swf/',
  
  onready: function() {

    var mySound2 = soundManager.createSound({
      id: 'aSound2',
      url: 'suoni/chip.mp3'
    });

    mySound2.play();

  },

  ontimeout: function() {
  }

});

}

    function busso(){

soundManager.setup({

  url: 'swf/',
  
  onready: function() {

    var mySound3 = soundManager.createSound({
      id: 'aSound3',
      url: 'suoni/c_button.mp3'
    });

    mySound3.play();

  },

  ontimeout: function() {
  }

});

}

    function AssegnaSueFiches() {
        suona2();
        $('#miechip').animate({ left: '150', top: '-=230' }, 500, function () { toglifiches(); });
        $('#actionbetPre').animate({ left: '-20', top: '-=40' }, 1000, function () { toglipiattoA(); });
        $('#actionbet').animate({ left: '0', top: '0' }, 1000, function () { toglipiattoA(); });
        $('#actionbet3').animate({ left: '210', top: '-=60' }, 1000, function () { toglipiattoMio(); });
            $('#actionbet3Pre').animate({ left: '210', top: '-=60' }, 1000, function () { toglipiattoMio(); });

        $('#actionbetTurn').animate({ left: '-20', top: '-=40' }, 1000, function () { toglipiattoA_Turn(); });
        $('#actionbet3Turn').animate({ left: '210', top: '-=60' }, 1000, function () { toglipiattoMio_Turn(); });

        $('#actionbetRiver').animate({ left: '-20', top: '-=40' }, 1000, function () { toglipiattoA_River(); });
        $('#actionbet3River').animate({ left: '210', top: '-=60' }, 1000, function () { toglipiattoMio_River(); });

        $('#piatto1').animate({ left: '190', top: '-=10' }, 1000, function () { toglipiatto_1(); });
        $('#piatto2').animate({ left: '190', top: '-=10' }, 1000, function () { toglipiatto_2(); });
    }

    function AssegnaMieFiches() {
        suona2();

        $('#suechip').animate({ left: '0', top: '0' }, 500, function () { toglisuefiches(); });
        $('#actionbet').animate({ left: '+=20', top: '+=60' }, 1000, function () { toglipiattoA(); });
        $('#actionbet3').animate({ left: '+=20', top: '+=60' }, 1000, function () { toglipiattoMio(); });

        $('#actionbetTurn').animate({ left: '+=20', top: '+=60' }, 1000, function () { toglipiattoA_Turn(); });
        $('#actionbet3Turn').animate({ left: '+=20', top: '+=60' }, 1000, function () { toglipiattoMio_Turn(); });

        $('#actionbetRiver').animate({ left: '+=20', top: '+=60' }, 1000, function () { toglipiattoA_River(); });
        $('#actionbet3River').animate({ left: '+=20', top: '+=60' }, 1000, function () { toglipiattoMio_River(); });

        $('#piatto1').animate({ left: '+=20', top: '+=80' }, 1000, function () { toglipiatto_1A(); });
        $('#piatto2').animate({ left: '+=20', top: '+=80' }, 1000, function () { toglipiatto_2A(); });
     }

    function mescola() {
        $('#dealer').fadeIn('slow');
        $('#dealer2').fadeIn('slow');
        $('#dealer3').fadeIn('slow');
        $('#dealer4').fadeIn('slow');

        $('#dealerA').animate({ textIndent: 0 }, {
            step: function (now, fx) {
                if (now == 0) {
                    fx.now = 90;
                    fx.start = 90;
                }
                $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
            },
            duration: 100
        });

        $('#dealer2A').animate({ textIndent: 0 }, {
            step: function (now, fx) {
                if (now == 0) {
                    fx.now = 90;
                    fx.start = 90;
                }
                $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
            },
            duration: 100
        });

         $('#dealer3A').animate({ textIndent: 0 }, {
            step: function (now, fx) {
                if (now == 0) {
                    fx.now = 90;
                    fx.start = 90;
                }
                $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
            },
            duration: 100
        });

        $('#dealer4A').animate({ textIndent: 0 }, {
            step: function (now, fx) {
                if (now == 0) {
                    fx.now = 90;
                    fx.start = 90;
                }
                $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
            },
            duration: 100
        });

        $('#dealer').animate({ left: '5', top: '-=185' }, 300, function () {
            $('#dealer2').animate({ left: '10', top: '-=185' }, 300, function () {
            suona2();
            $('#dealer3').animate({ left: '0', top: '50' }, 500);
            $('#dealer4').animate({ left: '0', top: '50' }, 500);

            $('#miechip').animate({ left: '150', top: '-=230' }, 500, function () { toglifiches(); });
            $('#actionbetPre').animate({ left: '-20', top: '-=40' }, 1000, function () { toglipiattoA(); });
            $('#actionbet').animate({ left: '0', top: '0' }, 1000, function () { toglipiattoA(); });
            $('#actionbet3').animate({ left: '210', top: '-=60' }, 1000, function () { toglipiattoMio(); });
             $('#actionbet3Pre').animate({ left: '210', top: '-=60' }, 1000, function () { toglipiattoMio(); });

            $('#actionbetTurn').animate({ left: '-20', top: '-=40' }, 1000, function () { toglipiattoA_Turn(); });
            $('#actionbet3Turn').animate({ left: '210', top: '-=60' }, 1000, function () { toglipiattoMio_Turn(); });

            $('#actionbetRiver').animate({ left: '-20', top: '-=40' }, 1000, function () { toglipiattoA_River(); });
            $('#actionbet3River').animate({ left: '210', top: '-=60' }, 1000, function () { toglipiattoMio_River(); });

            $('#piatto1').animate({ left: '190', top: '-=10' }, 1000, function () { toglipiatto_1(); });
            $('#piatto2').animate({ left: '190', top: '-=10' }, 1000, function () { toglipiatto_2(); });

            });
        });
}

    function mescola2() {
        $('#dealer').fadeIn('slow');
        $('#dealer2').fadeIn('slow');
        $('#dealer3').fadeIn('slow');
        $('#dealer4').fadeIn('slow');

        $('#dealerA').animate({ textIndent: 0 }, {
            step: function (now, fx) {
                if (now == 0) {
                    fx.now = 90;
                    fx.start = 90;
                }
                $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
            },
            duration: 100
        });

        $('#dealer2A').animate({ textIndent: 0 }, {
            step: function (now, fx) {
                if (now == 0) {
                    fx.now = 90;
                    fx.start = 90;
                }
                $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
            },
            duration: 100
        });

         $('#dealer3A').animate({ textIndent: 0 }, {
            step: function (now, fx) {
                if (now == 0) {
                    fx.now = 90;
                    fx.start = 90;
                }
                $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
            },
            duration: 100
        });

        $('#dealer4A').animate({ textIndent: 0 }, {
            step: function (now, fx) {
                if (now == 0) {
                    fx.now = 90;
                    fx.start = 90;
                }
                $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
            },
            duration: 100
        });

        $('#dealer').animate({ left: '5', top: '-=185' }, 300, function () {
            $('#dealer2').animate({ left: '10', top: '-=185' }, 300, function () {
            suona2();
            $('#dealer3').animate({ left: '0', top: '50' }, 500);
            $('#dealer4').animate({ left: '0', top: '50' }, 500);

            $('#suechip').animate({ left: '0', top: '0' }, 500, function () { toglisuefiches(); });
            $('#actionbet').animate({ left: '+=20', top: '+=60' }, 1000, function () { toglipiattoA(); });
            $('#actionbet3').animate({ left: '+=20', top: '+=60' }, 1000, function () { toglipiattoMio(); });

            $('#actionbetTurn').animate({ left: '+=20', top: '+=60' }, 1000, function () { toglipiattoA_Turn(); });
            $('#actionbet3Turn').animate({ left: '+=20', top: '+=60' }, 1000, function () { toglipiattoMio_Turn(); });

            $('#actionbetRiver').animate({ left: '+=20', top: '+=60' }, 1000, function () { toglipiattoA_River(); });
            $('#actionbet3River').animate({ left: '+=20', top: '+=60' }, 1000, function () { toglipiattoMio_River(); });

            $('#piatto1').animate({ left: '+=20', top: '+=80' }, 1000, function () { toglipiatto_1A(); });
            $('#piatto2').animate({ left: '+=20', top: '+=80' }, 1000, function () { toglipiatto_2A(); });

            });
        });
}

//DRAGGABLE----------------------------------------------------------------
    $(init);

    function init() {
        $('#test11').draggable();
        $('#sel_puntata').droppable({
            drop: handleDropEvent
        });
    }

    function handleDropEvent(event, ui) {
        var draggable = ui.draggable;
        alert('The square with ID "' + draggable.attr('id') + '" was dropped onto me!');
    }

    $(document).ready(function () {

        $(".rounded-img, .rounded-img2").load(function () {
            $(this).wrap(function () {
                return '<span class="' + $(this).attr('class') + '" style="background:url(' + $(this).attr('src') + ') no-repeat center center; width: ' + $(this).width() + 'px; height: ' + $(this).height() + 'px;" />';
            });
            $(this).css("opacity", "0");
        });

    });


//--------------------PERCENTUALI------------------------------------

    function Percentuali(card1,card2,card3,card4) {
	        var carta1 = card1;
			var carta2 = card2;
			var carta3 = card3;
			var carta4 = card4;
			
			carta1 = carta1.slice(0,2);
			carta2 = carta2.slice(0,2);
			carta3 = carta3.slice(0,2);
			carta4 = carta4.slice(0,2);
			
			
			if (carta1.slice(1,2) == "q") {
				carta1 = carta1.replace('q','d');
			}
			else if (carta1.slice(1,2) == "p") {
				carta1 = carta1.replace('p','s');
			}
			else if (carta1.slice(1,2) == "f") {
				carta1 = carta1.replace('f','c');
			}
			else if (carta1.slice(1,2) == "c") {
				carta1 = carta1.replace('c','h');
			}
			else {
				carta1 = carta1;
			}
			
			if (carta2.slice(1,2) == "q") {
				carta2 = carta2.replace('q','d');
			}
			else if (carta2.slice(1,2) == "p") {
				carta2 = carta2.replace('p','s');
			}
			else if (carta2.slice(1,2) == "f") {
				carta2 = carta2.replace('f','c');
			}
			else if (carta2.slice(1,2) == "c") {
				carta2 = carta2.replace('c','h');
			}
			else {
				carta2 = carta2;
			}
			
			if (carta3.slice(1,2) == "q") {
				carta3 = carta3.replace('q','d');
			}
			else if (carta3.slice(1,2) == "p") {
				carta3 = carta3.replace('p','s');
			}
			else if (carta3.slice(1,2) == "f") {
				carta3 = carta3.replace('f','c');
			}
			else if (carta3.slice(1,2) == "c") {
				carta3 = carta3.replace('c','h');
			}
			else {
				carta3 = carta3;
			}
			
			if (carta4.slice(1,2) == "q") {
				carta4 = carta4.replace('q','d');
			}
			else if (carta4.slice(1,2) == "p") {
				carta4 = carta4.replace('p','s');
			}
			else if (carta4.slice(1,2) == "f") {
				carta4 = carta4.replace('f','c');
			}
			else if (carta4.slice(1,2) == "c") {
				carta4 = carta4.replace('c','h');
			}
			else {
				carta4 = carta4;
			}

			//alert("Pre - num1=" + carta1 + carta2 + "&num2=" + carta3 + carta4 + "&board=" + carta5 + carta6 + carta7);
			
			$.ajax({
            type: "GET",
            url: "vincitore_HU_V2.asp",
            data: "num1=" + carta1 + carta2 + "&num2=" + carta3 + carta4 + "&board=",
            cache: false,
            dataType: "html",
            success: function(responseText){
				var stringa = responseText;
				var dati_stringa = stringa.split(':');
				//alert(dati_stringa[0].slice(0,2));
                //alert(dati_stringa[1].slice(0,2));

                if (dati_stringa[0]=="0%"){
                     window.setTimeout(function () {
                        Ripeti_Percentuali_Flop(carta1,carta2,carta3,carta4);
                     }, 1000);

                    //document.getElementById("perc_mia").value = "";
                    $('#perc_sua').html('<font class="percentuali_R"></font>');
                    $('#perc_mia').html('<font class="percentuali_G"></font>');

                }
                else{
                    if (parseInt(dati_stringa[0].slice(0,2))<50){
                        $('#perc_mia').html('<font class="percentuali_G">'+ dati_stringa[1] +'</font>');
                        $('#perc_sua').html('<font class="percentuali_R">'+ dati_stringa[0] +'</font>');
                    }
                    else{
                        $('#perc_mia').html('<font class="percentuali_R">'+ dati_stringa[1] +'</font>');
                        $('#perc_sua').html('<font class="percentuali_G">'+ dati_stringa[0] +'</font>');
                    }

                    var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
                    db.transaction(function (tx) {
                    tx.executeSql('UPDATE Poker set Perc1="'+ dati_stringa[0] +'", Perc2="'+ dati_stringa[1] +'"  where id=1', [], function (tx, results) {
                    }, null);
                    });
                }

            },
            error: function(resposeText){
                alert(resposeText);
            }
        });

		return false;
	}

    function Ripeti_Percentuali_Flop(carta1,carta2,carta3,carta4) {
         	alert('Ripeti flop');

            $.ajax({
            type: "GET",
            url: "vincitore_HU_V2.asp",
            data: "num1=" + carta1 + carta2 + "&num2=" + carta3 + carta4 + "&board=",
            cache: false,
            dataType: "html",
            success: function(responseText){
				var stringa = responseText;
				var dati_stringa = stringa.split(':');
				alert(stringa);

                if (dati_stringa[0]=="0%"){
                    //Ripeti_Percentuali_Flop(carta1,carta2,carta3,carta4)
                    $('#perc_mia').html('<font class="percentuali_G"></font>');
                    $('#perc_sua').html('<font class="percentuali_R"></font>');
                }
                else{
                    if (parseInt(dati_stringa[0].slice(0,2))<50){
                        $('#perc_mia').html('<font class="percentuali_G">'+ dati_stringa[1] +'</font>');
                        $('#perc_sua').html('<font class="percentuali_R">'+ dati_stringa[0] +'</font>');
                    }
                    else{
                        $('#perc_mia').html('<font class="percentuali_R">'+ dati_stringa[1] +'</font>');
                        $('#perc_sua').html('<font class="percentuali_G">'+ dati_stringa[0] +'</font>');
                    }

                    var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
                    db.transaction(function (tx) {
                    tx.executeSql('UPDATE Poker set Perc1="'+ dati_stringa[0] +'", Perc2="'+ dati_stringa[1] +'"  where id=1', [], function (tx, results) {
                    }, null);
                    });
                }

                },
                error: function(resposeText){
                    alert(resposeText);
                }
            });

		    return false;
        }

    function Percentuali_T(card1,card2,card3,card4,card5,card6,card7) {
	        var carta1 = card1;
			var carta2 = card2;
			var carta3 = card3;
			var carta4 = card4;
			var carta5 = card5;
			var carta6 = card6;
			var carta7 = card7;
			
			carta1 = carta1.slice(0,2);
			carta2 = carta2.slice(0,2);
			carta3 = carta3.slice(0,2);
			carta4 = carta4.slice(0,2);

            carta5 = carta5.slice(0,2);
			carta6 = carta6.slice(0,2);
			carta7 = carta7.slice(0,2);
			
			if (carta1.slice(1,2) == "q") {
				carta1 = carta1.replace('q','d');
			}
			else if (carta1.slice(1,2) == "p") {
				carta1 = carta1.replace('p','s');
			}
			else if (carta1.slice(1,2) == "f") {
				carta1 = carta1.replace('f','c');
			}
			else if (carta1.slice(1,2) == "c") {
				carta1 = carta1.replace('c','h');
			}
			else {
				carta1 = carta1;
			}
			
			if (carta2.slice(1,2) == "q") {
				carta2 = carta2.replace('q','d');
			}
			else if (carta2.slice(1,2) == "p") {
				carta2 = carta2.replace('p','s');
			}
			else if (carta2.slice(1,2) == "f") {
				carta2 = carta2.replace('f','c');
			}
			else if (carta2.slice(1,2) == "c") {
				carta2 = carta2.replace('c','h');
			}
			else {
				carta2 = carta2;
			}
			
			if (carta3.slice(1,2) == "q") {
				carta3 = carta3.replace('q','d');
			}
			else if (carta3.slice(1,2) == "p") {
				carta3 = carta3.replace('p','s');
			}
			else if (carta3.slice(1,2) == "f") {
				carta3 = carta3.replace('f','c');
			}
			else if (carta3.slice(1,2) == "c") {
				carta3 = carta3.replace('c','h');
			}
			else {
				carta3 = carta3;
			}
			
			if (carta4.slice(1,2) == "q") {
				carta4 = carta4.replace('q','d');
			}
			else if (carta4.slice(1,2) == "p") {
				carta4 = carta4.replace('p','s');
			}
			else if (carta4.slice(1,2) == "f") {
				carta4 = carta4.replace('f','c');
			}
			else if (carta4.slice(1,2) == "c") {
				carta4 = carta4.replace('c','h');
			}
			else {
				carta4 = carta4;
			}
			
			if (carta5.slice(1,2) == "q") {
				carta5 = carta5.replace('q','d');
			}
			else if (carta5.slice(1,2) == "p") {
				carta5 = carta5.replace('p','s');
			}
			else if (carta5.slice(1,2) == "f") {
				carta5 = carta5.replace('f','c');
			}
			else if (carta5.slice(1,2) == "c") {
				carta5 = carta5.replace('c','h');
			}
			else {
				carta5 = carta5;
			}
			
			if (carta6.slice(1,2) == "q") {
				carta6 = carta6.replace('q','d');
			}
			else if (carta6.slice(1,2) == "p") {
				carta6 = carta6.replace('p','s');
			}
			else if (carta6.slice(1,2) == "f") {
				carta6 = carta6.replace('f','c');
			}
			else if (carta6.slice(1,2) == "c") {
				carta6 = carta6.replace('c','h');
			}
			else {
				carta6 = carta6;
			}
			
			if (carta7.slice(1,2) == "q") {
				carta7 = carta7.replace('q','d');
			}
			else if (carta7.slice(1,2) == "p") {
				carta7 = carta7.replace('p','s');
			}
			else if (carta7.slice(1,2) == "f") {
				carta7 = carta7.replace('f','c');
			}
			else if (carta7.slice(1,2) == "c") {
				carta7 = carta7.replace('c','h');
			}
			else {
				carta7 = carta7;
			}

			//alert("Flop - num1=" + carta1 + carta2 + "&num2=" + carta3 + carta4 + "&board=" + carta5 + carta6 + carta7);
			
			$.ajax({
            type: "GET",
            url: "vincitore_HU_V2.asp",
			//url: "DB/DataBase.html",
            data: "num1=" + carta1 + carta2 + "&num2=" + carta3 + carta4 + "&board=" + carta5 + carta6 + carta7,
            cache: false,
            dataType: "html",
            success: function(responseText){
				//alert(responseText);
				var stringa = responseText;
				var dati_stringa = stringa.split(':');
				//alert(stringa);


                if (dati_stringa[0]=="0%"){
                    window.setTimeout(function () {
                        Ripeti_Percentuali_Turn(carta1,carta2,carta3,carta4,carta5,carta6,carta7);
                     }, 1000);
                    $('#perc_mia').html('<font class="percentuali_G"></font>');
                    //document.getElementById("perc_mia").value = "";
                    $('#perc_sua').html('<font class="percentuali_R"></font>');
                }
                else{
                    if (parseInt(dati_stringa[0].slice(0,2))<50){
                        $('#perc_mia').html('<font class="percentuali_G">'+ dati_stringa[1] +'</font>');
                        $('#perc_sua').html('<font class="percentuali_R">'+ dati_stringa[0] +'</font>');
                    }
                    else{
                        $('#perc_mia').html('<font class="percentuali_R">'+ dati_stringa[1] +'</font>');
                        $('#perc_sua').html('<font class="percentuali_G">'+ dati_stringa[0] +'</font>');
                    }

                    var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
                    db.transaction(function (tx) {
                    tx.executeSql('UPDATE Poker set Perc1="'+ dati_stringa[0] +'", Perc2="'+ dati_stringa[1] +'"  where id=1', [], function (tx, results) {
                    }, null);
                    });
                }

            },
            error: function(resposeText){
                alert(resposeText);
            }
        });

		return false;
	}

    function Ripeti_Percentuali_Turn(carta1,carta2,carta3,carta4,carta5,carta6,carta7) {
         	//alert('Ripeti Turn');

            $.ajax({
            type: "GET",
            url: "vincitore_HU_V2.asp",
            data: "num1=" + carta1 + carta2 + "&num2=" + carta3 + carta4 + "&board=" + carta5 + carta6 + carta7,
            cache: false,
            dataType: "html",
            success: function(responseText){
				var stringa = responseText;
				var dati_stringa = stringa.split(':');
				alert(stringa);

                if (dati_stringa[0]=="0%"){
                    //Ripeti_Percentuali_Turn(carta1,carta2,carta3,carta4,carta5,carta6,carta7)
                    $('#perc_mia').html('<font class="percentuali_G"></font>');
                    $('#perc_sua').html('<font class="percentuali_R"></font>');
                }
                else{
                    if (parseInt(dati_stringa[0].slice(0,2))<50){
                        $('#perc_mia').html('<font class="percentuali_G">'+ dati_stringa[1] +'</font>');
                        $('#perc_sua').html('<font class="percentuali_R">'+ dati_stringa[0] +'</font>');
                    }
                    else{
                        $('#perc_mia').html('<font class="percentuali_R">'+ dati_stringa[1] +'</font>');
                        $('#perc_sua').html('<font class="percentuali_G">'+ dati_stringa[0] +'</font>');
                    }

                    var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
                    db.transaction(function (tx) {
                    tx.executeSql('UPDATE Poker set Perc1="'+ dati_stringa[0] +'", Perc2="'+ dati_stringa[1] +'"  where id=1', [], function (tx, results) {
                    }, null);
                    });
                }

                },
                error: function(resposeText){
                    alert(resposeText);
                }
            });

		    return false;
        }

    function Percentuali_R(card1,card2,card3,card4,card5,card6,card7,card8) {
	        var carta1 = card1;
			var carta2 = card2;
			var carta3 = card3;
			var carta4 = card4;
			var carta5 = card5;
			var carta6 = card6;
			var carta7 = card7;
            var carta8 = card8;
			
			carta1 = carta1.slice(0,2);
			carta2 = carta2.slice(0,2);
			carta3 = carta3.slice(0,2);
			carta4 = carta4.slice(0,2);

            carta5 = carta5.slice(0,2);
			carta6 = carta6.slice(0,2);
			carta7 = carta7.slice(0,2);

            carta8 = carta8.slice(0,2);
			
			if (carta1.slice(1,2) == "q") {
				carta1 = carta1.replace('q','d');
			}
			else if (carta1.slice(1,2) == "p") {
				carta1 = carta1.replace('p','s');
			}
			else if (carta1.slice(1,2) == "f") {
				carta1 = carta1.replace('f','c');
			}
			else if (carta1.slice(1,2) == "c") {
				carta1 = carta1.replace('c','h');
			}
			else {
				carta1 = carta1;
			}
			
			if (carta2.slice(1,2) == "q") {
				carta2 = carta2.replace('q','d');
			}
			else if (carta2.slice(1,2) == "p") {
				carta2 = carta2.replace('p','s');
			}
			else if (carta2.slice(1,2) == "f") {
				carta2 = carta2.replace('f','c');
			}
			else if (carta2.slice(1,2) == "c") {
				carta2 = carta2.replace('c','h');
			}
			else {
				carta2 = carta2;
			}
			
			if (carta3.slice(1,2) == "q") {
				carta3 = carta3.replace('q','d');
			}
			else if (carta3.slice(1,2) == "p") {
				carta3 = carta3.replace('p','s');
			}
			else if (carta3.slice(1,2) == "f") {
				carta3 = carta3.replace('f','c');
			}
			else if (carta3.slice(1,2) == "c") {
				carta3 = carta3.replace('c','h');
			}
			else {
				carta3 = carta3;
			}
			
			if (carta4.slice(1,2) == "q") {
				carta4 = carta4.replace('q','d');
			}
			else if (carta4.slice(1,2) == "p") {
				carta4 = carta4.replace('p','s');
			}
			else if (carta4.slice(1,2) == "f") {
				carta4 = carta4.replace('f','c');
			}
			else if (carta4.slice(1,2) == "c") {
				carta4 = carta4.replace('c','h');
			}
			else {
				carta4 = carta4;
			}
			
			if (carta5.slice(1,2) == "q") {
				carta5 = carta5.replace('q','d');
			}
			else if (carta5.slice(1,2) == "p") {
				carta5 = carta5.replace('p','s');
			}
			else if (carta5.slice(1,2) == "f") {
				carta5 = carta5.replace('f','c');
			}
			else if (carta5.slice(1,2) == "c") {
				carta5 = carta5.replace('c','h');
			}
			else {
				carta5 = carta5;
			}
			
			if (carta6.slice(1,2) == "q") {
				carta6 = carta6.replace('q','d');
			}
			else if (carta6.slice(1,2) == "p") {
				carta6 = carta6.replace('p','s');
			}
			else if (carta6.slice(1,2) == "f") {
				carta6 = carta6.replace('f','c');
			}
			else if (carta6.slice(1,2) == "c") {
				carta6 = carta6.replace('c','h');
			}
			else {
				carta6 = carta6;
			}
			
			if (carta7.slice(1,2) == "q") {
				carta7 = carta7.replace('q','d');
			}
			else if (carta7.slice(1,2) == "p") {
				carta7 = carta7.replace('p','s');
			}
			else if (carta7.slice(1,2) == "f") {
				carta7 = carta7.replace('f','c');
			}
			else if (carta7.slice(1,2) == "c") {
				carta7 = carta7.replace('c','h');
			}
			else {
				carta7 = carta7;
			}

            if (carta8.slice(1,2) == "q") {
				carta8 = carta8.replace('q','d');
			}
			else if (carta8.slice(1,2) == "p") {
				carta8 = carta8.replace('p','s');
			}
			else if (carta8.slice(1,2) == "f") {
				carta8 = carta8.replace('f','c');
			}
			else if (carta8.slice(1,2) == "c") {
				carta8 = carta8.replace('c','h');
			}
			else {
				carta8 = carta8;
			}

			//alert("Flop - num1=" + carta1 + carta2 + "&num2=" + carta3 + carta4 + "&board=" + carta5 + carta6 + carta7 + carta8);
			
			$.ajax({
            type: "GET",
            url: "vincitore_HU_V2.asp",
			//url: "DB/DataBase.html",
            data: "num1=" + carta1 + carta2 + "&num2=" + carta3 + carta4 + "&board=" + carta5 + carta6 + carta7 + carta8,
            cache: false,
            dataType: "html",
            success: function(responseText){
				//alert(responseText);
				var stringa = responseText;
				var dati_stringa = stringa.split(':');
				//alert(stringa);


                if (dati_stringa[0]=="0%"){
                    window.setTimeout(function () {
                        //Ripeti_Percentuali_R(carta1,carta2,carta3,carta4,carta5,carta6,carta7,carta8);
                     }, 1000);
                    $('#perc_mia').html('<font class="percentuali_G"></font>');
                    $('#perc_sua').html('<font class="percentuali_R"></font>');
                }
                else{
                    if (parseInt(dati_stringa[0].slice(0,2))<50){
                        $('#perc_mia').html('<font class="percentuali_G">'+ dati_stringa[1] +'</font>');
                        $('#perc_sua').html('<font class="percentuali_R">'+ dati_stringa[0] +'</font>');
                    }
                    else{
                        $('#perc_mia').html('<font class="percentuali_R">'+ dati_stringa[1] +'</font>');
                        $('#perc_sua').html('<font class="percentuali_G">'+ dati_stringa[0] +'</font>');
                    }

                    var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
                    db.transaction(function (tx) {
                    tx.executeSql('UPDATE Poker set Perc1="'+ dati_stringa[0] +'", Perc2="'+ dati_stringa[1] +'"  where id=1', [], function (tx, results) {
                    }, null);
                    });
                }

            },
            error: function(resposeText){
                alert(resposeText);
            }
        });

		return false;
	}

    //---------PARI E DISPARI---------------

    function IsNotUneven(numero){

    if (isNaN(numero) == false)
    {
        return (numero %2 == 1 ?  true : false);
    }
    else
    {
        return null;
    }
}

//--------------TEMPO ---------------------

    function pcgbar_tempo(pcg) {
        var totalbe = 0 + 100
        if (pcg < totalbe) {
		
	        newpcg = pcg + 1
	
	        $( "#percentbar" ).html(newpcg+'%');
	
	        $(function() {
		        $( "#progressbar" ).progressbar({
		          value: newpcg
		        });
           });
   
            if (newpcg >= 50){
		        //$('#progressbar').css({
			        //backgroundColor:"orange"
		        //});
	        }
  
	        timerID=setTimeout('pcgbar_tempo(newpcg);',100);
        }

        else if (pcg == totalbe) {
        self.location = '#'
        }
}

    function stop_opponent() {
        clearTimeout(timerID);
        $( "#percentbar" ).html('');
        $( "#progressbar" ).progressbar({
	      value: 0
    });
}

    function pcgbar_tempo2(pcg) {
        var totalbe = 0 + 100
        if (pcg < totalbe) {
		
	        newpcg = pcg + 1
	
	        $( "#percentbar2" ).html(newpcg+'%');
	
	        $(function() {
		        $( "#progressbar2" ).progressbar({
		          value: newpcg
		        });
           });
   
            if (newpcg >= 50){
		        //$('#progressbar').css({
			        //backgroundColor:"orange"
		        //});
	        }
  
	        timerID2=setTimeout('pcgbar_tempo2(newpcg);',100);
        }

        else if (pcg == totalbe) {
        self.location = '#'
        }
}

    function stop_opponent2() {
        clearTimeout(timerID2);
        $( "#percentbar2" ).html('');
        $( "#progressbar2" ).progressbar({
	      value: 0
    });
}


//------------CONTA PUNTI------------------

    function insertHand(P1,P2,descpunto1,descpunto2,vincitorePP,carta1,carta2,carta3,carta4,carta1_f,carta2_f,carta3_f,cartaT,cartaR){

        var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
            db.transaction(function (tx) {
              tx.executeSql('UPDATE Poker set P1="'+ P1 +'", P2="'+ P2 +'", descP1="' + descpunto1 + '", descP2 ="'+ descpunto2 +'", HandWin ="'+ vincitorePP +'", carta1 ="'+ carta1 +'", carta2 ="'+ carta2 +'", carta3 ="'+ carta3 +'", carta4 ="'+ carta4 +'", flop1="'+ carta1_f +'", flop2="'+ carta2_f +'", flop3="'+ carta3_f +'", turn="'+ cartaT +'", river="'+ cartaR +'"  where id=1', [], function (tx, results) {
             }, null);
});

        }

    function contamano() {

    var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM Poker', [], function (tx, results) {
        var len = results.rows.length, i;

        for (i = 0; i < len; i++) {
            var hand = parseInt(results.rows.item(i).NHand);
            //alert(hand);

            if (IsNotUneven(hand) == true) {
               //alert("Numero dispari");
            }
            else {
               //alert("Numero pari");
            }

            Upcontamano(hand+1)
        }
       }, null);
    });
}

    function Upcontamano(mano) {
     var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
     db.transaction(function (tx) {
        tx.executeSql('UPDATE Poker set NHand="' + mano + '" where id=1', [], function (tx, results) {
        }, null);
      });
    }

    function contapunto() {
    var puntoM;

    var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM Poker', [], function (tx, results) {
        var len = results.rows.length, i;

        for (i = 0; i < len; i++) {
            puntoM = parseInt(results.rows.item(i).P1);
            //$.session.set('puntoM', puntoM);
           document.getElementById("contapunto").value = puntoM;
        }
       }, null);
    });

}

    function controllo_pre(carta1, carta2) {
    var puntoM;

    carta1 = carta1.slice(0,1);
    carta2 = carta2.slice(0,1);

    if (carta1 == carta2)
    {
      document.getElementById("contapuntoPre").value = 1;
      alert('coppia');
    }
    else if ((carta1=="A") || (carta2=="A"))
    {
      document.getElementById("contapuntoPre").value = 2;
      alert('Asso');
    }
    else if (((carta1=="2") && (carta2=="3")) || ((carta1=="3") && (carta2=="2")) || ((carta1=="3") && (carta2=="4")) || ((carta1=="4") && (carta2=="3")) || ((carta1=="2") && (carta2=="4")) || ((carta1=="4") && (carta2=="2")) || ((carta1=="3") && (carta2=="9")) || ((carta1=="9") && (carta2=="3")) || ((carta1=="4") && (carta2=="9")) || ((carta1=="9") && (carta2=="4")))
    {
      document.getElementById("contapuntoPre").value = 3;
      alert('Dovrebbe essere Fold');
    }
    else
    {
      document.getElementById("contapuntoPre").value = 0;
    }

    //document.getElementById("contapunto").value = puntoM;
}


//--------------------------------------------------------------FICHES ---------------------------------------------------------------
     function toglifiches() {
        $('#miechip').fadeOut('slow');
        $('#miechip').animate({ left: '-=150', top: 0 }, 300, function () { $('#miechip').fadeIn('slow'), 1000 });

        $('#dealer3').animate({ left: 5, top: '-=30' }, 1000, function () { $('#dealer3').fadeIn('slow'), 1000 });
        $('#dealer4').animate({ left: 10, top: '-=30' }, 1000, function () { $('#dealer4').fadeIn('slow'), 1000 });
    }

    function toglisuefiches() {
        $('#dealer3').animate({ left: 5, top: '-=30' }, 1000, function () { $('#dealer3').fadeIn('slow'), 1000 });
        $('#dealer4').animate({ left: 10, top: '-=30' }, 1000, function () { $('#dealer4').fadeIn('slow'), 1000 });
    }

    function toglipiattoA() {
        $('#actionbet').fadeOut('slow');
        $('#actionbet').animate({ left: 0, top: 0 }, 500, function () { $('#actionbet').fadeOut('slow'), 1000 });
    }

    function toglipiattoMio() {
        $('#actionbet3').fadeOut('slow');
        $('#actionbet3').animate({ left: 0, top: 0 }, 500, function () { $('#actionbet3').fadeOut('slow'), 1000 });
    }

    function toglipiattoA_Turn() {
        $('#actionbetTurn').fadeOut('slow');
        $('#actionbetTurn').animate({ left: 0, top: 0 }, 500, function () { $('#actionbetTurn').fadeOut('slow'), 1000 });
    }

    function toglipiattoMio_Turn() {
        $('#actionbet3Turn').fadeOut('slow');
        $('#actionbet3Turn').animate({ left: 0, top: 0 }, 500, function () { $('#actionbet3Turn').fadeOut('slow'), 1000 });
    }

    function toglipiattoA_River() {
        $('#actionbetRiver').fadeOut('slow');
        $('#actionbetRiver').animate({ left: 0, top: 0 }, 500, function () { $('#actionbetRiver').fadeOut('slow'), 1000 });
    }

    function toglipiattoMio_River() {
        $('#actionbet3River').fadeOut('slow');
        $('#actionbet3River').animate({ left: 0, top: 0 }, 500, function () { $('#actionbet3River').fadeOut('slow'), 1000 });
    }

    function toglipiatto_1() {
        $('#piatto1').fadeOut('slow');
        $('#piatto1').animate({ left: '-=190', top: 0 }, 500, function () { $('#piatto1').fadeOut('slow'), 1000 });
    }

    function toglipiatto_2() {
        $('#piatto2').fadeOut('slow');
        $('#piatto2').animate({ left: '-=190', top: 0 }, 500, function () { $('#piatto2').fadeOut('slow'), 1000 });
    }

    function toglipiatto_1A() {
        $('#piatto1').fadeOut('slow');
        $('#piatto1').animate({ left: 0, top: 0 }, 500, function () { $('#piatto1').fadeOut('slow'), 1000 });
    }

    function toglipiatto_2A() {
        $('#piatto2').fadeOut('slow');
        $('#piatto2').animate({ left: 0, top: 0 }, 500, function () { $('#piatto2').fadeOut('slow'), 1000 });
    }