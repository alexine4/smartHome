// In this file you crate and sync model table ScenarionTemp

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
class ScenarionTemp extends Sequelize.Model { }

// module initilization table
module.exports.initialization = async () => {

	await ScenarionTemp.init({
		scenarioId: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		roomId: {
			type: Sequelize.BIGINT,
			allowNull: false
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		minTemp: {
			type: Sequelize.FLOAT,
			allowNull: false
		},
		maxTemp: {
			type: Sequelize.FLOAT,
			allowNull: false
		},
		timeStart: {
			type: Sequelize.TIME,
			allowNull: false
		},
		timeStop: {
			type: Sequelize.TIME,
			allowNull: false
		}

	}, {
		sequelize,
		modelName: 'ScenarionTemp'
	})
	sequelize.sync({
		alter: true
	})
	return true
}
//module creating new record at the table
module.exports.create = async ({ roomId,name, minTemp, maxTemp, timeStart, timeStop }) => {
	await ScenarionTemp.create({
		roomId,
		name,
		minTemp,
		maxTemp,
		timeStart,
		timeStop
	}).catch(error => {
		return error
	})
}
//module updating record by room ID at the table
module.exports.updateById = async (scenarioId, {name, minTemp, maxTemp, timeStart, timeStop }) => {
	await ScenarionTemp.update({
		name,
		minTemp,
		maxTemp,
		timeStart,
		timeStop
	}, {
		where: {
			scenarioId
		}
	}
	)
		.catch(error => {
			return error
		})
}
//module delete record by ID from the table
module.exports.deleteByID = async (scenarioId) => {
	await ScenarionTemp.destroy({
		where: {
			scenarioId
		}
	}
	)
		.catch(error => {
			return error
		})
}
//module delete record by room from the table
module.exports.deleteByRoom = async (roomId) => {
	await ScenarionTemp.destroy({
		where: {
			roomId
		}
	}
	)
		.catch(error => {
			return error
		})
}
// module find one record by ID at the table
module.exports.findOneByID = async (scenarioId) => {
	return await ScenarionTemp.findOne({ where: { scenarioId } })
}
// module find one record by room at the table
module.exports.findOneByRoom = async (roomId) => {
	return await ScenarionTemp.findOne({ where: { roomId } })
}
// module find all records by ID at the table
module.exports.findAllByRoom = async (roomId) => {
	return await ScenarionTemp.findAll({where:{roomId}})
}