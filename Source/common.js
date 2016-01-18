Common = {
  colors: require('colors'),
  //TODO Win serial: require('serialport'),
  fs:   require('fs'),
  path: require('path'),
  serialport: init(),
  displayMessage: function(msgByteArr){
  if(msgByteArr !== undefined && msgByteArr.length > 0) {
    var resultHex = ''; 
    for (var k = 0; k < msgByteArr.length; k++) {
      resultHex += ' ' + ("00" + msgByteArr[k].toString(16)).slice(-2);
    };;
    
    return resultHex;
  }
  else {
    return [];
  }
  }
};
function init(){
//TODO Win 
	//var SerialPortBase = require("serialport").SerialPort;
	//var serialport = new SerialPortBase("/dev/ttyUSB0",{
 //           baudRate:9600, 
 //           dataBits:8,
 //           stopBits:1,                           
 //           parity:'even',  
 //           xon:false,                            
 //           xoff:false,                           
 //           rtscts:false
 //       });
	//console.log('port initialized.'.green)
	//return serialport;
}
module.exports = Common;
