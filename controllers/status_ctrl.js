var models = require('../models/legislatura_web');
var env    = require('../environment')();
var mysql  = require('mysql');
var dbWeb  = mysql.createConnection(env.db.urlWeb);

// Middleware: Responde devolviendo la cabecera.
exports.indexHEAD = function(req,res,next) {
	
	// Definir variables locales.
	var AppKey = req.header('App-Key');
	var AppCode = req.header('App-Key');
	var RegStr = new RegExp(env.filters.string,'g');

	// Establecer cabeceras por defecto.
	res.set('Access-Control-Allow-Origin','*');						
	res.set("Connection", "close"); 

	res.end();
};