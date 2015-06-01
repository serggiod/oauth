var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var bodyParser   = require('body-parser');
var mysql        = require('mysql');

// Paginas.
var index        = require('./routes/index');
var autz         = require('./routes/autz');
var autz_form    = require('./routes/autz_form');
var autz_sess    = require('./routes/autz_sess');
var autz_check   = require('./routes/autz_check');

// Instacia de una aplicacion.
var app          = express();

// Objetos de configuracion.
global.config = {
    server:{
        web:{
            host:'localhost',
            port:'8200'
        },    
        mysql:{
            web:{
                user:'sdominguez',
                pass:'rjwfthw72x45',
                host:'localhost',
                name:'legislatura_web'            
            },
            jujuy:{
                user:'sdominguez',
                pass:'sergio2012',
                host:'192.168.0.3',
                name:'legislatura_jujuy'           
            }
        }
    }
};

// Consola de errores.
global.showERROR = function(err){console.log(err);};

// Conectar a base de datos legislatura_web.
global.dbWeb = mysql.createConnection({
    host:global.config.server.mysql.web.host,
    user:global.config.server.mysql.web.user,
    password:global.config.server.mysql.web.pass
});

// Conectar a base de datos legislatura_jujuy.
global.dbJujuy = mysql.createConnection({
    host:global.config.server.mysql.jujuy.host,
    user:global.config.server.mysql.jujuy.user,
    password:global.config.server.mysql.jujuy.pass
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Aplicar Destinos a Rutas.
app.use('/', index);
app.use('/autz',autz);
app.use('/autz_form',autz_form);
app.use('/autz_sess',autz_sess);
app.use('/autz_check',autz_check);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
        res.render('error', {
            message: err.message,
        error: {}
    });
});

module.exports = app;