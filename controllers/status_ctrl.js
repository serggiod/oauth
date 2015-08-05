var env    = require('../environment')();
var md5    = require('md5');
var mysql  = require('mysql');
var dbWeb  = mysql.createConnection(env.db.urlWeb);
var date   = new Date();

// Middleware: Responde devolviendo la cabecera.
exports.indexGET = function(req,res,next) {
	res.set('Access-Control-Allow-Origin','*');
	res.set('Connection','close');
	res.status(200);
	res.end();
	console.log(date.toString()+' GET: '+req.path);
};

// Middleware: Responde devolviendo la cabecera.
exports.statusGET = function(req,res,next) {
	
	// Definir variables locales.
	var AppKey   = req.params.appkey;
	var AppCode  = req.params.appcode;
	var RegStr   = new RegExp(env.filters.string,'g');
	var dateObj  = new Date();

	// Establecer cabeceras por defecto.
	res.set('Access-Control-Allow-Origin','*');
	res.set("Connection", "close");
	res.set('Content-Type','text/plain; charset=utf-8');

	if(AppKey && AppCode){

		// Filtrar entradas.
		AppKey.toString().match(RegStr).join('').toString();
		AppCode.toString().match(RegStr).join('').toString();

		// Chequeamos el estado de la session.
		dbWeb.query("CALL legislatura_web.sessionStatus('"+AppKey+"','"+AppCode+"');",function(err,row){

			if(!err){

				sessionResult = row[0][0].sessionResult;
				if(sessionResult==='true'){

					// Solicitamos un nuevo hash.
					dbWeb.query("CALL legislatura_web.applicationHash('"+AppKey+"');",function(err,row){

						if(!err){

							applicationResult = row[0][0].applicationResult;
							var AppCode = md5('klg34hj'+applicationResult+dateObj.getTime().toString()+Math.random());

							dbWeb.query("CALL legislatura_web.sessionUpdate('"+AppKey+"','"+AppCode+"');",function(err,row){

								if(!err){

									sessionResult = row[0][0].sessionResult;
									if(sessionResult==='true'){

										// Enviar estado y nuevo codigo.
										res.status(200);
										res.send(AppCode);
										res.end();
										console.log(dateObj.toString()+' GET: '+req.path);

									} else {

										// Cerrar conexion.
										res.status(404);
										res.end();

									}

								} else {

									// Cerrar conexion.
									res.status(404);
									res.end();

								}

							});

						} else {

							// Cerrar session.
							res.status(404);
							res.end();

						}

					});

				} else {

					// Enviamos el estado.
					res.status(404);
					res.end();

				}
			} else {

				// Cerrar conexion.
				res.status(404);
				res.end();

			}
		});

	} else {

		// Cerrar conexion.
		res.status(404);
		res.end();

	}

};