document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    iSpeechPlugin.init("d3370002295a03996d7d132c735f33bd");
    
    var options = {
        msg : "Your Text Goes here",
        voice : "ISVoiceUSEnglishFemale", //see ISSpeechSynthesisVoices.h for options
        bitrate: 48,
        speed  : 0
    };
    
    iSpeechPlugin.speak(success,error,options);

}


