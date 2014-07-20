document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    StatusBar.overlaysWebView(false);
    StatusBar.backgroundColorByHexString("#RRGGBB");
    
    var hoverDelay = $.mobile.buttonMarkup.hoverDelay = 0;
    var landmark;
    
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';

}


