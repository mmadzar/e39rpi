var util = require('util');
var EventEmitter = require('events').EventEmitter;

var common = require('./common');
var Mplayer = require('./node-mplayer');
var tools = require('./tools');
var Ibus = require('./ibus');
var ibus = new Ibus();
var monitor_def = require('./monitor_def');
var player = new Mplayer();
var playlist = [];
var bookmarks = []; //playlist with bookmarks
var title = ""; // title for display or displayed
var lastTitle = ""; // title for display or displayed
var titlePos = 0; //position of scrolling title
var titleMaxSize = 11; //max title size
var sendPlayerStatus = false;
var announceCDneeded = true;
var cdRespondedRequest = false;
var ignitionOn = false;
var mode = "Radio";

var Player = function () {
    //mplayer: player,
    this.start = function () {
        console.log("starting mplayer...".cyan);
        //var pls = "/home/pi/busmon/music/test.mp3";
        //var pls = "/home/pi/busmon/rpilist.pls";
        //var pls = "C:\\Projects\\Rpi\\e39rpi\\rpiList.pls";
        var pls = "rpiList.pls";
        //loadPlaylist(pls);
        player.setFile(pls);
        //TODO Win player.play();
        //TODO Win player.setVolume(100);
        titleMaxSize = 11;
        //TODO Win readPlayerStatus();
        displayPlayerStatus();
        
        try {
            //common.serialport.on('open', function(err){
            //  console.log("port open...".green)
            //  announceCD();
            //  common.serialport.on('data', function(data){ // monitor serial port receive
            //    //console.log('length: ' + data.length)
            //    for (var i = 0; i < data.length; i++) {
            //      ibus.collectBuffer(data[i]);
            //    };
            //  });
            //});
            common.fs.read
            ibus.collectBuffer(data[i]);

        }
		catch (err) {
            console.log(('Error: ' + err).red);
        }
    };
    
    this.announceCD = function () {
        announceCD();
    };
    
    this.sendPlayerStatus = function (type) {
        readlayerStatus();
        sendPlayerStatus = true;
    };
    
    this.processMessage = function (command) {
        processMessage(command);
    };
    
    this.loadPlaylist = function (filename) {
        console.log('TODO parse for search');
    };
};


function announceCD() {
    if (announceCDneeded) {
        ibus.sendMessage(monitor_def.findCommandByName('cd_announce').hexId.slice())
        setTimeout(function () {
            announceCD();
        }, 3000);
    }
}

function readPlayerStatus(type) {
    var playerstatus = "";
    var songPos = "";
    var result = "";
    var self = this;
    /*player.getMetaArtist(function(metaArtist){
	  	if(metaArtist !== undefined){
	  		playerstatus += metaArtist;
	  	}
		*/  
		player.getMetaTitle(function (metaTitle) {
        
        if (metaTitle !== undefined) {
            playerstatus += playerstatus.length > 0 ? " - " + metaTitle : metaTitle;
        }
        if (playerstatus.length == 0) {
            player.getFilename(function (filename) {
                playerstatus += filename;
                if (playerstatus.length < titleMaxSize) {
                    result = playerstatus.padLeft(titleMaxSize - playerstatus.length);
                }
                else {
                    result = playerstatus.substring(titlePos, titlePos + titleMaxSize);
                    titlePos++;
                    if (titlePos > playerstatus.length - titleMaxSize) {
                        titlePos = 0;
                    }
                }
                //console.log(("1 - " + title + ' -' + result).red);
                title = result;
            });
        }
        
        /* player.getTimePosition(function(timePos){			
			  var et = new Date(0,0,0,0,0,timePos);
			    if(et !== 'Invalid Date'){
			      var s=et.getSeconds();
			      var m=et.getMinutes();
			      songPos = m + ':' + (s<10 ? '0' + s : s);
			      //playerstatus += " " + m + ':' + (s<10 ? '0' + s : s) ;
				} */
			      if (playerstatus.length < titleMaxSize) {
            result = playerstatus.padLeft(titleMaxSize - playerstatus.length);
        }
        else {
            result = playerstatus.substring(titlePos, titlePos + titleMaxSize);
            titlePos++;
            if (titlePos > playerstatus.length - titleMaxSize) {
                titlePos = 0;
            }
        }
        //console.log(("2 - " + title + ' -' + result).red);
        title = result;
        /*player.getTimeLength(function(l){
					var lt = new Date(0,0,0,0,l);
					if(lt != 'Invalid Date'){
						var ls=lt.getSeconds();
						var lm=lt.getMinutes();
						var songLen = lm + ':' + (ls<10 ? '0' + ls : ls);
						try{
			      			songPos = (songPos + '/' + songLen).padLeft(11 - songPos.length - songLen.length - 1);
						}
						catch (err){							
							songPos = "".padLeft(11);
						}
					}*/
					//songPos = songPos.padLeft(11);
				    //console.log(new Date().toFormattedString().grey + ' ' + ('playerStatus: ' + result).green + ' ' + songPos.cyan);
				    // TODO display message on one of 3 screens - depending on type

/*				    var msg = "80 21 c0 23 04 20".split(' '); //BC
				    //IKE var msg1 = "68 1b 80 23 40 20".split(' ');
				    var converted = result.asciiToHex();
				    for (var i = 0; i < converted.length; i++) {
				    	msg.push(converted[i]);
				    };
*/				    
				//});
			//});
		
			setTimeout(function () {
            readPlayerStatus(1);
        }, 1000);

		//});
    });
}

function displayPlayerStatus() {
    //display only if changed
    //console.log(title + " - " + lastTitle)
    //if(title !== lastTitle){
    lastTitle = title;
    var msg2 = "68 10 c0 23 40 00".split(' '); //Radio
    //68 12 c0 23 40 20 03
    var converted = title.asciiToHex();
    for (var i = 0; i < converted.length; i++) {
        msg2.push(converted[i]);
    };
    
    //ibus.sendMessage(msg);
    //ibus.sendMessage(msg1);
    //TODO Win ibus.sendMessage(msg2);
    //}
    
    setTimeout(function () {
        //if(sendPlayerStatus/* && lastTitle !== title*/){
        displayPlayerStatus();
		//}
    }, 1000);
}

function processMessage(command) {
    console.log((new Date().toFormattedString()).grey + (' ' + command.name.padRight(30) + " " + common.displayMessage(command.intId.slice()).padRight(60) + " " + command.hexId.hexToAscii()).yellow);
    
    //68 xx C0 21 40 00 09 xxxxx 05 43 44 - .CD
    if (command.hexId[0] === '68' && 
        command.hexId[2].toUpperCase() === 'C0' && 
        command.hexId[2].toUpperCase() === '21' && 
        command.hexId[2].toUpperCase() === '40' && 
        command.hexId[2].toUpperCase() === '00' && 
        command.hexId[2].toUpperCase() === '09' && 
        command.hexId[command.hexId.length - 4] === '05' && command.hexId[command.hexId.length - 3].toUpperCase() === '43' && command.hexId[command.hexId.length - 3] === '44') {
            //TODO replace CD label with MP3
    }
    if (command.name === 'radio_cd_poll') { //'68 03 18 01 72'
        console.log('//respond as CD player'.cyan);
        announceCDneeded = false;
        ibus.sendMessage(monitor_def.findCommandByName('cd_respond').hexId.slice());
		//ibus.sendMessage(monitor_def.findCommandByName('display_MP3_command_instead_of_CD').hexId.slice());
    }
    else if (command.name === 'cd_button_release') {
        mode = 'CD';
        console.log('//cd_button_release'.cyan);
        readPlayerStatus();
        displayPlayerStatus();
        ibus.sendMessage(monitor_def.findCommandByName('cd_playing0101').hexId.slice());
		/*ibus.sendMessage(monitor_def.findCommandByName('mp3_menu1').hexId.slice());
		setTimeout(function(){
			ibus.sendMessage(monitor_def.findCommandByName('mp3_menu2').hexId.slice());
		}, 100);
		setTimeout(function(){
			ibus.sendMessage(monitor_def.findCommandByName('mp3_menu3').hexId.slice());
		}, 100);*/
    }
    else if (command.name === 'key_remote_release') {
		//player.next();
    }
    else if (command.name == 'ignition_status_pos0_acc') {
        ignitionOn = false;
    }
    else if (command.name == 'ignition_status_pos1_acc' || command.name == 'ignition_status_pos2_on') {
        ignitionOn = true;
    }
    
    if (mode === 'CD') {
        if (command.name === 'previous_release') {
            player.previous(1);
        }
        else if (command.name === 'next_release') {
            player.next(1);
        }
        else if (command.name === 'radio_1_release') {
            player.previous(1);
        }
        else if (command.name === 'radio_2_release') {
            player.next(1);
        }
        else if (command.name === 'radio_3_release') {
            player.previous(10);
        }
        else if (command.name === 'radio_4_release') {
            player.next(10);
        }
        else if (command.name === 'button_labels_for_replace') {
            ibus.sendMessage(monitor_def.findCommandByName('mp3_menu1').hexId.slice());
        }
        else if (command.name === 'cd_playing0101display') {
            sendPlayerStatus = true;
        }
        else if (command.name === 'button_labels') {
			//ibus.sendMessage(monitor_def.findCommandByName('display_MP3_command_instead_of_CD'));
        }
    }
}

module.exports = Player;

ibus.on('commandReceived', function (command) {
    processMessage(command);
});
