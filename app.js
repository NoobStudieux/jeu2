/*var express = require('express');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({		 extended: false		 });
var ent = require('ent');  // equivaut à htmlspecialchar en PHP (échappe données saisies par utilisateur)
var http = require('http');
var cookieParser = require('cookie-parser');*/

var session = require('cookie-session');
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({		 extended: false		 });
var ent = require('ent');
var http = require('http');
var express = require('express');
var app = express();

session.joueursConnectes = [];
session.parties = [];


app.set('port', (process.env.PORT || 8080));

app.use(express.static(__dirname + '/public')).use(express.static(__dirname + '/public/js'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});
/*
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});*/

var server = http.createServer(app);
server.listen(8080);

require('./app/com_serveur.js').loadIoModule(server, app);



