var env        = require('../environment')();
var Sequelize  = require('sequelize');
var sequelize  = new Sequelize(env.mysql.jujuy.name,env.mysql.jujuy.user,env.mysql.jujuy.pass,{dialect:'mysql',host:env.mysql.jujuy.host,engine:'MyISAM',define:{timestamps:false}});

exports.usuarios = sequelize.import('usuarios_mdl');

sequelize.sync();