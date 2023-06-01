// In this file you crate and sync model table Accesories
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
class Accesories extends Sequelize.Model {}


module.exports.initialization = async () => {

	await Accesories.init({
		accessoryId: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		roomId: {
			type: Sequelize.BIGINT,
			allowNull: false
		},
		accessoryTypeId: {
			type: Sequelize.BIGINT,
			allowNull: false
		},
		accessoryName: {
			type: Sequelize.STRING,
			allowNull: false
		}

	}, {
		sequelize,
		modelName: 'Accesories'
	})
	sequelize.sync({
		alter: true
	})
	return true
}

module.exports.create = async({roomId,accessoryTypeId,accessoryName})=>{
await Accesories.create({
	roomId,
	accessoryTypeId,
	accessoryName
})
.catch(error => {
	return error
})
}
