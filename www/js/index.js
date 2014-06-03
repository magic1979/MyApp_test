/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');
        
        var connectionStatus = false;
        connectionStatus = navigator.onLine ? 'online' : 'offline';
        alert(connectionStatus);
        
        localStorage.myname = "10";
        localStorage.setItem("example", "Binario")

        //console.log('Received Event: ' + id);
        //$('#classifica').html(numero);
        $('#classifica').html("DATA");
        
        checkData();
        checkConnection()
        
        setTimeout(function() {
                navigator.splashscreen.hide();
        }, 2000);

    }
};

function checkData() {
    navigator.globalization.dateToString(
    new Date(),
    function (date) { $('#classifica').html(date.value + '\n'); },
    function () { alert('Error getting dateString\n'); },
    { selector: 'date and time' }
   );
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
    
    //alert('Connection type: ' + states[networkState]);
    
    function alertDismissed() {
        // do something
    }
    
    navigator.notification.alert(
       'Connection type: ' + states[networkState],  // message
        alertDismissed,         // callback
        'Game Over',            // title
        'Done'                  // buttonName
      );
    
    
    $('#connessione').html(states[networkState] + '\n');
}



