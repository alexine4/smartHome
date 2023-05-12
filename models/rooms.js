// In this file you crate and sync model table Rooms
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
class Rooms extends Sequelize.Model {}


module.exports.initialization = async () => {

	await Rooms.init({
		roomId: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		typeId: {
			type: Sequelize.BIGINT,
			allowNull: false
		},
		roomName: {
			type: Sequelize.STRING,
			allowNull: false
		}

	}, {
		sequelize,
		modelName: 'Rooms'
	})
	sequelize.sync({
		alter: true
	})
	return true
}

module.exports.create = async (typeId, roomName) => {
	await Rooms.create({
			typeId,
			roomName
		}).then(() => {
			return true
		})
		.catch(error => {
			return error
		})
}

module.exports.findOne = async (typeId) => {
	try {
		return await Rooms.findOne({
			where: {
				typeId
			}
		})
	} catch (error) {
		return error
	}
}
module.exports.findAll = async () => {

	try {
		return await Rooms.findAll()
	} catch (error) {
		return error
	}
}

module.exports.update = async (roomId, typeId, roomName) => {
	await Rooms.update({
			typeId,
			roomName
		}, {
			where: {
				roomId
			}
		}).then(() => {
			return true
		})
		.catch(error => {
			return error
		})
}
module.exports.delete = async (roomId) => {
	await Rooms.destroy({
			where: {
				roomId
			}
		}).then(() => {
			return true
		})
		.catch(error => {
			return error
		})
}