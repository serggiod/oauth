module.exports = function(sequelize,DataTypes){
	return sequelize.define('oauth_apps',{
		'app_id':{
			type:DataTypes.INTEGER,
			primaryKey:true
		},
		'app_name':{type:DataTypes.STRING},
		'app_desc':{type:DataTypes.TEXT},
		'app_date':{type:DataTypes.DATE},
		'app_host':{type:DataTypes.STRING},
		'app_redir':{type:DataTypes.STRING},
		'app_key':{type:DataTypes.STRING},
		'app_stat':{
			type:DataTypes.ENUM,
			values:['ACTIVO','INACTIVO']
		}
	},{
		tableName:'oauth_apps'
	});
};