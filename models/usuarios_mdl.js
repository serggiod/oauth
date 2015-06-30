module.exports = function(sequelize,DataTypes){
	return sequelize.define('usuarios',{
		'usu_pass':{type:DataTypes.STRING},
		'per_cuil':{type:DataTypes.STRING},
		'usu_estado':{type:DataTypes.DECIMAL},
		'usu_cambiar':{type:DataTypes.DECIMAL}
	},{
		tableName:'usuarios'
	});
};