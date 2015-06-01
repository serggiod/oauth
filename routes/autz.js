var express   = require('express');
var md5       = require('MD5');
var sanitizer = require('sanitize')();
var router    = express.Router();

var app_key   = '';
var app_sql   = '';

var app_id    = 0;
var app_host  = '';
var aut_code  = '';

router.get('/', function(req,res){

	app_sql = 'use '+global.config.server.mysql.web.name+';';
	global.dbWeb.query(app_sql,function(err,json){

		if(!err){
			app_key = sanitizer.value(req.header('App-Key'),'string');
			app_sql = 'select app_id, app_host from oauth_apps where app_key=\''+app_key+'\' and app_stat=\'ACTIVO\';';

			global.dbWeb.query(app_sql,function(err,json){
				if(err===null){
					if(json.length===1){


						dateObj  = new Date();
						app_id   = json[0].app_id;
						app_host = json[0].app_host;
						aut_code = md5('klg34hj'.app_id+dateObj.getTime().toString());

						app_sql  = "delete from oauth_autz_code where app_key='"+app_key+"';"
						global.dbWeb.query(app_sql,function(err){
							if(err===null){

								app_sql = "insert into oauth_autz_code values (null,'"+app_key+"','"+aut_code+"',current_timestamp,'INACTIVO');";
								global.dbWeb.query(app_sql,function(err,json){
									if(err===null){
										if(json.insertId){

											res.header('Access-Control-Allow-Origin','*');
											res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
											res.header('Access-Control-Allow-Credentials','false');
											res.header('Content-Type','text/plain');
											res.header('Aut-Code',aut_code);
											res.send('');

										}
									}
								});

							}
						});

					}
				}
			});

		}
		
	});

});

module.exports = router;