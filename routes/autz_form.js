var express   = require('express');
var md5       = require('MD5');
var sanitizer = require('sanitize')();
var router    = express.Router();
var app_key   = '';
var aut_code  = '';
var app_sql   = '';
var autz_id   = 0;

router.get('/', function(req,res){

	app_key  = sanitizer.value(req.header('App-Key'),'string');
	aut_code = sanitizer.value(req.header('Aut-Code'),'string');

	app_sql  = 'use '+global.config.server.mysql.web.name+';';
	global.dbWeb.query(app_sql,function(err,json){
		
		app_sql  = "select autz_id,time_to_sec(timediff(current_timestamp,autz_time)) autz_life from oauth_autz_code where app_key='"+app_key+"' and autz_code='"+aut_code+"' and autz_sess='INACTIVO';";
		global.dbWeb.query(app_sql,function(err,json){

			if(err===null){
				if(json.length>=1){
					if(json[0].autz_life<=3600){

						dateObj  = new Date();
						aut_code = md5('kht4224'+json[0].autz_id+dateObj.getTime().toString());

						app_sql = "update oauth_autz_code set autz_code='"+aut_code+"' where autz_id="+json[0].autz_id+";";
						global.dbWeb.query(app_sql,function(err,json){

							if(err===null){
								if(json.changedRows===1){

									res.header('Access-Control-Allow-Origin','*');
									res.header('Content-Type','text/plain');
									res.header('Aut-Code',aut_code);
									res.render('autz_form_login');

								}
							}

						});

					} else {
						
						res.header('Access-Control-Allow-Origin','*');
						res.header('Content-Type','text/html');
						res.render('autz_form_reload');

					}
				}
			}

		});
		
	});

});

module.exports = router;