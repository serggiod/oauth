// Modelo.
var legJujuy = require('../models/model_legislatura_jujuy');
var legWeb   = require('../models/model_legislatura_web');
var env      = require('../environment')();
var md5      = require('MD5');
var dateObj  = new Date();

/* Use en caso de respuestas cords:
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Credentials','false');
	res.header('Content-Type','text/html');
*/

exports.loginHEAD = function(req,res,next) {

	// Definiciones.
	var AppKey = req.header('App-Key');
	var RegStr = new RegExp(env.filters.string,'g');

	res.set('Access-Control-Allow-Origin','*');						
	res.set("Connection", "close"); 

	if(AppKey){

		// Buscar una aplicacion activa con la llave AppKey.
		AppKey.toString().match(RegStr).join('').toString();
		legWeb.oauth_apps.findOne({where:{app_key:AppKey}}).then(function(tabla){

			if(tabla!=null){
				
				// Buscar una session registrada con la llave AppKey.
				legWeb.oauth_code.findOne({where:{app_key:AppKey}}).then(function(tabla2){
					
					// Borrar la session anterior.
					if(tabla2!=null){ tabla2.destroy(); }
					
					// Definir y guardar  un nueva session.
					var AppCode = md5('klg34hj'+tabla.dataValues.app_id+dateObj.getTime().toString()+tabla.dataValues.app_name+Math.random());
					tabla = legWeb.oauth_code.build({
						app_id:null,
						app_key:AppKey,
						app_code:AppCode,
						app_time:dateObj.toString(),
						app_sess:'INACTIVO'
					})
					.save()
					.then(function(tabla){

						// Salida final.
						if(tabla!=null){ 
							res.set('App-Code',AppCode);
							res.end();
						}
						
					});

				});

			} else {
				res.end();
			}

			
		});

	} else { 
		res.end();
	}
	
};

exports.loginGET = function(req,res,next) {
  res.send('Hola Mundo...');
};

exports.loginPOST = function(req,res,next) {
  res.send();
};

exports.loginDELETE = function(req,res,next) {
  res.send();
};