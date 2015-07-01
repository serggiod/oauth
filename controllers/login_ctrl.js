// Modelo.
var models = require('../models/model_legislatura_web');

/* Use en caso de respuestas cords:
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Credentials','false');
	res.header('Content-Type','text/html');
*/

exports.loginHEAD = function(req,res,next) {
	//console.log('Hola desde controlador');
	//var regstr = new RegExp(global.config.filter.string,'g');
	//var appkey = req.header('App-Key').toString().match(regstr).join('').toString();;

	//res.header('Access-Control-Allow-Origin','*');
	//res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
	//res.header('Access-Control-Allow-Credentials','false');
	//res.header('Content-Type','text/plain');
	//res.header('App-Code','appcode');
	
	//res.sendStatus(200);
	//res.headers('App-Code','Una clave...');
	//res.set('Access-Control-Allow-Origin','*');
	//res.set('App-Code','Una clave...');
	//res.header('Access-Control-Allow-Origin','*');
	//res.header('App-Code','appcode');
	//res.append('App-Code','appcode');
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Credentials','true');
	res.header('App-Code','Algo...');
	res.sendStatus(200);
	res.end();
	console.log('Hola Mundo');
	/*
	if(appkey){
		models.oauth_apps.findOne({where:{app_key:appkey}}).then(function(oauth_apps){
			
			var dateObj = new Date();
			var appcode = md5('klg34hj'.oauth_apps.dataValues.app_name+dateObj.getTime().toString());			

			models.oauth_code.destroy({where:{app_key:appkey}}).then(function(){
				models.oauth_code.create({app_key:appkey,aap_code:appcode,app_sess:'INACTIVO'})
				.then(function(){
					res.header('Access-Control-Allow-Origin','*');
					res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
					res.header('Access-Control-Allow-Credentials','false');
					res.header('Content-Type','text/plain');
					res.header('App-Code',appcode);
					res.send();
				});
			});


		});
	}
	*/

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