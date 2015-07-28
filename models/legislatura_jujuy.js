var env        = require('../environment')();
var Sequelize  = require('sequelize');
var sequelize  = new Sequelize(
	'legislatura_jujuy',
	'sdominguez',
	'sergio2012',
	{
		dialect:'mysql',
		host:'localhost',
		define:
		{
			timestamps:false
		}
	}).sync();