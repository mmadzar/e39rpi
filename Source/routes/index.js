
/*
 * GET home page.
 */
var tools = require("../tools");
var monitor_def = require('./../monitor_def');
var Ibus = require('./../ibus');
var ibus = new Ibus();

function getItems(){
  var items = [];
  for (var i = 0; i < monitor_def.MonitorCommands().length; i++) {
    items.push(monitor_def.MonitorCommands()[i]);
  };
  return items;
}

module.exports = {
  index: function(req, res){
    var items = getItems();
    for (var i = 0; i < monitor_def.MonitorCommands().length; i++) {
      items.push(monitor_def.MonitorCommands()[i]);
    };
    res.render('index', {
        channel: 'Express'
      , buffer: items
    });
  },

  monitor: function(req, res) {
    var items = getItems();
    res.render('monitor', {
        channel: 'Express'
      , buffer: items
    });
  },

  start: function (req, res){
    var items = getItems();
  	var monitor = require('./../monitor');
  	try {
    		monitor.startMonitor();

  	}
  	catch(ex) {
  	 	console.log(ex);
  	}
  	res.render('index', {
  		channel: 'Express'
  		, buffer: items
    });
  },

  sendCommandByName: function (req, res){
    var items = getItems();
    var cmd = monitor_def.findCommandByName(req.query.name);
    console.log(('command by name send ' + cmd.name).cyan);
    if(cmd != undefined) {
      try {
          ibus.sendMessage(cmd.hexId.slice());
      }
      catch(ex) {
        console.log(ex);
      }
    }
    res.render('index', {
      channel: 'Express'
      , buffer: items
    });
  },

  sendAscii: function (req, res){
    var items = getItems();
    var device = req.query.device;
    var ascii = req.query.ascii;
    console.log(device + "*" + ascii);
    var cmd = monitor_def.findCommandByName(req.query.name);
    /*console.log(('command by name send ' + cmd.name).cyan);
    if(cmd != undefined) {
      var monitor = require('./../monitor');
      try {
          monitor.sendMessage(cmd.hexId.slice());
      }
      catch(ex) {
        console.log(ex);
      }
    }*/
    res.render('index', {
      channel: 'Express'
      , buffer: items
    });
  },

  send: function (req, res){
    var items = getItems();
  	var msg = req.param("txtMsg");
    console.log(('manual send ' + msg).cyan);
  	var monitor = require('./../monitor');
  	if(msg != undefined && msg.length>0){
  		monitor.sendMessage(msg.split('_'));
  	}
    else
    {
      	try {
           //monitor.sendMessage('68 10 c0 21 40 00 09 20 54 50 05 53 43 20 05 4D 33'.split(' ')); //chk be
           //monitor.sendMessage('80 17 C0 23 04 20 56 45 52 42 31 20 03 31 32 2E 33 20 4C 2F 31 30 30 04'.split(' ')); //verb.
           monitor.sendMessage('3F 05 00 0C 00 11'.split(' ')); //lights for 3 secs
          //monitor.sendMessage('68 03 18 01'); //chk 72
        	//monitor.sendMessage('00 00 BF 76 02'.split(' ')); //blinker
        	//monitor.sendMessage('00 00 BF 76 00'.split(' ')); //blinker off
          //monitor.sendMessage('80 0c e7 24 01 00 31 35 3a 35 31 20 20');
    	}
    	catch(ex) {
    	 	console.log(ex);
    	}
    }
  	res.render('index', {
  		channel: 'Express'
  		, buffer: items
    });
  },

  savelog: function (req, res){
    var items = getItems();
    var monitor = require('./../monitor');
    monitor.saveLog();
    res.render('monitor', {
      channel: 'Express'
      , buffer: items
    });
  },

  parsebytelogfile: function (req, res){
    var items = getItems();
    var monitor = require('./../monitor');
    monitor.parseByteLogFile();
    res.render('monitor', {
      channel: 'Express'
      , buffer: items
    });
  },

  parsemessageslogfile: function (req, res){
    var items = getItems();
    var monitor = require('./../monitor');
    monitor.parseMessagesLogFile();
    res.render('monitor', {
      channel: 'Express'
      , buffer: items
    });
  }
}