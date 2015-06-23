module.exports = function(sequelize,DataTypes){
	return sequelize.define('oauth_code',{
		'app_id':{
			type:DataTypes.INTEGER,
			primaryKey:true
		},
		'app_key':{type:DataTypes.STRING},
		'app_code':{type:DataTypes.STRING},
		'app_time':{type:DataTypes.DATE},
		'app_sess':{
			type:DataTypes.ENUM,
			values:['ACTIVO','INACTIVO']
		}
	},{
		tableName:'oauth_code'
	});
};