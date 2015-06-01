var express   = require('express');
var md5       = require('MD5');
var sanitizer = require('sanitize')();
var router    = express.Router();

var app_user  = '';
var app_pass  = '';
var app_key   = '';
var aut_code  = '';
var autz_id   = '';

var app_sql   = '';

router.get('/', function(req,res){

	app_key  = sanitizer.value(req.header('App-Key'),'string');
	aut_code = sanitizer.value(req.header('Aut-Code'),'string');
	app_user = sanitizer.value(req.header('User-Login'),'string');
	app_pass = sanitizer.value(req.header('User-Pass'),'string');

	app_sql  = 'use '+global.config.server.mysql.web.name+';';
	global.dbWeb.query(app_sql,function(err,json){


		app_sql  = "select autz_id,time_to_sec(timediff(current_timestamp,autz_time)) autz_life from oauth_autz_code where app_key='"+app_key+"' and autz_code='"+aut_code+"' and autz_sess='INACTIVO';";
		global.dbWeb.query(app_sql,function(err,json){

			if(!err){
				if(json.length===1){
					if(json[0].autz_life<=3600){
						
						autz_id = json[0].autz_id;

						app_sql = 'use '+global.config.server.mysql.jujuy.name+';';
						global.dbJujuy.query(app_sql,function(err,json){

							app_sql = "select * from usuarios where per_cuil='"+app_user+"' and usu_pass='"+app_pass+"' and usu_estado=1;";
							global.dbJujuy.query(app_sql,function(err,json){

								if(!err){
									if(json.length===1){

										dateObj  = new Date();
										aut_code = md5('kht4224'+json[0].app_user+dateObj.getTime().toString());

										app_sql = "update oauth_autz_code set autz_code='"+aut_code+"',autz_sess='ACTIVO' where autz_id="+autz_id+";";
										global.dbWeb.query(app_sql,function(err,json){				

											if(!err){
												if(json.changedRows===1){
												
													res.header('Access-Control-Allow-Origin','*');
													res.header('Content-Type','text/plain');
													res.header('Aut-Code',aut_code);
													res.send('true');

												}
											} else {
												res.header('Access-Control-Allow-Origin','*');
												res.header('Content-Type','text/plain');
												res.send('false');
											}

										});

									} else {
										res.header('Access-Control-Allow-Origin','*');
										res.header('Content-Type','text/plain');
										res.send('false');	
									}
								} else {
									res.header('Access-Control-Allow-Origin','*');
									res.header('Content-Type','text/plain');
									res.send('false');
								};

							});

						});

					} else {

						res.header('Access-Control-Allow-Origin','*');
						res.header('Content-Type','text/plain');
						res.send('false');

					};
				} else {
					res.header('Access-Control-Allow-Origin','*');
					res.header('Content-Type','text/plain');
					res.send('false');
				};
			} else {
				res.header('Access-Control-Allow-Origin','*');
				res.header('Content-Type','text/plain');
				res.send('false');				
			};

		});

	});


});

module.exports = router;