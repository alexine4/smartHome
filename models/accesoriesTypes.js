// In this file you crate and sync model table AccesoriesTypes
const Sequelize = require('sequelize')

// connect to database
const connectDB = require('../connection/connectionDB')
const sequelize = new Sequelize(
	connectDB.nameDB,
	connectDB.loginDB,
	connectDB.passwordDB, {
		dialect: connectDB.typeDB,
	}
)
class AccesoriesTypes extends Sequelize.Model {}


module.exports.initialization = async () => {

	await AccesoriesTypes.init({
		accessoryTypeId: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		propertiesId: {
			type: Sequelize.BIGINT,
			allowNull: false
		},
		accessoryTypeName: {
			type: Sequelize.STRING,
			allowNull: false
		}

	}, {
		sequelize,
		modelName: 'AccesoriesTypes'
	})
	sequelize.sync({
		alter: true
	})
	return true
}

module.exports.create = async({propertiesId,accessoryTypeId,accessoryTypeName})=>{
await AccesoriesTypes.create({
	accessoryTypeId,
	propertiesId,
	accessoryTypeName
})
.catch(error => {
	return error
})
}
