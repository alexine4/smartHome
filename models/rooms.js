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
		})
		.catch(error => {
			return error
		})
}

module.exports.findOneByID = async (roomId) => {
	try {
		return await Rooms.findOne({
			where: {
				roomId
			}
		})
	} catch (error) {
		return error
	}
}
module.exports.findOneByName = async (roomName) => {
	try {
		return await Rooms.findOne({
			where: {
				roomName
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
		})
		.catch(error => {
			return error
		})
}