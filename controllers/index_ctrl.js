var models = require('../models/legislatura_web');
var env    = require('../environment')();
var mysql  = require('mysql');
var dbWeb  = mysql.createConnection(env.db.urlWeb);

// Middleware: Responde devolviendo la cabecera.
exports.indexHEAD = function(req,res,next) {
	res.header('Access-Control-Allow-Origin','*');
	res.header('Content-Type','text/html; charset=utf-8');
	res.header('Pragma','no-cache');
	res.header('Cache-Control','no-cache; max-age=0');
	res.header('Server','IIS/3.1.0 (Win 16)');
	res.header('Connection','close');
	res.end();
};

// Middleware: Responde con una pagina de inicio.
exports.indexGET = function(req,res,next) {
	res.header('Connection','close');
	res.header('Content-Type','text/html; charset=utf-8');
	res.header('Pragma','no-cache');
	res.header('Cache-Control','no-cache; max-age=0');
	res.header('Server','IIS/3.1.0 (Win 16)');
	res.render('index',{logo:env.url+'/images/jujuy.png'});
	res.end();
};

// Middleware: Responde con un pagina para instalar 
// el certificado, luego retorna a la aplicacion.
exports.indexCERTIFICATE = function(req,res,next){
	var regstr = new RegExp(env.filters.string,'g');
	var appkey = req.params.appkey;

	if(appkey){
		appkey.toString().match(regstr).join('').toString();
		dbWeb.query("CALL legislatura_web.applicationHost('"+appkey+"');",function(err,row){
			applicationHost = row[0][0].applicationResult;
			if(applicationHost != 'false'){
				res.header('Content-Type','text/html; charset=utf-8');
				res.header('Pragma','no-cache');
				res.header('Cache-Control','no-cache; max-age=0');
				res.header('Server','IIS/3.1.0 (Win 16)');
				res.render('certificate',{logo:env.url+'/images/jujuy.png',appurl:applicationHost});
				res.end();
			} else {
				res.set("Connection", "close");
				res.end();
			}
		});
	} else {
		res.set("Connection", "close");
		res.end();
	}
};