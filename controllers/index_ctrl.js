var models = require('../models/model_legislatura_web');
var env    = require('../environment')();

/* Use en caso de respuestas cords:
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Credentials','false');
	res.header('Content-Type','text/html');
*/

// Middleware: Responde con una pagina de inicio.
exports.indexGET = function(req,res,next) {
	res.header('Connection','close');
	res.header('Content-Type','text/html; charset=utf-8');
	res.header('Pragma','no-cache');
	res.header('Cache-Control','no-cache; max-age=0');
	res.header('Server','IIS/3.1.0 (Win 16)');
	res.header('X-Powered-By','IIS/3.1.0 (Win 16)');
	res.render('index',{logo:env.url+'/images/jujuy.png'});
	res.end();
};

// Middleware: Responde devolviendo la cabecera.
exports.indexHEAD = function(req,res,next) {
	res.header('Connection','close');
	res.header('Content-Type','text/html; charset=utf-8');
	res.header('Pragma','no-cache');
	res.header('Cache-Control','no-cache; max-age=0');
	res.header('Server','IIS/3.1.0 (Win 16)');
	res.header('X-Powered-By','IIS/3.1.0 (Win 16)');
	res.end();
};

// Middleware: Responde con un pagina para instalar 
// el certificado, luego retorna a la aplicacion.
exports.indexCERF = function(req,res,next){
	var regstr = new RegExp(env.filters.string,'g');
	var appkey = req.params.appkey.toString().match(regstr).join('').toString();
	if(appkey){
		models.oauth_apps.findOne({where:{app_key:appkey}}).then(function(oauth_apps){
			if(typeof(oauth_apps.dataValues)==='object'){
				res.render('certificate',{logo:env.url+'/images/jujuy.png',appurl:oauth_apps.dataValues.app_redir});
				res.end();
			}
		});
	}
}