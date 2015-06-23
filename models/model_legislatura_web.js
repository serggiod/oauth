var env        = require('../environment')();
var Sequelize  = require('sequelize');
var sequelize  = new Sequelize(env.mysql.web.name,env.mysql.web.user,env.mysql.web.pass,{dialect:'mysql',host:env.mysql.web.host,engine:'MyISAM',define:{timestamps:false}});

exports.oauth_apps = sequelize.import('oauth_apps_mdl');
exports.oauth_code = sequelize.import('oauth_code_mdl');

sequelize.sync();