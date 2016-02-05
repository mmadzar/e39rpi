/**
 * Module dependencies.
 */
//var common = require('./common');
var p = require('./player');
var player = new p();
//var ibus = require('./ibus');
//var ibus = new Ibus();
//var monitor_def = require('./monitor_def');

//var serialport = new SerialPort("/dev/tty.usbserial-A600b4pl",{baudrate:9600});
//var serialport = new SerialPort("/dev/tty.usbmodemfd121",{baudrate:9600});
//var serialport = new SerialPort("/dev/tty.usbmodemfa131",{baudrate:9600});
//var serialport = new SerialPort("/dev/tty.SLAB_USBtoUART",{baudrate:9600, flowControl:true, cts:true, rts:true});

var express = require('express')
  , routes = require('./routes')
  , path = require('path')
  
var favicon = require('serve-favicon')
  , logger = require('morgan')
  , methodOverride = require('method-override')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , multer = require('multer')
  , errorHandler = require('errorhandler')

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join( __dirname, '/views') ); // critical to use path.join on windows
app.set('view engine', 'vash');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'some secret key 123' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/monitor', routes.monitor);
app.get('/start', routes.start);
app.get('/send', routes.send);
app.get('/sendCommandByName', routes.sendCommandByName);
app.get('/savelog', routes.savelog);
app.get('/parsebytelog', routes.parsebytelogfile);
app.get('/parsemessageslog', routes.parsemessageslogfile);

if (app.get('env') == 'development'){
  app.use(errorHandler());
}

app.listen(app.get('port'), function(){
  console.log(("Express server listening on port " + app.get('port')).cyan);
});

player.start();


