var env        = require('../environment')();
var Sequelize  = require('sequelize');
var sequelize  = new Sequelize('mysql://oauth_user:housered132222SJ45@localhost/legislatura_web').sync();

exports.legWeb = sequelize;