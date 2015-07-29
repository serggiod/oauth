var models = require('../models/legislatura_web');
var env    = require('../environment')();
var md5    = require('MD5');
var mysql  = require('mysql');
var dbWeb  = mysql.createConnection(env.db.urlWeb);


// Middleware: Responde devolviendo la cabecera.
exports.indexHEAD = function(req,res,next) {
	
	// Definir variables locales.
	var AppKey = req.header('App-Key');
	var AppCode = req.header('App-Code');
	var RegStr = new RegExp(env.filters.string,'g');
	var dateObj = new Date();

	// Establecer cabeceras por defecto.
	res.set('Access-Control-Allow-Origin','*');
	res.set('Content-Type','application/json');
	res.set("Connection", "close"); 

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
										res.set('App-Status','true');
										res.set('App-Code',AppCode);
										res.end();

									} else {

										// Cerrar conexion.
										res.end();

									}

								} else {

									// Cerrar conexion.
									res.end();

								}

							});

						} else {

							// Cerrar session.
							res.end();

						}

					});

				} else {

					// Enviamos el estado.
					res.set('App-Status','false');
					res.end();

				}
			} else {

				// Cerrar conexion.
				res.end();

			}
		});

	} else {

		// Cerrar conexion.
		res.end();

	}

};