var monitor_def = require('./monitor_def');
var common = require('./common');
var tools = require('./tools');
//var player = require('./player');

//var outputByteFilename = 'busmobilelog.txt';
var outputByteFilename = 'debugLog2.txt';
var outputMessageFilename = 'messages.json';

var allBytes = []; // Contains all received bytes
var allMessages = []; // Contains all parsed messages

var byteArr = []; // array of bytes for debug
var byteArrCounter = 0;
var collectCallCounter = 0;
var validMsgCounter = 0;
var errCounter = 0;
var timeCounter = 0; // number of calls in time

var messageQueue = []; // messages for sending
var sendingMessages = false;
var byteTimeDiff = 0;
var byteStartTime = undefined;

var announceCDneeded = true;

module.exports = {
	update: function(req, res) {
    	var asciiContent = req.body.asciiContent;
    	console.log("posted: " + asciiContent);
	},

	saveLog: function() {
	    common.fs.writeFile(outputByteFilename, displayMessage(allBytes), function (err) {
	        if (err) {
	            console.log(err.red);
	        } else {
	            console.log(("The " + outputByteFilename + " file was saved!").green);
	        }
	    });
	    common.fs.writeFile(outputMessageFilename, allMessages, function (err) {
	        if (err) {
	            console.log(err.red);
	        } else {
	            console.log(("The " + outputMessageFilename + " file was saved!").green);
	        }
	    });
	},

	parseByteLogFile: function() {
		// *** Read file
		common.fs.readFile(outputByteFilename, function (err, data) {
				var dataArr = data.toString().split(' ');
				console.log('parsing bytes log ' + dataArr.length);
				for (var i = 0; i < dataArr.length; i++) {
					if(parseInt(dataArr[i], 16) != undefined){
					collectBuffer(parseInt(dataArr[i], 16));
					//console.log("+" + parseInt(dataArr[i], 16).toString() + "+ - +" + dataArr[i].toString() + "+");
					byteArrCounter++;
				}
			}
			console.log(byteArrCounter + " ___ "); // displayMessage(byteArr)
			console.log(errCounter + " errors");
		});
	},

	parseMessagesLogFile: function() {
		// *** Read file
		monitor_def.startMonitor();
		common.fs.readFile(outputMessageFilename, function (err, data) {
			var dataArr = data.toString().split(',');
			console.log('parsing messages log ' + dataArr.length);
			for (var i = 0; i < dataArr.length; i++) {
				collectBuffer(parseInt(dataArr[i]));
				byteArrCounter++;
			}
			console.log(byteArrCounter + " ___ "); // displayMessage(byteArr)
			console.log(errCounter + " errors");
		});
	},

	increaseByteArrCounter: function() {
		byteArrCounter++;
	},

}

