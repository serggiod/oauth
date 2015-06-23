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
	res.render('index',{logo:env.url+'/images/jujuy.png'});
	res.end();
};

// Middleware: Responde con una pagina de inicio.
exports.indexSTATUS = function(req,res,next) {
	res.render('index',{logo:env.url+'/images/jujuy.png'});
	res.end();
};

// Middleware: Responde con un pagina para instalar 
// el certificado, luego retorna a la aplicacion.
exports.certificateGET = function(req,res,next){
	var regstr = new RegExp(env.filters.string,'g');
	var appkey = req.params.appkey.toString().match(regstr).join('').toString();
	if(appkey){
		models.oauth_apps.findOne({where:{app_key:appkey}}).then(function(oauth_apps){
			res.render('certificate',{logo:env.url+'/images/jujuy.png',appurl:oauth_apps.dataValues.app_redir});
			res.end();
		});
	} else {
		res.redirect('/');
	}
}