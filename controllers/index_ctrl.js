var env    = require('../environment')();
var mysql  = require('mysql');
var dbWeb  = mysql.createConnection(env.db.urlWeb);
var date   = new Date();

// Middleware: Responde con una pagina de inicio.
exports.indexGET = function(req,res,next) {
	res.set('Access-Control-Allow-Origin','*');
	res.set('Connection','close');
	res.status(200);
	res.render('index');
	res.end();
	console.log(date.toString()+' GET: '+req.path);
};

// Middleware: Responde con un pagina para instalar 
// el certificado, luego retorna a la aplicacion.
exports.indexCERTIFICATE = function(req,res,next){
	var regstr = new RegExp(env.filters.string,'g');
	var appkey = req.params.appkey;

	// Cabecera por defecto.
	res.set('Access-Control-Allow-Origin','*');
	res.set("Connection", "close");

	if(appkey){
		appkey.toString().match(regstr).join('').toString();
		dbWeb.query("CALL legislatura_web.applicationHost('"+appkey+"');",function(err,row){
			applicationHost = row[0][0].applicationResult;
			if(applicationHost != 'false'){
				res.set('Content-Type','text/html; charset=utf-8');
				res.status(200);
				res.render('certificate',{appurl:applicationHost});
				res.end();
				console.log(date.toString()+' GET: '+req.path);
			} else {
				res.status(404);
				res.end();
			}
		});
	} else {
		res.status(404);		
		res.end();
	}
};