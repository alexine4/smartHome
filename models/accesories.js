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
class Accesories extends Sequelize.Model { }


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
		accessoryName: {
			type: Sequelize.STRING,
			allowNull: false
		},
		accessoryType: {
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
// create new record
module.exports.create = async ({ roomId, accessoryName, accessoryType }) => {
	await Accesories.create({
		roomId,
		accessoryName,
		accessoryType
	})
		.catch(error => {
			return error
		})
}
// update record by id accessory
module.exports.update = async ({ accessoryId, roomId, accessoryName, accessoryType }) => {
	await Accesories.update({
		roomId,
		accessoryName,
		accessoryType
	}, {
		where: { accessoryId }
	})
		.catch(error => {
			return error
		})
}
// delete record from table by id
module.exports.delete = async (accessoryId) => {
	await Accesories.destroy({ where: { accessoryId } })
		.catch(error => {
			return error
		})
}
// return all record by one room
module.exports.findByRoom = async (roomId) => {
	return await Accesories.findAll({ where: { roomId } })
}
// return one record by room and name
module.exports.findByRoomAndName = async ({roomId,accessoryName}) => {
	return await Accesories.findOne({ where: { roomId,accessoryName } })
}

// return one by id
module.exports.findOneByID = async (accessoryId) => {
	return await Accesories.findOne({ where: { accessoryId } })
}