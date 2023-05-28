// In this file you crate and sync model table Temperatures

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
class Temperature extends Sequelize.Model { }

// module initilization table
module.exports.initialization = async () => {

	await Temperature.init({
		tempId: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		actualTemp: {
			type: Sequelize.FLOAT,
			allowNull: false
		}

	}, {
		sequelize,
		modelName: 'Temperatures'
	})
	sequelize.sync({
		alter: true
	})
	return true
}
//module creating new record at the table
module.exports.create = async ({ actualTemp }) => {
	await Temperature.create({
		actualTemp
	}).catch(error => {
		return error
	})
}
//module updating record by ID at the table
module.exports.updateByID = async (tempId, { actualTemp }) => {
	await Temperature.update({
		actualTemp
	}, {
		where: {
			tempId
		}
	}
	)
		.catch(error => {
			return error
		})
}
//module delete record by ID from the table
module.exports.deleteByID = async (tempId) => {
	await Temperature.destroy({
		where: {
			tempId
		}
	}
	)
		.catch(error => {
			return error
		})
}
// module find one record by ID at the table
module.exports.findOneByID = async (tempId) => {
	return await Temperature.findOne({ where: { tempId } })
}
// module find all records by ID at the table
module.exports.findAll = async () => {
	return await Temperature.findAll()
}
