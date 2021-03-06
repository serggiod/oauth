// Modelo.
var env      = require('../environment')();
var md5      = require('md5');
var mysql    = require('mysql');
var dbWeb  	 = mysql.createConnection(env.db.urlWeb);
var dbJujuy	 = mysql.createConnection(env.db.urlJujuy);
var dateObj  = new Date();

exports.loginGETCODE = function(req,res,next) {

	// Definiciones.
	var AppKey = req.params.appkey;
	var RegStr = new RegExp(env.filters.string,'g');

	// Cabeceras por defecto.
	res.set("Connection", "close");
	res.set('Access-Control-Allow-Origin','*');
	res.set('Content-Type','text/plain; charset=utf-8');
	
	if(AppKey){

		// Buscar una aplicacion activa con la llave AppKey.
		AppKey.toString().match(RegStr).join('').toString();
		dbWeb.query("CALL legislatura_web.applicationExists('"+AppKey+"');",function(err,row){

			applicationResult = row[0][0].applicationResult;
			if(applicationResult==='true'){
				
				// Buscar una session.
				dbWeb.query("CALL legislatura_web.sessionExists('"+AppKey+"');",function(err,row){
					
					sessionResult = row[0][0].sessionResult;
					if(sessionResult==='true'){

						// Destruir la session anterior.
						dbWeb.query("CALL legislatura_web.sessionRemove('"+AppKey+"');",function(err,row){
							
							sessionResult = row[0][0].sessionResult;
							if(sessionResult==='true'){

								// Solicita Hash de aplicacion.
								dbWeb.query("CALL legislatura_web.applicationHash('"+AppKey+"');",function(err,row){
									
									applicationResult = row[0][0].applicationResult;
									var AppCode = md5('klg34hj'+applicationResult+dateObj.getTime().toString()+Math.random());
									
									// Registra nueva sesion.
									dbWeb.query("CALL legislatura_web.sessionCreate('"+AppKey+"','"+AppCode+"');",function(err,row){
										
										sessionResult = row[0][0].sessionResult;
										if(sessionResult==='true'){

											// Envia sesion y cierra la coneccion.
											res.status(200);
											res.send(AppCode);
											res.end();
											console.log(dateObj.toString()+' GET: '+req.path);

										} else {

											// Cierra la coneccion.
											res.status(404);
											res.end();

										}
									});

								});

							} else {

								// Cerrar la coneccion.
								res.status(404);
								res.end();

							}

						});

					} else {

						// Solicita Hash de aplicacion.
						dbWeb.query("CALL legislatura_web.applicationHash('"+AppKey+"');",function(err,row){
							
							applicationResult = row[0][0].applicationResult;
							var AppCode = md5('klg34hj'+applicationResult+dateObj.getTime().toString()+Math.random());

							// Registra nueva session.
							dbWeb.query("CALL legislatura_web.sessionCreate('"+AppKey+"','"+AppCode+"');",function(err,row){
								
								sessionResult = row[0][0].sessionResult;
								if(sessionResult==='true'){

									// Enviar sesion y cierra la coneccion.							
									res.status(200);
									res.send(AppCode);
									res.end();
									console.log(dateObj.toString()+' GET: '+req.path);

								} else {

									// Cierra la coneccion.
									res.status(404);
									res.end();

								}

							});

						});
					}
				});

			} else {

				// Cerrar coneccion.
				res.status(404);
				res.end();

			}
			
		});

	} else { 

		// Cerrar coneccion.
		res.status(404);
		res.end();

	}
	
};

exports.loginGETFORM = function(req,res,next) {

	// Definiciones.
	var AppKey  = req.params.appkey;
	var AppCode = req.params.appcode;
	var RegStr  = new RegExp(env.filters.string,'g');

	// Cabeceras por defecto.
	res.set("Connection", "close");
	res.set('Access-Control-Allow-Origin','*');

	// Si AppKey y AppCode fueron definidos,
	// entonces continuamos sino cerramos la coneccion.
	if(AppKey && AppCode){

		AppKey.toString().match(RegStr).join('').toString();
		AppCode.toString().match(RegStr).join('').toString();

		// Comprobamos si existe una sesion inactiva para esta aplicacion.
		dbWeb.query("CALL legislatura_web.sessionExistsAndInactive('"+AppKey+"','"+AppCode+"');",function(err,row){

			sessionResult = row[0][0].sessionResult;
			if(sessionResult==='true'){

				// Eliminamos la vieja session.
				dbWeb.query("CALL legislatura_web.sessionRemove('"+AppKey+"');",function(err,row){

					sessionResult = row[0][0].sessionResult;
					if(sessionResult==='true'){

							// Solicita Hash de aplicacion.
							dbWeb.query("CALL legislatura_web.applicationHash('"+AppKey+"');",function(err,row){
								
								applicationResult = row[0][0].applicationResult;
								var AppCode = md5('klg34hj'+applicationResult+dateObj.getTime().toString()+Math.random());

								// Registra la nueva session.
								dbWeb.query("CALL legislatura_web.sessionCreate('"+AppKey+"','"+AppCode+"');",function(err,row){
									
									sessionResult = row[0][0].sessionResult;
									if(sessionResult==='true'){

										// Enviar formulario de login y cierra la coneccion.
										res.set('Content-Type','text/html; charset=utf-8');
										res.status(200);
										res.render('login',{appkey:AppKey,appcode:AppCode});
										res.end();
										console.log(dateObj.toString()+' GET: '+req.path);

									} else {

										// Cierra la coneccion.
										res.status(404);
										res.end();

									}

								});

							});

					} else {

						// Cerrar coneccion.
						res.status(404);
						res.end();
					}

				});

			} else {

				// Cerrar coneccion.
				res.status(404);
				res.end();

			}

		});

	} else {

		// Cerrar coneccion.
		res.status(404);
		res.end();

	}

};

exports.loginPOST = function(req,res,next) {
  	
  	// Variables locales.
	var AppKey  = req.params.appkey;
	var AppCode = req.params.appcode;
	var AppUser = req.body.appuser;
	var AppPass = req.body.apppass;
	var RegStr  = new RegExp(env.filters.string,'g');

	// Carga la cabecera para cerrar la conexion.
	res.set("Connection", "close");
	res.set('Access-Control-Allow-Origin','*');

	// Si todos los datos estan cargados continuar.
	if(AppKey && AppCode && AppUser && AppPass){
	
		// Filtrar entradas.
		AppKey.toString().match(RegStr).join('').toString();
		AppCode.toString().match(RegStr).join('').toString();
		AppUser.toString().match(RegStr).join('').toString();
		AppPass.toString().match(RegStr).join('').toString();

		// Comprobar si tiene una aplicacion registrada.
		dbWeb.query("CALL legislatura_web.sessionExistsAndInactive('"+AppKey+"','"+AppCode+"');",function(err,row){
			
			sessionResult = row[0][0].sessionResult;
			if(sessionResult==='true'){

				// Selecionar la base de datos legislatura_jujuy.
				dbJujuy.query("use legislatura_jujuy;",function(err,row){

					if(!err){

						// Buscra un usuario en legislatura_jujuy.
						dbJujuy.query("select * from usuarios where usu_pass=md5('"+AppPass+"') and per_cuil='"+AppUser+"' and usu_estado=1;",function(err,row){

							if(!err){

								// Chequeamos si row contiene un usuario.
								if(row){

									// Eliminamos la vieja session.
									dbWeb.query("CALL legislatura_web.sessionRemove('"+AppKey+"');",function(err,row){

										sessionResult = row[0][0].sessionResult;
										if(sessionResult==='true'){

												// Solicita Hash de aplicacion.
												dbWeb.query("CALL legislatura_web.applicationHash('"+AppKey+"');",function(err,row){
													
													applicationResult = row[0][0].applicationResult;
													var AppCode = md5('klg34hj'+applicationResult+dateObj.getTime().toString()+Math.random());

													// Registra la nueva session.
													dbWeb.query("CALL legislatura_web.sessionCreate('"+AppKey+"','"+AppCode+"');",function(err,row){
														
														sessionResult = row[0][0].sessionResult;
														if(sessionResult==='true'){

															// Activa la nueva sesion.
															dbWeb.query("CALL legislatura_web.sessionActive('"+AppKey+"');",function(err,row){

																sessionResult=row[0][0].sessionResult;
																if(sessionResult==='true'){

																		// Solicitamos el host.
																		dbWeb.query("CALL legislatura_web.applicationHost('"+AppKey+"');",function(err,row){

																			applicationResult = row[0][0].applicationResult;

																			// Rutear hasta el inicio de session de la aplicacion.
																			res.set('Location',applicationResult+'/sessionInit/'+AppCode);
																			res.status(200);
																			res.end();
																			console.log(dateObj.toString()+' POST: '+req.path);
																			for(i in req.body){
																				console.log('Parametro body '+i+' >> '+req.body[i]);
																			}

																		});

																} else {

																	// Cerrrar conexon.
																	res.status(404);
																	res.end();

																}

															});


														} else {

															// Cerrar conexion.
															res.status(404);
															res.end();

														}

													});

												});

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


							} else {

								// Cerrar conexion.
								res.status(404);
								res.end();;

							}

						});

					} else {

						// Cerrar conexion.
						res.status(404);
						res.end();

					}

				});

			} else {

				//Cerrar conexion.
				res.status(404);
				res.end();

			}

		});

	} else {

		// Cerrar la conexion.
		res.status(404);
		res.end();

	}
	
};

exports.loginDELETE = function(req,res,next) {
    
    // Variables locales.
	var AppKey  = req.params.appkey;
	var AppCode = req.params.appcode;
	var RegStr  = new RegExp(env.filters.string,'g');

	// Carga la cabecera para cerrar la conexion.
	res.set("Connection", "close");
	res.set('Access-Control-Allow-Origin','*');

	if(AppKey && AppCode){

		AppKey.toString().match(RegStr).join('').toString();
		AppCode.toString().match(RegStr).join('').toString();

		// Eliminamos la session.
		dbWeb.query("CALL legislatura_web.sessionRemove('"+AppKey+"','"+AppCode+"');",function(err,row){

			if(!err){

				if(row){

					sessionResult = row[0][0].sessionResult;
					if(sessionResult==='true'){

						// Enviar respuesta.
						res.status(200);
						res.end();
						console.log(dateObj.toString()+' DELETE: '+req.path);

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

			} else {

				// Cerrar conexion.
				res.status(404);
				res.end();console.log('cerro');

			}

		});

	} else {

		// Cerrar conexion.
		res.status(404);
		res.end();

	}
};