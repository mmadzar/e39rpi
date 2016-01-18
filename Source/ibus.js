var util = require('util');

var monitor_def = require('./monitor_def');
var common = require('./common');

var EventEmitter = require("events").EventEmitter;
var byteArr = []; // array of bytes for debug
var byteArrCounter = 0;
var messageQueue = []; // messages for sending
var sendingMessages = false;
var collectCallCounter = 0;
//var byteTimeDiff = 0;
//var byteStartTime = undefined;
//var allBytes = []; // Contains all received bytes
//var allMessages = []; // Contains all parsed messages


var Ibus = function(){
	this.displayMessage = function(msgByteArr){
		return this.displayMessage(msgByteArr);
	}
};

util.inherits(Ibus, EventEmitter);
module.exports = Ibus;

Ibus.prototype.sendMessage = function sendMessage(hexMsgArrWithoutChecksum){
	addMessageToQueue(hexMsgArrWithoutChecksum);
	sendMessages();
}

Ibus.prototype.collectBuffer = function collectBuffer(item) {
	var self = this;
	var d = new Date();
	timeCounter = d.getTime();
	if(item != undefined ){
		byteArr.push(item);
		//allBytes.push(item);
	}

	if (byteArr.length >= 4)
	{ // sender+length+receiver+[message]+checksum
		var msgLen = byteArr[1]; // Message length
		if(msgLen > 64 || msgLen == 0){
			byteArr.shift();
			collectBuffer(undefined);
		}
		else if (byteArr.length < msgLen + 2) {
		}
		else {
			var parsed = parseMessage(byteArr);
			if(parsed !== undefined && parsed.length > 0) {
				try {
					//valid message
					//allMessages.push(parsed);
				    var command = monitor_def.findCommand(parsed.slice());
				    if (command !== undefined) {
				    	self.emit('commandReceived', command);
					}	
					else {
					// 	var cmdStart = monitor_def.findCommandByStart(parsed.slice());
					// 	if(cmdStart !== undefined) {
					// 		self.emit('commandReceived', cmdStart);
					// 	}
					// 	else {
							console.log((new Date().toFormattedString()).grey + (' ' + 'unknown'.padRight(30) + " " + 
								common.displayMessage(byteArr.slice()).padRight(60) + " " + byteArr.slice().intToAscii()).yellow);
					// 	}
					}
				}
				catch(ex) {
					console.log(("Error: " + ex.toString()).red);
				}

				for (var i = 0; i < parsed.length; i++) {
					byteArr.shift();
				}
			}
			else {
				byteArr.shift();
				collectBuffer(undefined);
			}
		}
	}
}

function parseMessage(byteArr) {
	// 01  - sender
	// 02  - length
	// 03  - receiver
	// 01+ - [message]
	// xx  - checksum
	var msgSrc = byteArr[0]; // Sender
	var msgLen = byteArr[1]; // Message length
	var msgDest = byteArr[2]; // Receiver
	var msgData = []; // Message content without receiver and checksum

 	// skip sender, length, receiver and checksum
	for (var j = 0; j < msgLen - 2; j++) {
		msgData.push(byteArr[j + 3]);
	};
	var msgChksum = byteArr[msgLen + 1]; // checksum from message
	if(msgChksum === calcChecksum(byteArr, msgData)) {
		var validMsg = [];
		if(msgSrc==0 && msgLen==0 && msgDest ==0) {
			// skip invalid message
		}
		else {
			validMsg.push(msgSrc);
			validMsg.push(msgLen);
			validMsg.push(msgDest);
			for (var i = 0; i < msgData.length; i++) {
				validMsg.push(msgData[i]);
			};
			validMsg.push(msgChksum);
		}
		return validMsg;
	}
	else {
		return [];
	}
}

function calcChecksum(byteArr, msgData) {
	//uses integer arrays
	if(byteArr === undefined) {
		return 0;
	}
	var resultCS = 0;
	resultCS ^= byteArr[0]^byteArr[1]^byteArr[2];
	for (var j = 0; j < msgData.length; j++) {
		resultCS ^= msgData[j];
	}
	return resultCS;
}

function displayMessage(msgByteArr) {
	if(msgByteArr !== undefined && msgByteArr.length > 0) {
		var m=msgByteArr.slice();
		var resultHex = '';	
		for (var k = 0; k < m.length; k++) {
			resultHex += ' ' + ("00" + m[k].toString(16)).slice(-2);
		};;
		
		return resultHex;
	}
	else {
		return [];
	}
}

function sendMessages(){
	if(sendingMessages === false){
	    while(messageQueue.length > 0){
	    	var d = new Date();

	    	//wait between received bytes
			var currentCalls = collectCallCounter;

			var diff = 0;
			var startTime = d.getTime();
		    while(diff < 50){
		    	// wait for message send
		    	if(currentCalls === collectCallCounter){
			    	var d1 = new Date();
					var nowTime = d1.getTime();
					diff = nowTime - startTime;
		    	}
		    	else{
		    		currentCalls = collectCallCounter;
			    	var d2 = new Date();
					var startTime = d2.getTime();
					diff = 0;
		    	}
		    }

		    var msgForSend = messageQueue[0].slice();

		    var msgForSendByte = convertToByte(msgForSend);
			messageQueue.shift();
			//console.log((d.getTime().toString() + '\t\t sending... ' + displayMessage(msgForSend)).green) + "\t" + msgForSend.hexToAscii;
			common.serialport.write(msgForSendByte, function(err, results) {
				if(err !== undefined){
					console.log(err.red);
				} 
			}.bind( {msgForSend: msgForSend} ));
		}
	}
}

function convertToByte(intMsgArray) {
	var result = [];
	for (var i = 0; i < intMsgArray.length; i++) {
		var hex = intMsgArray[i].toString(16);
		result.push("0x" + hex);
	}
	return result;
}

function addMessageToQueue(hexMsgArrWithoutChecksum) {
	// length in input parameter is just a placeholder.
	// Length and Checksums are calculated.
	var inputMsg = hexMsgArrWithoutChecksum;
    var msgHex = [];
    for (var i = 3; i < inputMsg.length; i++) {
		msgHex.push(inputMsg[i]);
    };
    var outputMsg = [];
    outputMsg.push(parseInt(inputMsg[0], 16)); // sender
    outputMsg.push(msgHex.length + 2); //msg length + destination + checksum
    outputMsg.push(parseInt(inputMsg[2], 16)); // destination
    var intMsg = [];
    for (var i = 0; i < msgHex.length; i++) {
    	outputMsg.push(parseInt(msgHex[i], 16));
    	intMsg.push(parseInt(msgHex[i], 16));
    };

	//Put calculated length in input message for checksum calculation
	inputMsg[1] = outputMsg[1].toString(16);

    outputMsg.push(calcChecksum(outputMsg, intMsg));
    messageQueue.push(outputMsg.slice());
}
