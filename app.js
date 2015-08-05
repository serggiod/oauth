var express      = require('express');
var bodyParser   = require('body-parser');

// Ruteadores.
var index        = require('./routes/index_route');
var login        = require('./routes/login_route');
var status       = require('./routes/status_route');

// Instacia de una aplicacion.
var app          = express();

// Configuraci´on de la aplicacion.
app.set('x-powered-by',false);
app.set('etag',false);

// Aplicacion de motor renderizado.
app.set('views',__dirname+'/views');
app.set('view engine', 'jade');

// Aplicar middlewares.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'public'));

// Aplicar rutas.
app.use('/',index);
app.use('/login',login);
app.use('/status',status);

// Exportamos la aplicacion como un modulo.
module.exports = app;